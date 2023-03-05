import { createRouter, createWebHistory } from "vue-router";
// import type { RouteRecordRaw } from "vue-router";
// import BasicLayout from "../layouts/BasicLayout.vue";
// import BlankLayout from "../layouts/BlankLayout.vue";
// import WelcomePage from "../views/Hello.vue";

const routes: any[] = [
  {
    path: "/",
    name: "index",
    meta: { title: "Home" },
    // component: BasicLayout,
    redirect: "/crm/welcome",
    children: [
      {
        path: "crm/dashboard/workspace",
        name: "welcome",
        meta: { title: "子服务dashboard", icon: "SmileOutlined" },
        component: null,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
