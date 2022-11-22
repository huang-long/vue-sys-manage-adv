import type { RouteRecordRaw } from 'vue-router'
import MainView from '../views/main.vue';

//系统默认的路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: "root",
    redirect: '/login'
  },
  {
    path: '/',
    name: 'main',
    component: MainView,
    // children: [{
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/404.vue')
    // }],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
]
export default routes;
