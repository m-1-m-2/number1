<template>
  <div class='NotFound absolute top bottom left right'>
    <div class="w-full h-36">
      <navBar title="404"></navBar>
    </div>
    404页面
  </div>
</template>
<script>
import navBar from "@/components/navBar"
export default {
  name: 'NotFound',
  components: {
    navBar
  },
  props: [''],
  data () {
    return {

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
.NotFound {
}
</style>