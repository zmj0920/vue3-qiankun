import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router";
import { commonStore } from "./common";
import store from "./store";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

let app: any = null;
async function render(props: any = {}) {
  app = createApp(App).use(routes).use(store).use(ElementPlus);
  // 注册elementplus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  const { container } = props;
  app.mount(container ? container.querySelector("#app") : "#app");
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  store.commit("global/setGlobalState", { user: userInfo });
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: any) {
  console.log("[vue] props from main framework", props);
  commonStore.globalRegister(store, props);
  render(props);
}

export async function unmount() {
  console.log("unmount");
  app.unmount();
}
