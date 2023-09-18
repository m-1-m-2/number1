const root = {
  state: {
    rootStore: {
      lang: '',
      langSetAnimate: false,
      uid: '',
      token: '',
      region_exchange_info: '',
      ANCHOR: '',
      ANCHOR_KEY: '',
      ANCHOR_LIST: '',
      ANCHOR_PREV: '',
      PAYREGION: '',
      HOST: 'http:\/\/j.tmlive02.com',
      lotterySound: true,
      // 自动额度转换
      autoExchange: true,
      SALT: '76576076c1f5f657b634e966c8836a06',
      lobbyLottery: '',
      PLATFORM: '623',
      MOREGAME: false,
      MOREGAMETYPE: '',
      MOREGAMENAME: '',
      MOREGAMELOGO: '',
      isUserSignOut: false,
      masterSwitch: true,
      device: '',
      isCheckPayRoom: false,
    },
  },
  mutations: {
    mutations_rootStore (state, payload) {
      state.rootStore[payload.key] = payload.val;
    },
  },
  actions: {
    actions_rootStore ({ state, commit }, payload) {
      commit('mutations_rootStore', payload)
    },
  },
  getters: {
    getters_rootStore: state => state.rootStore,
    UID: state => state.rootStore.uid,
    TOKEN: state => state.rootStore.token,
    LANG: state => state.rootStore.lang,
    ANCHOR: state => state.rootStore.ANCHOR,
    ANCHOR_KEY: state => state.rootStore.ANCHOR_KEY,
    ANCHOR_LIST: state => state.rootStore.ANCHOR_LIST,
    ANCHOR_PREV: state => state.rootStore.ANCHOR_PREV,
    PAYREGION: state => state.rootStore.PAYREGION,
    HOST: state => state.rootStore.HOST,
    lotterySound: state => state.rootStore.lotterySound,
    autoExchange: state => state.rootStore.autoExchange,
    lobbyLottery: state => state.rootStore.lobbyLottery,
    SALT: state => state.rootStore.SALT,
    PLATFORM: state => state.rootStore.PLATFORM,
    MOREGAME: state => state.rootStore.MOREGAME,
    MOREGAMETYPE: state => state.rootStore.MOREGAMETYPE,
    MOREGAMENAME: state => state.rootStore.MOREGAMENAME,
    MOREGAMELOGO: state => state.rootStore.MOREGAMELOGO,
    isUserSignOut: state => state.rootStore.isUserSignOut,
    masterSwitch: state => state.rootStore.masterSwitch,
    device: state => state.rootStore.device,
    isCheckPayRoom: state => state.rootStore.isCheckPayRoom,
  }
}

export default root