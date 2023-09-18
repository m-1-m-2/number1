<template>
  <div class='POKER_bjl_trans w-30 h-42 box-border'
       :class="[index_key == 2? 'rotate_trans': '']">
    <transition name="van-slide-down">
      <div class="flipper w-30 h-42 relative"
           v-if="visible"
           :class="[show ? 'trans180deg':'']">
        <div class="front w-30 h-42 absolute top left"
             style="transform:rotateY(180deg);backface-visibility:hidden;">
          <img :src="imgurl"
               class="w-inherit h-inherit"
               alt="">
        </div>

        <!-- 闲:梅花9,黑桃10|庄:梅花4,方块5 -->
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
  name: 'POKER_bjl_trans',
  components: {},
  props: ['data', 'index_key'],
  data () {
    return {
      imgurl: '',
      imgurl_bicycle_card: require(`@/assets/images/joker/bicycle_card.png`),
      visible: false,
      show: false,
    };
  },
  watch: {},
  created () {
    this.imgurl = this.getImg_array();
    this.delayFn(() => { this.visible = true; }, 300);
    if (this.index_key == 2) { this.delayFn(() => { this.show = true; }, 1000) } else { this.delayFn(() => { this.show = true; }, 2000); }
  },
  beforeMount () { },
  mounted () { },
  methods: {
    getImg_array () {
      let getImg_, suit_array = this.data.split(":")[1].split(',');
      let element = suit_array[this.index_key];
      let suit = element.substring(0, 2), val = element.substring(2), imgurl;
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
      getImg_ = (require(`@/assets/images/joker/${imgurl}.png`));

      return getImg_;
    }
  },
  computed: {
    ...mapGetters(['lotterySound'])
  }
}
</script>
<style lang='scss' scoped>
.POKER_bjl_trans {
  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
  }
  .trans180deg {
    transform: rotateY(180deg);
  }
}

.rotate_trans {
  transform: rotate(90deg);
  position: absolute;
  left: 7px;
  bottom: -5px;
}
</style>