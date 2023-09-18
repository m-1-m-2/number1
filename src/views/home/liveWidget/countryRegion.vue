<template>
  <div class='countryRegion absolute top bottom left right'>
    <div class="h-44 fz-20 line-44 px-10 box-border">
      {{langSwitch('国家和地区')}}
    </div>
    <div class="absolute top-44 bottom left right flex">
      <div class="w-full h-44 flex flex-wrap">
        <div class="px-8 box-border"
             :key="k"
             v-for="(v,k) in getters_getPayConfig.pay_support_regions">
          <div class="h-28 w-full flex items-center justify-center">
            <div class="w-24 h-24 rounded relative"
                 @click="$emit('changeIsShow', v.countryCode)">
              <img v-real-img="v.icon"
                   alt=""
                   class="w-24 h-24 absolute top left">
            </div>
          </div>
          <div class="h-16 w-full fz-8 line-16 text-center">
            {{v.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'countryRegion',
  components: {},
  props: [''],
  data () {
    return {
    };
  },
  watch: {},
  created () {
  },
  beforeMount () { },
  mounted () { },
  computed: {
    ...mapGetters(['getters_getHot', 'getters_getPayConfig'])
  }
}
</script>
<style lang='scss' scoped>
.countryRegion {
}
</style>