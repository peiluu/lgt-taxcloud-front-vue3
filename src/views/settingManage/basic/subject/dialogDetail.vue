<template>
  <el-dialog :title="textMap[props.dialogStatus]" v-model="props.dialogFormVisible">
    <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForms" class="dialogDetail-form">
      <el-form-item label="科目编码" prop="subjectCode">
        <el-input v-model="form.subjectCode" placeholder="请输入科目代码"></el-input>
      </el-form-item>
      <el-form-item label="科目名称" prop="subjectName">
        <el-input v-model="form.subjectName" placeholder="请输入科目名称"></el-input>
      </el-form-item>
      <el-form-item label="科目类别" prop="isSale">
        <el-select v-model="form.costIncome" placeholder="请选择">
          <el-option
            v-for="(item) in typeList"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上级科目" prop="accoutingStandard">
        <el-select v-model="form.accoutingStandard" placeholder="请选择会计准则">
          <el-option v-for="(item) in  typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="辅助核算" prop="accoutingStandard">
        <el-checkbox v-model="form.checked1" />
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
import {
  defineComponent,
  reactive,
  defineProps,
  onMounted,
  ref,
  defineEmits
} from "vue";


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

console.log(props);

const textMap = reactive({
  update: "编辑企业",
  create: "新增企业",
  detail: "企业详情"
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
const typeList = reactive([]);

const ruleForms = ref(null);

const emit = defineEmits(["closeDialog"]);

const cancel = () => {
  emit("closeDialog", false);
};
const handleSubmit = () => {
  ruleForms.value.validate(valid => {
    if (!valid) return false;
    // 调用接口
    const api = this.dialogStatus === "create" ? addObj : editObj;
    api(this.form).then(() => {
      emit("closeDialog", true);
    });
  });
};

// export default {
//   name: "dialogDetail",
//   props: {},
//   data() {
//     return {
//       form: {
//         dcdirection: 1,
//         status: 1
//       },
//       rules: {
//         qymc: [
//           {
//             required: true,
//             message: "请输入企业名称",
//             trigger: "blur"
//           },
//           {
//             min: 1,
//             max: 20,
//             message: "长度在 1 到 20 个字符",
//             trigger: "blur"
//           }
//         ],
//         time: [
//           {
//             required: true,
//             message: "请选择启用期间",
//             trigger: "blur"
//           }
//         ],
//         accoutingStandard: [
//           {
//             required: true,
//             message: "请选择会计准则",
//             trigger: "blur"
//           }
//         ]
//       },
//       id: "",
//       dialogStatus: "",
//       textMap: {
//         update: "编辑企业",
//         create: "新增企业",
//         detail: "企业详情"
//       }
//     };
//   },
//   created() {},

//   mounted() {
//     // 查询详情
//     const { id = "", dialogStatus = "" } = this.$route.query;
//     this.id = id;
//     this.dialogStatus = dialogStatus;
//   },
//   watch: {
//     // 如果id 存在就去查询详情
//     id(newV) {
//       if (newV) {
//         // this.findTaxSubjectCascade(newV)
//       }
//     }
//   },
//   methods: {
//     cancel() {
//       this.$router.replace({ path: "/businessManage/list" });
//     },
//     // 提交表单
//     handleSubmit() {
//       const set = this.$refs;
//       set["form"].validate(valid => {
//         if (!valid) return false;
//         if (this.dialogStatus === "create") {
//           this.create();
//         } else {
//           this.update();
//         }
//       });
//     },
//     // 创建账套
//     create() {
//       addObj(this.form).then(() => {
//         this.dialogFormVisible = false;
//         this.getList();
//         this.$notify({
//           title: "成功",
//           message: "新建成功",
//           type: "success",
//           duration: 2000
//         });
//       });
//     },
//     // 编辑账套
//     update() {
//       editObj(this.form).then(() => {
//         this.dialogFormVisible = false;
//         this.getList();
//         this.$notify({
//           title: "成功",
//           message: "更新成功",
//           type: "success",
//           duration: 2000
//         });
//       });
//     }
//   }
// };
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
