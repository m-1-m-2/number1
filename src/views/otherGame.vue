<template>
  <div class='otherGame absolute top bottom left right'>
    <div class="h-36 w-full line-36 box-border bb-1px flex">
      <div class="w-36 flex items-center justify-center"
           @click="toBack()">
        <van-icon size="20"
                  name="arrow-left" />
      </div>
      <div class="flex-1 text-center fz-14">
        {{langSwitch('游戏中心')}}
      </div>
      <div class="w-36"></div>
    </div>
    <div class="absolute top-36 bottom left right flex items-center justify-center">
      <div class="absolute top bottom left right scroll-y"
           v-if="gameURI">
        <iframe :src="gameURI"
                frameborder="0"
                class="w-full h-full iframe"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'otherGame',
  components: {},
  props: [],
  data () {
    return {
      gameURI: ''
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () {
    if (this.$route.query && this.$route.query.gameURI) { this.gameURI = this.$route.query.gameURI }
  },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.otherGame {
}
</style>