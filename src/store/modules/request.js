import api from '@/api/index.js'
import Vue from 'vue';
import { Notify, Toast } from 'vant';

const commonGetFn = (rootGetters, state, commit, payload, key) => {
  let next;
  if (!!payload.next) next = payload.next;
  delete payload.next;
  // 忽略加载统一请求加载样式;
  let neglect_request = ['getBalanceNew', 'getOpenHistory', 'getBetting'];
  if (!neglect_request.includes(key)) { commit('mutations_isAppending', true); }
  return new Promise((resolve, reject) => {
    api[key](payload).then(res => {
      // console.log(res);
      // 显示错误请求信息
      if (res.data.data.code == 700) { Notify({ type: 'danger', message: res.data.data.msg, duration: 1500 }) }

      if (res.data.data.code == 0) { next && next(); }
      if (!neglect_request.includes(key)) { commit('mutations_isAppending', false); }
      let { data } = res.data;
      commit('mutations_SET_REQUEST', { key, val: data })
      resolve(res.data.data);
      // next && next();
      if (res.data.data.code == 0) { next && next(); } else { Toast(res.data.data.msg) }
    }).catch((err) => {
      if (!neglect_request.includes(key)) { commit('mutations_isAppending', false); }
      reject(err);
    })
  })
}

const request = {
  // namespaced: true,
  state: {
    REQUEST: {
      isAppending: false,
    },
  },
  mutations: {
    mutations_isAppending (state, payload) {
      state.REQUEST.isAppending = payload;
    },
    mutations_SET_REQUEST (state, payload) {
      // state.REQUEST[payload.key] = payload.val;
      Vue.set(state.REQUEST, payload.key, payload.val);  // 解决异步数据不刷新问题
    },
  },
  actions: {
    // 首页直播
    async actions_getHot ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getHot');
    },
    // 主播搜索
    async actions_getSearch ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSearch');
    },
    // 获取主播名片
    async actions_getLiveContact ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLiveContact');
    },
    // 收益榜
    async actions_getProfitList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getProfitList');
    },
    // 贡献榜
    async actions_getConsumeList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getConsumeList');
    },
    // 任务列表
    async actions_getTaskList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getTaskList');
    },
    // 任务列表领取奖金
    async actions_getTaskReward ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getTaskReward');
    },
    // 主播任务列表
    async actions_getLiveTaskList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLiveTaskList');
    },
    // 主播任务列表领取奖金
    async actions_getLiveTaskReward ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLiveTaskReward');
    },
    // 获取游戏列表
    async actions_getPlats ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getPlats');
    },
    // 获取用户信息
    async actions_getBaseInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBaseInfo');
    },
    // 获取用户信息
    async actions_getConfig ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getConfig');
    },
    //绑定手机号
    async actions_setMobile ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'setMobile');
    },
    // 获取王者俸禄
    async actions_getKing_getList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getKing_getList');
    },
    // 王者俸禄点击领取
    async actions_getKing_getReward ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getKing_getReward');
    },
    // 获取验证码
    async actions_getCode ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getCode');
    },
    //用户登录
    async actions_postUserLogin ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postUserLogin');
    },
    //游客登录
    async actions_postGuestLogin ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postGuestLogin');
    },
    // 域名列表
    async actions_getDomainList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getDomainList');
    },
    // 获取充值银行地区
    async actions_getBankRegions ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBankRegions');
    },
    // 用户首次登录推荐
    async actions_getRecommend ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRecommend');
    },
    // 获取系统消息
    async actions_getMessage_getList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getMessage_getList');
    },
    // 获取提现信息
    async actions_getWithdraw ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getWithdraw');
    },
    // 提现
    async actions_gameWithdraw ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'gameWithdraw');
    },
    // 获取主播印象列表
    async actions_getUserLabel ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getUserLabel');
    },
    // 设置主播印象
    async actions_getSetUserLabel ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSetUserLabel');
    },
    // 获取个性列表
    async actions_getPerSetting ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getPerSetting');
    },
    // 收支明细
    async actions_getCoinRecord ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getCoinRecord');
    },
    // 彩票相关
    async actions_getHomeBetViewInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getHomeBetViewInfo');
    },
    // 获得彩票列表
    async actions_getLotteryList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLotteryList');
    },
    // 获得彩票类型数据
    async actions_getBetViewInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBetViewInfo');
    },
    // 获得top5用户数据
    async actions_getLiveBetRank ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLiveBetRank');
    },
    // 获得彩票开奖历史
    async actions_getOpenHistory ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getOpenHistory');
    },
    // 根据类型获取彩票往期开奖
    async actions_getBetList2 ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBetList2');
    },
    // 
    async actions_getCheckActive ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getCheckActive');
    },
    // 
    async actions_getLiveListByType ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLiveListByType');
    },
    // 我的关注 主播
    async actions_getFollow ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFollow');
    },
    // 用户个人主页
    async actions_getUserHome ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getUserHome');
    },
    // 获取守护列表
    async actions_getGuardList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getGuardList');
    },
    // 购买守护
    async actions_getBuyGuard ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBuyGuard');
    },
    // 获取守护商品列表
    async actions_getGuardCommodityList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getGuardCommodityList');
    },
    // 日礼物榜单
    async actions_getDayGiftRank ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getDayGiftRank');
    },
    // 对方关注列表
    async actions_getFollowsList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFollowsList');
    },
    // 对方粉丝列表
    async actions_getFansList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFansList');
    },
    // 签到
    async actions_Bonus ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'Bonus');
    },
    // 获取签到
    async actions_getBonus ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBonus');
    },
    // 获取用户余额
    async actions_getCoin ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getCoin');
    },
    // 地区汇率
    async actions_getRegionsExchangeRate ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRegionsExchangeRate');
    },
    // 进入直播间
    async actions_getEnterRoom ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getEnterRoom');
    },
    // 举报用户
    async actions_getSetReport ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSetReport');
    },
    // 获取礼物列表
    async actions_getGiftList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getGiftList');
    },
    // 获取大转盘界面信息
    async actions_getLuckydraw ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLuckydraw');
    },
    // 获取大转盘中奖记录
    async actions_getLuckydrawRecord ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getLuckydrawRecord');
    },
    // 大转盘活动
    async actions_getDoLuckydraw ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getDoLuckydraw');
    },
    // 观众给主播赠送礼物
    async actions_getSendGift ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSendGift');
    },
    // 发红包
    async actions_getSendRed ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSendRed');
    },
    // 充值
    async actions_getBalanceNew ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBalanceNew');
    },
    // 支付配置
    async actions_getPayConfig ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getPayConfig');
    },
    // 提现金额
    async actions_getProfit ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getProfit');
    },
    // 提现账户列表
    async actions_getUserAccountList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getUserAccountList');
    },
    // 获得城市列表
    async actions_getBankRegions ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBankRegions');
    },
    // 获得银行列表
    async actions_getBankInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBankInfo');
    },
    // 新增提现账户
    async actions_getSetUserAccount ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSetUserAccount');
    },
    // 删除提现账户
    async actions_getDelUserAccount ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getDelUserAccount');
    },
    // 游戏提现记录
    async actions_getGameWithdrawHistory ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getGameWithdrawHistory');
    },
    // 一键回收
    async actions_getBackAllCoin ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBackAllCoin');
    },
    // 转入/转出
    async actions_getConvertCoin ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getConvertCoin');
    },
    // 关注
    async actions_getSetAttent ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSetAttent');
    },
    // 彩票下注
    async actions_getBetting ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getBetting');
    },
    // 请求进入游戏
    async actions_getEnterGame ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getEnterGame');
    },
    // 支付下单
    async actions_getNewOrder ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getNewOrder');
    },
    // 检查直播间状态，是否收费 是否有密码等
    async actions_getCheckLive ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getCheckLive');
    },
    // 当直播间是门票收费，计时收费或切换成计时收费的时候，观众请求这个接口
    async actions_getRoomCharge ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRoomCharge');
    },
    // 当直播间是计时收费的时候，观众每隔一分钟请求这个接口进行扣费
    async actions_getTimeCharge ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getTimeCharge');
    },
    // 我的推广信息
    async actions_getPopularizeInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getPopularizeInfo');
    },
    // 获取直播间红包列表
    async actions_getRedList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRedList');
    },
    // 直播间抢红包
    async actions_getRobRed ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRobRed');
    },
    // 直播间红包领取详情
    async actions_getRedRobList ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getRedRobList');
    },
    // 发送聊天收费弹幕
    async actions_getSendBarrage ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getSendBarrage');
    },
    // 一元空降info
    async actions_getFuckActivityInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFuckActivityInfo');
    },
    // 一元空降本期投注信息
    async actions_getFuckActivityBetInfo ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFuckActivityBetInfo');
    },
    // 一元空降开奖信息
    async actions_getFuckActivityOpenRecord ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'getFuckActivityOpenRecord');
    },
    // 上传头像
    async actions_postUpdateAvatar ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postUpdateAvatar');
    },
    // 更新用户资料
    async actions_postUpdateFields ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postUpdateFields');
    },
    // 更新名片
    async actions_postSaveContact ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postSaveContact');
    },
    // 一元空降投注
    async actions_postFuckActivityBet ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postFuckActivityBet');
    },
    // 充入钻石
    async actions_postChargeInto ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postChargeInto');
    },
    // 立即提现
    async actions_postWithdraw ({ rootGetters, state, commit }, payload = {}) {
      return await commonGetFn(rootGetters, state, commit, payload, 'postWithdraw');
    },
  },
  getters: {
    getters_isAppending: state => state.REQUEST.isAppending,
    getters_getConfig: state => state.REQUEST.getConfig.info[0],
    getters_getLiveListByType: state => { let data = []; if (state.REQUEST.getLiveListByType) { data = state.REQUEST.getLiveListByType.info[0] }; return data },
    getters_getBaseInfo: state => state.REQUEST.getBaseInfo.info[0],
    getters_getHot: state => { let data = []; if (state.REQUEST.getHot) { data = state.REQUEST.getHot.info[0] }; return data },
    getters_getBetList2: state => { let data = {}; if (state.REQUEST.getBetList2) { data = state.REQUEST.getBetList2.info }; return data; },
    getters_getTaskList: state => state.REQUEST.getTaskList.info[0],
    getters_getUserHome: state => state.REQUEST.getUserHome.info[0],  // 主播主页
    getters_getEnterRoom: state => state.REQUEST.getEnterRoom.info[0],
    getters_getPayConfig: state => state.REQUEST.getPayConfig.info[0],
    getters_getLotteryList: state => { let data = []; if (state.REQUEST.getLotteryList) { data = state.REQUEST.getLotteryList.info[0] }; return data },
    getters_getLiveContact: state => { let data = []; if (state.REQUEST.getLiveContact) { data = state.REQUEST.getLiveContact.info[0] }; return data },
    getters_getRedRobList: state => { let data = ''; if (state.REQUEST.getRedRobList) { data = state.REQUEST.getRedRobList.info[0] }; return data },
    getters_getRedList: state => { let data = []; if (state.REQUEST.getRedList) { data = state.REQUEST.getRedList.info }; return data },
    getters_getCoin: state => state.REQUEST.getCoin.info[0],
    getters_getBetViewInfo: state => state.REQUEST.getBetViewInfo.info[0],
    getters_getHomeBetViewInfo: state => state.REQUEST.getHomeBetViewInfo.info[0],
    getters_getUserAccountList: state => { let data = []; if (state.REQUEST.getUserAccountList) { data = state.REQUEST.getUserAccountList.info }; return data; },
    getters_getBalanceNew: state => { let data = ''; if (state.REQUEST.getBalanceNew) { data = state.REQUEST.getBalanceNew.info[0] }; return data; },
    getters_getFuckActivityInfo: state => { let data = []; if (state.REQUEST.getFuckActivityInfo) { data = state.REQUEST.getFuckActivityInfo.info[0] }; return data },
    getters_getWithdraw: state => { let data = []; if (state.REQUEST.getWithdraw) { data = state.REQUEST.getWithdraw.info[0] }; return data },
  }
}

export default request