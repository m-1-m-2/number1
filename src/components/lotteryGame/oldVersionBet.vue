<template>
  <div class='oldVersionBet absolute bottom left right z-index-60 flex flex-col fz-12  cl-white'
       style="top: -10px; background: #2F4F4F; ">
    <!--  -->
    <div class="h-30 flex line-30 justify-end">
      <div class="px-4"
           @click="$emit('old_isPlayInstruction')"> {{langSwitch('玩法说明')}}</div>
      <div class="px-4"
           @click="$emit('old_isBetHistory')">{{langSwitch('投注记录')}}</div>
      <div class="px-4"
           @click="$emit('old_isHistory')">{{langSwitch('开奖历史')}}</div>
      <div class="w-8"></div>
    </div>
    <!--  -->
    <div class="h-60 w-full flex px-8 box-border">
      <div class="flex-1 flex flex-col">
        <div class="h-40 flex">
          <div class="w-40 h-40 flex items-center justify-center">
            <img :src="MOREGAMELOGO"
                 class="w-36 h-36 rounded"
                 alt="">
          </div>
          <div class="line-40 pl-8 fz-14">{{MOREGAMENAME}}</div>
        </div>
        <div class="h-20 line-20 flex fz-12">
          {{langSwitch('本期截止：')}}
          <template v-if="MOREGAMETYPE == 27">
            <div class="flex cl-orange"
                 v-if="!(countdownTime < 1)">
              {{countdownTime < 10 ? '0':''}}{{countdownTime}}&nbsp;{{langSwitch('秒')}}
            </div>
            <div class="cl-orange"
                 v-else>
              {{langSwitch('开奖中')}}
            </div>
          </template>
          <template v-else>
            <div class="flex cl-orange"
                 v-if="!(getters_publicTime < 1)">
              {{getters_publicTime < 10 ? '0':''}}{{getters_publicTime}}&nbsp;{{langSwitch('秒')}}
            </div>
            <div class="cl-orange"
                 v-else>
              {{langSwitch('开奖中')}}
            </div>
          </template>
        </div>
      </div>
      <div class="flex-1 flex items-center justify-end relative">
        <div class="w-70 h-full relative"
             v-if="MOREGAMETYPE == 26">
          <result26 :result="result"></result26>
        </div>
        <div class="w-70 h-full relative"
             v-if="MOREGAMETYPE == 27">
          <result27 :result="result"></result27>
        </div>
        <div class="w-full h-full"
             v-if="MOREGAMETYPE == 8">
          <result8 :result="result"></result8>
        </div>
        <div class="w-full h-full"
             v-if="MOREGAMETYPE == 10">
          <result10 :result="result"
                    :niu="niu"
                    :show="true"></result10>
        </div>
        <div class="w-full h-full"
             v-if="MOREGAMETYPE == 11">
          <result11 :result="result"
                    :order="false"></result11>
        </div>
        <div class="w-full h-full"
             v-if="MOREGAMETYPE == 14">
          <result14 :result="result"></result14>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex-1 relative">
      <div class="absolute top bottom left right flex flex-col">
        <div class="h-36 flex px-4 box-border">
          <div class="flex-1 line-36 text-center bg-black"
               :class="[activeClassIndex == k ? 'activeClassIndex' : '']"
               @click="activeClassIndex_fn(k)"
               v-for="(v,k) in getters_getBetViewInfo.ways"
               :key="k + 'ways'">
            {{v.st}}
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute top bottom right left flex px-4 box-border flex-wrap items-center">
            <div class="flex-1 h-fit flex items-center justify-center"
                 v-for="(v,k) in getters_getBetViewInfo.ways[activeClassIndex].options"
                 :key="k +'waysItems'+ activeClassIndex">
              <div class="h-fit px-2">
                <div class="text-center flex items-center justify-center bg-white cl-red rounded-8 fz-10"
                     @click="selectBet(v)"
                     :class="[ 
                        v.selected == true ? 'selectBet_active': '',
                        MOREGAMETYPE == 14 && activeClassIndex == 0?'w-70 h-34':'',
                        MOREGAMETYPE == 14 && activeClassIndex == 1?'w-60 h-34':'',
                        MOREGAMETYPE == 14 && activeClassIndex == 2?'w-68 h-68':'', 
                        MOREGAMETYPE == 10 && activeClassIndex == 0?'w-50 h-34':'', 
                        MOREGAMETYPE == 10 && activeClassIndex == 1?'w-50 h-34':'', 
                        MOREGAMETYPE == 10 && activeClassIndex == 2?'w-68 h-68':'', 
                        MOREGAMETYPE == 10 && activeClassIndex == 3?'w-68 h-68':'', 
                        MOREGAMETYPE == 8 && activeClassIndex == 0?'w-68 h-68':'', 
                        MOREGAMETYPE == 8 && activeClassIndex == 1?'w-50 h-34':'', 
                        MOREGAMETYPE == 8 && activeClassIndex == 2?'w-68 h-68':'', 
                        MOREGAMETYPE == 26 && activeClassIndex == 0?'w-68 h-68':'', 
                        MOREGAMETYPE == 26 && activeClassIndex == 1?'w-46 h-34':'', 
                        MOREGAMETYPE == 26 && activeClassIndex == 2?'w-50 h-34':'', 
                        MOREGAMETYPE == 26 && activeClassIndex == 3?'w-50 h-34':'', 
                        MOREGAMETYPE == 26 && activeClassIndex == 4?'w-46 h-34':'', 
                        MOREGAMETYPE == 27 && activeClassIndex == 0?'w-68 h-68':'', 
                        MOREGAMETYPE == 27 && activeClassIndex == 1?'w-46 h-34':'', 
                        MOREGAMETYPE == 27 && activeClassIndex == 2?'w-50 h-34':'', 
                        MOREGAMETYPE == 27 && activeClassIndex == 3?'w-50 h-34':'', 
                        MOREGAMETYPE == 27 && activeClassIndex == 4?'w-46 h-34':'', 
                        MOREGAMETYPE == 11 && activeClassIndex == 0?'w-68 h-68':'',
                        MOREGAMETYPE == 11 && activeClassIndex == 1?'w-68 h-68':'',
                     ]">
                  {{v.st}}
                </div>
                <div class="text-center line-24">{{(v.value * 1).toFixed(2)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="h-50 flex">
      <!-- 钱包 -->
      <div class="px-6 flex justify-center items-center cl-yellow fz-14">
        <van-icon class="mr-4"
                  name="diamond-o" />
        {{((getters_getBalanceNew.coin)/10).toFixed(2) || 0.00}}
      </div>
      <!-- 充值 -->
      <div class="flex items-center justify-center">
        <div class="w-fit h-fit pl-16 pr-16 pt-6 pb-6 bg-orange rounded-16"
             @click="toRouter('recharge',{back: true})">{{langSwitch('充值')}}</div>
      </div>
      <!-- 返回新版 -->
      <div class="flex items-center ml-8"
           v-if="showBackNew">
        <div class="w-fit h-fit pl-8 pr-8 pt-4 pb-4 bg-EF4B8D rounded-16 fz-10"
             @click="$emit('old_backNewVersion')">{{langSwitch('返回新版')}}</div>
      </div>
      <!-- 右边内容 -->
      <div class="flex pr-6"
           style="margin-left:auto;">
        <div class="w-50 flex items-center justify-center">
          <div class="h-36 w-36 rounded fz-12 bolder cl-black line-36 text-center"
               @click="setChouMa = true"
               v-chouMaBg>
            <div class="cl-white">{{getters_betAmountValue}}</div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-fit h-fit pl-12 pr-12 pt-4 pb-4 bg-EF4B8D rounded-16"
               @click="betFn">{{langSwitch('投注')}}</div>
        </div>
      </div>
    </div>

    <!-- 设置筹码 -->
    <van-popup v-model="setChouMa"
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-full bg-white pl-8 pr-8 box-border flex flex-col"
           style="background:transparent !important;">
        <div class="bg-black">
          <div class="h-36 cl-white line-36 fz-14 relative text-center van-hairline--bottom box-border">
            {{langSwitch('设置筹码')}}
            <div class="absolute right-4 top-4">
              <van-icon name="close"
                        class="cl-white"
                        @click="setChouMa = false"
                        size="20" />
            </div>
          </div>
          <div class="h-fit px-24 box-border flex flex-wrap">
            <div v-for="(v, k) in chouMa"
                 class="w-Equally-4 h-90 flex items-center justify-center"
                 @click="setAmountFn(v, k)"
                 :key="k">
              <div class="h-72 w-64 box-border flex items-center justify-center rounded-16"
                   :class="[k == select_index? 'activeBorder':'']">
                <div class="w-fit h-fit">
                  <div class="flex items-center justify-center">
                    <div class="h-44 w-44 fz-14 cl-black line-44 text-center"
                         v-chouMaBg>
                      <div class="cl-white">{{v}}</div>
                    </div>
                  </div>
                  <div class="h-20 line-20 fz-10">
                    <span v-if="k == select_index">{{langSwitch('当前筹码')}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-Equally-4 h-90 flex items-center justify-center"
                 @click="select_index = 7">
              <div class="h-72 w-64 box-border flex items-center justify-center rounded-16"
                   :class="[7 == select_index? 'activeBorder':'']">
                <div class="w-fit h-fit"
                     @click="showInput_var = true">
                  <div class="flex items-center justify-center">
                    <div class="h-44 w-44 fz-14 cl-black line-44 text-center"
                         v-chouMaBg>
                      <div>
                        <span class="cl-white">{{initAny ? initAny: '?'}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="h-20 line-20 fz-10">
                    {{langSwitch('修改筹码')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-56 flex items-center justify-center">
            <div class="px-56 h-36 line-36 bg-EF4B8D cl-white rounded-36 w-fit"
                 @click="AmountConfirmed">{{langSwitch('确认')}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- showInput -->
    <van-popup close-on-click-overlay
               v-model="showInput_var"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center cl-black"
               style="background:transparent !important;"
               round>
      <div class="w-300 bg-white text-center rounded-12">
        <div class="h-30 w-full line-30">{{langSwitch('输入自定义筹码')}} </div>
        <div class="h-44 w-full box-border px-50">
          <van-field v-model="amountCount"
                     :clearable="true"
                     :placeholder="langSwitch('自定义范围1-50000')"
                     type="number" />
        </div>
        <div class="h-40 line-40 w-full box-border bt-1px flex">
          <div class="flex-1 box-border br-1px"
               @click="showInput_var = false;">{{langSwitch('返回')}} </div>
          <div class="flex-1 box-border bl-1px"
               @click="confirmEvent">{{langSwitch('确定')}} </div>
          <div></div>
        </div>
      </div>
    </van-popup>

    <!-- 确认投注 -->
    <van-popup v-model="confirmBet"
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-full bg-white box-border flex flex-col"
           style="background:transparent !important;">
        <div class="w-full h-fit bg-black">
          <!--  -->
          <div class="h-40 line-40 text-center cl-white fz-14 relative">
            {{langSwitch('确认投注')}}
            <div class="absolute right-8 top h-40 flex items-center">
              <van-icon name="close"
                        class="cl-white"
                        @click="confirmBet = false"
                        size="24" />
            </div>
          </div>
          <!--  -->
          <div class="h-20 bg-a8a8a8 line-20 text-center fz-10">
            {{MOREGAMENAME}} - {{langSwitch('第')}} {{currentIssue}} {{langSwitch('期')}}
            <template v-if="MOREGAMETYPE == 27">
              <span v-if="!(countdownTime < 1)">{{langSwitch('距封盘')}} {{countdownTime < 10 ? '0':''}}{{countdownTime}} {{langSwitch('秒')}}</span>
              <span v-else>{{langSwitch('开奖中')}}</span>
            </template>
            <template v-else>
              <span v-if="!(getters_publicTime < 1)">{{langSwitch('距封盘')}} {{getters_publicTime < 10 ? '0':''}}{{getters_publicTime}} {{langSwitch('秒')}}</span>
              <span v-else>{{langSwitch('开奖中')}}</span>
            </template>
          </div>
          <!--  content -->
          <div class="scroll-y fz-12"
               style="max-height: 180px;">
            <div class="items-center justify-center h-fit py-5 box-border flex flex-col">
              <div class="w-320 h-56 rounded-8 flex flex-col mb-5 mt-5 pt-4 pb-4 box-border"
                   v-for="(v,k) in betFnArray"
                   :key="k + 'betFnArray'"
                   style="background:rgba(255,255,255,0.3)">
                <div class="flex-1 flex px-12 box-border line-24">
                  <div class="flex-1 cl-EF4B8D">
                    {{v.title}}
                  </div>
                  <div>
                    <div class="cl-0080FF"
                         @click="removeBetFnArray(v, k)">{{langSwitch('删除')}}</div>
                  </div>
                </div>
                <div class="flex-1 flex px-12 box-border line-24">
                  <div class="flex-1 fz-10">
                    {{ MOREGAMENAME }} - {{getters_getBetViewInfo.ways[activeClassIndex].name}} <span class="cl-EF4B8D"> 1 </span>{{langSwitch('注')}}<span class="cl-EF4B8D"> {{multiple}} </span>{{langSwitch('倍')}} &nbsp; {{langSwitch('合')}}
                  </div>
                  <div>
                    <div class="cl-EF4B8D">
                      {{(totalAmount / betFnArray.length).toFixed(2)}} X 1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div>
            <div class="flex pl-16 pr-16 pt-4 pb-6 box-border">
              <div v-for="(v, k) in multipleArray"
                   class="flex-1 flex items-center justify-center"
                   :key="k+'multiple'">
                <div class="w-46 h-24 line-22 text-center box-border ba-1px rounded-10"
                     :class="[multiple == v?'bg-EF4B8D': '']"
                     @click="multiple = v"
                     style="border-color: #EF4B8D;">
                  {{v}}{{langSwitch('倍')}}
                </div>
              </div>
            </div>
            <div class="flex px-8 box-border h-40">
              <div class="flex-1 flex flex-col">
                <div class="h-20 line-20">
                  <span class="cl-EF4B8D">{{betFnArray.length}}</span>&nbsp;{{langSwitch('注')}} &nbsp;{{langSwitch('合')}} <span class="cl-EF4B8D"> {{ totalAmount }} </span>{{langSwitch('钻石')}}
                </div>
                <div class="h-16 fz-10 line-16">{{langSwitch('余额')}}<span class="cl-EF4B8D"> {{((getters_getBalanceNew.coin)/10).toFixed(2) || 0.00}} </span>{{langSwitch('钻石')}}</div>
              </div>
              <div class="flex items-center justify-center">
                <template v-if="MOREGAMETYPE == 27">
                  <div class="pl-6 pr-6 pt-8 pb-8 rounded-8 bg-a8a8a8"
                       :class="[(countdownTime >= 2 && countdownTime <= 177 ) ? 'bg-EF4B8D' :'']"
                       @click="confirmBetFn">{{langSwitch('确认投注')}}</div>
                </template>
                <template v-else>
                  <div class="pl-6 pr-6 pt-8 pb-8 rounded-8 bg-a8a8a8"
                       :class="[(getters_publicTime >= 2 && getters_publicTime <= 57 ) ? 'bg-EF4B8D' :'']"
                       @click="confirmBetFn">{{langSwitch('确认投注')}}</div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { result8, result10, result11, result14, result26, result27 } from "./exhibitResult/index.js";
import { Toast } from "vant";

export default {
  name: 'oldVersionBet',
  components: { result8, result10, result11, result14, result26, result27 },
  props: ['result', 'countdownTime', 'showBackNew', 'currentIssue', 'niu'],
  data () {
    return {
      isOpenAward: false,
      activeClassIndex: 0,
      select_index: 0,
      setChouMa: false,
      chouMa: [2, 5, 10, 50, 100, 200, 500],
      showInput_var: false,
      amountCount: '',
      initAny: '',
      confirmBet: false,
      multipleArray: [1, 2, 5, 10, 20],
      betFnArray: [],
      multiple: 1,
      betButtonDisable: false,
      resultComponent: '',
      sendBet: false,
    }
  },
  watch: {
    result (n, o) {
      this.isOpenAward = false;
    },
    countdownTime (n, o) {
      if (n <= 3 || !n) { this.betButtonDisable = true } else { this.betButtonDisable = false }
    },
    getters_publicTime (n, o) {
      if (n <= 3 || !n) { this.betButtonDisable = true } else { this.betButtonDisable = false }
    },
    getters_getBalanceNew (n, o) {
      //  添加多个确认条件来判定处于处理订单状态
      if (n && this.sendBet && this.confirmBet) {
        // 选择状态重置;
        this.getters_getBetViewInfo.ways.forEach(element => {
          element.options.forEach(el => {
            el.selected = false;
          })
        });
        this.sendBet = false;
        this.confirmBet = false;
        Toast(this.langSwitch('投注成功'));
      }
    }
  },
  created () {
    // console.log(this.getters_getBetViewInfo);
    this.actions_betAmountValue(2);
    this.resultComponent = `result${this.MOREGAMETYPE}`;
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_betAmountValue']),
    confirmBetFn () {
      // 封盘中状态
      if (this.betButtonDisable) { return };
      let optionName = this.getters_getBetViewInfo.ways[this.activeClassIndex].name;
      let amount = (this.totalAmount / (this.betFnArray.length));
      let way = [], money = [];
      this.betFnArray.forEach((el) => { way.push(el.title); money.push(amount) });
      let params = {
        lottery_type: this.MOREGAMETYPE,
        money: JSON.stringify(money),
        way: JSON.stringify(way),
        serTime: parseInt(new Date().getTime() / 1000),
        issue: this.currentIssue,
        optionName: optionName,
        liveuid: this.ANCHOR.uid,
        betid: parseInt(new Date().getTime()),
      };
      this.$emit('betAssistant_oldVersion', params);
      this.sendBet = true;
    },
    removeBetFnArray (v, k) {
      if (this.betFnArray.length == 1) {
        Toast(this.langSwitch('至少有一个投注项'))
        return;
      }
      let mid_var = this.betFnArray.splice(k, 1);
      // console.log(mid_var);
      let mid_sort = mid_var[0].sort;
      this.getters_getBetViewInfo.ways[this.activeClassIndex].options.forEach((el) => { if (el.sort == mid_sort) { el.selected = false; } });
    },
    betFn () {
      let betFnArray = [];
      this.getters_getBetViewInfo.ways[this.activeClassIndex].options.forEach((el) => { if (el.selected == true) { betFnArray.push(el); } })
      // let bool = this.getters_getBetViewInfo.ways[this.activeClassIndex].options.some((el) => el.selected == true);
      if (betFnArray.length == 0) { Toast(this.langSwitch('至少有一个投注项')); return; }
      this.betFnArray = betFnArray;
      this.multiple = 1;
      this.confirmBet = true;
    },
    activeClassIndex_fn (k) {
      this.activeClassIndex = k;
      // console.log(this.getters_getBetViewInfo);
      // 选择状态重置;
      this.getters_getBetViewInfo.ways.forEach(element => {
        element.options.forEach(el => {
          el.selected = false;
        })
      });
    },
    selectBet (val) {
      // console.log(val);
      if (!!val.selected) { val.selected = false; } else { val.selected = true; }
      // val.selected = !val.selected ? true : false;
    },
    setAmountFn (v, k) {
      this.select_index = k;
      this.actions_betAmountValue(v);
    },
    AmountConfirmed () {
      if (this.select_index == 7) {
        if (this.initAny == '') {
          Toast(this.langSwitch('输入自定义筹码'));
          return;
        } else {
          this.actions_betAmountValue(this.initAny);
          this.setChouMa = false;
        }
      } else {
        this.setChouMa = false;
      }
    },
    confirmEvent () {
      if (!this.amountCount) { Toast(this.langSwitch('输入自定义筹码')); return }
      this.initAny = this.amountCount;
      this.amountCount = '';
      this.showInput_var = false;
      this.select_index = 7;
      this.actions_betAmountValue(this.initAny);
    },
    countdownTimeChange (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) { this.isOpenAward = true }
    },
  },
  computed: {
    ...mapGetters(['ANCHOR', 'getters_getEnterRoom', 'getters_getBetViewInfo', 'getters_getBalanceNew', 'getters_rootStore', 'getters_publicTime', 'getters_betAmountValue', 'MOREGAMETYPE', 'MOREGAMENAME', 'MOREGAMELOGO']),
    totalAmount () { return ((this.betFnArray.length * this.getters_betAmountValue) * this.multiple).toFixed(2); }
  }
}
</script>
<style lang='scss' scoped>
.oldVersionBet {
  .activeClassIndex {
    background: purple;
  }
  .activeBorder {
    border: 1px solid #ef4b8d;
  }
  .selectBet_active {
    background: #ef4b8d !important;
    color: white !important;
  }
  .betButtonDisableStyle {
    // background: rg(255, 0, 0, 0.3);
  }
}
</style>