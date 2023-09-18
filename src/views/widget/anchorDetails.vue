<template>
  <div class='anchorDetails absolute top bottom left right cl-white scroll-y'>
    <div class="w-full h-204 imgBlur"
         :style="{'--bgurl': `url(${obj_data.avatar})`}">
      <div class="w-full h-36 flex">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="toBack()"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 fz-14 flex items-center justify-center"></div>
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon size="20"
                    name="share-o" />
        </div>
      </div>
      <div class="w-full h-80 flex items-center justify-center">
        <div class="h-80 w-full px-10 box-border flex">
          <div class="w-50 h-50 rounded self-center">
            <img v-real-img="obj_data.avatar_thumb"
                 :src="zwfImg"
                 class="w-full h-full rounded"
                 alt="">
          </div>
          <div class="flex-1 h-60 px-8 box-border self-center">
            <div class="w-full h-20 line-20  fz-14 bolder">
              {{obj_data.user_nicename}}
            </div>
            <div class="w-full h-20 line-20 fz-12 flex items-center">
              <!-- <div class="iconfont icon"
                   :class="[obj_data.sex == 1? 'icon-nan cl-blue': 'icon-nv cl-red']"></div> -->
              <img class="h-12 w-12"
                   :src="obj_data.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
              <img class="h-12 w-26 ml-4"
                   :src="obj_data.level_anchor > 0 && getters_getConfig.levelanchor[obj_data.level_anchor-1].thumb" />
              <img class="h-12 w-26 ml-4"
                   :src="obj_data.level > 0 && getters_getConfig.level[obj_data.level-1].thumb" />
            </div>
            <div class="
                   w-full
                   h-20
                   line-20
                   fz-12">
              ID:{{obj_data.id}}
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="w-full h-50 line-50 fz-12 px-10 box-border flex">
        <span @click="toRouter('getFansList', { touid: obj_data.id})">{{ obj_data.fans }} {{langSwitch('粉丝')}}</span>
        <span class="w-20 relative">
          <div class="w-1 h-24 bg-white absolute top-13 left-10"></div>
        </span>
        <span @click="toRouter('getFollowsList', { touid: obj_data.id})">{{ obj_data.follows }} {{langSwitch('关注')}}</span>
      </div>
      <!-- signature -->
      <div class="w-full h-24 line-24 px-10 box-border fz-12">
        {{obj_data.signature}}
      </div>
    </div>
    <div class="w-full absolute top-204 bottom left right bg-white cl-black">
      <!-- 主播印象 -->
      <div class="w-full px-12 box-border h-80 bb-1px">
        <div class="fz-14 line-40 h-40">{{langSwitch('主播印象')}}</div>
        <div class="fz-12 h-40 line-40 w-full relative">
          <div class="absolute top bottom left right flex scroll-x">
            <div class="w-fit h-30 line-22 box-border cl-white pl-8 pr-8 pt-4 pb-4 mr-8 rounded-4"
                 v-for="(v) in obj_data.label"
                 :key="v.id"
                 :style="{'background': v.colour}"
                 style="flex-shrink: 0;">
              {{v.name}}
            </div>
            <div class="w-fit h-30 line-22 box-border cl-orange pl-8 pr-8 pt-4 pb-4 rounded-4"
                 @click="isDetailsShow = true; currentTabComponent='addImpression';"
                 style="border: 1px solid orange;flex-shrink: 0;">{{langSwitch('添加印象')}}</div>
          </div>
        </div>
      </div>
      <!-- 钻石榜 -->
      <div class="w-full h-44 line-44 box-border bb-1px flex fz-14 px-12">
        <div class="flex-1 flex">
          <div class="flex items-center mr-8">
            <img src="~@/assets/images/person_rank@2x.png"
                 class="h-16 w-16"
                 alt="">
          </div>
          {{langSwitch('钻石贡献榜')}}
        </div>
        <div class="flex-1 flex"
             @click="isDetailsShow = true; currentTabComponent='diamondRank';">
          <div class="flex-1  flex justify-end items-center">
            <img v-real-img="v.avatar"
                 :src="zwfImg"
                 class="h-24 w-24 rounded mx-4 ba-1px box-border"
                 v-for="(v, k) in obj_data.contribute"
                 :key="k + 'contribute'"
                 alt="">
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!-- 守护榜 -->
      <div class="w-full h-44 line-44 box-border bb-1px flex fz-14 px-12">
        <div class="flex-1 flex">
          <div class="flex items-center mr-8">
            <img src="~@/assets/images/person_shouhu@2x.png"
                 class="h-16 w-16"
                 alt="">
          </div>
          {{langSwitch('守护榜')}}
        </div>
        <div class="flex-1 flex"
             @click="isDetailsShow = true; currentTabComponent='guardRank';">
          <div class="flex-1 flex justify-end items-center">
            <img v-real-img="v.avatar"
                 :src="zwfImg"
                 class="h-24 w-24 rounded mx-4 ba-1px box-border"
                 v-for="(v, k) in obj_data.guardlist"
                 :key="k +'guardlist'"
                 alt="">
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>

      <!-- 视频 & 直播 -->
      <div>
        <!-- tabs -->
        <div class="h-36 flex line-36 fz-12 text-center bt-1px bb-1px">
          <div class="flex-1 relative"
               @click="tab_check_index = 'videolist'"
               :class="[tab_check_index == 'videolist' ? 'active': '']">{{langSwitch('视频')}} {{ obj_data.videonums }}</div>
          <div class="flex-1 relative"
               @click="tab_check_index = 'liverecord'"
               :class="[tab_check_index == 'liverecord' ? 'active': '']">{{langSwitch('直播')}} {{ obj_data.livenums }}</div>
        </div>
        <!-- content -->
        <div>
          <div v-for="(v,k) in obj_data[tab_check_index]"
               class="h-48 px-12 box-border flex fz-12 bb-1px"
               :key="k">
            <div class="flex-1">
              <div class="h-24 line-30">{{v.title? v.title: langSwitch('无标题')}} </div>
              <div class="h-24 line-24 fz-10">{{v.datestarttime}}</div>
            </div>
            <div class="flex-1 text-right">
              <div class="h-24 line-30">{{v.nums}}</div>
              <div class="h-24 line-24 fz-10">{{langSwitch('人看过')}}</div>
            </div>
          </div>
          <!-- 底部抬高 -->
          <div class="h-44"></div>
        </div>
      </div>
    </div>
    <!-- 关注 & 拉黑 -->
    <div class="h-46 w-full fixed left right flex cl-black fz-12 line-44 text-center box-border bt-1px bb-1px bg-white"
         style="bottom:-2px">
      <div class="flex-1"
           @click="toAttention">{{ obj_data.isattention == 0? langSwitch('关注'): langSwitch('已关注') }}</div>
      <div class="flex-1">{{langSwitch('拉黑')}}</div>
    </div>

    <!-- 页面弹框组件 -->
    <van-popup v-model="isDetailsShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right">
        <component v-bind:is="currentTabComponent"
                   :touid="obj_data.id"
                   @isDetailsShowFn="isDetailsShow = false"></component>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { guardRank, diamondRank, addImpression, getFollowsList } from './anchorDetailsWidget'
