<template>
  <div>
    <button @click="add">add</button>{{ store.state.num }}{{ arr
    }}{{ store.state.listData }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const arr = computed(() => store.getters.arrfilter);

const add = () => {
  // 使用 mutation
  store.commit("addNum");

  // 使用 action
  store.dispatch("setData", Math.floor(Math.random() * 10 + 1));
};
</script>

<style scoped></style>
