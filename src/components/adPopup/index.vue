<template>
  <div class='adPopup'>
    <van-popup v-model="isAdPopup"
               position="bottom"
               round
               :style="{ height: '90%',width: '100%' }">
      <div class="w-full h-36 flex fz-14 line-36 text-center van-hairline--bottom box-border">
        <div class="w-60 h-36"
             @click="$emit('changeIsAdPopup')">{{langSwitch('返回')}} </div>
        <div class="flex-1"></div>
        <div class="w-60 h-36"
             @click="$emit('changeIsAdPopup')">{{langSwitch('关闭')}} </div>
      </div>
      <div class="absolute top-36 bottom left right flex justify-center">
        <van-loading type="spinner"
                     v-if="!iframeShow"
                     class="self-center" />
        <div class="absolute top bottom left right scroll-y"
             v-show="iframeShow">
          <iframe :src="iframeSrc"
                  frameborder="0"
                  class="w-full h-full iframe"
                  id="iframe"></iframe>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'adPopup',
  components: {},
  props: ['isAdPopup', 'iframeSrc'],
  data () {
    return {
      iframeShow: false,
    };
  },
  watch: {
    isAdPopup (n) {
      if (n) {
        let timer = setTimeout(() => {
          this.iframeShow = true;
          clearTimeout(timer);
        }, 1000)
      } else {
        let timer = setTimeout(() => {
          this.iframeShow = false;
          clearTimeout(timer);
        }, 500)
      }
    }
  },
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss'>
.adPopup {
  .iframe {
    body {
      ::-webkit-scrollbar-thumb {
        display: none; /* Chrome Safari */
      }
    }
  }
}
</style>