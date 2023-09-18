<template>
  <div class='socketEvent'>

  </div>
</template>
<script>
export default {
  name: 'socketEvent',
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
  methods: {
    // 用户发言
    sendChatMessage () {
      let SEND = this.WSEVENT['SOCKET_SEND'];
      let _method_ = this.WSEVENT['SOCKET_SEND_MSG'];
      let { id, userNicename, level, isAnchor, usertype, heart, liangname, vipType, kingIcon, guardType } = this.self_info;
      let ct = this.sendMsg_info;
      let params = {
        _method_,
        action: '0',
        msgtype: '2',
        usertype,
        isAnchor,
        level,
        uname: userNicename,
        uid: id,
        liangname,
        vip_type: vipType,
        guard_type: guardType,
        ct,
      }
      let p = {
        'retcode': '000000',
        'retmsg': 'ok',
        'msg': [params],
      }
      this.mSocket.emit(SEND, p)
      this.sendMsg_info = '';
    },
    sendGiftMessage () {
      let SEND = this.WSEVENT['SOCKET_SEND'];
      let _method_ = this.WSEVENT['SOCKET_SEND_GIFT'];
      let { id, userNicename, level, isAnchor, usertype, heart, liangname, vipType, kingIcon, guardType, avatar } = this.self_info;
      let evensend = this.gift_current.type;
      let ct = this.gift_current.id;
      let roomnum = this.ANCHOR.uid;
      let params = {
        _method_,
        action: '0',
        msgtype: '1',
        level,
        uname: userNicename,
        uid: id,
        uhead: avatar,
        evensend,
        liangname,
        vip_type: vipType,
        ct,
        roomnum,
      }
      console.log(params);

      let p = {
        'retcode': '000000',
        'retmsg': 'ok',
        'msg': [params],
      }
      console.log(p);

      this.mSocket.emit(SEND, p)
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.socketEvent {
}
</style>