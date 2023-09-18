const business = {
  state: {
    componentTime: 0,
    betAmountValue: 2,
    userCoinTotal: '',
    publicTime: '',
    experienceRoom: []
  },
  mutations: {
    mutations_componentTime (state, data) {
      state.componentTime = data;
    },
    mutations_betAmountValue (state, data) {
      state.betAmountValue = data;
    },
    mutations_userCoinTotal (state, data) {
      state.userCoinTotal = data;
    },
    mutations_publicTime (state, data) {
      state.publicTime = data;
    },
    mutations_experienceRoom (state, data) {
      state.experienceRoom.push(data);
    },
  },
  actions: {
    actions_componentTime ({ commit }, data) {
      commit('mutations_componentTime', data)
    },
    actions_betAmountValue ({ commit }, data) {
      commit('mutations_betAmountValue', data)
    },
    actions_userCoinTotal ({ commit }, data) {
      commit('mutations_userCoinTotal', data)
    },
    actions_publicTime ({ commit }, data) {
      commit('mutations_publicTime', data)
    },
    actions_experienceRoom ({ commit }, data) {
      commit('mutations_experienceRoom', data)
    },
  },
  getters: {
    getters_componentTime: state => state.componentTime,
    getters_betAmountValue: state => state.betAmountValue,
    getters_userCoinTotal: state => state.userCoinTotal,
    getters_publicTime: state => state.publicTime,
    getters_experienceRoom: state => state.experienceRoom,
  }
}

export default business