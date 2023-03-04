import { createStore } from "vuex";
interface ListItem {
  name: string;
  path: string;
  title: string;
}

export default createStore({
  state: {
    collapse: false,
    list: <ListItem[]>[],
  },
  getters: {
    show: (state) => {
      return state.list.length > 0;
    },
    nameList: (state) => {
      return state.list.map((item) => item.name);
    },
  },
  // mutation 必须同步执行  唯一可以修改state数据的场所
  mutations: {
    collapse(state) {
      state.collapse = !state.collapse;
    },
    delTagsItem(state, index: number) {
      state.list.splice(index, 1);
    },
    setTagsItem(state, data: ListItem) {
      state.list.push(data);
    },
    clearTags(state) {
      state.list = [];
    },
    closeTagsOther(state, data: ListItem[]) {
      state.list = data;
    },
    closeCurrentTag(state, data: any) {
      for (let i = 0, len = this.list.length; i < len; i++) {
        const item = state.list[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.list[i + 1].path);
          } else if (i > 0) {
            data.$router.push(state.list[i - 1].path);
          } else {
            data.$router.push("/");
          }
          state.list.splice(i, 1);
          break;
        }
      }
    },
  },
  actions: {
    handleCollapse({ commit }) {
      commit("collapse");
    },
    delTagsItem({ commit }, index: number) {
      commit("delTagsItem", index);
    },
    setTagsItem({ commit }, data: ListItem) {
      commit("setTagsItem", data);
    },
    clearTags({ commit }) {
      commit("clearTags");
    },
    closeTagsOther({ commit }, data: ListItem[]) {
      commit("closeTagsOther", data);
    },
    closeCurrentTag({ commit }, data: any) {
      commit("closeCurrentTag", data);
    },
  },
  modules: {},
});
