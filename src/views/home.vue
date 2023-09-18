<template>
  <div class="home absolute top bottom left right">
    <template v-if="!getters_rootStore.langSetAnimate">
      <div class="absolute top left right bottom-50">
        <div class="w-full h-36">
          <homeTopBar></homeTopBar>
        </div>
        <div class="absolute top-36 bottom left right">
          <transition :name="transitionName">
            <router-view />
          </transition>
        </div>
      </div>
      <div class="absolute bottom left right h-50">
        <footerBar></footerBar>
      </div>
    </template>
    <template v-else>
      <div class="__spinner-container">
        <div class="spinner w-54">
          <div class="rect1 mx-2"></div>
          <div class="rect2 mx-2"></div>
          <div class="rect3 mx-2"></div>
          <div class="rect4 mx-2"></div>
          <div class="rect5 mx-2"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import footerBar from "@/components/footerBar";
import homeTopBar from "@/components/homeTopBar";
import { Form } from 'vant';
import store from '@/store'

export default {
  name: 'home',
  components: {
    homeTopBar,
    footerBar,
  },
  props: [''],
  data () {
    return {
      transitionName: 'router'
    };
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
  created () {
    // this.actions_getHot()
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getHot']),
  },
  beforeRouteEnter: (to, from, next) => {
    if (!!from.name) {
      // store.dispatch('actions_getHot');
    }
    next()
    if (from.name == 'mine' && to.query.langSet) {
      // store.dispatch('actions_getConfig')
      // store.dispatch('actions_getBaseInfo')
      // store.dispatch('actions_getTaskList')
      window.location.reload()
    }
  },
  computed: {
    // langSetAnimate
    ...mapGetters(['getters_rootStore'])
  }
}
</script>
<style lang='scss' scoped>
.home {
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
}
</style>