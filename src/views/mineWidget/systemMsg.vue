<template>
  <div class='systemMsg absolute top bottom left right scroll-y px-10 box-border fz-12'>
    <div class="w-full flex flex mt-10 box-border"
         v-for="(v, k) in msg"
         :key="k + 'msg'">
      <div class="w-50">
        <div class="w-40 h-40">
          <img :src="logoUrl"
               class="w-full h-full"
               alt="">
        </div>
      </div>
      <div class="flex-1 pl-4 pr-4 box-border bb-1px cl-a8a8a8">
        <div class="w-full h-20 fz-14 cl-black">{{langSwitch('系统消息')}}</div>
        <div class="line-16">{{v.content}}</div>
        <div class="py-10 line-12">{{v.addtime}}</div>
      </div>
    </div>
    <div class="h-40 line-40 text-center w-full fz-12">{{langSwitch('没有更多了哦')}}</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'systemMsg',
  components: {},
  props: [''],
  data () {
    return {
      msg: '',
      logoUrl: ''
    };
  },
  watch: {},
  created () {
    this.actions_getMessage_getList().then((res) => {
      this.msg = res.info;
    })
    this.logoUrl = require('@/assets/images/logo.jpeg')
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getMessage_getList'])
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.systemMsg {
}
</style>