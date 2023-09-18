<template>
  <div class='withdrawalsRecord absolute top bottom left right fz-14'
       v-cloak>
    <div class="text-center"
         v-if="list_data.length == 0">
      {{langSwitch('暂无提现记录')}}
    </div>
    <div v-else>
      <div v-for="(v, k) in list_data"
           :key="k"
           class="bb-1px box-border px-12"
           :class="[ k % 2 == 0 ? 'bg-f4f4f4': '']">
        <div class="h-32 line-32 w-full">
          {{langSwitch('提现账户')}}:{{v.account}}
        </div>
        <div class="h-32 line-32 w-full">
          {{langSwitch('提现银行')}}:{{v.bank}}
        </div>
        <div class="h-32 line-32 w-full">
          {{langSwitch('提现金额')}}:{{v.money}}
        </div>
        <div class="h-32 line-32 w-full">
          {{langSwitch('提现状态')}}:{{v.status}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'withdrawalsRecord',
  components: {},
  props: [''],
  data () {
    return {
      list_data: ''
    };
  },
  watch: {},
  created () {
    let params = { page: 1 }
    this.actions_getGameWithdrawHistory(params).then(res => {
      this.list_data = res.info;
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getGameWithdrawHistory'])
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.withdrawalsRecord {
}
[v-cloak] {
  display: none;
}
</style>