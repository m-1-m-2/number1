import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 使用vConsole
// import Vconsole from 'vconsole'
if (process.env.NODE_ENV !== 'production') { // 测试和开发打开，生产不能打开
  // let vConsole = new Vconsole()
  // Vue.use(vConsole)
}
// 使用axios
import * as requests from '@/plugins/axios/index'
import api from '@/api/index.js'
Vue.prototype.$api = api
Vue.prototype.$request = requests.request
Vue.prototype.$intactRequest = requests.intactRequest
// 全局样式
import "@/assets/css/global.scss"
// 重置样式
import 'normalize.css'
// 导入UI组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 移动端适配
import 'amfe-flexible';
// 公共方法引入
import commonFun from '@/assets/js/commonFun.js'
Vue.use(commonFun)
// 业务组件国际化
import i18n from './i18n';// 引入i18n实例
// 使用moment
import moment from 'moment'
Vue.prototype.$moment = moment
// 懒加载指令
import { Lazyload } from 'vant';
Vue.use(Lazyload, { lazyComponent: true, });
// 自定义指令
import '@/directives/index';
// Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners
// import 'default-passive-events'  // 有冲突,不需要加载
// 字体图标
import "@/assets/font/iconfont.css";
// animate.css
import 'animate.css';
// 网络相关
// import VueOffline from 'vue-offline'
// Vue.use(VueOffline)

// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App),
//   // 利用beforeCreate钩子
//   beforeCreate () { Vue.prototype.$bus = this; }
// }).$mount('#app')

// NodePlayer.load((e) => {
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  // 利用beforeCreate钩子
  beforeCreate () { Vue.prototype.$bus = this; }
}).$mount('#app')
// })
