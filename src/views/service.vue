<template>
  <div class='service absolute top bottom left right'>
    <div class="h-36 w-full"
         v-if="!isComponentLoad">
      <navBar :title="langSwitch('在线客服系统')"></navBar>
    </div>
    <div class="absolute bottom left right"
         :class="[!isComponentLoad?'top-36':'top']">
      <div class="absolute top bottom left right">
        <iframe :src="getters_getBaseInfo.chat_service_url.replace('{name}', getters_getBaseInfo.user_nicename).replace('{uid}', getters_getBaseInfo.id)"
                frameborder="0"
                class="w-full h-full"
                id="iframe"></iframe>
      </div>
    </div>
  </div>
</template> 
<script>
import navBar from "@/components/navBar"
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'service',
  components: { navBar },
  props: {
    isComponentLoad: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
    };
  },
  watch: {},
  created () {
  },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {
    ...mapGetters(['getters_getBaseInfo'])
  }
}
</script>
<style lang='scss' scoped>
.service {
}
</style>