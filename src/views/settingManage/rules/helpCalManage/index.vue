<template>
  <div>
    <div class="m-header">
      <h4>辅助核算设定</h4>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="handleUpdate('update', item)"
      ></div>
    </div>
    <div class="item item-add">
      <el-icon :size="50" color="#000">
        <CirclePlus />
      </el-icon>
    </div>

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="科目类别" prop="subjectCate">
          <el-select v-model="form.subjectCate" placeholder="请选择科目类别">
            <el-option
              v-for="item in subjectCateList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父级科目" prop="pid">
          <el-cascader
            v-model="form.pid"
            placeholder="请选择科目"
            :options="sujectCascadeList"
            clearable
            ref="cascaderRef"
            @change="handleChange"
            :props="props"
            popper-class="cascaderClass"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="科目代码" prop="subjectCode">
          <el-input
            v-model="form.subjectCode"
            placeholder="请输入科目代码"
          ></el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop="subjectName">
          <el-input
            v-model="form.subjectName"
            placeholder="请输入科目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="会计准则" prop="accoutingStandard">
          <el-select
            v-model="form.accoutingStandard"
            placeholder="请选择会计准则"
          >
            <el-option
              v-for="item in accoutingStandardList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="create('form')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  delObj,
  findParentTaxSubject,
} from "@/views/settingManage/api/helpCalManage.js";
import dialogDetail from "./dialogDetail.vue";

export default {
  name: "HelpCalManageList",
  // components: { dialogDetail },
  data() {
    return {
      form: {},
      subjectCateList: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      deleteList: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 查询列表
    getList() {
      page(this.listQuery).then((response) => {
        this.list = response.rows;
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
    handleCloseDialog(updateFlag) {
      console.log(1);
      this.dialogFormVisible = false;
      if (updateFlag) {
        this.getList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.m-header {
  display: flex;
  align-items: center;
  padding-bottom: 24px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex-basis: 25%;
  }
}
</style>
