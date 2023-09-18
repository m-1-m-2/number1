<template>
  <div class='firstRecharge'>
    <van-popup :closeable="true"
               v-model="show">
      <div class="w-320 h-520 bg-white rounded-12 scroll-hide">
        <div class="w-inherit h-inherit">
          <img src=""
               alt="">
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'firstRecharge',
  components: {},
  props: [''],
  data () {
    return {
      show: true
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.firstRecharge {
  .van-popup {
    background-color: transparent;
  }
}
</style>