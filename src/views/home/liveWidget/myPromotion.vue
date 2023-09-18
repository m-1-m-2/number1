<template>
  <div class='myPromotion absolute top bottom left right flex p-all-12 box-border bg-f4f4f4 fz-12 flex-col'
       v-cloak>
    <div class="flex-1 scroll-y"
         v-if="!!info">
      <div class="w-full h-140 rounded-12 flex items-center justify-center relative"
           style="background: linear-gradient(to bottom right, #A4FEFF, #A000F0)">
        <div>
          <div class="fz-14 cl-white">{{langSwitch('推广收益钻石')}}</div>
          <div class="flex items-center justify-center mt-4">
            <img src="~@/assets/images/damand_charge.png"
                 class="h-20 w-20"
                 alt="">
            <span class="cl-white fz-14">{{info.left_coin}}</span>
          </div>
        </div>
        <!-- 充入账户 -->
        <div class="absolute bottom-4 left-4 p-all-4 rounded-8 bg-white cl-0080FF"
             @click="showCrzh">{{langSwitch('充入账户')}}</div>
        <!-- 立即提现 -->
        <div class="absolute bottom-4 right-4 p-all-4 rounded-8 bg-white cl-0080FF"
             @click="showLjtx">{{langSwitch('立即提现')}}</div>
      </div>
      <!--  -->
      <div class="h-30 line-24 cl-0080FF text-center">---{{langSwitch('您的收益明细')}}---</div>
      <!--  -->
      <div class="h-fit w-full bg-white rounded-12 cl-a8a8a8">
        <div class="h-52 flex line-52 px-12 box-border">
          <div class="flex items-center justify-center mr-6">
            <img src="~@/assets/images/share_1.png"
                 class="h-24 w-24"
                 alt="">
          </div>
          <div>{{langSwitch('邀请')}} {{info.invite_count}} {{langSwitch('人')}}</div>
          <div class="left-auto cl-00a000">
            +{{info.invite_coin}}{{langSwitch('钻石')}}
          </div>
        </div>
        <div class="h-52 flex line-52 px-12 box-border">
          <div class="flex items-center justify-center mr-6">
            <img src="~@/assets/images/share_2.png"
                 class="h-24 w-24"
                 alt="">
          </div>
          <div>{{langSwitch('充值')}}{{info.total_charge}}{{langSwitch('钻石')}}</div>
          <div class="left-auto cl-00a000">
            +{{info.charge_coin}}{{langSwitch('钻石')}}
          </div>
        </div>
        <div class="h-52 flex line-52 px-12 box-border">
          <div class="flex items-center justify-center mr-6">
            <img src="~@/assets/images/share_3.png"
                 class="h-24 w-24"
                 alt="">
          </div>
          <div>{{langSwitch('提现成功')}}</div>
          <div class="left-auto cl-DA3E32">
            +{{info.withdrawed_coin}}{{langSwitch('钻石')}}
          </div>
        </div>
        <div class="h-52 flex line-52 px-12 box-border">
          <div class="flex items-center justify-center mr-6">
            <img src="~@/assets/images/share_4.png"
                 class="h-24 w-24"
                 alt="">
          </div>
          <div>{{langSwitch('申请提现中')}}</div>
          <div class="left-auto cl-DA3E32">
            +{{info.withdrawing_coin}}{{langSwitch('钻石')}}
          </div>
        </div>
        <div class="h-52 flex line-52 px-12 box-border">
          <div class="flex items-center justify-center mr-6">
            <img src="~@/assets/images/share_5.png"
                 class="h-24 w-24"
                 alt="">
          </div>
          <div>{{langSwitch('充入账户')}}</div>
          <div class="left-auto cl-DA3E32">
            +{{info.charge_into_coin}}{{langSwitch('钻石')}}
          </div>
        </div>
      </div>
      <!--  -->
      <div class="mt-16 mb-24 h-fit flex items-center justify-center">
        <div class="pt-12 pb-12 pl-108 pr-108 rounded-24 cl-white copy"
             :data-clipboard-text="info.invite_url"
             @click="copyText"
             style="background: linear-gradient(to bottom right, #A4FEFF, #A000F0)">{{langSwitch('复制推广链接')}}</div>
      </div>
      <!-- rules -->
      <div v-html="formatWord(info.invite_rule)"
           class=" cl-a8a8a8"></div>
    </div>

    <!--  -->
    <van-popup v-model="isMyPromotionShow"
               :style="{ height: '100%',width: '100%' }">
      <div class="h-36 w-full">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center relative">
            <van-icon @click="isMyPromotionShow = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{popupTitle}}</span>
          </div>
          <div class="w-36 h-36 text-center">
          </div>
        </div>
      </div>
      <div class="absolute top-36 bottom left right">
        <component v-bind:is="currentTabComponent"
                   :info="info"></component>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import crzh_popup from "@/views/home/liveWidget/myPromotion_popup/crzh_popup";
import ljtx_popup from "@/views/home/liveWidget/myPromotion_popup/ljtx_popup";

export default {
  name: 'myPromotion',
  components: { crzh_popup, ljtx_popup },
  props: [''],
  data () {
    return {
      info: '',
      isMyPromotionShow: false,
      popupTitle: '',
      currentTabComponent: '',
    };
  },
  watch: {},
  created () { this.init() },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getPopularizeInfo', 'actions_getWithdraw']),
    init () {
      this.actions_getPopularizeInfo().then(res => {
        if (res.code == 0) {
          this.info = res.info;
        } else {
          Toast(res.msg);
        }
      })

      this.actions_getWithdraw().then(res => { })
    },
    copyText () {
      let clipboard = new Clipboard('.copy')
      clipboard.on('success', e => { Toast(this.langSwitch('复制成功')); clipboard.destroy() })
      clipboard.on('error', e => { Toast(this.langSwitch('复制失败')); clipboard.destroy() })
    },
    showCrzh () {
      this.popupTitle = this.langSwitch('充入账户');
      this.currentTabComponent = crzh_popup;
      this.isMyPromotionShow = true;
    },
    showLjtx () {
      this.popupTitle = this.langSwitch('立即提现');
      this.currentTabComponent = ljtx_popup;
      this.isMyPromotionShow = true;
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.myPromotion {
  &[v-cloak] {
    display: none;
  }
}
</style>