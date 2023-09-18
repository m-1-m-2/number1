<template>
  <div class="game absolute top bottom left right">
    <div class="w-full h-36">
      <navBar :title="langSwitch('游戏中心')"
              @showPopup_service="commonPopupFn('service')"></navBar>
    </div>
    <div class="absolute top-36 left right bottom-50 flex flex-col">
      <div class="w-full h-188"
           v-if="getters_getBaseInfo.adlist.filter(obj => obj.pos == 4).length != 0">
        <van-swipe class="h-188"
                   :autoplay="3000"
                   :show-indicators="false"
                   indicator-color="white">
          <van-swipe-item v-for="(v, index) in getters_getBaseInfo.adlist.filter(obj => obj.pos == 4)"
                          :key="index + 'swipe'">
            <img class="w-full h-full"
                 @click="showGamePopupIframe(v)"
                 style="object-fit: contain;"
                 :src="v.image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="w-full h-30 flex">
        <div class="flex-1 h-30">
          <van-notice-bar left-icon="volume-o"
                          background="#FFFFFF"
                          color="#A000f0"
                          class="h-20">
            <template v-slot:default>
              <div @click="showNotice(getters_getBaseInfo.live_ad_text)">
                {{getters_getBaseInfo.live_ad_text}}
              </div>
            </template>
            <template v-slot:right-icon>
              <div class="relative left-6"
                   @click="commonPopupFn('withdrawalsRecord')">
                <span class="cl-white rounded-10 h-20 fz-10 line-20 pt-4 pb-4 pl-6 pr-6"
                      style="background: linear-gradient(to right bottom, #f1f1f1, #a000f0)">
                  {{langSwitch('提现记录')}}
                </span>
              </div>
            </template>
          </van-notice-bar>
        </div>
      </div>
      <div class="w-full flex-1 relative">
        <div class="absolute top bottom left right flex">
          <div class="w-68 bg-f1f1f1 scroll-y">
            <div class="w-68 h-56 bg-white pt-4 pb-4 pl-10 box-border"
                 v-for="(v,k) in gameList"
                 :key="k + 'title'">
              <div class="w-48 h-48 rounded-12 scroll-hide ba-1px box-border cl-purple"
                   @click="switchMenu(k)"
                   :class="[menuIndex == k ? 'menuActive': '']">
                <div class="h-30 text-center box-border">
                  <van-image :src="v.meunIcon"
                             fit="cover"
                             class="w-24 h-24">
                    <template v-slot:loading>
                      <van-loading type="spinner"
                                   size="20" />
                    </template>
                  </van-image>
                </div>
                <div class="h-18 fz-12 line-20 text-center">
                  {{v.meunName}}
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 h-inherit relative fz-12"
               v-cloak>
            <div class="absolute top bottom left right box-border pb-10 scroll-y">
              <div class="px-8 box-border"
                   v-for="(v,k) in menuContentData.sub"
                   :key="k+'menu'">
                <div class="h-20 line-20 fz-12 cl-a8a8a8">{{v.meunName}}</div>
                <div class="w-inherit">
                  <van-row type="flex">
                    <van-col :span="val.type == 'game_lobby'? 24 : 8"
                             class="flex items-center justify-center"
                             v-for="(val, key) in v.sub"
                             :key="key + 'goGame'">
                      <template v-if="val.type =='game_lobby'">
                        <div class="w-full h-96 box-border flex flex-col items-center justify-center"
                             @click="enterGameFn(val)">
                          <div class="w-full h-80 rounded-12 scroll-hide">
                            <van-image :src="val.urlName"
                                       fit="cover"
                                       class="w-full h-80">
                              <template v-slot:loading>
                                <van-loading type="spinner"
                                             size="20" />
                              </template>
                            </van-image>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="w-full h-110 pt-10 box-border flex flex-col items-center justify-center"
                             @click="enterGameFn(val)">
                          <div class="w-80 ">
                            <van-image :src="val.urlName"
                                       fit="cover"
                                       class="w-80 ">
                              <template v-slot:loading>
                                <van-loading type="spinner"
                                             size="20" />
                              </template>
                            </van-image>
                          </div>
                          <div class="h-20 fz-10 line-20 text-center"
                               style="height:80px ">{{val.meunName}}</div>
                        </div>
                      </template>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom left right h-50">
      <footerBar></footerBar>
    </div>
    <!-- commonPopup -->
    <commonPopup :isShow="isShow"
                 @changeIsShow="isShow = false;"
                 :isNavBar="true"
                 :currentTabComponent="currentTabComponent"></commonPopup>

    <adPopup :isAdPopup="isAdPopup"
             :iframeSrc="iframeSrc"
             @changeIsAdPopup="isAdPopup = false;"></adPopup>

    <!-- 三方游戏进入 -->
    <van-popup v-model="sanfangGame"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right">
        <div class="h-36 w-full line-36 box-border bb-1px flex">
          <div class="w-36 flex items-center justify-center"
               @click="closeSanfangGame">
            <van-icon size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 text-center fz-14">
            {{langSwitch('游戏中心')}}
          </div>
          <div class="w-36"></div>
        </div>
        <div class="absolute top-36 bottom left right flex items-center justify-center">
          <div class="absolute top bottom left right scroll-y"
               v-if="sanfangGameURI">
            <iframe :src="sanfangGameURI"
                    frameborder="0"
                    class="w-full h-full iframe"></iframe>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import navBar from "@/components/navBar"
