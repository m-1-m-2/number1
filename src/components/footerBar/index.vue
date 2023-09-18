<template>
  <div class="footerBar w-full h-50 text-center flex fz-12 van-hairline--top box-border">
    <div class="flex-1 flex flex-col"
         :class="{'active': isActive == 'home'}"
         @click="toRouter('home')">
      <div class="flex-1 h-30 pt-4 box-border">
        <img :src="require(`@/assets/images/main_bottomtab_home_${ isActive == 'home'?'sel':'normal'}@2x.png`)"
             class="h-20 w-24"
             alt="">
      </div>
      <div class="flex-1 h-20">
        {{ langSwitch('首页') }}
      </div>
    </div>
    <div class="flex-1 flex flex-col"
         v-if="masterSwitch"
         :class="{'active': isActive == 'recharge'}"
         @click="toRouter('recharge')">
      <div class="flex-1 h-30 pt-4 box-border">
        <img :src="require(`@/assets/images/main_bottomtab_circle_${ isActive == 'recharge'?'sel':'normal'}@2x.png`)"
             class="h-20 w-24"
             alt="">
      </div>
      <div class="flex-1 h-20">
        {{langSwitch('充值') }}
      </div>
    </div>
    <div class="flex-1 flex flex-col"
         v-if="masterSwitch"
         @click="getTaskListFun">
      <div class="flex-1 h-30 pt-4 box-border relative flex items-center justify-center">
        <img src="~@/assets/images/main_bottom_baoxiang.png"
             class="h-30 w-36 absolute z-index-2"
             style="top:-8px;"
             alt="">
      </div>
      <div class="flex-1 h-20">
        {{ langSwitch('宝箱') }}
      </div>
    </div>
    <div class="flex-1 flex flex-col"
         v-if="masterSwitch"
         :class="{'active': isActive == 'game'}"
         @click="toRouter('game')">
      <div class="flex-1 h-30 pt-4 box-border">
        <img :src="require(`@/assets/images/main_bottomtab_play_${ isActive == 'game'?'sel':'normal'}@2x.png`)"
             class="h-20 w-28"
             alt="">
      </div>
      <div class="flex-1 h-20">
        {{ langSwitch('游戏') }}
      </div>
    </div>
    <div class="flex-1 flex flex-col"
         :class="{'active': isActive == 'mine'}"
         @click="toRouter('mine')">
      <div class="flex-1 h-30 pt-4 box-border">
        <img :src="require(`@/assets/images/main_bottomtab_mine_${ isActive == 'mine'?'sel':'normal'}@2x.png`)"
             class="h-20 w-20"
             alt="">
      </div>
      <div class="flex-1 h-20">
        {{ langSwitch('我的') }}
      </div>
    </div>
    <!-- 宝箱弹框 -->
    <van-popup v-model="isBoxPopup"
               class="text-center fz-12"
               position="bottom"
               style="background:transparent !important;"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right flex items-center justify-center">
        <div class="h-500 w-356 relative rounded-8 scroll-hide">
          <div class="absolute top bottom left right">
            <div class="absolute top w-356 h-32 line-32 fz-16 cl-white"
                 style="background: linear-gradient(to bottom right, #FE2A80, #FE2A8C)">
              {{langSwitch('任务大厅')}}
              <div class="absolute top-4 right-8">
                <van-icon name="close"
                          class="cl-white"
                          @click="isBoxPopup = false"
                          size="20" />
              </div>
            </div>
            <div class="absolute top-32 bottom left right w-356 scroll-hide">
              <div class="w-356 absolute top bottom left right">
                <van-tabs v-model="isTaskActive"
                          line-width="70px"
                          :ellipsis="false"
                          color="#FE2A8C"
                          title-active-color="#FE2A8C"
                          @click="currentContentResult()"
                          animated>
                  <van-tab v-for="(v,k) in boxSetData"
                           :key="k"
                           :title="v">
                    <div class="h-424 scroll-y bg-f1f1f1 px-8 pt-8 box-border"
                         v-cloak>
                      <div class="w-full bg-white rounded-8 pl-8 pr-8 pt-4 pb-4 box-border mb-8"
                           v-for="(v,k) in currentContent"
                           :key="k">
                        <div class="w-full h-16 line-16 text-left cl-00a000 bolder">
                          {{v.title}}
                        </div>
                        <div class="w-full h-16 line-16 text-left cl-a8a8a8">
                          {{v.desc}}
                        </div>

                        <div class="w-full h-fit flex">
                          <div class="flex-1 flex flex-col"
                               :data-info="v.condition_info">
                            <div class=" w-full pr-20 box-border flex items-center justify-center">
                              <div class="w-full pt-5 ">
                                <van-progress :percentage="(Number(v.condition_info[0].cur_num)/Number(v.condition_info[0].condition_num)) > 1 ? 1 * 100 : (Number(v.condition_info[0].cur_num)/Number(v.condition_info[0].condition_num)) * 100"
                                              stroke-width="8px"
                                              :show-pivot="false" />
                              </div>
                            </div>

                            <div class="h-fit text-left pt-8"
                                 style="color: #FE2A8C">
                              {{`${v.condition_info[0].desc}(${v.condition_info[0].cur_num}/${v.condition_info[0].condition_num})`}}
                            </div>
                          </div>
                          <div class="">
                            <div class="cl-00a000">
                              <div v-html="formatWord(v.task_reward_desc)"></div>
                            </div>
                            <div class="pt-4"
                                 style="float: right">
                              <div class="p-all-4 bg-orange cl-white rounded-16 w-60 "
                                   @click="goToDoing(v)">
                                {{ v.completed == 1 ? langSwitch('已完成') : v.condition_info[0].cur_num >= v.condition_info[0].condition_num ? langSwitch('领取') : langSwitch('去完成') }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full h-20 fz-10 line-20 cl-a8a8a8">
                          {{langSwitch('时间')}}:{{ $moment(Number(v.start_time * 1000)).format("YYYY-MM-DD HH:mm") }} - {{ $moment(Number(v.end_time * 1000)).format("YYYY-MM-DD HH:mm") }}
                        </div>
                      </div>
                    </div>
                  </van-tab>
                </van-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'footerBar',
  components: {},
  props: [''],
  data () {
    return {
      isActive: 'home',
      isActiveArray: ['attention', 'live', 'play'],
      isBoxPopup: false,
      isTaskActive: 0,
      boxData: '',
      boxSetData: '',
      currentContent: '',
    };
  },
  watch: {},
  created () {
    // 数据改变
    // let { data } = this.getters_getTaskList;
    // this.boxData = data;
    // this.boxSetData = this.translateData(data);
    // this.currentContentResult();
  },
  beforeMount () { },
  mounted () {
    let name;
    name = this.$route.name;
    this.isActive = this.isActiveArray.includes(name) ? 'home' : name;
  },
  methods: {
    ...mapActions(['actions_getTaskList', 'actions_getTaskReward']),
    translateData (data) {
      let s = new Set();
      data.map((v, k) => {
        s.add(v.group)
      })
      return Array.from(s);
    },
    currentContentResult () {
      let data = this.boxData, group = this.boxSetData[this.isTaskActive];
      this.currentContent = [];
      data.map((v, k) => {
        if (v.group == group) this.currentContent.push(v);
      });
    },
    getTaskListFun () {
      this.actions_getTaskList().then(res => {
        if (res.code == 0) {
          let { data } = res.info[0];
          this.boxData = data;
          this.boxSetData = this.translateData(data);
          this.isTaskActive = 0;
          this.currentContentResult();
          this.isBoxPopup = true;
        } else { Toast(res.msg) }
      })
    },
    goToDoing (v) {
      if (v.completed == 1) {
        //
      } else {
        if (v.condition_info[0].cur_num >= v.condition_info[0].condition_num) {
          let params = { taskID: v.id }
          this.actions_getTaskReward(params).then(res => {
            if (res.code == 0) { Toast('ok') } else { Toast(res.msg) }
          })
        } else {
          let { name } = this.$route;
          let condition_type = v.condition_info[0].condition_type;
          if (condition_type == 4) {
            if (name == 'recharge') { this.isBoxPopup = false; return; }
            this.toRouter('recharge');
          } else {
            if (name == 'game') { this.isBoxPopup = false; return; }
            this.toRouter('game');
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getters_getTaskList', 'masterSwitch']),
  },
}
</script>
<style lang='scss' scoped>
[v-cloak] {
  display: none;
}
.footerBar {
  .active {
    color: red;
  }
}
</style>