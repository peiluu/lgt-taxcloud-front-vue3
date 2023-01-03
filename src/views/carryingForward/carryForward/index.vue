<template>
  <div>
    <div class="m-header">
      <h3>已到结账期，赶紧结账吧！</h3>
      <el-button @click="handleUpdate('', 'create')" type="primary">一键结账</el-button>
    </div>

    <div class="m-list">
      <el-card v-for="item in list" :key="item.id">
        <template #header>
          <div class="clearfix">{{item.name}}</div>
        </template>

        <div class="item">
          <div>金额：{{item.number}}</div>
          <el-button @click="handleUpdate('', 'create')" type="primary">生成凭证</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { page, delObj } from "../api/index.js";

export default {
  name: "carryForward",
  data() {
    return {
      form: {},
      tabsList: [
        { label: "资产类", id: 1 },
        { label: "负债类", id: 2 },
        { label: "权益类", id: 3 },
        { label: "成本类", id: 4 },
        { label: "损益类", id: 5 }
      ],
      list: [
        { name: "结转损益", number: 111 },
        { name: "应交税费", number: 111 },
        { name: "销售成本", number: 111 },
        { name: "XXXX", number: 111 }
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: 1
      },
      dialogFormVisible: false,
      dialogStatus: "",
      deleteList: [],
      itemList: [
        { label: "期初余额", propsKey: "number" },
        { label: "本期借方发生额", propsKey: "number" },
        { label: "本期贷方发生额", propsKey: "number" },
        { label: "期末余额", propsKey: "number" }
      ]
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

    handleUpdate(id = "", dialogStatus = "") {
      this.dialogFormVisible = true;
      this.dialogStatus = dialogStatus;
    },

    handleSelectionChange(val) {
      this.deleteList = val;
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
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
h3 {
  color: #ccc;
  padding: 8px 0;
}

.m-list {
  display: flex;
  padding: 16px 24px;
  .el-card {
    flex-basis: 25%;
    &:not(last-type) {
      margin-right: 24px;
    }
  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-button{
      margin-top: 12px;
      width: 30%;
    }
  }
}
</style>
