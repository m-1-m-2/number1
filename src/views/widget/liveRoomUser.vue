<template>
  <div class='liveRoomUser'>
    <transition name="van-slide-up">
      <div class="pl-12 cl-white h-16 mt-6"
           v-show="visible">
        <div class="cl-white fz-12">
          <!-- kingIcon -->
          <div class="h-16 w-30 inline"
               v-if="vData.msgData.msg.ct.kingIcon">
            <img class="h-12 w-26"
                 :src="vData.msgData.msg.ct.kingIcon" />
          </div>
          <!-- 用户等级 -->
          <div class="h-16 w-30 inline">
            <img class="h-12 w-26"
                 :src="vData.msgData.msg.ct.level > 0 && getters_getConfig.level[vData.msgData.msg.ct.level-1].thumb" />
          </div>
          <!-- vip标识 -->
          <div class="h-16 w-30 inline"
               v-if="vData.msgData.msg.ct.vipType != 0">
            <img class="h-12 w-26"
                 src="@/assets/images/chat_vip.png" />
          </div>
          <!-- 守护 -->
          <div class="h-16 w-16 inline"
               v-if="vData.msgData.msg.ct.guardType != 0">
            <img class="h-12 w-12"
                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
          </div>
          <!-- 靓号 -->
          <div class="h-16 w-16 inline"
               v-if="vData.msgData.msg.ct.liangname != 0">
            <img class="h-12 w-12"
                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
          </div>
          <div class="w-fit inline">
            <template v-if="vData.msgData.msg.msgtype == 2">
              <span :style="{color: levelColorSet[Math.floor((vData.msgData.msg.ct.level - 1) / 10)]}"> {{ vData.msgData.msg.ct.userNicename }}：</span>{{vData.msgData.msg.content}}
            </template>
            <template v-else>
              <span :style="{color: levelColorSet[Math.floor((vData.msgData.msg.ct.level - 1) / 10)]}"> {{ vData.msgData.msg.ct.userNicename }}</span>&nbsp;{{langSwitch('进入直播间')}}
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'liveRoomUser',
  components: {},
  props: ['vData'],
  data () {
    return {
      visible: false,
      levelColorSet: ['#2AD286', '#009AFB', '#F37B35', '#9926FF', '#F93094', '#FE5F23', '#AA1ABB', '#FF642F', '#FD7D3C', '#E90C29'],
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { this.delayFn(() => { this.visible = true; }, 300); this.delayFn(() => { this.$emit('vDataEmpty') }, 2300) },
  methods: {},
  computed: {
    ...mapGetters(['getters_getConfig', 'LANG'])
  }
}
</script>
<style lang='scss' scoped>
.liveRoomUser {
}
</style>