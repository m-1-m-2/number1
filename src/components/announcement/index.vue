<template>
  <div class='announcement'>
    <van-popup v-model="show">
      <div class="w-324 h-480"
           style="background:transparent;">
        <div style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
             class="w-324 h-44 fz-20 line-44 text-center box-border bb-1px cl-white gonggaoBgImg">{{langSwitch('公告')}}</div>
        <div class="w-324 h-388 bg-white flex"
             style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
          <div class="w-fit pl-10 pr-10 h-388 text-center fz-10 pt-6 box-border">
            <div class="h-28 line-28"
                 v-for="(v,k) in getters_getBaseInfo.notices"
                 :key="k">
              <span class="pl-8 pr-8 pt-4 pb-4 bg-f1f1f1 rounded-8 w-fit"
                    @click="orderIndex = k; renderHTML = v.content;"
                    :class="[orderIndex == k ? 'active' : '']">{{v.title}}</span>
            </div>
          </div>
          <div class="flex-1 fz-12 pr-6 box-border scroll-y"
               v-html="renderHTML">
          </div>
        </div>
        <div class="flex justify-center box-border pt-20">
          <van-icon name="close"
                    color="#ffffff"
                    @click="show = false"
                    size="30" />
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'announcement',
  components: {},
  props: [''],
  data () {
    return {
      show: false,
      renderHTML: '',
      orderIndex: 0,
    };
  },
  watch: {},
  created () {
    // 显示公告相关信息
    if (!!this.getters_getBaseInfo.notices) {
      this.show = true;
      this.renderHTML = this.getters_getBaseInfo.notices[0].content;
    }
  },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {
    ...mapGetters(['getters_getBaseInfo'])
  }
}
</script>
<style lang='scss' scoped>
.announcement {
  .van-popup {
    background-color: transparent;
  }
  .active {
    color: #ffffff;
    background: linear-gradient(to right bottom, blue, pink);
  }
  .gonggaoBgImg {
    background-image: url("~@/assets/images/gonggao_top@2x.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>