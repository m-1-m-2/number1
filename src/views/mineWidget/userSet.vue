<template>
  <div class='userSet absolute top bottom left right'>
    <van-cell-group>
      <van-cell :title="langSwitch('语言设置')"
                @click="showPopup(langSwitch('语言设置'), 'langSet')"
                is-link />
    </van-cell-group>
    <!-- 退出登录 -->
    <div class="mt-30 w-full px-20 box-border">
      <van-button block
                  @click="signOut"
                  color="linear-gradient(to right, #EF4B8D, #EF4B8D)">
        {{langSwitch('退出登录')}}
      </van-button>
    </div>
    <div @click="vipEvent"
         class="h-360 w-full"></div>

    <!-- 页面弹框组件 -->
    <van-popup v-model="isUserSetShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="h-36 w-full">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center">
            <van-icon @click="isUserSetShow = false"
                      size="20"
                      name="arrow-left" />

          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span v-text="popupTitle"></span>
          </div>
          <div class="w-36 h-36 text-center">
          </div>
        </div>
      </div>
      <div class="absolute top-36 bottom left right">
        <component v-bind:is="currentTabComponent"></component>
      </div>
    </van-popup>
  </div>
</template>
<script>
import langSet from "./userSetWidget/langSet";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'userSet',
  components: {
    langSet
  },
  props: [''],
  data () {
    return {
      isUserSetShow: false,
      popupTitle: '',
      currentTabComponent: '',
      vipEventCount: 0,
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapMutations(['mutations_rootStore']),
    showPopup (title, component) {
      this.isUserSetShow = true;
      this.popupTitle = title;
      this.currentTabComponent = component
    },
    signOut () {
      // Toast(this.langSwitch('退出成功'));
      setTimeout(() => {
        this.toRouter('home')
        this.mutations_rootStore({ key: 'uid', val: '' });
        this.mutations_rootStore({ key: 'token', val: '' });
        this.mutations_rootStore({ key: 'isUserSignOut', val: true });
      }, 1000);
    },
    vipEvent () {
      this.vipEventCount++;
      if (this.vipEventCount >= 5) {
        this.mutations_rootStore({ key: 'isCheckPayRoom', val: true });
        Toast('!')
      }
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.userSet {
}
</style>