<template>
  <div>
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
      <el-card>
        <template #header>附件上传</template>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-remove="handleRemove"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <span>支持扩展名：png .jpg..不得超过100M</span>
      </el-card>

      <el-card>
        <template #header>基本信息</template>

        <el-form-item label="原始凭证场景" prop="dcdirection">
          <el-select v-model="form.dcdsirection">
            <el-option :value="1" label="小规模纳税人" />
          </el-select>
        </el-form-item>

        <el-form-item label="业务类别" prop="dcdirection">
          <el-select v-model="form.dcdsirection">
            <el-option :value="1" label="小规模纳税人" />
          </el-select>
        </el-form-item>

        <el-form-item label="发生金额" prop="qymc">
          <el-input v-model="form.qymc" placeholder="请输入发生金额" />
        </el-form-item>

        <el-form-item label="发生时间" prop="status">
          <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" placeholder="日期" />
        </el-form-item>
      </el-card>
    </el-form>

    <div class="m-footer">
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交生成凭证</el-button>
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交暂不生成凭证</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addObj, editObj } from "../api/index.js";

export default {
  name: "originalVoucherDetail",
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
        update: "编辑原始凭证",
        create: "新增原始凭证",
        detail: "原始凭证详情"
      },
      fileList: []
    };
  },
  created() {},

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
      this.$router.replace({
        path: "/originalVoucherManage/originalVoucherList"
      });
    },
    handleRemove(uploadFile) {
      console.log(this.fileList);
      console.log(uploadFile);
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
.m-title {
  margin: 0 16px 24px;
}
.m-footer {
  margin: 48px 0 32px 33%;
}
.el-card {
  margin-bottom: 16px;
  &:first-child {
    /deep/ .el-card__body {
      display: flex;
      align-items: flex-end;
      span {
        padding-left: 8px;
      }
    }
  }
}
</style>
