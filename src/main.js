import { createApp } from 'vue';
import router from './router';
import store from './store';
import directive from './directive'
// console.log(directive)
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss'; // global css

import * as ElIcons from '@element-plus/icons-vue';

const app = createApp(App);
import '@/permission' // 权限控制

for (const iconName in ElIcons) {
	app.component(iconName, ElIcons[iconName]);
}
app.use(router).use(store).use(directive).use(ElementPlus).mount('#app');
