<template>
  <div class="p-page">
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="发票号码" prop="status">
        <el-input @keyup.enter="getList" placeholder="发票号码" v-model="listQuery.name" />
      </el-form-item>

      <el-form-item label="发票类型" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发票日期" prop="status">
        <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" placeholder="发票日期" />
      </el-form-item>

      <el-form-item label="发票状态" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="getList">查询</el-button>
      </el-form-item>

      <div>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate('', 'create')">新增</el-button>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button @click="$emit('export')">导出</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="$emit('print')">打印</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      stripe
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" label="选择" />
      <el-table-column align="center" type="index" label="序号" width="60" />

      <el-table-column align="center" label="凭证编码">
        <template v-slot="scope">
          <el-button
            link
            type="primary"
            @click="handleUpdate(scope.row.id, 'detail')"
          >{{scope.row.cateName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票日期" prop="time" />

      <el-table-column align="center" label="发票类型">
        <template v-slot="scope">{{scope.row.status === 1 ? "是" : '否'}}</template>
      </el-table-column>

      <el-table-column align="center" label="发票代码" prop="time" />

      <el-table-column align="center" label="供应商名称" prop="time" />
      <el-table-column align="center" label="不含税金额" prop="time" />
      <el-table-column align="center" label="税额" prop="time" />
      <el-table-column align="center" label="价税合计" prop="time" />

      <el-table-column align="center" label="发票状态">
        <template v-slot="scope">{{scope.row.status === 1 ? "正常" : '异常'}}</template>
      </el-table-column>
      <el-table-column align="center" label="凭证字号" prop="time" />

      <el-table-column align="center" label="记账周期" prop="time" />

      <el-table-column align="center" label="附件">
        <template v-slot="scope">查询</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleEnter(scope.row)">生成凭证</el-button>
          <el-button type="primary" link @click="handleUpdate(scope.row.id, 'update')">修改</el-button>
          <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
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
import { page, delObj } from "../api/invoice.js";

export default {
  name: "invoiceList",
  data() {
    return {
      form: {},
      list: [
        { cateName: "北京模型有限公司", time: "2022-12" },
        { cateName: "北京模型有限公司", time: "2022-12" },
        { cateName: "北京模型有限公司", time: "2022-12" },
        { cateName: "北京模型有限公司", time: "2022-12" },
        { cateName: "北京模型有限公司", time: "2022-12" },
        { cateName: "北京模型有限公司", time: "2022-12" }
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

    handleSelectionChange(val) {
      this.deleteList = val;
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
