<template>
  <div class='lobby26 top bottom left right absolute flex flex-col'>
    <div class="w-full h-140 flex cl-white">
      <div class="w-32 flex flex-col">
        <div class="flex-1 flex items-center justify-center">
          <van-icon name="close"
                    @click="toBack()"
                    size='20' />
        </div>
        <div class="flex-1 flex items-center justify-center">
          <div class="w-16 box-border h-16 rounded flex items-center justify-center"
               @click="game_showShare = true"
               style="border: 1px solid #fff;">
            <van-icon name="exchange"
                      size="12" />
          </div>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <van-icon name="music-o"
                    size="20" />
        </div>
        <div class="h-12">

        </div>
      </div>
      <div class="flex-1 box-border pt-8">
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
            <div class="flex px-20 rounded-4 relative"
                 v-if="isShowTime_common">
              <div class="flex betStatusBar justify-center"
                   v-show="startBetBoolean">
                <div class="h-20 line-20 cl-F2CF40 fz-16">
                  {{langSwitch('开始投注')}}
                </div>
                <div class="h-20 line-20 ml-12 relative gameTime">
                  <van-count-down :time="countdownTime*1000"
                                  @change="lottery26_isTime_fn">
                    <template #default="timeData">
                      <span class="fz-14 cl-F2CF40">{{ timeData.seconds > 9 ? timeData.seconds: '0' + timeData.seconds }}</span>
                    </template>
                  </van-count-down>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-82 w-full flex flex-col">
          <div class="h-40 w-full"></div>
          <div class="h-40 w-full relative">
            <scrollDiv :liveMsgTop="liveMsgTop"
                       @clearLiveMsgTop="clearLiveMsgTop"></scrollDiv>
          </div>
        </div>
      </div>
      <div class="w-32 flex flex-col">
        <div class="flex-1">
          <!-- history -->
          <div class="absolute right-4 top-4 h-36 w-64 box-border rounded-4"
               @click="isHistory = true;">
            <div class="w-full h-full relative">
              <img src="~@/assets/images/game_historys.png"
                   class="w-full h-full"
                   alt="">
              <div class="h-20 w-full absolute bottom left relative cl-white rounded-4"
                   v-if="getters_getHomeBetViewInfo.lotteryType == 26">
                <result26 :result="getters_getHomeBetViewInfo.lastResult.open_result"></result26>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <van-icon name="question-o"
                    @click="isPlayInstruction = true"
                    size="20" />
        </div>
        <div class="flex-1 flex items-center justify-center">
          <van-icon name="todo-list-o"
                    @click="isBetHistory = true"
                    size="20" />
        </div>
        <div class="h-12"></div>
      </div>
    </div>
    <div class="w-full h-97 mb-3 relative">
      <div class="absolute top bottom left right flex">
        <div class="w-20 flex flex-col lobbySelect relative">
          <div class="h-32 flex items-center justify-center"
               @click="zstBool = !zstBool">
          </div>
          <div class="flex-1 flex items-center justify-center fz-12">
            <div class="w-12 cl-white">{{langSwitch('走势图')}}</div>
          </div>
          <div class="absolute w-36 h-97 bg-mask-white6 top left-20 fz-10 z-index-2"
               v-if="zstBool">
            <div class="h-20 line-20 text-center box-border"
                 @click="changeZstFn(0)"
                 style="border-bottom: 1px solid #D3D3D3">{{langSwitch('大小')}}</div>
            <div class="h-20 line-20 text-center box-border"
                 @click="changeZstFn(1)"
                 style="border-bottom: 1px solid #D3D3D3">{{langSwitch('单双')}}</div>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute top bottom left right scroll-x bg-white"
               ref="scrollElement">
            <div class="h-96 relative w-fit">
              <div class="h-96 w-fit flex">
                <div class="h-96 flex flex-col w-16"
                     v-for="(v, k) in numberVar"
                     :key="k + 'numberVar'">
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                  <div class="h-16 box-border van-hairline--bottom van-hairline--right"></div>
                </div>
              </div>
              <!-- <table>
                <tr v-for="(v, k) in 6"
                    :key="k+'tr'">
                  <td v-for="(v1, k1) in numberVar"
                      :key="k1 + 'td_' + k">
                  </td>
                </tr>
              </table> -->

              <!-- 绘制图案 -->
              <graphics26 :list="zstList"
                          :openAwardData="openAwardData"
                          v-if="zstList.length !=0"
                          :selectIndex="selectIndex"
                          @changeNumberVar="changeNumberVar"
                          class="h-96 w-fit absolute top left"></graphics26>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 relative">
      <ways26 :ways="ways"
              @betAssistant="betAssistant"
              :currentIssue="currentIssue"
              :openAwardData="openAwardData"
              :chouMaAmount="chouMaAmount"
              :userChouMa="userChouMa"
              lotteryType="26"></ways26>
    </div>
    <div class="h-50 w-full px-8 box-border van-hairline--top relative">
      <chips></chips>
    </div>

    <!-- 游戏 -->
    <van-popup v-model="game_showShare"
               position="bottom"
               :style="{ height: '40%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;">
      <div class="w-full bg-white h-fit pl-8 pr-8 pb-18 box-border flex flex-col"
           style="background:transparent !important;">
        <div class="flex-1 w-full bg-white mb-10 rounded-4">
          <div class="py-8 box-border">
            <div class="inline-block h-70 w-Equally-4 flex flex-col"
                 v-for="(v, k) in getters_getConfig.ad_list.filter((v)=>v.type == 'game')"
                 @click="changeLobby(v)"
                 :key="k + 'play_gameRecommendation_AA'">
              <div class="h-48 w-full flex justify-center items-center">
                <img :src="v.src"
                     class="h-40 w-40 rounded">
              </div>
              <div class="h-22 w-full fz-12 line-22 text-center cl-a8a8a8">{{v.desc}}</div>
            </div>
          </div>
        </div>
        <div class="h-36 line-36 fz-14 rounded-4 text-center w-full bg-white"
             @click="game_showShare = false">{{langSwitch('取消')}}</div>
      </div>
    </van-popup>

    <!-- 历史开奖 -->
    <van-popup v-model="isHistory"
               position="right"
               :style="{ height: '100%',width: '100%', }"
               style="background:transparent !important;">
      <div class="h-250 w-full bg-black absolute bottom cl-white">
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
                    <result26 :result="v.open_result"></result26>
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
      <div class="w-full h-600 bg-white absolute bottom left right scroll-hide">
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
                  class="w-full h-full iframe"></iframe>
        </div>
      </div>
    </van-popup>

    <!-- 投注记录 -->
    <lotteryBetHistory :isBetHistory="isBetHistory"
                       v-if="isBetHistory"
                       @changeIsBetHistory="isBetHistory=false"></lotteryBetHistory>

    <!-- 开奖弹框 -->
    <div class="w-full h-140 absolute top left"
         v-if="!!openAwardData">
      <div class="w-160 h-50 box-border absolute rounded-4 flex flex-col px-10 z-index-20"
           style="border: 2px solid yellow; background: rgba(0,0,0,0.5); top: 50%; left: 50%; margin-left: -80px; margin-top:0px;">
        <div class="h-20 w-full fz-18 cl-red line-20 flex justify-center">
          <div>
            {{ languageObj[LANG][getters_getHomeBetViewInfo.lastResult.winWays[13].split('_')[1]] }}
            {{ languageObj[LANG][getters_getHomeBetViewInfo.lastResult.winWays[14].split('_')[1]] }}
            <!-- {{(getters_getHomeBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))) >9 ? langSwitch('大'): langSwitch('小')}} -->
            <!-- {{(getters_getHomeBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))) % 2 != 1 ? langSwitch('双'): langSwitch('单')}} -->
          </div>
        </div>
        <div class="h-30 w-full flex">
          <div class="w-90 relative cl-white">
            <result26 :result="getters_getHomeBetViewInfo.lastResult.open_result"></result26>
          </div>
          <div class="flex-1 text-center line-30 cl-white fz-18">
            {{getters_getHomeBetViewInfo.lastResult.open_result.split(',').reduce((a, b)=> Number(a) + Number(b))}}
          </div>
        </div>
        <!-- 开奖声音 -->
        <audio autoplay
               hidden
               src="~@/assets/music/openAward.mp3"></audio>
      </div>
    </div>

    <!-- 即将开始 -->
    <div class="w-full h-20 box-border absolute flex z-index-20 items-center justify-center top-60"
         v-if="changeTimeBoolean">
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

    <!-- 筹码层 -->
    <div class=" absolute top bottom left right pointerEvents">
      <div v-for="(v, k) in chouMa"
           v-chouMaBg
           :key="k+'chouMa'"
           class="w-20 h-20 absolute bg-red rounded_class_lobby pointerEvents"
           :style="{'top':(v.clientY-10) + 'px', 'left': (v.clientX-10) + 'px','--bgTop': v.offsetY +'px','--bgLeft': v.offsetX +'px',}">
        <div class="text-center line-20 fz-8 cl-white">
          {{v.money}}
        </div>
        <audio autoplay
               hidden
               v-if="v.isSound"
               src="~@/assets/music/bet.mp3"></audio>
      </div>
    </div>

    <!-- 中奖提示 -->
    <van-popup v-model="openAwardBoolean"
               @click="openAwardBoolean = false"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center z-index-22"
               style="background:transparent !important;"
               round>
      <div>
        <div class="w-fit h-fit relative">
          <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_lottery_reward.png`)"
               class="w-280 h-240">
          <div class="absolute bottom-48 h-20 line-20 w-280 text-center cl-gold fz-12">
            {{langSwitch('中奖')}} {{openAwardAmount.toFixed(2)}} {{langSwitch('钻石')}}
          </div>
          <div class="absolute bottom-96- h-20 line-20 w-280 text-center cl-white fz-12 flex items-center justify-center">
            <div class="flex">
              <div>
                {{langSwitch('点击任意处关闭')}}
              </div>
              <div>
                <van-count-down :time="openAwardTime*1000"
                                @change="openAwardTime_fn">
                  <template #default="timeData">
                    <span class="fz-12 cl-white line-20">&nbsp;{{ timeData.seconds}}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 背景音乐 -->
    <audio autoplay
           hidden
           :src="getters_getHomeBetViewInfo.music"></audio>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import lotteryBetHistory from "@/components/lotteryGame/lotteryBetHistory";
import chips from "@/components/lotteryGame/widget/chips";
import scrollDiv from "@/components/lotteryGame/widget/scrollDiv";
import result26 from "@/components/lotteryGame/exhibitResult/result26";
import { ways26 } from "./ways";
import { graphics26 } from "./graphics";
import { Toast } from 'vant';
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';

export default {
  name: 'lobby26',
  components: { lotteryBetHistory, chips, ways26, result26, graphics26, scrollDiv },
  props: ['mSocket', 'deliveryTime', 'client_Width', 'client_Height'],
  data () {
    return {
      game_showShare: false,
      isPlayInstruction: false,
      HowToPlay_address: '',
      isBetHistory: false,
      ways: '',
      isHistory: false,
      isHistoryParams: {
        page: 0,
        lottery_type: 26
      },
      isHistory_list: [],
      refreshing: false,
      loading: false,
      finished: false,
      currentIssue: '',
      zstBool: false,
      zstList: [],
      selectIndex: 0,
      // 动画开奖
      openAwardData: '',
      countdownTime: '',
      isShowTouZiResult: false,
      isHaveGaizi: true,
      isShowTime_common: true,
      // 滚动集合
      liveMsgTop: [],
      // numberVar
      numberVar: 30,
      // 筹码集合
      chouMa: [],
      chouMaAmount: {},
      // 中奖相关
      openAwardAmount: 0,
      openAwardBoolean: false,
      openAwardTime: 5,
      startBetBoolean: true,
      changeTimeBoolean: false,
      userChouMa: {},
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
  },
  created () {
    // console.log(this.getters_getHomeBetViewInfo)
    this.HowToPlay();
    this.ways = this.getters_getHomeBetViewInfo.ways;
    this.currentIssue = this.getters_getHomeBetViewInfo.issue;
    this.init_zstList();

    // 初始化
    this.initSocket();
    this.countdownTime = this.deliveryTime;
    this.initChouMa()
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getOpenHistory', 'actions_getHomeBetViewInfo', 'actions_rootStore', 'actions_getBetting', 'actions_getBalanceNew']),
    HowToPlay () {
      let HOST = this.HOST;
      let obj = { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
      this.HowToPlay_address = `${HOST}/index.php?g=Appapi&m=LotteryArticle&a=index&l=${obj[this.LANG]}&lotteryType=${this.getters_getHomeBetViewInfo.lotteryType}&uid=${this.UID}&token=${this.TOKEN}`
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
    changeLobby (val) {
      // console.log(val)
      let lottery_type = val.kindID;
      if (lottery_type == this.getters_getHomeBetViewInfo.lotteryType) {
        this.game_showShare = false;
        Toast(this.langSwitch('无需切换游戏大厅'));
        return;
      }
      this.actions_rootStore({ key: 'lobbyLottery', val: lottery_type })
      this.toRouter('lobbyEmpty');
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
        let currentLotteryType = this.isHistoryParams.lottery_type;

        // 彩票开奖信息
        if (msgID == 9 && result.msg.lotteryType == currentLotteryType) {
          // console.log(result);
          // 倒计时相关;
          this.chouMa = [];
          this.chouMaAmount = {};
          this.userChouMa = {};
          this.countdownTime = 59;
          this.isShowTime_common = true;

          this.startBetBoolean = false;

          // 期数;
          this.currentIssue = result.msg.issue + 1;

          // 移除盖子
          this.isHaveGaizi = false;
          this.delayFn(() => { this.isShowTouZiResult = true; this.openAwardData = result; this.getters_getHomeBetViewInfo.lastResult.open_result = result.msg.result; this.getters_getHomeBetViewInfo.lastResult.winWays = result.msg.winWays }, 5000)
          this.delayFn(() => { this.isHaveGaizi = true; this.isShowTouZiResult = false; this.changeTimeBoolean = true; }, 9000)
        }
        // 消息滚动
        if (msgID == 15) { this.liveMsgTop = result.msg.barrageArr; }

        // 中奖
        if (msgID == 16) {
          this.delayFn(() => {
            this.openAwardAmount = result.msg.awardMoney;
            this.openAwardTime = 5;
            this.openAwardBoolean = true;
            this.actions_getBalanceNew();
          }, 3000)
        }
      })
    },
    // 下注相关
    betAssistant (params) {
      this.actions_getBetting(params.params).then((res) => {
        if (res.code == 0) {
          this.actions_getBalanceNew();
          this.betAssistant_callback(params);
        } else {
          Toast(res.msg);
        }
      })
    },
    betAssistant_callback (params) {
      let event = params.e;
      let { clientX, clientY } = event;
      let offsetX = (this.client_Width / 2) - clientX;
      let offsetY = (this.client_Height) - clientY;
      let money = params.params.amount
      this.chouMa.push({ clientX, clientY, offsetX, offsetY, money, isSound: this.lotterySound, });

      // 筹码金额
      let obj = params.obj;
      let { index, title } = obj;
      let amount = this.chouMaAmount[title] || 0;
      amount += Number(money);
      Vue.set(this.chouMaAmount, title, amount);
    },
    init_zstList () {
      let params = { page: 0, lottery_type: 26 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) { this.zstList = res.info.list; }
      })
    },
    changeZstFn (i) {
      this.selectIndex = i;
      this.zstBool = false;
    },
    showTouZiResultFn (index) {
      return require(`@/assets/images/lotteryBg/shaizi_result_${this.openAwardData.msg.result.split(',')[index]}.png`)
    },
    lottery26_isTime_fn (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.isShowTime_common = false;
      }
    },
    changeTimeFn (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.startBetBoolean = true;
        this.changeTimeBoolean = false;
      }
    },
    openAwardTime_fn (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.openAwardBoolean = false;
      }
    },
    clearLiveMsgTop () {
      this.liveMsgTop = [];
    },
    changeNumberVar (params) { this.numberVar++; this.$refs.scrollElement.scrollLeft = params - 16 },
    initChouMa () {
      // console.log(this.getters_getHomeBetViewInfo);
      // 获取当前用户投注金额
      this.getters_getHomeBetViewInfo.ways[0].options.forEach(element => {
        if (element.betmine > 0) {
          Vue.set(this.chouMaAmount, element.title, element.betmine);
        }
        if (element.betall > 0) {
          Vue.set(this.userChouMa, element.title, element.betmine);
        }
      });
      this.getters_getHomeBetViewInfo.ways[4].options.forEach(element => {
        if (element.betmine > 0) {
          Vue.set(this.chouMaAmount, element.title, element.betmine);
        }
        if (element.betall > 0) {
          Vue.set(this.userChouMa, element.title, element.betmine);
        }
      });
      this.getters_getHomeBetViewInfo.ways[3].options.forEach(element => {
        if (element.betmine > 0) {
          Vue.set(this.chouMaAmount, element.title, element.betmine);
        }
        if (element.betall > 0) {
          Vue.set(this.userChouMa, element.title, element.betmine);
        }
      });
      this.getters_getHomeBetViewInfo.ways[5].options.forEach(element => {
        if (element.betmine > 0) {
          Vue.set(this.chouMaAmount, element.title, element.betmine);
        }
        if (element.betall > 0) {
          Vue.set(this.userChouMa, element.title, element.betmine);
        }
      });
    }
  },
  computed: {
    ...mapGetters(['getters_getConfig', 'UID', 'TOKEN', 'HOST', 'LANG', 'getters_getHomeBetViewInfo', 'WSEVENT', 'MSGID', 'getters_betAmountValue', 'lotterySound'])
  }
}
</script>
<style lang='scss'>
.lobby26 {
  .van-dropdown-menu {
    .van-dropdown-menu__bar {
      height: 36px !important;
      .van-dropdown-menu__item {
        height: 36px !important;
      }
    }
  }
  table {
    border-collapse: collapse;
    tr {
      td {
        width: 16px !important;
        height: 16px !important;
        border: 1px solid black;
        box-sizing: border-box;
        // position: relative;
        // &::after {
        //   content: "";
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   height: 1px;
        //   width: 100%;
        //   transform: scaleY(0.5);
        //   transform-origin: 0 0;
        //   background-color: #000;
        // }
      }
    }
  }

  .lobbySelect::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/lobby_select.jpg");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }

  .rounded_class_lobby {
    animation: move 0.4s alternate linear;
  }

  @keyframes move {
    0% {
      transform: translate(var(--bgLeft), var(--bgTop));
    }
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
}
</style>