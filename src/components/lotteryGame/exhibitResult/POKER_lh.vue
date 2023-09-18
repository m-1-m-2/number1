<template>
  <div class='POKER_lh w-30 h-42'>
    <img :src="imgurl"
         class="w-inherit h-inherit"
         alt="">
  </div>
</template>
<script>
export default {
  name: 'POKER_lh',
  components: {},
  props: ['data'],
  data () {
    return {
      imgurl: '',
    };
  },
  watch: {},
  created () {
    this.imgurl = this.getImg();
  },
  beforeMount () { },
  mounted () { },
  methods: {
    getImg () {
      let suit = this.data.split(":")[1].substring(0, 2);
      let val = this.data.split(":")[1].substring(2);
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
  computed: {}
}
</script>
<style lang='scss' scoped>
.POKER_lh {
}
</style>