/**api管理页面
 * apiMap: 统一管理所有api地址、对应的请求方式及自定义别名
 * 导出一个对象requestMap，属性名为apiMap中定义的别名，也就是调用时的名称，值为实际请求方法
 * 方法接收两个对象参数，第一个为需要传递的数据，第二个为请求头的配置信息。
 * 语法： api[alias](paramsOrData, headersConfig)
 * 第一个参数：如果为put/post/patch方法中的一种，会被转化为data属性；其余则是params
 * 第二个参数：请求头信息
 *
 * let xx = await this.$api.getBanner({ account: '18038018084', psw: '2' })
 * let vv = await this.$api.login({ account: '18038018084', psw: '2' })
 *
 * 如果类似post的方法需要通过url后缀形式传递参数，在第二个参数config加上params属性即可：
 * let vv = await this.$api.login({ account: '18038018084', psw: '2' },{ params: {} })
 *
 * 自定义请求头信息：
 * let xx = await this.$api.getBanner({}, {timeout: 1000, headers:{ aaa: 111 }})
 */
import { request } from '@/plugins/axios/index'

// api批量管理
const apiMap = {
  // 首页直播
  getHot: { method: 'get', url: '/public/?service=Home.getHot' },
  getLiveListByType: { method: 'get', url: '/public/?service=Home.getLiveListByType' },
  getLiveInfo: { method: 'get', url: '/public/?service=Home.getLiveInfo' },
  // 我的关注 主播
  getFollow: { method: 'get', url: '/public/?service=Home.getFollow' },
  // 获取config
  getConfig: { method: 'get', url: '/public/?service=Home.getConfig' },
  // 搜索主播
  getSearch: { method: 'get', url: '/public/?service=Home.search' },
  // 收益榜
  getProfitList: { method: 'get', url: '/public/?service=Home.profitList' },
  // 域名列表
  getDomainList: { method: 'get', url: '/public/?service=Home.getDomainList' },
  // 贡献榜
  getConsumeList: { method: 'get', url: '/public/?service=Home.consumeList' },
  // 用户首次登录推荐
  getRecommend: { method: 'get', url: '/public/?service=Home.getRecommend' },
  // 
  getCheckActive: { method: 'get', url: '/public/?service=Home.checkActive' },
  // 

  /*********************************************************************/

  // 任务列表
  getTaskList: { method: 'get', url: '/public/?service=User.getTaskList' },
  // 任务列表领取奖金
  getTaskReward: { method: 'get', url: '/public/?service=User.getTaskReward' },
  // 主播任务列表
  getLiveTaskList: { method: 'get', url: '/public/?service=User.getLiveTaskList' },
  // 主播任务列表领取奖金
  getLiveTaskReward: { method: 'get', url: '/public/?service=User.getLiveTaskReward' },
  // 获取游戏列表
  getPlats: { method: 'get', url: '/public/?service=User.getPlats' },
  // 获取用户信息
  getBaseInfo: { method: 'get', url: '/public/?service=User.getBaseInfo' },
  // 获取充值银行地区
  getBankRegions: { method: 'get', url: '/public/?service=User.getBankRegions' },
  // 获取提现信息
  getWithdraw: { method: 'get', url: '/public/?service=User.getWithdraw' },
  // 提现
  gameWithdraw: { method: 'get', url: '/public/?service=User.gameWithdraw' },
  // 获取主播印象列表
  getUserLabel: { method: 'get', url: '/public/?service=User.GetUserLabel' },
  // 设置主播印象
  getSetUserLabel: { method: 'get', url: '/public/?service=User.setUserLabel' },
  // 获取个性列表
  getPerSetting: { method: 'get', url: '/public/?service=User.getPerSetting' },
  // 收支明细
  getCoinRecord: { method: 'get', url: '/public/?service=User.getCoinRecord' },
  // 用户个人主页
  getUserHome: { method: 'get', url: '/public/?service=User.getUserHome' },
  // 日礼物榜单
  getDayGiftRank: { method: 'get', url: '/public/?service=User.getDayGiftRank' },
  // 对方关注列表
  getFollowsList: { method: 'get', url: '/public/?service=User.getFollowsList' },
  // 对方粉丝列表
  getFansList: { method: 'get', url: '/public/?service=User.getFansList' },
  // 签到列表
  Bonus: { method: 'get', url: '/public/?service=User.Bonus' },
  // 签到
  getBonus: { method: 'get', url: '/public/?service=User.getBonus' },
  // 获取地区汇率
  getRegionsExchangeRate: { method: 'get', url: '/public/?service=User.getRegionsExchangeRate' },
  // 充值页面
  getBalanceNew: { method: 'get', url: '/public/?service=User.getBalanceNew' },
  // 支付配置
  getPayConfig: { method: 'get', url: '/public/?service=User.getPayConfig' },
  // 提现金额
  getProfit: { method: 'get', url: '/public/?service=User.getProfit' },
  // 提现账户列表
  getUserAccountList: { method: 'get', url: '/public/?service=User.GetUserAccountList' },
  // 获取城市列表
  getBankRegions: { method: 'get', url: '/public/?service=User.getBankRegions' },
  // 获取银行列表
  getBankInfo: { method: 'get', url: '/public/?service=User.getBankInfo' },
  // 添加提现账户
  getSetUserAccount: { method: 'get', url: '/public/?service=User.SetUserAccount' },
  // 删除提现账户
  getDelUserAccount: { method: 'get', url: '/public/?service=User.DelUserAccount' },
  // 游戏提现记录
  getGameWithdrawHistory: { method: 'get', url: '/public/?service=User.getGameWithdrawHistory' },
  // 一键回收
  getBackAllCoin: { method: 'get', url: '/public/?service=User.backAllCoin' },
  // 转入/转出
  getConvertCoin: { method: 'get', url: '/public/?service=User.convertCoin' },
  // 关注
  getSetAttent: { method: 'get', url: '/public/?service=User.setAttent' },
  // 请求进入游戏
  getEnterGame: { method: 'get', url: '/public/?service=User.enterGame' },
  // 支付下单
  getNewOrder: { method: 'get', url: '/public/?service=User.newOrder' },
  // 我的推广信息
  getPopularizeInfo: { method: 'get', url: '/public/?service=User.getPopularizeInfo' },
  // 一元空降info
  getFuckActivityInfo: { method: 'get', url: '/public/?service=User.getFuckActivityInfo' },
  // 一元空降本期投注信息
  getFuckActivityBetInfo: { method: 'get', url: '/public/?service=User.getFuckActivityBetInfo' },
  // 一元空降开奖信息
  getFuckActivityOpenRecord: { method: 'get', url: '/public/?service=User.getFuckActivityOpenRecord' },
  // 上传头像
  postUpdateAvatar: { method: 'post', url: '/public/?service=User.updateAvatar' },
  // 更新用户资料
  postUpdateFields: { method: 'post', url: '/public/?service=User.updateFields' },
  // 更新名片
  postSaveContact: { method: 'post', url: '/public/?service=User.saveContact' },
  // 一元空降投注
  postFuckActivityBet: { method: 'post', url: '/public/?service=User.fuckActivityBet' },
  // 充入钻石
  postChargeInto: { method: 'post', url: '/public/?service=User.ChargeInto' },
  // 立即提现
  postWithdraw: { method: 'post', url: '/public/?service=User.Withdraw' },


  /*********************************************************************/

  // 用户登录
  postUserLogin: { method: 'post', url: '/public/?service=Login.userLogin' },
  // 游客登录
  postGuestLogin: { method: 'post', url: '/public/?service=Login.guestLogin' },
  // 获取验证码
  getCode: { method: 'get', url: '/public/?service=Login.getCode' },
  //绑定手机号
  setMobile: { method: 'post', url: '/public/?service=User.setMobile' },

  /*********************************************************************/

  // 获取主播名片
  getLiveContact: { method: 'get', url: '/public/?service=Live.getLiveContact' },
  // 进入房间
  getEnterRoom: { method: 'get', url: '/public/?service=Live.enterRoom' },
  // 获取用户余额
  getCoin: { method: 'get', url: '/public/?service=Live.getCoin' },
  // 举报用户
  getSetReport: { method: 'get', url: '/public/?service=Live.setReport' },
  // 获取礼物列表
  getGiftList: { method: 'get', url: '/public/?service=Live.getGiftList' },
  // 获取大转盘界面信息
  getLuckydraw: { method: 'get', url: '/public/?service=Live.getLuckydraw' },
  // 获取大转盘中奖记录
  getLuckydrawRecord: { method: 'get', url: '/public/?service=Live.luckydrawRecord' },
  // 大转盘活动
  getDoLuckydraw: { method: 'get', url: '/public/?service=Live.doLuckydraw' },
  // 观众给主播赠送礼物
  getSendGift: { method: 'get', url: '/public/?service=Live.sendGift' },
  // 检查直播间状态，是否收费 是否有密码等
  getCheckLive: { method: 'get', url: '/public/?service=Live.checkLive' },
  // 当直播间是门票收费，计时收费或切换成计时收费的时候，观众请求这个接口
  getRoomCharge: { method: 'get', url: '/public/?service=Live.roomCharge' },
  // 当直播间是计时收费的时候，观众每隔一分钟请求这个接口进行扣费
  getTimeCharge: { method: 'get', url: '/public/?service=Live.timeCharge' },
  // 发送聊天收费弹幕
  getSendBarrage: { method: 'get', url: '/public/?service=Live.sendBarrage' },


  /*********************************************************************/

  // 彩票相关
  getHomeBetViewInfo: { method: 'get', url: '/public/?service=Lottery.getHomeBetViewInfo' },
  // 获得彩票列表
  getLotteryList: { method: 'get', url: '/public/?service=Lottery.getLotteryList' },
  // 根据类型获取彩票数据
  getBetViewInfo: { method: 'get', url: '/public/?service=Lottery.getBetViewInfo' },
  // 获取Top5数据
  getLiveBetRank: { method: 'get', url: '/public/?service=Lottery.getLiveBetRank' },
  // 获取开奖历史
  getOpenHistory: { method: 'get', url: '/public/?service=Lottery.getOpenHistory' },
  // 根据类型获取彩票往期开奖
  getBetList2: { method: 'get', url: '/public/?service=Lottery.betList2' },
  // 彩票下注
  getBetting: { method: 'get', url: '/public/?service=Lottery.Betting' },

  /*********************************************************************/

  // 获取主播守护列表
  getGuardList: { method: 'get', url: '/public/?service=Guard.GetGuardList' },
  // 守护商品类型列表
  getGuardCommodityList: { method: 'get', url: '/public/?service=Guard.getList' },
  // 开通主播守护
  getBuyGuard: { method: 'get', url: '/public/?service=Guard.BuyGuard' },

  /*********************************************************************/

  // 王者俸禄
  getKing_getList: { method: 'get', url: '/public/?service=Kingreward.getList' },
  // 王者俸禄点击领取
  getKing_getReward: { method: 'get', url: '/public/?service=Kingreward.getreward' },
  // 获取系统消息
  getMessage_getList: { method: 'get', url: '/public/?service=Message.GetList' },

  /*********************************************************************/

  // 直播间发红包
  getSendRed: { method: 'get', url: '/public/?service=Red.SendRed' },
  // 获取直播间红包列表
  getRedList: { method: 'get', url: '/public/?service=Red.GetRedList' },
  // 直播间抢红包
  getRobRed: { method: 'get', url: '/public/?service=Red.RobRed' },
  // 直播间红包领取详情
  getRedRobList: { method: 'get', url: '/public/?service=Red.GetRedRobList' },
}

function injectRequest (apiObj) {
  const requestMap = {}
  Object.keys(apiObj).forEach((alias) => {
    let { method, url, config } = apiObj[alias]
    method = method.toUpperCase()
    requestMap[alias] = (dataOrParams = {}, instanceConf = {}) => {
      const keyName = ['PUT', 'POST', 'PATCH'].includes(method) ? 'data' : 'params'
      return request({
        method,
        url,
        // [keyName]: method === 'POST' ? qs.stringify(dataOrParams) : dataOrParams,
        [keyName]: dataOrParams,
        ...Object.assign(config || {}, instanceConf)
      })
    }
  })
  return requestMap
}

export default injectRequest(apiMap)