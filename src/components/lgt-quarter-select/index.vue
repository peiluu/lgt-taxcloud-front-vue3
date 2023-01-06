<template>
  <el-form :model="form" ref="form" :inline="true">
    <el-form-item :label="formLabel" prop="status">
      <slot />
      <el-select v-model="form.date">
        <el-option
          v-for="item in quarterlyList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" icon="search" @click="$emit('query',form)">查询</el-button>
    </el-form-item>

    <el-form-item style="float: right">
      <el-button @click="$emit('export')">导出</el-button>
    </el-form-item>
    <el-form-item style="float: right">
      <el-button @click="$emit('print')">打印</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * @desption 季度下拉选择器
 * */
import { getQuarterlyList } from "@/utils/util";
export default {
  name: "lgtQuarterlySelect",
  props: {
    formLabel: {
      type: String
    }
  },
  data() {
    return {
      form: {},
      quarterlyList: []
    };
  },

  mounted() {
    this.quarterlyList = getQuarterlyList(2);
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 16px;
}
</style>
