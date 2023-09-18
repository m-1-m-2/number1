<template>
  <div class='incomeDetails absolute top bottom left right fz-14 flex justify-center'
       v-cloak>
    <!--  -->
    <div class="absolute w-300 h-36 flex"
         style="background:transparent !important;top: -36px;">
      <div class="flex-1 flex justify-center items-center bg-white h-36 scroll-hide">
        <!-- 
        &nbsp;
        <van-icon size="12"
                  name="arrow-down" /> -->
        <van-dropdown-menu>
          <van-dropdown-item v-model="income_value"
                             @change="change_selectTime"
                             :options="income_option" />
        </van-dropdown-menu>
      </div>
    </div>
    <!--  -->
    <div class="absolute top bottom left right">
      <div class="w-full h-30 fz-12 line-30 absolute">
        <div class="w-full text-center">{{langSwitch('本日')}}{{income_value == 'in'?langSwitch('收入'):langSwitch('消费')}} {{income_value == 'in'?getters_getCoinRecord.income_total:getters_getCoinRecord.expend_total}} {{langSwitch('钻石')}}</div>
        <div class="absolute h-30 w-fit top right flex items-center px-12 box-border"
             @click="$emit('change_calendar')">
          {{$moment(select_time).format('MM/DD')}} &nbsp;
          <van-icon size="12"
                    name="arrow-down" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'incomeDetails',
  components: {},
  props: ['select_time'],
  data () {
    return {
      income_value: 'in',
      income_option: [
        { text: this.langSwitch('收入明细'), value: 'in' },
        { text: this.langSwitch('消费明细'), value: 'out' },
      ],
      getters_getCoinRecord: ''
    };
  },
  watch: {
    select_time () { this.request_common(1); }
  },
  created () {
    this.request_common(1);
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getCoinRecord']),
    change_selectTime () {
      this.request_common(1);
    },
    // 请求方法公共化;
    request_common (page, callback = () => { }) {
      let params = {
        start_time: Math.floor(this.select_time.getTime() / 1000),
        end_time: Math.floor((this.select_time.getTime() + (24 * 60 * 60 * 1000)) / 1000),
        page,
        type: this.income_value,
      }
      this.actions_getCoinRecord(params).then(res => {
        callback()
        this.getters_getCoinRecord = res.info;
      })
    }
  },
  computed: {}
}
</script>
<style lang='scss'>
.incomeDetails {
  .van-dropdown-menu {
    .van-dropdown-menu__bar {
      height: 36px !important;
      .van-dropdown-menu__item {
        height: 36px !important;
      }
    }
  }
}
[v-cloak] {
  display: none;
}
</style>