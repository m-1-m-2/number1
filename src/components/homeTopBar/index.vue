<template>
  <div class="homeTopBar w-full h-36 line-36 text-center box-border flex fz-14 van-hairline--bottom">
    <div class="flex-1 flex cl-a8a8a8">
      <div class="h-inherit px-4 relative"
           :class="{'active': isActive == 'attention'}"
           @click="toRouter('attention')">{{ langSwitch('关注') }}</div>
      <div class="h-inherit px-4 relative"
           :class="{'active': isActive == 'live'}"
           @click="toRouter('live')">{{ langSwitch('直播') }}</div>
      <div class="h-inherit px-4 relative"
           :class="{'active': isActive == 'play'}"
           @click="toRouter('play')">{{ langSwitch('游戏') }}</div>
    </div>
    <div class="w-120 text-right flex">
      <div class="flex-1 flex justify-center items-center">
        <img src="~@/assets/images/icon_search.png"
             @click="toRouter('search')"
             class="w-20 h-20"
             alt="">
      </div>
      <div class="flex-1 flex justify-center items-center">
        <img src="~@/assets/images/icon_phb.png"
             @click="toRouter('rankList')"
             class="w-20 h-20"
             alt="">
      </div>
      <div class="flex-1 flex justify-center items-center">
        <img src="~@/assets/images/icon_chat.png"
             @click="toRouter('service')"
             class="w-20 h-20"
             alt="">
      </div>
      <!-- <van-icon class="px-8 mt-8"
                @click="toRouter('search')"
                tag="span"
                size="24"
                name="search" />
      <van-icon class="px-8 mt-8"
                @click="toRouter('rankList')"
                tag="span"
                size="24"
                name="gem-o" />
      <van-icon class="px-8 mt-8"
                @click="toRouter('service')"
                tag="span"
                size="24"
                name="chat-o" /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'homeTopBar',
  components: {},
  props: [''],
  data () {
    return {
      isActive: ''
    };
  },
  watch: {
    $route (val) {
      this.isActive = val.name;
    }
  },
  created () { },
  beforeMount () { },
  mounted () {
    this.isActive = this.$route.name;
  },
  methods: {},
  computed: {

  }
}
</script>
<style lang='scss' scoped>
.homeTopBar {
  .active {
    font-weight: 800;
    color: black;
    font-size: 16px;
    &::before {
      content: "";
      width: 20px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 4px;
      left: 0;
      margin: 0 auto;
      border-bottom: 3px solid #ef4b8d;
    }
  }
}
</style>