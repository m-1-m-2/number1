<template>
  <div class='lottery30 absolute top bottom left right flex flex-col'>
    <!-- 轮盘 -->
    <!-- 280 -->
    <div class="h-60 w-full relative flex justify-center items-center">
      <div>
        <div class="h-60 w-60 relative bottom-8"
             :class="[rotate_class? 'rotate_class': '']">
          <img :src="smallImg"
               class="h-inherit w-inherit"
               alt="">

          <div class="absolute h-60 w-60 flex items-center justify-center top left right bottom">
            <div class="relative h-34 w-34"
                 :class="[rotate_reverse_class? 'rotate_reverse_class': '']"
                 :style="{transform: `rotate(${ballDeg}deg)`}">
              <div class="h-5 w-5 absolute top left bg-white rounded">
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="flex px-20 rounded-4 absolute z-index-10 top-8"
           v-if="isShowTime_common">
        <div class="flex betStatusBar justify-center"
             v-show="startBetBoolean">
          <div class="h-20 line-20 fz-16 cl-F2CF40 bolder">
            {{langSwitch('开始投注')}}
          </div>
          <div class="h-20 line-20 ml-12 relative gameTime">
            <van-count-down :time="countdownTime*1000"
                            @change="lottery30_isTime_fn">
              <template #default="timeData">
                <span class="fz-14 cl-F2CF40">{{ timeData.seconds > 9 ? timeData.seconds: '0' + timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
        </div>
      </div>
      <!-- history -->
      <div class="absolute right-4 top-4 h-30 w-64 box-border rounded-4 px-6"
           @click="isHistory = true;">
        <div class="w-full h-full relative">
          <img src="~@/assets/images/game_historys.png"
               class="w-full h-full"
               alt="">
          <div class="h-16 w-full absolute bottom left relative cl-white rounded-4 fz-10 text-center line-16 flex items-center justify-center">
            <div class="w-14 h-14 rounded"
                 :class="ballColor[getters_getBetViewInfo.lastResult.open_result]['color']"> {{getters_getBetViewInfo.lastResult.open_result}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-130 pl-24 pr-24 pt-4 pb-4 box-border flex flex-col relative">
      <div class="h-140 w-30 absolute right flex flex-col cl-white"
           style="top:-10px;">
        <div class="flex-1  flex justify-center items-center">
          <van-icon name="question-o"
                    size="20"
                    @click="isPlayInstruction = true" />
        </div>
        <div class="flex-1  flex justify-center items-center">
          <van-icon name="todo-list-o"
                    size="20"
                    @click="isBetHistory = true" />
        </div>
        <div class="flex-1  flex justify-center items-center"
             @click="actions_rootStore({ key: 'lotterySound', val: !lotterySound })">
          <van-icon size="20"
                    v-if="lotterySound"
                    name="music-o" />
          <van-icon size="20"
                    color="#000000"
                    v-else
                    name="music" />
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex-1 flex flex-wrap">
          <template v-for="(v,k) in waysOption">
            <div class="flex w-Equally-4 mb-5 relative"
                 v-if="showWaysOptionSet.includes(k)"
                 :key="k+'waysOption'">
              <div class="flex-1 px-6 box-border"
                   @click='continuousClick(v)'>
                <div class="w-full h-60 rounded-12 box-border scroll-hide flex flex-col"
                     style="border: 2px solid white">
                  <div class="h-10 line-10 w-full cl-white fz-8 text-center"></div>
                  <div class="flex-1 flex flex-col fz-12">
                    <div class="flex-1 flex items-center justify-center">{{v.st}}</div>
                    <div class="flex-1 flex items-center justify-center">X{{v.value}}</div>
                  </div>
                  <div class="h-12 line-12 w-full cl-white fz-10 text-center"
                       style="background:#565E45">
                    {{v.betall}}
                  </div>
                </div>
              </div>
              <!-- 气泡 -->
              <div class="w-80 h-20 absolute top left-48- pointerEvents">
                <div class="msg">{{v.st}}</div>
              </div>
              <!-- 玩家投注气泡 -->
              <div class="w-80 h-20 absolute top-16 right-2- pointerEvents"
                   v-if="v.betmine">
                <div class="msg-1">{{v.betmine}}</div>
              </div>
              <!-- 筹码 -->
              <div v-for="(val, key) in v.chouMa"
                   v-chouMaBg
                   class="w-20 h-20 absolute bg-red cl-white text-center line-20 fz-8 rounded rounded_class z-index-10 pointerEvents"
                   :style="{'top': val.top, 'left': val.left,'--bgTop': val.offsetY,'--bgLeft': val.offsetX,}"
                   :key="key + 'chouMa' + k">
                <div>{{val.money}}</div>
                <audio autoplay
                       hidden
                       v-if="val.isSound"
                       src="~@/assets/music/bet.mp3"></audio>
              </div>
              <!-- 投注确认 -->
              <div class="w-48 h-36 absolute z-index-100"
                   v-if="betObj[v.title]"
                   style="top:50%;left:50%; margin-left:-24px; margin-top:-16px;">
                <div class="h-16 w-48 flex">
                  <div class="flex-1 betQr-2 extendClick"
                       @click="emptyBetObj"></div>
                  <div class="w-8"></div>
                  <div class="flex-1 betQr-3 extendClick"
                       @click="confirmBet(v)"></div>
                </div>
                <div class="mt-4 h-16 line-12 w-48 text-center betQr-1 fz-12 cl-white"
                     @click='continuousClick(v)'>{{betObj[v.title]}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>

    </div>
    <div class="h-40 w-full px-8 box-border relative">
      <chips :is_bg="false"></chips>
    </div>
    <div class="h-50 w-full pl-8 pr-8 pt-6 box-border flex items-center top5-bg">
      <div class="w-50 box-border cl-white fz-14 bolder flex items-center justify-center">TOP5</div>
      <div class="flex-1 flex">
        <div class="flex-1 box-border flex justify-center"
             v-for="(v,k) in getters_getLiveBetRank"
             :key="k+'getters_getLiveBetRank'">
          <div class="h-36 w-36 rounded relative">
            <img :src="zwfImg"
                 v-real-img="v.photo"
                 class="h-36 w-36 box-border rounded"
                 style="border: 2px solid yellow"
                 alt="">
            <div class="absolute w-8 h-8 bottom right fz-14 cl-orange text-center line-6 bolder">
              {{k + 1}}
            </div>
          </div>
        </div>
      </div>
      <div class="w-80 fz-10 cl-white flex items-center justify-center">
        <img src="~@/assets/images/game_players.png"
             class="w-72 h-24">
      </div>
    </div>

    <!-- 历史开奖 -->
    <van-popup v-model="isHistory"
               position="right"
               :overlay="false"
               :style="{ height: '100%',width: '100%', }"
               style="background:transparent !important;">
      <div class="h-280 w-full bg-black absolute bottom cl-white">
        <div class="h-36 w-full relative line-40 text-center fz-14 box-border van-hairline--bottom">
          {{langSwitch('开奖历史')}}
          <div class="absolute top-2 right-4"
               @click="isHistory_closeFn">
            <van-icon size="20"
                      name="close" />
          </div>
        </div>
        <div class="h-214 w-full scroll-y">
          <van-pull-refresh v-model="refreshing"
                            @refresh="onRefresh">
            <van-list v-model="loading"
                      :finished="finished"
                      v-if="isHistory"
                      :finished-text="langSwitch('没有更多了')"
                      @load="onLoad">
              <div class="px-10 box-border mb-4"
                   v-for="(v,k) in isHistory_list"
                   :key="k+'isHistory_list'">
                <div class="h-24 line-24 fz-12 cl-a8a8a8">
                  {{langSwitch('第')}} {{v.issue}} {{langSwitch('期')}}
                </div>
                <div class="h-30 flex items-center">
                  <div class="w-90 h-24 relative cl-white fz-12">
                    <div class="w-20 h-20 rounded line-20 text-center"
                         :class="ballColor[v.open_result]['color']">
                      {{v.open_result}}
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </van-popup>

    <!-- 玩法说明 -->
    <van-popup v-model="isPlayInstruction"
               position="bottom"
               :overlay="false"
               :style="{ height: '100%',width: '100%', }"
               style="background:transparent !important;">
      <div class="w-full h-600 bg-white absolute bottom">
        <div class="h-36 box-border van-hairline--bottom flex w-full">
          <div class="w-36 h-36 flex items-center justify-center"
               @click="isPlayInstruction = false">
            <van-icon size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 h-36 line-36 text-center fz-14">{{langSwitch('玩法说明')}} </div>
          <div class="w-36"></div>
        </div>
        <div class="h-564">
          <iframe :src="HowToPlay_address"
                  frameborder="0"
                  class="w-full h-full iframe"
                  id="iframe30"></iframe>
        </div>
      </div>
    </van-popup>

    <!-- 投注记录 -->
    <lotteryBetHistory :isBetHistory="isBetHistory"
                       v-if="isBetHistory"
                       @changeIsBetHistory="isBetHistory=false"></lotteryBetHistory>

    <!-- 开奖弹框 -->
    <div class="absolute top left right bottom flex justify-center"
         v-if="rotate_class_one">
      <div class="w-200 h-60 box-border absolute rounded-200 flex flex-col z-index-20 top-70 scroll-hide">
        <div class="w-200 h-200"
             :class="[rotate_class_one?'rotate_class_one':'']">
          <img class="w-200 h-200"
               :style="{transform: `rotate(${bigDeg}deg)`}"
               :src="bigImg"
               alt="">
        </div>
        <div class="h-10 w-10 absolute top-15 left-95 z-index-30">
          <img :src="ballImg"
               class="w-inherit h-inherit"
               alt="">
        </div>
      </div>
      <!-- 开奖声音 -->
      <audio autoplay
             hidden
             src="~@/assets/music/openAward.mp3"></audio>
    </div>
    <!-- 声音相关 -->
    <div v-if="lotterySound">
      <div v-if="sound_start">
        <audio autoplay
               hidden
               src="~@/assets/music/30_s.mp3"></audio>
      </div>
      <div v-if="sound_end">
        <audio autoplay
               hidden
               src="~@/assets/music/30_e.mp3"></audio>
      </div>
    </div>

    <!-- 即将开始 -->
    <div class="w-full h-20 box-border absolute flex z-index-20 items-center justify-center"
         v-if="changeTimeBoolean"
         style="top: 50%; margin-top:-20px">
      <div class="flex betStatusBar justify-center">
        <div class="h-20 line-20 fz-16 cl-F2CF40 bolder">
          {{langSwitch('即将开始')}}
        </div>
        <div class="h-20 line-20 ml-12 relative gameTime">
          <van-count-down time="4000"
                          @change="changeTimeFn">
            <template #default="timeData">
              <span class="fz-14 cl-F2CF40">{{ timeData.seconds > 9 ? timeData.seconds: '0' + timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import lotteryBetHistory from "./lotteryBetHistory";
import POKER_lh from "./exhibitResult/POKER_lh";
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'
import chips from "./widget/chips"

export default {
  name: 'lottery30',
  components: { lotteryBetHistory, POKER_lh, chips },
  props: ['mSocket', 'deliveryTime', 'MOREGAMEDATA_OPEN', 'MOREGAMEDATA_USER'],
  data () {
    return {
      getters_getLiveBetRank: '',
      isHistory: false,
      isHistoryParams: {
        page: 0,
      },
      isHistory_list: [],
      zwfImg: require("@/assets/images/top_avatar.png"),
      smallImg: require("@/assets/images/game_desk_zp_small.png"),
      bigImg: require("@/assets/images/game_desk_zp_big.png"),
      ballImg: require("@/assets/images/zp_ball.png"),
      refreshing: false,
      loading: false,
      finished: false,
      isPlayInstruction: false,
      isBetHistory: false,
      openAwardData: '',
      // 轮盘组合
      lunpan_arr: ['28', '12', '35', '3', '26', '0', '32', '15', '4', '19', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7'],
      lunpan_big_arr: ['0', '32', '15', '4', '19', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'],
      rotate_class: false,
      rotate_class_one: false,
      rotate_reverse_class: false,
      ballDeg: 0, // 小球偏移量
      bigDeg: 0, // 大图偏移量
      ballColor: {
        '0': { color: 'bg-green' },
        '32': { color: 'bg-red' },
        '15': { color: 'bg-black' },
        '4': { color: 'bg-red' },
        '19': { color: 'bg-black' },
        '21': { color: 'bg-red' },
        '2': { color: 'bg-black' },
        '25': { color: 'bg-red' },
        '17': { color: 'bg-black' },
        '34': { color: 'bg-red' },
        '6': { color: 'bg-black' },
        '27': { color: 'bg-red' },
        '13': { color: 'bg-black' },
        '36': { color: 'bg-red' },
        '11': { color: 'bg-black' },
        '30': { color: 'bg-red' },
        '8': { color: 'bg-black' },
        '23': { color: 'bg-red' },
        '10': { color: 'bg-black' },
        '5': { color: 'bg-red' },
        '24': { color: 'bg-black' },
        '16': { color: 'bg-red' },
        '33': { color: 'bg-black' },
        '1': { color: 'bg-red' },
        '20': { color: 'bg-black' },
        '14': { color: 'bg-red' },
        '31': { color: 'bg-black' },
        '9': { color: 'bg-red' },
        '22': { color: 'bg-black' },
        '18': { color: 'bg-red' },
        '29': { color: 'bg-black' },
        '7': { color: 'bg-red' },
        '28': { color: 'bg-black' },
        '12': { color: 'bg-red' },
        '35': { color: 'bg-black' },
        '3': { color: 'bg-red' },
        '26': { color: 'bg-black' },
      },
      countdownTime: '',
      isShowTime_common: true,
      countdownTime_common_midVar: '',
      currentIssue: '',
      HowToPlay_address: '',
      sound_start: false,
      sound_end: false,
      showWaysOptionSet: [0, 37, 38, 39, 40, 41, 42, 43],
      startBetBoolean: true,
      changeTimeBoolean: false,
      betObj: {}
    };
  },
  watch: {
    openAwardData: {
      handler (newValue, oldValue) {
        let _this = this;
        if (!!newValue) {
          this.delayFn(() => {
            _this.openAwardData = '';
          }, 4000)
        }
      },
      deep: true,  // 深度监听
    },
    MOREGAMEDATA_OPEN: {
      handler (newValue, oldValue) {
        this.handler_open(newValue);
      },
      depp: true
    },
    MOREGAMEDATA_USER: {
      handler (newValue, oldValue) {
        this.handler_user(newValue);
      },
      depp: true
    }
  },
  created () {
    this.init();
    // this.initSocket();
    this.initChouMa();
    // 初始化小球位置
    this.initBall();
    // this.bigDeg = -((360 / 37) * (this.lunpan_big_arr.indexOf('26')));
    // 赋值倒计时
    this.countdownTime = this.deliveryTime;
    // 彩票期数
    this.currentIssue = this.getters_getBetViewInfo.issue;

    this.HowToPlay();
  },
  beforeMount () { },
  mounted () {
    // 监听接收消息
    this.$bus.$on("shareTime", () => {
      // 动画时间相关
      let busVar = this.countdownTime_common_midVar < 1 ? this.countdownTime : this.countdownTime_common_midVar;
      this.mutations_componentTime(busVar);
    });
  },
  beforeDestroy () {
    this.$bus.$off("shareTime");  // 注意销毁
  },
  methods: {
    ...mapActions(['actions_getLiveBetRank', 'actions_getOpenHistory', 'actions_getBetViewInfo', 'actions_rootStore']),
    ...mapMutations(['mutations_componentTime']),
    HowToPlay () {
      let HOST = this.HOST;
      let obj = { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
      this.HowToPlay_address = `${HOST}/index.php?g=Appapi&m=LotteryArticle&a=index&l=${obj[this.LANG]}&lotteryType=${this.MOREGAMETYPE}&uid=${this.UID}&token=${this.TOKEN}`
    },
    lottery30_isTime_fn (timeData) {
      this.countdownTime_common_midVar = timeData.seconds;
      // console.log(timeData);
      if (timeData.seconds < 1 || !timeData.seconds) { this.isShowTime_common = false; }
    },
    changeTimeFn (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.startBetBoolean = true;
        this.changeTimeBoolean = false;
      }
    },
    onRefresh () {
      this.finished = false;
      this.loading = true;
      this.isHistoryParams.page = 0;
      this.isHistory_list = [];
      this.onLoad();
    },
    onLoad () {
      this.actions_getOpenHistory(this.isHistoryParams).then(res => {
        this.isHistory_list.push.apply(this.isHistory_list, res.info.list)
        this.isHistoryParams.page += 1;
        this.loading = false;
        if (res.info.list.length == 0) { this.finished = true; }
        this.refreshing = false;
      })
    },
    isHistory_closeFn () {
      this.isHistoryParams.page = 0;
      this.isHistory_list = [];
      this.isHistory = false;
    },
    init () {
      let lottery_type = this.MOREGAMETYPE;
      let live_id = this.ANCHOR.uid;
      let params = { lottery_type, live_id, }
      this.actions_getLiveBetRank(params).then(res => {
        let list = res.info;
        if (res.code == 0) {
          this.getters_getLiveBetRank = list;
          if (list.length < 5) {
            let x = 5 - list.length;
            for (let i = 0; i < x; i++) {
              this.getters_getLiveBetRank.push({
                photo: ''
              })
            }
          }
        } else {
          this.getters_getLiveBetRank = [];
          for (let i = 0; i < 5; i++) {
            this.getters_getLiveBetRank.push({
              photo: ''
            })
          }
        }
      })
      // 赋值lottery_type
      this.isHistoryParams.lottery_type = lottery_type;
    },
    initSocket () {
      const StreamMsg = protoRoot.lookup('common.StreamMsg');
      let event = this.WSEVENT['SOCKET_BROADCAST']
      this.mSocket.on(event, (rawResponse) => {
        let StreamMsg_buf = protobuf.util.newBuffer(rawResponse)
        let { msgID, msgData } = StreamMsg.decode(StreamMsg_buf);
        let msg_buf = protobuf.util.newBuffer(msgData);
        let msg_id = protoRoot.lookup(`s2c.${this.MSGID[msgID]}`);
        let result = msg_id.decode(msg_buf);

        if (msgID == 9 && result.msg.lotteryType == this.MOREGAMETYPE && this.MOREGAME) {
          // console.log(result);
          // 倒计时相关;
          this.countdownTime = 59;
          let msgRes = result.msg.result;
          this.ballDeg = 0;
          this.bigDeg = 0
          this.rotate_class = true;
          this.rotate_reverse_class = true;

          this.startBetBoolean = false;

          this.sound_start = true;

          this.delayFn(() => {
            this.countdownTime = 58;
          }, 1000)

          this.delayFn(() => {
            this.rotate_reverse_class = false;
            // clearTimeout(rotate_reverse_class_timer);
            //  开奖结果
            let lunpan_index = this.lunpan_arr.indexOf(msgRes);
            if (lunpan_index > -1) {
              this.ballDeg = (360 / 37) * lunpan_index - 2;
              this.bigDeg = -((360 / 37) * (this.lunpan_big_arr.indexOf(msgRes)) + 1);
              this.rotate_class_one = true;
            }
            this.countdownTime = 57;

            this.sound_start = false;
            this.sound_end = true
          }, 2000)

          this.delayFn(() => {
            this.countdownTime = 56;
          }, 3000)

          this.delayFn(() => {
            this.rotate_class = false;
            //  赋值结果展示
            this.getters_getBetViewInfo.lastResult.open_result = msgRes;
            this.countdownTime = 55;

            this.sound_end = false;
          }, 4000)

          this.delayFn(() => {
            this.countdownTime = 54;
          }, 5000)

          this.delayFn(() => {
            this.rotate_class_one = false;
            this.isShowTime_common = true;
            this.countdownTime = 53;
            this.changeTimeBoolean = true;
          }, 6000)

          this.openAwardData = result;
          this.getters_getBetViewInfo.ways[0].options.forEach(element => {
            element.betall = 0;
            element.chouMa = [];
          });

          // 期数;
          this.currentIssue = result.msg.issue + 1;
        }

        if (msgID == 8 && result.msg.lotteryType == this.MOREGAMETYPE && this.MOREGAME) {
          // console.log(result);
          let { way } = result.msg;
          if (way.includes('_0')) {
            this.getters_getBetViewInfo.ways[0].options[0].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 4 - left;
            let offsetY = 130 - top;
            this.getters_getBetViewInfo.ways[0].options[0].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_1-12')) {
            this.getters_getBetViewInfo.ways[0].options[37].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 3 - left;
            let offsetY = 130 - top;
            this.getters_getBetViewInfo.ways[0].options[37].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_13-24')) {
            this.getters_getBetViewInfo.ways[0].options[38].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 2 - left;
            let offsetY = 130 - top;
            this.getters_getBetViewInfo.ways[0].options[38].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_25-36')) {
            this.getters_getBetViewInfo.ways[0].options[39].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 1 - left;
            let offsetY = 130 - top;
            this.getters_getBetViewInfo.ways[0].options[39].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_红色')) {
            this.getters_getBetViewInfo.ways[0].options[40].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 4 - left;
            let offsetY = 65 - top;
            this.getters_getBetViewInfo.ways[0].options[40].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_黑色')) {
            this.getters_getBetViewInfo.ways[0].options[41].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 3 - left;
            let offsetY = 65 - top;
            this.getters_getBetViewInfo.ways[0].options[41].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_大')) {
            this.getters_getBetViewInfo.ways[0].options[42].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 2 - left;
            let offsetY = 65 - top;
            this.getters_getBetViewInfo.ways[0].options[42].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('_小')) {
            this.getters_getBetViewInfo.ways[0].options[43].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 14 + 10;
            let left = Math.random() * 66;
            let offsetX = 82 * 1 - left;
            let offsetY = 65 - top;
            this.getters_getBetViewInfo.ways[0].options[43].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          }
        }
      })
    },
    handler_open (result) {
      this.betObj = {};
      this.countdownTime = 59;
      let msgRes = result.msg.result;
      this.ballDeg = 0;
      this.bigDeg = 0
      this.rotate_class = true;
      this.rotate_reverse_class = true;

      this.startBetBoolean = false;

      this.sound_start = true;

      this.delayFn(() => {
        this.countdownTime = 58;
      }, 1000)

      this.delayFn(() => {
        this.rotate_reverse_class = false;
        // clearTimeout(rotate_reverse_class_timer);
        //  开奖结果
        let lunpan_index = this.lunpan_arr.indexOf(msgRes);
        if (lunpan_index > -1) {
          this.ballDeg = (360 / 37) * lunpan_index - 2;
          this.bigDeg = -((360 / 37) * (this.lunpan_big_arr.indexOf(msgRes)) + 1);
          this.rotate_class_one = true;
        }
        this.countdownTime = 57;

        this.sound_start = false;
        this.sound_end = true
      }, 2000)

      this.delayFn(() => {
        this.countdownTime = 56;
      }, 3000)

      this.delayFn(() => {
        this.rotate_class = false;
        //  赋值结果展示
        this.getters_getBetViewInfo.lastResult.open_result = msgRes;
        this.countdownTime = 55;

        this.sound_end = false;
      }, 4000)

      this.delayFn(() => {
        this.countdownTime = 54;
      }, 5000)

      this.delayFn(() => {
        this.rotate_class_one = false;
        this.isShowTime_common = true;
        this.countdownTime = 53;
        this.changeTimeBoolean = true;
      }, 6000)

      this.openAwardData = result;
      this.getters_getBetViewInfo.ways[0].options.forEach(element => {
        element.betall = 0;
        element.betmine = 0;
        element.chouMa = [];
      });

      // 期数;
      this.currentIssue = result.msg.issue + 1;
    },
    handler_user (result) {
      let { way, uid } = result.msg;
      if (way.includes('_0')) {
        this.getters_getBetViewInfo.ways[0].options[0].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[0].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 4 - left;
        let offsetY = 130 - top;
        this.getters_getBetViewInfo.ways[0].options[0].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_1-12')) {
        this.getters_getBetViewInfo.ways[0].options[37].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[37].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 3 - left;
        let offsetY = 130 - top;
        this.getters_getBetViewInfo.ways[0].options[37].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_13-24')) {
        this.getters_getBetViewInfo.ways[0].options[38].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[38].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 2 - left;
        let offsetY = 130 - top;
        this.getters_getBetViewInfo.ways[0].options[38].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_25-36')) {
        this.getters_getBetViewInfo.ways[0].options[39].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[39].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 1 - left;
        let offsetY = 130 - top;
        this.getters_getBetViewInfo.ways[0].options[39].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_红色')) {
        this.getters_getBetViewInfo.ways[0].options[40].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[40].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 4 - left;
        let offsetY = 65 - top;
        this.getters_getBetViewInfo.ways[0].options[40].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_黑色')) {
        this.getters_getBetViewInfo.ways[0].options[41].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[41].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 3 - left;
        let offsetY = 65 - top;
        this.getters_getBetViewInfo.ways[0].options[41].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_大')) {
        this.getters_getBetViewInfo.ways[0].options[42].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[42].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 2 - left;
        let offsetY = 65 - top;
        this.getters_getBetViewInfo.ways[0].options[42].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('_小')) {
        this.getters_getBetViewInfo.ways[0].options[43].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[43].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 14 + 10;
        let left = Math.random() * 66;
        let offsetX = 82 * 1 - left;
        let offsetY = 65 - top;
        this.getters_getBetViewInfo.ways[0].options[43].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      }
    },
    initChouMa () {
      this.getters_getBetViewInfo.ways[0].options.forEach(element => {
        element.chouMa = [];
        if (element.betall != 0) {
          element.chouMa.push({
            money: Number(element.betall),
            top: `${Math.random() * 14 + 10}px`,
            left: `${Math.random() * 66}px`,
          })
        }
      });
    },
    initBall () {
      let openRes = this.getters_getBetViewInfo.lastResult.open_result;
      let lunpan_index = this.lunpan_arr.indexOf(openRes);
      if (lunpan_index > -1) { this.ballDeg = (360 / 37) * lunpan_index - 2 }
    },
    continuousClick (v) {
      console.log(v)
      let amount;
      if (!this.betObj[v.title]) { this.betObj = {}; amount = 0; } else { amount = this.betObj[v.title] }
      amount += this.getters_betAmountValue;
      Vue.set(this.betObj, v.title, amount);
      // $emit("betAssistant", { lottery_type: MOREGAMETYPE, money: `[${getters_betAmountValue}]`, way: `["${val.title}"]`, serTime: parseInt(new Date().getTime() / 1000), issue: currentIssue, optionName: val.optionName, liveuid: ANCHOR.uid })
    },
    emptyBetObj () {
      this.betObj = {};
    },
    confirmBet (val) {
      this.$emit("betAssistant", {
        lottery_type: this.MOREGAMETYPE,
        money: `[${this.betObj[val.title]}]`,
        way: `["${val.title}"]`,
        serTime: parseInt(new Date().getTime() / 1000),
        issue: this.currentIssue,
        optionName: val.optionName,
        liveuid: this.ANCHOR.uid
      })
      this.betObj = {};
    }
  },
  computed: {
    ...mapGetters(['UID', 'TOKEN', 'HOST', 'LANG', 'ANCHOR', 'getters_getBetViewInfo', 'WSEVENT', 'getters_getEnterRoom', 'MSGID', 'getters_betAmountValue', 'lotterySound', 'MOREGAME', 'MOREGAMETYPE']),
    waysOption () {
      let arr = this.getters_getBetViewInfo.ways[0].options;
      return arr;
    }
  },
}
</script>
<style lang='scss'>
.lottery30 {
  .van-dropdown-menu {
    .van-dropdown-menu__bar {
      height: 36px !important;
      .van-dropdown-menu__item {
        height: 36px !important;
      }
    }
  }
  .van-dropdown-item {
  }

  .rounded_class {
    animation: move 0.4s alternate linear;
  }

  @keyframes move {
    0% {
      transform: translate(var(--bgLeft), var(--bgTop));
    }
  }

  .rotate_class {
    animation: rotate_move 1s linear infinite;
  }

  .rotate_class_one {
    animation: rotate_move 2s linear;
  }

  @keyframes rotate_move {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  .rotate_reverse_class {
    animation: rotate_reverse_move 0.5s linear infinite;
  }

  @keyframes rotate_reverse_move {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(-180deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
    }
  }
  .top5-bg {
    background-image: url("~@/assets/images/lotteryBg/yfks_bgview_bottom.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .msg {
    position: absolute;
    bottom: 16px;
    right: 0px;
    background-color: rgb(31, 109, 7);
    padding: 2px 10px;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 12px;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .msg::before {
    content: "";
    position: absolute;
    right: 6px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    background: inherit;
    /*自动继承父元素的背景*/
    transform: rotate(45deg);
  }

  .msg-1 {
    position: absolute;
    bottom: 16px;
    right: 0px;
    background-color: #f9ea64;
    padding: 2px 10px;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 12px;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .msg-1::before {
    content: "";
    position: absolute;
    left: 6px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    background: inherit;
    /*自动继承父元素的背景*/
    transform: rotate(45deg);
  }

  .gameTime::before {
    content: "";
    width: 30px;
    height: 30px;
    position: absolute;
    top: -6px;
    left: -7px;
    z-index: -1;
    background-image: url("~@/assets/images/game_secondimg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .betStatusBar::before {
    content: "";
    width: 160px;
    height: 40px;
    top: -10px;
    position: absolute;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
  .betQr-1 {
    background-image: url("~@/assets/images/bet_qr_10.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .betQr-2 {
    background-image: url("~@/assets/images/bet_qr_03.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .betQr-3 {
    background-image: url("~@/assets/images/bet_qr_05.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>