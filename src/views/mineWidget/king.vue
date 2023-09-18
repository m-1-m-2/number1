<template>
  <div class='king absolute top bottom left right fz-12'>
    <van-tabs v-model="currentTab"
              animated>
      <van-tab :title="langSwitch('王者特权')"
               name="tq">
      </van-tab>
      <van-tab :title="langSwitch('王者详情')"
               name="xq">
      </van-tab>
    </van-tabs>
    <div class="absolute top-36 bottom left right">
      <div v-if="currentTab == 'tq'"
           class="absolute top bottom left right scroll-y">
        <div class="relative">
          <div class="p-all-16 h-160 w-full box-border">
            <div class="w-full h-full bg-black rounded-4 flex cl-white">
              <div class="flex-1 h-full flex flex-col py-12 box-border">
                <div class="flex-1 flex items-center pl-20 box-border">
                  <div>
                    <div class="fz-14">{{langSwitch("王者")}}V{{getters_getKing_getList.level}}</div>
                    <div class="line-20">{{langSwitch("当前王者等级王者")}}:VIP{{getters_getKing_getList.level}}</div>
                  </div>
                </div>
                <div class="flex-1 flex items-center pl-20 box-border">
                  <div>
                    <div class="line-20">{{langSwitch("还差")}}{{getters_getKing_getList.leve_c_end}}{{langSwitch("充值升级到王者")}}V{{getters_getKing_getList.level * 1 + 1}}</div>
                  </div>
                </div>
              </div>
              <div class="w-120 h-full flex items-center justify-center">
                <img class="h-68 w-68"
                     :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_king.png`)" />
              </div>
            </div>
          </div>
          <div class="w-full bg-black box-border cl-white line-36 flex">
            <div class="mr-12 bg-grey px-12 h-36"
                 style="border-top-right-radius: 18px;border-bottom-right-radius: 18px;">{{langSwitch("王者")}}V{{getters_getKing_getList.level}}</div>
            <div>{{langSwitch("尊贵的王者")}}V{{getters_getKing_getList.level}}{{langSwitch("会员")}},{{langSwitch("您可以享受以下权益")}}</div>
          </div>
          <div class="pt-12">
            <template v-for="(v, k) in getters_getKing_getList.reward_list">
              <div class="h-56 w-full px-12 box-border"
                   :key="k +'reward_list'">
                <div class="w-full h-full bg-f2cf40 p-all-8 flex box-border rounded-4">
                  <div class="pr-8 box-border flex items-center">
                    <van-icon size="30"
                              name="balance-o" />
                  </div>
                  <div class="flex-1 flex flex-col">
                    <div class="flex-1 flex items-center fz-16 bolder">{{v.reward_money}}</div>
                    <div class="flex-1 flex items-center bolder">{{v.reward_title}}</div>
                  </div>
                  <div class="flex-1 flex items-center justify-end">
                    <template v-if="v.reward_can_get != 0">
                      <div class="pl-20 pr-20 pt-6 pb-6 bg-grey w-fit cl-white rounded-4"
                           @click="getRewardEvent(v)">{{langSwitch('可领取')}}</div>
                    </template>
                    <template v-else>
                      <div class="pl-20 pr-20 pt-6 pb-6 bg-grey w-fit cl-white rounded-4">{{langSwitch('不可领取')}}</div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-if="currentTab == 'xq'">
        <div class="relative absolute top bottom left right">
          <div class="w-full h-30 line-30 text-center flex van-hairline--top van-hairline--bottom box-border fz-10 bg-f1f1f1">
            <div class="flex-1 rightBorder box-border">{{langSwitch('王者级别')}}</div>
            <div class="flex-1 rightBorder box-border">{{langSwitch('总充值范围')}}</div>
            <div class="flex-1 rightBorder box-border">{{langSwitch('晋级彩金')}}</div>
            <div class="flex-1 box-border">{{langSwitch('周俸禄')}}</div>
          </div>
          <div class="absolute top-36 bottom left right scroll-y">
            <div v-for="(v, k) in getters_getKing_getList.list"
                 class="flex w-full h-30 line-30 text-center tableStyle"
                 :key="k+ 'listKing'">
              <div class="flex-1 van-hairline--bottom rightBorder box-border">{{langSwitch('王者')}}V{{v.level}}</div>
              <div class="flex-1 van-hairline--bottom rightBorder box-border">{{v.c_charge}}+</div>
              <div class="flex-1 van-hairline--bottom rightBorder box-border">{{v.levelup_reward}}{{langSwitch('钻石')}}</div>
              <div class="flex-1 van-hairline--bottom box-border">{{v.week_reward}}{{langSwitch('钻石')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'king',
  components: {},
  props: [''],
  data () {
    return {
      currentTab: 'tq',
      getters_getKing_getList: ''
    };
  },
  watch: {},
  created () {
    this.actions_getKing_getList().then(res => {
      if (res.code == 0) { this.getters_getKing_getList = res.info[0]; }
    })
  },
  beforeMount () { },
  mounted () {

  },
  methods: {
    ...mapActions(['actions_getKing_getList', 'actions_getKing_getReward']),
    getRewardEvent (val) {
      let { reward_type } = val;
      this.actions_getKing_getReward({ reward_type }).then(res => {
        if (res.code == 0) { this.actions_getKing_getList() } else { Toast(res.msg) }
      })
    },
  },
  computed: {
    ...mapGetters(['getters_rootStore', 'LANG'])
  }
}
</script>
<style lang='scss'>
.king {
  .van-tabs__wrap {
    height: 36px !important;
  }
  .rightBorder {
    border-right: 1px solid #f1f1ff;
  }
  .tableStyle:nth-child(even) {
    background: #f1f1f1;
  }
}
</style>