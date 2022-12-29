<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
	<el-menu class="c-navbar" mode="horizontal">
		<div class="m-left">
			<nx-hamburger
				class="hamburger-container"
				:toggleClick="toggleSideBar"
				:isActive="sidebar.opened"
			></nx-hamburger>
			<!-- <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb> -->
			<div class="m-list">
				<div>
					当前主体 <span class="name"> {{ comName }}</span>
					<span class="btn">切换</span>
				</div>
				<template v-for="item in list" v-if="showChange" :key="item.name">
					<div>{{ item.name }}</div>
				</template>
			</div>
		</div>

		<div class="m-right">
			<span>{{ user.name }}</span>
			<el-button link type="primary" @click="logout">注销</el-button>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
// import nxTopLock from '@/components/nx-top-lock'
import nxHamburger from '@/components/nx-hamburger';
// import nxFullScreen from '@/components/nx-full-screen/index'

export default {
	name: 'navBar',
	components: {
		nxHamburger,

		// nxFullScreen,

		// nxTopLock,
	},
	data() {
		return {
			showChange: false,
			comName: '北京罗格科技有限公司',
			list: [
				{
					name: '北京罗格科技有限公司2',
				},
				{
					name: '北京罗格科技有限公司3',
				},
			],
			user: {
				name: 'admin',
			},
		};
	},
	computed: {
		...mapGetters(['sidebar', 'name', 'avatar']),
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('ToggleSideBar');
		},
		logout() {
			this.$router.push({
				path: '/login',
			});
			location.reload();
			// this.$store.dispatch('LogOut').then(() => {
			// 	location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
			// });
		},
	},
};
</script>

<style lang="scss" scoped>
.c-navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
	width: 100%;
	line-height: 50px;
	border-radius: 0px !important;
	padding: 0 16px;

	.hamburger-container {
		line-height: 58px;
		height: 50px;
		float: left;
		padding-right: 16px;
	}
	.m-left {
		display: flex;
	}

	.m-list {
		width: 100%;
		display: flex;
		color: #7f7f7f;
		font-size: 14px;
		font-weight: bold;

		.name {
			color: #6981ff;
		}

		.btn {
			margin-left: 8px;
			cursor: pointer;
			color: #e96979;
		}
	}

	.m-right {
		height: 100%;
    span{
      padding-right: 8px;
    }
	}
}
</style>
