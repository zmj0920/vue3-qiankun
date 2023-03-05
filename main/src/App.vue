<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">QIANKUN-微服务项目</div>
      <ul class="sub-apps">
        <span
          class="nav"
          v-for="item in microApps"
          :key="item.activeRule"
          style="margin-right: 24px"
        >
          <router-link :to="item.activeRule">
            {{ item.name }}
          </router-link>
        </span>
      </ul>
      <div class="userinfo">主应用的state：{{ JSON.stringify(state) }}</div>
      <!-- <input v-model="input" type="text" />
      <button @click="send">sent</button> -->
    </div>
    <div style="margin-top: 50px" id="subapp-viewport"></div>
  </div>
</template>

<script lang="ts" setup>
import microApps from "./micro-app";
import store from "./store";
import { computed, onUnmounted, ref } from "vue";

// 读取公共信息
const state = computed(() => store.getGlobalState());

const socket = new WebSocket("ws://localhost:8080");

const input = ref("test");

socket.onopen = function () {
  console.log("Connected");

  socket.onmessage = function (data) {
    console.log(data.data);
  };

  // onUnmounted(() => {
  //   socket.close();
  // });
};

const send = () => {
  socket.send(
    JSON.stringify({
      event: "events",
      data: input.value,
    })
  );
};
</script>
<style lang="less">
html,
body {
  margin: 0 !important;
  padding: 0;
}

.layout-wrapper {
  .layout-header {
    position: fixed;
    top: 0;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9999;
    height: 50px;
    width: 100%;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px #00152914;
    line-height: 50px;

    .logo {
      float: left;
      margin: 0 50px;
    }

    .sub-apps {
      list-style: none;
      margin: 0;

      li {
        list-style: none;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;

        &.active {
          color: #42b983;
          text-decoration: underline;
        }
      }
    }

    .userinfo {
      position: absolute;
      right: 100px;
      top: 0;
    }
  }
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
