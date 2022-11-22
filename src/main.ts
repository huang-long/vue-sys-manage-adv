import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { i18n } from './i18n'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VXETable)
app.use(i18n)
app.mount('#app')
