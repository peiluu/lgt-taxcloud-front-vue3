import { createApp, component } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss'; // global css

import * as ElIcons from '@element-plus/icons-vue';

const app = createApp(App);
// import '@/permission' // 权限控制

for (const iconName in ElIcons) {
	app.component(iconName, ElIcons[iconName]);
}
app.use(router).use(store).use(ElementPlus).mount('#app');
