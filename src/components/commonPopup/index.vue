<template>
  <div class='commonPopup'>
    <van-popup v-model="isShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <template v-if="isNavBar">
        <div class="h-36 w-full">
          <div class="w-full h-36 flex box-border">
            <div class="w-36 h-36 flex items-center"
                 @click="$emit('changeIsShow', '')">
              <van-icon size="20"
                        @click="$emit('changeIsShow', '')"
                        name="arrow-left" />
            </div>
            <div class="flex-1 fz-14 flex items-center justify-center">
              <span>
                {{currentTabComponent?componentList[currentTabComponent]['title']: ''}}
              </span>
            </div>
            <div class="w-36 h-36 text-center">
            </div>
          </div>
        </div>
      </template>

      <div class="absolute bottom left right"
           :class="[isNavBar ?'top-36': 'top']">
        <component @changeIsShow="changeIsShow"
                   :isComponentLoad="true"
                   v-if="isShow"
                   v-bind:is="currentTabComponent"></component>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import anchorDetails from "@/views/widget/anchorDetails";
import withdrawalsRecord from "@/views/widget/withdrawalsRecord";
import countryRegion from "@/views/home/liveWidget/countryRegion";
import myPromotion from "@/views/home/liveWidget/myPromotion";
import service from "@/views/service";

export default {
  name: 'commonPopup',
  components: { countryRegion, myPromotion, service, withdrawalsRecord },
  props: ['isShow', 'currentTabComponent', 'isNavBar'],
  data () {
    return {
      componentList: {
        anchorDetails: { title: '', },
        countryRegion: { title: this.langSwitch('更多'), },
        service: { title: this.langSwitch('在线客服系统'), },
        withdrawalsRecord: { title: this.langSwitch('提现记录') },
        myPromotion: { title: this.langSwitch('我的推广') }
      }
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    changeIsShow (region) {
      this.$emit('changeIsShow', region)
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.commonPopup {
}
</style>