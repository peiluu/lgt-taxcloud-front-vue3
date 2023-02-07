<template>
  <div class="p-page">
    <h3 class="m-title">{{ textMap[updateStatus] || "新增凭证规则" }}</h3>
    <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="detail-form"
      :disabled="updateStatus === 'detail'"
    >
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入规则名称" />
      </el-form-item>

      <el-form-item label="业务类别" prop="ywType">
        <el-select v-model="listQuery.ywType" placeholder="请选择业务类别">
          <el-option
            v-for="item in metierSceneList"
            :key="item.id"
            :label="item.sceneName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="原始凭证类别" prop="originalType">
        <el-select v-model="form.originalType" placeholder="请选择原始凭证类别">
          <el-option value="发票" label="发票" />
        </el-select>
      </el-form-item>

      <el-form-item label="币种" prop="bz">
        <el-select v-model="form.bz">
          <el-option value="人民币（RMB）" label="人民币（RMB）" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="m-btns">
      <el-button @click="handleUpdate('', 'create')" type="primary"
        >科目维护</el-button
      >
    </div>

    <el-table
      stripe
      :data="list"
      v-loading.body="listLoading"
      highlight-current-row
    >
      <el-table-column align="center" type="index" label="序号" width="60" />

      <el-table-column align="center" label="摘要信息" prop="abstract" />

      <el-table-column align="center" label="科目名称" prop="subject" />

      <el-table-column align="center" label="借/贷">
        <template v-slot="scope">{{
          scope.row.type === 1 ? "是" : "否"
        }}</template>
      </el-table-column>

      <el-table-column align="center" label="核算协助">
        <template v-slot="scope">{{
          scope.row.type === 1 ? "是" : "否"
        }}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleUpdate(scope, 'update')"
            >编辑</el-button
          >
          <el-button type="primary" link @click="handleDelete(scope.$index)"
            >删除</el-button
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

    <div class="m-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button
        v-if="updateStatus !== 'detail'"
        type="primary"
        @click="handleSubmit"
        >提交</el-button
      >
    </div>

    <DialogDetail
      :dialogFormVisible="dialogFormVisible"
      :dialogStatus="dialogStatus"
      @closeDialog="handleCloseDialog"
    />
  </div>
</template>

<script>
import { addObj, editObj, findMetierScene } from "../../api/voucherRule.js";
import DialogDetail from "./dialogDetail.vue";

export default {
  name: "setManageDetail",
  components: {
    DialogDetail,
  },
  data() {
    return {
      form: {
        status: 1,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入规则名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        ywType : [
          {
            required: true,
            message: "请选择业务类别",
            trigger: "blur",
          },
        ],
        // originalType: [
        //   {
        //     required: true,
        //     message: "请选择原始凭证类别",
        //     trigger: "blur",
        //   },
        // ],
      },
      id: "",
      updateStatus: "",
      textMap: {
        update: "编辑凭证规则",
        create: "新增凭证规则",
        detail: "凭证规则详情",
      },
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },

      dialogFormVisible: false,
      dialogStatus: "",
      metierSceneList: [],
    };
  },

  mounted() {
    this.findMetierScene();
    // 查询详
    const { id = "", updateStatus = "" } = this.$route.query;
    this.id = id;
    this.updateStatus = updateStatus;
  },
  watch: {
    // 如果id 存在就去查询详情
    id(newV) {
      if (newV) {
        // this.findTaxSubjectCascade(newV)
      }
    },
  },
  methods: {
    // 获取业务场景类别
    findMetierScene() {
      findMetierScene({
        pageIndex: 1,
        pageSize: 0,
      }).then((response) => {
        this.metierSceneList = response.rows;
      });
    },
    cancel() {
      this.$router.push({ path: "/basic/voucherRulesList" });
    },
    handleUpdate(id = "", dialogStatus = "") {
      this.dialogFormVisible = true;
      this.dialogStatus = dialogStatus;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },

    // 提交表单
    handleSubmit() {
      const set = this.$refs;
      set["form"].validate((valid) => {
        if (!valid) return false;
        if (this.updateStatus === "create") {
          this.create();
        } else {
          this.update();
        }
      });
    },
    // 创建
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "新建成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    // 编辑
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    handleCloseDialog(updateFlag, data) {
      console.log(1);
      this.dialogFormVisible = false;
      if (updateFlag) {
        this.list = this.list.concat(data);
      }
    },
    handleDelete(rowIndex) {
      console.log(rowIndex);
      this.list = this.list.filter((item, index) => index !== rowIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
.p-page {
  .m-title {
    margin: 0 16px 24px;
  }
  .m-footer {
    margin: 32px 0 32px 33%;
  }
  .m-btns {
    float: right;
    .el-button {
      margin: 0 0 16px 16px;
    }
  }
}
</style>
