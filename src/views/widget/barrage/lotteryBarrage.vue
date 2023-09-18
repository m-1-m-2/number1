<template>
  <div class='lotteryBarrage'>
    <!-- 一分快三显示开奖 -->
    <transition name="van-slide-right">
      <div class="w-200 h-48 top-80 absolute flex flex-col rounded-8 scroll-hide z-index-60"
           v-if="k3OpenData">
        <div class="h-24 cl-white fz-12 line-24 px-8"
             style="background: rgba(0,0,0,0.8)">
          {{langSwitch('一分快三')}}
          <van-icon class="inline float-right relative top-4"
                    size="16"
                    @click="closeK3OpenData"
                    name="close" />
        </div>
        <div class="h-24 relative"
             style="background: rgba(0,0,0,0.3)">
          <div class="h-24 w-64 relative">
            <result26 :result="k3OpenData.msg.result"></result26>
          </div>
        </div>
      </div>
    </transition>
    <!-- 会员用户展示 -->
    <transition name="van-slide-right">
      <div class="w-full h-50 top-264 absolute z-index-60 flex items-center pl-20"
           v-if="showGuardBool">
        <div class="w-320 h-30 relative imgBlurVipJoinRoom scroll-hide flex items-center rounded-30">
          <div class="pr-8 box-border w-fit line-16 h-fit">
            <template>
              <div class="flex">
                <div class="h-24 w-24 rounded mr-4 scroll-hide">
                  <img v-real-img="current_guardType.msg.ct.avatarThumb"
                       :src="zwfImg"
                       class="w-full h-full rounded">
                </div>
                <div class="flex-1 flex items-center">
                  <div class="cl-black fz-12 relative">
                    <div class="h-16 w-30 inline"
                         v-if="current_guardType.msg.ct.kingIcon">
                      <img class="h-12 w-26 relative top-2"
                           :src="current_guardType.msg.ct.kingIcon" />
                    </div>
                    <div class="h-16 w-30 inline">
                      <img class="h-12 w-26 relative top-2"
                           :src="current_guardType.msg.ct.level > 0 && getters_getConfig.level[current_guardType.msg.ct.level-1].thumb" />
                    </div>
                    <div class="h-16 w-30 inline"
                         v-if="current_guardType.msg.ct.vipType != 0">
                      <img class="h-12 w-26 relative top-2"
                           src="@/assets/images/chat_vip.png" />
                    </div>
                    <div class="h-16 w-16 inline"
                         v-if="current_guardType.msg.ct.guardType != 0">
                      <img class="h-12 w-12 relative top-2"
                           :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                    </div>
                    <div class="h-16 w-16 inline"
                         v-if="current_guardType.msg.ct.liangname != 0">
                      <img class="h-12 w-12 relative top-2"
                           :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                    </div>
                    <div class="w-fit inline">
                      <template v-if="current_guardType.msg.msgtype == 2">
                        <span :style="{color: levelColorSet[Math.floor((current_guardType.msg.ct.level - 1) / 10)]}"> {{ current_guardType.msg.ct.userNicename }}：</span>{{current_guardType.msg.content}}
                      </template>
                      <template v-else>
                        <span :style="{color: levelColorSet[Math.floor((current_guardType.msg.ct.level - 1) / 10)]}">&nbsp;&nbsp; {{ current_guardType.msg.ct.userNicename }}</span>&nbsp;&nbsp;{{langSwitch('进入直播间')}}
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
    <!-- 消息弹幕 -->
    <transition :name="barrage_slide">
      <div class="fixed z-index-20 top-166 w-full fz-12 cl-white"
           v-if="showBarrage">
        <div class="flex justify-center items-end flex-col barrage">
          <div class="w-280 h-20 line-20 flex">
            <div class="ml-2 fz-14 bolder inline-block">
              <!-- {{langSwitch('大显身手')}} -->
              <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_barrage00${current_barrage.st ? current_barrage.st: 1}.png`)"
                   alt=""
                   sizes=""
                   class="h-28 relative bottom-8"
                   srcset="">
            </div>
            <div class="ml-6 inline-block">
              <span class="pl-8 pr-8 pt-2 pb-2 bg-mask rounded-20 fz-10"
                    @click="goToLiveRoom(current_barrage)">
                {{langSwitch('点击跟注')}}
              </span>
            </div>
          </div>
          <div class="w-280">
            <div class="pl-8 pr-8 pt-2 pb-2 bg-mask rounded-20 fz-9 cl-yellow w-fit">
              {{current_barrage.ct.nickname}}{{langSwitch('在')}}{{current_barrage.ct.lotteryName}}{{langSwitch('中投注玩法')}}{{current_barrage.ct.way}}{{langSwitch('赢得')}}{{current_barrage.ct.totalmoney}} {{langSwitch('钻石')}}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 进入直播间特效 -->
    <template v-if="!isBetBool">
      <van-popup v-model="svgaBox_bool"
                 :overlay="false"
                 :style="{ height: '100%', width: '100%' }"
                 class="flex items-center justify-center"
                 style="background:transparent !important;">
        <div class="w-full h-full flex items-center justify-center relative scroll-hide">
          <div v-if="current_svga"
               class="fz-14 z-index-20 pb-40"
               style="color: #FD7D3C;">
            {{current_svga.msg.ct.userNicename || ''}}{{current_svga.msg.ct.carWords || ''}}
          </div>
          <div class="svgaBox absolute top bottom left right z-index-20 scroll-hide"
               id="svgaBox">
          </div>
        </div>
      </van-popup>
    </template>
  </div>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { Dialog, Toast } from 'vant';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import result26 from "@/components/lotteryGame/exhibitResult/result26";

export default {
  name: 'lotteryBarrage',
  components: { result26 },
  props: ['barrage_list', 'svgaBoxArray', 'isBetBool', 'k3OpenData', 'guardTypeArray'],
  data () {
    return {
      showBarrage: false,
      barrage_slide: "van-slide-right",
      current_barrage: '',
      lotteryBarrage_interval: null,
      svgaBoxArray_interval: null,
      svgaBox_bool: false,
      current_svga: '',
      levelColorSet: ['#2AD286', '#009AFB', '#F37B35', '#9926FF', '#F93094', '#FE5F23', '#AA1ABB', '#FF642F', '#FD7D3C', '#E90C29'],
      showGuardBool: false,
      current_guardType: '',
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {
    k3OpenData (v) {
      if (v) {
        this.delayFn(() => {
          this.$emit('k3OpenDataEmpty')
        }, 5000)
      }
    },
  },
  created () { },
  beforeMount () { },
  mounted () {
    this.lotteryBarrage_interval = setInterval(() => {
      if (this.barrage_list.length != 0) { this.barrage_scroll(); }
      if (this.guardTypeArray.length != 0) { this.guardTypeArray_fn() }
    }, 4200);

    this.svgaBoxArray_interval = setInterval(() => {
      if (this.svgaBox_bool) {
        this.svgaBox_bool = false;
        this.current_svga = '';
      }
      if (this.svgaBoxArray.length != 0) { this.svgaBoxArray_show() }
    }, 6000);
  },
  methods: {
    ...mapActions(['actions_getEnterRoom']),
    ...mapMutations(['mutations_rootStore']),
    closeK3OpenData () { this.$emit('k3OpenDataEmpty') },
    guardTypeArray_fn () {
      this.current_guardType = this.guardTypeArray[0];
      this.showGuardBool = true;
      this.$emit('updata_guardTypeArray', this.guardTypeArray.slice(1));
      this.delayFn(() => { this.showGuardBool = false; }, 3600);
    },
    barrage_scroll () {
      this.current_barrage = this.barrage_list[0];
      this.barrage_slide = "van-slide-right";
      this.showBarrage = true;
      this.$emit('updata_barrage_list', this.barrage_list.slice(1));
      this.delayFn(() => { this.barrage_slide = "van-slide-left" }, 1800);
      this.delayFn(() => { this.showBarrage = false; }, 3600);
    },
    svgaBoxArray_show () {
      this.svgaBox_bool = true;
      this.current_svga = this.svgaBoxArray[0];
      let carSwf = this.svgaBoxArray[0].msg.ct.carSwf || this.svgaBoxArray[0].msg.ct.swf;
      this.$nextTick(() => { this.playSvga(carSwf); })
    },
    playSvga (url) {
      let _this = this;
      var player = new SVGA.Player('#svgaBox');
      var parser = new SVGA.Parser('#svgaBox');
      parser.load(url,
        function (videoItem) {
          player.loops = 1;
          player.setVideoItem(videoItem);
          player.startAnimation();
        },
        function (error) {
          _this.svgaBox_bool = false;
          _this.current_svga = '';
          _this.$emit('updata_svgaBoxArray', _this.svgaBoxArray.slice(1))
          player = null;
        }
      )
      // 动画结束后调用
      if (player) {
        player.onFinished(() => {
          this.svgaBox_bool = false;
          this.current_svga = '';
          this.$emit('updata_svgaBoxArray', this.svgaBoxArray.slice(1))
        })
      }
    },
    goToLiveRoom (current_barrage) {
      let { lid } = current_barrage;
      let val, key;
      this.ANCHOR_LIST.forEach((el, i) => {
        if (el.uid == lid) {
          val = el;
          key = i;
        }
      });

      Dialog.confirm({
        title: '提示',
        message: '是否前往该直播间沾沾财气',
        confirmButtonText: '前往'
      })
        .then(() => {
          if (val && key) {
            this.mutations_rootStore({ key: 'ANCHOR', val, })
            this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })

            let { stream, uid } = val;
            let params = { liveuid: uid, stream };
            this.actions_getEnterRoom(params).then((res) => {
              if (res.code == 0) {
                this.toRouter('liveClassRoomNewEmpty');
                // this.toRouter('liveClassRoomNew');
              } else {
                Toast(res.msg);
              }
            })
          } else {
            Toast('未找到相关直播间')
          }
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  computed: {
    ...mapGetters(['ANCHOR_LIST', 'LANG', 'getters_getConfig'])
  },
  destroyed () {
    clearInterval(this.lotteryBarrage_interval);
    clearInterval(this.svgaBoxArray_interval);
  }
}
</script>
<style lang='scss' scoped>
.lotteryBarrage {
  // 弹幕动画
  .barrage {
    animation: lateX 4200ms ease-in;
  }

  @keyframes lateX {
    100% {
      transform: translateX(-100px);
    }
  }

  .imgBlurVipJoinRoom::before {
    content: "";
    display: inline-block;
    background-image: url("~@/assets/images/vipJoinRoom.png");
    background-position: center;
    background-size: cover;
    // background-attachment: fixed;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1; /* 將 ::before 置於 main 的後方 */
    /* 模糊效果 */
    filter: blur(0px);
  }
}
</style>