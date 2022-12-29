const path = require("path");
const { defineConfig } = require("@vue/cli-service");

/**
 * @desption - 配置scss变量自动化导入样式文件全局引入
 * @param -  ( 用于颜色、变量、 mixin 等 ) ，可以使用 style-resources-loader
 */
// function addStyleResource(rule) {
//   rule
//     .use("style-resource")
//     .loader("style-resources-loader")
//     .options({
//       patterns: [path.resolve(__dirname, "@/src/styles/mixin.scss")],
//     });
// }

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 通过链式编程的形式,来修改默认的 webpack 配置
  // chainWebpack: (config) => {
  //   const types = ["vue-modules", "vue", "normal-modules", "normal"];
  //   types.forEach((type) =>
  //     addStyleResource(config.module.rule("scss").oneOf(type))
  //   );
  // },
});
