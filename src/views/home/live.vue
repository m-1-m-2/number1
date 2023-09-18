<template>
  <div class='live absolute bottom left right top top scroll-y'>
    <div class="w-full h-188">
      <van-swipe class="h-188"
                 :autoplay="3000"
                 :show-indicators="false"
                 indicator-color="white">
        <van-swipe-item v-for="(v, index) in getters_getBaseInfo.adlist.filter(obj => obj.pos == 2)"
                        :key="index + 'swipe'">
          <img class="w-full h-full"
               @click="showLivePopupIframe(v)"
               style="object-fit: contain;"
               :src="v.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="w-full h-30"
         @click="showNotice(getters_getBaseInfo.live_ad_text)">
      <van-notice-bar left-icon="volume-o"
                      background="#FFFFFF"
                      color="#686868"
                      class="h-20"
                      :text="getters_getBaseInfo.live_ad_text" />
    </div>
    <div class="w-full h-108"
         v-if="masterSwitch">
      <div class="w-full h-28">
        <div class="w-full h-24 line-24 fz-14 mt-4 flex px-12 box-border">
          <div class="flex-1 relative bolder">{{langSwitch('游戏推荐')}}</div>
          <div class="flex-1 fz-12 text-right cl-a8a8a8"
               @click="toRouter('game')">{{langSwitch('左滑更多')}}</div>
        </div>
      </div>
      <div class="w-full h-80 flex scroll-x">
        <div class="flex flex-col"
             style="flex-shrink: 0; width: 25%;"
             v-for="(v, k) in getters_getConfig.ad_list.filter((v)=>v.type == 'game')"
             :key="k+'gameRecommendation'">
          <div class="h-60 w-full flex justify-center items-center">
            <div class="h-58 w-58 rounded"
                 @click="enterSelectGame(v)">
              <img :src="v.src"
                   class="h-58 w-58 rounded"
                   alt="">
            </div>
          </div>
          <div class="h-20 w-full fz-10 line-20 text-center cl-a8a8a8">
            {{v.desc}}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-50 relative">
      <div class="w-full h-4 bg-white"></div>
      <div class="flex">
        <div class="w-full h-46 flex scroll-hide flex-1">
          <div class="currentRegion relative h-44"
               style="flex-shrink: 0; width:20%">
            <div class="h-28 w-full flex items-center justify-center">
              <div class="w-24 h-24 rounded relative"
                   v-if="getters_getHot.length != 0">
                <img :src="getters_getHot.live_current_region.icon"
                     alt=""
                     class="w-24 h-24 absolute top left">
              </div>
            </div>
            <div class="h-16 w-full fz-12 line-16 text-center"
                 v-if="getters_getHot.length != 0">
              {{getters_getHot.live_current_region.name}}
            </div>
          </div>
          <!-- 需要外层添加template -->
          <template v-if="getters_getHot.length != 0">
            <template v-for="(v,k) in getters_getHot.live_support_regions">
              <div style="flex-shrink: 0; width: 20%;"
                   :key="k"
                   class="h-44"
                   v-if="getters_getHot.live_current_region.name != v.name">
                <div class="h-28 w-full flex items-center justify-center">
                  <div class="w-24 h-24 rounded relative"
                       @click="selectRegion(v.countryCode)">
                    <img :src="v.icon"
                         alt=""
                         class="w-24 h-24 absolute top left">
                  </div>
                </div>
                <div class="h-16 w-full fz-10 line-16 text-center">
                  {{v.name}}
                </div>
              </div>
            </template>
          </template>
        </div>
        <div class="w-fit flex justify-center items-center px-4">
          <div class="h-28 w-fit px-8 bg-f1f1f1 rounded-18 line-28 text-center fz-12"
               @click="isShow = true; currentTabComponent = 'countryRegion'">
            {{langSwitch('更多')}}
            <van-icon name="share-o" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full pt-10">
      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  :finished-text="langSwitch('没有更多了')"
                  @load="onLoad">
          <anchorList :list="getHot_list"></anchorList>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 一元空降 -->
    <div class="fixed w-66 h-66 right-8 bottom-172 animate__animated animate__faster animate__infinite infinite flex items-center justify-center"
         v-if="getters_getConfig.fuckactivity && LANG == 'zh-CN'"
         @click.stop="goddessBool = true"
         :class="animate__wobble">
      <div class="h-44 w-44 rounded scroll-hide">
        <img src="@/assets/images/yykj.jpg"
             class="h-full w-full"
             alt="">
      </div>
    </div>
    <!-- 推广赚钱 -->
    <div class="fixed w-66 h-66 right-8 bottom-108 animate__animated animate__faster animate__infinite infinite"
         @click.stop="isShow = true; currentTabComponent = 'myPromotion'"
         :class="animate__wobble">
      <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_home_tgzq.png`)"
           class="h-full w-full"
           alt="">
    </div>

    <!-- 添加到桌面 -->
    <!-- <button class="add_button_tohome add-button"
            v-if="isSafariBool && !isStandalone"
            @click="desktopHotKeyFn"
            style="display: block;"><span>Add To HomeScreen</span></button> -->

    <!-- commonPopup -->
    <commonPopup :isShow="isShow"
                 @changeIsShow="changeIsShow"
                 :isNavBar="true"
                 :currentTabComponent="currentTabComponent"></commonPopup>

    <adPopup :isAdPopup="isAdPopup"
             :iframeSrc="iframeSrc"
             @changeIsAdPopup="isAdPopup = false;"></adPopup>

    <van-popup v-model="goddessBool"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right">
        <goddess @closeGoddess="goddessBool = false"
                 :goddessBool="goddessBool"></goddess>
      </div>
    </van-popup>

    <van-popup v-model="desktopHotKeyBool"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right flex flex-col">
        <div class="h-36 w-full van-hairline--bottom box-border flex">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="desktopHotKeyBool = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 h-36 flex items-center justify-center fz-14">
            {{ langSwitch("教程") }}
          </div>
          <div class="w-36 fz-12 relative"></div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute top bottom left right bg-f1f1f1 flex items-center justify-center">
            <img src="~@/assets/images/desktopHotKey.jpg"
                 style="height: 100%; object-fit:cover;">
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import anchorList from "@/views/home/liveWidget/anchorList";
import goddess from "@/views/goddess";
import commonPopup from "@/components/commonPopup";
import adPopup from "@/components/adPopup";
import { Toast } from "vant";
// 是否桌面图标启动
import isStandalone from 'is-standalone';

export default {
  name: 'live',
  components: {
    anchorList,
    commonPopup,
    adPopup,
    goddess,
  },
  props: [''],
  data () {
    return {
      iframeSrc: '',
      isShow: false,
      currentTabComponent: 'countryRegion',
      isAdPopup: false,
      refreshing: false,
      loading: false,
      finished: false,
      getHotParams: {
        p: 1,
        region: '' // 默认是CN或者可以为空
      },
      getHot_list: [],
      live_interval: '',
      animate__wobble: '',
      goddessBool: false,
      isSafariBool: false,
      desktopHotKeyBool: false,
      isStandalone: ''
    };
  },
  watch: {

  },
  created () {
    this.isSafariBool = this.isSafari();
  },
  beforeMount () { },
  mounted () {
    this.live_interval = setInterval(() => {
      this.animate__wobble = 'animate__wobble';
      this.delayFn(() => { this.animate__wobble = '' }, 450)
    }, 5000)

    this.isStandalone = isStandalone;
  },
  methods: {
    ...mapActions(['actions_getHot', 'actions_getEnterRoom', 'actions_getHomeBetViewInfo', 'actions_rootStore']),
    ...mapMutations(['mutations_rootStore']),
    enterRoom (val, key) {
      // console.log(val)
      this.mutations_rootStore({ key: 'ANCHOR', val, })
      this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
      this.mutations_rootStore({ key: 'ANCHOR_LIST', val: this.getHot_list, })
      let { stream, uid } = val;
      let params = { liveuid: uid, stream, };
      this.actions_getEnterRoom(params).then((res) => {
        if (res.code == 0) {
          this.toRouter('liveClassRoomNew');
        } else {
          Toast(res.msg);
        }
      })
    },
    enterSelectGame (val) {
      let lottery_type = val.kindID;
      this.actions_rootStore({ key: 'lobbyLottery', val: lottery_type })
      this.toRouter('liveLobby');
    },
    changeIsShow (region) {
      this.isShow = false;
      if (!region) return
      this.selectRegion(region);
    },
    selectRegion (region) {
      if (this.getHotParams.region == region) return
      this.getHotParams.region = region;
      this.onRefresh();
    },
    showLivePopupIframe (v) {
      this.iframeSrc = v.url;
      this.isAdPopup = true;
    },
    onRefresh () {
      this.finished = false;
      this.loading = true;
      this.getHotParams.p = 1;
      this.getHot_list = [];
      this.onLoad();
    },
    onLoad () {
      this.actions_getHot(this.getHotParams).then(res => {
        if (res.code == 0) {
          this.getHot_list.push.apply(this.getHot_list, res.info[0].list)
          this.getHotParams.p += 1;
          this.loading = false;
          if (res.info[0].list.length == 0) { this.finished = true; }
          this.refreshing = false;

          // 添加跳转;
          let { ad } = this.$route.query;
          if (ad) {
            let key = 0;
            let val = this.getHot_list[0];
            this.$router.push({ query: {} }); // 清除ad参数
            // console.log(val, key);
            this.enterRoom(val, key);
          }
        }
      })
    },
    isSafari () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
        ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
        ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
        return true;
      } else {
        return false;
      }
    },
    desktopHotKeyFn () { this.desktopHotKeyBool = true; }
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'getters_getHot', 'getters_getBaseInfo', 'getters_getConfig', 'LANG', 'masterSwitch']),
  },
  destroyed () {
    clearInterval(this.live_interval);
  }
}
</script>
<style lang='scss' scoped>
.live {
  .van-notice-bar {
    height: 30px !important;
    font-size: 12px !important;
  }
  .currentRegion::before {
    content: "";
    width: 20px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: -1px;
    left: 0;
    margin: 0 auto;
    border-bottom: 2px solid #ef4b8d;
  }
  .add_button_tohome {
    display: none;
    position: fixed;
    bottom: 60px;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    background: #378ef5;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 15px;
    line-height: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 30%);
    border: none;
  }
}
</style>