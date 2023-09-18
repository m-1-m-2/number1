<template>
  <div class='lottery27 absolute top bottom left right flex flex-col'>
    <!-- 一分快三 -->
    <!-- 280 -->
    <div class="h-50 w-full relative flex justify-center items-center">
      <div class="absolute top bottom right left flex items-center justify-center">
        <div class="h-50 w-60 flex items-center justify-center">
          <div class="h-50 w-60 relative">
            <div class="h-50 w-60 flex items-center justify-center absolute top z-index-10">
              <img src="~@/assets/images/lotteryBg/yfkz_shaigu.png"
                   class="h-inherit"
                   alt="">

              <div class="absolute w-60 h-50 top left flex items-center justify-center"
                   v-if="!isShowTouZiResult">
                <img src="~@/assets/images/lotteryBg/shaizi_animation.gif"
                     class="w-48 h-48"
                     alt="">
              </div>

              <div class="absolute w-60 h-50 top left flex items-center justify-center"
                   v-else>
                <div class="h-14 w-14 relative"
                     style="top:-6px">
                  <img :src="showTouZiResultFn(0)"
                       class="h-inherit w-inherit"
                       alt="">
                </div>
                <div class="h-14 w-14 absolute top">
                  <img :src="showTouZiResultFn(1)"
                       class="h-inherit w-inherit"
                       alt="">
                </div>
                <div class="h-14 w-14 relative"
                     style="top:-6px;">
                  <img :src="showTouZiResultFn(2)"
                       class="h-inherit w-inherit"
                       alt="">
                </div>

              </div>
            </div>
            <transition name="van-slide-down">
              <div class="h-50 w-60 flex items-center justify-center absolute top z-index-20"
                   v-if="isHaveGaizi">

                <img src="~@/assets/images/lotteryBg/yfks_gaizi.png"
                     class="h-inherit"
                     alt="">

              </div>
            </transition>

            <!-- 骰子声音 -->
            <audio autoplay
                   hidden
                   loop
                   v-if="!isHaveGaizi && !isShowTouZiResult && !!lotterySound"
                   src="~@/assets/music/26.mp3"></audio>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center relative z-index-50">
        <div class="flex px-20 rounded-4 relative top-8"
             v-if="isShowTime_common">
          <div class="flex betStatusBar justify-center"
               v-show="startBetBoolean">
            <div class="h-20 line-20 fz-16 cl-F2CF40 bolder">
              {{langSwitch('开始投注')}}
            </div>
            <div class="h-20 line-20 ml-12 relative gameTimeCopy">
              <van-count-down :time="countdownTime*1000"
                              @change="lottery27_isTime_fn">
                <template #default="timeData">
                  <span class="fz-14 cl-F2CF40">{{ (timeData.seconds + timeData.minutes * 60 ) > 9 ? (timeData.seconds +  timeData.minutes * 60 ): '0' + (timeData.seconds + timeData.minutes * 60) }}</span>
                </template>
              </van-count-down>
            </div>
          </div>
        </div>
      </div>
      <!-- history -->
      <div class="absolute right-4 top-4 h-36 w-64 box-border rounded-4"
           @click="isHistory = true;">
        <div class="w-full h-full relative">
          <img src="~@/assets/images/game_historys.png"
               class="w-full h-full"
               alt="">
          <div class="h-20 w-full absolute bottom left relative cl-white rounded-4">
            <result27 :result="getters_getBetViewInfo.lastResult.open_result"></result27>
          </div>
        </div>
      </div>
    </div>
    <div class="h-140 pl-24 pr-24 pt-4 pb-4 box-border flex flex-col relative">
      <!--  -->
      <div class="h-140 w-30 absolute right top flex flex-col cl-white">
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
      <div class="flex-1 flex py-4 box-border"
           v-for="(v,k) in waysOption"
           :key="k+'waysOption'">
        <div class="flex-1 px-6 box-border relative"
             v-for="(val, key) in v"
             :key="key +'waysOptionItems' + k"
             :ref="'way' + k + '_' + key">
          <div class="w-full h-full rounded-24 box-border flex scroll-hide flex-col"
               @click='continuousClick(val)'
               style="border: 2px solid white">
            <div class="h-10 line-10 w-full cl-white fz-8 text-center"></div>
            <div class="flex-1 flex flex-col fz-12">
              <div class="flex-1 flex items-center justify-center">{{key == 2? langSwitch('猜豹子') :''}}{{val.st}}</div>
              <div class="flex-1 flex items-center justify-center">X{{val.value}}</div>
            </div>
            <div class="h-12 line-12 w-full cl-white fz-10 text-center"
                 style="background:#565E45">
              {{val.betall}}
            </div>
          </div>
          <!-- 气泡 -->
          <div class="w-80 h-20 absolute top left-48- pointerEvents">
            <div class="msg">{{key == 2? langSwitch('猜豹子') :''}}{{val.st}}</div>
          </div>
          <!-- 玩家投注气泡 -->
          <div class="w-80 h-20 absolute top-16 right-2- pointerEvents"
               v-if="val.betmine">
            <div class="msg-1">{{val.betmine}}</div>
          </div>
          <!-- 筹码 -->
          <div v-for="(val1, key1) in val.chouMa"
               v-chouMaBg
               class="w-20 h-20 absolute bg-red cl-white text-center line-20 fz-8 rounded rounded_class z-index-10 pointerEvents"
               :style="{'top': val1.top, 'left': val1.left,'--bgTop': val1.offsetY,'--bgLeft': val1.offsetX,}"
               :key="key1 + 'chouMa' + key">
            <div>{{val1.money}}</div>
            <audio autoplay
                   hidden
                   v-if="val1.isSound"
                   src="~@/assets/music/bet.mp3"></audio>
          </div>
          <!-- 投注确认 -->
          <div class="w-48 h-36 absolute z-index-100"
               v-if="betObj[val.title]"
               style="top:50%;left:50%; margin-left:-24px; margin-top:-16px;">
            <div class="h-16 w-48 flex">
              <div class="flex-1 betQr-2 extendClick"
                   @click="emptyBetObj"></div>
              <div class="w-8"></div>
              <div class="flex-1 betQr-3 extendClick"
                   @click="confirmBet(val)"></div>
            </div>
            <div class="mt-4 h-16 line-12 w-48 text-center betQr-1 fz-12 cl-white"
                 @click='continuousClick(val)'>{{betObj[val.title]}}</div>
          </div>
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
                  {{langSwitch('第')}}{{v.issue}}{{langSwitch('期')}}
                </div>
                <div class="h-30 flex items-center">
                  <div class="w-90 h-24 relative cl-white">
                    <result27 :result="v.open_result"></result27>
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
          <div class="flex-1 h-36 line-36 text-center fz-14">{{langSwitch('玩法说明')}}</div>
          <div class="w-36"></div>
        </div>
        <div class="h-564">
          <iframe :src="HowToPlay_address"
                  frameborder="0"
                  class="w-full h-full iframe"
                  id="iframe27"></iframe>
        </div>
      </div>
    </van-popup>

    <!-- 投注记录 -->
    <lotteryBetHistory :isBetHistory="isBetHistory"
                       v-if="isBetHistory"
                       @changeIsBetHistory="isBetHistory=false"></lotteryBetHistory>

    <!-- 开奖弹框 -->
    <div class="w-160 h-50 box-border absolute rounded-4 flex flex-col px-10 z-index-20"
         v-if="!!openAwardData"
         style="border: 2px solid yellow; background: rgba(0,0,0,0.5); top: 50%; left: 50%; margin-left: -80px; margin-top:-30px;">
      <div class="h-20 w-full fz-18 cl-red line-20 flex justify-center">
        <div>
          {{ languageObj[LANG][getters_getBetViewInfo.lastResult.winWays[13].split('_')[1]] }}
          {{ languageObj[LANG][getters_getBetViewInfo.lastResult.winWays[14].split('_')[1]] }}
          <!-- {{(getters_getBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))) > 10 ? '大': '小'}} -->
          <!-- {{(getters_getBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))) % 2 != 1 ? '双': '单'}} -->
        </div>
      </div>
      <div class="h-30 w-full flex">
        <div class="w-90 relative cl-white">
          <result27 :result="getters_getBetViewInfo.lastResult.open_result"></result27>
        </div>
        <div class="flex-1 text-center line-30 cl-white fz-18">
          {{getters_getBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))}}
        </div>
      </div>
      <!-- 开奖声音 -->
      <audio autoplay
             hidden
             src="~@/assets/music/openAward.mp3"></audio>
    </div>

    <!-- 旧版按钮  -->
    <div class="absolute top-10 left-16 fz-12">
      <div class="w-fit h-fit pl-8 pr-8 pt-4 pb-4 cl-white rounded-16"
           style="background: linear-gradient(to right, #EF4B8D, #EF4B8D)"
           @click="is_oldVersionBet = true">{{langSwitch('切换旧版')}}</div>
    </div>

    <!-- 即将开始 -->
    <div class="w-full h-20 box-border absolute flex z-index-20 items-center justify-center"
         v-if="changeTimeBoolean"
         style="top: 50%; margin-top:-20px">
      <div class="flex betStatusBar justify-center ">
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
    <!--  -->
    <oldVersionBet v-if="is_oldVersionBet"
                   :result="is_oldOpenAward"
                   :showBackNew="true"
                   :countdownTime="countdownTime_common_midVar"
                   :currentIssue="currentIssue"
                   @betAssistant_oldVersion="betAssistant_oldVersion"
                   @old_backNewVersion="old_backNewVersion"
                   @old_isPlayInstruction="old_isPlayInstruction"
                   @old_isBetHistory="old_isBetHistory"
                   @old_isHistory="old_isHistory"></oldVersionBet>

  </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import lotteryBetHistory from "./lotteryBetHistory";
