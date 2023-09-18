<template>
  <div class='myEquipment absolute top bottom left right'>
    <van-tabs v-model="currentTab"
              animated>
      <van-tab :title="langSwitch('靓号')"
               name="lh">
      </van-tab>
      <van-tab :title="langSwitch('坐骑')"
               name="zq">
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'myEquipment',
  components: {},
  props: [''],
  data () {
    return {
      currentTab: 'lh'
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
.myEquipment {
  .van-tabs__wrap {
    height: 36px !important;
  }
}
</style>