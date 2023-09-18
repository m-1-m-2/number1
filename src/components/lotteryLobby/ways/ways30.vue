<template>
  <div class='ways30 fz-12 cl-white absolute top bottom left right scroll-y'>
    <!-- list_a -->
    <div class="h-42 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_a"
           :class="[`order-${k}`]"
           :key="k +'list_a_30'">
        <div class="w-full h-full flex items-center justify-center rounded-8 relative"
             @click='continuousClick(v,$event)'
             :class="[optionColor[k],winWays.includes(v.title)?'flicker':'']">
          <div class="w-fit h-fit text-center">
            <div class="h-24 line-24 fz-14 bolder">{{v.st}}</div>
            <div class="h-14 line-12">x{{v.value}}</div>
          </div>
          <div v-if="chouMaAmount[v.title] && chouMaAmount[v.title] != 0"
               class="w-inherit h-inherit absolute top left flex items-start justify-end z-index-8">
            <!-- 玩家投注气泡 -->
            <div class="w-80 h-20 absolute top-10 right-6-">
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
    <!-- list_b -->
    <div class="h-42 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_b"
           :key="k +'list_b_30'">
        <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="w-fit h-fit text-center">
            <div class="h-24 line-24 fz-14 bolder">{{v.st}}</div>
            <div class="h-14 line-12">x{{v.value}}</div>
          </div>
          <div v-if="chouMaAmount[v.title] && chouMaAmount[v.title] != 0"
               class="w-inherit h-inherit absolute top left flex items-start justify-end z-index-8">
            <!-- 玩家投注气泡 -->
            <div class="w-80 h-20 absolute top-10 right-6-">
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
    <!-- list_c -->
    <div class="h-42 flex px-2 box-border flex-wrap">
      <div class="p-all-2 box-border relative"
           v-for="(v, k) in list_c"
           :class="[k==0?'w-full':'w-Equally-6']"
           :key="k +'list_c_30'">
        <div class="w-full h-full flex items-center justify-center rounded-8 relative"
             @click='continuousClick(v,$event)'
             :class="[ballColor[v.st]['color'],winWays.includes(v.title)?'flicker':'']">
          <div class="w-fit h-fit text-center">
            <div class="h-24 line-24 fz-14 bolder">{{v.st}}</div>
            <div class="h-14 line-12">x{{v.value}}</div>
          </div>
          <div v-if="chouMaAmount[v.title] && chouMaAmount[v.title] != 0"
               class="w-inherit h-inherit absolute top left flex items-start justify-end z-index-8">
            <!-- 玩家投注气泡 -->
            <div class="w-80 h-20 absolute top-10 right-6-">
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
  name: 'ways30',
  components: {},
  props: ['ways', 'lotteryType', 'currentIssue', 'openAwardData', 'chouMaAmount', 'userChouMa'],
  data () {
    return {
      list_a: '',
      list_b: '',
      list_c: '',
      optionColor: {
        '2': 'bg-mask-white',
        '3': 'bg-mask-white',
        '0': 'bg-DB1D32',
        '1': 'bg-black',
      },
      ballColor: {
        '0': { color: 'bg-54FF00' },
        '32': { color: 'bg-DB1D32' },
        '15': { color: 'bg-black' },
        '4': { color: 'bg-DB1D32' },
        '19': { color: 'bg-black' },
        '21': { color: 'bg-DB1D32' },
        '2': { color: 'bg-black' },
        '25': { color: 'bg-DB1D32' },
        '17': { color: 'bg-black' },
        '34': { color: 'bg-DB1D32' },
        '6': { color: 'bg-black' },
        '27': { color: 'bg-DB1D32' },
        '13': { color: 'bg-black' },
        '36': { color: 'bg-DB1D32' },
        '11': { color: 'bg-black' },
        '30': { color: 'bg-DB1D32' },
        '8': { color: 'bg-black' },
        '23': { color: 'bg-DB1D32' },
        '10': { color: 'bg-black' },
        '5': { color: 'bg-DB1D32' },
        '24': { color: 'bg-black' },
        '16': { color: 'bg-DB1D32' },
        '33': { color: 'bg-black' },
        '1': { color: 'bg-DB1D32' },
        '20': { color: 'bg-black' },
        '14': { color: 'bg-DB1D32' },
        '31': { color: 'bg-black' },
        '9': { color: 'bg-DB1D32' },
        '22': { color: 'bg-black' },
        '18': { color: 'bg-DB1D32' },
        '29': { color: 'bg-black' },
        '7': { color: 'bg-DB1D32' },
        '28': { color: 'bg-black' },
        '12': { color: 'bg-DB1D32' },
        '35': { color: 'bg-black' },
        '3': { color: 'bg-DB1D32' },
        '26': { color: 'bg-black' },
      },
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
    this.list_a = this.ways[0].options.slice(40);
    this.list_b = this.ways[0].options.slice(37, 40);
    this.list_c = this.ways[0].options.slice(0, 37);
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
.ways30 {
  .order-0 {
    order: 3;
  }
  .order-1 {
    order: 4;
  }
  .order-2 {
    order: 1;
  }
  .order-3 {
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