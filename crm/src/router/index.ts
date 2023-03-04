import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "crm",
    component: HomeView,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
          permiss: "1",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "/table",
        name: "basetable",
        meta: {
          title: "表格",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "table" */ "../views/table.vue"),
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(
    (window as any).__POWERED_BY_QIANKUN__ ? "/crm" : "/"
  ),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
