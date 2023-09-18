<template>
  <div class="recharge absolute top bottom left right">
    <div class="absolute top left right bottom  flex flex-col"
         :class="[$route.name == 'recharge'?'bottom-50':'bottom-0']">
      <div v-if="$route.name == 'recharge'"
           class="w-full h-36 relative">
        <navBar :title="langSwitch('充值中心') "
                @showPopup_service="isShow = true;currentTabComponent='service'"></navBar>
        <div class="h-36 w-120 z-index-1 absolute top left-10"
             :class="[isBackIcon?'left-30': '']">
          <img v-real-img="getters_getPayConfig.pay_current_region.icon"
               @click="toRouter('countryRegionCharge')"
               class="w-24 h-24 rounded absolute top left">
          <div class="fz-10 pl-2 box-border absolute bottom">{{getters_getPayConfig.pay_current_region.name}}</div>
        </div>
      </div>
      <div class="w-full h-30"
           @click="showNotice(getters_getBaseInfo.live_ad_text)">
        <van-notice-bar left-icon="volume-o"
                        background="#FFFDE6"
                        color="orange"
                        class="h-20"
                        :text="getters_getBaseInfo.live_ad_text" />
      </div>
      <!--  -->
      <template v-if="getters_getPayConfig.data.chargeClass.length != 0">
        <div class="flex-1 relative">
          <div class="absolute top left right bottom scroll-y">
            <div class="w-full flex p-all-4 box-border"
                 style="flex-flow: wrap;">
              <div class="w-Equally-4 h-100 pl-8 pr-4 pt-4 pb-4 box-border"
                   v-for="(v, k) in getters_getPayConfig.data.chargeClass"
                   :key="k + 'pay'">
                <div class="ba-1px w-full h-full box-border rounded-8 flex flex-col scroll-hide relative"
                     @click="paymentMethod_index = k; paymentChannel_index = 0; rechargeAmount_index = 0; rechargeAmountInput = '';"
                     :class="[paymentMethod_index == k? 'paymentMethod_index': '']">
                  <div class="h-60 flex items-center justify-center">
                    <img :src="v.head.icon"
                         class="h-50 w-50"
                         alt="">
                  </div>
                  <div class="flex-1 flex items-center justify-center">
                    <div class="text-center line-14">
                      <div class="fz-12">{{v.head.title}}</div>
                      <div class="fz-10 cl-a8a8a8">{{v.head.subTitle}}</div>
                    </div>
                  </div>
                  <div class="absolute top left flex"
                       style="border-bottom-right-radius: 4px">
                    <img :src="v.head.subIcon"
                         class="h-18 w-18"
                         alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="h-6 w-full bg-f1f1f1"></div>
            <div class="w-full pl-12 pr-12 pt-4 pb-4 box-border">
              <div class="h-32 fz-14 line-32 relative">
                {{langSwitch('支付渠道')}}
                <!-- 区分VIPPAY -->
                <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                  <div class="absolute top right h-32 line-32">
                    账户余额 (钻石):<span class="cl-pink">{{ (getters_getBalanceNew.coin * 1).toFixed(2) || 0.00}}</span>
                  </div>
                </template>
              </div>
              <!-- 区分VIPPAY -->
              <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                <div class="h-40 flex items-center">
                  <div v-for="(v, k) in getters_getPayConfig.data.chargeClass[paymentMethod_index]['models']"
                       :key="k + 'chanel'"
                       @click="paymentChannel_index = k"
                       :class="[paymentChannel_index == k? 'paymentChannel_index': '']"
                       class="w-fit pl-12 pr-12 pt-4 pb-4 box-border rounded-4 ba-1px fz-12 mr-12 relative">
                    {{v.subContent[1].content.title}}
                    <div class="w-fit h-fit p-all-2 absolute bg-orange rounded-12 fz-12 cl-white"
                         style="top:-14px; right:-14px;"
                         v-if="v.subContent[1].content.subTitle">
                      {{v.subContent[1].content.subTitle}}
                    </div>
                  </div>
                </div>
                <div class="cl-pink fz-10 line-12"
                     v-html="formatWord(getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.tip)">
                </div>
              </template>
              <template v-else>
                <div class="h-40 flex items-center">
                  <div v-for="(v, k) in getters_getPayConfig.data.chargeClass[paymentMethod_index]['models']"
                       :key="k + 'chanel'"
                       @click="paymentChannel_index = k"
                       :class="[paymentChannel_index == k? 'paymentChannel_index': '']"
                       class="w-fit pl-12 pr-12 pt-4 pb-4 box-border rounded-4 ba-1px fz-12 mr-12 relative">
                    {{v.subContent[0].content.title}}
                    <div class="w-fit h-fit p-all-2 absolute bg-orange rounded-12 fz-12 cl-white"
                         style="top:-14px; right:-14px;"
                         v-if="v.subContent[0].content.subTitle">
                      {{v.subContent[0].content.subTitle}}
                    </div>
                  </div>
                </div>
                <div class="cl-pink fz-10 line-12"
                     v-html="formatWord(getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.tip)">
                </div>
              </template>
            </div>
            <div class="h-6 w-full bg-f1f1f1"></div>
            <div class="w-full pt-4 pb-4 box-border">
              <div class="h-24 fz-14 line-24 pl-12 pr-12 box-border relative">
                {{langSwitch('充值金额')}}
                <!-- 区分VIPPAY -->
                <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                  <div class="absolute top right-12 h-24 line-24">
                    VIPPAY 余额:<span class="cl-pink">{{ getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][0]['subContent'][0]['content']['balance'] }}</span>
                  </div>
                </template>
              </div>
              <!-- 区分VIPPAY -->
              <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                <div class="fz-20 bolder pl-12 pr-12 box-border">
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount.length != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.curreny_unit}}
                  </span>
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount.length != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount[rechargeAmount_index].title}}
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="fz-20 bolder pl-12 pr-12 box-border">
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount.length != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.curreny_unit}}
                  </span>
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount.length != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount[rechargeAmount_index].title}}
                  </span>
                  <span v-else>
                    <van-field v-model="rechargeAmountInput"
                               type="digit"
                               class="box-border"
                               :placeholder="langSwitch('请输入充值金额')" />
                  </span>
                </div>
              </template>
              <div class="fz-12 cl-a8a8a8 pl-12 pr-12 box-border">
                {{langSwitch('可充值区间')}}
                <!-- 区分VIPPAY -->
                <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                  {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.amountRange[0]}}
                  -
                  {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.amountRange[1]}}
                </template>
                <template v-else>
                  {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.amountRange[0]}}
                  -
                  {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.amountRange[1]}}
                </template>
              </div>
              <!-- 区分VIPPAY -->
              <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                <div class="w-full flex"
                     style="flex-flow: wrap;">
                  <div v-for="(v, k) in getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount"
                       :key="k+'amount'"
                       class="w-Equally-2 h-40 pl-12 pr-12 pt-4 pb-4 box-border div_amount">
                    <div class="w-full h-full ba-1px rounded-4 relative flex items-center px-12 box-border scroll-hide"
                         @click="rechargeAmount_index = k"
                         :class="[rechargeAmount_index == k? 'rechargeAmount_index': '']">
                      <div>
                        <div class="fz-12">{{v.title}}</div>
                        <div class="fz-10 cl-orange">{{v.subTitle}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full flex"
                     style="flex-flow: wrap;">
                  <div v-for="(v, k) in getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount"
                       :key="k+'amount'"
                       class="w-Equally-2 h-40 pl-12 pr-12 pt-4 pb-4 box-border div_amount">
                    <div class="w-full h-full ba-1px rounded-4 relative flex items-center px-12 box-border scroll-hide"
                         @click="rechargeAmount_index = k"
                         :class="[rechargeAmount_index == k? 'rechargeAmount_index': '']">
                      <div>
                        <div class="fz-12">{{v.title}}</div>
                        <div class="fz-10 cl-orange">{{v.subTitle}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="fz-12 cl-red bolder px-12 box-border line-20 h-20 w-full">
                {{langSwitch('您可以获得')}}
                <!-- 区分VIPPAY -->
                <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount[rechargeAmount_index].title}}
                  </span>
                  <span v-else>0</span>
                  {{langSwitch('钻石, 当前汇率')}}1:
                  {{parseFloat(Number(getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.exchange_rate).toFixed(3))}}
                </template>
                <template v-else>
                  <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount != 0">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount[rechargeAmount_index].title}}
                  </span>
                  <span v-else>0</span>
                  {{langSwitch('钻石, 当前汇率')}}1:
                  {{parseFloat(Number(getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.exchange_rate).toFixed(3))}}
                </template>
              </div>
              <div v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.discount_type != 0"
                   class="h-40 w-full px-12 box-border flex items-center flex mb-4">
                <div class="w-full h-36 line-36 fz-10 bg-pink rounded-8 px-4 box-border cl-red relative">
                  <van-icon size="20"
                            class="relative top-2"
                            name="point-gift-o" />
                  {{langSwitch('充值奖励')}}
                  <!-- 区分VIPPAY -->
                  <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.discount_rate}}%,</template>
                  <template v-else>
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.discount_rate}}%,
                  </template>
                  {{langSwitch('最高奖励')}}
                  <!-- 区分VIPPAY -->
                  <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.discount_maxamount}}</template>
                  <template v-else>
                    {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.discount_maxamount}}
                  </template>
                  <div class="w-fit px-4 absolute top-6 right-4">
                    <div class="h-24 fz-12 line-24 pl-4 pr-4 bg-red cl-white rounded-4">
                      {{langSwitch('您将获赠')}}
                      <!-- 区分VIPPAY -->
                      <template v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                        {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.curreny_unit}}
                        <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount != 0">
                          {{ ( (getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.discount_rate * getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.quick_amount[rechargeAmount_index].title) / 100 ).toFixed(1) }}
                        </span>
                      </template>
                      <template v-else>
                        {{getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.curreny_unit}}
                        <span v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount != 0">
                          {{ ( (getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[0].content.discount_rate * getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount[rechargeAmount_index].title) / 100 ).toFixed(1) }}
                        </span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 银行卡 -->
              <div v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].type == 'transferClass'">
                <div class="h-6 w-full bg-f1f1f1"></div>
                <div class="h-50"
                     style='font-size:8px !important'>
                  <van-field v-model="moneyTransferName"
                             :clearable="true"
                             :label="langSwitch('汇款姓名')"
                             class="bb-1px box-border fz-12"
                             input-align="right"
                             :placeholder="langSwitch('请输入您的汇款姓名')" />
                </div>
                <div class="h-50">
                  <van-field v-model="moneyTransferMessage"
                             :clearable="true"
                             :label="langSwitch('汇款留言')"
                             class="bb-1px box-border fz-12"
                             input-align="right"
                             :placeholder="langSwitch('选填')" />
                </div>
                <div class="pt-10  pl-12 pr-12">
                  <div class="w-full h-fit ba-1px box-border rounded-4 relative rechargeBank_index scroll-hide pl-10 pr-10 pt-4 pb-4 fz-12 line-28">
                    <div class="relative"> {{langSwitch('银行卡号')}} {{ getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankNum }}
                      <div class="pl-12 pr-12 ba-1px w-fit rounded-4 line-20 absolute top-4 right bankNum"
                           :data-clipboard-text="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankNum"
                           @click="copyText('bankNum')">{{langSwitch('复制')}}</div>
                    </div>
                    <div class="relative"> {{langSwitch('收款名称')}}{{ getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankOwn }}
                      <div class="pl-12 pr-12 ba-1px w-fit rounded-4 line-20 absolute top-4 right bankOwn"
                           :data-clipboard-text="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankOwn"
                           @click="copyText('bankOwn')">{{langSwitch('复制')}}</div>
                    </div>
                    <div class="relative"> {{langSwitch('开户银行')}}{{ getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankName }}
                      <div class="pl-12 pr-12 ba-1px w-fit rounded-4 line-20 absolute top-4 right bankName"
                           :data-clipboard-text="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankName"
                           @click="copyText('bankName')">{{langSwitch('复制')}}</div>
                    </div>
                    <div class="relative"> {{langSwitch('开户网点')}}{{ getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[2].content.list[0].bankGate }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- VIPPAY 输入用户密码 -->
              <div v-if="getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY'">
                <van-field v-model="VIPPAY_password"
                           :clearable="true"
                           type="password"
                           :label="langSwitch('钱包资金密码')"
                           class="bb-1px box-border fz-12"
                           input-align="right"
                           :placeholder="langSwitch('请输入您的钱包资金密码')" />
              </div>
              <!-- 立即充值 -->
              <div class="h-60 w-full flex items-center justify-center">
                <div @click="top_up_now"
                     class="w-280 h-36 bg-red cl-white rounded-36 text-center line-36 fz-14"
                     :class="[getters_getPayConfig.data.chargeClass[paymentMethod_index]['head']['title'] == 'VIPPAY' && !VIPPAY_password ? 'bg-a8a8a8' : '']">{{langSwitch('立即充值')}}</div>
              </div>
              <div class="fz-12 px-12 box-border cl-red">{{langSwitch('重要提示：支付渠道将不定期进行更换，入款前请查看并确认最新账户再进行汇款。')}}</div>
              <div class="fz-14 px-32 box-border"
                   v-html="getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent.length-1].content.viewString">
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex-1 items-center justify-center">
        </div>
      </template>
    </div>
    <div class="absolute bottom left right h-50"
         v-if="$route.name == 'recharge'">
      <footerBar></footerBar>
    </div>

    <commonPopup :isShow="isShow"
                 @changeIsShow="isShow = false;"
                 :isNavBar="true"
                 :currentTabComponent="currentTabComponent"></commonPopup>

    <!-- 充值提示 -->
    <van-popup v-model="bindNumberTip"
               close-on-click-overlay
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-130 bg-white rounded-8 p-all-8 box-border flex flex-col">
        <div class="flex-1 flex flex-col">
          <div class="flex-1 fz-14 flex items-center justify-center relative">
            {{langSwitch('充值提示')}}
            <div class="absolute right">
              <van-icon name="close"
                        class="cl-black"
                        @click="bindNumberTip = false;"
                        size="20" />
            </div>
          </div>
          <div class="flex-1 bb-1px box-border fz-12 flex items-center justify-center">
            {{langSwitch('为了账户安全,请绑定手机号!')}}
          </div>
        </div>
        <div class="h-50 w-full flex fz-14">
          <div class="flex-1 flex items-center justify-center">
            <div class="bg-f4f4f4 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12"
                 @click="bindNumber = true"> {{langSwitch('绑定手机号')}}</div>
          </div>
          <div class="flex-1 flex items-center justify-center">
            <div class="bg-DA3E32 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12 cl-white"
                 @click="goToPay">{{langSwitch('继续充值')}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 绑定手机 -->
    <van-popup v-model="bindNumber"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right flex flex-col">
        <div class="h-36 w-full">
          <div class="w-full h-36 flex box-border van-hairline--bottom">
            <div class="w-36 h-36 flex items-center relative"
                 @click="bindNumber = false;bindNumberTip = false;">
              <van-icon size="20"
                        name="arrow-left" />
            </div>
            <div class="flex-1 fz-14 flex items-center justify-center"></div>
            <div class="w-36 h-36 text-center"></div>
          </div>
        </div>
        <div class="flex-1 relative">
          <bindPhone></bindPhone>
        </div>
      </div>
    </van-popup>

    <!-- 重要提示 -->
    <van-popup v-model="importantTip"
               close-on-click-overlay
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-130 bg-white rounded-8 p-all-8 box-border flex flex-col">
        <div class="flex-1 flex flex-col">
          <div class="flex-1 fz-14 flex items-center justify-center relative">
            {{langSwitch('重要提示')}}
            <div class="absolute right">
              <van-icon name="close"
                        class="cl-black"
                        @click="importantTip = false;"
                        size="20" />
            </div>
          </div>
          <div class="flex-1 bb-1px box-border fz-12 flex items-center justify-center">
            {{langSwitch('请进行转账后再提交订单')}}
          </div>
        </div>
        <div class="h-50 w-full flex fz-14">
          <div class="flex-1 flex items-center justify-center">
            <div class="bg-f4f4f4 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12"
                 @click="importantTip = false">{{langSwitch('未转账')}}</div>
          </div>
          <div class="flex-1 flex items-center justify-center">
            <div class="bg-DA3E32 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12 cl-white"
                 @click="toRouter('checkOrder')">{{langSwitch('已完成转账')}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navBar"
import footerBar from "@/components/footerBar";
import commonPopup from "@/components/commonPopup";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import store from '@/store';
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import { bindPhone } from "@/views/mineWidget"

export default {
  name: 'recharge',
  components: {
    navBar,
    footerBar,
    commonPopup,
    bindPhone
  },
  props: [''],
  data () {
    return {
      isShow: false,
      currentTabComponent: '',
      // recharge
      paymentMethod_index: 0,  // 支付方式
      paymentChannel_index: 0, // 支付渠道
      rechargeAmount_index: 0, // 支付金额
      moneyTransferName: '',
      moneyTransferMessage: '',
      bindNumberTip: false,
      bindNumber: false,
      importantTip: false,
      isBackIcon: false,
      VIPPAY_password: '',
      rechargeAmountInput: '',
    };
  },
  watch: {
    getters_getPayConfig: {  // 深度监听数据,重置状态解决报错问题
      handler (val) {
        this.paymentMethod_index = 0;
        this.paymentChannel_index = 0;
        this.rechargeAmount_index = 0;
      },
      deep: true
    }
  },
  created () {
    console.log(this.getters_getPayConfig)
  },
  beforeMount () { },
  mounted () {
    if (this.$route.query && (this.$route.query.back == true || this.$route.query.back == 'true')) { this.isBackIcon = true }
  },
  methods: {
    ...mapActions(['actions_getPayConfig', 'actions_getNewOrder']),
    ...mapMutations(['mutations_SET_REQUEST']),
    copyText (el) {
      let clipboard = new Clipboard(`.${el}`);
      clipboard.on('success', e => { Toast(this.langSwitch('复制成功')); clipboard.destroy() })
      clipboard.on('error', e => { Toast(this.langSwitch('复制失败')); clipboard.destroy() })
    },
    top_up_now () {
      if (!this.getters_getBaseInfo.isBindMobile) { this.bindNumberTip = true; } else {
        // 区分VIPPAY相关
        if (this.getters_getPayConfig.data.chargeClass[this.paymentMethod_index]['head']['title'] == 'VIPPAY' && !this.VIPPAY_password) {
          return
        } else {
          this.goToPay();
        }
      }
      // this.goToPay();
    },
    goToPay () {
      this.bindNumberTip = false;
      let currentSelect = this.getters_getPayConfig.data.chargeClass[this.paymentMethod_index]['models'][this.paymentChannel_index]['subContent'];
      // console.log(currentSelect);
      // 与银行卡相关的充值方式
      if (currentSelect[2].type == 'transferClass') { if (!this.rechargeAmountInput) { Toast(this.langSwitch('请输入充值金额')); return } }
      if (currentSelect[2].type == 'transferClass') { if (!this.moneyTransferName) { Toast('请输入汇款姓名'); return } }

      let channelID, money, name, msg, params;
      // 区分VIPPAY相关
      if (this.getters_getPayConfig.data.chargeClass[this.paymentMethod_index]['head']['title'] == 'VIPPAY') {
        channelID = currentSelect[1].content.channelID;
        money = currentSelect[2].content.quick_amount[this.rechargeAmount_index].title;
        name = this.moneyTransferName;
        msg = this.moneyTransferMessage;
        params = { supportPaySDK: true, supportPaySDK2: true, channelID, money, name, msg, password: this.VIPPAY_password };
      } else {
        // console.log(getters_getPayConfig.data.chargeClass[paymentMethod_index]['models'][paymentChannel_index].subContent[1].content.quick_amount.length != 0)
        channelID = currentSelect[0].content.channelID;
        if (currentSelect[2].type == 'transferClass') {
          money = this.rechargeAmountInput;
        } else {
          money = currentSelect[1].content.quick_amount[this.rechargeAmount_index].title;
        }
        name = this.moneyTransferName;
        msg = this.moneyTransferMessage;
        params = { supportPaySDK: true, supportPaySDK2: true, channelID, money, name, msg };
      }
      // console.log(params);
      this.actions_getNewOrder(params).then(res => {
        // console.log(res);
        if (res.code == 0) {
          let { turnUrl } = res.info;
          console.log(turnUrl);
          if (!turnUrl) {
            this.importantTip = true;
          } else {
            window.location.href = turnUrl;
          }
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_getPayConfig', 'getters_getBaseInfo', 'getters_getBalanceNew'])
  },
  // beforeRouteEnter: (to, from, next) => {
  //   let params = { region: store.getters.PAYREGION }
  //   store.dispatch('actions_getPayConfig', params).then((res) => {
  //     next()
  //   })
  // },
}
</script>
<style lang='scss' scoped>
.recharge {
  .van-notice-bar {
    height: 30px !important;
    font-size: 12px !important;
  }
  .paymentMethod_index {
    border-color: red;
    position: relative;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/select_img.png") 100%/100% no-repeat;
      position: absolute;
      right: -1px;
      bottom: -5px;
    }
  }
  .paymentChannel_index {
    border-color: red;
    position: relative;
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("~@/assets/images/select_img.png") 100%/100% no-repeat;
      position: absolute;
      right: -1px;
      bottom: -3px;
    }
  }

  .rechargeAmount_index {
    border-color: red;
    position: relative;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/select_img.png") 100%/100% no-repeat;
      position: absolute;
      right: -1px;
      bottom: -5px;
    }
  }
  .rechargeBank_index {
    border-color: red;
    position: relative;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/select_img.png") 100%/100% no-repeat;
      position: absolute;
      right: -1px;
      bottom: -5px;
    }
  }

  .div_amount:nth-child(even) {
    padding-left: 6px !important;
  }
  .div_amount:nth-child(odd) {
    padding-right: 6px !important;
  }
}
</style>