import footerBar from "@/components/footerBar";
import commonPopup from "@/components/commonPopup";
import adPopup from "@/components/adPopup";
export default {
  name: 'game',
  components: { navBar, footerBar, commonPopup, adPopup },
  props: [''],
  data () {
    return {
      iframeSrc: '',
      isShow: false,
      currentTabComponent: '',
      gameList: [],
      menuIndex: 0,
      menuContentData: [],
      isAdPopup: false,
      sanfangGame: false,
      sanfangGameURI: ''
    };
  },
  watch: {},
  created () {
    this.actions_getPlats().then(res => {
      this.gameList = res.info;
      this.menuContentData = this.gameList[this.menuIndex];
      this.skeletonLoading = false;
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getPlats', 'actions_getEnterGame', 'actions_getHomeBetViewInfo', 'actions_rootStore']),
    enterGameFn (val) {
      let { kindID, plat } = val, autoExchange = this.autoExchange;
      let params = { kindID, subplat: plat, autoExchange }

      if (plat == 'lottery') {
        let lottery_type = val.kindID;
        this.actions_rootStore({ key: 'lobbyLottery', val: lottery_type })
        this.toRouter('liveLobby');
      } else {
        this.actions_getEnterGame(params).then((res) => {
          if (res.code == 0) {
            let { url } = res.info;
            this.sanfangGameURI = url;
            this.sanfangGame = true;
          }
        })
      }
    },
    closeSanfangGame () {
      this.sanfangGameURI = '';
      this.sanfangGame = false;
    },
    showGamePopupIframe (v) {
      this.iframeSrc = v.url;
      this.isAdPopup = true;
    },
    commonPopupFn (val) {
      this.isShow = true;
      this.currentTabComponent = val;
    },
    switchMenu (k) {
      this.menuIndex = k;
      this.getMenuContentData();
    },
    getMenuContentData () {
      this.menuContentData = this.gameList[this.menuIndex];
    }
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'getters_getBaseInfo', 'autoExchange', 'getters_getConfig'])
  }
}
</script>
<style lang='scss' scoped>
[v-cloak] {
  display: none;
}
.game {
  .van-notice-bar {
    height: 24px !important;
    font-size: 12px !important;
  }
  .menuActive {
    background: linear-gradient(to right bottom, #ffffff, #a000f0) !important;
    color: white !important;
  }
}
</style>