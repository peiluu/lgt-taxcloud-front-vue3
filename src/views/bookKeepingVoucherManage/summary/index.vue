<template>
  <div>
    <div class="m-header">
      <div>
        <span>汇总周期</span>
        <LgtQuarterlyTab @dateChange="handleDateChange" />
        <span>凭证总张数：7 张，附件总张数：1</span>
      </div>

      <div class="btns">
        <el-button @click="$emit('export')">导出</el-button>
        <el-button @click="$emit('print')">打印</el-button>
      </div>
    </div>

    <el-table stripe :data="list" v-loading.body="listLoading" highlight-current-row>
      <el-table-column align="center" label="科目编码">
        <template v-slot="scope">
          <el-button link type="primary" @click="goToDetail(scope.row.code)">{{ scope.row.code }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目名称" prop="name" />
      <el-table-column align="center" label="借方金额" prop="number" />
      <el-table-column align="center" label="贷方金额" prop="number" />
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

import { page, delObj } from "../api/index.js";

export default {
  name: "invoiceList",
  components: { LgtQuarterlyTab },

  data() {
    return {
      form: {},
      list: [
        { code: 1001, name: "库存现金", number: "111" },
        { code: 1002, name: "银行存款", number: "111" },
        { code: 1003, name: "应付账款", number: "111" },
        { code: 1004, name: "材料采购", number: "111" }
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    // this.getList()
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
    // 改变查询季度
    handleDateChange(val) {
      console.log(val);
    },
    handleUpdate(id = "", updateStatus = "") {
      this.$router.push({
        path: "/originalVoucherManage/invoiceDetail",
        query: {
          id,
          updateStatus
        }
      });
    },
    goToDetail(code) {
      this.$router.push({
        path: "/bookManage/subLedgerQuery",
        query: {
          code
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
    }
  }
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
</style>
