const test = {
  // namespaced: true,
  state: {
    count: 0,
  },
  mutations: {
    mutations_count (state, data) {
      state.count = data;
    },
  },
  actions: {
    actions_count ({ state, commit }, data) {
      let count = state.count;
      data == "+" ? count++ : count--;
      commit('mutations_count', count)
    },
  },
  getters: {
    getters_count: state => state.count,
  }
}

export default test