<template>
  <div class='dailyCheckIn'>
    <van-popup v-model="show">
      <div class="w-320 h-340 bg-white rounded-12 scroll-hide">
        <div class="h-106 w-full flex justify-center items-center relative">
          <div class="absolute top bottom left right">
            <img :src="dailyCheckInBg"
                 class="w-full h-full"
                 alt="">
          </div>

          <div class="absolute top bottom left right z-index-2 flex justify-center items-center">
            <div class="relative w-fit h-fit">
              <div class="fz-20 mt-10">
                <div class="pl-12 pr-12 pt-2 pb-2 bg-black cl-white fz-12 rounded-20 w-fit ml-4">{{langSwitch('已连续签到')}} {{ data.count_day }} {{langSwitch('天')}}</div>
              </div>
            </div>
            <div class="absolute top-2 right-2">
              <div class="w-28 h-28"
                   @click="show = false"></div>
            </div>
          </div>
        </div>
        <div class="h-166 bg-white w-full mt-16 px-12 relative">
          <div class="h-80 w-74 inline-block pl-4 pr-4 pt-4 pb-4 box-border"
               v-for="(v,k) in 8"
               :key="k">
            <div class="w-full h-full flex items-center justify-center relative rounded-8"
                 :class="[data.count_day >= v? 'bg-F2CF40': 'bg-f1f1f1', k >= 6 ?'none':'']">
              <span class="fz-12 absolute top-4 left-4 cl-a8a8a8">{{v}}</span>
              <template v-if="data.count_day < v">
                <img src="~@/assets/images/signIn_no.png"
                     class="w-full h-full"
                     alt="">
              </template>
              <template v-else>
                <img src="~@/assets/images/signIn_yes.png"
                     class="w-full h-full"
                     alt="">
              </template>
            </div>
          </div>
          <div class="absolute bottom right-40 w-140 h-80 py-4 box-border">
            <div class="w-full h-full bg-f1f1f1 flex items-center justify-center relative rounded-8">
              <span class="fz-12 absolute top-4 left-4 cl-a8a8a8">7</span>
              <img src="~@/assets/images/signIn_7day.png"
                   class="w-full h-full"
                   alt="">
            </div>
          </div>
        </div>
        <div class="h-40 w-full mt-4 flex items-center justify-center">
          <div class="fz-12 text-center line-24 h-24 bg-F2CF40 w-280 cl-white rounded-24"
               style="background:linear-gradient(to bottom right, yellow, orange)"
               @click="submit">{{ langSwitch('立即签到') }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast, Dialog } from "vant";
export default {
  name: 'dailyCheckIn',
  components: {},
  props: [''],
  data () {
    return {
      show: false,
      data: '',
      dailyCheckInBg: '',
    };
  },
  watch: {},
  created () {
    this.actions_Bonus().then((res) => {
      if (res.code == 0) {
        this.show = res.info[0].bonus_day == "0" ? false : true;
        this.data = res.info[0]
      }
    })
  },
  beforeMount () {
    this.dailyCheckInBg = require(`@/assets/images/multiLanguage/${this.LANG}/${this.LANG}_daily.png`);
  },
  mounted () {

  },
  methods: {
    ...mapActions(['actions_Bonus', 'actions_getBonus']),
    submit () {
      this.actions_getBonus().then((res) => {
        if (res.code == 0) {
          this.show = false;
          Toast(res.msg)
        } else if (res.code == 1002) {
          Dialog.confirm({
            title: '',
            message: this.langSwitch('尚未绑定手机号码,是否立即绑定?'),
          }).then(() => {
            // on confirm
            this.$bus.$emit('closeAllDialog');
            console.log(this.$route)
            if (this.$route.name == 'mine') {
              this.$bus.$emit('init_mine_bindPhone');
            } else {
              this.toRouter('mine', {}, () => {
                this.$bus.$emit('init_mine_bindPhone');
              });
            }
          }).catch(() => {
            // on cancel
          });
        }
      })
    }
  },
  computed: {
    ...mapGetters(['LANG'])
  }
}
</script>
<style lang='scss' scoped>
.dailyCheckIn {
  .van-popup {
    background-color: transparent;
  }
}
</style>