<template>
  <div class='checkOrder absolute top bottom left right'>
    <div class="h-36 w-full">
      <div class="w-full h-36 flex box-border van-hairline--bottom">
        <div class="w-36 h-36 flex items-center relative"
             @click="toBack()">
          <van-icon size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 fz-14 flex items-center justify-center"></div>
        <div class="w-36 h-36 text-center"></div>
      </div>
    </div>
    <div class="absolute top-36 left right bottom flex items-center justify-center fz-14 bg-f4f4f4">
      <div class="text-center">
        <div class="line-20">{{langSwitch('财务正在核对')}}</div>
        <div class="line-20">{{langSwitch('3~5分钟内未到账,请联系客服')}}</div>
        <div class="mt-24 inline-block">
          <div class="pl-60 pr-60 pt-8 pb-8 bg-white rounded-16 w-fit"
               @click="toRouter('home')">{{langSwitch('返回首页')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkOrder',
  components: {},
  props: [''],
  data () {
    return {

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
<style lang='scss' scoped>
.checkOrder {
}
</style>