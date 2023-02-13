<template>
  <el-form :model="form" ref="form" :inline="true">
    <el-form-item :label="formLabel" prop="status">
      <el-form-item prop="periods" v-if="showPeriodsSelect">
        <el-select v-model="form.periods">
          <el-option key="1" value="1" label="月报" />
          <el-option key="2" value="2" label="季报" />
          <el-option key="3" value="3" label="半年报" />
        </el-select>
      </el-form-item>
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
      <el-button type="primary" icon="search" @click="$emit('query', form)"
        >查询</el-button
      >
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
 * @param formLabel 表单lable
 * @param showPeriodsSelect 是否显示周期选择器
 */

import { getQuarterlyList } from "@/utils/util";
export default {
  name: "lgtQuarterlySelect",
  props: {
    formLabel: {
      type: String,
    },
    showPeriodsSelect: {
      type: Boolean,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    quarterlyList() {
      return getQuarterlyList(2);
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 16px;
}
</style>
