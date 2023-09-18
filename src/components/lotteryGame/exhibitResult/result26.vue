<template>
  <div class='result26 absolute top bottom left right flex'>
    <!-- <div class="flex-1 flex items-center justify-center">
      <div class="w-11 h-11 relative"
           :class="[result.split(',')[0] == 1 || result.split(',')[0] == 4 ? 'bg-red': 'bg-black']">
        <div class="iconfont icon fz-16 absolute"
             style="top: -3px; left: -3px;"
             :class="[`icon-touzi${result.split(',')[0]}`]"></div>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <div class="w-11 h-11 relative"
           :class="[result.split(',')[1] == 1 || result.split(',')[1] == 4 ? 'bg-red': 'bg-black']">
        <div class="iconfont icon fz-16 absolute"
             style="top: -3px; left: -3px;"
             :class="[`icon-touzi${result.split(',')[1]}`]"></div>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <div class="w-11 h-11 relative"
           :class="[result.split(',')[2] == 1 || result.split(',')[2] == 4 ? 'bg-red': 'bg-black']">
        <div class="iconfont icon fz-16 absolute"
             style="top: -3px; left: -3px;"
             :class="[`icon-touzi${result.split(',')[2]}`]"></div>
      </div>
    </div> -->
    <!-- <template v-for="(v,k) in list"> -->
    <!-- <div :key="k +'result26'"
           class="flex-1 flex items-center justify-center">
        <img :src="require(`@/assets/images/k3_${v}.png`)"
             class="w-16 h-16"
             alt="">
      </div> -->
    <!-- </template> -->
    <template v-if="!!result">
      <div class="flex-1 flex items-center justify-center">
        <img :src="require(`@/assets/images/k3_${result.split(',')[0]}.png`)"
             class="w-16 h-16"
             alt="">
      </div>
      <div class="flex-1 flex items-center justify-center">
        <img :src="require(`@/assets/images/k3_${result.split(',')[1]}.png`)"
             class="w-16 h-16"
             alt="">
      </div>
      <div class="flex-1 flex items-center justify-center">
        <img :src="require(`@/assets/images/k3_${result.split(',')[2]}.png`)"
             class="w-16 h-16"
             alt="">
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'result26',
  components: {},
  props: ['result'],
  data () {
    return {};
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {

  }
}
</script>
<style lang='scss' scoped>
.result26 {
}
</style>