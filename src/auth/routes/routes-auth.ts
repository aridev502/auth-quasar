import { RouteRecordRaw } from "vue-router";

const routes_auth: RouteRecordRaw[] = [


  {

    path: '/auth',
    component: () => import('../layout/AuthLayout.vue'),
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue'),
      }
    ]
  }
];


export default routes_auth;
