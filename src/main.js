import { createApp } from "vue";
import router from "./router";
import store from "./store";
import directive from "./directive";
// import cookies from "@/utils/cookies";
import "@/permission"; // 权限控制
import "@/utils/cookies";

import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss"; // global css

import * as ElIcons from "@element-plus/icons-vue";
// console.log(Vue)
// Vue.prototype.$cookies = cookies;
const app = createApp(App);


for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName]);
}
app.use(router).use(store).use(directive).use(ElementPlus).mount("#app");
