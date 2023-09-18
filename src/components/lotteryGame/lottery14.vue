<template>
  <div class='lottery14 absolute top bottom left right flex flex-col'>
    <!-- 一分赛车 -->
    <!-- 历史开奖 -->
    <van-popup v-model="isHistory"
               position="right"
               :overlay="false"
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
                  <div class="w-190 h-24 relative cl-white">
                    <result14 :result="v.open_result"></result14>
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
                  id="iframe14"></iframe>
        </div>
      </div>
    </van-popup>
    <!-- 投注记录 -->
    <lotteryBetHistory :isBetHistory="isBetHistory"
                       v-if="isBetHistory"
                       @changeIsBetHistory="isBetHistory=false"></lotteryBetHistory>
    <!--  -->
    <oldVersionBet :result="is_oldOpenAward"
                   :showBackNew="false"
                   :countdownTime="countdownTime_common_midVar"
                   :currentIssue="currentIssue"
                   @betAssistant_oldVersion="betAssistant_oldVersion"
                   @old_isPlayInstruction="old_isPlayInstruction"
                   @old_isBetHistory="old_isBetHistory"
                   @old_isHistory="old_isHistory"></oldVersionBet>

    <div v-show="false">
      <van-count-down :time="countdownTime*1000"
                      @change="lottery14_isTime_fn">
      </van-count-down>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import lotteryBetHistory from "./lotteryBetHistory";
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';
import oldVersionBet from "./oldVersionBet.vue";
import { result14 } from "./exhibitResult/index.js";

export default {
  name: 'lottery14',
  components: { lotteryBetHistory, oldVersionBet, result14 },
  props: ['mSocket', 'deliveryTime', 'MOREGAMEDATA_OPEN', 'MOREGAMEDATA_USER'],
  data () {
    return {
      getters_getLiveBetRank: '',
      isHistory: false,
      isHistoryParams: {
        page: 0,
      },
      isHistory_list: [],
      zwfImg: require("@/assets/images/zwf.png"),
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
      is_oldOpenAward: '',
    };
  },
  watch: {
    // openAwardData: {
    //   handler (newValue, oldValue) {
    //     let _this = this;
    //     if (!!newValue) {
    //       this.delayFn(() => {
    //         _this.openAwardData = '';
    //       }, 4000)
    //     }
    //   },
    //   deep: true,  // 深度监听
    // },
    MOREGAMEDATA_OPEN: {
      handler (newValue, oldValue) {
        this.handler_open(newValue);
      },
      depp: true
    },
  },
  created () {
    this.init();
    // this.initSocket();
    // 赋值倒计时
    this.countdownTime_common_midVar = this.deliveryTime;
    this.countdownTime = this.deliveryTime;
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
    old_isPlayInstruction () { this.isPlayInstruction = true; },
    old_isBetHistory () { this.isBetHistory = true; },
    old_isHistory () { this.isHistory = true; },
    HowToPlay () {
      let HOST = this.HOST;
      let obj = { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
      this.HowToPlay_address = `${HOST}/index.php?g=Appapi&m=LotteryArticle&a=index&l=${obj[this.LANG]}&lotteryType=${this.MOREGAMETYPE}&uid=${this.UID}&token=${this.TOKEN}`
    },
    lottery14_isTime_fn (timeData) {
      this.countdownTime_common_midVar = timeData.seconds;
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.isShowTime_common = false;
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
    initSocket () {
      const StreamMsg = protoRoot.lookup('common.StreamMsg');
      let event = this.WSEVENT['SOCKET_BROADCAST']
      this.mSocket.on(event, (rawResponse) => {
        let StreamMsg_buf = protobuf.util.newBuffer(rawResponse)
        let { msgID, msgData } = StreamMsg.decode(StreamMsg_buf);
        let msg_buf = protobuf.util.newBuffer(msgData);
        let msg_id = protoRoot.lookup(`s2c.${this.MSGID[msgID]}`);
        let result = msg_id.decode(msg_buf);

        if (msgID == 9 && result.msg.lotteryType == this.getters_getEnterRoom.roomLotteryInfo.lotteryType) {
          this.is_oldOpenAward = result.msg.result;
          // 倒计时相关;
          this.countdownTime = 59;
          this.countdownTime_common_midVar = 59;
          this.isShowTime_common = true;
          // 期数;
          this.currentIssue = result.msg.issue + 1;
        }
      })
    },
    handler_open (result) {
      this.is_oldOpenAward = result.msg.result;
      // 倒计时相关;
      this.countdownTime = 59;
      this.countdownTime_common_midVar = 59;
      this.isShowTime_common = true;
      // 期数;
      this.currentIssue = result.msg.issue + 1;
    },
    init () {
      this.isHistoryParams.lottery_type = this.MOREGAMETYPE;
    }
  },
  computed: {
    ...mapGetters(['UID', 'TOKEN', 'HOST', 'LANG', 'ANCHOR', 'getters_getBetViewInfo', 'WSEVENT', 'getters_getEnterRoom', 'MSGID', 'getters_betAmountValue', 'lotterySound', 'getters_publicTime', 'MOREGAME', 'MOREGAMETYPE']),
  },
}
</script>
<style lang='scss'>
.lottery14 {
}
</style>