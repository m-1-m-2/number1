<template>
  <div class='result11 absolute top bottom left right flex items-center'
       :class="[order? '': 'justify-end']">
    <div class="flex">
      <div v-for="(v, k) in result.split(',')"
           class="w-36 h-36 rounded bg-DA3E32 line-36 text-center"
           :key="k">
        {{v}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result11',
  components: {},
  props: ['result', 'order'],
  data () {
    return {

    };
  },
  watch: {},
  created () {
    console.log(this.result)
  },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.result11 {
}
</style>