<template>
  <div class='chips absolute top bottom left right flex fz-14 itmes-center justify-center'
       :class="[is_bg?'chips-bg':'']">
    <div class="px-6 flex justify-center items-center cl-white">
      <img src="~@/assets/images/img_hyuan.png"
           class="w-24 h-20"
           alt="">
      &nbsp;
      {{((getters_getBalanceNew.coin)/10).toFixed(2) || 0.00}}
    </div>
    <div class="flex-1 relative">
      <div class="absolute top bottom left right scroll-x flex items-center">
        <div class="w-fit px-4 relative"
             v-for="(v, k) in chouMa"
             @click="selectAmount(v, k)"
             :key="k">
          <div class="rounded bg-red fz-10 bolder cl-white text-center"
               :class="[k == select_index? 'h-36 w-36 line-36' :'h-30 w-30 line-30']"
               v-chouMaBg>
            <div>{{v}}</div>
          </div>
          <!-- <div class="absolute w-14 h-14 bg-red rounded bottom right fz-14 cl-orange text-center line-6 bolder"
               v-if="k == select_index"></div> -->
        </div>
        <!-- any -->
        <div class="w-fit px-4 relative">
          <div class="rounded bg-red fz-10 bolder cl-white text-center flex flex-col items-center justify-center"
               :class="[7 == select_index? 'h-36 w-36 line-36' :'h-30 w-30 line-30']"
               @click="showInput_var = true"
               v-chouMaBg>
            <div>{{initAny ? initAny : '?'}}</div>
          </div>
          <!-- <div class="absolute w-14 h-14 bg-red rounded bottom right fz-14 cl-orange text-center line-6 bolder"
               v-if="7 == select_index"></div> -->
        </div>
      </div>
    </div>
    <div class="px-6 flex items-center justify-center">
      <div class="w-fit fz-14 cl-white pl-10 pr-10 pt-4 pb-4 bg-grey rounded-8">{{langSwitch('续投')}} </div>
    </div>
    <!-- showInput -->
    <van-popup close-on-click-overlay
               v-model="showInput_var"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-300 bg-white text-center rounded-12">
        <div class="h-30 w-full line-30">{{langSwitch('输入自定义筹码')}} </div>
        <div class="h-44 w-full box-border px-50">
          <van-field v-model="amountCount"
                     :clearable="true"
                     :placeholder="langSwitch('自定义范围1-50000') "
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'chips',
  components: {},
  props: {
    is_bg: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      chouMa: [2, 10, 100, 200, 500, 1000],
      initAny: '',
      showInput_var: false,
      amountCount: '',
      select_index: 0,
    };
  },
  watch: {},
  created () {
    this.actions_getBalanceNew();
    this.actions_betAmountValue(2);
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_betAmountValue', 'actions_getBalanceNew']),
    confirmEvent () {
      if (!this.amountCount) { Toast(this.langSwitch('输入自定义筹码')); return }
      this.initAny = this.amountCount;
      this.amountCount = '';
      this.showInput_var = false;
      this.select_index = 7;
      this.actions_betAmountValue(this.initAny);
    },
    selectAmount (v, k) {
      this.select_index = k;
      this.actions_betAmountValue(v);
    }
  },
  computed: {
    ...mapGetters(['getters_getBalanceNew', 'getters_rootStore', 'getters_betAmountValue'])
  }
}
</script>
<style lang='scss' scoped>
.chips-bg {
  background-image: url("~@/assets/images/lotteryBg/yfks_bgview_bottom.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>