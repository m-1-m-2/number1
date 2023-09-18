<template>
  <div class='currencyType absolute top bottom left right'>
    <van-radio-group v-model="exchangeRate_id">
      <van-cell-group>
        <van-cell :title="`${v.region}  (${v.region_curreny})`"
                  clickable
                  :icon="v.region_curreny_icon"
                  v-for="(v, k) in list"
                  :key=" k +'exchangeRate'"
                  @click="setExchangeRate(v)">
          <template #right-icon>
            <van-radio :name="v.id" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'currencyType',
  components: {},
  props: [''],
  data () {
    return {
      list: '',
      exchangeRate_id: '',
    };
  },
  watch: {},
  created () {
    this.actions_getRegionsExchangeRate().then(res => {
      this.list = res.info;
    })
    this.exchangeRate_id = this.getters_rootStore.region_exchange_info.id;
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getRegionsExchangeRate']),
    ...mapMutations(['mutations_rootStore']),
    setExchangeRate (val) {
      this.mutations_rootStore({
        key: 'region_exchange_info',
        val,
      })
      this.$emit('closeChildPopup');
    }
  },
  computed: {
    ...mapGetters(['getters_rootStore'])
  },

}
</script>
<style lang='scss' scoped>
.currencyType {
}
</style>