<template>
  <div class="attention absolute bottom left right top fz-14 scroll-y">
    <!-- 我的关注 -->
    <div>
      <div class="h-36 w-full px-6 box-border line-36 bolder"
           v-if="follow_info.length != 0">{{langSwitch('我的关注')}}</div>
      <div class="w-full">
        <template v-if="follow_info.length != 0">
          <anchorList :list="follow_info"></anchorList>
        </template>
        <template v-else>
          <div class="w-full h-148 bg-f4f4f4 flex items-center justify-center">
            <div class="flex flex-col items-center justify-center">
              <div class="h-fit">
                <img src="~@/assets/images/noData.png"
                     class="h-88 w-128"
                     alt="">
              </div>
              <div class="fz-12 mt-10 cl-a8a8a8">{{langSwitch('暂无关注')}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 热门推荐 -->
    <div>
      <div class="h-36 w-full px-6 box-border line-36 bolder">{{langSwitch('热门推荐')}}</div>
      <div class="w-full">
        <van-pull-refresh v-model="refreshing"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    :finished-text="langSwitch('没有更多了')"
                    @load="onLoad">
            <anchorList :list="getLiveListByType_list"></anchorList>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import anchorList from "@/views/home/liveWidget/anchorList";
export default {
  name: 'attention',
  components: { anchorList },
  props: [''],
  data () {
    return {
      follow_info: [],
      refreshing: false,
      loading: false,
      finished: false,
      getLiveListByTypeParams: {
        p: 1,
        region: '' // 默认是CN或者可以为空
      },
      getLiveListByType_list: [],
      follow_countryArray: [],
      countryArray: [],
    };
  },
  watch: {},
  created () {
    this.actions_getFollow().then((res) => {
      if (res.code == 0) {
        // this.follow_info = res.info[0].list;
        this.follow_info.push.apply(this.follow_info, res.info[0].list)
      }
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getFollow', 'actions_getLiveListByType', 'actions_getHot']),
    onRefresh () {
      this.finished = false;
      this.loading = true;
      this.getLiveListByTypeParams.p = 1;
      this.getLiveListByType_list = [];
      this.onLoad();
    },
    onLoad () {
      this.actions_getHot(this.getLiveListByTypeParams).then(res => {
        if (res.code == 0) {
          this.getLiveListByType_list.push.apply(this.getLiveListByType_list, res.info[0].list)
          this.countryArray.push.apply(this.countryArray, res.info[0].live_support_regions)
          this.getLiveListByTypeParams.p += 1;
          this.loading = false;
          if (res.info[0].list.length == 0) { this.finished = true; }
          this.refreshing = false;
        }
      })
    },
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.attention {
}
</style>