<template>
  <div class='lobby30 top bottom left right absolute flex flex-col'>
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
        <div class="h-12"></div>
      </div>
      <div class="flex-1 box-border pt-8">
        <div class="h-60 w-full relative flex justify-center items-center">
          <div>
            <div class="h-60 w-60 relative"
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
          <div class="absolute flex z-index-50 px-20 rounded-4"
               v-if="isShowTime_common">
            <div class="flex betStatusBar justify-center"
                 v-show="startBetBoolean">
              <div class="h-20 line-20 fz-16 cl-F2CF40">
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
        </div>
        <div class="h-72 w-full flex flex-col">
          <div class="h-30 w-full"></div>
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
              <div class="h-20 flex items-center justify-center w-full absolute bottom left relative cl-white rounded-4">
                <div class="w-14 h-14 rounded line-14 text-center fz-10"
                     v-if="getters_getHomeBetViewInfo.lotteryType == 30"
                     :class="ballColor[getters_getHomeBetViewInfo.lastResult.open_result]['color']"> {{getters_getHomeBetViewInfo.lastResult.open_result}}</div>
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
        <div class="w-20 lobbySelect flex flex-col relative">
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
                 style="border-bottom: 1px solid #D3D3D3">{{langSwitch('红黑')}}</div>
            <div class="h-20 line-20 text-center box-border"
                 @click="changeZstFn(2)"
                 style="border-bottom: 1px solid #D3D3D3">{{langSwitch('区段')}}</div>
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
              <graphics30 :list="zstList"
                          v-if="zstList.length !=0"
                          :selectIndex="selectIndex"
                          :openAwardData="openAwardData"
                          @changeNumberVar="changeNumberVar"
                          class="h-96 w-fit absolute top left"></graphics30>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 relative">
      <ways30 :ways="ways"
              @betAssistant="betAssistant"
              :currentIssue="currentIssue"
              :openAwardData="openAwardData"
              :chouMaAmount="chouMaAmount"
              :userChouMa="userChouMa"
              lotteryType="30"></ways30>
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
      <div class="w-full h-600 bg-white absolute bottom left right scroll-hide">
        <div class="h-36 box-border van-hairline--bottom flex w-full">
          <div class="w-36 h-36 flex items-center justify-center"
               @click="isPlayInstruction = false">
            <van-icon size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 h-36 line-36 text-center fz-14">玩法说明</div>
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
import { ways30 } from "./ways";
import { graphics30 } from "./graphics";
import { Toast } from 'vant';
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';

export default {
  name: 'lobby30',
  components: { lotteryBetHistory, chips, ways30, graphics30, scrollDiv },
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
        lottery_type: 30
      },
      isHistory_list: [],
      refreshing: false,
      loading: false,
      finished: false,
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
      // 32,4,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3
      // 15,19,2,17,6,13,11,8,10,24,33,20,31,22,29,28,35,26
      currentIssue: '',
      zstBool: false,
      zstList: [],
      selectIndex: 0,
      // 动画开奖
      openAwardData: '',
      countdownTime: '',
      isShowTime_common: true,
      // 轮盘组合
      lunpan_arr: ['28', '12', '35', '3', '26', '0', '32', '15', '4', '19', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7'],
      lunpan_big_arr: ['0', '32', '15', '4', '19', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'],
      rotate_class: false,
      rotate_class_one: false,
      rotate_reverse_class: false,
      ballDeg: 0, // 小球偏移量
      bigDeg: 0, // 大图偏移量
      smallImg: require("@/assets/images/game_desk_zp_small.png"),
      bigImg: require("@/assets/images/game_desk_zp_big.png"),
      ballImg: require("@/assets/images/zp_ball.png"),
      sound_start: false,
      sound_end: false,
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
      userChouMa: {}
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
    this.HowToPlay();
    this.ways = this.getters_getHomeBetViewInfo.ways;
    this.currentIssue = this.getters_getHomeBetViewInfo.issue;
    this.init_zstList();
    // 初始化
    this.initSocket();
    this.countdownTime = this.deliveryTime;
    // 初始化小球位置
    this.initBall();
    this.initChouMa();
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
            this.getters_getHomeBetViewInfo.lastResult.open_result = msgRes;
            this.openAwardData = result;
            this.countdownTime = 55;

            this.sound_end = false;
          }, 4000)

          this.delayFn(() => {
            this.countdownTime = 54;
          }, 5000)

          this.delayFn(() => {
            this.rotate_class_one = false;
            this.isShowTime_common = true;
            this.changeTimeBoolean = true;
            this.countdownTime = 53;
          }, 6000)

          // this.openAwardData = result;

          // 期数;
          this.currentIssue = result.msg.issue + 1;
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
          }, 4000)
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
      this.chouMa.push({ clientX, clientY, offsetX, offsetY, money, isSound: this.lotterySound });

      // 筹码金额
      let obj = params.obj;
      let { index, title } = obj;
      let amount = this.chouMaAmount[title] || 0;
      amount += Number(money);
      Vue.set(this.chouMaAmount, title, amount);
    },
    init_zstList () {
      let params = { page: 0, lottery_type: 30 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) { this.zstList = res.info.list; }
      })
    },
    changeZstFn (i) {
      this.selectIndex = i;
      this.zstBool = false;
    },
    lottery30_isTime_fn (timeData) {
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
    initBall () {
      let openRes = this.getters_getHomeBetViewInfo.lastResult.open_result;
      let lunpan_index = this.lunpan_arr.indexOf(openRes);
      if (lunpan_index > -1) { this.ballDeg = (360 / 37) * lunpan_index - 2 }
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
    }
  },
  computed: {
    ...mapGetters(['getters_getConfig', 'UID', 'TOKEN', 'HOST', 'LANG', 'getters_getHomeBetViewInfo', 'WSEVENT', 'MSGID', 'getters_betAmountValue', 'lotterySound'])
  }
}
</script>
<style lang='scss'>
.lobby30 {
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