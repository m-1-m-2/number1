<template>
  <div class='result14 absolute top bottom left right flex items-center justify-end'>
    <div v-for="(v,k) in result.split(',')"
         :key="k +'result14'">
      <div class="h-18 w-18 rounded-4 fz-12 line-18 text-center mr-1"
           :style="{ background:`#${colors[v-1]}` }">
        {{v}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result14',
  components: {},
  props: ['result'],
  data () {
    return {
      colors: ['e6dc49', '3d92d7', '4b4b4b', 'ef7d31', '67dfe3', '4b3ff5', 'bfbfbf', 'eb3f25', '6e190b', '57bb37']
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
.result14 {
}
</style>