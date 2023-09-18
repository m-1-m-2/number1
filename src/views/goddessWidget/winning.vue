<template>
  <div class='winning absolute top bottom left right'>
    <div class="absolute top bottom left right flex flex-col cl-black">
      <div class="h-36 w-full van-hairline--bottom box-border flex">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="$emit('closeWinning')"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 h-36 flex items-center justify-center fz-14">
          {{langSwitch("往期中奖记录")}}
        </div>
        <div class="w-36 fz-12 relative">
        </div>
      </div>
      <!--  -->
      <div class="flex-1 relative bg-EF4B8D px-20 box-border flex flex-col">
        <div class="h-44 line-44 flex fz-14 text-center cl-white px-12 box-border">
          <div class="w-60">{{langSwitch("期数")}}</div>
          <div class="flex-1">{{langSwitch("开奖时间")}}</div>
          <div class="w-100">{{langSwitch("中奖用户")}}</div>
          <div class="w-70">{{langSwitch("我的投注")}}</div>
        </div>
        <!-- 内容区域 -->
        <div class="flex-1 relative">
          <div class="absolute top bottom left right bg-white rounded-8 px-12 box-border scroll-y fz-12 cl-EF4B8D">
            <div v-for="(v, k) in winning_record_data"
                 class="h-30 w-full line-30 flex"
                 style="border-bottom: 1px #EF4B8D solid;"
                 :key="'winning_record_data' + k">
              <div class="w-60 text-center">{{v.period}}{{langSwitch("期")}}</div>
              <div class="flex-1 text-center">{{ $moment(Number(v.open_time * 1000)).format("YYYY/MM/DD") }}</div>
              <div class="w-100 text-center fz-10">{{v.win_name}}</div>
              <div class="w-70 text-center">{{v.my_bet}}</div>
            </div>
          </div>
        </div>
        <div class="h-20"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'winning',
  components: {},
  props: ['winning_record_data'],
  data () {
    return {

    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.winning {
}
</style>