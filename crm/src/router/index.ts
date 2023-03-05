import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import BasicLayout from "../views/layouts/BasicLayout.vue";
import BlankLayout from "../views/layouts/BlankLayout.vue";
import NestedLayout from "../views/layouts/NestedLayout.vue";
import WelcomePage from "../views/Hello.vue";

const routes: any[] = [
  {
    path: "/",
    name: "index",
    meta: { title: "Home" },
    component: BasicLayout,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "welcome",
        meta: { title: "欢迎", icon: "SmileOutlined" },
        component: WelcomePage,
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { title: "管理页", icon: "CrownOutlined" },
        redirect: "/dashboard/monitor",
        component: BlankLayout,
        children: [
          {
            path: "/dashboard/workspace",
            name: "workspace",
            meta: { title: "一级页面" },
            component: () => import("../views/TestPage.vue"),
          },
          {
            path: "/dashboard/monitor",
            name: "monitor",
            meta: { title: "二级页面" },
            component: () => import("../views/MyPage.vue"),
          },
          {
            path: "www.antdv.com/components/overview",
            name: "baidu_target",
            meta: {
              title: "Ant Design Vue 官网",
              icon: "link-outlined",
              target: "_self",
            },
            component: null,
          },
        ],
      },
      {
        path: "/list",
        name: "list",
        meta: { title: "列表页", icon: "MobileOutlined" },
        redirect: "/list/child2",
        component: BlankLayout,
        children: [
          {
            path: "child1",
            name: "list-child1",
            meta: { title: "一级列表页面" },
            component: BlankLayout,
            children: [
              {
                path: "child1",
                name: "list-child1-child1",
                meta: {
                  title: "一一级列表页面",
                  // attach `params` to `$route.params`
                  params: {
                    id: 1,
                  },
                },
                component: () => import("../views/DynamicPage.vue"),
              },
              {
                path: "child2",
                name: "list-child1-child2",
                meta: {
                  title: "二一级列表页面",
                  // attach `params` to `$route.params`
                  params: {
                    id: 2,
                  },
                },
                component: () => import("../views/DynamicPage.vue"),
              },
              {
                path: "child3",
                name: "list-child1-child3",
                meta: {
                  title: "三一级列表页面",
                  // attach `params` to `$route.params`
                  params: {
                    id: 3,
                  },
                },
                component: () => import("../views/DynamicPage.vue"),
              },
            ],
          },
          {
            path: "child2",
            name: "list-child2",
            meta: { title: "二级列表页面" },
            component: () => import("../views/TestPage.vue"),
          },
          {
            path: "child3",
            name: "list-child3",
            meta: { title: "三级列表页面" },
            component: () => import("../views/TestPage.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(
    (window as any).__POWERED_BY_QIANKUN__ ? "/crm" : "/"
  ),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
