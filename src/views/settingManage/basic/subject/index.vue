<template>
  <div>
    <div class="m-header">
      <span>类别</span>
      <el-tabs v-model="listQuery.type" type="card">
        <el-tab-pane
          v-for="item in tabsList"
          :label="item.label"
          :name="item.id"
          :key="item.id"
        >{{item.label}}</el-tab-pane>
      </el-tabs>
    </div>

    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="编码" prop="status">
        <el-input @keyup.enter="handleFilter" placeholder="编码" v-model="listQuery.name" />
      </el-form-item>

      <el-form-item label="名称" prop="status">
        <el-input @keyup.enter="handleFilter" placeholder="名称" v-model="listQuery.qymc" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder>
          <el-option :value="1" label="开启" />
          <el-option :value="2" label="关闭" />
        </el-select>
      </el-form-item>

      <el-form-item label="辅助核算" prop="status">
        <el-select v-model="form.status" placeholder>
          <el-option :value="1" label="客户" />
          <el-option :value="2" label="供应商" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="handleFilter">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button @click="handleUpdate('', 'create')" type="primary">新增</el-button>
    <el-button @click="handleUpdate('', 'create')" style="float: right">导出</el-button>
    <el-table
      stripe
      borders
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="60" label="选择" />

      <el-table-column align="center" label="编码" prop="cateName"></el-table-column>
      <el-table-column align="center" label="名称" prop="time" />

      <el-table-column align="center" label="辅助核算" prop="time" />

      <el-table-column align="center" label="状态">
        <template v-slot="scope">
          <el-switch v-model="scope.row.dcdirection" active-value="100" inactive-value="0"></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleUpdate(scope.row, 'addSubordinate')">新增下级</el-button>
          <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="primary" link @click="handleUpdate(scope.row.id, 'update')">修改</el-button>
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
    <dialogDetail
      :dialogFormVisible="dialogFormVisible"
      :dialogStatus="dialogStatus"
      @closeDialog="handleCloseDialog"
    />
  </div>
</template>

<script>
import { page, delObj } from "../../api/index.js";
import dialogDetail from "./dialogDetail.vue";

export default {
  name: "setManageList",
  components: { dialogDetail },
  data() {
    return {
      form: {},
      tabsList: [
        {
          label: "资产类",
          id: 1
        },
        {
          label: "负债类",
          id: 2
        },
        {
          label: "权益类",
          id: 3
        },
        {
          label: "成本类",
          id: 4
        },
        {
          label: "损益类",
          id: 5
        }
      ],
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
        pageSize: 10,
        type: 1
      },
      dialogFormVisible: false,
      dialogStatus: ""
    };
  },
  watch: {
    "listQuery.type"() {
      this.getList();
    }
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

    handleUpdate(id = "", dialogStatus = "") {
      this.dialogFormVisible = true;
      this.dialogStatus = dialogStatus;
    },

    handleSelectionChange(val) {
      console.log(val);
    },
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
    handleCloseDialog(updateFlag) {
      console.log(1);
      this.dialogFormVisible = false;
      if (updateFlag) {
        this.getList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.m-header {
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  span {
    padding-right: 8px;
  }

  /deep/ .el-tabs__header {
    margin: 0;
  }
  .el-tab-pane {
    display: none;
  }
}
</style>
