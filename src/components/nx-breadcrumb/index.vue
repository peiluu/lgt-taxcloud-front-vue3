<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<template v-for="item in levelList">
				<el-breadcrumb-item :key="item.path" v-if="item.meta.title">
					<span class="no-redirect">{{ item.meta.title }}</span>
					<!-- <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect || item.path">{{ item.meta.title }}</router-link> -->
				</el-breadcrumb-item>
			</template>
		</transition-group>
		<div></div>
	</el-breadcrumb>
</template>

<script>
export default {
	name: 'nxBreadcrumb',
	created() {
		this.getBreadcrumb();
	},
	data() {
		return {
			levelList: null,
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		},
	},
	methods: {
		getBreadcrumb() {
			const matched = this.$route.matched.filter(item => item.name);
			// const first = matched[0];
			// if (first && first.name !== '/home') {
			//   matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
			// }
			this.levelList = matched;
			// console.log(this.levelList)
		},
	},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 50px;
	margin-left: 10px;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
