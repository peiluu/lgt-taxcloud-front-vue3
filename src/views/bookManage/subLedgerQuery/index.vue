<template>
  <div>
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="明细账期" prop="status">
        <el-select v-model="listQuery.status">
          <el-option
            v-for="item in quarterlyList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="getList">查询</el-button>
      </el-form-item>

      <el-form-item style="float: right">
        <el-button @click="handleUpdate('', 'create')">导出</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="handleUpdate('', 'create')">打印</el-button>
      </el-form-item>
    </el-form>
    <div class="m-section">
      <el-card>
        <template #header>科目：{{currentSubject.code }} {{currentSubject.name}}</template>
        <el-table border stripe :data="list" v-loading.body="listLoading" highlight-current-row>
          <el-table-column align="center" label="日期" prop="code" />
          <el-table-column align="center" label="凭证字号" prop="cateName" />
          <el-table-column align="center" label="摘要" prop="number" />
          <el-table-column align="center" label="借方金额" prop="number" />
          <el-table-column align="center" label="贷方金额" prop="number" />
          <el-table-column align="center" label="方向" prop="number" />

          <el-table-column align="center" label="余额" prop="number" />
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
      </el-card>

      <el-card>
        <template #header>
          <el-input v-model="inputVal" suffix-icon="Search" />
        </template>
        <div
          v-for="item in subjectList"
          :key="item.code"
          :class="{'item': true, 'active': item ===  currentSubject}"
          @click="currentSubject = item"
        >
          <el-icon color="#87DDF7">
            <Document />
          </el-icon>
          {{item.name}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getQuarterlyList } from "@/utils/util";

import { page, delObj } from "../api/index.js";

export default {
  name: "setManageList",
  data() {
    return {
      form: {},
      list: [
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "656  " },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" }
      ],
      subjectList: [
        { code: 1001, name: "库存现金" },
        { code: 1002, name: "银行存款" },
        { code: 1003, name: "库存现金" },
        { code: 1004, name: "材料采购" }
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      quarterlyList: [],
      currentSubject: { code: 1001, name: "库存现金" },
      inputVal: ""
    };
  },
  mounted() {
    // this.getList()
    this.quarterlyList = getQuarterlyList(2);
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.rows;
        this.total = response.total;
        this.listLoading = false;
      });
    },
    // 重置表单
    reset() {
      this.listQuery = {
        pageIndex: 1,
        pageSize: 10
      };
      this.getList();
    },

    handleAddChange(value) {
      this.form.subjectId =
        value && value.length ? value[value.length - 1] : "";
      this.$refs.cascaderRef.dropDownVisible = false;
    },

    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },

    handleUpdate(id = "", updateStatus = "") {
      this.$router.push({
        path: "/setManage/detail",
        query: {
          id,
          updateStatus
        }
      });
    },

    handleEnter() {},
    handleDelete(row) {
      this.$confirm("你确定要删除这行内容吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj({ id: row.id }).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      });
    },
    changeCurrentSubject(item) {}
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 16px;
}
.m-section {
  display: flex;
}
.el-card {
  flex-basis: 70%;
  &:last-child {
    flex-basis: 30%;
    .item {
      display: flex;
      align-items: center;
      margin-top: 8px;
      padding: 4px;
      &.active {
        background: #ffebc0;
      }
    }
    .el-icon {
      margin-right: 4px;
    }
  }
  /deep/ .el-card__body {
    padding: 0 20px 20px;
  }
}
</style>
