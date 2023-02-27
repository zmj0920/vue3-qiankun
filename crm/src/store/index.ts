import { createStore } from "vuex";
export default createStore({
  state: {
    listData: 10,
    num: 10,
    arr: [1, 2, 3, 4, 5, 6],
  },
  getters: {
    arrfilter(state) {
      return state.arr.filter((todo) => todo >= 3);
    },
  },
  // mutation 必须同步执行  唯一可以修改state数据的场所
  mutations: {
    updateData(state, value) {
      state.listData = value;
    },
    addNum(state) {
      state.num = state.num + 10;
    },

    // 我们可以使用 ES2015 风格的计算属性命名功能
    // 来使用一个常量作为函数名
    // [SOME_MUTATION](state) {
    //   // 修改 state
    // },
  },
  actions: {
    setData({ commit }, value) {
      commit("updateData", value);
    },
  },
  modules: {},
});
