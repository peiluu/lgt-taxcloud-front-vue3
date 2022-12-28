<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div>vue3样板页面 - {{ message }}</div>
		<el-button @click="fun">点击</el-button>
		<div v-for="item in list" :key="item.key">
			<div>{{item.lable}}</div>
		</div>
		<LgtMyFocus />
		<ComTest :msg="message" />
	</div>
</template>

<script setup>
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue';
// 不需要声明组件
import LgtMyFocus from '@/views/home/components/lgt-myfocus';
import ComTest from '../../components/comtest';

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

		}, 2600);
	},
});

const fun = () => {
	console.log('调用fun, 输出' + message.value);
};

let list = reactive([])

onMounted(() => {
	console.log(1111);
	dataMap.fetchData();
	fun();
	list = [{key: 1, lable: 11}]
});

</script>
