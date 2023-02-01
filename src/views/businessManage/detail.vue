<template>
  <div class="p-page">
    <h3 class="m-title">{{ textMap[updateStatus] || "新增企业" }}</h3>
    <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="detail-form"
      :disabled="updateStatus === 'detail'"
    >
      <el-form-item label="企业名称" prop="qymc">
        <el-input v-model="form.qymc" placeholder="请输入企业名称" />
      </el-form-item>

      <el-form-item label="纳税类型" prop="dcdirection">
        <el-select v-model="form.dcdirection" disabled>
          <el-option :value="1" label="小规模纳税人" />
        </el-select>
      </el-form-item>

      <el-form-item label="纳税人识别号" prop="nsrsbh">
        <el-input v-model="form.nsrsbh" placeholder="请输入纳税人识别号" />
      </el-form-item>

      <el-form-item label="所属行业" prop="metierName">
        <el-input v-model="form.metierName" placeholder="请输入所属行业" />
      </el-form-item>

      <el-form-item label="经营地址" prop="dcdirection">
        <el-select v-model="form.dcdsirection" placeholder="请选择经营地址">
          <el-option :value="1" label="小规模纳税人" />
        </el-select>
      </el-form-item>

      <el-form-item label="经营范围" prop="nsrsbh" class="el-form-item-full">
        <el-input v-model="form.textarea" :rows="3" type="textarea" placeholder=" 请输入经营范围" />
      </el-form-item>

      <el-form-item label="联系人" prop="nsrsbh">
        <el-input v-model="form.nsrsbh" placeholder="请输入所属行业" />
      </el-form-item>

      <el-form-item label="联系电话" prop="nsrsbh">
        <el-input v-model="form.nsrsbh" placeholder="请输入所属行业" />
      </el-form-item>

      <el-form-item label="设为默认" prop="status">
        <el-select v-model="form.status" placeholder>
          <el-option :value="1" label="开启" />
          <el-option :value="2" label="关闭" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="m-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { addObj, editObj } from "./api/index.js";

export default {
  name: "setManageDetail",
  data() {
    return {
      form: {
        dcdirection: 1,
        status: 1
      },
      rules: {
        qymc: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择启用期间",
            trigger: "blur"
          }
        ],
        accoutingStandard: [
          {
            required: true,
            message: "请选择会计准则",
            trigger: "blur"
          }
        ]
      },
      id: "",
      updateStatus: "",
      textMap: {
        update: "编辑企业",
        create: "新增企业",
        detail: "企业详情"
      }
    };
  },
  created() {
    this.create()
  },

  mounted() {
    // 查询详情
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
    }
  },
  methods: {
    cancel() {
      this.$router.replace({ path: "/businessManage/list" });
    },
    // 提交表单
    handleSubmit() {
      const set = this.$refs;
      set["form"].validate(valid => {
        if (!valid) return false;
        if (this.updateStatus === "create") {
          this.create();
        } else {
          this.update();
        }
      });
    },
    // 创建账套
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "新建成功",
          type: "success",
          duration: 2000
        });
      });
    },
    // 编辑账套
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      });
    }
  }
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
}
</style>
