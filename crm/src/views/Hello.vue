<template>
  <div>
    <div>
      <p>当前处于{{ isInQiankun ? "qiankun" : "独立运行" }}环境</p>
      <p>
        vuex的global module的user state：
        <code>
          {{ JSON.stringify(user) }}
        </code>
      </p>
    </div>
    <div class="btns">
      <template v-if="isInQiankun">
        <button @click="openSubVue">独立打开sub-vue子应用</button>
      </template>
      <button @click="changeUsername">改变全局的用户名称</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const user = computed(() => store.state.global.user);

const isInQiankun = computed(() => (window as any).__POWERED_BY_QIANKUN__);

function changeUsername() {
  store.dispatch("global/setGlobalState", {
    user: { name: "李四" + Math.round(Math.random() * 100) },
  });
}
function openSubVue() {
  if (!unref(isInQiankun)) {
    alert("当前已经是单独运行的子应用");
    return;
  }
  // history.pushState(null, 'sub-react', '/sub-react')
  // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
  window.open((window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__);
}
</script>

<style lang="less" scoped>
button {
  margin-right: 5px;
}
</style>
