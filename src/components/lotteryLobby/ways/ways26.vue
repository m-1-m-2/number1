<template>
  <div class='ways26 fz-12 cl-white absolute top bottom left right scroll-y'>
    <!-- list_a -->
    <div class="h-48 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_a"
           :key="k +'list_a'">
        <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="w-fit h-fit text-center">
            <div class="h-24 line-24 fz-14 bolder">{{v.st}}</div>
            <div class="h-16">x{{v.value}}</div>
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
            <div class="flex-1 betQr-2"
                 @click="emptyBetObj"></div>
            <div class="w-8"></div>
            <div class="flex-1 betQr-3"
                 @click="confirmBet(v, 0)"></div>
          </div>
          <div class="h-16 line-12 w-48 text-center betQr-1"
               @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
        </div>
      </div>
    </div>
    <!-- list_b list_B-->
    <div class="h-80 flex px-2 box-border flex-col">
      <div class="h-40 flex">
        <div class="flex-1 p-all-2 box-border relative"
             v-for="(v, k) in list_b"
             :key="k +'list_b'">
          <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
               :class="[winWays.includes(v.title)?'flicker':'']"
               @click='continuousClick(v,$event)'>
            <div class="w-fit h-fit text-center">
              <div class="h-18 line-20 fz-14 bolder">{{v.st}}</div>
              <div class="h-12">x{{v.value}}</div>
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
                   @click="confirmBet(v, 0)"></div>
            </div>
            <div class="h-16 line-12 w-48 text-center betQr-1"
                 @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
          </div>
        </div>
      </div>
      <div class="h-40 flex">
        <div class="flex-1 p-all-2 box-border relative"
             v-for="(v, k) in list_B"
             :key="k +'list_B'">
          <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
               :class="[winWays.includes(v.title)?'flicker':'']"
               @click='continuousClick(v,$event)'>
            <div class="w-fit h-fit text-center">
              <div class="h-18 line-20 fz-14">{{v.st}}</div>
              <div class="h-12">x{{v.value}}</div>
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
                   @click="confirmBet(v, 0)"></div>
            </div>
            <div class="h-16 line-12 w-48 text-center betQr-1"
                 @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- list_c -->
    <div class="h-112 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_c"
           :class="[`order-${v.st}`]"
           :key="k+ 'list_c'">
        <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="w-fit h-fit text-center">
            <div class="h-90 flex items-center justify-center"
                 v-if="(v.st.indexOf('-') == -1)">
              <div>
                <div>
                  <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                       class="w-24 h-24 py-1"
                       alt="">
                </div>
                <div>
                  <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                       class="w-24 h-24 py-1"
                       alt="">
                </div>
                <div>
                  <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                       class="w-24 h-24 py-1"
                       alt="">
                </div>
              </div>
            </div>
            <div v-else
                 class="h-90 line-90">
              {{v.st}}
            </div>
            <div>x{{v.value}}</div>
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
                 @click="confirmBet(v, 4)"></div>
          </div>
          <div class="h-16 line-12 w-48 text-center betQr-1"
               @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
        </div>
      </div>
    </div>
    <!-- list_d -->
    <div class="h-82 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_d"
           :key="k+ 'list_d'">
        <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="w-fit h-fit text-center">
            <div class="h-60 flex items-center justify-center">
              <div>
                <div>
                  <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                       class="w-24 h-24 py-1"
                       alt="">
                </div>
                <div>
                  <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                       class="w-24 h-24 py-1"
                       alt="">
                </div>
              </div>
            </div>
            <div>x{{v.value}}</div>
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
                 @click="confirmBet(v, 3)"></div>
          </div>
          <div class="h-16 line-12 w-48 text-center betQr-1"
               @click='continuousClick(v,$event)'>{{betObj[v.title]}}</div>
        </div>
      </div>
    </div>
    <!-- list_e -->
    <div class="h-52 flex px-2 box-border">
      <div class="flex-1 p-all-2 box-border relative"
           v-for="(v, k) in list_e"
           :key="k+ 'list_e'">
        <div class="bg-mask-white w-full h-full flex items-center justify-center rounded-8 relative"
             :class="[winWays.includes(v.title)?'flicker':'']"
             @click='continuousClick(v,$event)'>
          <div class="w-fit h-fit text-center">
            <div class="h-30 flex items-center justify-center">
              <div>
                <img :src="require(`@/assets/images/k3_${v.st}.png`)"
                     class="w-24 h-24 py-1"
                     alt="">
              </div>
            </div>
            <div>x{{v.value}}</div>
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
                 @click="confirmBet(v, 5)"></div>
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
  name: 'ways26',
  components: {},
  props: ['ways', 'lotteryType', 'currentIssue', 'openAwardData', 'chouMaAmount', 'userChouMa'],
  data () {
    return {
      list_a: '',
      list_b: '',
      list_B: '',
      list_c: '',
      list_d: '',
      list_e: '',
      winWays: '',
      betObj: {},
      eventPosition: ''
    };
  },
  watch: {
    openAwardData (v) {
      if (v) { this.winWays = v.msg.winWays; this.betObj = {} } else { this.winWays = ''; }
    },
  },
  created () {
    this.list_a = this.ways[0].options.slice(0, 4);
    this.list_b = this.ways[0].options.slice(4, 11);
    this.list_B = this.ways[0].options.slice(11);
    this.list_c = this.ways[4].options;
    this.list_d = this.ways[3].options;
    this.list_e = this.ways[5].options;
  },
  beforeMount () { },
  mounted () {

  },
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
    confirmBet (v, index) {
      this.$emit("betAssistant", {
        obj: { title: v.title, index },
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
.ways26 {
  // UI显示相关
  .order-4 {
    order: 4;
  }
  .order-5 {
    order: 5;
  }
  .order-6 {
    order: 6;
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