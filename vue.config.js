// const path = require("path");
const { defineConfig } = require("@vue/cli-service");

/**
 * @desption - 配置scss变量自动化导入样式文件全局引入
 * @param -  ( 用于颜色、变量、 mixin 等 ) ，可以使用 sass-resources-loader
 */
const globalSass = (config) => {
  const oneOfsMap = config.module.rule("scss").oneOfs.store;
  oneOfsMap.forEach((item) => {
    item
      .use("sass-resources-loader")
      .loader("sass-resources-loader")
      // 相对路径
      .options({ resources: "./src/styles/mixin.scss" })
      .end();
  });
};


module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭自动lint校验
  lintOnSave: false,
  // 通过链式编程的形式,来修改默认的 webpack 配置
  chainWebpack: (config) => {
    globalSass(config)
  },
  devServer: {
    host: "localhost",
    port: 9530,
    open: true, //vue项目启动时自动打开浏览器
  },
});
