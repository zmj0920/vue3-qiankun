<template>
  <div class="tags" v-if="show">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in list"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <el-icon @click="closeTags(index)"><Close /></el-icon>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

const show = computed(() => store.getters.show);

const list = computed(() => store.state.list);

const isActive = (path: string) => {
  return path === route.fullPath;
};

// 关闭单个标签
const closeTags = (index: number) => {
  const delItem = list.value[index];
  store.dispatch("delTagsItem", index);
  const item = list.value[index] ? list.value[index] : list.value[index - 1];
  if (item) {
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push("/");
  }
};

// 设置标签
const setTags = (route: any) => {
  const isExist = list.value.some((item: { path: any }) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    if (list.value.length >= 8) {
      store.dispatch("delTagsItem", 0);
    }
    store.dispatch("setTagsItem", {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    });
  }
};
setTags(route);
console.log(list.value);

onBeforeRouteUpdate((to) => {
  setTags(to);
});

// 关闭全部标签
const closeAll = () => {
  store.dispatch("clearTags");
  router.push("/");
};
// 关闭其他标签
const closeOther = () => {
  const curItem = list.value.filter((item: { path: string }) => {
    return item.path === route.fullPath;
  });
  store.dispatch("closeTagsOther", curItem);
};
const handleTags = (command: string) => {
  command === "other" ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// tags.closeCurrentTag({
//     $router: router,
//     $route: route
// });
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  display: flex;
  align-items: center;
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
