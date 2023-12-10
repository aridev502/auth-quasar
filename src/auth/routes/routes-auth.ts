import { RouteRecordRaw } from "vue-router";

const routes_auth: RouteRecordRaw[] = [


  {

    path: '/auth',
    component: () => import('../layout/AuthLayout.vue'),
    children: []
  }
];


export default routes_auth;
