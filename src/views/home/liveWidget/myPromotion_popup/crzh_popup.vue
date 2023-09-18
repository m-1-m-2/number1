<template>
  <div class='crzh_popup absolute top bottom left right p-all-12 box-border bg-f4f4f4'>
    <div class="w-full h-140 rounded-12 flex items-center justify-center relative"
         style="background: linear-gradient(to bottom right, #A4FEFF, #A000F0)">
      <div>
        <div class="fz-14 cl-white">{{langSwitch('推广收益钻石')}}</div>
        <div class="flex items-center justify-center mt-4">
          <img src="~@/assets/images/damand_charge.png"
               class="h-20 w-20"
               alt="">
          <span class="cl-white fz-14">{{info.left_coin}}</span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="h-fit w-full bg-white rounded-12 mt-12 cl-a8a8a8">
      <div class="h-60 flex line-60 px-12 box-border">
        <div class="flex items-center justify-center mr-6">
          <img src="~@/assets/images/share_1.png"
               class="h-36 w-36"
               alt="">
        </div>
        <div :class="[LANG == 'vi'? 'fz-10': '']">{{langSwitch('输入要充入的钻石数')}}</div>
        <div class="flex-1 flex items-center justify-center">
          <van-field v-model="coin_count"
                     type="number"
                     :autofocus="true"
                     placeholder="0" />
        </div>
      </div>
      <div class="h-60 flex line-60 px-12 box-border">
        <div class="flex items-center justify-center mr-6">
          <img src="~@/assets/images/share_2.png"
               class="h-36 w-36"
               alt="">
        </div>
        <div>{{langSwitch('可到账')}}</div>
        <div class="flex-1 pl-8 cl-DA3E32 fz-14 bolder">{{ coin_count? (coin_count * getters_rootStore.region_exchange_info.exchange_rate).toFixed(2): 0 }} {{ getters_rootStore.region_exchange_info.region_curreny == 'VND'? 'KC': getters_rootStore.region_exchange_info.region_curreny }}</div>
      </div>
    </div>
    <!--  -->
    <div class="mt-16 mb-24 h-fit flex items-center justify-center">
      <div class="pt-12 pb-12 pl-108 pr-108 rounded-24 cl-white"
           @click="filledWithDiamonds"
           style="background: linear-gradient(to bottom right, #A4FEFF, #A000F0)"> {{langSwitch('充入钻石')}} </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'crzh_popup',
  components: {},
  props: ['info'],
  data () {
    return {
      coin_count: ''
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_postChargeInto']),
    filledWithDiamonds () {
      if (!this.coin_count) { Toast(this.langSwitch('请输入钻石数')); return; }

      let params = { charge_coin: this.coin_count };
      const formData = new FormData()
      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      });
      this.actions_postChargeInto(formData).then((res) => {
        if (res.code == 0) { Toast(res.msg) }
      })
    },
  },
  computed: {
    ...mapGetters(['LANG', 'getters_rootStore'])
  }
}
</script>
<style lang='scss' scoped>
.crzh_popup {
}
</style>