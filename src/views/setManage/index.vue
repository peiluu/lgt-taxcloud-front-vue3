<template>
  <div class="p-page">
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="账套名称" prop="status">
        <el-input @keyup.enter="handleFilter" placeholder="账套名称" v-model="listQuery.name" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="listQuery.status">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="handleFilter">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="handleUpdate('', 'create')" type="primary">新增</el-button>
    <el-table stripe borders :data="list" v-loading.body="listLoading" highlight-current-row>
      <el-table-column align="center" type="index" label="序号" width="60" />

      <el-table-column align="center" label="账套名称">
        <template v-slot="scope">
          <el-button
            link
            type="primary"
            @click="handleUpdate(scope.row.id, 'detail')"
          >{{scope.row.cateName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="启用时间" prop="time" />

      <el-table-column align="center" label="会计制度">
        <template v-slot="scope">
          <span>{{ scope.row.sceneName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template v-slot="scope">
          <el-switch v-model="scope.row.dcdirection" active-value="100" inactive-value="0"></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleEnter(scope.row)">进入</el-button>
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
import { page, delObj } from "./api/index.js";

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

    handleAddChange(value) {
      this.form.subjectId =
        value && value.length ? value[value.length - 1] : "";
      this.$refs.cascaderRef.dropDownVisible = false;
    },

    handleFilter() {
      this.getList();
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
    }
  }
};
</script>
