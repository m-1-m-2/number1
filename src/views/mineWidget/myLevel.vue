<template>
  <div class='myLevel absolute top bottom left right'>
    <van-tabs v-model="currentTab"
              animated>
      <van-tab :title="langSwitch('用户等级')"
               name="yh">
      </van-tab>
      <van-tab :title="langSwitch('主播等级')"
               name="zb">
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'myLevel',
  components: {},
  props: [''],
  data () {
    return {
      currentTab: 'yh'
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
.myLevel {
  .van-tabs__wrap {
    height: 36px !important;
  }
}
</style>