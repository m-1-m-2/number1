<template>
  <div class='ljtx_popup absolute top bottom left right p-all-12 box-border bg-f4f4f4'>
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
    </div>
    <!--  -->
    <div class="h-fit w-full bg-white rounded-12 mt-12 cl-a8a8a8">
      <div class="h-60 flex line-60 px-12 box-border">
        <div>{{langSwitch('输入要提取的钻石数')}}</div>
        <div class="flex-1 flex items-center justify-center">
          <van-field v-model="coin_count"
                     type="number"
                     :autofocus="true"
                     placeholder="0" />
        </div>
      </div>
      <div class="h-60 flex line-60 px-12 box-border">
        <div>{{langSwitch('可到账金额')}}</div>
        <div class="flex-1 pl-8 cl-DA3E32 fz-14 bolder">{{ coin_count? (coin_count * getters_rootStore.region_exchange_info.exchange_rate).toFixed(2): 0 }} {{ getters_rootStore.region_exchange_info.region_curreny == 'VND'? 'KC': getters_rootStore.region_exchange_info.region_curreny }}</div>
      </div>
    </div>
    <!--  -->
    <div class="h-fit bg-white px-12 mt-12 rounded-12">
      <div class="w-full h-50 box-border bg-white flex items-center"
           @click="withdrawalMethod">
        <div class="flex-1 flex">
          <div v-if="!withdrawAccount">
            {{langSwitch('请选择提现账户')}}
          </div>
          <div v-else
               class="flex items-center">
            <div class="pr-8">
              <van-icon size="20"
                        name="idcard" />
            </div>
            <div class="px-2">{{withdrawAccount.account}}</div>
            <div class="px-2">({{withdrawAccount.name}})</div>
          </div>
        </div>
        <div class="w-fit">
          <van-icon size="20"
                    name="arrow" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="mt-16 mb-24 h-fit flex items-center justify-center">
      <div class="pt-12 pb-12 pl-108 pr-108 rounded-24 cl-white"
           @click="ljtxFun"
           style="background: linear-gradient(to bottom right, #A4FEFF, #A000F0)"> {{langSwitch('立即提现')}} </div>
    </div>

    <!-- popup -->
    <van-popup v-model="is_withdrawalMethod"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right flex flex-col">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="is_withdrawalMethod = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('提现账户')}}</span>
          </div>
          <div class="w-36 h-36 flex items-center text-center">
            <div class="cl-red fz-12"
                 @click="withdrawMethodShow = true">{{langSwitch('添加')}}</div>
          </div>
        </div>
        <div class="flex-1 fz-12 text-center">
          <div class="h-40 line-40"
               v-if="getters_getUserAccountList.length == 0">{{langSwitch('暂无提现账户')}}</div>
          <div v-else>
            <van-radio-group v-model="radio_bankName">
              <div class="h-40 items-center box-border van-hairline--bottom flex px-12"
                   v-for="(v,k) in getters_getUserAccountList"
                   :key="k+'getters_getUserAccountList'">
                <div>
                  <van-radio @click="selectWithdrawAccount(v)"
                             :name="v.id"></van-radio>
                </div>
                <div class="px-8 box-border">
                  <van-icon size="20"
                            name="idcard" />
                </div>
                <div class="px-2 box-border">
                  {{v.account}}
                </div>
                <div class="px-2 box-border">
                  ({{v.name}})
                </div>
                <div class="px-2 box-border"
                     style="margin-left: auto;">
                  <van-icon size="16"
                            @click="delUserAccount(v, k)"
                            name="delete-o" />
                </div>
              </div>
            </van-radio-group>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="withdrawMethodShow"
               round>
      <div class="w-280 rounded flex flex-col">
        <div class="h-44 line-44 text-center box-border bb-1px">{{langSwitch("请选择提现方式")}}</div>
        <!-- template -->
        <!-- [ 3-okpay , 4-gopay , 5-银行卡 , 6-USDT , 14 ] -->
        <template v-for="(val ,k) in getters_getWithdraw.support_withdraw_type">
          <div class="h-44 line-44 text-center box-border bb-1px"
               v-if="val.plat_ids.split(',').includes(PLATFORM)"
               :key="k+'support_withdraw_type'"
               @click="withdrawMethodFun(val)">
            {{val.title}}
          </div>
        </template>
      </div>
    </van-popup>

    <!-- commonPay -->
    <van-popup v-model="is_commonPay"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right flex flex-col">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="is_commonPay = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('绑定')}}{{commonPayObj.title}}</span>
          </div>
          <div class="w-36 h-36 flex items-center text-center">
          </div>
        </div>
        <div class="flex-1">
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.username"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       :label="langSwitch('真实姓名')"
                       :placeholder="langSwitch('请输入真实姓名')" />
          </div>
          <div class="h-40 box-border px-6 flex line-44">
            <div class="flex-1 fz-12 pl-16 cl-646566 box-border">{{commonPayObj.title}}{{langSwitch("地址")}}</div>
            <div class="flex-1 text-right pr-16 cl-red box-border"
                 @click="pasteMsg($event)">{{langSwitch("粘贴")}}</div>
          </div>
          <div class="
                 h-40
                 box-border
                 px-6">
            <van-field v-model="bindData.bankNumber"
                       :clearable="true"
                       class="bb-1px h-40 fz-12 box-border" />
          </div>
          <div class="mt-10 flex justify-center">
            <div @click="bindCommonPay"
                 class="fz-12 cl-red pl-36 pr-36 rounded-20 pt-8 pb-8 w-fit bg-white ba-1px">{{langSwitch('绑定')}}{{commonPayObj.title}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="is_bankRegion"
               :style="{ height: '40%',width: '100%' }"
               position="bottom">
      <van-picker :title="langSwitch('开户地区')"
                  show-toolbar
                  @cancel="is_bankRegion = false"
                  @confirm="onConfirm_bankRegion"
                  :columns="columns" />
    </van-popup>

    <van-popup v-model="is_bankName"
               :style="{ height: '100%',width: '100%' }"
               position="right">
      <div class="absolute top bottom left right flex flex-col">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="is_bankName = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('请选择开户银行')}}</span>
          </div>
          <div class="w-36 h-36 flex items-center text-center">
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute top bottom left right scroll-y">
            <div class="h-40 line-40  w-full van-hairline--bottom box-border">
              <van-field v-model="search"
                         :clearable="true"
                         class="bb-1px h-40 fz-14 box-border"
                         :placeholder="langSwitch('请输入搜索关键字')" />
            </div>
            <div v-for="(v,k) in bankName_columns"
                 :key="k+'bankName_columns'">
              <div class="van-hairline--bottom red h-36 line-36 px-12 box-border w-full box-border"
                   @click="onConfirm_bankName(v)"
                   v-if="v.bank_name.includes(search)">
                {{v.bank_name}}
              </div>
            </div>

          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="switchExchangeRate_bool"
               :style="{ height: '100%',width: '100%' }"
               position="right">
      <div class="absolute top bottom left right flex flex-col">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="switchExchangeRate_bool = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('货币类型')}}</span>
          </div>
          <div class="w-36 h-36 flex items-center text-center">
          </div>
        </div>
        <div class="flex-1 relative">
          <currencyType @closeChildPopup="closeChildPopup"></currencyType>
        </div>
      </div>
    </van-popup>

    <!-- 银行卡 -->
    <van-popup v-model="is_bindBankCard"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right flex flex-col">
        <div class="w-full h-36 flex box-border van-hairline--bottom">
          <div class="w-36 h-36 flex items-center justify-center">
            <van-icon @click="is_bindBankCard = false"
                      size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 fz-14 flex items-center justify-center">
            <span>{{langSwitch('绑定银行卡')}}</span>
          </div>
          <div class="w-36 h-36 flex items-center text-center">
          </div>
        </div>
        <div class="flex-1">
          <div class="h-40 box-border px-6">
            <van-cell :title="langSwitch('货币类型')"
                      class="fz-12"
                      :value="getters_rootStore.region_exchange_info.region_curreny"
                      @click="showSwitchExchangeRate"
                      is-link>
            </van-cell>
          </div>
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.username"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       :label="langSwitch('持卡人姓名')"
                       :placeholder="langSwitch('请输入持卡人姓名')" />
          </div>
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.bankNumber"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       :label="langSwitch('银行卡号')"
                       :placeholder="langSwitch('请输入银行卡号')" />
          </div>
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.bankRegion"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       :label="langSwitch('开户地区')"
                       readonly
                       @click="getBankRegions"
                       :placeholder="langSwitch('请输入开户地区')" />
          </div>
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.bankName"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       readonly
                       @click="getBankName"
                       :label="langSwitch('开户银行')"
                       :placeholder="langSwitch('请输入开户银行')" />
          </div>
          <div class="h-40 box-border px-6">
            <van-field v-model="bindData.bankOutlets"
                       :clearable="true"
                       input-align="right"
                       class="bb-1px h-40 fz-12 box-border"
                       :label="langSwitch('开户网点')"
                       :placeholder="langSwitch('请输入开户网点')" />
          </div>
          <div class="line-20 fz-10 cl-red px-12 box-border">
            {{langSwitch('转入他人卡号将无法返回,请仔细核对卡号,避免造成不必要的损失')}}
          </div>
          <div class="mt-10 flex justify-center">
            <div @click="bindNewBankCard"
                 class="fz-12 cl-red pl-36 pr-36 rounded-20 pt-8 pb-8 w-fit bg-white ba-1px">{{langSwitch('绑定银行卡')}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast } from 'vant';
import currencyType from "@/views/widget/currencyType";

export default {
  name: 'ljtx_popup',
  components: { currencyType },
  props: ['info'],
  data () {
    return {
      coin_count: '',
      isShow: false,
      currentTabComponent: '',
      is_withdrawalMethod: false,
      is_bindOkpay: false,
      is_bindGopay: false,
      is_bindUSDT: false,
      is_bindBankCard: false,
      is_commonPay: false,
      commonPayObj: "",
      //bindData 绑定银行卡
      bindData: {},
      is_bankRegion: false,
      columns: [],
      regions: '',
      is_bankName: false,
      search: '',
      bankName_columns: [],
      radio_bankName: '',
      withdrawAccount: '',
      userBalance: '',
      switchExchangeRate_bool: false,
      withdrawMethodShow: false,
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getBankInfo', 'actions_postWithdraw', 'actions_getSetUserAccount', 'actions_getUserAccountList', 'actions_getDelUserAccount', 'actions_getBankRegions']),
    withdrawMethodFun (val) {
      // withdrawMethodShow
      // <!-- [ 3-okpay , 4-gopay , 5-银行卡 , 6-USDT , 14 VIPpay] -->
      if (val.id == 5) { this.withdrawMethodShow = false; this.is_bindBankCard = true; this.commonPayObj = val; this.bindData = {}; }
      else if (val.id == 3 || val.id == 4 || val.id == 6 || val.id == 14) { this.withdrawMethodShow = false; this.is_commonPay = true; this.commonPayObj = val; this.bindData = {}; }
    },
    showSwitchExchangeRate () {
      this.switchExchangeRate_bool = true;
    },
    closeChildPopup () {
      this.switchExchangeRate_bool = false;
    },
    delUserAccount (v, k) {
      let { id } = v;
      if (this.withdrawAccount.id == id) {
        this.withdrawAccount = '';
        this.radio_bankName = '';
      }
      let params = { id };

      this.actions_getDelUserAccount(params).then(res => {
        if (res.code == 0) { Toast(res.msg) }
        // local delete;
        this.getters_getUserAccountList.splice(k, 1);
      })
    },
    selectWithdrawAccount (v) {
      this.withdrawAccount = v;
      this.is_withdrawalMethod = false;
    },
    withdrawalMethod () {
      if (!this.withdrawAccount) { this.radio_bankName = '' } else { this.radio_bankName = this.withdrawAccount.id };
      this.actions_getUserAccountList().then(res => { this.is_withdrawalMethod = true });
    },
    getBankName () {
      if (!this.bindData.region) { Toast(this.langSwitch('请输入开户地区')); return; }
      let params = { region: this.bindData.region, }
      this.actions_getBankInfo(params).then(res => {
        this.bankName_columns = res.info.bank_info;
        this.search = '';
        this.is_bankName = true;
      })
    },
    getBankRegions () {
      this.columns = [];
      this.actions_getBankRegions().then(res => {
        this.regions = res.info.regions;
        Object.keys(this.regions).forEach((key) => {
          this.columns.push({ text: this.regions[key], region: key })
        })
        this.is_bankRegion = true
      })
    },
    onConfirm_bankRegion (v, i) {
      this.bindData.bankRegion = this.columns[i].text;
      this.bindData.region = this.columns[i].region;
      this.is_bankRegion = false;
    },
    onConfirm_bankName (v) {
      this.bindData.bankName = v.bank_name;
      this.is_bankName = false;
    },
    bindCommonPay () {
      // 点击提交相关支付方式;
      if (!this.bindData.username) { Toast(this.langSwitch('请输入真实姓名')); return; }
      if (!this.bindData.bankNumber) { Toast(this.langSwitch('请输入账户地址')); return; }
      let params = {
        account: this.bindData.bankNumber,
        name: this.bindData.username,
        account_bank: this.commonPayObj.title,
        type: this.commonPayObj.num,
      }

      this.actions_getSetUserAccount(params).then(res => {
        if (res.code == 1004) { Toast(res.msg); return; }
        this.actions_getUserAccountList().then(res => {
          this.is_commonPay = false;
        })
      })
    },
    bindNewOkpay () {
    },
    bindNewGopay () {
    },
    bindNewUSDT () {
    },
    bindNewBankCard () {
      if (!this.bindData.username) { Toast(this.langSwitch('请输入持卡人姓名')); return; }
      if (!this.bindData.bankNumber) { Toast(this.langSwitch('请输入银行卡号')); return; }
      if (!this.bindData.bankRegion) { Toast(this.langSwitch('请输入开户地区')); return; }
      if (!this.bindData.bankName) { Toast(this.langSwitch('请输入开户银行')); return; }
      if (!this.bindData.bankOutlets) { Toast(this.langSwitch('请输入开户网点')); return; }

      let params = {
        account: this.bindData.bankNumber,
        name: this.bindData.username,
        account_bank: this.bindData.bankName,
        account_address: this.bindData.bankRegion,
        account_gate: this.bindData.bankOutlets,
        // type: this.getters_rootStore.region_exchange_info.id,
        type: this.commonPayObj.num,
      }
      this.actions_getSetUserAccount(params).then(res => {
        if (res.code == 1004) { Toast(res.msg); return; }
        this.actions_getUserAccountList().then(res => {
          this.is_bindBankCard = false
        })
      })
    },
    ljtxFun () {
      if (!this.coin_count || this.coin_count == 0) { Toast(this.langSwitch('请输入钻石数')); return; }
      if (!this.withdrawAccount) { Toast(this.langSwitch('请选择提现账户')); return }

      let params = { coin: this.coin_count, id: this.withdrawAccount.id, account: this.withdrawAccount.account, name: this.withdrawAccount.name }
      const formData = new FormData()
      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      });
      this.actions_postWithdraw(formData).then(res => {
        if (res.code == 0) { Toast(res.msg) }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'getters_getUserAccountList', 'getters_getWithdraw', 'PLATFORM'])
  }
}
</script>
<style lang='scss' scoped>
.ljtx_popup {
}
</style>