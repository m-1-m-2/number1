<template>
  <div class='onlineStore absolute top bottom left right fz-12'>
    <van-tabs v-model="currentTab"
              animated>
      <van-tab :title="langSwitch('会员')"
               name="hy">
      </van-tab>
      <van-tab :title="langSwitch('靓号')"
               name="lh">
      </van-tab>
      <van-tab :title="langSwitch('坐骑')"
               name="zq">
      </van-tab>
    </van-tabs>
    <div class="absolute top-36 bottom left right scroll-y bg-f1f1f1">
      <div v-if="currentTab == 'hy'">
        <div class="mt-10 w-full h-150 bg-white">
          <div class="h-40 fz-14 bolder text-center line-40">
            {{langSwitch('VIP会员专属特权')}}
          </div>
          <div class="h-110 w-full flex">
            <div class="flex-1 flex justify-center">
              <div class="w-160 h-90 bg-f2cf40 rounded-8 px-12 box-border flex items-center">
                <div>
                  <div class="fz-16 bolder "
                       style="padding-bottom:8px">{{langSwitch('尊贵身份')}}</div>
                  <div class="">{{langSwitch('携带VIP标识登场')}}</div>
                </div>
              </div>
            </div>
            <div class="flex-1 flex justify-center">
              <div class="w-160 h-90 bg-pink rounded-8 px-12 box-border flex items-center">
                <div>
                  <div class="fz-16 bolder h-50 line-70">{{langSwitch('炫酷标识')}}</div>
                  <div class="h-50">{{langSwitch('用户聊天显示VIP会员图标')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="h-30 w-240 bg-orange rounded-30 cl-white line-30 text-center"
             style="margin: 20px auto;">{{langSwitch('开通会员')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'onlineStore',
  components: {},
  props: [''],
  data () {
    return {
      currentTab: "hy"
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss'>
.onlineStore {
  .van-tabs__wrap {
    height: 36px !important;
  }
}
</style>