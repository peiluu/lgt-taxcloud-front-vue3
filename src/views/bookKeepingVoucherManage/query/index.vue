<template>
  <div>
    <div class="m-header">
      <div>
        <span>查凭证</span>
        <LgtQuarterlyTab @dateChange="handleDateChange" />
      </div>

      <div class="btns">
        <el-button @click="$emit('export')">导出</el-button>
        <el-button @click="$emit('print')">打印</el-button>
        <el-button @click="$emit('print')">批量操作</el-button>
      </div>
    </div>
    <div class="table-tip">
      <el-icon color="#1890FF"> <Warning /> </el-icon>已选择
      <span>{{ selectionList.length }}</span>
      项
    </div>
    <el-table
      stripe
      :data="list"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :tree-props="{ children: 'list', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        align="center"
        type="selection"
        label="序号"
        width="60"
      />

      <el-table-column align="center" label="日期" prop="accountingTime" />

      <el-table-column align="center" label="凭证字号">
        <template v-slot="scope">
          <el-button
            link
            type="primary"
            @click="handleUpdate(scope.row.id, 'detail')"
            >{{ scope.row.mark }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="摘要" prop="name">
        <el-table-column align="center" label="摘要" prop="name" />
      </el-table-column>
      <el-table-column align="center" label="科目" prop="name" />
      <el-table-column align="center" label="借方金额" prop="creditSum" />
      <el-table-column align="center" label="贷方金额" prop="debitSum" />
      <el-table-column align="center" label="所属期限" prop="number" />
      <el-table-column align="center" label="原始凭证" prop="number" />
      <el-table-column align="center" label="提交人" prop="creatorName" />

      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template v-slot="scope">
          <el-button
            type="primary"
            link
            @click="handleUpdate(scope.row.id, 'update')"
            >编辑</el-button
          >
          <el-button type="primary" link @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button type="primary" link @click="handleEnter(scope.row)"
            >冲销</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="listQuery.pageIndex"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script>
import LgtQuarterlyTab from "@/components/lgt-quarter-tab/index.vue";
import cookies from "@/utils/cookies";

import { page, delObj } from "../api/index.js";

export default {
  name: "invoiceList",
  components: { LgtQuarterlyTab },

  data() {
    return {
      form: {},
      list: [],
      time: "",
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      selectionList: [],
    };
  },
  mounted() {
    // this.getList();
  },
  computed: {
    // quarterlyList() {
    //   // const list = getQuarterlyList(2);
    //   // // this.form.quarter = list[list.length - 1];
    //   // return list;
    // },
    // userName() {
    //   return cookies.get("userName");
    // },
  },

  methods: {
    getList(val) {
      page({
        ...this.listQuery,
        accountSetId: cookies.get("accountSetId") || "",
        time: val || this.time,
      }).then((response) => {
        this.list = response.rows;
        this.total = response.total;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    // 改变查询季度
    handleDateChange(val) {
      this.time = val;

      this.getList(val);
    },
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    // 编辑
    handleUpdate(id = "", updateStatus = "") {
      this.$router.push({
        path: "/bookKeepingVoucherManage/entry",
        query: {
          id,
          updateStatus,
        },
      });
    },

    handleEnter(row) {
      this.$confirm("确定将本条(批)凭证红冲吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delObj({ id: row.id }).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          this.getList();
        });
      });
    },

    handleDelete(row) {
      this.$confirm("你确定要删除这行内容吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delObj({ id: row.id }).then(() => {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.m-header {
  display: flex;
  justify-content: space-between;
  & div:first-child {
    display: flex;
    align-items: center;
  }
  span {
    padding: 0 8px;
  }
}
.table-tip {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin-top: 8px;
  background: #e6f7ff;
  border-radius: 4px;
  border: 1px solid #ade0ff;

  .el-icon {
    margin-right: 4px;
  }
  span {
    color: #1890ff;
  }
}
</style>
