<template>
  <div class='liveClassRoomNew absolute top bottom left right'
       ref="videoSize"
       @click="onSound">
    <!-- 设置竖屏轮播 -->
    <van-swipe @change="onChange"
               class="liveSwipe w-full h-full"
               :show-indicators="false"
               :initial-swipe="ANCHOR_KEY"
               :touchable="isShowMask && itemsTouchEmit"
               ref="mainSwipe"
               vertical>
      <van-swipe-item v-for="(v, k) in ANCHOR_LIST"
                      class="relative"
                      :key="k+'swipeItem'">
        <div class="absolute top bottom left right">
          <!-- 直播流视频 -->
          <div class="absolute left right top bottom imgBlur"
               :style="{'--bgurl': `url(${ ANCHOR_LIST[k].thumb ? ANCHOR_LIST[k].thumb : '' })`}">
            <div class="w-full h-full flex items-center justify-center">
              <canvas :id="`video${k}`"
                      class="w-full h-full"
                      style="object-fit:contain"
                      :class="[changeVideoViewStyle? 'absolute top right': '']">
              </canvas>
            </div>
            <div class="absolute left right top bottom imgBlur z-index-2"
                 v-if="!liveSuccess"
                 :style="{'--bgurl': `url(${ ANCHOR_LIST[k].thumb ? ANCHOR_LIST[k].thumb : '' })`}">
            </div>
          </div>
          <!-- 弹幕消息相关 -->
          <!-- <div style="background:transparent;"
                 class="absolute top bottom left right z-index-4"> -->
          <div class="absolute top bottom left right z-index-4"
               style="background:transparent;">
            <van-swipe class="msgSwipe w-full h-full"
                       :loop="false"
                       :initial-swipe="msgSwipeItemNum"
                       :touchable="false"
                       :show-indicators="false">
              <van-swipe-item class="w-full h-full relative">
                <div class="absolute top bottom left right">
                  <liveMaskCopy v-if="isShowMask && (k == ANCHOR_KEY)"
                                @changeVideoView="changeVideoView"
                                @resetVideoView="resetVideoView"
                                @rebootWS="rebootWS"
                                @onSound="onSound"
                                @onChange="onChange"
                                :mSocket="mSocket"></liveMaskCopy>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { liveMaskNew, liveOver, liveMaskCopy } from "@/views/liveClassRoomWidget/index.js"
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { getVideoRandomKey } from '@/common/js/utils.js'; // 视频解密
import { Toast } from 'vant';
import { Manager } from "socket.io-client";
// ws消息解密
import protoRoot from '@/proto/proto'
import protobuf, { common } from 'protobufjs'

