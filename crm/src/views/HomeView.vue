<template>
  <!-- <v-header v-if="!isInQiankun" />
  <v-sidebar v-if="!isInQiankun" /> -->
  <div
    class="content-box"
    :class="{ 'content-collapse': !isInQiankun ? collapse : false }"
  >
    <!-- <Tags v-if="!isInQiankun"></Tags> -->
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="store.getters.nameList">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "../components/header.vue";
import vSidebar from "../components/sidebar.vue";
import Tags from "../components/tags.vue";
const isInQiankun = computed(() => (window as any).__POWERED_BY_QIANKUN__);

const store = useStore();

const collapse = computed(() => store.state.collapse);
</script>
