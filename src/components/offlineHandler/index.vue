<template>
  <div class='offlineHandler offline-mask absolute top bottom left right'
       v-if="mask">
    <div class="offline-mask-title absolute top bottom left right bg-white flex items-center justify-center"
         style="z-index: 99999;">
      <van-empty image="network"
                 :description="offlineTitle">
        <div class="pl-20 pr-20 pt-8 pb-8 rounded-30 bg-DA3E32 cl-white fz-14"
             @click="reloadFn">刷新</div>
      </van-empty>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';

export default {
  name: 'offlineHandler',
  components: {},
  props: {
    offlineTitle: {
      type: String,
      default: '网络已断开,请检查网络'
    },
    onlineTitle: {
      type: String,
      default: '网络已连接'
    }
  },
  data () {
    return {
      mask: false
    };
  },
  watch: {
    mask (val) {
      let { name } = this.$route;
      if (!val && (name == 'liveClassRoomNew' || name == 'liveClassRoom')) { this.$router.go(0); }
    }
  },
  created () { },
  beforeMount () { },
  mounted () {
    window.addEventListener('offline', this.eventHandler)
    window.addEventListener('online', this.eventHandler)
  },
  methods: {
    eventHandler (event) {
      let { offlineTitle, onlineTitle } = this;
      const type = event.type === 'offline' ? 'error' : 'success';
      const title = type === 'error' ? offlineTitle : onlineTitle;
      Toast(title);
      this.delayFn(() => {
        this.mask = event.type === 'offline';
      }, 1500);
    },
    reloadFn () {
      this.$router.go(0);
    }
  },
  computed: {},
  beforeDestroy () {
    window.removeEventListener('offline', this.eventHandler)
    window.removeEventListener('online', this.eventHandler)
  }
}
</script>
<style lang='scss' scoped>
.offlineHandler {
}
</style>