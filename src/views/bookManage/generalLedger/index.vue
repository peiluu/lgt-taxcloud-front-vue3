<template>
  <div>
    <div class="m-header"></div>
  </div>
</template>

<script setup>
// import { addObj, editObj } from "../../api/index.js";
import { reactive, defineProps, ref, defineEmits } from "vue";

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
