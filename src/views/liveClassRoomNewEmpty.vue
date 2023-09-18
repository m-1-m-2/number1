<template>
  <div class='liveClassRoomNewEmpty absolute top bottom left right'>

  </div>
</template>
<script>
export default {
  name: 'liveClassRoomNewEmpty',
  components: {},
  props: [''],
  data () {
    return {

    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () {
    this.delayFn(() => { this.toBack(); }, 300)
  },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.liveClassRoomNewEmpty {
}
</style>