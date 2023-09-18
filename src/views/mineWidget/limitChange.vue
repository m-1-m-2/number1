<template>
  <div class='limitChange absolute top bottom left right fz-12'>
    <div v-if="!!getters_getBalanceNew"
         class="absolute top bottom left right scroll-y pb-12">
      <div class="pl-12 pr-12 pt-12 box-border">
        <div class="w-full h-150 rounded-8 flex flex-col p-all-12 box-border cl-white scroll-hide"
             style="background:linear-gradient(to right, #DA3E32, #EF4B8D)">
          <div class="flex-1 fz-14 flex items-center">
            {{langSwitch('账户余额')}} &nbsp;({{langSwitch('钻石')}})
          </div>
          <div class="flex-1 fz-20 flex items-center">
            <div>
              {{ (getters_getBalanceNew.coin/10).toFixed(2) || 0.00}}
              <van-icon size="20"
                        @click="actions_getBalanceNew"
                        name="replay" />
            </div>
          </div>
          <div class="flex-1 flex items-center flex relative">
            <div class="absolute"
                 style="left:-16px;">
              <van-cell center
                        size="18"
                        class="cl-FFFFFF"
                        style="background:linear-gradient(to right, #DA3E32, #E0424E, #E1424D)"
                        :title="langSwitch('自动额度转换')">
                <template #right-icon>
                  <van-switch class="ml-8"
                              active-color="#A4FEFF"
                              inactive-color="#dcdee0"
                              v-model="autoConvertSwitch"
                              size="18" />
                </template>
              </van-cell>
            </div>
            <div class="pl-10 pr-10 pt-4 pb-4 bg-white cl-red rounded-20"
                 @click="backAllCoin"
                 style="margin-left: auto;">{{langSwitch('一键回收')}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="pl-12 pr-12 pt-12 box-border"
           v-for="(v, k) in getters_getBalanceNew.platArray"
           :key="k+'getters_getBalanceNew'">
        <div class="w-full h-150 rounded-8 flex flex-col p-all-12 box-border cl-black"
             style="background:linear-gradient(to right, #A4FEFF, #a8fff3)">
          <div class="flex-1 fz-14 flex items-center">
            <img :src="v.logo"
                 class="w-24 h-24 mr-4"
                 alt="">
            {{v.name}}
          </div>
          <div class="flex-1 fz-20 flex items-center">
            {{getters_rootStore.region_exchange_info.region_curreny_char}}&nbsp;{{(v.coin/1).toFixed(2)}}&nbsp;
            <van-icon size="20"
                      @click="actions_getBalanceNew"
                      name="replay" />
          </div>
          <div class="flex-1 flex items-center flex justify-end">
            <div class="pl-20 pr-20 pt-4 pb-4 bg-white cl-red rounded-20 mr-10"
                 @click="ConvertCoin('in', v)">{{langSwitch('转入')}}</div>
            <div class="pl-20 pr-20 pt-4 pb-4 cl-white rounded-20 bg-a8a8a8"
                 @click="ConvertCoin('out', v)">{{langSwitch('转出')}}</div>
          </div>
        </div>
      </div>
      <!-- popup -->
      <van-popup v-model="is_amountCount"
                 position="bottom"
                 :style="{ height: '100%', width: '100%' }"
                 class="flex items-center justify-center"
                 style="background:transparent !important;"
                 round>
        <div class="w-240 h-120 bg-white rounded-12 flex flex-col fz-12 p-all-10 box-border relative">
          <div class="absolute top-4 right-6">
            <van-icon size="20"
                      @click="is_amountCount = false;"
                      name="close" />
          </div>
          <div class="h-30 line-30 text-center">{{operate == 'in'? langSwitch('转入'): langSwitch('转出')}}</div>
          <div class="flex-1 flex">
            <div class="flex-1">
              <van-field v-model="amountCount"
                         :clearable="true"
                         type="number"
                         :placeholder="`${langSwitch('请输入')}${operate == 'in'? langSwitch('转入'): langSwitch('转出')}${langSwitch('金额')}`" />
            </div>
            <div class="flex items-center ml-4">
              <div class="pr-12 pl-12 pt-4 pb-4 rounded-20 ba-1px box-border cl-red"
                   @click="amountAll">{{langSwitch('全部')}}</div>
            </div>
          </div>
          <div class="h-30 line-30 text-center"
               @click="real_ConvertCoin">{{langSwitch('确定')}}</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast } from 'vant';
export default {
  name: 'limitChange',
  components: {},
  props: [''],
  data () {
    return {
      autoConvertSwitch: '',
      is_amountCount: false,
      amountCount: '',
      operate: '',
      currentPlat: ''
    };
  },
  watch: {
    autoConvertSwitch (n, o) {
      let obj = { key: 'autoExchange', val: n };
      this.actions_rootStore(obj);
    }
  },
  created () {
    this.autoConvertSwitch = this.autoExchange;
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getBalanceNew', 'actions_getBackAllCoin', 'actions_getConvertCoin', 'actions_rootStore']),
    // 一键回收
    backAllCoin () {
      this.actions_getBackAllCoin().then(res => {
        if (res.code == 0) { Toast(this.langSwitch('一键回收成功')); this.actions_getBalanceNew() }
      })
    },
    ConvertCoin (operate, val) {
      if (operate == 'out' && val.coin == 0) { return }
      this.operate = operate;
      this.currentPlat = val;
      this.amountCount = '';
      this.is_amountCount = true;
      // 显示弹框组件
    },
    real_ConvertCoin () {
      if (!this.amountCount) { Toast(`${this.langSwitch('请输入')}${this.operate == 'in' ? this.langSwitch('转入') : this.langSwitch('转出')}${this.langSwitch('金额')}`); return; }
      let value = this.operate == 'in' ? this.amountCount * 10 : this.amountCount;
      let params = {
        subplat: this.currentPlat.plat,
        operate: this.operate,
        value,
      }
      console.log(params);
      this.actions_getConvertCoin(params).then(res => {
        console.log(res);
        if (res.code == 0) {
          Toast(`${this.operate == 'in' ? this.langSwitch('转入') : this.langSwitch('转出')}${this.currentPlat.name}${this.langSwitch('成功')}`)
          this.actions_getBalanceNew();
        } else {
          Toast(res.msg)
        }
        this.is_amountCount = false;
      })
    },
    amountAll () {
      if (this.operate == 'in') {
        this.amountCount = (this.getters_getBalanceNew.coin / 10);
      } else {
        this.amountCount = this.currentPlat.coin;
      }
    }
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'getters_getBalanceNew', 'autoExchange'])
  }
}
</script>
<style lang='scss' scoped>
.limitChange {
}
</style>