import store from '@/store'
import { Toast } from 'vant'

export default {
  name: 'anchorDetails',
  components: { guardRank, diamondRank, addImpression, getFollowsList },
  props: [''],
  data () {
    return {
      obj_data: '',
      isDetailsShow: false,
      currentTabComponent: '',
      tab_check_index: 'videolist',
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {
    isDetailsShow (n) {
      if (!n) this.currentTabComponent = '';
    },
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    },
  },
  created () {
    this.$toast.clear();
  },
  beforeMount () { },
  mounted () { this.obj_data = this.getters_getUserHome; },
  methods: {
    ...mapActions(['actions_getUserHome', 'actions_rootStore', 'actions_getSetAttent']),
    toAttention () {
      let params = { touid: this.obj_data.id }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          this.obj_data.isattention = res.info[0].isattent;
        } else {
          Toast(res.msg);
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'getters_getConfig', 'getters_isAppending', 'getters_getUserHome'])
  },
  beforeRouteEnter: (to, from, next) => {
    let { touid } = to.query;
    let params = { touid };
    params.next = next;
    store.dispatch('actions_getUserHome', params);
  },
  beforeDestroy () {
    this.$toast.clear();
  }
}
</script>
<style lang='scss' scoped>
.anchorDetails {
  .imgBlur::before {
    content: "";
    display: inline-block;
    background-image: var(--bgurl);
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 70%;
    left: 0;
    z-index: -10; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    // filter: blur(6px);
  }
  .imgBlur::after {
    content: "";
    display: inline-block;
    background: rgba(0, 0, 0, 0.5);
    // background-image: var(--bgurl);
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 70%;
    left: 0;
    z-index: -8; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    // filter: blur(6px);
  }
  .active::before {
    content: "";
    width: 20px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 4px;
    left: 0;
    margin: 0 auto;
    border-bottom: 2px solid orange;
  }
}
</style>