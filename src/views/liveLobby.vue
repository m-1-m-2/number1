<template>
  <div class='liveLobby top bottom left right absolute '>
    <!-- <transition :name="transitionName"> -->
    <component v-bind:is="currentGameComponent"
               :deliveryTime="deliveryTime"
               v-if="changeBool"
               :client_Width="client_Width"
               :client_Height="client_Height"
               :mSocket="mSocket"></component>
    <!-- </transition> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { lobby26, lobby27, lobby28, lobby29, lobby30, lobby31 } from '@/components/lotteryLobby'
import { Manager } from "socket.io-client";
import store from '@/store';
import { Toast } from "vant";

export default {
  name: 'liveLobby',
  components: {
    lobby26, lobby27, lobby28, lobby29, lobby30, lobby31
  },
  props: [''],
  data () {
    return {
      mSocket: null,
      currentGameComponent: '',
      deliveryTime: '',
      changeBool: true,
      obj_lang: { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' },
      // transitionName: "slide-right",
      client_Width: '',
      client_Height: ''
    };
  },
  watch: {
    // 监听mSocket是否存在;
    mSocket (val) {
      if (!!val) { this.connect_current_chat(); }
    },
  },
  created () {
    this.mSocket = this.initWS();
    this.deliveryTime = this.getters_getHomeBetViewInfo.time;
  },
  beforeMount () {
    // this.reloadPageFn();
  },
  mounted () {
    this.client_Width = document.documentElement.clientWidth;
    this.client_Height = document.documentElement.clientHeight;
    this.currentGameComponent = `lobby${this.getters_getHomeBetViewInfo.lotteryType}`
    // window.onbeforeunload = e => {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "关闭提示"
    //   }
    //   return '关闭提示'
    // }
  },
  methods: {
    ...mapActions(['actions_getBetting', 'actions_getBalanceNew', 'actions_getHomeBetViewInfo']),
    initWS () {
      // 连接websocket;
      let { lobbyServer } = this.getters_getHomeBetViewInfo;
      let uri = `${lobbyServer}`;
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
    // 下注相关
    // betAssistant (params) {
    //   this.actions_getBetting(params).then((res) => {
    //     if (res.code == 0) { this.actions_getBalanceNew() } else {
    //       Toast(res.msg);
    //     }
    //   })
    // },
    connect_current_chat () {
      let event = this.WSEVENT['SOCKET_CONN'];
      let params = { uid: this.UID, token: this.TOKEN, liveuid: 0, roomnum: 0, stream: '', lang: this.obj_lang[this.LANG] };
      // console.log(params)
      this.mSocket.emit(event, params);
    },
    // 如果有用户发生手动刷新时触发;
    reloadPageFn () {
      let params = { lottery_type: this.getters_getHomeBetViewInfo.lotteryType, support_nn: true };
      this.actions_getHomeBetViewInfo(params)
    },
    // changeLobbyLottery (params) {
    //   this.changeBool = false;
    //   this.delayFn(() => {
    //     this.currentGameComponent = `lobby${params}`
    //     this.transitionName = 'slide-left';
    //     this.changeBool = true;
    //   }, 400)

    //   this.delayFn(() => {
    //     this.transitionName = 'slide-right'
    //   }, 1000)
    // }
  },
  computed: {
    ...mapGetters(['getters_getHomeBetViewInfo', 'WSEVENT', 'UID', 'TOKEN', 'LANG'])
  },
  beforeRouteEnter: (to, from, next) => {
    // console.log(store.getters['lobbyLottery']);
    let lottery_type = store.getters['lobbyLottery'];
    let params = { lottery_type, support_nn: true };
    params.next = next;
    store.dispatch('actions_getHomeBetViewInfo', params);
  },
  beforeDestroy () {
    this.mSocket.close(); // 关闭websocket
  }
}
</script>
<style lang='scss' scoped>
.liveLobby {
}
.liveLobby::before {
  content: "";
  display: inline-block;
  background-image: url("~@/assets/images/lobby_bg.jpg");
  background-position: center;
  background-size: cover;
  // background-attachment: fixed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; /* 將 ::before 置於 main 的後方 */
  /* 模糊效果 */
  filter: blur(0px);
}
</style>