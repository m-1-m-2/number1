<template>
  <div class='goddess absolute top bottom left right'>
    <div class="absolute top bottom left right flex flex-col cl-black">
      <div class="h-36 w-full van-hairline--bottom box-border flex">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="$emit('closeGoddess')"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 h-36 flex items-center justify-center fz-14">
          {{langSwitch('幸运女神一元空降')}}
        </div>
        <div class="w-36 fz-12 relative">
          <div class="w-80 absolute right h-36 top px-2 z-index-1 flex items-center justify-center">
            <div class="cl-0080FF"
                 @click="isAdPopup = true">
              {{langSwitch("玩法介绍")}}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 relative imgBlurLogin">
        <div class="h-140 w-full flex items-center justify-center">
          <div class="h-fit w-fit">
            <img src="@/assets/images/yykj_title.png"
                 class="w-288"
                 alt="">
          </div>
        </div>
        <div class="h-400 w-full flex items-center justify-center cl-EF4B8D">
          <div class="w-288 h-400 relative imgBlurBg rounded-12 scroll-hide flex flex-col items-center">
            <div class="h-10"></div>
            <div class="w-198 h-52 relative imgBlurContent fz-18 bolder cl-white text-center line-52">
              {{ getters_getFuckActivityInfo.title }}
            </div>
            <div class="fz-16 bolder h-24 line-24 my-4">
              {{langSwitch("第")}} {{ getters_getFuckActivityInfo.cur_period }} {{langSwitch("期")}} &nbsp; {{langSwitch("本期参与人数")}}:{{ getters_getFuckActivityInfo.user_count }} {{langSwitch("人")}}
            </div>
            <div class="w-220 h-30 relative imgBlurBg2">
              <div class="absolute top bottom left right flex items-center justify-center">
                <van-count-down :time="(getters_getFuckActivityInfo.end_time * 1000 - new Date().getTime())"
                                class="fz-10 cl-EF4B8D-import"
                                format="开奖倒计时: DD 天 HH 时 mm 分 ss 秒" />
              </div>
            </div>
            <div class="fz-12 line-30 h-30 w-full flex mt-4 px-32 box-border">
              <div class="flex-1">
                {{langSwitch("上期中奖用户")}}:
              </div>
              <div class="w-100 flex justify-end">
                <div class="flex">
                  <div class="flex items-center">
                    <img :src="getters_getFuckActivityInfo.last_win_user_photo"
                         class="h-24 w-24 rounded"
                         alt="">
                  </div>
                  <div class="flex items-center">
                    &nbsp;<span class="cl-black fz-12">{{getters_getFuckActivityInfo.last_win_user_account}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-16"></div>
            <!--  -->
            <div class="h-24 line-24 fz-12 bolder">
              {{langSwitch("当前进度")}}:
              <span v-if="getters_getFuckActivityInfo">{{ (getters_getFuckActivityInfo.total_bet / getters_getFuckActivityInfo.need_bet * 100).toFixed(3)}}%</span>
            </div>
            <div class="bolder fz-18 h-36 line-36"> <span v-if="getters_getFuckActivityInfo">{{(getters_getFuckActivityInfo.total_bet * 1).toFixed(0)}}/{{getters_getFuckActivityInfo.need_bet}}</span> {{langSwitch("钻石")}} </div>
            <div class="fz-10 h-24 line-24 bolder">*{{langSwitch("倒计时结束,抽取一位幸运用户获得约炮的机会")}}*</div>
            <!-- 余下的布局 -->
            <div class="flex-1 w-full flex flex-col cl-black">
              <div class="flex-1 fz-10 flex justify-center items-center px-20 box-border">
                <div class="flex-1">
                  {{langSwitch("我的本期投入")}}:<span class="cl-F2CF40 fz-14 bolder">{{getters_getFuckActivityInfo.my_bet}}</span>&nbsp;{{langSwitch("钻石")}}
                </div>
                <div class="">
                  {{langSwitch("我的中奖概率")}}:<span class="cl-F2CF40 fz-14 bolder"
                        v-if="getters_getFuckActivityInfo.my_rate">{{getters_getFuckActivityInfo.my_rate.toFixed(3)}}%</span>
                  <span class="cl-F2CF40 fz-14 bolder"
                        v-else>0.000%</span>
                </div>
              </div>
              <div class="h-50 flex justify-center items-center">
                <div class="w-260 h-44 relative imgBlurBg1 flex">
                  <div class="flex-1 flex">
                    <div class="w-40 flex justify-center items-center"
                         @click="betAmountFn('cut')">
                      <img src="~@/assets/images/yykj_cut.png"
                           class="w-36 h-36"
                           alt="">
                    </div>
                    <div class="flex-1 flex justify-center items-center">
                      {{betAmountMap[betAmountIndex]}}
                    </div>
                    <div class="w-40 flex justify-center items-center"
                         @click="betAmountFn('add')">
                      <img src="~@/assets/images/yykj_add.png"
                           class="w-36 h-36"
                           alt="">
                    </div>
                  </div>
                  <div class="w-100 h-44 bg-F2CF40 line-44 text-center fz-16 rounded-22"
                       @click="goToBetFn">
                    {{langSwitch("投入钻石")}}
                  </div>
                </div>
              </div>
              <div class="flex-1 flex fz-12 cl-0080FF items-end">
                <div class="flex-1 pl-12 text-left box-border pb-10"
                     @click="betting_record_fn">{{langSwitch("本期投注记录")}}</div>
                <div class="flex-1 pr-12 text-right box-border pb-10"
                     @click="winning_record_fn">{{langSwitch("往期中奖记录")}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 玩法介绍 -->
    <adPopup :isAdPopup="isAdPopup"
             :iframeSrc="iframeSrc"
             @changeIsAdPopup="isAdPopup = false;"></adPopup>

    <!-- 本期投注记录 -->
    <van-popup v-model="betting_record"
               position="right"
               :style="{ height: '100%', width: '100%' }"
               class="relative">
      <div class="absolute top bottom left right">
        <betting @closeBetting="betting_record = false"
                 :betting_record_data="betting_record_data"></betting>
      </div>
    </van-popup>

    <!-- 往期中奖记录 -->
    <van-popup v-model="winning_record"
               position="right"
               :style="{ height: '100%', width: '100%' }"
               class="relative">
      <div class="absolute top bottom left right">
        <winning @closeWinning="winning_record = false"
                 :winning_record_data="winning_record_data"></winning>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import adPopup from "@/components/adPopup";
import betting from "@/views/goddessWidget/betting";
import winning from "@/views/goddessWidget/winning";
import { Toast } from 'vant';

export default {
  name: 'goddess',
  components: { adPopup, betting, winning },
  props: ['goddessBool'],
  data () {
    return {
      isAdPopup: false,
      betting_record: false,
      winning_record: false,
      betting_record_data: '',
      winning_record_data: '',
      // 投注金额
      betAmountMap: [1, 2, 3, 4, 5, 10, 50, 100, 200, 300, 400, 500, 1000],
      betAmountIndex: 0,
    };
  },
  watch: {
    goddessBool (n) { if (n) { this.actions_getFuckActivityInfo(); } }
  },
  created () { this.actions_getFuckActivityInfo(); },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getFuckActivityInfo', 'actions_postFuckActivityBet', 'actions_getFuckActivityOpenRecord', 'actions_getFuckActivityBetInfo']),
    betAmountFn (ac) {
      if (ac == 'add') {
        if (this.betAmountIndex == this.betAmountMap.length - 1) {
          this.betAmountIndex = 0;
        } else {
          this.betAmountIndex++;
        }
      } else {
        if (this.betAmountIndex == 0) {
          this.betAmountIndex = this.betAmountMap.length - 1;
        } else {
          this.betAmountIndex--;
        }
      }
    },
    betting_record_fn () {
      this.actions_getFuckActivityBetInfo().then(res => {
        if (res.code == 0) {
          this.betting_record_data = res.info[0];
          this.betting_record = true;
        } else { Toast(res.msg) }
      });
    },
    winning_record_fn () {
      this.actions_getFuckActivityOpenRecord({ page: 0 }).then(res => {
        if (res.code == 0) {
          this.winning_record_data = res.info[0];
          this.winning_record = true;
        } else { Toast(res.msg) }
      })
    },
    goToBetFn () {
      let bet_coin = this.betAmountMap[this.betAmountIndex];
      let params = { bet_coin }
      let formData = this.postParamsToFormData(params); // 需转换post请求参数
      this.actions_postFuckActivityBet(formData).then(res => {
        if (res.code == 0) {
          this.actions_getFuckActivityInfo();
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_getFuckActivityInfo']),
    iframeSrc () { return this.getters_getFuckActivityInfo.rule }
  }
}
</script>
<style lang='scss' scoped>
.goddess {
  .imgBlurLogin::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/login_xxx.jpg");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }

  .imgBlurBg::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/yykj_bg.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }

  .imgBlurBg1::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/yykj_bg1.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }

  .imgBlurBg2::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/yykj_bg2.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }

  .imgBlurContent::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/yykj_content.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }
  .cl-EF4B8D-import {
    color: #ef4f8d !important;
  }
}
</style>