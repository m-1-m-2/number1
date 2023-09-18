<template>
  <div id="app">
    <offlineHandler></offlineHandler>
    <layout v-if="UID && TOKEN">
      <slot>
        <transition :name="transitionName">
          <router-view />
        </transition>
      </slot>
    </layout>
    <login v-else></login>
    <!-- <audio src="~@/assets/music/bet.mp3"
           ref="startVideo"
           hidden></audio> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { Locale } from 'vant';
import { en, id, ja, vi, zhCN, zhTW } from "@/locale/vant";
import layout from "@/components/layout";
import offlineHandler from "@/components/offlineHandler";
import login from "@/views/login";
import { BootNoZoomL } from '@/utils';

export default {
  name: 'app',
  data () {
    return {
      transitionName: "router",
    }
  },
  created () { },
  components: {
    layout,
    login,
    offlineHandler,
  },
  watch: {
    //使用watch 监听$router的变化
    '$route' (to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (!from.name) return;
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else if (to.meta.index == from.meta.index) {
        this.transitionName = 'router';
      } else {
        this.transitionName = 'slide-right';
      }
    },
  },
  computed: {
    ...mapGetters(['getters_rootStore', "UID", "TOKEN"]),
  },
  mounted () {
    BootNoZoomL();
    this.init();
    if (this.getMasterSwitch()) {
      // console.log(this.getMasterSwitch());
      if (this.getMasterSwitch() == 'true' || this.getMasterSwitch() == true) {
        this.actions_rootStore({ key: 'masterSwitch', val: true });
      } else {
        this.actions_rootStore({ key: 'masterSwitch', val: false });
      }
    }
  },
  methods: {
    ...mapActions(['actions_rootStore']),
    getMasterSwitch () {
      let geturl = window.location.href;
      let getqyinfo = geturl.split('?')[1]
      let getqys = new URLSearchParams('?' + getqyinfo)
      let getMasterSwitch = getqys.get('switch');
      return getMasterSwitch || '';
    },
    startVideosound () {
      // this.$refs.startVideo.play()
    },
    init () {
      let vantLocale = {
        'en': en,
        'ja': ja,
        'vi': vi,
        'id': id,
        'zh-CN': zhCN,
        'zh-TW': zhTW,
      }
      let value = this.getters_rootStore.lang;
      if (!!value) {
        Locale.use(value, vantLocale[value]);
        this.$i18n.locale = value;
        document.documentElement.setAttribute('lang', value); // 设置lang属性
      } else {
        let lang_Array = ['en', 'id', 'vi', 'zh-CN', 'zh-TW', 'ja'];
        let value = window.navigator.language || window.navigator.userLanguage;
        if (!lang_Array.includes(value)) value = 'vi';
        this.actions_rootStore({ key: 'lang', val: value });
        Locale.use(value, vantLocale[value]);
        this.$i18n.locale = value;
        document.documentElement.setAttribute('lang', value); // 设置lang属性
      }
    },
  }
}
</script>

<style lang="scss">
// 隐藏元素滚动条
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.router-enter-active,
.router-leave-active {
  transition: opacity 0.6s;
}
.router-enter,
.router-leave-active {
  opacity: 0;
}
.router {
  position: absolute;
  transition: all 0.6s ease;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s ease;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

// 固定加载模拟的图标位置
.van-toast {
  position: absolute !important;
  top: 40% !important;
}

.van-dropdown-menu__bar {
  box-shadow: 0 0px 0px !important;
}
</style>
