import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import { i18n } from "./i18n";
import "./assets/main.css";
//导入所有图标库
import * as Icons from "@ant-design/icons-vue";
import Print from "vue3-print-ts";
// import formCreate from "@form-create/ant-design-vue";
// import FcDesigner from "@form-create/designer";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Antd);
// 全局使用图标
for (const [name, comp] of Object.entries(Icons)) {
  app.component(name, comp);
}
app.use(VXETable);
// app.use(formCreate);
// app.use(FcDesigner);
app.directive("print", Print);
app.mount("#app");
