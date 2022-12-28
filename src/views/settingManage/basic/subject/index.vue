<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>vue3样板页面 - {{ message }}</div>
	<el-button @click="fun">点击</el-button>
</template>

<script setup>
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue';
// export default defineComponent({
// setup() {
// ref定义基本数据类型
const message = ref('提示消息');
const dataMap = reactive({
	fullscreenLoading: true,
	text: 1,
	fetchData: () => {
		setTimeout(() => {
			dataMap.fullscreenLoading = false;
		}, 2000);

		setTimeout(() => {
			// window.print();
		}, 2600);
	},
});
const fun = () => {
	console.log('调用fun, 输出' + message.value);
};
onMounted(() => {
	console.log(1111);
	dataMap.fetchData();
	fun();
});
// return { ...toRefs(dataMap), message };
// },
// });
</script>
