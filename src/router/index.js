import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/home',
    meta: { index: 0, type: 'login' },
  },
  {
    path: '/home',
    name: 'home',
    meta: { index: 0, type: 'login' },
    component: () => import('../views/home'),
    redirect: 'live',
    children: [
      {
        path: '/attention',
        name: 'attention',
        meta: { index: 0, type: 'login' },
        component: () => import('../views/home/attention')
      },
      {
        path: '/live',
        name: 'live',
        meta: { index: 0, type: 'login' },
        component: () => import('../views/home/live')
      },
      {
        path: '/play',
        name: 'play',
        meta: { index: 0, type: 'login' },
        component: () => import('../views/home/play')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { index: 0 },
    component: () => import('../views/login')
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: { index: 0, type: 'login' },
    component: () => import('../views/recharge')
  },
  {
    path: '/game',
    name: 'game',
    meta: { index: 0, type: 'login' },
    component: () => import('../views/game')
  }, {
    path: '/mine/',
    name: 'mine',
    meta: { index: 0, type: 'login' },
    component: () => import('../views/mine'),
  },
  {
    path: '/search',
    name: 'search',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/search')
  },
  {
    path: '/rankList',
    name: 'rankList',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/rankList')
  },
  {
    path: '/service',
    name: 'service',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/service')
  },
  {
    path: '/checkOrder',
    name: 'checkOrder',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/checkOrder')
  },
  // {
  //   path: '/goddess',
  //   name: 'goddess',
  //   meta: { index: 3, type: 'login' },
  //   component: () => import('../views/goddess')
  // },
  {
    path: '/anchorDetails',
    name: 'anchorDetails',
    meta: { index: 2, type: 'login' },
    component: () => import('../views/widget/anchorDetails')
  },
  {
    path: '/getFollowsList',
    name: 'getFollowsList',
    meta: { index: 3, type: 'login' },
    component: () => import('../views/widget/anchorDetailsWidget/getFollowsList')
  },
  {
    path: '/getFansList',
    name: 'getFansList',
    meta: { index: 3, type: 'login' },
    component: () => import('../views/widget/anchorDetailsWidget/getFansList')
  },
  {
    path: '/liveClassRoom',
    name: 'liveClassRoom',
    meta: { index: 2, type: 'login' },
    component: () => import('../views/liveClassRoom')
  },
  {
    path: '/liveClassRoomNew',
    name: 'liveClassRoomNew',
    meta: { index: 2, type: 'login' },
    component: () => import('../views/liveClassRoomNew')
  },
  {
    path: '/liveLobby',
    name: 'liveLobby',
    meta: { index: 2, type: 'login' },
    component: () => import('../views/liveLobby')
  },
  {
    path: '/lobbyEmpty',
    name: 'lobbyEmpty',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/lobbyEmpty')
  },
  {
    path: '/liveClassRoomNewEmpty',
    name: 'liveClassRoomNewEmpty',
    meta: { index: 1, type: 'login' },
    component: () => import('../views/liveClassRoomNewEmpty')
  },
  {
    path: '/countryRegionCharge',
    name: 'countryRegionCharge',
    meta: { index: 2, type: 'login' },
    component: () => import('../views/home/liveWidget/countryRegionCharge')
  },
  {
    path: '/otherGame',
    name: 'otherGame',
    meta: { index: 3, type: 'login' },
    component: () => import('../views/otherGame')
  },
  {
    path: '*',
    name: 'NotFound',
    meta: { index: 0 },
    component: () => import('../views/NotFound')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.afterEach((to, from, next) => {
  gtag('config', 'G-VMCXQSH53J', { 'page_path': to.fullPath });
});
// router.beforeEach((to, from, next) => {
//   const type = to.meta.type
//   // 判断该路由是否需要登录权限
//   if (type === 'login') {
//     console.log(type);
//     if (!!JSON.parse(window.sessionStorage.getItem('store'))['root']['rootStore']['uid'] && JSON.parse(window.sessionStorage.getItem('store'))['root']['rootStore']['token']) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()  // 确保一定要有next()被调用
//   }
// })

export default router
