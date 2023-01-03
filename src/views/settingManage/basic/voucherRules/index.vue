<template>
  <div class="p-page">
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="规则名称" prop="status">
        <el-input @keyup.enter="getList" placeholder="规则名称" v-model="listQuery.name" />
      </el-form-item>

      <el-form-item label="业务类别" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务类别" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="getList">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="m-btns">
      <el-button @click="handleUpdate('', 'create')" type="primary">新增</el-button>
      <el-button @click="handleUpdate('', 'create')" type="primary">批量删除</el-button>
    </div>

    <el-table
      stripe
      borders
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" label="序号" width="60" />

      <el-table-column align="center" label="企业名称">
        <template v-slot="scope">
          <el-button
            link
            type="primary"
            @click="handleUpdate(scope.row.id, 'detail')"
          >{{scope.row.cateName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="纳税类型" prop="time" />

      <el-table-column align="center" label="纳税人识别号码" prop="time" />

      <el-table-column align="center" label="标为默认企业">
        <template v-slot="scope">{{scope.row.status === 1 ? "是" : '否'}}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleEnter(scope.row)">启停</el-button>
          <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="primary" link @click="handleUpdate(scope.row.id, 'update')">编辑</el-button>
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
import { page, delObj } from "../../api/index.js";
export default {
  name: "setManageList",

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
    // 重置表单
    reset() {
      this.listQuery = {
        pageIndex: 1,
        pageSize: 10
      };
      this.getList();
    },
    handleSelectionChange(val) {
      console.log(val);
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
        path: "/basic/voucherRulesDetail",
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
<style lang="scss" scoped>
.m-btns {
  float: right;
  .el-button {
    margin: 0 0 16px 16px;
  }
}
</style>