import result27 from "./exhibitResult/result27";
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';
import chips from "./widget/chips";
import oldVersionBet from "./oldVersionBet.vue"

export default {
  name: 'lottery27',
  components: { lotteryBetHistory, result27, chips, oldVersionBet },
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
      refreshing: false,
      loading: false,
      finished: false,
      isPlayInstruction: false,
      isBetHistory: false,
      openAwardData: '',
      countdownTime: '',
      isShowTime_common: true,
      countdownTime_common_midVar: '',
      currentIssue: '',
      HowToPlay_address: '',
      // 骰子相关
      isHaveGaizi: true,
      isShowTouZiResult: false,
      is_oldVersionBet: false,
      is_oldOpenAward: '',
      startBetBoolean: true,
      changeTimeBoolean: false,
      betObj: {},
      languageObj: {
        'en': {
          "大": "Big",
          "小": "Small",
          "单": "Odd",
          "双": "Even",
        },
        'id': {
          "大": "Besar",
          "小": "Kecil",
          "单": "Ganjil",
          "双": "Genap",
        },
        'ja': {
          "大": "大",
          "小": "小",
          "单": "奇数",
          "双": "偶数",
        },
        'vi': {
          "大": "Tài",
          "小": "Xỉu",
          "单": "Lẻ",
          "双": "Chẵn",
        },
        'zh-CN': {
          "大": "大",
          "小": "小",
          "单": "单",
          "双": "双",
        },
        'zh-TW': {
          "大": "大",
          "小": "小",
          "单": "單",
          "双": "雙",
        },
      }
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
    // 赋值倒计时
    // this.countdownTime = this.deliveryTime;
    this.countdownTime = this.getters_getBetViewInfo.time;
    // 彩票期数
    this.currentIssue = this.getters_getBetViewInfo.issue;

    this.HowToPlay();

    this.is_oldOpenAward = this.getters_getBetViewInfo.lastResult.open_result;
  },
  beforeMount () { },
  mounted () {
    // 监听接收消息
    this.$bus.$on("shareTime", () => {
      this.mutations_componentTime(this.countdownTime_common_midVar);
    });
  },
  beforeDestroy () {
    this.$bus.$off("shareTime");  // 注意销毁
  },
  methods: {
    ...mapActions(['actions_getLiveBetRank', 'actions_getOpenHistory', 'actions_getBetViewInfo', 'actions_rootStore']),
    ...mapMutations(['mutations_componentTime']),
    betAssistant_oldVersion (params) {
      this.$emit('betAssistant', params);
    },
    old_backNewVersion () { this.is_oldVersionBet = false; },
    old_isPlayInstruction () { this.isPlayInstruction = true; },
    old_isBetHistory () { this.isBetHistory = true; },
    old_isHistory () { this.isHistory = true; },
    showTouZiResultFn (index) {
      return require(`@/assets/images/lotteryBg/shaizi_result_${this.openAwardData.msg.result.split(',')[index]}.png`)
    },
    HowToPlay () {
      let HOST = this.HOST;
      let obj = { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
      this.HowToPlay_address = `${HOST}/index.php?g=Appapi&m=LotteryArticle&a=index&l=${obj[this.LANG]}&lotteryType=${this.MOREGAMETYPE}&uid=${this.UID}&token=${this.TOKEN}`
      // console.log(this.HowToPlay_address)
    },
    lottery27_isTime_fn (timeData) {
      this.countdownTime_common_midVar = timeData.seconds + timeData.minutes * 60;
      if ((timeData.seconds < 1 || !timeData.seconds) && timeData.minutes == 0) {
        this.isShowTime_common = false;
      }
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
          console.log(result);
          this.is_oldOpenAward = result.msg.result;
          // this.getters_getBetViewInfo.lastResult.open_result = result.msg.result;
          // this.openAwardData = result;
          this.getters_getBetViewInfo.ways[0].options[0].betall = 0;
          this.getters_getBetViewInfo.ways[0].options[1].betall = 0;
          this.getters_getBetViewInfo.ways[0].options[2].betall = 0;
          this.getters_getBetViewInfo.ways[0].options[3].betall = 0;
          this.getters_getBetViewInfo.ways[4].options[0].betall = 0;
          this.getters_getBetViewInfo.ways[4].options[5].betall = 0;

          this.getters_getBetViewInfo.ways[0].options[0].chouMa = [];
          this.getters_getBetViewInfo.ways[0].options[1].chouMa = [];
          this.getters_getBetViewInfo.ways[0].options[2].chouMa = [];
          this.getters_getBetViewInfo.ways[0].options[3].chouMa = [];
          this.getters_getBetViewInfo.ways[4].options[0].chouMa = [];
          this.getters_getBetViewInfo.ways[4].options[5].chouMa = [];

          // 倒计时相关;
          this.countdownTime = 179;
          this.isShowTime_common = true;

          this.startBetBoolean = false;

          // 期数;
          this.currentIssue = result.msg.issue + 1;

          // 移除盖子
          this.isHaveGaizi = false;
          this.delayFn(() => { this.isShowTouZiResult = true; this.openAwardData = result; this.getters_getBetViewInfo.lastResult.open_result = result.msg.result; this.getters_getBetViewInfo.lastResult.winWays = result.msg.winWays }, 5000)
          this.delayFn(() => { this.isHaveGaizi = true; this.isShowTouZiResult = false; this.changeTimeBoolean = true; }, 9000)
          // 间隔保持4000ms既可
        }

        if (msgID == 8 && result.msg.lotteryType == this.MOREGAMETYPE && this.MOREGAME) {
          let { way } = result.msg
          if (way.includes('大')) {
            this.getters_getBetViewInfo.ways[0].options[0].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 3 - left;
            let offsetY = 190 - top;
            this.getters_getBetViewInfo.ways[0].options[0].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('小')) {
            this.getters_getBetViewInfo.ways[0].options[1].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 3 - left;
            let offsetY = 118 - top;
            this.getters_getBetViewInfo.ways[0].options[1].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('单')) {
            this.getters_getBetViewInfo.ways[0].options[2].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 2 - left;
            let offsetY = 190 - top;
            this.getters_getBetViewInfo.ways[0].options[2].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('双')) {
            this.getters_getBetViewInfo.ways[0].options[3].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 2 - left;
            let offsetY = 118 - top;
            this.getters_getBetViewInfo.ways[0].options[3].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('豹子_1')) {
            this.getters_getBetViewInfo.ways[4].options[0].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 1 - left;
            let offsetY = 190 - top;
            this.getters_getBetViewInfo.ways[4].options[0].chouMa.push({
              money: Number(result.msg.ct.totalmoney),
              top: `${top}px`,
              left: `${left}px`,
              offsetX: `${offsetX}px`,
              offsetY: `${offsetY}px`,
              isSound: this.lotterySound,
            })
          } else if (way.includes('豹子_6')) {
            this.getters_getBetViewInfo.ways[4].options[5].betall += Number(result.msg.ct.totalmoney);
            let top = Math.random() * 16 + 10;
            let left = Math.random() * 90;
            let offsetX = 110 * 1 - left;
            let offsetY = 118 - top;
            this.getters_getBetViewInfo.ways[4].options[5].chouMa.push({
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
      // console.log(result);
      this.betObj = {};
      this.is_oldOpenAward = result.msg.result;
      // this.getters_getBetViewInfo.lastResult.open_result = result.msg.result;
      // this.openAwardData = result;
      this.getters_getBetViewInfo.ways[0].options[0].betall = 0;
      this.getters_getBetViewInfo.ways[0].options[1].betall = 0;
      this.getters_getBetViewInfo.ways[0].options[2].betall = 0;
      this.getters_getBetViewInfo.ways[0].options[3].betall = 0;
      this.getters_getBetViewInfo.ways[4].options[0].betall = 0;
      this.getters_getBetViewInfo.ways[4].options[5].betall = 0;

      this.getters_getBetViewInfo.ways[0].options[0].betmine = 0;
      this.getters_getBetViewInfo.ways[0].options[1].betmine = 0;
      this.getters_getBetViewInfo.ways[0].options[2].betmine = 0;
      this.getters_getBetViewInfo.ways[0].options[3].betmine = 0;
      this.getters_getBetViewInfo.ways[4].options[0].betmine = 0;
      this.getters_getBetViewInfo.ways[4].options[5].betmine = 0;

      this.getters_getBetViewInfo.ways[0].options[0].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[1].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[2].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[3].chouMa = [];
      this.getters_getBetViewInfo.ways[4].options[0].chouMa = [];
      this.getters_getBetViewInfo.ways[4].options[5].chouMa = [];

      // 倒计时相关;
      this.countdownTime = 179;
      this.isShowTime_common = true;

      this.startBetBoolean = false;

      // 期数;
      this.currentIssue = result.msg.issue + 1;

      // 移除盖子
      this.isHaveGaizi = false;
      this.delayFn(() => { this.isShowTouZiResult = true; this.openAwardData = result; this.getters_getBetViewInfo.lastResult.open_result = result.msg.result; this.getters_getBetViewInfo.lastResult.winWays = result.msg.winWays }, 5000)
      this.delayFn(() => { this.isHaveGaizi = true; this.isShowTouZiResult = false; this.changeTimeBoolean = true; }, 9000)
      // 间隔保持4000ms既可
    },
    handler_user (result) {
      // console.log(result);
      // console.log(this.UID);
      let { way, uid } = result.msg;
      if (way.includes('大')) {
        this.getters_getBetViewInfo.ways[0].options[0].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[0].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 3 - left;
        let offsetY = 190 - top;
        this.getters_getBetViewInfo.ways[0].options[0].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('小')) {
        this.getters_getBetViewInfo.ways[0].options[1].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[1].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 3 - left;
        let offsetY = 118 - top;
        this.getters_getBetViewInfo.ways[0].options[1].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('单')) {
        this.getters_getBetViewInfo.ways[0].options[2].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[2].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 2 - left;
        let offsetY = 190 - top;
        this.getters_getBetViewInfo.ways[0].options[2].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('双')) {
        this.getters_getBetViewInfo.ways[0].options[3].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[0].options[3].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 2 - left;
        let offsetY = 118 - top;
        this.getters_getBetViewInfo.ways[0].options[3].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('豹子_1')) {
        this.getters_getBetViewInfo.ways[4].options[0].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[4].options[0].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 1 - left;
        let offsetY = 190 - top;
        this.getters_getBetViewInfo.ways[4].options[0].chouMa.push({
          money: Number(result.msg.ct.totalmoney),
          top: `${top}px`,
          left: `${left}px`,
          offsetX: `${offsetX}px`,
          offsetY: `${offsetY}px`,
          isSound: this.lotterySound,
        })
      } else if (way.includes('豹子_6')) {
        this.getters_getBetViewInfo.ways[4].options[5].betall += Number(result.msg.ct.totalmoney);
        if (uid == this.UID) {
          this.getters_getBetViewInfo.ways[4].options[5].betmine += Number(result.msg.ct.totalmoney);
        }
        let top = Math.random() * 16 + 10;
        let left = Math.random() * 90;
        let offsetX = 110 * 1 - left;
        let offsetY = 118 - top;
        this.getters_getBetViewInfo.ways[4].options[5].chouMa.push({
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
      this.getters_getBetViewInfo.ways[0].options[0].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[1].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[2].chouMa = [];
      this.getters_getBetViewInfo.ways[0].options[3].chouMa = [];
      this.getters_getBetViewInfo.ways[4].options[0].chouMa = [];
      this.getters_getBetViewInfo.ways[4].options[5].chouMa = [];

      if (this.getters_getBetViewInfo.ways[0].options[0].betall != 0) {
        this.getters_getBetViewInfo.ways[0].options[0].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[0].options[0].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
      if (this.getters_getBetViewInfo.ways[0].options[1].betall != 0) {
        this.getters_getBetViewInfo.ways[0].options[1].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[0].options[1].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
      if (this.getters_getBetViewInfo.ways[0].options[2].betall != 0) {
        this.getters_getBetViewInfo.ways[0].options[2].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[0].options[2].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
      if (this.getters_getBetViewInfo.ways[0].options[3].betall != 0) {
        this.getters_getBetViewInfo.ways[0].options[3].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[0].options[3].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
      if (this.getters_getBetViewInfo.ways[4].options[0].betall != 0) {
        this.getters_getBetViewInfo.ways[4].options[0].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[4].options[0].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
      if (this.getters_getBetViewInfo.ways[4].options[5].betall != 0) {
        this.getters_getBetViewInfo.ways[4].options[5].chouMa.push({
          money: Number(this.getters_getBetViewInfo.ways[4].options[5].betall),
          top: `${Math.random() * 16 + 10}px`,
          left: `${Math.random() * 90}px`,
        });
      }
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
      let arr = [[], []];
      this.getters_getBetViewInfo.ways[0].options[0].optionName = this.getters_getBetViewInfo.ways[0].name;
      this.getters_getBetViewInfo.ways[0].options[1].optionName = this.getters_getBetViewInfo.ways[0].name;
      this.getters_getBetViewInfo.ways[0].options[2].optionName = this.getters_getBetViewInfo.ways[0].name;
      this.getters_getBetViewInfo.ways[0].options[3].optionName = this.getters_getBetViewInfo.ways[0].name;
      this.getters_getBetViewInfo.ways[4].options[0].optionName = this.getters_getBetViewInfo.ways[4].name;
      this.getters_getBetViewInfo.ways[4].options[5].optionName = this.getters_getBetViewInfo.ways[4].name;

      arr[0].push(this.getters_getBetViewInfo.ways[0].options[0]);
      arr[0].push(this.getters_getBetViewInfo.ways[0].options[2]);
      arr[0].push(this.getters_getBetViewInfo.ways[4].options[0]);
      arr[1].push(this.getters_getBetViewInfo.ways[0].options[1]);
      arr[1].push(this.getters_getBetViewInfo.ways[0].options[3]);
      arr[1].push(this.getters_getBetViewInfo.ways[4].options[5]);

      return arr;
    }
  },
}
</script>
<style lang='scss'>
.lottery27 {
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
  .gameTimeCopy::before {
    content: "";
    width: 36px;
    height: 36px;
    position: absolute;
    top: -10px;
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