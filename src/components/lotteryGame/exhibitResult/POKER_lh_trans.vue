<template>
  <div class='POKER_lh_trans w-30 h-42'>
    <transition name="van-slide-down">
      <div class="flipper w-30 h-42 relative"
           v-if="visible"
           :class="[show ? 'trans180deg':'']">
        <div class="front w-30 h-42 absolute top left"
             style="transform: rotateY(180deg); backface-visibility: hidden;">
          <img :src="imgurl"
               class="w-inherit h-inherit"
               alt="">
        </div>
        <div class="back w-30 h-42 z-index-2 absolute top left"
             style="backface-visibility: hidden;">
          <img :src="imgurl_bicycle_card"
               class="w-inherit h-inherit"
               alt="">
        </div>
      </div>
    </transition>

    <!-- 声音 -->
    <div v-if="lotterySound">
      <div v-if="!show">
        <audio autoplay
               hidden
               src="~@/assets/music/poker_s.mp3"></audio>
      </div>
      <div v-if="show">
        <audio autoplay
               hidden
               src="~@/assets/music/poker_e.mp3"></audio>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'POKER_lh_trans',
  components: {},
  props: ['openAwardData', 'index'],
  data () {
    return {
      imgurl: '',
      imgurl_bicycle_card: require(`@/assets/images/joker/bicycle_card.png`),
      visible: false,
      show: false,
    };
  },
  watch: {
    openAwardData: {
      handler (newValue, oldValue) {
        let _this = this;
        if (!!newValue) {
          // 玩家1:梅花7,黑桃K,梅花4(高牌)|玩家2:方块3,红心8,红心4(高牌)|玩家3:梅花K,梅花Q,梅花2(同花)
          let val = newValue.msg.result.split('|')[_this.index];
          _this.imgurl = this.getImg(val);
          _this.show = true;
        }
      },
      deep: true,  // 深度监听
    },
  },
  created () {
    this.delayFn(() => { this.visible = true; }, 500)
  },
  beforeMount () { },
  mounted () { },
  methods: {
    getImg (data) {
      let suit = data.split(":")[1].substring(0, 2);
      let val = data.split(":")[1].substring(2);
      let imgurl;
      switch (suit) {
        case '黑桃':
          imgurl = 'ht_' + val;
          break;
        case '红心':
          imgurl = 'hx_' + val;
          break;
        case '梅花':
          imgurl = 'mh_' + val;
          break;
        case '方块':
          imgurl = 'fk_' + val;
          break;
        default:
          imgurl = 'bicycle_card'
          break;
      }
      return require(`@/assets/images/joker/${imgurl}.png`);;
    }
  },
  computed: {
    ...mapGetters(['lotterySound'])
  }
}
</script>
<style lang='scss' scoped>
.POKER_lh_trans {
  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
  }
  .trans180deg {
    transform: rotateY(180deg);
  }
}
</style>