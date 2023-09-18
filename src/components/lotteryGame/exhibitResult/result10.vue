<template>
  <div class='result10 absolute top bottom left right relative'
       style="left:-4px;">
    <div class="w-100vw h-60 bg-white absolute flex"
         style="left: -100%">
      <!-- 倒计时 -->
      <div class="absolute w-160 h-30 line-30 pl-8 box-border flex"
           v-if="show"
           style="top:-30px">
        百人牛牛截止：
        <div class="flex cl-orange"
             v-if="!(getters_publicTime < 1)">
          {{getters_publicTime < 10 ? '0':''}}{{getters_publicTime}}&nbsp;秒
        </div>
        <div class="cl-orange"
             v-else>
          开奖中
        </div>
      </div>

      <div class="flex-1 flex flex-col bg-blue relative">
        <div class="h-16 text-center line-16">蓝</div>
        <div class="flex-1 flex">
          <div v-for="(v,k) in blue.pai"
               class="flex items-center justify-center flex-1"
               :key="k+'blue'">
            <div class="h-42 w-30">
              <img :src="getImg(v)"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
          </div>
        </div>
        <!--  -->
        <div class="absolute w-full h-full flex justify-center items-end"
             v-if="show">
          <div class="h-30 w-100 relative">
            <img src="~@/assets/images/nn_result_bg.png"
                 class="h-30"
                 alt="">
            <div class="w-100 h-30 absolute top left line-30 text-center cl-DA3E32">
              {{blue.niu}}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col bg-red relative">
        <div class="h-16 text-center line-16">红</div>
        <div class="flex-1 flex">
          <div v-for="(v,k) in red.pai"
               class="flex items-center justify-center flex-1"
               :key="k+'red'">
            <div class="h-42 w-30">
              <img :src="getImg(v)"
                   class="w-inherit h-inherit"
                   alt="">
            </div>
          </div>
        </div>
        <!--  -->
        <div class="absolute w-full h-full flex justify-center items-end"
             v-if="show">
          <div class="h-30 w-100 relative">
            <img src="~@/assets/images/nn_result_bg.png"
                 class="h-30"
                 alt="">
            <div class="w-100 h-30 absolute top left line-30 text-center cl-DA3E32">
              {{red.niu}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'result10',
  components: {},
  props: ['result', 'show', 'val', 'niu'],
  data () {
    return {
      blue: '',
      red: '',
    };
  },
  watch: {
    result (n, o) {
      // console.log(n);
      // 蓝方:梅花3,梅花J,方块2,梅花6,方块K|红方:黑桃7,梅花5,黑桃Q,梅花2,方块5
      if (n) {
        let blueArray = n.split('|')[0].split(':')[1].split(',');
        let redArray = n.split('|')[1].split(':')[1].split(',');
        this.blue.pai = blueArray;
        this.red.pai = redArray;
        this.blue.niu = this.niu.blueNiu;
        this.red.niu = this.niu.redNiu;
      }
    }
  },
  created () {
    this.blue = this.getters_getBetViewInfo.lastResult.vs.blue;
    this.red = this.getters_getBetViewInfo.lastResult.vs.red;
    // console.log(this.getters_getBetViewInfo.lastResult.vs.blue)
    // console.log(this.getters_getBetViewInfo.lastResult.vs.red)
    if (this.show == false) { this.blue = this.val.vs.blue; this.red = this.val.vs.red; }
  },
  updated () {

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
      return require(`@/assets/images/joker/${imgurl}.png`);;
    }
  },
  computed: {
    ...mapGetters(['getters_getBetViewInfo', 'getters_publicTime'])
  }
}
</script>
<style lang='scss' scoped>
.result10 {
}
</style>