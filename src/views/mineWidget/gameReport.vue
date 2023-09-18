<template>
  <div class='gameReport absolute top bottom left right'>
    <van-tabs v-model="currentTab"
              animated>
      <van-tab :title="langSwitch('今天')"
               name="jt">
      </van-tab>
      <van-tab :title="langSwitch('昨天')"
               name="zt">
      </van-tab>
      <van-tab :title="langSwitch('近七天')"
               name="qt">
      </van-tab>
    </van-tabs>
    <div></div>
  </div>
</template>
<script>
export default {
  name: 'gameReport',
  components: {},
  props: [''],
  data () {
    return {
      currentTab: 'jt'
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
<style lang='scss'>
.gameReport {
  .van-tabs__wrap {
    height: 36px !important;
  }
}
</style>