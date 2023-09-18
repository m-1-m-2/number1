<template>
  <div class='navBar absolute top bottom left right'>
    <div class="w-full h-36 flex box-border van-hairline--bottom">
      <div class="w-36 h-36 flex items-center justify-center">
        <template v-if="!isBackIcon">
          <van-icon @click="toBack()"
                    size="20"
                    name="arrow-left" />
        </template>
      </div>
      <div class="flex-1 fz-14 flex items-center justify-center">
        <span v-text="title"></span>
      </div>
      <div class="w-36 h-36 flex items-center text-center">
        <template v-if="!isServiceIcon">
          <!-- <van-icon @click="$emit('showPopup_service')"
                    tag="span"
                    size="20"
                    name="chat-o" /> -->
          <div class="h-24 w-58 absolute right-4 bottom-5"
               @click="$emit('showPopup_service')">
            <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_ic_kefu.png`)"
                 class="h-full w-full"
                 alt="">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'navBar',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isServiceIcon: false,
      isBackIcon: false,
    };
  },
  watch: {},
  created () {
  },
  beforeMount () {
  },
  mounted () {
    let { name, query } = this.$route;

    this.isServiceIcon = name == 'service';
    if ((name == 'recharge' && !query.back) || name == 'game') {
      this.isBackIcon = true
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['LANG'])
  }
}
</script>
<style lang='scss' scoped>
.navBar {
}
</style>