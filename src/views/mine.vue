<template>
  <div class="mine absolute top bottom left right">
    <div class="absolute top left right bottom-50 scroll-y">
      <!-- 头像区域 -->
      <div class="w-full h-100 flex">
        <div class="w-100 h-100">
          <div class="h-76 w-full flex items-center justify-center">
            <div class="w-70 h-70 rounded">
              <van-image :src="getters_getBaseInfo.avatar_thumb"
                         class="w-70 h-70"
                         fit="cover"
                         round>
                <template v-slot:loading>
                  <van-loading type="spinner"
                               size="20" />
                </template>
              </van-image>
            </div>
          </div>
          <div class="h-24 w-full flex items-center justify-center">
            <div class="h-24 w-80 fz-12 line-24 text-center bg-D3D3D3 cl-white rounded-12"
                 v-if="!getters_getBaseInfo.isBindMobile"
                 @click="showPopup('','bindPhone')">
              {{langSwitch('绑定手机')}}
              <van-icon name="edit" />
            </div>
            <div v-else
                 class="h-24 w-80 fz-12 line-24 text-center bg-f1f1f1 cl-black rounded-12">
              {{langSwitch('已绑定手机')}}
            </div>
          </div>
        </div>
        <div class="flex-1 h-100 flex flex-col">
          <div class="h-30 line-30 text-right flex justify-end items-center">
            <div class="h-24 w-24 px-4">
              <img src="~@/assets/images/icon_email.png"
                   class="w-full h-full"
                   @click="showPopup( langSwitch('系统消息'), 'systemMsg')"
                   alt="">
            </div>
            <div class="h-24 w-24 px-4">
              <img src="~@/assets/images/icon_set.png"
                   class="w-full h-full"
                   @click="showPopup( langSwitch('个人设置'), 'userSet')"
                   alt="">
            </div>
          </div>
          <div class="flex-1 flex pl-10 box-border">
            <div class="flex-1 fz-16">
              <div class="h-20 line-20">
                {{getters_getBaseInfo.user_nicename}}
              </div>
              <div class="h-25 flex items-center">
                <img class="h-12 w-12"
                     :src="getters_getBaseInfo.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                <img class="h-12 w-26 ml-4"
                     :src="getters_getBaseInfo.level_anchor > 0 && getters_getConfig.levelanchor[getters_getBaseInfo.level_anchor-1].thumb" />
                <img class="h-12 w-26 ml-4"
                     :src="getters_getBaseInfo.level > 0 && getters_getConfig.level[getters_getBaseInfo.level-1].thumb" />
              </div>
              <div class="h-25 fz-12 line-12">
                ID:{{getters_getBaseInfo.id}}
                <span class="pl-10 pr-10 pt-2 pb-2 cl-white rounded-10 fz-10 copy"
                      style="background: linear-gradient(to right bottom, #f1f1f1, #a000f0)"
                      :data-clipboard-text="getters_getBaseInfo.id"
                      @click="copyText">
                  {{langSwitch('点击复制')}}
                </span>
              </div>
            </div>
            <div class="w-30 h-full flex items-center justify-center">
              <van-icon size="20"
                        @click="showPopup(langSwitch('编辑资料'), 'editInfo')"
                        name="arrow" />
            </div>
          </div>

        </div>
      </div>
      <!-- 金额 -->
      <div class="w-full h-80 flex fz-14">
        <div class="w-160 flex flex-col items-center justify-center">
          <div class="fz-12 cl-a8a8a8"
               @click="showPopup(langSwitch('汇率'), 'switchExchangeRate')">({{langSwitch('切换汇率')}})</div>
          <div class="fz-20 h-20 bolder">
            <template v-if="!!getters_getBalanceNew.coin">{{getters_rootStore.region_exchange_info.region_curreny_char}} {{((getters_getBalanceNew.coin)/10 * getters_rootStore.region_exchange_info.exchange_rate).toFixed(2)}}</template>
          </div>
          <div class="fz-12 cl-a8a8a8">{{langSwitch('总资产')}}({{getters_rootStore.region_exchange_info.region_curreny}})</div>
        </div>
        <div class="flex-1 flex fz-12"
             v-if="masterSwitch">
          <div class="flex-1 flex flex-col"
               @click="showPopup(langSwitch('充值'), 'recharge')">
            <div class="flex-1 flex justify-center items-end">
              <!-- <van-icon name="coupon"
                        size="30" /> -->
              <div class="h-40 w-40">
                <img src="~@/assets/images/icon_cz.png"
                     class="w-full h-full"
                     alt="">
              </div>
            </div>
            <div class="h-30 line-24 text-center">{{langSwitch('充值')}}</div>
          </div>
          <div class="flex-1 flex flex-col"
               @click="showPopup(langSwitch('提现'), 'withdraw')">
            <div class="flex-1 flex justify-center items-end">
              <div class="h-40 w-40">
                <img src="~@/assets/images/icon_tx.png"
                     class="w-full h-full"
                     alt="">
              </div>
            </div>
            <div class="h-30 line-24 text-center">{{langSwitch('提现')}}</div>
          </div>
          <div class="flex-1 flex flex-col"
               @click="showPopup(langSwitch('额度转换'), 'limitChange')">
            <div class="flex-1 flex justify-center items-end">
              <div class="h-40 w-40">
                <img src="~@/assets/images/icon_edzh.png"
                     class="w-full h-full"
                     alt="">
              </div>
            </div>
            <div class="h-30 line-24 text-center">{{langSwitch('额度转换')}}</div>
          </div>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="w-full h-80 px-20 box-border">
        <van-swipe class="h-80"
                   :autoplay="3000"
                   :show-indicators="false"
                   indicator-color="white">
          <van-swipe-item v-for="(v, index) in getters_getBaseInfo.adlist.filter(obj => obj.pos == 5)"
                          :key="index + 'swipe'">
            <img class="w-full h-full"
                 @click="showGamePopupIframe(v)"
                 style="object-fit: contain;"
                 :src="v.image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 内容 -->
      <div class="px-12 box-border w-full">
        <van-cell-group>
          <template v-for="(v, k) in contentList">
            <van-cell :title="v.title"
                      v-if="masterSwitch || v.name == 'incomeDetails' "
                      :key="k + 'content'"
                      :icon="v.path"
                      center
                      icon-prefix="flex items-center justify-center"
                      @click="showPopup(v.title, v.component)"
                      is-link />
          </template>
        </van-cell-group>
        <van-cell-group>
          <template v-for="(val, key) in getters_getBaseInfo.list">
            <van-cell :title="v.name"
                      v-for="(v,k) in val"
                      :key=" k +'content' + key"
                      :icon="v.thumb"
                      center
                      icon-prefix="flex items-center justify-center"
                      @click="isListBool_fn(key, k)"
                      :value="v.id == 15 ? (v.balance * 1).toFixed(4) : ''"
                      is-link>
            </van-cell>
          </template>
        </van-cell-group>
        <!--  -->
        <van-cell-group>
          <van-cell :title="contentListServer.title"
                    :icon="contentListServer.path"
                    center
                    icon-prefix="flex items-center justify-center"
                    @click="showPopup(contentListServer.title, contentListServer.component)"
                    is-link />
        </van-cell-group>
      </div>
    </div>
    <div class="absolute bottom left right h-50">
      <footerBar></footerBar>
    </div>

    <!-- 页面弹框组件 -->
    <van-popup v-model="isMineShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="h-36 w-full">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center relative">
            <van-icon @click="isMineShow = false"
                      size="20"
                      name="arrow-left" />
            <div class="w-120 h-36 absolute top left-28"
                 v-if="currentTabComponent == 'recharge'">
              <img v-real-img="getters_getPayConfig.pay_current_region.icon"
                   @click="isRegionShow = true"
                   class="w-24 h-24 rounded absolute top left">
              <div class="fz-10 pl-2 box-border absolute bottom">{{getters_getPayConfig.pay_current_region.name}}</div>
            </div>
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{popupTitle}}</span>
          </div>
          <div class="w-36 h-36 text-center">
          </div>
        </div>
      </div>
      <div class="absolute top-36 bottom left right">
        <component @closeMinePopup="isMineShow = false"
                   @change_calendar="calendar_show = true"
                   :select_time='select_time'
                   :isMineShow='isMineShow'
                   :isComponentLoad="true"
                   v-bind:is="currentTabComponent"></component>
      </div>
    </van-popup>

    <!-- 充值国家和地区选择 -->
    <van-popup v-model="isRegionShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="h-36 w-full">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center relative">
            <van-icon @click="isRegionShow = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('更多')}}</span>
          </div>
          <div class="w-36 h-36 text-center">
          </div>
        </div>
      </div>
      <div class="absolute top-36 bottom left right">
        <div class="h-44 fz-20 line-44 px-10 box-border">
          {{langSwitch('国家和地区')}}
        </div>
        <div class="absolute top-44 bottom left right flex">
          <div class="w-full h-44 flex flex-wrap">
            <div class="px-8 box-border"
                 :key="k"
                 @click="selectRegion_mine(v.countryCode)"
                 v-for="(v,k) in getters_getPayConfig.pay_support_regions">
              <div class="h-28 w-full flex items-center justify-center">
                <div class="w-24 h-24 rounded relative">
                  <img v-real-img="v.icon"
                       alt=""
                       class="w-24 h-24 absolute top left">
                </div>
              </div>
              <div class="h-16 w-full fz-8 line-16 text-center">
                {{v.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- popup -->
    <adPopup :isAdPopup="isAdPopup"
             :iframeSrc="iframeSrc"
             @changeIsAdPopup="isAdPopup = false;"></adPopup>
    <!--  日期筛选 -->
    <van-calendar v-model="calendar_show"
                  @confirm="calendar_onConfirm"
                  :min-date="calendar_minDate"
                  :max-date="calendar_maxDate" />

    <!--  -->
    <van-popup v-model="isListBool"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="w-full h-36 flex fz-14 line-36 text-center van-hairline--bottom box-border">
        <div class="w-36 h-36">
          <van-icon @click="isListBool = false"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1">{{isListBool_content.name}}</div>
        <div class="w-36 h-36"></div>
      </div>
      <div class="absolute top-36 bottom left right flex justify-center">
        <div class="absolute top bottom left right scroll-y">
          <iframe :src="`${isListBool_content.href}&uid=${UID}&token=${TOKEN}&l=${obj_lang[LANG]}`"
                  frameborder="0"
                  class="w-full h-full iframe fz-12"></iframe>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navBar"
import footerBar from "@/components/footerBar";
import { bindPhone, editInfo, gameReport, incomeDetails, king, myEquipment, myLevel, onlineStore, systemMsg, userSet, withdraw, limitChange, switchExchangeRate } from "@/views/mineWidget"
import recharge from "@/views/recharge";
import service from "@/views/service";
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import adPopup from "@/components/adPopup";
import store from '@/store'

export default {
  name: 'mine',
  components: { service, recharge, navBar, footerBar, bindPhone, editInfo, gameReport, incomeDetails, king, myEquipment, myLevel, onlineStore, systemMsg, userSet, withdraw, limitChange, adPopup, switchExchangeRate },
  props: [''],
  data () {
    return {
      contentList: [
        { title: this.langSwitch('王者俸禄'), path: require(`@/assets/images/king.png`), name: '', component: 'king', },
        { title: this.langSwitch('收支明细'), path: require(`@/assets/images/bill_icon.png`), name: '', component: 'incomeDetails', },
      ],
      contentListServer: {
        title: this.langSwitch('联系客服'),
        path: require(`@/assets/images/iconxiaoxi.png`),
        name: '',
        component: 'service',
      },
      isMineShow: false,
      isRegionShow: false,
      popupTitle: '',
      currentTabComponent: '',
      iframeSrc: '',
      isAdPopup: false,
      calendar_show: false,
      calendar_minDate: '',
      calendar_maxDate: '',
      select_time: '',
      isListBool: false,
      isListBool_content: '',
      obj_lang: { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
    };
  },
  watch: {
    isListBool (n) {
      if (!n) { this.isListBool_content = ''; }
    },
    isMineShow (n) {
      if (!n) {
        // this.currentTabComponent = '';
      }
    },
    isListBool (n) { },
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    },
  },
  created () {
    this.mutations_rootStore({ key: 'isCheckPayRoom', val: false });
    // console.log(this.getters_getBaseInfo, 'getters_getBaseInfo.isBindMobile')
    this.actions_getBalanceNew();   // Money
    // 初始化区间范围
    this.calendar_maxDate = new Date();
    this.calendar_minDate = new Date(this.calendar_maxDate - 7 * 24 * 60 * 60 * 1000);
    this.select_time = new Date(new Date().toLocaleDateString());
  },
  beforeMount () { },
  mounted () {
    this.$bus.$on("init_mine_withdraw", () => {
      this.showPopup(this.langSwitch('提现'), 'withdraw')
    });
    this.$bus.$on("init_mine_bindPhone", () => {
      this.showPopup('', 'bindPhone');
    });
  },
  destroyed () {
    this.$bus.$off("init_mine_withdraw");
  },
  methods: {
    ...mapActions(['actions_getPayConfig', 'actions_getBalanceNew']),
    ...mapMutations(['mutations_rootStore']),
    showPopup (title, component) {
      this.isMineShow = true;
      this.popupTitle = title;
      this.currentTabComponent = component
    },
    copyText () {
      let clipboard = new Clipboard('.copy')
      clipboard.on('success', e => { Toast(this.langSwitch('复制成功')); clipboard.destroy() })
      clipboard.on('error', e => { Toast(this.langSwitch('复制失败')); clipboard.destroy() })
    },
    showGamePopupIframe (v) {
      this.iframeSrc = v.url;
      this.isAdPopup = true;
    },
    selectRegion_mine (val) {
      if (this.PAYREGION == val) { this.isRegionShow = false; return; }
      this.mutations_rootStore({ key: 'PAYREGION', val });
      let params = { region: val }
      this.actions_getPayConfig(params).then(res => { this.isRegionShow = false; })
    },
    calendar_onConfirm (date) {
      this.select_time = date;
      this.calendar_show = false
    },
    isListBool_fn (key, k) {
      this.isListBool_content = this.getters_getBaseInfo.list[key][k];
      this.isListBool = true
    }
  },
  computed: {
    ...mapGetters(['masterSwitch', 'UID', 'TOKEN', 'LANG', 'getters_getBalanceNew', 'getters_getBaseInfo', 'getters_isAppending', 'getters_rootStore', 'getters_getConfig', 'getters_getPayConfig', 'PAYREGION'])
  },
  // beforeRouteEnter: (to, from, next) => {
  //   let params = { region: store.getters.PAYREGION }
  //   store.dispatch('actions_getPayConfig', params).then((res) => {
  //     next()
  //   })
  // },
}
</script>
<style lang='scss'>
</style>