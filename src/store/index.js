import Vue from 'vue'
import Vuex from 'vuex'
// 数据持久化
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

let ms = require.context('./modules', false, /\.js$/)
let modules = {}
ms.keys().forEach(k => {
  let n = k.substring(2, k.length - 3)
  modules[n] = ms(k).default
})

const store = new Vuex.Store({
  modules,
  // 数据持久化
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.localStorage,
      // 存储的 key 的key值
      key: "store",
      render (state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        return { ...state };
      }
    })
  ]
})

export default store