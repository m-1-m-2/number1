<template>
  <div class='lotteryBetHistory'>
    <!-- 投注记录 -->
    <van-popup v-model="isBetHistory"
               position="bottom"
               :overlay="false"
               :style="{ height: '100%',width: '100%', }"
               style="background:transparent !important;">
      <div class="w-full h-600 bg-white absolute bottom flex flex-col">
        <div class="h-36 box-border van-hairline--bottom flex w-full">
          <div class="w-36 h-36 flex items-center justify-center"
               @click="$emit('changeIsBetHistory')">
            <van-icon size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1 h-36 line-36 text-center fz-14">{{langSwitch('投注记录')}} </div>
          <div class="w-36"></div>
        </div>
        <div class="w-full h-36 flex scroll-hide">
          <div class="flex-1">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value_lottery"
                                 @change="change_option_lottery"
                                 :options="option_lottery" />
            </van-dropdown-menu>
          </div>
          <div class="flex-1">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value_status"
                                 @change="change_option_status"
                                 :options="option_status" />
            </van-dropdown-menu>
          </div>
          <div class="flex-1">
            <div class="van-dropdown-menu"
                 @click="calendarShow = true">
              <div class="van-dropdown-menu__bar">
                <div role="button"
                     tabindex="0"
                     class="van-dropdown-menu__item"><span class="van-dropdown-menu__title">
                    <div class="van-ellipsis">{{langSwitch('时间筛选')}} </div>
                  </span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fz-12 w-full h-24 line-24 text-center bg-f1f1f1">{{calendarDate}}</div>
        <div class="flex-1 relative">
          <div class="absolute top bottom left right scroll-y">
            <van-pull-refresh v-model="refreshing"
                              @refresh="onRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        :finished-text="langSwitch('没有更多了')"
                        @load="onLoad">

                <div class="w-full fz-12 px-8 box-border mt-2"
                     v-for="(v,k) in lotteryBetHistory_list"
                     :key="k+'lotteryBetHistory_list'">
                  <div class="h-30 fz-16 bolder line-30">{{v.lotteryName}}</div>
                  <div class="flex">
                    <div class="flex-1 text-left">
                      <div class="h-20 line-20">{{langSwitch('期号')}}: {{v.issue}}</div>
                      <div class="h-20 line-20">{{langSwitch('投注内容')}}: {{v.way}}</div>
                      <div class="h-20 line-20">{{langSwitch('投注日期')}}: {{ $moment(Number(v.tm * 1000)).format("YYYY-MM-DD HH:mm") }}</div>
                    </div>
                    <div class="w-100 text-right">
                      <div class="h-20 line-20 fz-14 bolder cl-green">{{v.money}}</div>
                      <div class="h-20 line-20 fz-14 bolder cl-red">{{v.profit}}</div>
                      <div class="h-20 line-20">{{langSwitch('状态')}}: {{option_status[Number(v.state) + 1].text}}</div>
                    </div>
                  </div>
                  <div class="h-8 bb-1px box-border"></div>
                </div>

              </van-list>
            </van-pull-refresh>
          </div>
        </div>
        <div v-if="fnUseBool && getters_getBetList2"
             class="w-full h-60 bg-f1f1f1 box-border van-hairline--top flex fz-12 text-center line-30">
          <div class="flex-1 flex flex-col">
            <div class="flex-1">{{langSwitch('投注')}}</div>
            <div class="flex-1 cl-red"><span v-if="getters_getBetList2.total.money">-</span>{{ Number(getters_getBetList2.total.money).toFixed(2) || 0 }}</div>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="flex-1">{{langSwitch('中奖')}}</div>
            <div class="flex-1 cl-green"><span v-if="getters_getBetList2.total.profit">+</span>{{ Number(getters_getBetList2.total.profit).toFixed(2) || 0}}</div>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="flex-1">{{langSwitch('盈利')}}</div>
            <div class="flex-1"
                 :class="[(getters_getBetList2.total.profit - getters_getBetList2.total.money).toFixed(2) > 0 ? 'cl-red': 'cl-green']">
              <span v-if="(getters_getBetList2.total.profit - getters_getBetList2.total.money).toFixed(2)">{{(getters_getBetList2.total.profit - getters_getBetList2.total.money).toFixed(2) > 0?'+':''}}</span>
              {{ (getters_getBetList2.total.profit - getters_getBetList2.total.money).toFixed(2) || 0 }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 时间 -->
    <van-calendar v-model="calendarShow"
                  type="range"
                  allow-same-day
                  :default-date="defaultDateRange"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @confirm="onConfirm" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'lotteryBetHistory',
  components: {},
  props: ['isBetHistory'],
  data () {
    return {
      option_lottery: [
        { text: this.langSwitch('全部类型'), value: 0 },
      ],
      value_lottery: 0,
      option_status: [
        { text: this.langSwitch('全部状态'), value: -1 },
      ],
      value_status: -1,
      calendarShow: false,
      calendarDate: '',
      defaultDateRange: '',
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2030, 11, 31),
      // 拼接一次的判定值
      initOnce: false,
      // request
      params: { page: 1 },
      lotteryBetHistory_list: [],
      refreshing: false,
      loading: false,
      finished: false,
      // 组件内函数方法调用
      fnUseBool: false,
    };
  },
  watch: {},
  created () {
    let nowDate = new Date();
    this.calendarDate = `${this.formatDate(nowDate)} - ${this.formatDate(nowDate)}`;
    this.defaultDateRange = [nowDate, nowDate];
  },
  beforeMount () { },
  mounted () {

  },
  methods: {
    ...mapActions(['actions_getBetList2']),
    change_option_lottery (value) { this.onRefresh(); },
    change_option_status (value) { this.onRefresh(); },
    onRefresh () {
      this.finished = false;
      this.loading = true;
      this.params.page = 1;
      this.lotteryBetHistory_list = [];
      this.onLoad();
    },
    onLoad () {
      this.fnUseBool = true;
      //  请求参数为空,然后或者配置值
      let start_time = this.getZeroTime(this.defaultDateRange[0]);
      let end_time = this.getZeroTime(this.defaultDateRange[1]) + (24 * 60 * 60 * 1000);
      this.params = Object.assign(this.params, { lottery_type: this.value_lottery, status: this.value_status, start_time: start_time / 1000, end_time: end_time / 1000 })
      this.actions_getBetList2(this.params).then((res) => {
        if (res.code == 0) {
          // 有且只拼接一次
          if (!this.initOnce) {
            // 拼接彩票类型
            this.option_lottery = this.option_lottery.concat(JSON.parse(JSON.stringify(res.info.lotterysInfo).replace(/lname/g, 'text').replace(/lid/g, 'value')));
            // 拼接状态类型
            this.option_status = this.option_status.concat(JSON.parse(JSON.stringify(res.info.statusInfo).replace(/sname/g, 'text').replace(/sid/g, 'value')));
          }
          this.initOnce = true;
          this.lotteryBetHistory_list.push.apply(this.lotteryBetHistory_list, res.info.list);
          this.params.page += 1;
          this.loading = false;
          if (res.info.list.length == 0) { this.finished = true; }
          this.refreshing = false;
        }
      });
    },
    formatDate (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm (date) {
      const [start, end] = date;
      this.defaultDateRange = [start, end];
      this.calendarDate = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.calendarShow = false;
      this.onRefresh();
    },
    // 当前日期零点时间戳
    getZeroTime (time) {
      return new Date(time.toLocaleDateString()).getTime();
    }
  },
  computed: {
    ...mapGetters(['getters_getBetList2'])
  }
}
</script>
<style lang='scss' scoped>
.lotteryBetHistory {
}
</style>