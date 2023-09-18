<template>
  <div class='liveClassRoom absolute top bottom left right'>
    <!-- 直播视频 -->
    <div class="absolute top bottom left right imgBlur"
         :style="{'--bgurl': `url(${ ANCHOR.thumb ? ANCHOR.thumb : '' })`}">
      <!-- 直播流视频 -->
      <div class="absolute left right top bottom">
        <canvas id="video"
                class="w-full h-full">
        </canvas>
        <div class="absolute left right top bottom imgBlur z-index-2"
             v-if="!liveSuccess"
             :style="{'--bgurl': `url(${ ANCHOR.thumb ? ANCHOR.thumb : '' })`}"></div>
      </div>
      <!-- 设置为z-index 为4 -->
      <div class="absolute right-16 top-100 z-index-4">
        <van-icon name="volume-o"
                  color="#ffffff"
                  @click="openSound"
                  size="20" />
      </div>
    </div>
    <div class="absolute top bottom left right"
         style="background:transparent; z-index:10;">
      <!-- 直播消息展示 -->
      <liveMask :mSocket='mSocket'
                @changeClassRoom="changeClassRoom"></liveMask>
      <!-- 直播结束 -->
      <!-- <liveOver></liveOver> -->
    </div>
  </div>
</template>
<script>
import { liveMask, liveOver } from "@/views/liveClassRoomWidget/index.js"
import { mapGetters } from 'vuex';
import SOCKET from '@/mixins/socket.vue'
import { getVideoRandomKey } from '@/common/js/utils.js'; // 视频解密

export default {
  name: 'liveClassRoom',
  components: {
    liveMask,
    liveOver,
  },
  props: [],
  mixins: [SOCKET],
  data () {
    return {
      LIVEWS: null,
      np: null,
      liveSuccess: false,
    };
  },
  watch: {

  },
  created () { },
  beforeMount () { },
  mounted () {
    // 初始化播放器内容
    this.initLivePlay();
  },
  methods: {
    changeClassRoom () {
      // console.log('changeClassRoom')
      this.np.stop()
      this.liveSuccess = false;
      this.initLivePlay();
    },
    initLivePlay () {
      let cryptoKey = getVideoRandomKey(4, 4, BigInt(String(this.ANCHOR.uid)));
      let pull = this.ANCHOR.pull;
      let newPull = `${(pull.split('?')[0].replace('rtmp', 'http'))}.flv?${pull.split('?')[1]}`;

      this.np = new NodePlayer();
      this.np.setCryptoKey(cryptoKey);
      this.np.setView("video");
      this.np.start(newPull);
      this.np.on("stats", (stats) => {
        // buf: 当前缓冲区时长，单位毫秒,
        // fps: 当前视频帧率,
        // abps: 当前音频码率，单位bit,
        // vbps: 当前视频码率，单位bit，
        // ts: 当前视频帧pts，单位毫秒
        if (stats.vbps != 0) { this.liveSuccess = true; }
        if (stats.abps != 0) { this.np.audioResume(); }
      });
      // 当连接错误或播放中发生错误时回调,必须监听error事件
      this.np.on('error', () => {
        this.initLivePlay()
      })
    },
    openSound () {
      this.np.audioResume();
    }
  },
  computed: {
    ...mapGetters(['ANCHOR', 'getters_getEnterRoom', 'UID', 'TOKEN'])
  },
  beforeDestroy () {
    this.np.stop();
  },
}
</script>
<style lang='scss' scoped>
.liveClassRoom {
  .imgBlur::before {
    content: "";
    display: inline-block;
    background-image: var(--bgurl);
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(6px);
  }
}
</style>