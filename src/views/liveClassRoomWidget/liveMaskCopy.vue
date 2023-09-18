<template>
  <div class='liveMaskCopy absolute top bottom left right flex'
       v-touch:swipeleft="leftSlide"
       v-touch:swipeup="upSlide"
       v-touch:swipedown="downSlide">
    <!-- 页面主体 -->
    <div class="absolute top bottom left right">
      <transition name="van-slide-right">
        <div class="absolute top bottom left right flex flex-col z-index-20 justify-end"
             v-if="innerVisible">
          <transition name="van-slide-right">
            <div class="flex-1 flex flex-col"
                 v-if="innerVisible_bet">
              <!-- 顶部区 -->
              <div class="w-full h-30 flex">
                <div class="w-fit px-2 box-border h-30 flex justify-center items-center">
                  <div class="w-fit h-30 bg-black rounded-30 flex items-center">
                    <div class="h-30 w-30 flex items-center justify-center rounded relative"
                         @click="liveroom_user(ANCHOR)">
                      <img :src="zwfImg"
                           v-real-img="ANCHOR.avatar_thumb"
                           class="h-26 w-26 rounded">
                    </div>
                    <div class="w-62 fz-10 flex flex-col cl-white">
                      <div class="w-58 van-ellipsis">{{ANCHOR.user_nicename}}</div>
                      <div class="w-58 van-ellipsis">ID:{{ANCHOR.uid}}</div>
                    </div>
                    <div class="h-30 w-fit pr-2 box-border flex items-center"
                         v-if="getters_getEnterRoom.isattention != 1">
                      <div class="bg-F2CF40 fz-12 rounded-30 pl-8 pr-8 pt-5 pb-5"
                           @click="toAttention">
                        {{langSwitch('关注')}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-1 h-30 relative">
                  <div class="absolute top h-30 left right box-border scroll-x flex">
                    <div class="h-30 w-32 flex items-center justify-center relative"
                         style="flex-shrink: 0;"
                         :key="k+'userlists'"
                         v-for="(v, k) in getters_getEnterRoom.userlists">
                      <div class="h-30 w-30 bg-auto relative"
                           :class="`userlist_no${k+1}`">
                        <img :src="zwfImg"
                             v-once
                             v-real-img="v.avatar"
                             @click="liveroom_user(v)"
                             class="h-20 w-20 absolute right-5 bottom-2 rounded">
                      </div>
                      <div class="w-10 h-10 absolute bottom-2 right-2">
                        <img class="w-10 h-10 absolute top left"
                             :src="getters_getConfig.level[v.level-1].thumb_mark">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 消息区 -->
              <div class="w-full h-50 flex pt-2 box-border"
                   v-if="!isBetBool">
                <div class="flex-1 flex flex-col">
                  <div class="h-18 line-18 fz-10 cl-white">
                    <span class="pl-12 pr-12 pt-2 pb-2 bg-black rounded-10 ml-4"
                          @click="giftDetailsFn">
                      {{langSwitch('钻石')}} {{(Number(getters_getEnterRoom.votestotal))}} >
                    </span>
                    <span class="pl-12 pr-12 pt-2 pb-2 bg-black rounded-10 ml-4"
                          @click="checkGuardList">
                      {{langSwitch('守护')}}{{getters_getEnterRoom.guard_nums}} {{langSwitch('人')}} >
                    </span>
                    <span class="pl-12 pr-12 pt-2 pb-2 bg-black rounded-10 ml-4"
                          @click="now_rank_show_fn">
                      {{langSwitch('实时榜单')}} >
                    </span>
                  </div>
                  <div class="h-30 pl-4 box-border relative">
                    <div class="h-24 mt-2 rounded-24 scroll-hide">
                      <van-notice-bar color="#ffffff"
                                      :text="getters_getBaseInfo.live_ad_text" />
                    </div>

                    <!-- 主播签名展示 -->
                    <div class="h-24 w-fit rounded-24 cl-white bg-orange absolute top-2 left animate__animated animate__slow animate__backInRight fz-12 line-24 pl-8 pr-8"
                         style="background:linear-gradient(to bottom right, yellow, orange)"
                         v-if="anchorSignShowBool">
                      <van-icon size="12"
                                name="bullhorn-o" />
                      {{ANCHOR.title}}
                    </div>

                  </div>
                </div>
                <div class="w-48 h-48"></div>
              </div>
              <!-- 展开区 -->
              <div class="flex-1 w-full flex"
                   v-touch:swiperight="rightSlide"
                   v-touch:swipeup="upSlide_inner"
                   v-touch:swipedown="downSlide_inner">
                <div class="flex-1 flex relative">
                  <div class="flex-1 flex flex-col fz-10">
                    <template v-if="isBetBool">
                      <div class="relative"
                           v-if="is_liveMsgTopCopy"
                           style="flex: 2">
                        <div class="absolute top bottom left right px-2 box-border scroll-y"
                             v-touch:swipeup="liveMsgTopCopyUpSlide"
                             v-touch:swipedown="liveMsgTopCopyDownSlide"
                             ref="liveMsgTopCopyWrap">
                          <div class="h-fit"
                               ref="liveMsgTopCopy">
                            <div class="pl-8 pr-8 pt-2 pb-2 box-border mt-4 rounded-8 bg-mask w-fit line-16 h-fit"
                                 v-for="(v, k) in liveMsgTopCopy"
                                 :key="k + 'liveMsgTopCopy'">
                              <template v-if="v.msgID == 0 && k==0">
                                <div class="cl-yellow fz-12 line-16"
                                     style="white-space: pre-wrap">{{ v.msgData.msg.ct }}</div>
                              </template>
                              <template v-if="v.msgID == 1">
                                <div class="cl-white fz-12"
                                     @click="liveroom_user(v.msgData.msg.ct)">
                                  <!-- kingIcon -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.ct.kingIcon">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.ct.kingIcon" />
                                  </div>
                                  <!-- 用户等级 -->
                                  <div class="h-16 w-30 inline">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                                  </div>
                                  <!-- vip标识 -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.ct.vipType != 0">
                                    <img class="h-12 w-26"
                                         src="@/assets/images/chat_vip.png" />
                                  </div>
                                  <!-- 守护 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.ct.guardType != 0">
                                    <img class="h-12 w-12"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                                  </div>
                                  <!-- 靓号 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.ct.liangname != 0">
                                    <img class="h-12 w-12"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                                  </div>
                                  <div class="w-fit inline">
                                    <template v-if="v.msgData.msg.msgtype == 2">
                                      <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}：</span>{{v.msgData.msg.content}}
                                    </template>
                                    <template v-else>
                                      <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}</span>&nbsp;{{langSwitch('进入直播间')}}
                                    </template>
                                  </div>
                                </div>
                              </template>
                              <template v-if="v.msgID == 8">
                                <div class="cl-white line-16">
                                  <div class="h-16 w-30 inline">
                                    <img class="h-14 w-26 relative top-2"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_system@2x.png`)" />
                                  </div>
                                  <span class="box-border px-2"
                                        v-html="`${v.msgData.msg.ct.nickname} ${langSwitch('在')}<span class='cl-F2CF40'> ${v.msgData.msg.ct.lotteryName} </span>${langSwitch(' 中,下注了 ')}<span class='cl-F2CF40'> ${v.msgData.msg.ct.totalmoney} </span> ${langSwitch('钻石')}`">
                                  </span>
                                  <div class="h-16 w-26 inline">
                                    <img class="h-14 w-26 relative top-2"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_follow_bet@2x.png`)" />
                                  </div>
                                </div>
                              </template>
                              <template v-if="v.msgID == 12">
                                <div class="cl-white line-16">
                                  <div class="h-16 w-30 inline">
                                    <img class="h-14 w-26 relative top-2"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_win@2x.png`)" />
                                  </div>
                                  <span class="box-border px-2 line-16">
                                    {{langSwitch("恭喜")}}{{v.msgData.msg.ct.nickname}}{{langSwitch("在")}}{{v.msgData.msg.ct.lotteryName}}{{langSwitch("中奖了")}}
                                  </span>
                                </div>
                              </template>
                              <template v-if="v.msgID == 33">
                                <div class="cl-white line-16">
                                  <div class="h-16 w-30 inline">
                                    <img class="h-14 w-26 relative top-2"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_win@2x.png`)" />
                                  </div>
                                  <span class="box-border px-2 line-16"
                                        v-html="v.msgData.msg.ct">
                                  </span>
                                  <div class="h-16 w-26 inline">
                                    <img class="h-14 w-26 relative top-2"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_follow_game@2x.png`)" />
                                  </div>
                                </div>
                              </template>
                            </div>
                            <div class="h-24 w-full"></div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-1 relative"
                           v-if="is_liveMsgBottomCopy">
                        <div class="absolute top bottom left right px-2 box-border scroll-y"
                             v-touch:swipeup="liveMsgBottomCopyUpSlide"
                             v-touch:swipedown="liveMsgBottomCopyDownSlide"
                             ref="liveMsgBottomCopyWrap"
                             style="background: rgba(255,255,255,0.3)">
                          <div class="h-fit"
                               ref="liveMsgBottomCopy">
                            <div class="pl-8 pr-8 pt-2 pb-2 box-border mt-4 rounded-8 bg-mask w-fit line-16 h-fit"
                                 v-for="(v, k) in liveMsgBottomCopy"
                                 :key="k + 'liveMsgBottomCopy'">
                              <template v-if="v.msgID == 1">
                                <div class="cl-white fz-12"
                                     @click="liveroom_user(v.msgData.msg.ct)">
                                  <!-- kingIcon -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.ct.kingIcon">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.ct.kingIcon" />
                                  </div>
                                  <!-- 用户等级 -->
                                  <div class="h-16 w-30 inline">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                                  </div>
                                  <!-- vip标识 -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.ct.vipType && v.msgData.msg.ct.vipType != 0">
                                    <img class="h-12 w-26"
                                         src="@/assets/images/chat_vip.png" />
                                  </div>
                                  <!-- 守护 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.ct.guardType && v.msgData.msg.ct.guardType != 0">
                                    <img class="h-12 w-12"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                                  </div>
                                  <!-- 靓号 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.ct.liangname && v.msgData.msg.ct.liangname != 0">
                                    <img class="h-12 w-12"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                                  </div>
                                  <div class="w-fit inline">
                                    <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}：</span>{{v.msgData.msg.content}}
                                  </div>
                                </div>
                              </template>
                              <template v-if="v.msgID == 17">
                                <div class="cl-white fz-12"
                                     @click="liveroom_user(v.msgData.msg)">
                                  <!-- kingIcon -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.kingIcon">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.kingIcon" />
                                  </div>
                                  <!-- 用户等级 -->
                                  <div class="h-16 w-30 inline">
                                    <img class="h-12 w-26"
                                         :src="v.msgData.msg.level > 0 && getters_getConfig.level[v.msgData.msg.level-1].thumb" />
                                  </div>
                                  <!-- vip标识 -->
                                  <div class="h-16 w-30 inline"
                                       v-if="v.msgData.msg.vipType && v.msgData.msg.vipType != 0">
                                    <img class="h-12 w-26"
                                         src="@/assets/images/chat_vip.png" />
                                  </div>
                                  <!-- 守护 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.guardType && v.msgData.msg.guardType != 0">
                                    <img class="h-14 w-14"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                                  </div>
                                  <!-- 靓号 -->
                                  <div class="h-16 w-16 inline"
                                       v-if="v.msgData.msg.liangname && v.msgData.msg.liangname != 0">
                                    <img class="h-12 w-12"
                                         :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                                  </div>
                                  <div class="w-fit inline">
                                    <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.level - 1) / 10)]}"> {{ v.msgData.msg.uname }}：</span><span class="cl-F2CF40">送了{{v.msgData.msg.ct.giftcount}}个{{v.msgData.msg.ct.giftname}}</span>
                                    <img class="inline w-12 h-12 relative top-2 left-2"
                                         src="@/assets/images/plane_heart_cyan.png">
                                  </div>
                                </div>
                              </template>
                            </div>
                            <div class="h-24 w-full"></div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="flex-1 relative"
                       ref="zoomOutArea">
                    <!-- 红包 -->
                    <div class="fixed right-14 top-224 w-36 h-48 bg-red rounded-4 scroll-hide"
                         v-if="liveRoomRedbagBool">
                      <img src="@/assets/images/live_redbag.png"
                           @click="showPopupRedBag = true"
                           class="w-full h-full rounded-4">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <!-- 聊天区 -->
          <div class="h-300 w-full fz-10 flex"
               v-if="!isBetBool">
            <div class="h-300 w-full fz-10 flex"
                 v-show="masterSwitch">
              <div class="flex-1 flex flex-col box-border relative">
                <div style="flex:2"
                     class="w-full px-4 box-border scroll-y"
                     v-if="is_liveMsgTop"
                     v-touch:swipeup="liveMsgTopUpSlide"
                     v-touch:swipedown="liveMsgTopDownSlide"
                     ref="liveMsgTopWrap">
                  <div class="h-fit"
                       ref="liveMsgTop">
                    <div class="pl-8 pr-8 pt-2 pb-2 box-border mt-4 rounded-8 bg-mask w-fit line-16 h-fit"
                         v-for="(v, k) in liveMsgTop"
                         :key="k + 'liveMsgTop'">
                      <template v-if="v.msgID == 0 && k==0">
                        <div class="cl-yellow fz-12 line-16"
                             style="white-space: pre-wrap">{{ v.msgData.msg.ct }}</div>
                      </template>
                      <template v-if="v.msgID == 1">
                        <div class="cl-white fz-12"
                             @click="liveroom_user(v.msgData.msg.ct)">
                          <!-- kingIcon -->
                          <div class="h-16 w-30 inline"
                               v-if="v.msgData.msg.ct.kingIcon">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.ct.kingIcon" />
                          </div>
                          <!-- 用户等级 -->
                          <div class="h-16 w-30 inline">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                          </div>
                          <!-- vip标识 -->
                          <div class="h-16 w-30 inline"
                               v-if="v.msgData.msg.ct.vipType != 0">
                            <img class="h-12 w-26"
                                 src="@/assets/images/chat_vip.png" />
                          </div>
                          <!-- 守护 -->
                          <div class="h-16 w-16 inline"
                               v-if="v.msgData.msg.ct.guardType != 0">
                            <img class="h-12 w-12"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                          </div>
                          <!-- 靓号 -->
                          <div class="h-16 w-16 inline"
                               v-if="v.msgData.msg.ct.liangname != 0">
                            <img class="h-12 w-12"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                          </div>
                          <div class="w-fit inline">
                            <template v-if="v.msgData.msg.msgtype == 2">
                              <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}：</span>{{v.msgData.msg.content}}
                            </template>
                            <template v-else>
                              <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}</span>&nbsp;{{langSwitch('进入直播间')}}
                            </template>
                          </div>
                        </div>
                      </template>
                      <template v-if="v.msgID == 8">
                        <div class="cl-white line-16">
                          <div class="h-16 w-30 inline">
                            <img class="h-14 w-26 relative top-2"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_system@2x.png`)" />
                          </div>
                          <span class="box-border px-2"
                                v-html="`${v.msgData.msg.ct.nickname} ${langSwitch('在')}<span class='cl-F2CF40'> ${v.msgData.msg.ct.lotteryName} </span>${langSwitch(' 中,下注了 ')}<span class='cl-F2CF40'> ${v.msgData.msg.ct.totalmoney} </span> ${langSwitch('钻石')}`">
                          </span>
                          <div class="h-16 w-26 inline">
                            <img class="h-14 w-26 relative top-2"
                                 @click="confirmBetFn(v)"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_follow_bet@2x.png`)" />
                          </div>
                        </div>
                      </template>
                      <template v-if="v.msgID == 12">
                        <div class="cl-white line-16">
                          <div class="h-16 w-30 inline">
                            <img class="h-14 w-26 relative top-2"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_win@2x.png`)" />
                          </div>
                          <span class="box-border px-2 line-16">
                            恭喜{{v.msgData.msg.ct.nickname}}在{{v.msgData.msg.ct.lotteryName}}中奖了
                          </span>
                        </div>
                      </template>
                      <template v-if="v.msgID == 33">
                        <div class="cl-white line-16">
                          <div class="h-16 w-30 inline">
                            <img class="h-14 w-26 relative top-2"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_win@2x.png`)" />
                          </div>
                          <span class="box-border px-2 line-16"
                                v-html="v.msgData.msg.ct">
                          </span>
                          <div class="h-16 w-26 inline">
                            <img class="h-14 w-26 relative top-2"
                                 @click="followGameFn(v)"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_follow_game@2x.png`)" />
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="h-24 w-full"></div>
                  </div>
                </div>
                <div class="flex-1 w-full px-4 box-border scroll-y"
                     v-if="is_liveMsgBottom"
                     v-touch:swipeup="liveMsgBottomUpSlide"
                     v-touch:swipedown="liveMsgBottomDownSlide"
                     ref="liveMsgBottomWrap"
                     style="background: rgba(255,255,255,0.3)">
                  <div class="h-fit"
                       ref="liveMsgBottom">
                    <div class="pl-8 pr-8 pt-2 pb-2 box-border mt-4 rounded-8 bg-mask w-fit line-16 h-fit"
                         v-for="(v, k) in liveMsgBottom"
                         :key="k + 'liveMsgBottom'">
                      <template v-if="v.msgID == 1">
                        <div class="cl-white flex fz-12"
                             @click="liveroom_user(v.msgData.msg.ct)">
                          <!-- kingIcon -->
                          <div class="h-16 w-30 flex items-center"
                               v-if="v.msgData.msg.ct.kingIcon">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.ct.kingIcon" />
                          </div>
                          <!-- 用户等级 -->
                          <div class="h-16 w-30 flex items-center">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                          </div>
                          <!-- vip标识 -->
                          <div class="h-16 w-30 flex items-center"
                               v-if="v.msgData.msg.ct.vipType && v.msgData.msg.ct.vipType != 0">
                            <img class="h-12 w-26"
                                 src="@/assets/images/chat_vip.png" />
                          </div>
                          <!-- 守护 -->
                          <div class="h-16 w-16 flex items-center"
                               v-if="v.msgData.msg.ct.guardType && v.msgData.msg.ct.guardType != 0">
                            <img class="h-12 w-12"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                          </div>
                          <!-- 靓号 -->
                          <div class="h-16 w-16 flex items-center"
                               v-if="v.msgData.msg.ct.liangname && v.msgData.msg.ct.liangname != 0">
                            <img class="h-12 w-12"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                          </div>
                          <div class="w-fit">
                            <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.ct.level - 1) / 10)]}"> {{ v.msgData.msg.ct.userNicename }}：</span>{{v.msgData.msg.content}}
                          </div>
                        </div>
                      </template>
                      <template v-if="v.msgID == 17">
                        <div class="cl-white flex fz-12"
                             @click="liveroom_user(v.msgData.msg)">
                          <!-- kingIcon -->
                          <div class="h-16 w-30 flex items-center"
                               v-if="v.msgData.msg.kingIcon">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.kingIcon" />
                          </div>
                          <!-- 用户等级 -->
                          <div class="h-16 w-30 flex items-center">
                            <img class="h-12 w-26"
                                 :src="v.msgData.msg.level > 0 && getters_getConfig.level[v.msgData.msg.level-1].thumb" />
                          </div>
                          <!-- vip标识 -->
                          <div class="h-16 w-30 flex items-center"
                               v-if="v.msgData.msg.vipType && v.msgData.msg.vipType != 0">
                            <img class="h-12 w-26"
                                 src="@/assets/images/chat_vip.png" />
                          </div>
                          <!-- 守护 -->
                          <div class="h-16 w-16 flex items-center"
                               v-if="v.msgData.msg.guardType && v.msgData.msg.guardType != 0">
                            <img class="h-14 w-14"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_shou_month.png`)" />
                          </div>
                          <!-- 靓号 -->
                          <div class="h-16 w-16 flex items-center"
                               v-if="v.msgData.msg.liangname && v.msgData.msg.liangname != 0">
                            <img class="h-12 w-12"
                                 :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_chat_liang.png`)" />
                          </div>
                          <div class="w-fit">
                            <span :style="{color: levelColorSet[Math.floor((v.msgData.msg.level - 1) / 10)]}"> {{ v.msgData.msg.uname }}：</span><span class="cl-F2CF40">送了{{v.msgData.msg.ct.giftcount}}个{{v.msgData.msg.ct.giftname}}</span>
                            <img class="inline w-12 h-12 relative top-2 left-2"
                                 src="@/assets/images/plane_heart_cyan.png">
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class="h-24 w-full"></div>
                  </div>
                </div>
                <!-- 新增show_level -->
                <div class="w-full h-16">
                  <div>
                    <liveRoomUser v-if="vData"
                                  @vDataEmpty="vDataEmpty"
                                  :vData="vData"></liveRoomUser>
                  </div>
                </div>
              </div>
              <div class="w-62 relative">
                <!-- 一元空降 -->
                <div class="absolute w-62 h-66 top-66- flex justify-center">
                  <div class="w-42"
                       @click="goddessBool = true"
                       v-if="yykj_obj.length != 0 && ( getters_getConfig.fuckactivity && LANG == 'zh-CN' )">
                    <img class="w-42 h-42"
                         :src="yykj_obj[0].icon" />
                    <div class="h-24 text-center cl-white fz-10">{{yykj_obj[0].name}}</div>
                  </div>
                </div>

                <div class="w-62 h-66 flex justify-center">
                  <div class="w-42"
                       @click="isBetBool_fn"
                       v-if="!!getters_getEnterRoom.roomLotteryInfo.logo">
                    <img class="w-42 h-42 rounded"
                         :src="getters_getEnterRoom.roomLotteryInfo.logo">
                    <div class="h-24 text-center cl-white fz-10">
                      <span v-if="!(getters_publicTime < 1)">{{getters_publicTime < 10 ? '0':''}}{{getters_publicTime}}{{langSwitch('秒')}}</span>
                      <span v-else
                            class="line-24">
                        {{langSwitch('开奖中')}}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-62 h-66 flex justify-center">
                  <div class="w-42"
                       v-if="mrpj_obj.length != 0"
                       @click="getTaskListFun">
                    <img class="w-42 h-42"
                         :src="mrpj_obj[0].icon" />
                    <div class="h-24 text-center cl-white fz-10">{{mrpj_obj[0].name}}</div>
                  </div>
                </div>
                <div class="w-62 h-66 flex justify-center">
                  <div class="w-42"
                       v-if="cz_obj.length != 0"
                       @click="toRouter('recharge', {back: true})">
                    <img class="w-42 h-42"
                         :src="cz_obj[0].icon" />
                    <div class="h-24 text-center cl-white fz-10">{{cz_obj[0].name}}</div>
                  </div>
                </div>
                <div class="w-62 h-66 flex justify-center">
                  <div class="w-42"
                       v-if="jcpd_obj.length != 0"
                       @click="bigTurntable">
                    <img class="w-42 h-42"
                         :src="jcpd_obj[0].icon">
                    <div class="h-24 text-center cl-white fz-10">{{jcpd_obj[0].name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 底部选项区 -->
          <div class="w-full h-46 flex">
            <div class="w-140 flex items-center justify-center"
                 v-if='masterSwitch'
                 @click="chatCommonArea = true">
              <div class="w-120 h-24 bg-mask line-24 rounded-30 fz-12 cl-white pl-10 box-border">
                {{ langSwitch('撩TA一下...') }}
              </div>
            </div>
            <div class="flex-1 flex items-center justify-end">
              <img src="~@/assets/images/icon_game.png"
                   @click="game_showShare_fn"
                   v-if='masterSwitch'
                   class="w-24 h-24 mr-4 ml-4 animate__animated animate__faster animate__infinite infinite animate__swing">
              <img src="~@/assets/images/icon_liwu.png"
                   @click="getGiftList"
                   v-if='masterSwitch'
                   class="w-24 h-24 mr-4 ml-4">
              <img src="~@/assets/images/icon_hb.png"
                   @click="redBag_showShare = true"
                   v-if='masterSwitch'
                   class="w-24 h-24 mr-4 ml-4">
              <img src="~@/assets/images/icon_guanbi.png"
                   @click="closeButtonFn"
                   class="w-24 h-24 mr-8 ml-4">
            </div>
          </div>
          <!-- 投注区 -->
          <div class="h-280 w-full relative bet-bg-img bg-auto"
               v-if="isBetBool">
            <div class="h-16 w-full absolute left bet-bg-img-header bg-auto"
                 style="top: -10px"></div>
            <component v-if="isBetBool"
                       v-bind:is="currentGameComponent"
                       :deliveryTime="deliveryTime"
                       @betAssistant="betAssistant"
                       :MOREGAMEDATA_OPEN="MOREGAMEDATA_OPEN"
                       :MOREGAMEDATA_USER="MOREGAMEDATA_USER"
                       :mSocket="mSocket"></component>
          </div>
          <!-- 主播名片 fixed -->
          <div class="w-48 h-58 fixed top-36 right flex flex-col"
               v-show="zbmp_obj.length >= 1"
               @click="zbmp_show_fn">
            <div class="h-40 flex justify-center">
              <img :src="zbmp_obj.length >= 1 && zbmp_obj[0].icon"
                   class="h-40 w-40">
            </div>
            <div class="h-18 fz-10 line-18 text-center cl-white">{{ langSwitch("主播名片") }}</div>
          </div>
          <!-- 控制直播流声音 -->
          <!-- <div class="absolute right-12 top-96">
            <van-icon name="volume-o"
                      color="#ffffff"
                      @click="$emit('onSound')"
                      size="16" />
          </div> -->
        </div>
      </transition>
      <!-- 消息弹幕 礼物 进入直播间特效 -->
      <lotteryBarrage v-if="lotteryBarrage_show && masterSwitch"
                      :barrage_list="barrage_list"
                      :svgaBoxArray="svgaBoxArray"
                      :guardTypeArray="guardTypeArray"
                      :isBetBool="isBetBool"
                      :k3OpenData="k3OpenData"
                      @k3OpenDataEmpty="k3OpenDataEmpty"
                      @updata_barrage_list="updata_barrage_list"
                      @updata_svgaBoxArray="updata_svgaBoxArray"
                      @updata_guardTypeArray="updata_guardTypeArray">
      </lotteryBarrage>
    </div>
    <!-- 主播名片 -->
    <van-popup v-model="zbmp_show"
               position="bottom"
               :style="{ height: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-280 h-400 rounded-20 anchor_bg bg-auto">
        <div class="h-36 w-280 relative">
          <div class="absolute top-6 right-6">
            <van-icon name="close"
                      color="#fff"
                      @click="zbmp_show = false"
                      size="24" />
          </div>
        </div>
        <div class="h-30 line-30 text-center fz-14 cl-white">{{ANCHOR.user_nicename}}{{langSwitch('的名片')}}</div>
        <div class="flex items-center justify-center py-8">
          <img :src="ANCHOR.avatar_thumb"
               class="w-64 h-64 rounded">
        </div>
        <div class="fz-12 text-center cl-white line-16 h-24">
          {{langSwitch('备注用户昵称快速通过')}}
        </div>
        <div class="flex justify-center">
          <div class="h-30 w-240 anchor_cover bg-auto relative">
            <div class="text-center h-30 line-30 cl-white fz-14">
              <span v-if="getters_getLiveContact.consumption * 1 >= getters_getLiveContact.contact_cost * 1">
                {{zbmp_contact_list.info}}
              </span>
              <span v-else>
                ******
              </span>
            </div>
            <div class="h-18 line-18 fz-10 rounded-20 absolute right-6 top-6 px-8 cl-white copy"
                 @click="zbmp_tip"
                 :data-clipboard-text="zbmp_contact_list.info"
                 style="background: linear-gradient(to right, blue, #EF4B8D)">{{langSwitch('获取')}}</div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-240 h-160 anchor_purple bg-auto mt-12 cl-white fz-10 text-center px-10 box-border">
            <div class="line-24 fz-12">{{langSwitch('获取名片进度')}}</div>
            <div class="line-12">{{langSwitch('赠送礼物达到要求即可获取')}}</div>
            <div class="h-24 flex items-center justify-center">
              <div class="h-12 flex-1 bg-white rounded-12 text-center cl-red line-12 fz-12 relative">
                <div class="lineProgress bg-EF4B8D h-12 rounded-12 absolute left"
                     :style="`width: ${((getters_getLiveContact.consumption * 1)/(getters_getLiveContact.contact_cost * 1) * 200).toFixed(0)}px`"></div>
                {{getters_getLiveContact.consumption * 1}}/{{getters_getLiveContact.contact_cost * 1}}
              </div>
              <div class="w-20 h-24 relative">
                <img class="w-20 h-20 absolute left-4 top-2"
                     @click="zbmp_show = false;getGiftList()"
                     src="~@/assets/images/anchor_liwu.png">
              </div>
            </div>
            <div class="line-12 pl-4 box-border text-left">{{langSwitch('1.添加时请备注昵称避免主播无法区分')}}</div>
            <div class="line-24 pl-4 box-border text-left">{{langSwitch('2.联系方式如有虚假可通过客户投诉')}}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 用户信息 -->
    <van-popup v-model="other_user_show"
               position="bottom"
               :style="{ height: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-280 h-360 rounded-10 bg-white fz-12 scroll-hide">
        <div class="h-120 w-280 bg-auto userMsg_backImg relative">
          <div class="h-30 line-30 cl-a8a8a8 px-12 box-border relative z-index-2">
            <span class="extend-via-border"
                  @click="reportFn">{{langSwitch('举报')}}</span>
            <div class="absolute w-30 h-38 bg-EF4B8D top right-24 cl-white text-center"
                 style="border-bottom-left-radius:30px;border-bottom-right-radius:30px;">
              <van-icon name="close"
                        class="relative top-10"
                        @click="other_user_show = false"
                        size="20" />
            </div>
          </div>
          <div class="h-120 absolute top left w-full flex justify-center items-center">
            <div class="userMsg_header bg-auto w-110 h-108 flex justify-center items-center">
              <img v-real-img="current_user.avatar"
                   :src="zwfImg"
                   class="w-62 h-62 rounded">
            </div>
          </div>
        </div>
        <div class="h-240 w-280 flex flex-col bg-f4f4f4">
          <div class="h-50 flex flex-col text-center">
            <div class="h-30 line-40">
              <span class="bolder fz-14">{{current_user.user_nicename}}</span>
              <img class="h-12 w-12 ml-4"
                   :src="current_user.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
              <img class="h-12 w-26 ml-4"
                   :src="current_user.level_anchor> 0 && getters_getConfig.levelanchor[current_user.level_anchor-1].thumb" />
              <img class="h-12 w-26 ml-4"
                   :src="current_user.level> 0 && getters_getConfig.level[current_user.level-1].thumb" />
            </div>
            <div class="h-20 line-20">
              <span class="cl-a8a8a8"> ID:{{current_user.id}} </span>
              <van-icon name="location-o"
                        color="black" />
              <span class="cl-a8a8a8"> {{current_user.city || langSwitch('好像在火星')}} </span>
            </div>
          </div>
          <div class="fz-10 h-20 w-full relative">
            <div class="absolute top-2 bottom left right flex scroll-x px-4 box-border">
              <div class="w-fit h-16 line-10 box-border cl-white pl-6 pr-6 pt-4 pb-6 mr-4 rounded-4"
                   v-for="(v) in current_user.label"
                   :key="v.id"
                   :style="{'background': v.colour}"
                   style="flex-shrink: 0;">
                {{v.name}}
              </div>
              <div class="w-fit h-16 line-10 box-border cl-EF4B8D pl-6 pr-6 pt-4 pb-6 rounded-4"
                   style="border: 1px solid #EF4B8D;flex-shrink: 0;">+{{langSwitch('添加印象')}}</div>
            </div>
          </div>
          <div class="h-130 w-full flex flex-col cl-a8a8a8">
            <div class="flex-1 flex">
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-18 cl-black bolder line-40 h-35">{{current_user.fans}}</div>
                <div class="h-20">{{langSwitch('粉丝')}}</div>
              </div>
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-18 cl-black bolder line-40 h-35">{{current_user.follows}}</div>
                <div class="h-20">{{langSwitch('关注')}}</div>
              </div>
            </div>
            <div class="flex-1 flex">
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-18 cl-black bolder line-40 h-35">{{(current_user.consumption/10).toFixed(0)}}</div>
                <div class="h-20">{{langSwitch('送出钻石')}}</div>
              </div>
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-18 cl-black bolder line-40 h-35">{{(current_user.votestotal/10).toFixed(0)}}</div>
                <div class="h-20">{{langSwitch('收入钻石')}}</div>
              </div>
            </div>
          </div>
          <div class="h-40 box-border bt-1px flex"
               style="border-color: #D3D3D3;">
            <div class="flex-1 text-center line-40 fz-14 bolder"
                 @click="toAttention_popup(current_user)">{{current_user.isattention == 0? langSwitch('关注') :langSwitch('已关注') }}</div>
            <div class="flex-1 text-center line-40 fz-14 bolder"
                 @click="toRouter('anchorDetails', { touid:current_user.id || current_user.uid })">{{langSwitch('主页')}}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 举报 -->
    <van-popup v-model="report_user_show"
               :close-on-click-overlay="false"
               position="bottom"
               :style="{ height: '92%',width: '100%' }"
               round>
      <div class="h-20"></div>
      <div class="h-36 flex w-full">
        <div class="w-36 h-36 flex items-center justify-center">
          <van-icon @click="report_user_show = false"
                    size="20"
                    name="arrow-left" />
        </div>
        <div class="flex-1 fz-14 flex items-center justify-center">
          <span>{{langSwitch('举报')}}</span>
        </div>
        <div class="w-36 h-36 flex items-center text-center">
        </div>
      </div>
      <div class="h-60 w-full bg-f1f1f1 fz-12">
        <div class="h-30 line-30 px-12 cl-a8a8a8 box-border">{{langSwitch('请选择举报理由')}}</div>
        <div class="h-30 line-30 px-12 cl-a8a8a8 box-border">{{langSwitch('更多详细信息请在说明框中描述（选填）')}}</div>
      </div>
      <div class="h-80">
        <van-field v-model="report_content"
                   type="textarea"
                   :placeholder="langSwitch('请输入举报内容')" />
      </div>
      <div class="h-36 w-full px-20 box-border mt-10">
        <van-button type="warning"
                    size="small"
                    block
                    color="yellow"
                    @click="submit_report_user"
                    round>{{langSwitch('提交')}}</van-button>
      </div>
    </van-popup>
    <!-- 守护 -->
    <van-popup v-model="guard_show"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-300 h-400 rounded-10 bg-white fz-12 flex flex-col">
        <div class="w-full h-36 line-36 text-center fz-14 box-border van-hairline--bottom relative">
          {{langSwitch('守护')}} ({{ getters_getEnterRoom.guard_nums }})
          <div class="absolute top-4 right-8">
            <van-icon name="close"
                      @click="guard_show = false"
                      size="20" />
          </div>
        </div>
        <div class="flex-1 w-full relative">
          <div class="absolute top bottom left right scroll-y">
            <div class="h-200 w-full flex flex-col"
                 v-if="guard_show_list.length != 0">
              <div class="h-130 flex items-center justify-center">
                <div class="w-160 h-120 relative flex justify-center">
                  <div class="w-60 h-60 rounded bg-red relative top-46 left scroll-hide">
                    <img :src="zwfImg"
                         v-real-img="guard_show_list[0].avatar_thumb"
                         class="w-full h-full"
                         alt="">
                  </div>
                  <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_shzx.png`)"
                       class="w-full h-full z-index-2 absolute"
                       alt="">
                </div>
              </div>
              <div class="h-60 flex flex-col justify-center items-center">
                <div>
                  <div class="h-20 text-center line-20 fz-12 bolder">
                    {{guard_show_list[0].user_nicename}}
                  </div>
                  <div class="h-20 flex items-center justify-center">
                    <div>
                      <img class="h-12 w-12 ml-4"
                           :src="guard_show_list[0].sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                      <img class="h-12 w-26 ml-4"
                           :src="guard_show_list[0].level > 0 && getters_getConfig.level[guard_show_list[0].level-1].thumb">
                    </div>
                  </div>
                  <div class="h-20 text-center line-20 fz-12">
                    {{langSwitch("本周贡献")}} <span class="cl-F2CF40">{{guard_show_list[0].contribute}}</span> {{langSwitch('钻石')}}
                  </div>
                </div>
              </div>
            </div>
            <div class="px-8 w-full box-border">
              <div v-for="(v, k) in guard_show_list"
                   :key="k + 'guard'">
                <div class="w-full h-52 py-8 flex van-hairline--bottom box-border"
                     v-if="k != 0">
                  <div class="w-24 flex items-center">
                    <img :src="v.issuper == 0 ? require(`@/assets/images/multiLanguage/${LANG}/${LANG}_guard_low.png`):require(`@/assets/images/multiLanguage/${LANG}/${LANG}_guard_heig.png`)"
                         class="h-14 w-20"
                         alt="">
                  </div>
                  <div class="w-36 flex items-center justify-center">
                    <img :src="zwfImg"
                         v-once
                         v-real-img="v.avatar_thumb"
                         class="w-36 h-36 rounded"
                         alt="">
                  </div>
                  <div class="flex-1 flex flex-col pl-8 line-18">
                    <div class="flex-1 fz-12 flex items-center">
                      <div class="bolder">{{v.user_nicename}}</div>
                      <div class="flex-1 flex items-center">
                        <img class="h-12 w-12 ml-4"
                             :src="v.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                        <img class="h-12 w-26 ml-4"
                             :src="v.level > 0 && getters_getConfig.level[v.level-1].thumb">
                      </div>
                    </div>
                    <div class="flex-1 cl-a8a8a8">{{v.contribute}} {{langSwitch('钻石')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-160 w-full flex flex-col"
                 v-if="guard_show_list.length == 0">
              <div class="h-130 flex items-center justify-center">
                <div class="w-160 h-120 relative flex justify-center">
                  <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_xwyd.png`)"
                       class="w-full h-full z-index-2 absolute"
                       alt="">
                </div>
              </div>
              <div class="h-24 cl-a8a8a8 flex flex-col justify-center items-center">
                <div>{{langSwitch("成为TA的第一个守护")}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-36 line-36 text-center fz-14 flex box-border bt-1px">
          <div class="flex-1 fz-10 text-left pl-12 box-border cl-a8a8a8">
            {{langSwitch('快去为你喜欢的主播开通守护吧')}}
          </div>
          <div class="w-100 h-36">
            <span class="cl-white fz-12 bg-F2CF40 pl-16 pr-16 pt-4 pb-4 rounded-20"
                  @click="guardListPopupFn">{{langSwitch('开通守护')}}</span>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 实时榜单 -->
    <van-popup v-model="now_rank_show"
               position="bottom"
               :style="{ height: '80%', width: '100%' }"
               round>
      <div class="absolute top bottom left right flex flex-col">
        <div class="h-40 line-40 text-center fz-14 bg-f4f4f4">
          {{langSwitch('日榜')}}
        </div>
        <div class="h-16 line-16 fz-10 cl-a8a8a8 pl-4 box-border">
          {{langSwitch('最后更新:')}} {{  $moment(new Date()).format("YYYY-MM-DD HH:mm:ss")  }}
        </div>
        <div class="flex-1 w-full relative">
          <div class="absolute top bottom left right">
            <div class="w-full h-full scroll-y">
              <div class="h-50 w-full box-border flex"
                   v-for="(v, k) in now_rank_data"
                   :key="k + 'now_rank_data'">
                <div class="w-30 h-50 fz-14 line-50 text-center bolder cl-a8a8a8">
                  <span :class="k < 2 ? 'cl-red': ''">{{ k + 1}}</span>
                </div>
                <div class="w-50 h-50 flex items-center justify-center">
                  <img v-real-img="v.photo"
                       :src="zwfImg"
                       class="w-44 h-44 rounded">
                </div>
                <div class="flex-1 fz-14 line-50 h-50">
                  {{ v.name}}
                </div>
                <div class="w-100 h-50 fz-12 pr-10 box-border cl-a8a8a8 flex items-center justify-end">
                  {{v.coin}} {{langSwitch('钻石')}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-52 w-full bg-f4f4f4">
          <div class="h-50 w-full box-border flex">
            <div class="w-30 h-50 fz-14 line-50 text-center bolder cl-a8a8a8">
              <span :class="now_rank_index < 2 ? 'cl-red': ''"
                    v-if="!!now_rank_index">{{ now_rank_index + 1}}</span>
            </div>
            <div class="w-50 h-50 flex items-center justify-center">
              <img :src="ANCHOR.avatar_thumb"
                   class="w-44 h-44 rounded">
            </div>
            <div class="flex-1 fz-14 line-50 h-50 flex">
              <div class="flex-1">
                {{ ANCHOR.user_nicename}}
              </div>
              <div class="w-fit fz-8 flex flex-col"
                   v-if="!!now_rank_index">
                <div v-if="now_rank_index > 0"
                     class="cl-a8a8a8">{{langSwitch("距离上一名还差")}} <span class="cl-orange">{{ parseInt((now_rank_data[now_rank_index-1]['coin']-now_rank_data[now_rank_index]['coin'])) }}</span> {{langSwitch("钻石")}}</div>
              </div>
            </div>
            <div class="w-fit h-50 flex items-center justify-center">
              <span class="cl-white fz-12 bg-orange pl-12 pr-12 pt-4 pb-4 rounded-4"
                    @click="now_rank_show = false;getGiftList()">{{langSwitch('送礼')}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 每日任务 -->
    <van-popup v-model="isBoxPopup"
               class="text-center fz-12"
               position="bottom"
               style="background:transparent !important;"
               :style="{ height: '100%',width: '100%' }">
      <div class="absolute top bottom left right flex items-center justify-center">
        <div class="h-500 w-356 relative rounded-8 scroll-hide">
          <div class="absolute top bottom left right">
            <div class="absolute top w-356 h-32 line-32 fz-16 cl-white"
                 style="background: linear-gradient(to bottom right, #FE2A80, #FE2A8C)">
              {{langSwitch('任务大厅')}}
              <div class="absolute top-4 right-8">
                <van-icon name="close"
                          class="cl-white"
                          @click="isBoxPopup = false"
                          size="20" />
              </div>
            </div>
            <div class="absolute top-32 bottom left right w-356 scroll-hide">
              <div class="w-356 absolute top bottom left right">
                <van-tabs v-model="isTaskActive"
                          line-width="70px"
                          :ellipsis="false"
                          color="#FE2A8C"
                          title-active-color="#FE2A8C"
                          @click="currentContentResult()"
                          animated>
                  <van-tab v-for="(v,k) in boxSetData"
                           :key="k"
                           :title="v">
                    <div class="h-424 scroll-y bg-f1f1f1 px-8 pt-8 box-border"
                         v-cloak>
                      <div class="w-full bg-white rounded-8 pl-8 pr-8 pt-4 pb-4 box-border mb-8"
                           v-for="(v,k) in currentContent"
                           :key="k">
                        <div class="w-full h-16 line-16 text-left cl-00a000 bolder">
                          {{v.title}}
                        </div>
                        <div class="w-full h-16 line-16 text-left cl-a8a8a8">
                          {{v.desc}}
                        </div>
                        <div class="w-full h-fit flex">
                          <div class="flex-1 flex flex-col"
                               :data-info="v.condition_info">
                            <div class=" w-full pr-20 box-border flex items-center justify-center">
                              <div class="w-full pt-5 ">
                                <van-progress :percentage="(Number(v.condition_info[0].cur_num)/Number(v.condition_info[0].condition_num)) > 1 ? 1 * 100 : (Number(v.condition_info[0].cur_num)/Number(v.condition_info[0].condition_num)) * 100"
                                              stroke-width="8px"
                                              :show-pivot="false" />
                              </div>
                            </div>
                            <div class="h-fit text-left pt-8"
                                 style="color: #FE2A8C">
                              {{`${v.condition_info[0].desc}(${v.condition_info[0].cur_num}/${v.condition_info[0].condition_num})`}}
                            </div>
                          </div>
                          <div class="">
                            <div class="cl-00a000">
                              <div v-html="formatWord(v.task_reward_desc)"></div>
                            </div>
                            <div class="pt-4"
                                 style="float: right">
                              <div class="p-all-4 bg-orange cl-white rounded-16 w-60 "
                                   @click="goToDoing(v)">
                                {{ v.completed == 1 ? langSwitch('已完成') : v.condition_info[0].cur_num >= v.condition_info[0].condition_num ? langSwitch('领取') : langSwitch('去完成') }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full h-20 fz-10 line-20 cl-a8a8a8">
                          {{langSwitch('时间')}}:{{ $moment(Number(v.start_time * 1000)).format("YYYY-MM-DD HH:mm") }} - {{ $moment(Number(v.end_time * 1000)).format("YYYY-MM-DD HH:mm") }}
                        </div>
                      </div>
                    </div>
                  </van-tab>
                </van-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 奖池派对 -->
    <van-popup v-model="bigTurntable_show"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-280 h-fit">
        <div class="h-fit w-full fz-12 flex flex-col rounded-8 relative jcpd_wrapper scroll-hide">
          <div class="h-50 w-full flex px-8 box-border">
            <div class="flex-1 h-50">
              <div class="h-30 line-40 cl-yellow fz-10">{{langSwitch('奖金池剩余奖金')}}</div>
              <div class="h-20 w-full">
                <div class="h-14 w-90 bg-white cl-red text-center line-14 rounded-4">{{bigTurntable_data.pool}}</div>
              </div>
            </div>
            <div class="flex-1 h-50 flex flex-col">
              <div class="flex-1 h-25 text-right line-32">
                <span class="pl-10 pr-10 pt-2 pb-2 rounded-4 h-16 line-16 cl-yellow ba-1px box-border fz-10"
                      @click="getLuckydrawRecord(0, true)">{{langSwitch('中奖记录')}}</span>
              </div>
              <div class="flex-1 h-25 text-right line-26">
                <span class="pl-10 pr-10 pt-2 pb-2 rounded-4 h-16 line-16 cl-yellow ba-1px box-border fz-10"
                      @click="bigTurntable_rule_show = true">{{langSwitch('奖励规则')}}</span>
              </div>
            </div>
          </div>
          <div class="h-30"></div>
          <div class="h-320 relative jcpd flex flex-col ">
            <div class="h-232 w-full flex items-center justify-center">
              <div class="h-232 w-232 flex items-center justify-center">
                <turnTable :prize-list="bigTurntable_data.reward"
                           class="relative left-2"
                           :strict="false"
                           :spinConfig="{duration:3000,circle: 1,mode: 'ease-out'}"
                           :count=" Number(bigTurntable_data.left_times) || 0"
                           :getPrize="getPrizeFunc"
                           :colors="[ '#F9F9D2',' #F1CA6C']"
                           :textColors="[' #F1CA6C','#F9F9D2']"
                           :size="turnTableVar">
                  <span slot="centerText"
                        @click="getPrizeFunc_btn">{{langSwitch("抽奖")}}</span>
                </turnTable>
              </div>
            </div>
            <div class="h-88 w-full flex items-center justify-center">
              <div class="h-30 w-full text-center fz-16 line-30 cl-white">{{langSwitch("剩余抽奖次数")}}: {{ bigTurntable_data.left_times }}</div>
            </div>
          </div>
          <div class="fz-10 h-112 scroll-y p-all-8 box-border"
               v-html="bigTurntable_data.process_tip">
          </div>
        </div>
        <div class="h-20 w-full text-center line-60">
          <van-icon name="close"
                    class="cl-white"
                    @click="bigTurntable_show = false"
                    size="24" />
        </div>
      </div>
    </van-popup>
    <!-- 中奖规则 -->
    <van-popup v-model="bigTurntable_rule_show"
               position="bottom"
               :duration="0.2"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-280 h-300 bg-red rounded-10">
        <div class="h-40 fz-24 line-40 box-border van-hairline--bottom text-center cl-yellow">
          {{langSwitch('奖池规则')}}
        </div>
        <div class="h-260 scroll-y px-8 box-border fz-10 bt-1px"
             v-html="bigTurntable_data.rule">
        </div>
        <!-- close -->
        <div class="text-center line-60">
          <van-icon name="close"
                    class="cl-white"
                    @click="bigTurntable_rule_show = false"
                    size="24" />
        </div>
      </div>
    </van-popup>
    <!-- 中奖记录 -->
    <van-popup v-model="bigTurntable_draw_show"
               position="bottom"
               :duration="0.2"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-280 h-300 bg-red rounded-10">
        <div class="h-40 fz-24 line-40 box-border text-center van-hairline--bottom cl-yellow flex rounded-10 scroll-hide">
          <div class="flex-1"
               @click="getLuckydrawRecord(0)"
               :class="bigTurntable_draw_active == 'djjl'? 'draw_active' : ''">{{langSwitch('大奖记录')}}</div>
          <div class="flex-1"
               @click="getLuckydrawRecord(1)"
               :class="bigTurntable_draw_active == 'wdjl'? 'draw_active' : ''">{{langSwitch('我的记录')}}</div>
        </div>
        <div class="h-260 scroll-y px-8 box-border fz-10 bt-1px">
          <div class="pt-4"
               v-if="!!bigTurntable_draw_obj">
            <div v-for="(v, k) in bigTurntable_draw_obj"
                 :key="k+'zjjl'">
              <div v-html="v"></div>
            </div>
          </div>
        </div>
        <!-- close -->
        <div class="text-center line-60">
          <van-icon name="close"
                    class="cl-white"
                    @click="bigTurntable_draw_show = false;"
                    size="24" />
        </div>
      </div>
    </van-popup>
    <!-- 游戏 -->
    <van-popup v-model="game_showShare"
               position="bottom"
               :style="{ height: '40%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;">
      <div class="w-full bg-white h-fit pl-8 pr-8 pb-18 box-border flex flex-col"
           style="background:transparent !important;">
        <div class="flex-1 w-full bg-white mb-10 rounded-4">
          <div class="pt-8 box-border">
            <div class="inline-block h-50 w-Equally-4 flex flex-col"
                 v-for="(v,k) in getters_getLotteryList.lotteryList"
                 @click="game_showShareToBet(v)"
                 :key="k + 'play_gameRecommendation'">
              <div class="h-28 w-full flex justify-center items-center">
                <img :src="v.logo"
                     class="h-22 w-22 rounded">
              </div>
              <div class="h-22 w-full fz-12 line-22 text-center cl-a8a8a8">{{v.name}}</div>
            </div>
          </div>
        </div>
        <div class="h-36 line-36 fz-14 rounded-4 text-center w-full bg-white"
             @click="game_showShare = false">{{langSwitch('取消')}}</div>
      </div>
    </van-popup>
    <!-- 礼物 -->
    <van-popup v-model="gift_showShare"
               position="bottom"
               class="flex items-end justify-center"
               :style="{ height: '50%', width: '100%' }"
               style="background:transparent !important;">
      <div class="w-full h-280 relative">
        <div class="absolute top bottom left right bg-black flex flex-col">
          <div class="w-full px-12 box-border h-24 line-24 fz-12 cl-white">{{langSwitch('发送礼物')}}</div>
          <div class="w-full h-210 relative"
               v-if="gift_showShare_obj">
            <van-swipe class="my-swipe cl-white"
                       :loop="false"
                       indicator-color="white">
              <van-swipe-item v-for="(v, k) in Math.ceil((gift_showShare_obj.giftlist.length)/8)"
                              :key="k+'gift'">
                <div class="h-180 w-full fz-12 px-2 box-border">
                  <div class="inline-block h-90 w-Equally-4 relative"
                       v-for="(val, key) in gift_showShare_obj.giftlist.slice(k*8, (k+1)*8)"
                       @click="selectGift( k, key)"
                       :key="k + 'giftItem'+ key">
                    <div class="absolute top bottom left right ba-1px"
                         style="border-color: black;"
                         :class="[gift_select_key == `${k}'giftItem'${key}`? 'active_gift': '']">
                      <div v-if="val.mark == 1"
                           class="absolute top-2 left-2 h-14 w-30">
                        <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_gift_hot.png`)"
                             class="w-full h-full">
                      </div>
                      <div v-if="val.type == 1"
                           class="absolute top-2 right-2 h-14 w-18">
                        <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_gift_hao.png`)"
                             class="w-full h-full">
                      </div>
                      <div class="h-50 flex justify-center items-end">
                        <img :src="val.gifticon"
                             class="h-42 w-42">
                      </div>
                      <div class="h-20 text-center"
                           :class="getters_rootStore.lang !='zh-CN' && getters_rootStore.lang !='zh-TW' ? 'fz-8':''">{{val.giftname}}</div>
                      <div class="h-16 text-center fz-10 line-10 cl-a8a8a8">{{val.needcoin}} {{langSwitch('钻')}}</div>
                    </div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="w-full h-46">
            <div class="h-36 px-12 box-border flex">
              <div class="flex-1 h-36 line-36 cl-F2CF40 fz-14 flex items-center">
                <img src="@/assets/images/damand_charge.png"
                     class="w-16 h-16 mr-4">
                {{ gift_showShare_obj.coin }} >
              </div>
              <div class="flex-1 h-36 flex items-center justify-end">
                <div v-if="gift_current"
                     class="w-fit h-fit">
                  <div @click="sendGift"
                       v-if="gift_current.type == 1"
                       class="w-fit h-fit pl-24 pr-24 pt-6 pb-6 fz-14 cl-white bg-F2CF40 rounded-20">{{langSwitch('赠送')}}</div>
                  <div v-else
                       class="w-118 h-28 line-28 flex bg-F2CF40 rounded-20 scroll-hide">
                    <div class="flex-1 p-all-2 box-border">
                      <div class="w-full h-full bg-black flex"
                           style="border-top-left-radius: 20px; border-bottom-left-radius:20px;">
                        <div class="flex-1 cl-F2CF40 fz-12 line-24 text-center">{{showPopover_giftCount}}</div>
                        <van-popover v-model="showPopover"
                                     trigger="click"
                                     placement="top">
                          <div v-for="(v, k) in showPopover_actions"
                               class="px-12 h-26 line-26 text-center cl-F2CF40 fz-12"
                               @click="showPopover_fn(v)"
                               :key="k +'showPopover_actions'">
                            {{v.text}}
                          </div>
                          <template #reference>
                            <div class="w-20 h-24 flex items-center justify-center">
                              <van-icon :name="showPopover?'arrow-up':'arrow-down'"
                                        color="#F2CF40"
                                        size="12" />
                            </div>
                          </template>
                        </van-popover>
                      </div>
                    </div>
                    <div class="flex-1 text-center fz-14 cl-white bg-F2CF40"
                         @click="sendGift">{{langSwitch('赠送')}}</div>
                  </div>
                </div>
                <div v-else>
                  <div @click="sendGift"
                       class="w-fit h-fit pl-24 pr-24 pt-6 pb-6 fz-14 cl-white bg-a8a8a8 rounded-20">{{langSwitch('赠送')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 红包 -->
    <van-popup v-model="redBag_showShare"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-260 h-354 bg-red rounded-10 relative fz-12 flex items-center justify-center">
        <div class="w-240 h-340 px-2 box-border flex flex-col">
          <div class="h-70 flex flex-col">
            <div class="h-24 line-24 fz-14 cl-yellow text-center">{{langSwitch('直播间红包')}}</div>
            <div class="h-16 fz-10 line-16 cl-D3D3D3">{{langSwitch('给当前直播间观众发红包')}}</div>
            <div class="h-30 fz-10 cl-white">
              <van-radio-group v-model="redBag_radio">
                <div class="h-30 w-full flex">
                  <div class="flex-1 px-6 box-border flex items-center justify-end">
                    <van-radio name="1">
                      <div class="h-30 line-34 cl-white">{{langSwitch('拼手气红包')}}</div>
                      <template #icon="props">
                        <img class="w-12 h-12"
                             :src="props.checked ? activeIcon : inactiveIcon" />
                      </template>
                    </van-radio>
                  </div>
                  <div class="flex-1 px-6 box-border flex items-center">
                    <van-radio name="2">
                      <div class="h-30 line-34 cl-white">{{langSwitch('平均红包')}}</div>
                      <template #icon="props">
                        <img class="w-12 h-12"
                             :src="props.checked ? activeIcon : inactiveIcon" />
                      </template>
                    </van-radio>
                  </div>
                </div>
              </van-radio-group>
            </div>
          </div>
          <div class=" h-180 flex flex-col w-full">
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-8 box-border">
                <template v-if="redBag_radio == 1">
                  <div class="w-56">{{langSwitch('总金额')}}</div>
                  <div class="flex-1 flex items-center totalCoin">
                    <van-field v-model="redBag_total"
                               type="number"
                               class="box-border"
                               :placeholder="langSwitch('请输入总金额')" />
                  </div>
                  <div class="w-36 text-right cl-a8a8a8">{{langSwitch('钻石')}}</div>
                </template>
                <template v-else>
                  <div class="w-56">{{langSwitch("单个金额")}}</div>
                  <div class="flex-1 flex items-center totalCoin">
                    <van-field v-model="reaBag_oneCoin"
                               type="number"
                               class="box-border"
                               placeholder="请输入单个金额" />
                  </div>
                  <div class="w-36 text-right cl-a8a8a8">{{langSwitch('钻石')}}</div>
                </template>
              </div>
            </div>
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-8 box-border">
                <template v-if="redBag_radio == 1">
                  <div class="w-56">{{langSwitch('数量')}}</div>
                  <div class="flex-1 flex items-center totalCoin">
                    <van-field v-model="redBag_count"
                               type="digit"
                               class="box-border"
                               :placeholder="langSwitch('请输入数量')" />
                  </div>
                  <div class="w-36 text-right cl-a8a8a8">{{langSwitch('个')}}</div>
                </template>
                <template v-else>
                  <div class="w-56">{{langSwitch('数量')}}</div>
                  <div class="flex-1 flex items-center totalCoin">
                    <van-field v-model="redBag_count_average"
                               type="digit"
                               class="box-border"
                               :placeholder="langSwitch('请输入数量')" />
                  </div>
                  <div class="w-36 text-right cl-a8a8a8">{{langSwitch('个')}}</div>
                </template>
              </div>
            </div>
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-8 box-border totalCoin">
                <van-field v-model="redBag_text"
                           type="textarea"
                           :placeholder="langSwitch('恭喜发财，大吉大利')" />
              </div>
            </div>
          </div>
          <div class="h-90">
            <div class="h-50 pt-16 box-border flex justify-center">
              <div class="w-88 h-14 rounded-20 relative">
                <div class="w-88 text-center h-24 rounded-20 absolute left"
                     v-if="!redBag_checked"
                     @click="redBag_checked = true"
                     style="top:-2px;">
                  <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_timeys.png`)"
                       class="w-88 h-24">
                </div>
                <div class="w-88 text-center h-24 rounded-20 absolute right"
                     v-if="redBag_checked"
                     @click="redBag_checked = false"
                     style="top:-2px;">
                  <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_timelj.png`)"
                       class="w-88 h-24">
                </div>
              </div>
            </div>
            <div class="h-40">
              <van-button size="small"
                          block
                          color="yellow"
                          @click="sendRedPack"
                          round><span class="cl-red fz-14">{{langSwitch('发红包')}} {{ redBag_radio == 1?  redBag_total :  reaBag_oneCoin * redBag_count_average}} {{langSwitch('钻石')}} </span></van-button>
            </div>
          </div>
        </div>
        <div class="absolute left right text-center"
             style="bottom: -40px;">
          <van-icon name="close"
                    class="cl-white"
                    @click="redBag_showShare = false;"
                    size="24" />
        </div>
      </div>
    </van-popup>
    <!-- 关闭逻辑 -->
    <van-popup v-model="show_attention_tip"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-248 h-248 bg-white rounded-12 flex items-center flex-col justify-center relative bg-auto gztc1">
        <div class="">
          <div class="h-70 w-full flex items-center justify-center">
            <div class="w-64 h-64 rounded scroll-hide">
              <img v-real-img="ANCHOR.avatar_thumb"
                   :src="zwfImg"
                   class="w-full h-full">
            </div>
          </div>
          <div class="h-50 w-full text-center fz-12 bolder flex items-center justify-center">{{langSwitch('关注主播不迷路~')}}</div>
          <div class="h-46 w-full flex items-center justify-center">
            <div class="w-180 h-30 rounded-30 line-30 fz-12 text-center cl-white"
                 style="background: linear-gradient(to bottom, #f1f1f1, #EF4B8D)"
                 @click="toAttention_exit">{{langSwitch('关注并退出')}}</div>
          </div>
          <div class="h-46 w-full flex items-center justify-center">
            <div class="w-180 h-30 bg-white rounded-30 line-30 fz-12 text-center box-border cl-EF4B8D"
                 @click="toBack()"
                 style="border:1px solid #EF4B8D">{{langSwitch('离开')}}</div>
          </div>
        </div>
        <div class="pl-12 pr-12 h-24 line-24 cl-EF4B8D fz-10 rounded-24 absolute top-20 left-20"
             style="background:#E9D6DA">
          {{langSwitch("要回来哟")}}~
        </div>
        <div class="absolute right-6 top-2">
          <van-icon size="16"
                    @click="show_attention_tip = false"
                    name="cross" />
        </div>
      </div>
    </van-popup>
    <!-- 首充超值大礼包 -->
    <van-popup close-on-click-overlay
               v-model="firstRecharge"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center z-index-22"
               style="background:transparent !important;"
               round>
      <div>
        <div class="w-300 h-440 relative">
          <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_charge_gift_bg.png`)"
               class="w-300 h-440 z-index-2 absolute"
               alt="">
          <div class="absolute w-300 h-276 bottom z-index-4 flex flex-col items-center">
            <div class="w-268 h-192 bg-white rounded-24 fz-12 flex flex-col items-center">
              <div class="w-248 h-32 bg-FFFEE0 flex rounded-32 cl-red line-32 text-center mt-8">
                <div v-for="(v,k) in getters_getBaseInfo.livePopChargeInfo"
                     class="flex-1"
                     :class="[firstRechargeIndex == k? 'active': '']"
                     @click="firstRechargeIndex = k"
                     :key="k + 'livePopChargeInfo'">
                  {{v.title}}
                </div>
              </div>
              <div class="w-268 h-30 line-30 cl-red text-center">
                {{getters_getBaseInfo.livePopChargeInfo[firstRechargeIndex]['tip_mid']}}
              </div>
              <div class="flex-1 flex items-center justify-center">
                <div class="h-110 w-64 bg-FFFEE0 rounded-20 scroll-hide flex flex-col">
                  <div class="w-64 h-24 line-24 text-center cl-red">
                    {{getters_getBaseInfo.livePopChargeInfo[firstRechargeIndex]['item'][0]['item_name']}}
                  </div>
                  <div class="w-64 flex-1 flex items-center justify-center">
                    <img :src="getters_getBaseInfo.livePopChargeInfo[firstRechargeIndex]['item'][0]['item_icon']"
                         class="w-48 h-48"
                         alt="">
                  </div>
                  <div class="w-64 h-24 bg-orange line-24 text-center cl-white">
                    {{getters_getBaseInfo.livePopChargeInfo[firstRechargeIndex]['item'][0]['item_num']}}
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-12 pb-2">
              <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_charge_gift.png`)"
                   class="h-28 w-160"
                   @click="toRouter('recharge', {back: true})"
                   alt="">
            </div>
            <div class="fz-12 cl-white">
              {{getters_getBaseInfo.livePopChargeInfo[firstRechargeIndex]['tip_end']}}
            </div>
          </div>
        </div>
        <div class="w-300 h-48 flex items-center justify-center">
          <img src="~@/assets/images/close_charge.png"
               class="w-36 h-36"
               @click="firstRecharge = false"
               alt="">
        </div>
      </div>
    </van-popup>
    <!-- 付费房间提示 -->
    <van-popup v-model="paidVideoTip"
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <!-- 增加蒙层颜色深度,拒绝白嫖 -->
      <div class="absolute top bottom right left flex items-center justify-center"
           style="background: rgba(0,0,0,0.8)">
        <div class="w-280 h-120 bg-white rounded-8 p-all-8 box-border flex flex-col">
          <div class="flex-1 flex flex-col">
            <div class="flex-1 fz-14 flex items-center justify-center relative">
              {{langSwitch('提示')}}
            </div>
            <div class="flex-1 van-hairline--bottom box-border fz-12 flex items-center justify-center">
              {{paidVideoTip_msg}}
              <!-- 本房间为{{ANCHOR.type == 3? '计时': '付费'}}房间,{{ANCHOR.type == 3?'每分钟' : ''}}需支付{{ANCHOR.type_val}}钻石 -->
            </div>
          </div>
          <div class="h-40 w-full flex fz-14">
            <div class="flex-1 flex items-center justify-center">
              <div @click="paidVideoTip_fn"
                   class="bg-f4f4f4 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12">{{langSwitch('取消')}}</div>
            </div>
            <div class="flex-1 flex items-center justify-center">
              <div @click="pay_fn"
                   class="bg-DA3E32 pl-12 pr-12 pt-6 pb-6 w-fit rounded-12 cl-white">{{langSwitch('确认')}}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 公共统一时间 -->
    <div v-show="false">
      <div v-if="publicTimeshow">
        <van-count-down :time="TIMECOUNT*1000"
                        @change="TIMECOUNT_fn">
        </van-count-down>
      </div>
    </div>
    <!-- 聊天输入 -->
    <van-popup v-model="chatCommonArea"
               :overlay="false"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;">
      <div class="w-full flex flex-col"
           style="height: 54%">
        <div class="w-full h-36 flex">
          <div class="flex-1 flex fz-12 items-center">
            <div class="pl-6 pr-6 pt-4 pb-4 mx-4 bg-white w-fit h-fit rounded-36"
                 @click="submitMsg(getters_getEnterRoom.quickSay[0])">{{ getters_getEnterRoom.quickSay[0]}}</div>
            <div class="pl-6 pr-6 pt-4 pb-4 mx-4 bg-white w-fit h-fit rounded-36"
                 @click="submitMsg(getters_getEnterRoom.quickSay[1])">{{ getters_getEnterRoom.quickSay[1]}}</div>
            <div class="pl-6 pr-6 pt-4 pb-4 mx-4 bg-white w-fit h-fit rounded-36"
                 @click="submitMsg(getters_getEnterRoom.quickSay[2])">{{ getters_getEnterRoom.quickSay[2]}}</div>
          </div>
          <div class="w-42 flex items-center justify-center">
            <div class="w-26 h-26 rounded-24 bg-white flex items-center justify-center"
                 @click="chatCommonArea = false">
              <van-icon name="cross"
                        color="#a8a8a8"
                        size="16" />
            </div>
          </div>
        </div>
        <div class="flex-1 flex">
          <div class="flex-1 flex flex-col"
               style="background:rgba(255,255,255,0.7)">
            <div class="h-36 w-full flex">
              <div class="w-50 flex items-center justify-center"
                   @click="onTrumpet = !onTrumpet">
                <img :src="require(`@/assets/images/${onTrumpet ? 'live_danmu_sel': 'live_danmu_nor'}.png`)"
                     class="w-42 h-20"
                     alt="">
              </div>
              <div class="flex-1 flex items-center justify-center">
                <input type="text"
                       v-model="sendMsg_info"
                       style="outline:none;border:none;"
                       :placeholder="`${onTrumpet?'开启大喇叭,50钻石/条':'和大家说些什么'}`"
                       class="w-full h-28 bg-white rounded-30 fz-12 cl-black pl-16 box-border">
              </div>
              <div class="w-50 flex items-center justify-center">
                <div class="w-40 h-24 cl-black bg-F2CF40 fz-12 line-24 text-center rounded-16"
                     @click="submitMsg_send">{{langSwitch("发送")}}</div>
              </div>
            </div>
            <div class="flex-1 relative">
              <div class="absolute top bottom left right scroll-y">
                <div class="fz-12 px-4 box-border flex flex-wrap">
                  <template v-for="(v, k) in getters_getEnterRoom.quickSay ">
                    <div :key="k + 'quickSay'"
                         v-if="![0,1,2].includes(k)"
                         class="w-fit he-fit mb-8"
                         @click="submitMsg(v)">
                      <div class="pl-6 pr-6 pt-4 pb-4 bg-white mx-4 w-fit h-fit rounded-36">{{ v }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 守护列表弹框 -->
    <van-popup v-model="getGuardCommodityListBool"
               :overlay="false"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;">
      <div class="w-full h-fit flex flex-col bg-white fz-12 px-8 box-border">
        <div class="h-44 w-full line-44 flex">
          <div class="flex-1">{{langSwitch("选择守护时长")}}</div>
          <div class="left-auto flex items-center justify-center"
               @click="getGuardCommodityListBool = false;">
            <van-icon name="close"
                      color="#a8a8a8"
                      size="24" />
          </div>
        </div>
        <div class="flex">
          <div class="flex flex-col pl-16 pr-16 pt-4 pb-4 fz-10 ba-1px rounded-4 mr-8"
               v-for="(v, k) in getGuardCommodityListArr.list"
               :key="k + 'list_guard'"
               :class="[v.type ==2?'bg-black cl-a8a8a8':'', getGuardCommodityListIndex == k ?'borderColorGuard': '']"
               @click="getGuardCommodityListIndexChangeFn(k)">
            <div>
              {{ getGuardCommodityListArrListChange(v) }}
            </div>
            <div class="flex justify-center">
              <img src="~@/assets/images/damand_charge.png"
                   class="h-10 w-10 mr-2"
                   alt="">
              <span class="cl-F2CF40 fz-10">{{v.coin}}</span>
            </div>
            <!--  -->
            <div class="borderColorGuardSelect">

            </div>
          </div>
        </div>
        <!--  -->
        <div class="h-44 line-44 w-full">{{langSwitch("守护特权")}}</div>
        <div v-for="(val, key ) in getGuardCommodityListArr.privilege"
             class="h-50 w-full flex"
             :key="key+'privilege_guard'">
          <div class="w-60 flex">
            <img :src="val.thumb_c"
                 v-if="getGuardCommodityListArr.list[getGuardCommodityListIndex]['privilege'].includes(String(key))"
                 class="h-28 w-46"
                 alt="">
            <img :src="val.thumb_g"
                 v-else
                 class="h-28 w-46"
                 alt="">
          </div>
          <div class="flex-1 h-50 flex flex-col">
            <div class="flex-1">{{val.title}}</div>
            <div class="flex-1 fz-10 cl-a8a8a8">{{val.des}}</div>
          </div>
        </div>
        <div class="van-hairline--top w-full h-44 flex">
          <div class="flex-1 line-44">
            <span>{{langSwitch("我的钻石")}}:</span>
            <img src="~@/assets/images/damand_charge.png"
                 class="h-10 w-10 mr-2 ml-2"
                 alt="">
            <span>{{getGuardCommodityListArr.coin}}</span>
          </div>
          <div class="w-fit flex justify-center items-center">
            <div class="h-fit pl-16 pr-16 pt-6 pb-6 bg-F2CF40 cl-white rounded-16"
                 @click="buyGuardFn">{{langSwitch("立即开通")}}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 红包展示 -->
    <van-popup v-model="showPopupRedBag"
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-240 h-300 flex flex-col bg-white fz-12 rounded-8 scroll-hide">
        <div class="h-50 w-full bg-red flex justify-center items-center">
          <div>
            <div class="cl-yellow text-center fz-14 line-20">{{langSwitch("直播间红包")}}</div>
            <div class="cl-f1f1f1 fz-10 line-12 text-center">{{langSwitch("共")}}{{getters_getRedList.length}}{{langSwitch("个红包")}}</div>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute top bottom left right scroll-y">
            <div class="h-48 w-full box-border flex van-hairline--bottom"
                 v-for="(v, k) in getters_getRedList"
                 :key="'getters_getRedList'+ k">
              <div class="w-48 flex items-center justify-center">
                <div class="w-30 h-30">
                  <img :src="zwfImg"
                       v-real-img="v.avatar_thumb"
                       class="w-full h-full rounded">
                </div>
              </div>
              <div class="flex-1 flex flex-col">
                <div class="flex-1 line-24">{{v.user_nicename}}</div>
                <div class="flex-1 line-16 fz-10 cl-a8a8a8">{{langSwitch("派发了一个")}}{{v.type_grant == 0? langSwitch('即时'): langSwitch('延迟')}}{{langSwitch("红包")}}</div>
              </div>
              <div class="w-36 flex flex-col"
                   @click="getRobRedOrDetailFn(v)">
                <div class="h-36 flex items-center justify-center">
                  <img src="@/assets/images/live_redbag.png"
                       class="w-20 h-26 rounded-4">
                </div>
                <div class="h-12 line-12 text-center cl-red fz-10">{{langSwitch("抢")}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 红包 -->
        <div class="fixed right-14 top-224 w-36 h-48 bg-red rounded-4 scroll-hide">
          <img src="@/assets/images/live_redbag.png"
               @click="showPopupRedBag = false"
               class="w-full h-full rounded-4">
        </div>
      </div>
    </van-popup>
    <!-- 红包详情 -->
    <van-popup v-model="showPopupRedBagDetail"
               :overlay="false"
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;">
      <div class="w-240 h-300 flex flex-col bg-white fz-12 rounded-8 scroll-y"
           v-if="!!getters_getRedRobList && !!getters_getRedRobList.redinfo">
        <div class="h-130 w-240 live_redbag_detail bg-auto flex flex-col">
          <div class="h-50 flex items-center justify-center">
            <img v-real-img="getters_getRedRobList.redinfo.avatar_thumb"
                 :src="zwfImg"
                 class="w-36 h-36 rounded"
                 srcset="">
          </div>
          <div class="h-30 line-20 cl-white text-center fz-10">{{getters_getRedRobList.redinfo.user_nicename}}{{langSwitch("的红包")}}</div>
          <div class="h-50 cl-yellow fz-16 text-center line-50 bolder">{{langSwitch("未抢到")}}</div>
        </div>
        <div class="h-170 w-240 flex flex-col">
          <div class="h-20 line-20 box-border van-hairline--bottom cl-orange fz-12 text-center">
            {{langSwitch("已领取")}}{{getters_getRedRobList.redinfo.nums_rob}}/{{getters_getRedRobList.redinfo.nums}}{{langSwitch("个")}},{{langSwitch("共")}}{{getters_getRedRobList.redinfo.coin_rob}}/{{getters_getRedRobList.redinfo.coin}}{{langSwitch("钻石")}}
          </div>
          <div class="flex-1 relative">
            <div class="absolute top bottom left right">
              <div class="h-36 flex px-4 box-border van-hairline--bottom"
                   v-for="(v, k) in getters_getRedRobList.list"
                   :key="k +'getters_getRedRobList_list'">
                <div class="w-36 h-36 flex items-center justify-center">
                  <img v-real-img="v.avatar"
                       :src="zwfImg"
                       alt=""
                       class="h-28 w-28 rounded"
                       srcset="">
                </div>
                <div class="flex-1 flex flex-col">
                  <div class="h-20 line-20">{{v.user_nicename}}</div>
                  <div class="h-16 fz-10 line-12 cl-a8a8a8">{{v.time}}</div>
                </div>
                <div class="w-36 h-36 cl-F2CF40 line-36 fz-12 text-right">{{v.win}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 红包 -->
        <div class="fixed right-14 top-224 w-36 h-48 bg-red rounded-4 scroll-hide">
          <img src="@/assets/images/live_redbag.png"
               @click="showPopupRedBagDetail = false"
               class="w-full h-full rounded-4">
        </div>
      </div>
    </van-popup>

    <!-- 中奖提示 -->
    <van-popup v-model="openAwardBoolean"
               @click="openAwardBoolean = false"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center z-index-21"
               style="background:transparent !important;"
               round>
      <div>
        <div class="w-fit h-fit relative">
          <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_lottery_reward.png`)"
               class="w-280 h-240">
          <div class="absolute bottom-48 h-20 line-20 w-280 text-center cl-gold fz-12">
            {{langSwitch("中奖")}} {{openAwardAmount.toFixed(2)}} {{langSwitch("钻石")}}
          </div>
          <div class="absolute bottom-96- h-20 line-20 w-280 text-center cl-white fz-12 flex items-center justify-center">
            <div class="flex">
              <div>
                {{langSwitch("点击任意处关闭")}}
              </div>
              <div v-if="openAwardBoolean">
                <van-count-down :time="openAwardTime*1000"
                                @change="openAwardTime_fn">
                  <template #default="timeData">
                    <span class="fz-12 cl-white line-20">&nbsp;{{ timeData.seconds}}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 确认投注 -->
    <van-popup v-model="comfirmBet"
               position="bottom"
               :style="{ height: '40%', width: '100%' }"
               class="flex items-end justify-end"
               style="background:transparent !important;">
      <div class="w-full bg-black cl-white h-fit box-border flex flex-col"
           v-if="comfirmBetData">
        <div class="h-40 fz-14 text-center line-40 w-full relative">
          {{langSwitch("确认投注")}}
          <div class="absolute right-8 top h-40 flex items-center">
            <van-icon name="close"
                      class="cl-white"
                      @click="comfirmBet = false"
                      size="24" />
          </div>
        </div>
        <div class="h-20 fz-10 text-center bg-a8a8a8 line-20">
          {{room_lottery.name}} - {{langSwitch("第")}} {{room_lottery.issue}} {{langSwitch("期")}}
          <span v-if="!(getters_publicTime < 1)">{{langSwitch("距封盘")}}: {{getters_publicTime}} {{langSwitch('秒')}}</span>
          <span v-else>{{langSwitch('开奖中')}}</span>
        </div>
        <div class="flex justify-center fz-12">
          <div class="h-fit w-fit pt-4 box-border">
            <div class="w-320 pl-12 pr-12 pt-4 pb-4 box-border h-56 bg-grey flex flex-col rounded-8">
              <div class="flex-1 flex line-24">
                <div class="flex-1 cl-EF4B8D">{{JSON.parse(comfirmBetData.msgData.msg.waySt)[0]}}</div>
                <div class="flex-1 text-right cl-0080FF"
                     @click="comfirmBetDeleteFn">{{langSwitch('删除')}}</div>
              </div>
              <div class="flex-1 flex line-24"
                   @click="comfirmBetEditAmount">
                <div class="flex-1 fz-10">{{room_lottery.name}} - {{comfirmBetData.msgData.msg.optionNameSt}}&nbsp; <span class="cl-EF4B8D">1</span> 注 <span class="cl-EF4B8D">{{comfirmBetArray[confirmBetItemIndex]}}</span> 倍 合</div>
                <div class="flex-1 text-right cl-EF4B8D bolder"><span>{{ (JSON.parse(comfirmBetData.msgData.msg.money)[0] * comfirmBetArray[confirmBetItemIndex]).toFixed(2) }}</span> X 1</div>
              </div>
            </div>

            <div class="flex pt-10 pb-10">
              <div class="flex-1"
                   v-for="(v, k) in comfirmBetArray"
                   @click="confirmBetItemIndex = k"
                   :key="k">
                <div class="w-46 h-24 line-22 box-border rounded-12 text-center"
                     :class="[confirmBetItemIndex == k? 'bg-EF4B8D': '']"
                     style="border: 1px solid #EF4B8D">{{v}}{{langSwitch("倍")}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- betInfo -->
        <div class="flex fz-12 box-border pl-8 pr-8 pb-8">
          <div class="flex-1 flex flex-col">
            <div class="flex-1 fz-10 flex items-center">
              <span class="cl-EF4B8D">1</span>&nbsp;{{langSwitch("注")}} &nbsp;{{langSwitch("合")}}&nbsp;<span class="cl-EF4B8D">{{(JSON.parse(comfirmBetData.msgData.msg.money)[0] * comfirmBetArray[confirmBetItemIndex]).toFixed(2)}}</span>&nbsp;{{langSwitch("钻石")}}
            </div>
            <div class="flex-1 fz-10 flex items-center">{{langSwitch("余额")}}&nbsp;<span class="cl-EF4B8D">{{ (getters_getBalanceNew.coin * 1).toFixed(2) || 0.00}}</span>&nbsp;{{langSwitch("钻石")}}</div>
          </div>
          <div class="w-fit">
            <div class="pl-6 pr-6 pt-8 pb-8 rounded-8 bg-a8a8a8"
                 :class="[(getters_publicTime >= 2 && getters_publicTime <= 57 ) ? 'bg-EF4B8D' :'']"
                 @click="comfirmBetSuccess">{{langSwitch("确认投注")}}</div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </van-popup>

    <!-- showInput -->
    <van-popup close-on-click-overlay
               v-model="comfirmBetEditAmountBool"
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center fz-14"
               style="background:transparent !important;"
               round>
      <div class="w-300 bg-white text-center rounded-12">
        <div class="h-30 w-full line-30">{{langSwitch("修改单注筹码")}}</div>
        <div class="h-44 w-full box-border px-50">
          <van-field v-model="comfirmBetEditAmountData"
                     :clearable="true"
                     type="number" />
        </div>
        <div class="h-40 line-40 w-full box-border bt-1px flex">
          <div class="flex-1 box-border br-1px"
               @click="comfirmBetEditAmountBool = false;">{{langSwitch('返回')}} </div>
          <div class="flex-1 box-border bl-1px"
               @click="comfirmBetEditAmount_confirm">{{langSwitch('确定')}} </div>
          <div></div>
        </div>
      </div>
    </van-popup>

    <!-- 一元空降 -->
    <van-popup v-model="goddessBool"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right">
        <goddess @closeGoddess="goddessBool = false"
                 :goddessBool="goddessBool"></goddess>
      </div>
    </van-popup>

    <!-- 直播间礼物详情 -->
    <van-popup v-model="isGiftDetails"
               position="right"
               :style="{ height: '100%', width: '100%' }">
      <div class="absolute top bottom left right">
        <div class="h-36 w-full line-36 box-border bb-1px flex">
          <div class="w-36 flex items-center justify-center"
               @click="closeGiftDetails">
            <van-icon size="20"
                      name="arrow-left" />
          </div>
          <div class="flex-1"></div>
          <div class="w-36"></div>
        </div>
        <div class="absolute top-36 bottom left right flex items-center justify-center">
          <div class="absolute top bottom left right scroll-y"
               v-if="giftDetailsURI">
            <iframe :src="giftDetailsURI"
                    frameborder="0"
                    class="w-full h-full iframe fz-12"></iframe>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Toast, Dialog } from 'vant';
// ws消息解密
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';
import lotteryBarrage from '@/views/widget/barrage/lotteryBarrage';
import { lottery8, lottery10, lottery11, lottery14, lottery26, lottery27, lottery28, lottery29, lottery30, lottery31 } from "@/components/lotteryGame";
import Clipboard from 'clipboard';
import md5 from 'js-md5';
import turnTable from '@/components/turnTable';
import liveRoomUser from '@/views/widget/liveRoomUser';
import goddess from "@/views/goddess";

export default {
  name: 'liveMaskCopy',
  components: {
    liveRoomUser,
    lotteryBarrage,
    lottery8,
    lottery10,
    lottery11,
    lottery14,
    lottery26,
    lottery27,
    lottery28,
    lottery29,
    lottery30,
    lottery31,
    turnTable,
    goddess,
  },
  props: ['mSocket'],
  data () {
    return {
      innerVisible: true,
      innerVisible_bet: true,
      isBetBool: false,
      // 弹框类
      zbmp_show: false,  // 主播名片
      other_user_show: false, // 用户信息名片
      current_user: '',
      report_user_show: false, // 举报
      report_content: '',
      isGiftDetails: false,
      giftDetailsURI: '',
      guard_show: false, // 守护列表
      guard_show_list: '',
      now_rank_show: false, // 实时榜单
      now_rank_data: '',
      now_rank_index: null,
      isBoxPopup: false, // 每日任务
      isTaskActive: 0,
      boxData: '',
      boxSetData: '',
      currentContent: '',
      bigTurntable_show: false, // 奖池派对，大转盘
      bigTurntable_data: '',
      bigTurntable_rule_show: false, // 中奖规则
      bigTurntable_draw_show: false, // 中奖记录
      bigTurntable_draw_active: '',
      bigTurntable_draw_obj: {},
      zwfImg: require("@/assets/images/zwf_1.png"),
      game_showShare: false, // 游戏
      gift_showShare: false, // 礼物
      gift_showShare_obj: '',
      gift_select_key: '',
      gift_current: '',
      redBag_showShare: false, // 红包
      redBag_radio: '1',
      redBag_total: 100,
      redBag_count: 10,
      reaBag_oneCoin: 1,
      redBag_count_average: 100,
      redBag_text: '',
      redBag_checked: false,
      live_content_msg: [],
      liveMsgTop: [],
      liveMsgBottom: [],
      is_liveMsgTop: true,
      is_liveMsgBottom: true,
      is_liveMsgTop_timer: null,
      is_liveMsgBottom_timer: null,
      is_liveMsgTop_count: '',
      is_liveMsgBottom_count: '',
      is_liveMsgTopCopy: true,
      is_liveMsgBottomCopy: true,
      is_liveMsgTopCopy_timer: null,
      is_liveMsgBottomCopy_timer: null,
      is_liveMsgTopCopy_count: '',
      is_liveMsgBottomCopy_count: '',
      sendMsg_info: '',
      self_info: '',
      room_lottery: '',
      room_lottery_isTime: false,
      // 弹幕消息
      lotteryBarrage_show: true,
      // showBarrage: false,
      barrage_list: [],
      // barrage_slide: "van-slide-right",
      // current_barrage: ''
      stayTime_start: '',
      show_attention_tip: false,
      currentGameComponent: '',
      deliveryTime: '',
      // 
      paidVideoTip: false,
      paidVideoTip_msg: '',
      currentRoom_type: '',
      timekeeping_mode_setInterval: null,
      TIMECOUNT: '',
      showPopover: false,
      showPopover_actions: [{ text: 1314 }, { text: 520 }, { text: 100 }, { text: 88 }, { text: 66 }, { text: 10 }, { text: 1 }],
      showPopover_giftCount: 1,
      offsetWidth: '',
      offsetHeight: '',
      chatCommonArea: false,
      onTrumpet: false,
      activeIcon: require('@/assets/images/active_select.png'),
      inactiveIcon: require('@/assets/images/inactive_select.png'),
      // checkNumber: 15,
      levelColorSet: ['#2AD286', '#009AFB', '#F37B35', '#9926FF', '#F93094', '#FE5F23', '#AA1ABB', '#FF642F', '#FD7D3C', '#E90C29'],
      svgaBox_bool: false,
      svgaBoxArray: [],
      guardTypeArray: [],
      getGuardCommodityListBool: false,
      getGuardCommodityListArr: '',
      getGuardCommodityListIndex: 0,
      liveRoomRedbagBool: false,
      showPopupRedBag: false,
      showPopupRedBagDetail: false,
      turnTableVar: '',
      firstRecharge: false, // 首充
      firstRechargeIndex: 0,
      anchorSignShowBool: false,
      // 中奖相关
      openAwardAmount: 0,
      openAwardBoolean: false,
      openAwardTime: 5,
      // 底部进入直播间集合
      footerArray: [],
      vData: '',
      vDataSetInterval: null,
      // 一分快三开奖信息
      k3OpenData: '',
      comfirmBet: false,
      comfirmBetData: '',
      comfirmBetArray: [1, 2, 5, 10, 20],
      confirmBetItemIndex: 0,
      comfirmBetEditAmountBool: false,
      comfirmBetEditAmountData: '',
      goddessBool: false,
      publicTimeshow: true,
      MOREGAMEDATA_OPEN: '',
      MOREGAMEDATA_USER: '',
    };
  },
  watch: {
    footerArray (val) {
      // console.log(val);
    },
    getters_isAppending (val) {
      // val ? this.$toast.loading({
      //   message: this.langSwitch('加载中...'),
      //   duration: 0,
      //   forbidClick: true
      // }) : this.$toast.clear();
    },
    liveMsgTop: {
      handler (val) {
        if (val.length == 0 || !this.innerVisible || this.isBetBool || !this.is_liveMsgTop) return;
        // let currentRef = this.$refs.liveMsgTop;
        let currentRefWrap = this.$refs.liveMsgTopWrap;
        currentRefWrap.scrollTop = currentRefWrap.scrollHeight - 20;
        // let { offsetHeight } = currentRef;
        // if (offsetHeight > currentRefWrap.offsetHeight) { currentRefWrap.scrollTop = currentRefWrap.scrollHeight; }
      },
      deep: true,
    },
    liveMsgBottom: {
      handler (val) {
        if (val.length == 0 || !this.innerVisible || this.isBetBool || !this.is_liveMsgBottom) return;
        // let currentRef = this.$refs.liveMsgBottom;
        let currentRefWrap = this.$refs.liveMsgBottomWrap;
        currentRefWrap.scrollTop = currentRefWrap.scrollHeight - 20;
        // let { offsetHeight } = currentRef;
        // if (offsetHeight > currentRefWrap.offsetHeight) { currentRefWrap.scrollTop = currentRefWrap.scrollHeight; }
      },
      deep: true,
    },
    liveMsgTopCopy: {
      handler (val) {
        if (val.length == 0 || !this.innerVisible || !this.isBetBool || !this.innerVisible_bet || !this.is_liveMsgTopCopy) return;
        // let currentRef = this.$refs.liveMsgTopCopy;
        let currentRefWrap = this.$refs.liveMsgTopCopyWrap;
        currentRefWrap.scrollTop = currentRefWrap.scrollHeight - 20;
        // let { offsetHeight } = currentRef;
        // if (offsetHeight > currentRefWrap.offsetHeight) { currentRefWrap.scrollTop = currentRefWrap.scrollHeight; }
      },
      deep: true,
    },
    liveMsgBottomCopy: {
      handler (val) {
        if (val.length == 0 || !this.innerVisible || !this.isBetBool || !this.innerVisible_bet || !this.is_liveMsgBottomCopy) return;
        // let currentRef = this.$refs.liveMsgBottomCopy;
        let currentRefWrap = this.$refs.liveMsgBottomCopyWrap;
        currentRefWrap.scrollTop = currentRefWrap.scrollHeight - 20;
        // let { offsetHeight } = currentRef;
        // if (offsetHeight > currentRefWrap.offsetHeight) { currentRefWrap.scrollTop = currentRefWrap.scrollHeight; }
      },
      deep: true,
    },
    innerVisible (val) { this.lotteryBarrage_show = val; },
    isBetBool (val) {
      if (!val) { this.currentGameComponent = ''; }
    },
    // checkNumber (val) {
    //   if (val < 0) {
    //     this.checkNumber = 15;
    //     Toast('rebootWS')
    //     // this.$emit('rebootWS');
    //   }
    // },
  },
  created () {
    // console.log(JSON.parse(JSON.stringify(this.ANCHOR)));
    // console.log(JSON.parse(JSON.stringify(this.getters_getEnterRoom)));
    // let { data } = this.getters_getTaskList;
    // this.boxData = data;
    // this.boxSetData = this.translateData(data);
    // this.currentContentResult();
    // 用户停留时间
    this.stayTime_start = new Date();
    // 检测
    // this.setInterval_check = setInterval(() => {
    //   this.checkNumber--;
    // }, 1000)
    // 一分钟以后显示首充超值大礼包;
    this.delayFn(() => { if (this.masterSwitch && this.getters_getBaseInfo.isZeroCharge) { this.firstRecharge = true; } }, 60000);
  },
  beforeMount () { },
  mounted () {
    let lottery_type = this.getters_getEnterRoom.roomLotteryInfo.lotteryType || '';
    this.mutations_rootStore({ key: 'MOREGAMETYPE', val: lottery_type });

    this.broadcastingListen();
    // 检查付费
    this.checkPayRoom();
    // 是否有红包
    this.isRedbagFn();
    // 大转盘高度计算公式;
    let rootFz = Number((getComputedStyle(window.document.documentElement)['font-size'].replace('px', '')))
    this.turnTableVar = 226 * (rootFz / 37.5);
    // 主播签名展示隐藏
    let { title } = this.ANCHOR;
    if (title) { this.anchorSignShowBool = true }
    this.delayFn(() => {
      if (this.anchorSignShowBool) { this.anchorSignShowBool = false; }
    }, 6000)

    this.delayFn(() => {
      this.vDataSetInterval = setInterval(() => {
        if (this.footerArray.length != 0) {
          this.vData = this.footerArray[0];
        }
      }, 3000)
    }, 3000)
  },
  methods: {
    ...mapActions(['actions_getTaskReward', 'actions_getTaskList', 'actions_getEnterGame', 'actions_getSendRed', 'actions_getSendBarrage', 'actions_getRedRobList', 'actions_getRobRed', 'actions_getRedList', 'actions_getBuyGuard', 'actions_getGuardCommodityList', 'actions_getCheckLive', 'actions_getRoomCharge', 'actions_getTimeCharge', 'actions_getBalanceNew', 'actions_getLotteryList', 'actions_getBetting', 'actions_getBetViewInfo', 'actions_getSetAttent', 'actions_getSendGift', 'actions_getLuckydrawRecord', 'actions_getDoLuckydraw', 'actions_getLuckydraw', 'actions_getLiveContact', 'actions_getUserHome', 'actions_getSetReport', 'actions_getGuardList', 'actions_getDayGiftRank', 'actions_getEnterRoom', 'actions_getGiftList']),
    ...mapMutations(['mutations_rootStore', 'mutations_SET_REQUEST', 'mutations_publicTime', 'mutations_experienceRoom']),
    vDataEmpty () { this.vData = '', this.footerArray.splice(0, 1); },
    getRedBagDetail (val) {
      let { stream } = this.ANCHOR;
      let { id } = val;
      let params = {
        stream,
        redid: id,
        sign: md5(`redid=${id}&stream=${stream}&${this.SALT}`)
      }
      this.actions_getRedRobList(params).then(res => {
        if (res.code == 0) { this.showPopupRedBagDetail = true; }
      })
    },
    getRobRedFn (val) {
      let { stream } = this.ANCHOR;
      let { id } = val;
      let params = {
        stream,
        redid: id,
        sign: md5(`redid=${id}&stream=${stream}&uid=${this.UID}&${this.SALT}`)
      }
      this.actions_getRobRed(params).then(res => {
        if (res.code == 0) {
          Toast(res.msg);
        } else {
          Toast(res.msg);
        }
      })
    },
    getRobRedOrDetailFn (v) { if (v.status == 0) { this.getRedBagDetail(v) } else { this.getRobRedFn(v) } },
    isRedbagFn () {
      let { stream } = this.ANCHOR;
      let params = {
        stream,
        sign: md5(`stream=${stream}&${this.SALT}`)
      }
      this.actions_getRedList(params).then(res => {
        if (res.code == 0 && res.info.length != 0) { this.liveRoomRedbagBool = true }
      })
    },
    TIMECOUNT_fn (timeData) {
      // console.log(timeData)
      this.deliveryTime = timeData.seconds;
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.mutations_publicTime('');
      } else {
        this.mutations_publicTime(timeData.seconds);
      }
    },
    // 计时模式
    timekeeping_mode () {
      this.timekeeping_mode_setInterval = setInterval(() => {
        let { stream, uid } = this.ANCHOR;
        let params = { liveuid: uid, stream, };
        this.actions_getTimeCharge(params).then(res => {
          // console.log(res)
          if (res.code == 0) {
            this.actions_getBalanceNew();
          } else if (res.code == 1008) {
            Toast(res.msg);
            this.delayFn(() => {
              // this.paidVideoTip = false;
              this.toRouter('recharge');
            }, 2000)
          }
        })
      }, 60000);
    },
    // 清除计时模式
    clear_timekeeping_mode () {
      clearInterval(this.timekeeping_mode_setInterval);
    },
    paidVideoTip_fn () {
      this.paidVideoTip = false;
      // this.toRouter('live');
      if (!this.ANCHOR_PREV || (this.ANCHOR_KEY - this.ANCHOR_PREV) >= 0) {
        this.$emit('onChange', this.ANCHOR_KEY + 1, true);
      } else {
        this.$emit('onChange', this.ANCHOR_KEY - 1, true);
      }
    },
    pay_fn () {
      let { stream, uid } = this.ANCHOR;
      let params = { liveuid: uid, stream, };
      this.actions_getRoomCharge(params).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          // 购买成功
          this.paidVideoTip = false;
          // 更新余额
          this.actions_getBalanceNew();
          // console.log(this.currentRoom_type);
          if (this.currentRoom_type == 3) { this.timekeeping_mode() }
        } else if (res.code == 1008) {
          Toast(res.msg);
          this.delayFn(() => {
            this.paidVideoTip = false;
            this.toRouter('recharge');
          }, 500)
        } else {
          Toast(res.msg);
        }
      })
    },
    checkPayRoom () {
      if (this.isCheckPayRoom) return
      let { stream, uid } = this.ANCHOR;
      let params = { liveuid: uid, stream, };
      this.actions_getCheckLive(params).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.currentRoom_type = res.info[0].type;
          if (res.info[0].type == 2 || res.info[0].type == 3) {
            // console.log(uid)
            if (this.getters_experienceRoom.includes(uid)) {
              this.paidVideoTip = true;
              this.paidVideoTip_msg = res.info[0].type_msg;
            } else {
              this.mutations_experienceRoom(uid);
              this.delayFn(() => {
                this.paidVideoTip = true;
                this.paidVideoTip_msg = res.info[0].type_msg;
              }, 10000)
            }
          }
        } else if (res.code == 1005) {
          // 用户直播已结束;
          Toast(res.msg);
          this.delayFn(() => {
            this.toRouter('live')
          }, 2000)
        } else {
          Toast(res.msg);
        }
      })
    },
    isBetBool_fn () {
      // console.log(this.ANCHOR)
      let { lottery_type, lottery_name } = this.ANCHOR;
      let logo = this.getters_getEnterRoom.roomLotteryInfo.logo || '';
      let live_id = this.ANCHOR.uid;
      // 针对关注列表字段缺失
      if (!lottery_type) {
        lottery_type = this.getters_getEnterRoom.roomLotteryInfo.lotteryType;
        let val = this.ANCHOR;
        val.lottery_type = lottery_type;
        this.mutations_rootStore({ key: 'ANCHOR', val });
      }
      let params = { lottery_type, live_id, };
      this.actions_getBetViewInfo(params).then(res => {
        if (res.code == 0) {
          this.mutations_rootStore({ key: 'MOREGAME', val: true });
          this.mutations_rootStore({ key: 'MOREGAMETYPE', val: lottery_type });
          this.mutations_rootStore({ key: 'MOREGAMENAME', val: lottery_name });
          this.mutations_rootStore({ key: 'MOREGAMELOGO', val: logo });
          this.currentGameComponent = `lottery${lottery_type}`;
          this.isBetBool = true;
          // 优化展示效果
          if (this.offsetWidth && this.offsetHeight) {
            let offsetWidth = this.offsetWidth, offsetHeight = this.offsetHeight;
            this.$emit('changeVideoView', { offsetWidth, offsetHeight })
          } else {
            this.delayFn(() => {
              let { offsetWidth, offsetHeight } = this.$refs.zoomOutArea;
              offsetHeight += 30; // 布局相关自增30像素
              this.offsetWidth = offsetWidth; this.offsetHeight = offsetHeight;
              this.$emit('changeVideoView', { offsetWidth, offsetHeight })
            }, 200)
          }
        }
      })
    },
    isBetBool_fn_more (v) {
      // console.log(v)
      let lottery_type = v.lotteryType;
      let lottery_name = v.name;
      let logo = v.logo;
      let live_id = this.ANCHOR.uid;

      let params = { lottery_type, live_id };
      this.actions_getBetViewInfo(params).then(res => {
        if (res.code == 0) {
          this.mutations_rootStore({ key: 'MOREGAME', val: true });
          this.mutations_rootStore({ key: 'MOREGAMETYPE', val: lottery_type });
          this.mutations_rootStore({ key: 'MOREGAMENAME', val: lottery_name });
          this.mutations_rootStore({ key: 'MOREGAMELOGO', val: logo });
          this.currentGameComponent = `lottery${lottery_type}`;
          this.isBetBool = true;

          // 优化展示效果
          if (this.offsetWidth && this.offsetHeight) {
            let offsetWidth = this.offsetWidth, offsetHeight = this.offsetHeight;
            this.$emit('changeVideoView', { offsetWidth, offsetHeight })
          } else {
            this.delayFn(() => {
              let { offsetWidth, offsetHeight } = this.$refs.zoomOutArea;
              offsetHeight += 30; // 布局相关自增30像素
              this.offsetWidth = offsetWidth; this.offsetHeight = offsetHeight;
              this.$emit('changeVideoView', { offsetWidth, offsetHeight })
            }, 200)
          }
        } else {
          Toast(res.msg);
        }
      })
    },
    game_showShare_fn () {
      if (this.isBetBool) {
        this.closeButtonFn();
        this.delayFn(() => {
          this.actions_getLotteryList().then(res => {
            if (res.code == 0) { this.game_showShare = true; }
          })
        }, 400)
      } else {
        this.actions_getLotteryList().then(res => {
          if (res.code == 0) { this.game_showShare = true; }
        })
      }
    },
    submitMsg_send () {
      // 内容为空提示信息
      if (!this.sendMsg_info) {
        Toast(this.langSwitch('请输入聊天内容'))
        return
      }
      if (this.onTrumpet) {
        // 收费弹幕
        let { stream, uid } = this.ANCHOR;
        let content = this.sendMsg_info;
        let params = {
          liveuid: uid,
          stream,
          content,
          giftid: '1',
          giftcount: '1',
        }
        // console.log(this.self_info)
        this.actions_getSendBarrage(params).then((res) => {
          if (res.code == 0) {
            let { barragetoken } = res.info[0];
            this.sendBarrageMessage(barragetoken);
          } else {
            Toast(res.msg);
          }
        })
      } else {
        // 普通消息
        this.sendChatMessage();
      }
    },
    submitMsg (msg) {
      this.sendMsg_info = msg;
      // onTrumpet 默认false
      if (this.onTrumpet) {
        // 收费弹幕
        let { stream, uid } = this.ANCHOR;
        let content = this.sendMsg_info;
        let params = {
          liveuid: uid,
          stream,
          content,
          giftid: '1',
          giftcount: '1',
        }
        // console.log(this.self_info)
        this.actions_getSendBarrage(params).then((res) => {
          if (res.code == 0) {
            let { barragetoken } = res.info[0];
            this.sendBarrageMessage(barragetoken);
          } else {
            Toast(res.msg);
          }
        })
      } else {
        // 普通消息
        this.sendChatMessage();
      }
    },
    sendGift () {
      if (!this.gift_current) {
        Toast(this.langSwitch('请选择礼物'))
        return;
      }
      let { stream, uid } = this.ANCHOR;
      let giftid = this.gift_current['id'];
      let giftcount = this.showPopover_giftCount;
      let params = { liveuid: uid, stream, giftid, giftcount };

      this.actions_getSendGift(params).then(res => {
        if (res.code == 0) {
          this.sendGiftMessage();
        } else {
          Toast(res.msg)
        }
      })
    },
    selectGift (k, key) {
      this.gift_select_key = `${k}'giftItem'${key}`;
      this.gift_current = this.gift_showShare_obj.giftlist[(k * 8) + Number(key)];
      // 选择礼物后数量重置为1;
      this.showPopover_giftCount = 1;
      // console.log(this.gift_current)
    },
    // 中奖记录
    getLuckydrawRecord (key, bool = false) {
      let stringArr = ['djjl', 'wdjl'];
      if (this.bigTurntable_draw_active == stringArr[key] && !bool) return; // 性能优化
      this.bigTurntable_draw_active = stringArr[key];
      let params = { record_type: key }
      this.actions_getLuckydrawRecord(params).then(res => {
        if (res && res.code == 0) {
          this.bigTurntable_draw_obj = res && res.info[0].record;
          if (this.bigTurntable_draw_show == false) { this.bigTurntable_draw_show = true; }
        }
      })
      // this.actions_getDoLuckydraw().then(res => {
      //   this.bigTurntable_draw_obj['wdjl'] = (res && res.info[0].record) || [];
      //   // this.bigTurntable_draw_show = true;
      // })
    },
    // 获取抽奖结果函数
    async getPrizeFunc () {
      return new Promise((resolve, reject) => {
        this.actions_getDoLuckydraw().then(res => {
          if (res.code == 0) {
            let data = res.info[0];
            this.bigTurntable_data.left_times = data.left_times;
            this.bigTurntable_data.luckydraw_money_pool = data.luckydraw_money_pool;
            let found = this.bigTurntable_data.reward.findIndex(el => el.id == data.reward.id);
            resolve(found);
            this.delayFn(() => {
              Toast(this.bigTurntable_data.reward[found]['item_name']); // 提示中奖相关 
            }, 3000)
          } else {
            resolve(-1)
          }
        }).catch(e => { resolve(-1) })
      })
    },
    getPrizeFunc_btn () {
      if (this.bigTurntable_data.left_times <= 0) { Toast(this.langSwitch('您的抽奖次数不足')) }
    },
    // 获取转盘信息
    bigTurntable () {
      this.actions_getLuckydraw().then(res => {
        if (res.code == 0) {
          this.bigTurntable_show = true;
          this.bigTurntable_data = res && res.info[0];
        }
      })
    },
    translateData (data) {
      let s = new Set();
      data.map((v, k) => {
        s.add(v.group)
      })
      return Array.from(s);
    },
    currentContentResult () {
      let data = this.boxData, group = this.boxSetData[this.isTaskActive];
      this.currentContent = [];
      data.map((v, k) => {
        if (v.group == group) this.currentContent.push(v);
      });
    },
    getGiftList () {
      // this.gift_select_key = ''
      // this.gift_current = '';
      if (!!this.gift_showShare_obj) this.gift_showShare = true;
      this.actions_getGiftList().then(res => {
        if (res.code == 0) {
          this.gift_showShare_obj = res && res.info[0];
          this.gift_showShare = true;
        }
      })
    },
    now_rank_show_fn () {
      this.now_rank_index = null;  // 初始化这个值
      this.actions_getDayGiftRank().then(res => {
        this.now_rank_data = res && res.info[0].data;
        this.now_rank_data.forEach((element, index) => {
          if (element.uid == this.ANCHOR.uid) { this.now_rank_index = index }
        });
        this.now_rank_show = true;
      })
    },
    checkGuardList () {
      let liveuid = this.ANCHOR.uid;
      this.actions_getGuardList({ liveuid }).then(res => {
        this.guard_show_list = res.info
        this.guard_show = true;
      })
    },
    giftDetailsFn () {
      let HOST = this.HOST;
      let liveuid = this.ANCHOR.uid;
      let obj = { en: 'en', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-cht', ja: 'jp', vi: 'vn', id: 'id' }
      let uri = `${HOST}/index.php?g=Appapi&m=contribute&a=index&uid=${liveuid}&l=${obj[this.LANG]}`;
      this.giftDetailsURI = uri;
      // console.log(uri)
      this.isGiftDetails = true;
    },
    closeGiftDetails () {
      this.giftDetailsURI = '';
      this.isGiftDetails = false;
    },
    liveroom_user (v) {
      let touid = v.id || v.uid;
      this.actions_getUserHome({ touid }).then(res => {
        let data = res.info[0];
        this.current_user = data;
        this.other_user_show = true;
      })
    },
    // 举报事件
    reportFn () {
      this.report_user_show = true;
      this.other_user_show = false;
    },
    submit_report_user () {
      if (!this.report_content) {
        Toast(this.langSwitch('请输入举报内容'));
        return
      }
      let touid = this.current_user.id || this.current_user.uid;
      let content = this.report_content;
      this.actions_getSetReport({ touid, content }).then(res => {
        let msg = res && res.info[0].msg;
        Toast(msg);
        this.report_user_show = false;
      })
    },
    closeButtonFn () {
      if (this.isBetBool) {
        let lottery_type = this.getters_getEnterRoom.roomLotteryInfo.lotteryType || '';
        let lottery_name = this.ANCHOR.lottery_name || '';
        let logo = this.getters_getEnterRoom.roomLotteryInfo.logo || '';
        this.mutations_rootStore({ key: 'MOREGAME', val: false });
        this.mutations_rootStore({ key: 'MOREGAMETYPE', val: lottery_type });
        this.mutations_rootStore({ key: 'MOREGAMENAME', val: lottery_name });
        this.mutations_rootStore({ key: 'MOREGAMELOGO', val: logo });
        this.currentGameComponent = '';
        this.innerVisible_bet = true;
        this.isBetBool = false;
        this.$bus.$emit('shareTime');  // 通知时间事件;
        // this.delayFn(() => { this.room_lottery.time = this.getters_componentTime }, 200);
        this.$emit('resetVideoView');
      } else {
        let now_time = new Date();
        let time = now_time - this.stayTime_start;
        if (time <= 30000) {
          this.toBack();
        } else {
          if (this.getters_getEnterRoom.isattention != 0) { this.toBack(); } else { this.show_attention_tip = true }
        }
      }
    },
    leftSlide () {
      if (!this.isBetBool) {
        if (this.innerVisible) return;
        this.innerVisible = true;
      } else {
        this.innerVisible_bet = true;
      }
    },
    upSlide () {
      if (this.innerVisible) return;
      this.$bus.$emit('itemsTouchEmit', 'next');
    },
    downSlide () {
      if (this.innerVisible) return;
      this.$bus.$emit('itemsTouchEmit', 'prev');
    },
    upSlide_inner () {
      if (this.isBetBool) return;
      this.$bus.$emit('itemsTouchEmit', 'next');
    },
    downSlide_inner () {
      if (this.isBetBool) return;
      this.$bus.$emit('itemsTouchEmit', 'prev');
    },
    rightSlide () {
      // if (this.isBetBool) return;
      this.k3OpenDataEmpty();
      if (!this.isBetBool) {
        this.innerVisible = false;
      } else {
        this.innerVisible_bet = false;
      }
    },
    k3OpenDataEmpty () { this.k3OpenData = '' },
    // system_msg
    broadcastingListen () {
      const StreamMsg = protoRoot.lookup('common.StreamMsg');
      let event = this.WSEVENT['SOCKET_BROADCAST'];
      this.mSocket.on(event, (rawResponse) => {
        let StreamMsg_buf = protobuf.util.newBuffer(rawResponse);
        let { msgID, msgData } = StreamMsg.decode(StreamMsg_buf);
        let msg_buf = protobuf.util.newBuffer(msgData);
        let msg_id = protoRoot.lookup(`s2c.${this.MSGID[msgID]}`);
        let result = msg_id.decode(msg_buf);
        // console.log(msgID);
        // console.log(result);
        // this.checkNumber = 15; // 有消息返回时重置相关
        // msgID 说明
        // 0 系统公告消息
        // 1 用户进入直播间
        // 8 用户下注信息
        // 9 彩票开奖信息
        // 12 其他用户中奖信息
        // 13 彩种信息,需进行匹配
        // 15 彩票弹幕
        // 16 中奖
        // 17 直播间礼物
        // 33 中奖信息

        // 处理聊天室
        let currentLotteryType = this.getters_getEnterRoom.roomLotteryInfo.lotteryType;  // 当前彩种
        // 彩种对应
        if (msgID == 13 && result.msg.lotteryType == currentLotteryType) {
          // console.log(result)
          this.room_lottery_isTime = true;
          this.room_lottery = result.msg.lotteryInfo;
          this.TIMECOUNT = result.msg.lotteryInfo.time;

          // 同步信息这里监听一下公共时间
          if (!this.getters_publicTime) { this.mutations_publicTime(this.TIMECOUNT) }
        }
        // 存储当前用户信息,用于发言与发送礼物
        if (msgID == 1 && result.msg.ct.id == this.UID) { this.self_info = result.msg.ct; };
        // 彩票开奖信息
        if (msgID == 9 && result.msg.lotteryType == currentLotteryType) {
          // console.log(result);
          this.publicTimeshow = false;
          if (currentLotteryType == 26) { this.k3OpenData = result }
          this.TIMECOUNT = 58;
          // this.room_lottery.time = 59;
          this.room_lottery_isTime = true;

          setTimeout(() => {
            this.publicTimeshow = true;
          }, 1000)
          // 当且仅当confimBet 为 true 时显示
          if (!!this.comfirmBet) { Toast(`${langSwitch('第')} ${result.msg.issue + 1} ${langSwitch('期')}`) }
        }
        // 消息列表
        if (msgID == 1) {
          // console.log(result);
          if (result.msg.ct.carId != 0) { this.svgaBoxArray.push(result); } // 进入直播间特效
          if (result.msg.msgtype == 0) {
            // 判定显示等级相关
            if (result.msg.ct.level >= this.getters_getBaseInfo.show_level) {
              this.liveMsgTop.push({ msgID, msgData: result })
            } else {
              this.footerArray.push({ msgID, msgData: result })
            }
            // vip && 会员 && kingIcon 进入直播间特效
            // console.log(result)
            if (result.msg.ct.vipType == 1 || result.msg.ct.guardType == 1 || result.msg.ct.guardType == 2 || !!result.msg.ct.kingIcon) {
              // console.log(result);
              this.guardTypeArray.push(result);
            }

          } else if (result.msg.msgtype == 2) {
            if (result.msg.ct && result.msg.ct.heart) {
              this.liveMsgTop.push({ msgID, msgData: result })
            } else {
              this.liveMsgBottom.push({ msgID, msgData: result })
            }
          } else {
            // console.log(result);
          }
        }
        // 系统公告消息
        if (msgID == 0) { this.liveMsgTop.unshift({ msgID, msgData: result }); }
        // 系统 用户下注信息
        if (msgID == 8 && result.msg.lotteryType == currentLotteryType) { this.liveMsgTop.push({ msgID, msgData: result }) }
        // 中奖信息
        if (msgID == 33) { this.liveMsgTop.push({ msgID, msgData: result }) }
        // 礼物
        if (msgID == 17) {
          this.svgaBoxArray.push(result);
          this.liveMsgBottom.push({ msgID, msgData: result });
        }
        // 其他用户中奖
        if (msgID == 12) { this.liveMsgTop.push({ msgID, msgData: result }) }
        if (msgID == 2) { }
        // 彩票弹幕
        if (msgID == 15) { this.barrage_list = this.barrage_list.concat(result.msg.barrageArr); }
        // 中奖
        if (msgID == 16) {
          // console.log(result);

          let time = 1000;
          let timeObj = {
            '26': 3000,
            '28': 5400,
            '29': 1000,
            '30': 4000,
            '31': 1000,
          }
          if (timeObj[this.MOREGAMETYPE]) { time = timeObj[this.MOREGAMETYPE] }

          this.delayFn(() => {
            this.openAwardAmount = result.msg.awardMoney;
            this.openAwardTime = 5;
            this.openAwardBoolean = true;
            this.actions_getBalanceNew();
          }, time)
        }

        //  更多游戏相关内容
        if (msgID == 9 && result.msg.lotteryType == this.MOREGAMETYPE && this.MOREGAME) {
          // console.log(result);
          this.MOREGAMEDATA_OPEN = result;
        }
        if (msgID == 8 && result.msg.lotteryType == this.MOREGAMETYPE && this.MOREGAME) {
          // console.log(result);
          this.MOREGAMEDATA_USER = result;
        }

      })
    },
    updata_barrage_list (val) {
      this.barrage_list = val;
    },
    updata_svgaBoxArray (val) {
      this.svgaBoxArray = val;
    },
    updata_guardTypeArray (val) {
      this.guardTypeArray = val;
    },
    toAttention () {
      let params = { touid: this.ANCHOR.uid }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          this.getters_getEnterRoom.isattention = res.info[0].isattent;
        } else {
          Toast(res.msg);
        }
      })
    },
    toAttention_popup (v) {
      let params = { touid: v.id }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          v.isattention = res.info[0].isattent;
          if (v.id == this.ANCHOR.uid) { this.getters_getEnterRoom.isattention = res.info[0].isattent; }
        } else {
          Toast(res.msg);
        }
      })
    },
    toAttention_exit () {
      let params = { touid: this.ANCHOR.uid }
      this.actions_getSetAttent(params).then(res => { if (res.code == 0) { this.toBack(); } })
    },
    // 下注相关
    betAssistant (params, callback = () => { }) {
      console.log(params)
      this.actions_getBetting(params).then((res) => {
        if (res.code == 0) {
          this.actions_getBalanceNew();
          callback();
        } else {
          Toast(res.msg);
        }
      })
    },
    getTaskListFun () {
      this.actions_getTaskList().then(res => {
        if (res.code == 0) {
          let { data } = res.info[0];
          this.boxData = data;
          this.boxSetData = this.translateData(data);
          this.isTaskActive = 0;
          this.currentContentResult();
          this.isBoxPopup = true;
        } else { Toast(res.msg) }
      })
    },
    goToDoing (v) {
      if (v.completed == 1) {
        //
      } else {
        if (v.condition_info[0].cur_num >= v.condition_info[0].condition_num) {
          let params = { taskID: v.id }
          this.actions_getTaskReward(params).then(res => {
            if (res.code == 0) { Toast('ok') } else { Toast(res.msg) }
          })
        } else {
          let { name } = this.$route;
          let condition_type = v.condition_info[0].condition_type;
          if (condition_type == 4) {
            if (name == 'recharge') { this.isBoxPopup = false; return; }
            this.toRouter('recharge');
          } else {
            if (name == 'game') { this.isBoxPopup = false; return; }
            this.toRouter('game');
          }
        }
      }
    },
    zbmp_tip () {
      if (this.getters_getLiveContact.consumption * 1 >= this.getters_getLiveContact.contact_cost * 1) {
        let clipboard = new Clipboard('.copy');
        clipboard.on('success', e => { Toast(this.langSwitch('复制成功')); clipboard.destroy() })
        clipboard.on('error', e => { Toast(this.langSwitch('复制失败')); clipboard.destroy() })
      } else {
        Toast(this.langSwitch('您的消费还未达标'));
      }
    },
    showPopover_fn (v) {
      this.showPopover_giftCount = v.text;
      this.showPopover = false;
    },
    liveMsgTopUpSlide () {
      this.is_liveMsgBottom = false;
      this.is_liveMsgBottom_count = 4;
      if (this.is_liveMsgBottom_timer) return;
      // 计时器
      this.is_liveMsgBottom_timer = setInterval(() => {
        this.is_liveMsgBottom_count--;
        if (this.is_liveMsgBottom_count <= 0) {
          this.is_liveMsgBottom = true;
          clearInterval(this.is_liveMsgBottom_timer);
          this.is_liveMsgBottom_timer = null;
        }
      }, 1000)
    },
    liveMsgTopDownSlide () {
      this.is_liveMsgBottom = false;
      this.is_liveMsgBottom_count = 4;
      if (this.is_liveMsgBottom_timer) return;
      // 计时器
      this.is_liveMsgBottom_timer = setInterval(() => {
        this.is_liveMsgBottom_count--;
        if (this.is_liveMsgBottom_count <= 0) {
          this.is_liveMsgBottom = true;
          clearInterval(this.is_liveMsgBottom_timer);
          this.is_liveMsgBottom_timer = null;
        }
      }, 1000)
    },
    liveMsgTopCopyUpSlide () {
      this.is_liveMsgBottomCopy = false;
      this.is_liveMsgBottomCopy_count = 4;
      if (this.is_liveMsgBottomCopy_timer) return;
      // 计时器
      this.is_liveMsgBottomCopy_timer = setInterval(() => {
        this.is_liveMsgBottomCopy_count--;
        if (this.is_liveMsgBottomCopy_count <= 0) {
          this.is_liveMsgBottomCopy = true;
          clearInterval(this.is_liveMsgBottomCopy_timer);
          this.is_liveMsgBottomCopy_timer = null;
        }
      }, 1000)
    },
    liveMsgTopCopyDownSlide () {
      this.is_liveMsgBottomCopy = false;
      this.is_liveMsgBottomCopy_count = 4;
      if (this.is_liveMsgBottomCopy_timer) return;
      // 计时器
      this.is_liveMsgBottomCopy_timer = setInterval(() => {
        this.is_liveMsgBottomCopy_count--;
        if (this.is_liveMsgBottomCopy_count <= 0) {
          this.is_liveMsgBottomCopy = true;
          clearInterval(this.is_liveMsgBottomCopy_timer);
          this.is_liveMsgBottomCopy_timer = null;
        }
      }, 1000)
    },
    liveMsgBottomUpSlide () {
      this.is_liveMsgTop = false;
      this.is_liveMsgTop_count = 4;
      if (this.is_liveMsgTop_timer) return;
      // 计时器
      this.is_liveMsgTop_timer = setInterval(() => {
        this.is_liveMsgTop_count--;
        if (this.is_liveMsgTop_count <= 0) {
          this.is_liveMsgTop = true;
          clearInterval(this.is_liveMsgTop_timer);
          this.is_liveMsgTop_timer = null;
        }
      }, 1000)
    },
    liveMsgBottomDownSlide () {
      this.is_liveMsgTop = false;
      this.is_liveMsgTop_count = 4;
      if (this.is_liveMsgTop_timer) return;
      // 计时器
      this.is_liveMsgTop_timer = setInterval(() => {
        this.is_liveMsgTop_count--;
        if (this.is_liveMsgTop_count <= 0) {
          this.is_liveMsgTop = true;
          clearInterval(this.is_liveMsgTop_timer);
          this.is_liveMsgTop_timer = null;
        }
      }, 1000)
    },
    liveMsgBottomCopyUpSlide () {
      this.is_liveMsgTopCopy = false;
      this.is_liveMsgTopCopy_count = 4;
      if (this.is_liveMsgTopCopy_timer) return;
      // 计时器
      this.is_liveMsgTopCopy_timer = setInterval(() => {
        this.is_liveMsgTopCopy_count--;
        if (this.is_liveMsgTopCopy_count <= 0) {
          this.is_liveMsgTopCopy = true;
          clearInterval(this.is_liveMsgTopCopy_timer);
          this.is_liveMsgTopCopy_timer = null;
        }
      }, 1000)
    },
    liveMsgBottomCopyDownSlide () {
      this.is_liveMsgTopCopy = false;
      this.is_liveMsgTopCopy_count = 4;
      if (this.is_liveMsgTopCopy_timer) return;
      // 计时器
      this.is_liveMsgTopCopy_timer = setInterval(() => {
        this.is_liveMsgTopCopy_count--;
        if (this.is_liveMsgTopCopy_count <= 0) {
          this.is_liveMsgTopCopy = true;
          clearInterval(this.is_liveMsgTopCopy_timer);
          this.is_liveMsgTopCopy_timer = null;
        }
      }, 1000)
    },
    guardListPopupFn () {
      this.actions_getGuardCommodityList().then((res) => {
        if (res.code == 0) {
          this.guard_show = false;
          this.getGuardCommodityListBool = true;
          this.getGuardCommodityListArr = res.info[0]
        }
      })
    },
    getGuardCommodityListIndexChangeFn (k) { this.getGuardCommodityListIndex = k; },
    getGuardCommodityListArrListChange (val) {
      let name = ''
      switch (this.LANG) {
        case 'zh-CN':
          name = val['name'];
        case 'zh-TW':
          name = val['name_zh - cht'];
        case 'en':
          name = val['name_en'];
        case 'id':
          name = val['name_id'];
        case 'vi':
          name = val['name_vn'];
        case 'ja':
          name = val['name_jp'];
        default:
          name = val['name'];
      }
      return name;
    },
    buyGuardFn () {
      let coin = this.getGuardCommodityListArr.list[this.getGuardCommodityListIndex].coin;
      let stringArr = [this.langSwitch('7天守护'), this.langSwitch('月守护'), this.langSwitch('年守护')];

      Dialog.confirm({
        title: this.langSwitch('提示'),
        message: `${this.langSwitch('你将花费')}${coin}${this.langSwitch('钻石')},${this.langSwitch('为主播开通')}${stringArr[this.getGuardCommodityListIndex]}`,
      }).then(() => {
        let { stream, uid } = this.ANCHOR;
        let guardid = this.getGuardCommodityListArr.list[this.getGuardCommodityListIndex].id;
        this.actions_getBuyGuard({ stream, liveuid: uid, guardid }).then(res => {
          if (res == 0) { this.getGuardCommodityListBool = false; Toast(res.msg) } else { Toast(res.msg) };
        })
      }).catch(() => {
        // on cancel
      });
    },
    zbmp_show_fn () {
      let { uid } = this.ANCHOR;
      this.actions_getLiveContact({ liveuid: uid }).then(res => {
        // console.log(res)
        if (res.code == 0) { this.zbmp_show = true; }
      })
    },
    sendBarrageMessage (barragetoken) {
      let SEND = this.WSEVENT['SOCKET_SEND'];
      let _method_ = this.WSEVENT['SOCKET_SEND_BARRAGE'];
      let { id, userNicename, level, isAnchor, usertype, heart, liangname, vipType, kingIcon, guardType, avatarThumb, avatar } = this.self_info;
      let ct = barragetoken;
      let params = {
        _method_,
        action: '7',
        msgtype: '1',
        level,
        uname: userNicename,
        uid: id,
        uhead: avatarThumb,
        ct,
      }
      let p = {
        'retcode': '000000',
        'retmsg': 'ok',
        'msg': [params],
      }
      this.mSocket.emit(SEND, p);
      this.sendMsg_info = '';
    },
    sendChatMessage () {
      let SEND = this.WSEVENT['SOCKET_SEND'];
      let _method_ = this.WSEVENT['SOCKET_SEND_MSG'];
      let { id, userNicename, level, isAnchor, usertype, heart, liangname, vipType, kingIcon, guardType } = this.self_info;
      let ct = this.sendMsg_info;
      let params = {
        _method_,
        action: '0',
        msgtype: '2',
        usertype,
        isAnchor,
        level,
        uname: userNicename,
        uid: id,
        liangname,
        vip_type: vipType,
        guard_type: guardType,
        ct,
      }
      let p = {
        'retcode': '000000',
        'retmsg': 'ok',
        'msg': [params],
      }
      this.mSocket.emit(SEND, p);
      this.sendMsg_info = '';
      this.chatCommonArea = false;
    },
    sendGiftMessage () {
      let SEND = this.WSEVENT['SOCKET_SEND'];
      let _method_ = this.WSEVENT['SOCKET_SEND_GIFT'];
      let { id, userNicename, level, isAnchor, usertype, heart, liangname, vipType, kingIcon, guardType, avatar } = this.self_info;
      let evensend = this.gift_current.type;
      let ct = this.gift_current.id;
      let roomnum = this.ANCHOR.uid;
      let params = {
        _method_,
        action: '0',
        msgtype: '1',
        level,
        uname: userNicename,
        uid: id,
        uhead: avatar,
        evensend,
        liangname,
        vip_type: vipType,
        ct,
        roomnum,
      }
      let p = {
        'retcode': '000000',
        'retmsg': 'ok',
        'msg': [params],
      }
      // console.log(p);
      this.mSocket.emit(SEND, p);
      this.gift_showShare = false;
      Toast(this.langSwitch('赠送礼物成功'));
    },
    sendRedPack () {
      // type  redBag_radio
      // nums 1 redBag_count  , 2, redBag_count_average
      // des redBag_text
      // coin redBag_radio == 1?  redBag_total :  reaBag_oneCoin * redBag_count_average;
      // type_grant redBag_checked
      let { stream } = this.ANCHOR;
      let type = this.redBag_radio == '1' ? 1 : 0;
      let nums = this.redBag_radio == '1' ? this.redBag_count : this.redBag_count_average;
      let des = this.redBag_text || this.langSwitch('恭喜发财，大吉大利');
      let coin = this.redBag_radio == 1 ? this.redBag_total : this.reaBag_oneCoin * this.redBag_count_average;
      let type_grant = this.redBag_checked ? 1 : 0;
      let params = { stream, type, nums, des, coin, type_grant };
      // request;
      this.actions_getSendRed(params).then((res) => {
        if (res.code == 0) {
          this.redBag_showShare = false; // 关闭红包发送弹框;
          Toast(res.msg);
        } else {
          Toast(res.msg);
        }
      })
    },
    openAwardTime_fn (timeData) {
      if (timeData.seconds < 1 || !timeData.seconds) {
        this.openAwardBoolean = false;
      }
    },
    game_showShareToBet (v) {
      this.game_showShare = false;
      console.log(v);
      if (v.lotteryType == 0) {
        this.toRouter('game');
      } else if (v.lotteryType == 40) {
        Toast(this.langSwitch('功能未完善，请下载App'));
      } else {
        this.isBetBool_fn_more(v);
      }
    },
    confirmBetFn (val) {
      // console.log(val);
      this.comfirmBetData = val;  // 赋值数据
      this.confirmBetItemIndex = 0;
      this.actions_getBalanceNew().then((res) => {
        if (res.code == 0) {
          this.comfirmBet = true;   // 打开弹框
        }
      })
    },
    comfirmBetSuccess () {
      if (this.getters_publicTime >= 2 && this.getters_publicTime <= 57) {
        // console.log(this.comfirmBetData);
        let lottery_type = this.comfirmBetData.msgData.msg.lotteryType;
        let money = `[${(JSON.parse(this.comfirmBetData.msgData.msg.money)[0] * this.comfirmBetArray[this.confirmBetItemIndex])}]`;
        let way = this.comfirmBetData.msgData.msg.way;
        let optionName = this.comfirmBetData.msgData.msg.optionName;
        let issue = this.room_lottery.issue;
        let serTime = parseInt(new Date().getTime() / 1000);
        let liveuid = this.ANCHOR.uid;
        // 参数数据
        let params = {
          lottery_type,
          money,
          way,
          serTime,
          issue,
          optionName,
          liveuid,
        }
        // console.log(params);
        this.betAssistant(params, () => { this.comfirmBet = false });
      } else {
        return
      }
    },
    comfirmBetDeleteFn () {
      Toast(this.langSwitch('请至少保留一个'))
    },
    comfirmBetEditAmount () {
      this.comfirmBetEditAmountData = JSON.parse(this.comfirmBetData.msgData.msg.money)[0];
      this.comfirmBetEditAmountBool = true;
    },
    comfirmBetEditAmount_confirm () {
      console.log(this.comfirmBetEditAmountData);
      this.comfirmBetData.msgData.msg.money = JSON.stringify([this.comfirmBetEditAmountData]);
      this.comfirmBetEditAmountBool = false;
    },
    followGameFn (val) {
      let { gameKindID, gamePlat } = val.msgData.msg, autoExchange = this.autoExchange;
      let params = { kindID: gameKindID, subplat: gamePlat, autoExchange }
      this.actions_getEnterGame(params).then((res) => { if (res.code == 0) { let { url } = res.info; this.toRouter('otherGame', { gameURI: url }) } })
    }
  },
  computed: {
    ...mapGetters(['masterSwitch', 'HOST', 'getters_experienceRoom', 'isCheckPayRoom', 'autoExchange', 'getters_getRedRobList', 'getters_getBalanceNew', 'getters_getRedList', 'SALT', 'getters_getLiveContact', 'getters_getLotteryList', 'getters_rootStore', 'getters_publicTime', 'getters_componentTime', 'LANG', 'MSGID', 'UID', 'TOKEN', 'WSEVENT', 'ANCHOR', 'ANCHOR_KEY', 'ANCHOR_LIST', 'ANCHOR_PREV', 'getters_getEnterRoom', 'getters_getBaseInfo', 'getters_getConfig', 'getters_isAppending', 'getters_getTaskList', 'MOREGAME', 'MOREGAMETYPE']),
    zbmp_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'live_contact')
    },// 主播名片
    mrpj_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'task')
    }, // 每日任务
    cz_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'charge')
    }, // 充值
    jcpd_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'luckdraw')
    }, // 奖池派送
    yykj_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'fuckactivity')
    }, // 一元空降
    liveMsgTopCopy () { return this.liveMsgTop },
    liveMsgBottomCopy () { return this.liveMsgBottom },
    zbmp_contact_list () {
      let content;
      if (this.getters_getLiveContact && this.getters_getLiveContact.contact_list) {
        content = this.getters_getLiveContact.contact_list.find(el => el.info);
      } else {
        content = { info: '' }
      }
      return content;
    }
  },
  beforeDestroy () {
    this.clear_timekeeping_mode();
    this.mutations_publicTime('');
    // clearInterval(this.setInterval_check);
    clearInterval(this.vDataSetInterval);
  },
}
</script>
<style lang='scss' scoped>
.liveMaskCopy {
  .van-notice-bar {
    height: 24px !important;
    font-size: 12px !important;
    background: rgba(0, 0, 0, 0.3);
  }
  .jcpd_wrapper {
    &::before {
      content: "";
      display: inline-block;
      background-image: url("~@/assets/images/jcbg@2x.png");
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -10; /* 將 ::before 置於 main 的後方 */
    }
    .jcpd {
      &::before {
        content: "";
        display: inline-block;
        background-image: url("~@/assets/images/cjdb@2x.png");
        background-position: center;
        background-size: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -10; /* 將 ::before 置於 main 的後方 */
      }
      .jcpd_inner {
        &::before {
          content: "";
          display: inline-block;
          background-image: url("~@/assets/images/cjzp@2x.png");
          background-position: center;
          background-size: cover;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -10; /* 將 ::before 置於 main 的後方 */
        }
      }
    }
  }
  .draw_active {
    background: #a83250;
  }
  .my-swipe .van-swipe-item {
    height: 210px;
  }
  .totalCoin {
    .van-cell {
      padding: 0 !important;
    }
  }
  .active_gift {
    border-color: yellow !important;
  }
  .active {
    border-radius: 32px;
    background: red;
    color: white;
  }
  /* 通用 */
  ::-webkit-input-placeholder {
    color: #e1e1e1;
  }
  // 弹幕动画
  .barrage {
    animation: lateX 6000ms ease-in;
  }
  @keyframes lateX {
    100% {
      transform: translateX(-140px);
    }
  }
  .bet-bg-img {
    background-image: url("~@/assets/images/lotteryBg/yfks_bgview_middle.png");
  }
  .bet-bg-img-header {
    background-image: url("~@/assets/images/lotteryBg/yfks_bgview_top.png");
  }
  .userMsg_backImg {
    background-image: url("~@/assets/images/userMsg_backImg.png");
  }
  .userMsg_header {
    background-image: url("~@/assets/images/userMsg_header.png");
  }
  .anchor_bg {
    background-image: url("~@/assets/images/anchor_bg.png");
  }
  .anchor_cover {
    background-image: url("~@/assets/images/anchor_cover.png");
  }
  .anchor_purple {
    background-image: url("~@/assets/images/anchor_purple.png");
  }
  .gztc1 {
    background-image: url("~@/assets/images/gztc1.png");
  }
  .live_redbag_detail {
    background-image: url("~@/assets/images/live_redbag_detail.png");
  }
  .userlist_no1 {
    background-image: url("~@/assets/images/userlist_no1.png");
  }
  .userlist_no2 {
    background-image: url("~@/assets/images/userlist_no2.png");
  }
  .userlist_no3 {
    background-image: url("~@/assets/images/userlist_no3.png");
  }
  .borderColorGuard {
    border-color: #f2cf40;
    position: relative;
    overflow: hidden;
    .borderColorGuardSelect {
      bottom: 0px;
      right: 0px;
      width: 0px;
      height: 0px;
      border-top: 5px solid transparent !important;
      border-right: 5px solid #f2cf40 !important;
      border-bottom: 5px solid #f2cf40 !important;
      border-left: 5px solid transparent !important;
      position: absolute;
    }
  }
}
</style>