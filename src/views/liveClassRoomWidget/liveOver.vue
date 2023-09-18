<template>
  <div class='liveOver absolute top bottom left right'
       style="background: rgba(139,0,139,0.6)">
    <div class="h-180 w-full flex items-center justify-center fz-16 bolder cl-white">
      {{langSwitch('直播已结束')}}

    </div>
    <div class="h-180 w-full flex items-center justify-center">
      <div class="bg-mask w-300 h-160 rounded-12 relative">
        <div class="w-80 h-80 bg-f2cf40 rounded absolute"
             style="top:-40px; left:110px;"></div>
        <div class="h-110 w-full absolute bottom left box-border px-12">
          <div class="cl-white text-center fz-14 bolder line-40 mb-4">{{langSwitch('你的美伢')}}</div>
          <div class="h-70 w-full box-border bt-1px flex">
            <div class="flex-1 flex flex-col">
              <div class="fz-14 line-40 bolder cl-f2cf40 text-center">00:47:54</div>
              <div class="fz-12 cl-a8a8a8 text-center">{{langSwitch('直播时长')}}</div>
            </div>
            <div class="flex-1 flex flex-col">
              <div class="fz-14 line-40 bolder cl-f2cf40 text-center">00:47:54</div>
              <div class="fz-12 cl-a8a8a8 text-center">{{langSwitch('收获钻石')}}</div>
            </div>
            <div class="flex-1 flex flex-col">
              <div class="fz-14 line-40 bolder cl-f2cf40 text-center">00:47:54</div>
              <div class="fz-12 cl-a8a8a8 text-center">{{langSwitch('观看人数')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-180">

    </div>
    <div class="h-36 px-30">
      <div class="fz-14 cl-white text-center line-36 w-full h-36 bg-f2cf40 rounded-30"
           @click="toRouter('home')">{{langSwitch('返回首页')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'liveOver',
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
.liveOver {
}
</style>