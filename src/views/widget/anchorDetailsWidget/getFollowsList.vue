<template>
  <div class='getFollowsList absolute top bottom left right cl-black fz-12'>
    <div class="w-full h-36 flex box-border bb-1px cl-black">
      <div class="w-36 h-36 flex items-center justify-center">
        <van-icon @click="toBack()"
                  size="20"
                  name="arrow-left" />
      </div>
      <div class="w-303 fz-14 line-36 h-36 text-center">
        {{title}}
      </div>
      <div class="w-36 h-36 line-36 text-center">
      </div>
    </div>
    <div class="absolute top-36 bottom left right scroll-y">
      <div class="w-full h-52 py-8 flex bb-1px box-border"
           v-for="(v, k) in list_data"
           :key="k + 'FansList'">
        <div class="w-16">

        </div>
        <div class="w-36 flex items-center justify-center">
          <img :src="zwfImg"
               v-real-img="v.avatar"
               class="w-36 h-36 rounded"
               alt="">
        </div>
        <div class="flex-1 flex flex-col pl-8 line-18"
             @click="goToAnchorDetails(v)">
          <div class="flex-1 fz-14 flex items-center">
            <div class="">{{v.user_nicename}}</div>
            <img class="h-12 w-12 ml-4"
                 :src="v.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
            <div class="flex-1 flex items-center">
              <img class="h-12 w-26 ml-4"
                   :src="v.level_anchor > 0 && getters_getConfig.levelanchor[v.level_anchor-1].thumb">
              <img class="h-12 w-26 ml-4"
                   :src="v.level > 0 && getters_getConfig.level[v.level-1].thumb">
            </div>
          </div>
          <div class="flex-1 cl-a8a8a8">{{v.signature}}</div>
        </div>
        <div class="w-fit px-10 flex items-center">
          <div class="pl-4 pr-4 pt-2 pb-2 rounded-10 cl-orange"
               :class="[ v.isattention == 0?'': 'followed']"
               @click="toAttention(v)"
               style="border: 1px solid orange;">
            {{ v.isattention == 0? langSwitch('关注'): langSwitch('已关注') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Toast } from 'vant';
export default {
  name: 'getFollowsList',
  components: {},
  props: ['touid'],
  data () {
    return {
      title: this.langSwitch('关注'),
      list_data: '',
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true,
      }) : this.$toast.clear();
    },
  },
  created () {
    let { touid } = this.$route.query;
    this.actions_getFollowsList({ touid }).then(res => {
      this.list_data = res.info
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getFollowsList', 'actions_getUserHome', 'actions_rootStore', 'actions_getSetAttent']),
    goToAnchorDetails (v) {
      let touid = v.id || v.uid;
      this.toRouter('anchorDetails', { touid })
    },
    toAttention (v) {
      let params = { touid: v.id }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          v.isattention = res.info[0].isattent;
        } else {
          Toast(res.msg);
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_getConfig', 'getters_isAppending'])
  }
}
</script>
<style lang='scss' scoped>
.getFollowsList {
  .followed {
    border-color: #f1f1f1 !important;
    color: #f1f1f1 !important;
  }
}
</style>