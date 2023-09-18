<template>
  <div class='scrollDiv absolute top bottom left right'>
    <div class="absolute top bottom left right scroll-y px-8 box-border"
         ref="liveMsgTopWrap">
      <div class="h-fit w-fit fz-10"
           ref="liveMsgTop">
        <div v-for="(v ,k) in scrollDivList"
             :key="k+'scrollDivList'"
             :class="[ k == 0 && scrollDivList.length >= 3 ?'opacity-3': '', k == 1 && scrollDivList.length >= 3 ?'opacity-6':'']"
             class="fz-10">
          <img class="h-12 w-22 relative top-2"
               :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_win@2x.png`)" />
          {{v.ct.nickname}}{{langSwitch('在')}}{{v.ct.lotteryName}}{{langSwitch('赢得')}}{{v.ct.totalmoney}} {{langSwitch('钻石')}}
        </div>
      </div>
    </div>
    <!-- 设置蒙层禁止用户手动滑动 -->
    <div class="absolute top bottom left right">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'scrollDiv',
  components: {},
  props: ['liveMsgTop'],
  data () {
    return {
      scrollDivList: []
    };
  },
  watch: {
    liveMsgTop (v) {
      if (v.length > 0) {
        let index = 0;
        let intervalFn = setInterval(() => {
          if (index > (v.length - 1)) {
            clearInterval(intervalFn);
            this.$emit('clearLiveMsgTop');
          } else {
            if (this.scrollDivList.length == 3) {
              this.scrollDivList.splice(0, 1);
            }
            this.scrollDivList.push(v[index]);
            index++;
          }
        }, 400)
      }
    },
    scrollDivList: {
      handler (val) {
        let currentRefWrap = this.$refs.liveMsgTopWrap;
        this.delayFn(() => {
          currentRefWrap.scrollTop = currentRefWrap.scrollHeight;
        }, 300)
      },
      deep: true
    },
  },
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {
    ...mapGetters(['LANG'])
  }
}
</script>
<style lang='scss' scoped>
.scrollDiv {
}
</style>