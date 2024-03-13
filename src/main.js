import { createApp } from 'vue'
import App from './App.vue'
import "./style/reset.scss"
import 'bootstrap/dist/css/bootstrap.css'
import "./style/comman.scss"
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app=createApp(App)
app.use(router)
app.use(ElementPlus)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
