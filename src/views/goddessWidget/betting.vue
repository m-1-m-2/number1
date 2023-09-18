<template>
  <div class='betting absolute top bottom left right fz-12'>
    <div class="absolute top bottom left right flex flex-col cl-black">
      <div class="h-36 w-full van-hairline--bottom box-border flex">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="$emit('closeBetting')"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 h-36 flex items-center justify-center fz-14">
          {{langSwitch("本期投注记录")}}
        </div>
        <div class="w-36 fz-12 relative">
        </div>
      </div>
      <!--  -->
      <div class="flex-1 relative bg-EF4B8D px-20 box-border flex flex-col">
        <div class="h-44 line-44 flex fz-14 text-center cl-white px-12 box-border">
          <div class="w-150">{{langSwitch("投注用户")}}</div>
          <div class="flex-1">{{langSwitch("投注时间")}}</div>
          <div class="w-72">{{langSwitch("投注钻石")}}</div>
        </div>
        <!-- 内容区域 -->
        <div class="flex-1 relative">
          <div class="absolute top bottom left right bg-white rounded-8 px-12 box-border scroll-y fz-12 cl-EF4B8D">
            <div v-for="(v, k) in betting_record_data"
                 class="h-30 w-full line-30 flex"
                 style="border-bottom: 1px #EF4B8D solid;"
                 :key="'betting_record_data' + k">
              <div class="w-150 text-center fz-10">{{v.name}}</div>
              <div class="flex-1 text-center">{{ $moment(Number(v.bet_time * 1000)).format("YYYY/MM/DD") }}</div>
              <div class="w-72 text-center">{{v.bet_coin}}</div>
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
  name: 'betting',
  components: {},
  props: ['betting_record_data'],
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
.betting {
}
</style>