<template>
  <div class='layout absolute top bottom left right'
       @click="layoutEvent">
    <template v-if="getConfig && getBaseInfo">
      <slot></slot>
      <!-- notice -->
      <announcement v-if="closeAllDialogBool"></announcement>
      <!-- 每日签到 -->
      <dailyCheckIn v-if="closeAllDialogBool"></dailyCheckIn>
      <!-- 首充 -->
      <!-- <firstRecharge></firstRecharge> -->
    </template>
    <template v-else>
      <div class="__spinner-container">
        <div class="spinner w-54">
          <div class="rect1 mx-2"></div>
          <div class="rect2 mx-2"></div>
          <div class="rect3 mx-2"></div>
          <div class="rect4 mx-2"></div>
          <div class="rect5 mx-2"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import announcement from "@/components/announcement";
import dailyCheckIn from "@/components/dailyCheckIn";
import firstRecharge from "@/components/firstRecharge";

export default {
  name: 'layout',
  components: { announcement, dailyCheckIn, firstRecharge },
  props: [''],
  data () {
    return {
      getHot: false,
      getBaseInfo: false,
      getTaskList: false,
      getConfig: false,
      getPayConfig: false,
      getBalanceNew: false,
      layoutEventBool: false,
      closeAllDialogBool: true,
    };
  },
  watch: {
    changeData (val) {
      let { getHot, getBaseInfo, getTaskList, getConfig } = val;
      if (getBaseInfo && getConfig) {
        this.mutations_rootStore({ key: 'langSetAnimate', val: false });
      }
    }
  },
  created () {
    let getPayConfig_params = { region: this.PAYREGION }

    this.actions_getConfig({ plat_id: this.PLATFORM }).then(res => {
      if (res.code == 0) {
        let data = res.info[0];
        this.mutations_rootStore({
          key: 'region_exchange_info',
          val: data.region_exchange_info,
        })
        this.getConfig = true;
      }
    });
    this.actions_getBaseInfo().then((res) => {
      if (res.code == 0) {
        this.getBaseInfo = true;
      }
      if (res.code == 700) {
        this.mutations_rootStore({ key: 'uid', val: '' })
        this.mutations_rootStore({ key: 'token', val: '' })
      }
    });
    // this.actions_getHot().then(res => {
    //   if (res.code == 0) {
    //     this.getHot = true;
    //   }
    //   if (res.code == 700) {
    //     this.mutations_rootStore({ key: 'uid', val: '' })
    //     this.mutations_rootStore({ key: 'token', val: '' })
    //   }
    // });
    this.actions_getPayConfig(getPayConfig_params).then(res => {
      if (res.code == 0) {
        this.getPayConfig = true;
      }
      if (res.code == 700) {
        this.mutations_rootStore({ key: 'uid', val: '' })
        this.mutations_rootStore({ key: 'token', val: '' })
      }
    });
    this.actions_getBalanceNew().then(res => {
      if (res.code == 0) {
        this.getBalanceNew = true;
      }
      if (res.code == 700) {
        this.mutations_rootStore({ key: 'uid', val: '' })
        this.mutations_rootStore({ key: 'token', val: '' })
      }
    });
  },
  beforeMount () { },
  mounted () {
    this.$bus.$on('closeAllDialog', () => { this.closeAllDialogBool = false; })
  },
  methods: {
    ...mapActions(['actions_getBalanceNew', 'actions_getHot', 'actions_getTaskList', 'actions_getBaseInfo', 'actions_getConfig', 'actions_getPayConfig']),
    ...mapMutations(['mutations_rootStore']),
    layoutEvent () {
      if (!this.layoutEventBool) {
        this.layoutEventBool = true;
      }
    },
  },
  computed: {
    ...mapGetters(['UID', 'TOKEN', 'PAYREGION', 'PLATFORM']),
    changeData () {
      let { getHot, getBaseInfo, getTaskList, getConfig } = this;
      return { getHot, getBaseInfo, getTaskList, getConfig }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>