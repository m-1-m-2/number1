<template>
  <div class='POKER_zjh absolute top bottom right left flex justify-center'>
    <div class="w-fit flex relative left-10">
      <div class="absolute bottom left w-full h-18 px-4 box-border z-index-10">
        <div class="w-full h-full rounded-8 fz-12 line-18 text-center relative left-10- bottom-10"
             v-if="openAwardData">
          <img src="~@/assets/images/zjh_result.png"
               alt=""
               class="w-full h-24"
               srcset="">
          <div class="absolute top w-full h-24 text-center line-20 cl-white">{{openAwardData.msg.zjh.paiTypeStr[index]}}</div>
        </div>
      </div>

      <div class='w-30 h-42 flip-container fz-12'
           style="perspective: 1000;">
        <transition name="van-slide-down">
          <div class="flipper w-30 h-42 relative"
               v-if="visible1"
               :class="[show ? 'trans180deg':'']">
            <div class="front w-30 h-42 absolute top left"
                 style="transform: rotateY(180deg); backface-visibility: hidden;">
              <img :src="openAward_img1"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div class="back w-30 h-42 z-index-2 absolute top left"
                 style="backface-visibility: hidden;">
              <img :src="imgurl_bicycle_card"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div v-if="lotterySound">
              <audio autoplay
                     hidden
                     v-if="visible1 && !show && soundOnce"
                     src="~@/assets/music/poker_s.mp3"></audio>
            </div>
          </div>
        </transition>
      </div>

      <div class='w-30 h-42 flip-container fz-12 relative left-10-'
           style="perspective: 1000;">
        <transition name="van-slide-down">
          <div class="flipper w-30 h-42 relative"
               v-if="visible2"
               :class="[show ? 'trans180deg':'']">
            <div class="front w-30 h-42 absolute top left"
                 style="transform: rotateY(180deg); backface-visibility: hidden;">
              <img :src="openAward_img2"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div class="back w-30 h-42 z-index-2 absolute top left"
                 style="backface-visibility: hidden;">

              <img :src="imgurl_bicycle_card"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div v-if="lotterySound">
              <audio autoplay
                     hidden
                     v-if="visible2 && !show && soundOnce"
                     src="~@/assets/music/poker_s.mp3"></audio>
            </div>
          </div>
        </transition>
      </div>

      <div class='w-30 h-42 flip-container fz-12 relative left-20-'
           style="perspective: 1000;">
        <transition name="van-slide-down">
          <div class="flipper w-30 h-42 relative"
               v-if="visible3"
               :class="[show ? 'trans180deg':'']">
            <div class="front w-30 h-42 absolute top left"
                 style="transform: rotateY(180deg); backface-visibility: hidden;">
              <img :src="openAward_img3"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div class="back w-30 h-42 z-index-2 absolute top left"
                 style="backface-visibility: hidden;">
              <!-- 背面内容 -->
              <img :src="imgurl_bicycle_card"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
            <div v-if="lotterySound">
              <audio autoplay
                     hidden
                     v-if="visible3 && !show && soundOnce"
                     src="~@/assets/music/poker_s.mp3"></audio>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 声音 -->
    <div v-if="lotterySound">
      <audio autoplay
             hidden
             v-if="show"
             src="~@/assets/music/poker_e.mp3"></audio>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'POKER_zjh',
  components: {},
  props: ['openAwardData', 'index'],
  data () {
    return {
      imgurl_bicycle_card: '',
      show: false,
      visible1: false,
      visible2: false,
      visible3: false,
      openAward_img1: '',
      openAward_img2: '',
      openAward_img3: '',
      zjh_result: '',
      // sound, 避免某些特定情境,处理音频重复
      soundOnce: true,
    };
  },
  watch: {
    openAwardData: {
      handler (newValue, oldValue) {
        // console.log(newValue, 'newVal')
        let _this = this;
        if (!!newValue) {
          // 玩家1:梅花7,黑桃K,梅花4(高牌)|玩家2:方块3,红心8,红心4(高牌)|玩家3:梅花K,梅花Q,梅花2(同花)
          let val1 = newValue.msg.result.split('|')[_this.index].split(':')[1].split(',')[0];
          let val2 = newValue.msg.result.split('|')[_this.index].split(':')[1].split(',')[1];
          let val3 = newValue.msg.result.split('|')[_this.index].split(':')[1].split(',')[2].split('(')[0];

          _this.openAward_img1 = this.getImg(val1);
          _this.openAward_img2 = this.getImg(val2);
          _this.openAward_img3 = this.getImg(val3);

          _this.show = true;

          let timer_arr = [5000, 4500, 4000]

          let timeFn = setTimeout(() => {
            _this.visible1 = false;
            _this.visible2 = false;
            _this.visible3 = false;
            clearTimeout(timeFn)
          }, timer_arr[_this.index])
        }
      },
      deep: true,  // 深度监听
    },
  },
  created () {
    // 默认背图
    this.imgurl_bicycle_card = require(`@/assets/images/joker/bicycle_card.png`);
    this.delayFn(() => { this.visible1 = true; }, 500)
    this.delayFn(() => { this.visible2 = true; }, 1000)
    this.delayFn(() => { this.visible3 = true; }, 1500)
    this.delayFn(() => { this.soundOnce = false; }, 2000)
  },
  beforeMount () { },
  mounted () { },
  methods: {
    getImg (data) {
      let suit = data.substring(0, 2);
      let val = data.substring(2);
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

      return require(`@/assets/images/joker/${imgurl}.png`);
    }
  },
  computed: {
    ...mapGetters(['lotterySound'])
  }
}
</script>
<style lang='scss' scoped>
.POKER_zjh {
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