export default {
  name: 'liveClassRoomNew',
  components: { liveMaskNew, liveOver, liveMaskCopy },
  data () {
    return {
      LIVEWS: null,
      np: null,
      liveSuccess: false,
      msgSwipeItemNum: 0,
      isShowMask: true,
      emptyCount: 5,
      mSocket: null, // ws
      itemsTouchEmit: false,
      changeVideoViewStyle: false,
      offsetWidth: '',
      offsetHeight: '',
    };
  },
  created () { this.mSocket = this.initWS(); },
  mounted () {
    let { offsetWidth, offsetHeight } = this.$refs.videoSize;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
    if (this.mSocket) { this.connect_current_chat(); }
    this.initLivePlay();
    this.$bus.$on("itemsTouchEmit", (action) => {
      this.itemsTouchEmit = true;
      const mainSwipe = this.$refs.mainSwipe;
      if (action == 'next') { mainSwipe.next() } else { mainSwipe.prev() }
    });
  },
  methods: {
    ...mapActions(['actions_getEnterRoom']),
    ...mapMutations(['mutations_rootStore']),
    onChange (index, emit = false) {
      // console.log(emit)
      // console.log(this.ANCHOR_KEY);
      let key_prev = this.ANCHOR_KEY;
      this.mutations_rootStore({ key: 'ANCHOR_PREV', val: key_prev, })
      // console.log(index);
      if (!!this.mSocket) { this.disconnect_current_chat(); } // 离开原来的房间;
      // this.mSocket = null;
      // this.mSocket = this.initWS();
      this.liveSuccess = false;
      this.changeRoom(index);
      this.initLivePlay();
    },
    initLivePlay () {
      if (this.np) { this.np.stop() };
      this.emptyCount = 5;
      let cryptoKey = getVideoRandomKey(4, 4, BigInt(String(this.ANCHOR_LIST[this.ANCHOR_KEY].uid)));
      let pull = this.ANCHOR_LIST[this.ANCHOR_KEY].pull;
      let newPull = `${(pull.split('?')[0].replace('rtmp', 'http'))}.flv?${pull.split('?')[1]}`;

      this.np = new NodePlayer();
      this.np.setCryptoKey(cryptoKey);
      this.np.setView(`video${this.ANCHOR_KEY}`);
      this.np.setBufferTime(1000)
      this.np.setTimeout(5);  // 设置超时时长, 单位秒,
      this.np.start(newPull);
      this.np.on("stats", (stats) => {
        // console.log(stats)
        if (stats.vbps != 0) { this.liveSuccess = true; }
        // if (stats.fps == 0 || stats.ts == 0) { this.initLivePlay(); }
      });
      this.np.on('error', () => { this.initLivePlay() })
      this.np.on('buffer', (state) => {
        if (state == 'empty' || state == 'buffering') {
          this.emptyCount--;
          if (this.emptyCount <= 1) { this.initLivePlay(); }
        }
      })
    },
    changeRoom (index) {
      let key = index;
      let val = this.ANCHOR_LIST[index]
      this.mutations_rootStore({ key: 'ANCHOR', val, })
      this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
      let { stream, uid } = val;
      let params = { liveuid: uid, stream, };
      this.isShowMask = false;
      this.actions_getEnterRoom(params).then((res) => {
        if (res.code == 0) {
          this.isShowMask = true;
          this.connect_current_chat();
          this.itemsTouchEmit = false;
        } else {
          Toast(res.msg);
        }
      })
    },
    initWS () {
      // 连接websocket;
      let { chatserver } = this.getters_getEnterRoom;
      let uri = `${chatserver}`;
      // console.log(uri)
      const manager = new Manager(uri, { timeout: 5000 });
      const _socket = manager.socket('/pb'); // namespace
      // console.log(_socket)

      // 在连接错误时触发。
      _socket.io.on("error", (error) => { });
      // 成功重新连接后触发。
      _socket.io.on("reconnect", (info) => { });
      // 在尝试重新连接时触发。
      _socket.io.on("reconnect_attempt", (info) => { });
      // 在重新连接尝试错误时触发。
      _socket.io.on("reconnect_error", (info) => { });
      // 在无法重新连接时触发
      _socket.io.on("reconnect_failed", (info) => { });
      // 从服务器接收到 ping 数据包时触发。
      _socket.io.on("ping", (info) => { });

      return _socket;
    },
    // 连接聊天室
    connect_current_chat () {
      let { stream, uid } = this.ANCHOR;
      let event = this.WSEVENT['SOCKET_CONN'];
      // console.log(this.LANG)
      let params = { uid: this.UID, token: this.TOKEN, liveuid: uid, roomnum: uid, stream, lang: this.LANG, is_enter_room: true };
      this.mSocket.emit(event, params);
    },
    // 退出房间聊天
    disconnect_current_chat () {
      let event = this.WSEVENT['SOCKET_LEAVE_ROOM'], params = {};
      this.mSocket.emit(event, params);
    },
    // 接受消息
    broadcastingListen () {
      const StreamMsg = protoRoot.lookup('common.StreamMsg');
      let event = this.WSEVENT['SOCKET_BROADCAST'];
      this.mSocket.on(event, (rawResponse) => {
        let { result, msgID } = this.changeRawData(StreamMsg, rawResponse);
        console.log(result)

      })
    },
    // 转换成可阅读文字
    changeRawData (StreamMsg, rawResponse) {
      let StreamMsg_buf = protobuf.util.newBuffer(rawResponse)
      let { msgID, msgData } = StreamMsg.decode(StreamMsg_buf);
      let msg_buf = protobuf.util.newBuffer(msgData);
      let msg_id = protoRoot.lookup(`s2c.${this.MSGID[msgID]}`);
      let result = msg_id.decode(msg_buf);
      return { result, msgID };
    },
    changeVideoView (obj) {
      let { offsetWidth, offsetHeight } = obj;
      this.offsetWidth = offsetWidth;
      this.offsetHeight = offsetHeight;
      if (this.np) { this.np.resizeView(offsetWidth, offsetHeight); this.changeVideoViewStyle = true; }
      this.videoContain();
    },
    resetVideoView () {
      let { offsetWidth, offsetHeight } = this.$refs.videoSize;
      this.offsetWidth = offsetWidth;
      this.offsetHeight = offsetHeight;
      if (this.np) { this.np.resizeView(offsetWidth, offsetHeight); this.changeVideoViewStyle = false; }
      this.videoContain();
    },
    onSound () {
      // if (this.np) {
      this.np.audioResume();
      // }
    },
    rebootWS () {
      this.mSocket = null;
      this.delayFn(() => { this.mSocket = this.initWS(); }, 100)
    },
    videoContain () {
      if (this.offsetWidth * 16 <= this.offsetHeight * 9) {
        // 宽为主导
        this.np.resizeView(this.offsetWidth, this.offsetWidth / 9 * 16)
      } else {
        // 高为主导
        this.np.resizeView(this.offsetHeight / 16 * 9, this.offsetHeight)
      }
    }
  },
  computed: {
    ...mapGetters(['ANCHOR', 'ANCHOR_KEY', 'ANCHOR_LIST', 'getters_getEnterRoom', 'UID', 'TOKEN', 'WSEVENT', 'MSGID', 'LANG'])
  },
  beforeDestroy () {
    this.disconnect_current_chat();
    if (this.np) { this.np.stop(); }
    this.mSocket.close(); // 关闭websocket
    this.$bus.$off("itemsTouchEmit");
  },
  beforeRouteEnter: (to, from, next) => {
    let { ad } = to.query;
    if (ad) { next({ name: 'live', query: { ad: true } }) } else { next() }
  },
}
</script>
<style lang='scss' scoped>
.liveClassRoomNew {
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