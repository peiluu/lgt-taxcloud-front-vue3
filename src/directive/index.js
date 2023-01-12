// import Vue from "vue";
export default {
  install(Vue) {
    // 注册全局指令
    Vue.directive("focus", {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        console.log(11);
        // 聚焦元素
        el.focus();
      },
    });
  },
};
