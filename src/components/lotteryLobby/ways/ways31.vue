<template>
  <div class='ways31 fz-12 cl-white absolute top bottom left right'>
    <div class="flex flex-wrap px-2 box-border">
      <div v-for="(v, k) in list"
           class="p-all-2 box-border relative"
           :class="[`order-${k}`, arr31.includes(k) ?'w-Equally-4 h-90': 'w-Equally-3 h-120']"
           :key="k + 'ways31'">
        <div class="bg-mask-white w-full h-full flex flex-col items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="fz-14 bolder">{{v.st}}</div>
          <div class="absolute"
               :class="[arr31.includes(k)?'bottom-10': 'bottom-16']">x{{v.value}}</div>
          <div v-if="chouMaAmount[v.title] && chouMaAmount[v.title] != 0"
               class="w-inherit h-inherit absolute top left flex items-start justify-end z-index-8">
            <!-- 玩家投注气泡 -->
            <div class="w-80 h-20 absolute top-16 right-2-">
              <div class="msg-1">{{chouMaAmount[v.title]}}</div>
            </div>
          </div>
          <!-- 筹码层 -->
          <div class="w-inherit h-inherit absolute top left right bottom pointerEvents flex items-center justify-center">
            <div v-chouMaBg
                 v-if="userChouMa[v.title] > 0"
                 class="w-20 h-20">
              <div class="text-center line-20 fz-8 cl-white">
                {{userChouMa[v.title]}}
              </div>
            </div>
          </div>
        </div>
        <!-- 投注确认 -->
        <div class="w-48 h-32 absolute z-index-20"
             v-if="betObj[v.title]"
             style="top:50%;left:50%; margin-left:-24px; margin-top:-16px;">
          <div class="h-16 w-48 flex">
            <div class="flex-1  betQr-2"
                 @click="emptyBetObj"></div>
            <div class="w-8"></div>
            <div class="flex-1  betQr-3"
                 @click="confirmBet(v)"></div>
          </div>
          <div class="h-16 line-12 w-48 text-center betQr-1"
               @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ways31',
  components: {},
  props: ['ways', 'lotteryType', 'currentIssue', 'openAwardData', 'chouMaAmount', 'userChouMa'],
  data () {
    return {
      list: '',
      arr31: [1, 2, 3, 4],
      winWays: '',
      betObj: {},
      eventPosition: ''
    };
  },
  watch: {
    openAwardData (v) {
      if (v) { this.winWays = v.msg.winWays; this.betObj = {} } else { this.winWays = ''; }
    }
  },
  created () {
    this.list = this.ways[0].options;
  },
  beforeMount () { },
  mounted () { },
  methods: {
    continuousClick (v, event) {
      this.eventPosition = event;
      let amount;
      if (!this.betObj[v.title]) { this.betObj = {}; amount = 0; } else { amount = this.betObj[v.title] }
      amount += Number(this.getters_betAmountValue);
      Vue.set(this.betObj, v.title, amount);
    },
    emptyBetObj () {
      this.betObj = {};
    },
    confirmBet (v) {
      this.$emit("betAssistant", {
        obj: { title: v.title, index: 0 },
        e: this.eventPosition,
        params: {
          lottery_type: this.lotteryType,
          money: `[${this.betObj[v.title]}]`,
          way: `["${v.title}"]`,
          serTime: parseInt(new Date().getTime() / 1000),
          issue: this.currentIssue,
          optionName: this.ways[0].name,
          liveuid: 0,
          amount: this.betObj[v.title]
        }
      })
      this.betObj = {};
    }
  },
  computed: {
    ...mapGetters(['getters_betAmountValue'])
  }
}
</script>
<style lang='scss' scoped>
.ways31 {
  .order-0 {
    order: 1;
  }
  .order-1 {
    order: 4;
  }
  .order-2 {
    order: 5;
  }
  .order-3 {
    order: 6;
  }
  .order-4 {
    order: 7;
  }
  .order-5 {
    order: 3;
  }
  .order-6 {
    order: 2;
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
    // background: inherit;
    /*自动继承父元素的背景*/
    transform: rotate(45deg);
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