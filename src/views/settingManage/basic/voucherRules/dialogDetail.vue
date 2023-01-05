<template>
  <el-dialog :title="textMap[props.dialogStatus]" v-model="props.dialogFormVisible">
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      ref="ruleForms"
      class="dialogDetail-form"
    >
      <el-form-item label="摘要" prop="abstract">
        <el-input v-model="form.abstract" placeholder="请输入摘要" />
      </el-form-item>

      <el-form-item label="科目" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择">
          <el-option
            v-for="(item) in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="借贷" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="(item) in  typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="协助核算" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="(item) in  typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { addObj, editObj } from "../../api/index.js";
import { reactive, defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  dialogStatus: {
    type: String,
    default: ""
  },
  dialogFormVisible: {
    type: Boolean,
    default: false
  }
});

const textMap = reactive({
  update: "编辑凭证规则",
  create: "新增凭证规则",
  detail: "凭证规则详情"
});
const form = reactive({});
const rules = reactive({
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
});
const typeList = reactive([{
  id: 1,
  name: 1
}]);

const ruleForms = ref(null);

const emit = defineEmits(["closeDialog"]);

const cancel = () => {
  emit("closeDialog", false);
};
const handleSubmit = () => {
  ruleForms.value.validate(valid => {
    if (!valid) return false;
    // 调用接口
    emit("closeDialog", true, form);
    // const api = props.dialogStatus === "create" ? addObj : editObj;
    // api(form).then(() => {
    //   emit("closeDialog", true, form);
    // });
  });
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