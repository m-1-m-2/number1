<template>
  <div class='countryRegionCharge absolute top bottom left right flex flex-col'>
    <div class="w-full h-36 flex box-border van-hairline--bottom flex">
      <div class="w-36 h-36 flex items-center justify-center">
        <van-icon @click="toBack()"
                  size="20"
                  name="arrow-left" />
      </div>
      <div class="flex-1 h-36 text-center line-36 fz-14">{{langSwitch('更多')}}</div>
      <div class="w-36 h-36"></div>
    </div>
    <div class="flex-1 relative">
      <div class="h-44 fz-20 line-44 px-10 box-border">
        {{langSwitch('国家和地区')}}
      </div>
      <div class="absolute top-44 bottom left right flex">
        <div class="w-full h-44 flex flex-wrap">
          <div class="px-8 box-border"
               :key="k"
               @click="selectCountryCode(v.countryCode)"
               v-for="(v,k) in getters_getPayConfig.pay_support_regions">
            <div class="h-28 w-full flex items-center justify-center">
              <div class="w-24 h-24 rounded relative">
                <img v-real-img="v.icon"
                     alt=""
                     class="w-24 h-24 absolute top left">
              </div>
            </div>
            <div class="h-16 w-full fz-8 line-16 text-center">
              {{v.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'countryRegionCharge',
  components: {},
  props: [''],
  data () {
    return {

    };
  },
  watch: {
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    },
  },
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getPayConfig']),
    ...mapMutations(['mutations_rootStore']),
    selectCountryCode (val) {
      // console.log(val)
      if (this.PAYREGION == val) { this.toBack(); return; }
      this.mutations_rootStore({ key: 'PAYREGION', val });
      let params = { region: val }
      this.actions_getPayConfig(params).then(res => { this.toBack(); })
    }
  },
  computed: {
    ...mapGetters(['getters_getPayConfig', 'getters_isAppending', 'PAYREGION'])
  }
}
</script>
<style lang='scss' scoped>
.countryRegionCharge {
}
</style>