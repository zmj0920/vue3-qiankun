<template>
  <div id="app">
    <div id="nav" v-if="!isInQiankun">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <p>
        当前处于<code>{{ isInQiankun ? "qiankun" : "独立运行" }}</code
        >环境
      </p>
      <p>
        vuex的`global module`的user state：<code>
          {{ JSON.stringify(user) }}</code
        >
      </p>
    </div>
    <div class="btns">
      <template v-if="isInQiankun">
        <button @click="openSubVue">独立打开sub-vue子应用</button>
      </template>
      <button @click="changeUsername">改变全局的用户名称</button>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const user = computed(() => store.state.global.user);

const isInQiankun = computed(() => (window as any).__POWERED_BY_QIANKUN__);

function changeUsername() {
  // setGlobalState({
  //   user: { name: "李四" + Math.round(Math.random() * 100) },
  // });

  store.dispatch("global/setGlobalState", {
    user: { name: "李四" + Math.round(Math.random() * 100) },
  });
}
function openSubVue() {
  if (!isInQiankun.value) {
    alert("当前已经是单独运行的子应用");
    return;
  }
  // history.pushState(null, 'sub-react', '/sub-react')
  // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
  window.open((window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__);
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btns {
  margin: 100px;
}
.btns button {
  margin: 0 10px;
}
</style>
