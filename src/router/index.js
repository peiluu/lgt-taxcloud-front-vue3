import { createRouter, createWebHashHistory } from "vue-router";
// import { constantRouterMap } from './router.js';

import Layout from "../views/layout/Layout";

export const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    redirect: "/login",
    hidden: true,
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/dashboard/dashboard'
  // },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    name: "登录NxAdmin",
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/login/register"),
    name: "注册",
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
    path: "/home",
    component: Layout,
    // component: () => import('@/views/home/index'),
    meta: { title: "首页", icon: "home" },
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "home" },
      },
    ],
  },
  // 账套管理
  {
    path: "/setManage",
    component: Layout,
    meta: { title: "账套管理", icon: "dashboard" },
    children: [
      {
        path: "list",
        name: "账套管理",
        component: () => import("@/views/setManage/index"),
        meta: { title: "账套管理", icon: "dashboard" },
      },
      {
        path: "detail",
        name: "账套详情",
        // 非菜单路由
        hidden: true,
        component: () => import("@/views/setManage/detail"),
        meta: { title: "账套详情", icon: "dashboard" },
      },
    ],
  },
  // 企业管理
  {
    path: "/businessManage",
    component: Layout,
    meta: { title: "企业管理", icon: "dashboard" },
    children: [
      {
        path: "list",
        name: "企业管理",
        component: () => import("@/views/businessManage/index"),
        meta: { title: "企业管理", icon: "dashboard" },
      },
      {
        path: "detail",
        name: "企业详情",
        // 非菜单路由
        hidden: true,
        component: () => import("@/views/businessManage/detail"),
        meta: { title: "企业详情", icon: "dashboard" },
      },
    ],
  },

  // 设置管理
  {
    path: "/settingManage",
    component: Layout,
    meta: { title: "设置管理", icon: "dashboard" },
    children: [
      {
        path: "/basic",
        name: "基础设置",
        meta: { title: "基础设置", icon: "dashboard" },
        // 三级菜单嵌套
        children: [
          {
            path: "subject",
            name: "科目设置",
            component: () =>
              import("@/views/settingManage/basic/subject/index"),
            meta: { title: "科目设置", icon: "dashboard" },
          },
          {
            path: "voucherRulesList",
            name: "凭证规则设定",
            component: () =>
              import("@/views/settingManage/basic/voucherRules/index"),
            meta: { title: " 凭证规则设定", icon: "dashboard" },
          },
          {
            path: "voucherRulesDetail",
            name: "凭证规则详情",
            hidden: true,
            component: () =>
              import("@/views/settingManage/basic/voucherRules/detail"),
            meta: { title: " 凭证规则详情", icon: "dashboard" },
          },
        ],
      },
      {
        path: "/rules",
        name: "规则设置",
        meta: { title: "规则设置", icon: "dashboard" },
        children: [
          {
            path: "subject",
            name: "辅助核算设定",
            component: () =>
              import("@/views/settingManage/basic/subject/index"),
            meta: { title: "辅助核算设定", icon: "dashboard" },
          },
        ],
      },
      {
        path: "/system",
        name: "系统设置",
        meta: { title: "系统设置", icon: "dashboard" },
        children: [
          {
            name: "操作日志",
            path: "operationLog",
            component: () =>
              import("@/views/settingManage/system/operationLog/index"),
            meta: { title: "操作日志", icon: "dashboard" },
          },
        ],
      },
    ],
  },

  // 账簿管理
  {
    path: "/bookManage",
    component: Layout,
    meta: { title: "账簿管理", icon: "dashboard" },
    children: [
      {
        path: "generalLedger",
        name: "总账查询",
        component: () => import("@/views/bookManage/generalLedger/index"),
        meta: { title: "总账查询", icon: "dashboard" },
      },
      {
        path: "subjectBalanceTable",
        name: "科目余额表",
        component: () => import("@/views/bookManage/subjectBalanceTable/index"),
        meta: { title: "科目余额表", icon: "dashboard" },
      },
      {
        path: "subLedgerQuery",
        name: "明细账查询",
        component: () => import("@/views/bookManage/subLedgerQuery/index"),
        meta: { title: "明细账查询", icon: "dashboard" },
      },
    ],
  },
  // 结转结账
  {
    path: "/carryingForward",
    component: Layout,
    meta: { title: "结转结账", icon: "dashboard" },
    children: [
      {
        path: "closing",
        name: "期末结账",
        component: () => import("@/views/carryingForward/closing/index"),
        meta: { title: "期末结账", icon: "dashboard" },
      },
      {
        path: "carryForward",
        name: "期末结转",
        component: () => import("@/views/carryingForward/carryForward/index"),
        meta: { title: "期末结转", icon: "dashboard" },
      },
    ],
  },
  // 报表查询
  {
    path: "/reportQuery",
    component: Layout,
    meta: { title: "报表查询", icon: "dashboard" },
    children: [
      {
        path: "profitTable",
        name: "利润表",
        component: () => import("@/views/reportQuery/profitTable/index"),
        meta: { title: "利润表", icon: "dashboard" },
      },
      {
        path: "assetsLiabilitiesTable",
        name: "资产负债表",
        component: () =>
          import("@/views/reportQuery/assetsLiabilitiesTable/index"),
        meta: { title: "资产负债表", icon: "dashboard" },
      },
      {
        path: "cashFlowTable",
        name: "现金流量表",
        component: () => import("@/views/reportQuery/cashFlowTable/index"),
        meta: { title: "现金流量表", icon: "dashboard" },
      },
    ],
  },
  // 原始凭证管理
  {
    path: "/originalVoucherManage",
    component: Layout,
    meta: { title: "原始凭证管理", icon: "dashboard" },
    children: [
      {
        path: "invoiceList",
        name: "发票管理",
        component: () => import("@/views/originalVoucherManage/invoice/index"),
        meta: { title: "发票管理", icon: "dashboard" },
      },
      {
        path: "invoiceDetail",
        name: "发票详情",
        hidden: true,
        component: () => import("@/views/originalVoucherManage/invoice/detail"),
        meta: { title: "发票详情", icon: "dashboard" },
      },
      {
        path: "originalVoucherList",
        name: "原始凭证管理",
        component: () =>
          import("@/views/originalVoucherManage/originalVoucher/index"),
        meta: { title: "原始凭证管理", icon: "dashboard" },
      },
      {
        path: "originalVouchereDetail",
        name: "原始凭证详情",
        hidden: true,
        component: () =>
          import("@/views/originalVoucherManage/originalVoucher/detail"),
        meta: { title: "原始凭证详情", icon: "dashboard" },
      },
    ],
  },
  // 记账凭证管理
  {
    path: "/bookKeepingVoucherManage",
    component: Layout,
    meta: { title: "记账凭证管理", icon: "dashboard" },
    children: [
      {
        path: "entry",
        name: "录入记账凭证",
        component: () => import("@/views/bookKeepingVoucherManage/entry/index"),
        meta: { title: "录入记账凭证", icon: "dashboard" },
      },
      {
        path: "query",
        name: "查询记账凭证",
        component: () => import("@/views/bookKeepingVoucherManage/query/index"),
        meta: { title: "查询记账凭证", icon: "dashboard" },
      },
      {
        path: "summary",
        name: "记账凭证汇总",
        component: () =>
          import("@/views/bookKeepingVoucherManage/summary/index"),
        meta: { title: "记账凭证汇总", icon: "dashboard" },
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap],
});
