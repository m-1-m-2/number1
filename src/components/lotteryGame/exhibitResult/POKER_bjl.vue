<template>
  <div class="POKER_bjl h-42 flex"
       :class="[direction == 'left'? 'flex-row-reverse':'']">
    <div class='w-30 h-42 mx-2 relative'
         v-for="(v, k) in imgurl"
         :key="k+ 'imgurl'">
      <img :src="v"
           :class="[k == 2? 'rotate': '', direction == 'left'? 'right-6': 'left-6']"
           class="w-inherit h-inherit"
           alt="">
    </div>
  </div>

</template>
<script>
export default {
  name: 'POKER_bjl',
  components: {},
  props: ['data', 'direction'],
  data () {
    return {
      imgurl: '',
    };
  },
  watch: {},
  created () {
    this.imgurl = this.getImg_array();
  },
  beforeMount () { },
  mounted () { },
  methods: {
    getImg_array () {
      let getImg_arr = [];
      let suit_array = this.data.split(":")[1].split(',');
      suit_array.forEach(element => {
        let suit = element.substring(0, 2);
        let val = element.substring(2);
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
        getImg_arr.push(require(`@/assets/images/joker/${imgurl}.png`));
      });

      return getImg_arr;
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.POKER_bjl {
  .rotate {
    transform: rotate(90deg);
    position: absolute;
    bottom: -5px;
  }
}
</style>