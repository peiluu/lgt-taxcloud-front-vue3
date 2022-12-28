import Layout from '../views/layout/Layout';

export const constantRouterMap = [
	{
		path: '/',
		component: Layout,
		redirect: '/login',
		hidden: true,
	},
	// {
	//   path: '',
	//   component: Layout,
	//   redirect: '/dashboard/dashboard'
	// },
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		name: '登录NxAdmin',
		hidden: true,
	},
	{
		path: '/register',
		component: () => import('@/views/login/register'),
		name: '注册',
		hidden: true,
	},
	// { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
	// { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
	// 锁屏
	// {
	//   path: '/lock',
	//   hidden: true,
	//   name: '锁屏页',
	//   component: () => import('@/views/common/lock')
	// },
	// 首页
	{
		path: '/home',
		component: Layout,
		// component: () => import('@/views/home/index'),
		meta: { title: '首页', icon: 'home' },
		children: [
			{
				path: 'home',
				name: '首页',
				// component: () => import('@/views/home/index'),
				component: () => import('@/views/settingManage/basic/subject/index'),

				meta: { title: '首页', icon: 'home' },
			},
		],
	},
	// 账套管理
	{
		path: '/setManage',
		component: Layout,
		meta: { title: '账套管理', icon: 'dashboard' },
		children: [
			{
				path: 'list',
				name: '账套管理',
				component: () => import('@/views/setManage/index'),
				meta: { title: '账套管理', icon: 'dashboard' },
			},
			{
				path: '/detail',
				name: '账套详情',
				// 非菜单路由
				hidden: true,
				component: () => import('@/views/setManage/detail'),
				meta: { title: '账套详情', icon: 'dashboard' },
			},
		],
	},
	// 设置管理
	{
		path: '/settingManage',
		component: Layout,
		meta: { title: '设置管理', icon: 'dashboard' },
		children: [
			{
				path: '/basic',
				name: '基础设置',
				component: () => import('@/views/settingManage/basic/subject/index'),
				meta: { title: '基础设置', icon: 'dashboard' },
				// 三级菜单嵌套
				children: [
					{
						path: 'subject',
						name: '科目设置',
						component: () =>
							import('@/views/settingManage/basic/subject/index'),
						meta: { title: '科目设置', icon: 'dashboard' },
					},
					{
						path: 'voucherRules',
						name: ' 凭证规则设定',
						// 非菜单路由
						isNotMenu: true,
						component: () =>
							import('@/views/settingManage/system/voucherRules/index'),
						meta: { title: ' 凭证规则设定', icon: 'dashboard' },
					},
				],
			},
			{
				path: '/rules',
				name: '规则设置',
				// 非菜单路由
				isNotMenu: true,
				component: () => import('@/views/setManage/detail'),
				meta: { title: '规则设置', icon: 'dashboard' },
				children: [
					{
						path: 'subject',
						name: '辅助核算设定',
						component: () =>
							import('@/views/settingManage/basic/subject/index'),
						meta: { title: '辅助核算设定', icon: 'dashboard' },
					},
				],
			},
		],
	},
];
