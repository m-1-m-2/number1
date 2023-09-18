const ws = {
  state: {
    WSEVENT: {
      SOCKET_CONN: "conn", // 用户进入房间
      SOCKET_BROADCAST: "broadcastingListen",
      SOCKET_SEND: "broadcast",
      SOCKET_STOP_PLAY: "stopplay",//超管关闭直播,
      SOCKET_STOP_LIVE: "stopLive",//超管关闭直播,
      SOCKET_SEND_MSG: "SendMsg",//发送文字消息，点亮，用户进房间  PS:这种混乱的设计是因为服务器端逻辑就是这样设计的,客户端无法自行修,
      SOCKET_LIGHT: "light",//飘,
      SOCKET_CONTACT_INFO: "SendContactInfo",//发送名,
      SOCKET_SEND_GIFT: "SendGift",//送礼,
      SOCKET_SEND_BARRAGE: "SendBarrage",//发弹,
      SOCKET_LEAVE_ROOM: "disconnect",//用户离开房,
      SOCKET_LIVE_END: "StartEndLive",//主播关闭直,
      SOCKET_SYSTEM: "SystemNot",//系统消,
      SOCKET_KICK: "KickUser",//踢,
      SOCKET_SHUT_UP: "ShutUpUser",//禁,
      SOCKET_SET_ADMIN: "setAdmin",//设置或取消管理,
      SOCKET_CHANGE_LIVE: "changeLive",//切换计时收费类,
      SOCKET_UPDATE_VOTES: "updateVotes",//门票或计时收费时候更新主播的映票,
      SOCKET_FAKE_FANS: "requestFans",//僵尸,
      SOCKET_LINK_MIC: "ConnectVideo",//连,
      SOCKET_LINK_MIC_ANCHOR: "LiveConnect",//主播连,
      SOCKET_LINK_MIC_PK: "LivePK",//主播P,
      SOCKET_BUY_GUARD: "BuyGuard",//购买守,
      SOCKET_RED_PACK: "SendRed",//红,
      SOCKET_LOTTERY_INFO: "lotteryInfo",//彩票信,
    },
    MSGID: [
      'SystemNot',  // 0
      'SendMsg',
      'StartEndLive',
      'LiveConnect',
      'LivePK',
      'ConnectVideo', // 5
      'disconnect',
      'kyGame',
      'LotteryBet',
      'LotteryOpenAward',
      'MoneyChange',  // 10
      'LotteryDividend',
      'LotteryProfit',
      'LotterySync',
      'SendContactInfo',
      'LotteryBarrage', // 15
      'LotteryAward',
      'SendGift',
      'SendBarrage',
      'light',
      'changeLive', // 20
      'updateVotes',
      'CloseLive',
      'KickUser',
      'ShutUpUser',
      'stopLive', // 25
      'ResumeUser',
      'setAdmin',
      'BuyGuard',
      'SendRed',
      'requestFans',// 30
      'lotteryInfo',
      'openAward',
      'platGame',
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    WSEVENT: state => state.WSEVENT,
    MSGID: state => state.MSGID,
  }
}

export default ws