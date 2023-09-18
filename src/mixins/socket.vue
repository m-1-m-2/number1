<template>
  <div class='socket'>

  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { Manager } from "socket.io-client";
import socket from "@/common/js/websocket.js";
// ws消息解密
import protoRoot from '@/proto/proto'
import protobuf, { common } from 'protobufjs'

export default {
  name: 'socket',
  components: {},
  props: [''],
  data () {
    return {
      mSocket: null,
      SOCKET_BROADCAST: 'broadcastingListen',
    };
  },
  watch: {},
  created () {
    // 连接websocket;
    let { chatserver } = this.getters_getEnterRoom;
    let url = `${chatserver}:80`;
    const manager = new Manager(url);
    this.mSocket = manager.socket("/pb");
    // 游戏socket
  },
  beforeMount () { },
  mounted () { },
  methods: {
    isArrayBuffer (obj) {
      return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
    }
  },
  computed: {
    ...mapGetters(['ANCHOR', 'getters_getEnterRoom', 'UID', 'TOKEN'])
  },
  destroyed () {
    // 关闭websocket
    this.mSocket.close();
  }
}
</script>
<style lang='scss' scoped>
.socket {
}
</style>