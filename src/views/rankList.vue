<template>
  <div class='rankList absolute top bottom left right flex flex-col'>
    <!-- top 3 -->
    <div class="flex-1 w-full relative imgBlur cl-white flex flex-col">
      <div class="w-full h-36 flex">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="toBack()"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 fz-14 flex items-center justify-center">
          <div class="w-200 h-36 flex text-center">
            <div class="flex-1 flex items-center justify-center"
                 v-for="(v, k) in mainList"
                 @click="switchMain(v.option)"
                 :key="k">
              <div class="w-full h-24 line-24 rounded-4"
                   :class="[mainActive == v.option ? 'mainActive': '']">{{v.title}}</div>
            </div>
          </div>
        </div>
        <div class="w-36 h-36"></div>
      </div>
      <div class="w-full h-36 flex fz-12 children">
        <div class="flex-1 flex items-center justify-center"
             v-for="(v, k) in typeList"
             :key="k">
          <div class="h-18 w-fit px-4 text-center line-20 rounded-4"
               :class="[v.option === typeActive ? 'active': '']"
               @click="typeActive = v.option">
            {{v.title}}
          </div>
        </div>
      </div>
      <div class="flex-1 flex list_order">
        <div class="flex-1 mt-40 h-180 flex items-center justify-center"
             v-for="(v, k) in currentList.slice(0, 3)"
             :key="k + 'top3'">
          <div class="w-100 h-180">
            <div class="w-100 h-70">
              <img v-real-img="v.avatar_thumb"
                   :src="zwfImg"
                   @click="goToAnchorDetails(v)"
                   class="w-66 h-66 rounded block margin-auto"
                   alt="">
            </div>
            <div class="w-100 h-80 fz-14 text-center">
              <div class="h-24 w-inherit line-24 text-center van-ellipsis">{{v.user_nicename}}</div>
              <div class="h-20 w-inherit line-20 text-center fz-12 flex items-center justify-center">
                <img class="h-12 w-12"
                     :src="v.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                <template v-if="mainActive == 'getProfitList'">
                  <img class="h-12 w-26 ml-4"
                       :src="v.levelAnchor> 0 && getters_getConfig.levelanchor[v.levelAnchor-1].thumb" />
                </template>
                <template v-else>
                  <img class="h-12 w-26 ml-4"
                       :src="v.level> 0 && getters_getConfig.level[v.level-1].thumb" />
                </template>
              </div>
              <div class="flex justify-center">
                <div class="h-20 w-fit px-4 rounded-8 line-20 text-center fz-10 ba-1px"
                     @click="toAttention(v)"
                     :class="[v.isAttention == 0 ?'followStyle': '']">{{v.isAttention == 0 ? langSwitch('关注'): langSwitch('已关注')}}</div>
              </div>
            </div>
            <div class="w-100 h-30 line-60 text-center fz-14">{{v.totalcoin}}{{langSwitch('钻石')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="flex-1 relative cl-a8a8a8">
      <div class="absolute top bottom left right box-border px-8 box-border">
        <div class="h-50 w-full px-10 box-border flex mt-10 ba-1px rounded-8"
             v-for="(v,k) in currentList.slice(3)"
             :key="k + 'list'">
          <div class="flex-1 flex"
               @click="goToAnchorDetails(v)">
            <div class="w-20 h-50 fz-12 line-50 text-center">{{ k + 4}}</div>
            <div class="w-50 h-50 flex items-center justify-center">
              <img v-real-img="v.avatar_thumb"
                   :src="zwfImg"
                   class="w-40 h-40 rounded"
                   alt="">
            </div>
            <div class="flex-1 h-50 px-8 box-border flex">
              <div class="flex-1">
                <div class="w-full h-20 line-20 mt-5 fz-12 bolder">
                  {{v.user_nicename}}
                </div>
                <div class="w-full h-20 line-20 mb-5 fz-12 flex items-center">
                  <template v-if="mainActive == 'getProfitList'">
                    <img class="h-12 w-26"
                         :src="v.levelAnchor> 0 && getters_getConfig.levelanchor[v.levelAnchor-1].thumb" />
                  </template>
                  <template v-else>
                    <img class="h-12 w-26"
                         :src="v.level > 0 && getters_getConfig.level[v.level-1].thumb" />
                  </template>
                  <img class="h-12 w-12 ml-4"
                       :src="v.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                </div>
              </div>
              <div class="w-100 fz-12 line-50 h-50 text-right">
                {{v.totalcoin}} {{langSwitch('钻石')}}
              </div>
            </div>
          </div>
          <div class="w-60 fz-10 flex items-center justify-center">
            <div class="pt-4 pb-4 pl-10 pr-10 ba-1px rounded-12"
                 @click="toAttention(v)"
                 :class="[v.isAttention == 0 ?'followStyle': '']">
              {{v.isAttention == 0 ?langSwitch('关注'):langSwitch('已关注')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- commonPopup -->
    <commonPopup :isShow="isShow"
                 @changeIsShow="isShow = false;"
                 :isNavBar="false"
                 :currentTabComponent="currentTabComponent"></commonPopup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import commonPopup from "@/components/commonPopup";
import { Toast } from 'vant';
export default {
  name: 'rankList',
  components: { commonPopup },
  props: [''],
  data () {
    return {
      mainActive: 'getProfitList',
      mainList: [
        { title: this.langSwitch('收益榜'), option: 'getProfitList' },
        { title: this.langSwitch('贡献榜'), option: 'getConsumeList' },
      ],
      typeList: [
        { title: this.langSwitch('日榜'), option: 'day' },
        { title: this.langSwitch('昨日榜'), option: 'yesterday' },
        { title: this.langSwitch('周榜'), option: 'week' },
        { title: this.langSwitch('月榜'), option: 'month' },
      ],
      typeActive: 'day',
      currentList: '',
      isShow: false,
      currentTabComponent: 'anchorDetails',
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {
    SWITCHTAB: {
      handler (val) {
        let { mainActive, typeActive } = val;
        let params = { type: typeActive }
        this[`actions_${mainActive}`](params).then(res => {
          this.currentList = res.info;
        })
      },
      deep: true
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
    let params = { type: 'day' };
    this.actions_getProfitList(params).then(res => {
      this.currentList = res.info;
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getProfitList', 'actions_getConsumeList', 'actions_rootStore', 'actions_getUserHome', 'actions_getSetAttent']),
    goToAnchorDetails (v) {
      let touid = v.id || v.uid;
      this.toRouter('anchorDetails', { touid })
    },
    switchMain (option) {
      this.mainActive = option;
      this.typeActive = 'day';  // typeActive已经被watch;
    },
    toAttention (v) {
      let params = { touid: v.uid }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          v.isAttention = res.info[0].isattent;
        } else {
          Toast(res.msg);
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_getProfitList', 'getters_isAppending', 'getters_getConfig']),
    SWITCHTAB () {
      const { mainActive, typeActive } = this;
      return {
        mainActive,
        typeActive
      }
    }
  },
  beforeDestroy () {
    this.$toast.clear();
  }
}
</script>
<style lang='scss' scoped>
.rankList {
  .mainActive {
    background: #fff;
    color: blue;
  }
  .children {
    .active {
      border: 1px solid white;
    }
  }
  .followStyle {
    color: orange;
    border-color: orange;
  }
  .list_order {
    & > div:nth-child(1) {
      order: 2;
      position: relative;
      top: -30px;
    }
    & > div:nth-child(2) {
      order: 1;
      position: relative;
      top: -8px;
    }
    & > div:nth-child(3) {
      order: 3;
    }
  }
  .imgBlur::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/rank_bg.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -10; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    // filter: blur(6px);
  }
}
</style>