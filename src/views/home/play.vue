<template>
  <div class="play absolute bottom left right top scroll-y">
    <!-- 游戏推荐 自适应高度 -->
    <div class="w-full"
         v-if="masterSwitch">
      <div class="w-full h-28 fz-14 line-28 px-8 box-border bolder">{{langSwitch('游戏推荐')}}</div>
      <div class="pt-10 box-border">
        <div class="inline-block h-80 w-Equally-4"
             v-for="(v,k) in getters_getConfig.ad_list.filter((v)=>v.type == 'game')"
             :key="k + 'play_gameRecommendation'">
          <div class="h-60 w-full flex justify-center items-center">
            <div class="h-58 w-58 rounded"
                 @click="enterSelectGame(v)">
              <img :src="v.src"
                   class="h-58 w-58 rounded"
                   alt="">
            </div>
          </div>
          <div class="h-20 w-full fz-10 line-20 text-center cl-a8a8a8 van-ellipsis">
            {{v.desc}}
          </div>
        </div>
      </div>
    </div>
    <div class="h-12 w-full bg-f4f4f4"></div>
    <!-- 选择国家地区 -->
    <div class="w-full h-50 relative"
         v-if="getters_getLiveListByType.length != 0">
      <div class="w-full h-4 bg-white"></div>
      <div class="flex">
        <div class="w-full h-46 flex scroll-hide flex-1">
          <div class="currentRegion relative h-44"
               style="flex-shrink: 0; width:20%">
            <div class="h-28 w-full flex items-center justify-center">
              <div class="w-24 h-24 rounded relative">
                <img :src="getters_getLiveListByType.live_current_region.icon"
                     alt=""
                     class="w-24 h-24 absolute top left">
              </div>
            </div>
            <div class="h-16 w-full fz-12 line-16 text-center">
              {{getters_getLiveListByType.live_current_region.name}}
            </div>
          </div>
          <template v-for="(v,k) in getters_getLiveListByType.live_support_regions">
            <div style="flex-shrink: 0; width: 20%;"
                 :key="k"
                 class="h-44"
                 v-if="getters_getLiveListByType.live_current_region.name != v.name">
              <div class="h-28 w-full flex items-center justify-center">
                <div class="w-24 h-24 rounded relative"
                     @click="selectRegion(v.countryCode)">
                  <img :src="v.icon"
                       alt=""
                       class="w-24 h-24 absolute top left">
                </div>
              </div>
              <div class="h-16 w-full fz-12 line-16 text-center">
                {{v.name}}
              </div>
            </div>
          </template>
        </div>
        <div class="w-fit flex items-center justify-center px-4">
          <!-- 更多按钮 -->
          <div class="h-28 w-fit px-8 bg-f1f1f1 rounded-18 line-28 text-center fz-12"
               @click="isShow = true">
            {{langSwitch('更多')}}
            <van-icon name="share-o" />
          </div>
        </div>
      </div>
    </div>
    <!-- 游戏主播列表 -->
    <div class="w-full pt-10">
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
    <!-- commonPopup -->
    <commonPopup :isShow="isShow"
                 @changeIsShow="changeIsShow"
                 :isNavBar="true"
                 :currentTabComponent="currentTabComponent"></commonPopup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import anchorList from "@/views/home/liveWidget/anchorList";
import commonPopup from "@/components/commonPopup";
import { Toast } from 'vant';
export default {
  name: 'play',
  components: { commonPopup, anchorList },
  props: [''],
  data () {
    return {
      isShow: false,
      currentTabComponent: 'countryRegion',
      refreshing: false,
      loading: false,
      finished: false,
      getLiveListByTypeParams: {
        p: 1,
        type: 1,
        region: '' // 默认是CN或者可以为空
      },
      getLiveListByType_list: []
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getLiveListByType', 'actions_getEnterRoom', 'actions_getHomeBetViewInfo', 'actions_rootStore']),
    ...mapMutations(['mutations_rootStore']),
    enterRoom (val, key) {
      console.log(JSON.parse(JSON.stringify(val)));
      this.mutations_rootStore({ key: 'ANCHOR', val, })
      this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
      this.mutations_rootStore({ key: 'ANCHOR_LIST', val: this.getLiveListByType_list, })
      let { stream, uid } = val;
      let params = { liveuid: uid, stream, };
      this.actions_getEnterRoom(params).then((res) => {
        if (res.code == 0) {
          this.toRouter('liveClassRoomNew');
        } else {
          Toast(res.msg);
        }
      })
    },
    enterSelectGame (val) {
      let lottery_type = val.kindID;
      this.actions_rootStore({ key: 'lobbyLottery', val: lottery_type })
      this.toRouter('liveLobby');
      // let params = {
      //   lottery_type,
      //   support_nn: true
      // }
      // this.actions_getHomeBetViewInfo(params).then(res => {
      //   if (res.code == 0) {
      //     this.toRouter('liveLobby')
      //   } else {
      //     Toast(res.msg)
      //   }
      // })

      // let found = this.getLiveListByType_list.find(el => el.lottery_type == val.kindID);
      // let foundIndex = this.getLiveListByType_list.findIndex(el => el.lottery_type == val.kindID);
      // // console.log(found, foundIndex)
      // if (!!found && foundIndex != -1) { this.enterRoom(found, foundIndex) } else { Toast('未找到相关游戏信息！') }
    },
    changeIsShow (region) {
      this.isShow = false;
      if (!region) return
      this.selectRegion(region);
    },
    selectRegion (region) {
      if (this.getLiveListByTypeParams.region == region) return
      this.getLiveListByTypeParams.region = region;
      this.onRefresh();
    },
    onRefresh () {
      this.finished = false;
      this.loading = true;
      this.getLiveListByTypeParams.p = 1;
      this.getLiveListByType_list = [];
      this.onLoad();
    },
    onLoad () {
      this.actions_getLiveListByType(this.getLiveListByTypeParams).then(res => {
        if (res.code == 0) {
          this.getLiveListByType_list.push.apply(this.getLiveListByType_list, res.info[0].list)
          this.getLiveListByTypeParams.p += 1;
          this.loading = false;
          if (res.info[0].list.length == 0) { this.finished = true; }
          this.refreshing = false;
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getters_getConfig', 'getters_getLiveListByType', 'masterSwitch'])
  }
}
</script>
<style lang='scss' scoped>
.play {
  .currentRegion::before {
    content: "";
    width: 20px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: -1px;
    left: 0;
    margin: 0 auto;
    border-bottom: 2px solid #ef4b8d;
  }
}
</style>