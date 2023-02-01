<template>
  <div>
    <h3 class="m-title">{{ textMap[updateStatus] || "新增企业" }}</h3>
    <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="detail-form" :disabled="updateStatus === 'detail'">
      <el-form-item label="企业名称" prop="qymc">
        <el-input v-model="form.qymc" placeholder="请输入企业名称" />
      </el-form-item>

      <el-form-item label="纳税类型" prop="nslx">
        <el-select v-model="form.nslx" disabled>
          <el-option :value="0" label="小规模纳税人" />
        </el-select>
      </el-form-item>

      <el-form-item label="纳税人识别号" prop="nsrsbh">
        <el-input v-model="form.nsrsbh" placeholder="请输入纳税人识别号" />
      </el-form-item>

      <el-form-item label="所属行业" prop="sshy">
        <el-cascader v-model="form.sshy" :options="cascadeList" clearable ref="cascaderRef" @change="handleChange" :props="props" popper-class='cascaderClass'></el-cascader>
        <!-- <el-input v-model="form.sshy" placeholder="请输入所属行业" /> -->
      </el-form-item>

      <el-form-item label="经营地址" prop=" jydz">
        <el-select v-model="form.jydz" placeholder="请选择经营地址">
          <el-option :value="1" label="小规模纳税人" />
        </el-select>
      </el-form-item>

      <el-form-item label="经营范围" prop="jyfw" class="el-form-item-full">
        <el-input v-model="form.jyfw" :rows="3" type="textarea" placeholder=" 请输入经营范围" />
      </el-form-item>

      <el-form-item label="联系人" prop="lxr">
        <el-input v-model="form.lxr" placeholder="请输入联系人" />
      </el-form-item>

      <el-form-item label="联系电话" prop="lxdh">
        <el-input v-model="form.lxdh" placeholder="请输入联系电话" max="8" />
      </el-form-item>

      <el-form-item label="设为默认" prop="sfmr">
        <el-select v-model="form.sfmr" placeholder>
          <el-option value="1" label="开启" />
          <el-option value="0" label="关闭" />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="m-footer">
      <el-button @click="toBack">取消</el-button>
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { page, addObj, editObj, findTaxMetierCascade } from "./api/index.js";

export default {
  name: "setManageDetail",
  data() {
    return {
      form: {
        nslx: 0,
        sfmr: 1
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
        nsrsbh: [
          {
            required: true,
            message: "请输入纳税人识别号",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度为位数字",
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
      // 行业
      cascadeList: [],
      textMap: {
        update: "编辑企业",
        create: "新增企业",
        detail: "企业详情"
      },
      props: {
        label: 'metierName',
        value: 'id',
        checkStrictly: true
      },
    };
  },
  created() {
    // this.create()
  },

  mounted() {
    // 查询详情
    const { id = "", updateStatus = "" } = this.$route.query;
    this.id = id;
    this.updateStatus = updateStatus;
    this.findTaxMetierCascade()

  },
  watch: {
    // 如果id 存在就去查询详情
    id(newV) {
      if (newV) {
        this.getDetail({
          pageIndex: 1,
          pageSize: 10,
          id: newV
        })
      }
    }
  },
  methods: {
    getDetail(params) {
      page(params).then(response => {
        this.form = response.rows[0] || {}
      });
    },
    toBack() {
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
    // 创建企业
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "新建成功",
          type: "success",
          duration: 2000
        });
        this.toBack()
      });
    },
    // 编辑企业
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
        this.toBack()
      });
    },
    // 查询行业级联列表
    findTaxMetierCascade() {
      findTaxMetierCascade().then(response => {
        this.cascadeList = response
      })
    },
    handleChange(value) {
      this.form.sshy = value && value.length ? value[value.length - 1] : ''
      this.$refs.cascaderRef.dropDownVisible = false
    },
  }
};
</script>
<style lang="scss" scoped>
.m-title {
  margin: 0 16px 24px;
}

.m-footer {

  margin: 32px 0 32px 33%;
}

.cascaderClass {
  .el-radio__inner {
    top: -18px;
    left: -19px;
    border-radius: 0;
    border: 0;
    width: 170px;
    height: 34px;
    background-color: transparent;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: transparent;
  }

}
</style>
