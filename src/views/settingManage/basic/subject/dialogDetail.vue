<template>
  <el-dialog
    :title="textMap[props.dialogStatus]"
    v-model="dialogFormVisible"
    :beforeClose="cancel"
    destroy-on-close
  >
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      ref="ruleForms"
      class="dialogDetail-form"
    >
      <el-form-item label="科目编码" prop="subjectCode">
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

      <el-form-item label="上级科目" prop="pid">
        <el-cascader
          v-model="form.pid"
          placeholder="请选择科目"
          :options="sujectCascadeList"
          clearable
          :ref="cascaderRef"
          @change="handleChange"
          :props="subjectProps"
          popper-class="cascaderClass"
          :disabled="props.dialogStatus !== 'create'"
        />
      </el-form-item>

      <el-form-item label="科目类别" prop="subjectCate">
        <el-select v-model="props.subjectCate" placeholder="请选择" disabled>
          <el-option
            v-for="item in subjectCateList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="辅助核算" prop="checked">
        <div class="item-box">
          <el-checkbox v-model="checked" />
          <el-select v-model="form.helpCal" v-if="checked">
            <el-option
              v-for="item in helpCalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
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
import { addObj, editObj, findTaxSubjectCascade } from "../../api/subject.js";
import { reactive, defineProps, ref, defineEmits, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogStatus: {
    type: String,
    default: "",
  },
  dialogFormVisible: {
    type: Boolean,
    default: false,
  },
  subjectCate: {
    type: Number,
    default: 0,
  },
  subjectCateList: {
    type: Array,
  },
  rowData: {
    type: Object,
    default: () => {},
  },
});
let checked = ref(false);
const cascaderRef = ref();
const textMap = reactive({
  update: "编辑科目",
  create: "新增科目",
  addSub: "新增下级科目",
});
let dialogFormVisible = ref(false);
let form = reactive({ status: 1 });

const rules = reactive({
  subjectCode: [
    {
      required: true,
      message: "请输入科目代码",
      trigger: "blur",
    },
    {
      min: 1,
      max: 30,
      message: "长度在 1 到 20 个字符",
      trigger: "blur",
    },
  ],
  subjectName: [
    {
      required: true,
      message: "请输入科目名称",
      trigger: "blur",
    },
    {
      min: 1,
      max: 30,
      message: "长度在 1 到 20 个字符",
      trigger: "blur",
    },
  ],
});

let sujectCascadeList = reactive([]);
const helpCalList = reactive([{ id: 1, name: "客户" }]);
const subjectProps = reactive({
  label: "subjectName",
  value: "id",
  checkStrictly: true,
});

const ruleForms = ref(null);

const emit = defineEmits(["closeDialog"]);

// 根据科目类别查找下属的级联科目列表
watch(
  () => props.subjectCate,
  (newVal) => {
    findFatherList(newVal);
    // form.subjectCate = props.subjectCate;
    // console.log(form);reactive
  }
);
// 监听弹窗状态的变化
watch(
  () => props.dialogFormVisible,
  (newVal) => {
    dialogFormVisible = newVal;
  }
);
onMounted(() => {
  console.log("onMounted");
});
// 监听编辑行数据的变化，
watch(
  () => props.rowData,
  (newVal) => {
    if (!newVal.id) return;
    // 编辑科目
    if (props.dialogStatus === "update") {
      form = reactive({ ...form, ...newVal });
    }
    // // 新增下级科目
    if (props.dialogStatus === "addSub") {
      form = reactive({ ...form, pid: newVal.id });
    }
    // 判断有没有辅助核算
    checked = !!newVal.helpCal && props.dialogStatus === "update";
    // debugger;
  }
);

const cancel = () => {
  form = {};
  emit("closeDialog", false);
};
const handleSubmit = () => {
  ruleForms.value.validate((valid) => {
    if (!valid) return false;
    if (form.pid === form.id) {
      ElMessage({
        message: "请勿添加重复的科目",
        type: "error",
        duration: 5 * 1000,
      });
      return false;
    }
    // 调用接口
    const api = props.dialogStatus === "create" ? addObj : editObj;
    api(form).then(() => {
      form = {};
      emit("closeDialog", true);
    });
  });
};

// 查找级联列表
const findFatherList = (id) => {
  findTaxSubjectCascade(id).then((response) => {
    sujectCascadeList = response;
  });
};
const handleChange = (value) => {
  form.pid = value && value.length ? value[value.length - 1] : "";
  // cascaderRef.value.dropDownVisible = false;
};
</script>
<style lang="scss" scoped>
.m-title {
  margin: 0 16px 24px;
}
.m-footer {
  margin: 32px 0 32px 33%;
}
.item-box {
  display: flex;
  .el-select {
    margin-left: 16px;
  }
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
