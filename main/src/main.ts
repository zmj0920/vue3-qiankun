import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';
import microApps from './micro-app';
import 'nprogress/nprogress.css';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';

const instance: any = createApp(App).use(store).use(router).mount('#app');

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading: any) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading;
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map((item) => {
  return {
    ...item,
    loader
  };
});

registerMicroApps(apps);

// 如果需要进行拦截，可以在此处导航守卫设置，如果不需要，可以省略
// const childrenPath = ['/admin']

// router.beforeEach((to, from, next) => {
//   // 如果有 name 属性，表示是主应用
//   if (to.name) {
//     next()
//   }
//   // 如果是子应用
//   if (childrenPath.some((item) => to.path.includes(item))) {
//     next();
//   }
//   // 如果没有当路由
//   else {}
// })

// 设置默认进入的子应用
setDefaultMountApp('/crm');
const options = {
  // 是否预加载
  prefetch: true,
  // 是否开启沙箱样式隔离
  sandbox: true,
  // 是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
  singular: true
};

start(options);
