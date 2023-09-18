<template>
  <div class='lobbyEmpty absolute top bottom left right'>

  </div>
</template>
<script>
export default {
  name: 'lobbyEmpty',
  components: {},
  props: [''],
  data () {
    return {

    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () {
    let { lottery_type } = this.$route.query;
    this.delayFn(() => {
      this.toBack({ lottery_type });
    }, 300)
  },
  methods: {},
  computed: {}
}
</script>
<style lang='scss'>
.lobbyEmpty {
}
.lobbyEmpty::before {
  content: "";
  display: inline-block;
  background-image: url("~@/assets/images/lobby_bg.jpg");
  background-position: center;
  background-size: cover;
  // background-attachment: fixed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; /* 將 ::before 置於 main 的後方 */
  /* 模糊效果 */
  filter: blur(0px);
}
</style>