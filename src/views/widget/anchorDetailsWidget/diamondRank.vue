<template>
  <div class='diamondRank'>
    <div class="w-full h-36 flex box-border bb-1px cl-black">
      <div class="w-36 h-36 flex items-center justify-center">
        <van-icon @click="$emit('isDetailsShowFn')"
                  size="20"
                  name="arrow-left" />
      </div>
      <div class="flex-1 fz-14 flex items-center justify-center">
        {{title}}
      </div>
      <div class="w-36 h-36 line-36 text-center">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'diamondRank',
  components: {},
  props: [''],
  data () {
    return {
      title: this.langSwitch('礼物贡献榜')
    };
  },
  watch: {},
  created () {
    this.actions_getDayGiftRank()
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getDayGiftRank',])
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.diamondRank {
}
</style>