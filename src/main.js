// 引入外部库
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";

// 绝对路径引入
import router from "@/router";
import store from "@/store";
import directive from "@/directive";

import "@/permission"; // 权限控制
import "@/styles/index.scss"; // global css
import "@/utils/cookies";

// import cookies from "@/utils/cookies";

// 相对路径引入
import App from "./App.vue";

const app = createApp(App);

for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName]);
}
app.use(router).use(store).use(directive).use(ElementPlus).mount("#app");
