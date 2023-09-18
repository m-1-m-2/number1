<template>
  <div class='liveMask absolute top bottom left right'
       v-touch:swipeleft="leftSlide"
       v-touch:swipeup="upSlide"
       v-touch:swipedown="downSlide">
    <!-- 配合使用transition使用 -->
    <div class="fixed w-full h-full">
      <transition :name="liveMaskSlide">
        <div class="absolute top bottom left right"
             v-if="visible">
          <transition name="van-slide-right">
            <div class="absolute top bottom left right flex flex-col z-index-20"
                 v-if="innerVisible">
              <!-- top -->
              <div class="w-full h-88 flex">
                <transition name="van-slide-right">
                  <div class="w-full h-88"
                       v-if="innerVisible_bet">
                    <div class="h-30 flex">
                      <div class="w-fit px-4 h-30 flex justify-center">
                        <div class="w-fit h-30 bg-mask rounded-30 flex items-center">
                          <div class="h-30 w-30 rounded pt-2 pl-2 box-border"
                               @click="liveroom_user(ANCHOR)">
                            <img :src="zwfImg"
                                 v-real-img="ANCHOR.avatar_thumb"
                                 class="h-26 w-26 rounded"
                                 alt="">
                          </div>
                          <div class="flex-1 fz-10 flex flex-col pl-2 box-border cl-white">
                            <div class="w-66 van-ellipsis">{{ANCHOR.user_nicename}}</div>
                            <div class="w-66 van-ellipsis">ID:{{ANCHOR.uid}}</div>
                          </div>
                          <div class="h-30 w-46 flex items-center justify-center"
                               v-if="getters_getEnterRoom.isattention != 1">
                            <div class="h-24 w-40 bg-orange fz-12 line-24 text-center rounded-30"
                                 @click="toAttention">
                              {{langSwitch('关注')}}

                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex-1 h-30 relative">
                        <div class="absolute top bottom left right pt-2 pb-2 box-border scroll-x flex">
                          <div class="h-26 w-26 mr-10"
                               style="flex-shrink: 0;"
                               :key="k+'userlists'"
                               v-for="(v, k) in getters_getEnterRoom.userlists">
                            <img :src="zwfImg"
                                 v-once
                                 v-real-img="v.avatar"
                                 @click="liveroom_user(v)"
                                 class="h-26 w-26 rounded"
                                 alt="">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="h-58 flex">
                      <div class="flex-1 flex flex-col">
                        <div class="h-28 line-28 fz-12 box-border cl-white">
                          <span class="pl-12 pr-12 pt-4 pb-4 bg-mask rounded-10 ml-4">{{langSwitch('钻石')}} {{(Number(getters_getEnterRoom.votestotal))}} ></span>
                          <span class="pl-12 pr-12 pt-4 pb-4 bg-mask rounded-10 ml-4"
                                @click="checkGuardList">{{langSwitch('守护')}}{{getters_getEnterRoom.guard_nums}} {{langSwitch('人')}} ></span>
                          <span class="pl-12 pr-12 pt-4 pb-4 bg-mask rounded-10 ml-4"
                                @click="now_rank_show_fn">{{langSwitch('实时榜单')}} ></span>
                        </div>
                        <div class="h-30 px-4 box-border">
                          <div class="h-30 rounded-30 scroll-hide">
                            <van-notice-bar color="#F0F0F0"
                                            class="h-20"
                                            :text="getters_getBaseInfo.system_msg[0]" />
                          </div>
                        </div>
                      </div>
                      <div class="w-58 h-58">
                        <div class="w-58 h-58"
                             v-show="zbmp_obj.length >= 1"
                             @click="zbmp_show = true">
                          <div class="h-40 flex justify-center">
                            <img :src="zbmp_obj.length >= 1 && zbmp_obj[0].icon"
                                 class="h-40 w-40"
                                 alt="">
                          </div>
                          <div class="h-18 fz-12 line-18 text-center cl-white">{{ zbmp_obj.length >= 1 && zbmp_obj[0].name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- null -->
              <div class="flex-1 relative w-full px-4 box-border fz-12"
                   v-touch:swipeup="upSlide_inner"
                   v-touch:swipedown="downSlide_inner"
                   v-touch:swiperight="rightSlide_inner">
                <div class="absolute top bottom left right flex"
                     v-if="isBetBool">
                  <div class="flex-1 flex relative">
                    <transition name="van-slide-right">
                      <div class="absolute top bottom left right scroll-y"
                           v-if="innerVisible_bet"
                           ref="chat_element">
                        <div class="p-all-4 box-border mt-4 rounded-8 line-16 bg-mask w-fit"
                             v-for="(v,k) in live_content_msg"
                             :key="k+'_'+v.msgID">
                          <!-- SystemNots -->
                          <template v-if="v.msgID == 0">
                            <span class="cl-yellow fz-12 line-16"
                                  style="white-space: pre-wrap">{{v.msgData.msg.ct}}</span>
                          </template>
                          <template v-if="v.msgID == 1">
                            <template v-if="v.msgData.msg.msgtype == 0">
                              <div class="cl-a8a8a8 flex"
                                   @click="liveroom_user(v.msgData.msg.ct)">
                                <div class="h-16 w-30 flex items-center ">
                                  <img class="h-12 w-26"
                                       :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                                </div>
                                <div class="flex-1">
                                  <span class="cl-green"> {{ v.msgData.msg.ct.userNicename }}</span>{{langSwitch('进入直播间')}}
                                </div>
                              </div>
                            </template>
                            <template v-if="v.msgData.msg.msgtype == 2">
                              <div class="cl-a8a8a8 flex"
                                   @click="liveroom_user(v.msgData.msg.ct)">
                                <div class="h-16 w-30 flex items-center ">
                                  <img class="h-12 w-26"
                                       :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                                </div>
                                <div class="flex-1 cl-white">
                                  <span class="cl-purple"> {{ v.msgData.msg.ct.userNicename }}</span> : {{ v.msgData.msg.content }}
                                </div>
                              </div>
                            </template>
                          </template>
                          <template v-if="v.msgID == 8">
                            <div class="cl-a8a8a8 line-16">
                              <span class="pl-6 pr-6 pt-2 pb-2 rounded-6 cl-white bg-orange">{{langSwitch('系统')}}</span>
                              <span class="box-border px-4"
                                    v-html="`${v.msgData.msg.ct.nickname} ${langSwitch('在')}<span class='cl-yellow'> ${v.msgData.msg.ct.lotteryName} </span>${langSwitch('中,下注了')}  <span class='cl-yellow'> ${v.msgData.msg.ct.totalmoney} </span>${langSwitch('钻石')}`">
                              </span>
                              <span class="pl-4 pr-4 pt-0 pb-0 box-border rounded-6 cl-white bg-red inline-block w-fit">{{langSwitch('跟投')}}</span>
                            </div>
                          </template>
                          <template v-if="v.msgID == 33">
                            <div class="cl-a8a8a8 line-16">
                              <span class="pl-6 pr-6 pt-2 pb-2 rounded-6 cl-white bg-red">{{langSwitch('中奖')}}</span>
                              <span class="pl-4 box-border"
                                    v-html="v.msgData.msg.ct"></span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </transition>
                  </div>
                  <div class="flex-1"
                       v-touch:swiperight="rightSlide_inner_bet">
                  </div>
                </div>

              </div>
              <!-- message -->
              <div class="h-300 w-full px-4 box-border fz-10 flex"
                   v-if="!isBetBool">
                <div class="flex-1 flex">
                  <!-- <transition name="van-slide-right"> -->
                  <div class="scroll-y"
                       ref="chat_element">
                    <div class="p-all-4 box-border mt-4 rounded-8 line-16 bg-mask w-fit"
                         v-for="(v,k) in live_content_msg"
                         :key="k+'_'+v.msgID">
                      <!-- SystemNots -->
                      <template v-if="v.msgID == 0">
                        <span class="cl-yellow fz-12 line-16"
                              style="white-space: pre-wrap">{{v.msgData.msg.ct}}</span>
                      </template>
                      <template v-if="v.msgID == 1">
                        <template v-if="v.msgData.msg.msgtype == 0">
                          <div class="cl-a8a8a8 flex"
                               @click="liveroom_user(v.msgData.msg.ct)">
                            <div class="h-16 w-30 flex items-center"
                                 v-if="v.msgData.msg.ct.kingIcon">
                              <img class="h-12 w-26"
                                   :src="v.msgData.msg.ct.kingIcon" />
                            </div>
                            <div class="h-16 w-30 flex items-center ">
                              <img class="h-12 w-26"
                                   :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                            </div>
                            <div class="flex-1">
                              <span class="cl-green"> {{ v.msgData.msg.ct.userNicename }}</span> {{langSwitch('进入直播间')}}
                            </div>
                          </div>
                        </template>
                        <template v-if="v.msgData.msg.msgtype == 2">
                          <div class="cl-a8a8a8 flex"
                               @click="liveroom_user(v.msgData.msg.ct)">
                            <div class="h-16 w-30 flex items-center ">
                              <img class="h-12 w-26"
                                   :src="v.msgData.msg.ct.level > 0 && getters_getConfig.level[v.msgData.msg.ct.level-1].thumb" />
                            </div>
                            <div class="flex-1 cl-white">
                              <span class="cl-purple"> {{ v.msgData.msg.ct.userNicename }}</span> : {{ v.msgData.msg.content }}
                            </div>
                          </div>
                        </template>
                      </template>
                      <template v-if="v.msgID == 8">
                        <div class="cl-a8a8a8 line-16">
                          <span class="pl-6 pr-6 pt-2 pb-2 rounded-6 cl-white bg-orange">{{langSwitch('系统')}}</span>
                          <span class="box-border px-4"
                                v-html="`${v.msgData.msg.ct.nickname} ${langSwitch('在')}<span class='cl-yellow'> ${v.msgData.msg.ct.lotteryName} </span>${langSwitch(' 中,下注了 ')}<span class='cl-yellow'> ${v.msgData.msg.ct.totalmoney} </span> ${langSwitch('钻石')}`">
                          </span>
                          <span class="pl-4 pr-4 pt-0 pb-0 box-border rounded-6 cl-white bg-red inline-block w-fit">{{langSwitch('跟投')}}</span>
                        </div>
                      </template>
                      <template v-if="v.msgID == 33">
                        <div class="cl-a8a8a8 line-16">
                          <span class="pl-6 pr-6 pt-2 pb-2 rounded-6 cl-white bg-red">{{langSwitch('中奖')}}</span>
                          <span class="pl-4 box-border"
                                v-html="v.msgData.msg.ct"></span>
                        </div>
                      </template>

                      <template v-if="v.msgID == 17">

                      </template>

                    </div>
                  </div>
                  <!-- </transition> -->
                </div>
                <div class="w-72">
                  <div class="w-72 h-72 flex justify-center">
                    <div class="w-48"
                         @click="isBetBool_fn"
                         v-if="!!getters_getEnterRoom.roomLotteryInfo.logo">
                      <img class="w-48 h-48"
                           :src="getters_getEnterRoom.roomLotteryInfo.logo"
                           alt="">
                      <div class="h-24 text-center cl-white fz-10">
                        <span v-if="!(getters_publicTime < 1)">{{getters_publicTime < 10 ? '0':''}}{{getters_publicTime}}{{langSwitch('秒')}}</span>

                        <!-- <van-count-down :time="room_lottery.time*1000"
                                        v-show="room_lottery_isTime"
                                        @change="room_lottery_isTime_fn">
                          <template #default="timeData">
                            <span class="fz-10 cl-white">{{ timeData.seconds > 9 ? timeData.seconds: '0' + timeData.seconds }}{{langSwitch('秒')}}</span>
                          </template>
                        </van-count-down> -->
                        <span class="line-24"
                              v-else>{{langSwitch('开奖中')}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-72 h-72 flex justify-center">
                    <div class="w-48"
                         @click="isBoxPopup = true">
                      <img class="w-48 h-48"
                           :src="mrpj_obj[0].icon"
                           alt="">
                      <div class="h-24 text-center cl-white fz-10">{{mrpj_obj[0].name}}</div>
                    </div>
                  </div>
                  <div class="w-72 h-72 flex justify-center">
                    <div class="w-48"
                         @click="bigTurntable">
                      <img class="w-48 h-48"
                           :src="jcpd_obj[0].icon"
                           alt="">
                      <div class="h-24 text-center cl-white fz-10">{{jcpd_obj[0].name}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- bottom -->
              <div class="w-full h-50 flex">
                <div class="flex-1 flex">
                  <div class="flex-1 flex pl-10 box-border items-center">
                    <input type="text"
                           style="outline:none;border:none;"
                           :placeholder="langSwitch('撩TA一下...')"
                           v-model="sendMsg_info"
                           @keyup.enter="submitMsg"
                           class="w-144 h-24 bg-mask rounded-30 pl-10 box-border pt-2 pb-2 fz-12 cl-white">
                  </div>
                  <div class="w-100 flex items-center justify-between">
                    <div class="h-28 w-28 bg-mask rounded flex items-center justify-center"
                         @click="game_showShare_fn">
                      <van-icon name="smile"
                                size='20' />
                    </div>
                    <div class="h-28 w-28 bg-mask rounded flex items-center justify-center"
                         @click="getGiftList">
                      <van-icon name="gift"
                                size='20' />
                    </div>
                    <div class="h-28 w-28 bg-mask rounded flex items-center justify-center"
                         @click="redBag_showShare = true">
                      <van-icon name="alipay"
                                size='20' />
                    </div>
                  </div>
                </div>
                <div class="w-40 flex items-center justify-center">
                  <div @click="closeButtonFn"
                       class="h-28 w-28 bg-mask rounded flex items-center justify-center">
                    <van-icon name="cross"
                              color="#ffffff"
                              size='16' />
                  </div>
                </div>
              </div>
              <!-- 下注区域 -->
              <div class="h-280 w-full relative bet-bg-img"
                   v-if="isBetBool">
                <div class="h-16 w-full absolute left bet-bg-img-header"
                     style="top: -10px"></div>
                <component v-if="isBetBool"
                           v-bind:is="currentGameComponent"
                           :deliveryTime="deliveryTime"
                           @betAssistant="betAssistant"
                           :mSocket="mSocket"></component>
              </div>
            </div>
          </transition>
          <!-- ************************************************ -->
          <!-- 消息弹幕 -->
          <lotteryBarrage v-if="lotteryBarrage_show"
                          :barrage_list="barrage_list"
                          @updata_barrage_list="updata_barrage_list"></lotteryBarrage>
        </div>
      </transition>
    </div>

    <!-- 主播名片 -->
    <van-popup v-model="zbmp_show"
               :close-on-click-overlay="false"
               position="bottom"
               :style="{ height: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 pb-20 rounded-20"
           style="background: linear-gradient(to right bottom, pink ,blue ,purple)">
        <div class="h-40 line-50 cl-white pr-10 box-border text-right">
          <van-icon name="close"
                    @click="zbmp_show = false"
                    size="24" />
        </div>
        <div class="h-30 line-30 text-center fz-14 cl-white">{{ANCHOR.user_nicename}}{{langSwitch('的名片')}}</div>
        <div class="flex items-center justify-center py-12">
          <img :src="ANCHOR.avatar_thumb"
               class="w-64 h-64 rounded"
               alt="">
        </div>
        <div class="fz-12 text-center cl-white line-16">
          {{langSwitch('备注用户昵称快速通过')}}
        </div>
        <div class="flex justify-center">
          <div class="h-28 w-240 ba-1px rounded-20 mt-10 box-border flex"
               style="background: rgba(255,255,255,0.3)">
            <div class="w-50 h-28 flex justify-center items-center cl-white">
              <van-icon name="friends-o"
                        size="20" />
            </div>
            <div class="flex-1 h-28"></div>
            <div class="w-50 h-28 fz-12 cl-white flex items-center justify-center">
              <div class="h-16 w-36 line-16 text-center fz-10 box-border rounded-20"
                   style="background: linear-gradient(to right, blue,red)">{{langSwitch('获取')}}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class=" w-240 ba-1px py-8 pl-10 pr-10 rounded-20 mt-10 box-border fz-12 cl-white text-center"
               style="background: rgba(255,255,255,0.3)">
            <div class="line-24">{{langSwitch('获取名片进度')}}</div>
            <div class="line-12">{{langSwitch('赠送礼物达到要求即可获取')}}</div>
            <div class="h-30 flex items-center justify-center">
              <div class="h-12 w-full bg-white rounded-12 text-center cl-red line-12 fz-12">
                0/131
              </div>
            </div>
            <div class="line-12 pl-6 box-border text-left">{{langSwitch('1.添加时请备注昵称避免主播无法区分')}}</div>
            <div class="line-24 pl-6 box-border text-left">{{langSwitch('2.联系方式如有虚假可通过客户投诉')}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 其他用户信息 -->
    <van-popup v-model="other_user_show"
               :close-on-click-overlay="false"
               position="bottom"
               :style="{ height: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-360 rounded-10 bg-white fz-12 scroll-hide">
        <div class="h-120 w-280 w-full"
             style="background: #FFFFF0;">
          <div class="h-30 line-30 cl-a8a8a8 px-12 box-border relative">
            <span class="extend-via-border"
                  @click="reportFn">{{langSwitch('举报')}}</span>
            <div class="absolute w-30 h-44 bg-red top right-24 cl-white text-center"
                 style="border-bottom-left-radius:30px;border-bottom-right-radius:30px;">
              <van-icon name="close"
                        class="relative top-18"
                        @click="other_user_show = false"
                        size="24" />
            </div>
            <div class="flex justify-center">
              <img v-real-img="current_user.avatar"
                   :src="zwfImg"
                   v-if="other_user_show"
                   class="w-56 h-56 rounded bg-red"
                   alt="">
            </div>
          </div>
        </div>
        <!--  -->
        <div class="h-240 w-280 flex flex-col">
          <div class="h-50 flex flex-col text-center">
            <div class="h-30 line-40">
              <span class="bolder fz-14">{{current_user.user_nicename}}</span>
              <img class="h-12 w-26 ml-4"
                   :src="current_user.level_anchor> 0 && getters_getConfig.levelanchor[current_user.level_anchor-1].thumb" />
              <img class="h-12 w-26 ml-4"
                   :src="current_user.level> 0 && getters_getConfig.level[current_user.level-1].thumb" />
            </div>
            <div class="h-20 line-20">
              <span class="cl-a8a8a8"> ID:{{current_user.id}} </span>
              <van-icon name="location-o" />
              <span class="cl-a8a8a8"> {{current_user.city || langSwitch('好像在火星')}} </span>
            </div>
          </div>
          <div class="h-150 w-full flex flex-col cl-a8a8a8">
            <div class="flex-1 flex">
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-24 cl-black bolder line-60 h-45">{{current_user.fans}}</div>
                <div class="h-30">{{langSwitch('粉丝')}}</div>
              </div>
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-24 cl-black bolder line-60 h-45">{{current_user.follows}}</div>
                <div class="h-30">{{langSwitch('关注')}}</div>
              </div>
            </div>
            <div class="flex-1 flex">
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-24 cl-black bolder line-60 h-45">{{(current_user.consumption/10).toFixed(0)}}</div>
                <div class="h-30">{{langSwitch('送出钻石')}}</div>
              </div>
              <div class="flex-1 text-center flex flex-col">
                <div class="fz-24 cl-black bolder line-60 h-45">{{(current_user.votestotal/10).toFixed(0)}}</div>
                <div class="h-30">{{langSwitch('收入钻石')}}</div>
              </div>
            </div>
          </div>
          <div class="h-40 box-border bt-1px flex">
            <div class="flex-1 text-center line-40 fz-14 bolder"
                 @click="toAttention_popup(current_user)">{{current_user.isattention == 0? langSwitch('关注') :langSwitch('已关注') }}</div>
            <div class="flex-1 text-center line-40 fz-14 bolder"
                 @click="toRouter('anchorDetails', { touid:current_user.id || current_user.uid })">{{langSwitch('主页')}}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 举报popup -->
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
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-300 h-400 rounded-10 bg-white fz-12 flex flex-col">
        <div class="w-full h-36 line-36 text-center fz-14 box-border bb-1px relative">
          {{langSwitch('守护')}} ({{ getters_getEnterRoom.guard_nums }})
          <div class="absolute top-4 right-8">
            <van-icon name="close"
                      @click="guard_show = false"
                      size="24" />
          </div>
        </div>
        <div class="flex-1 w-full relative">
          <div class="absolute top bottom left right scroll-y px-8 box-border">
            <div class="w-full h-52 py-8 flex bb-1px box-border"
                 v-for="(v,k) in guard_show_list"
                 :key="k + 'guard_show_list'">
              <div class="w-24">

              </div>
              <div class="w-36 flex items-center justify-center">
                <img :src="v.avatar_thumb"
                     class="w-36 h-36 rounded"
                     alt="">
              </div>
              <div class="flex-1 flex flex-col pl-8 line-18">
                <div class="flex-1 fz-14 flex items-center">
                  <div class="">{{v.user_nicename}}</div>
                  <div class="flex-1 flex items-center">
                    <img class="h-12 w-26 ml-4"
                         :src="v.level > 0 && getters_getConfig.level[v.level-1].thumb">
                  </div>
                </div>
                <div class="flex-1 cl-a8a8a8">{{v.contribute}}{{langSwitch('钻石')}} </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-36 line-36 text-center fz-14 flex box-border bt-1px">
          <div class="flex-1 fz-10 text-left pl-12 box-border cl-a8a8a8">
            {{langSwitch('快去为你喜欢的主播开通守护吧')}}
          </div>
          <div class="w-100 h-36">
            <span class="cl-white fz-12 bg-orange pl-16 pr-16 pt-4 pb-4 rounded-20">{{langSwitch('开通守护')}}</span>
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
        <div class="h-40 line-40 text-center fz-16 bolder bg-f4f4f4">
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
                       class="w-44 h-44 rounded"
                       alt="">
                </div>
                <div class="flex-1 fz-14 line-50 h-50">
                  {{ v.name}}
                </div>
                <div class="w-100 h-50 fz-12 pr-10 box-border flex items-center justify-end">
                  {{v.coin}} {{langSwitch('钻石')}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-72 w-full bg-f4f4f4">
          <!-- <template v-for="(v, k) in now_rank_data"> -->
          <div class="h-50 w-full box-border flex">
            <div class="w-30 h-50 fz-14 line-50 text-center bolder cl-a8a8a8">
              <span :class="now_rank_index < 2 ? 'cl-red': ''"
                    v-if="!!now_rank_index">{{ now_rank_index + 1}}</span>
            </div>
            <div class="w-50 h-50 flex items-center justify-center">
              <img :src="ANCHOR.avatar_thumb"
                   class="w-44 h-44 rounded"
                   alt="">
            </div>
            <div class="flex-1 fz-14 line-50 h-50">
              {{ ANCHOR.user_nicename}}
            </div>
            <div class="w-70 h-50 flex items-center justify-center">
              <span class="cl-white fz-12 bg-orange pl-16 pr-16 pt-4 pb-4 rounded-4"
                    @click="now_rank_show = false;getGiftList()">{{langSwitch('送礼')}}</span>
            </div>
          </div>
          <!-- </template> -->
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
                                <van-progress :percentage="(Number(v.condition_info[0].cur_num)/Number(v.condition_info[0].condition_num)) * 100"
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
                                {{v.completed == 0 ? langSwitch('去完成'): langSwitch('已完成')}}
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
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-500">
        <div class="h-480 w-full fz-12 flex flex-col rounded-10 relative jcpd_wrapper scroll-hide"
             :class="getters_rootStore.lang !='zh-CN' ? 'h-500':'h-480'">
          <div class="h-50 w-full flex px-10 box-border">
            <div class="flex-1 h-50">
              <div class="h-30 line-40 cl-yellow fz-10">{{langSwitch('奖金池剩余奖金')}}</div>
              <div class="h-20 w-full">
                <div class="h-14 w-90 bg-white cl-red text-center line-14 rounded-4">
                  {{bigTurntable_data.pool}}
                </div>
              </div>
            </div>
            <div class="flex-1 h-50 flex flex-col">
              <div class="flex-1 h-25 text-right line-32">
                <span class="pl-10 pr-10 pt-2 pb-2 rounded-4 h-16 line-16 cl-yellow ba-1px box-border fz-10"
                      @click="getDoLuckydraw">{{langSwitch('中奖记录')}}</span>
              </div>
              <div class="flex-1 h-25 text-right line-26">
                <span class="pl-10 pr-10 pt-2 pb-2 rounded-4 h-16 line-16 cl-yellow ba-1px box-border fz-10"
                      @click="bigTurntable_rule_show = true">{{langSwitch('奖励规则')}}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="flex-1 relative jcpd flex">
            <div class="h-210 w-210 jcpd_inner relative left-37 top-7 flex items-center justify-center">
              <div class="h-60 w-60 fz-18 pl-4 pr-4 pt-8 pb-4 box-border text-center line-20 bolder cl-white bg-orange rounded"
                   :class="getters_rootStore.lang =='en' ? 'pt-20':''">{{langSwitch('点击抽奖')}}</div>
            </div>
          </div>
          <!--  -->
          <div class="fz-10 h-120 pl-10 pr-10 pt-10 box-border"
               :class="getters_rootStore.lang !='zh-CN' ? 'h-140':''"
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
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-300 bg-red rounded-10">
        <div class="h-40 fz-24 line-40 box-border bb-1px text-center cl-yellow">
          {{langSwitch('奖池规则')}}
        </div>
        <div class="h-260 scroll-y px-10 box-border fz-10 bt-1px"
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
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-280 h-300 bg-red rounded-10">
        <div class="h-40 fz-24 line-40 box-border text-center bb-1px cl-yellow flex rounded-10 scroll-hide">
          <div class="flex-1"
               @click="bigTurntable_draw_active = 'djjl'"
               :class="bigTurntable_draw_active == 'djjl'? 'draw_active' : ''">{{langSwitch('大奖记录')}}</div>
          <div class="flex-1"
               @click="bigTurntable_draw_active = 'wdjl'"
               :class="bigTurntable_draw_active == 'wdjl'? 'draw_active' : ''">{{langSwitch('我的记录')}}</div>
        </div>
        <div class="h-260 scroll-y px-10 box-border fz-10 bt-1px">
          <div class="pt-4"
               v-if="!!bigTurntable_draw_obj">
            <div v-for="(v, k) in bigTurntable_draw_obj[bigTurntable_draw_active]"
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
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-full bg-white pl-8 pr-8 pb-18 box-border flex flex-col"
           style="background:transparent !important;">
        <div class="flex-1 w-full bg-white mb-10 rounded-4">
          <div class="pt-8 box-border">
            <div class="inline-block h-80 w-Equally-4"
                 v-for="(v,k) in getters_getLotteryList.lotteryList"
                 :key="k + 'play_gameRecommendation'">
              <div class="h-60 w-full flex justify-center items-center">
                <div class="h-58 w-58 rounded">
                  <img :src="v.logo"
                       class="h-58 w-58 rounded"
                       alt="">
                </div>
              </div>
              <div class="h-20 w-full fz-12 line-20 text-center cl-a8a8a8">
                {{v.name}}
              </div>
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
               :style="{ height: '280px', width: '100%' }">
      <div class="w-full h-280 relative">
        <div class="absolute top bottom left right bg-black">
          <div class="w-full px-12 box-border h-24 line-24 fz-12 bolder cl-white">{{langSwitch('发送礼物')}}</div>
          <div class="w-full h-210 relative"
               v-if="gift_showShare_obj">
            <div class="w-full h-2 absolute box-border bg-black left right z-index-30"
                 style="top:-1px;"></div>
            <!-- gift start -->
            <van-swipe class="my-swipe"
                       :loop="false"
                       indicator-color="white">
              <van-swipe-item v-for="(v, k) in Math.ceil((gift_showShare_obj.giftlist.length)/8)"
                              :key="k+'gift'">
                <div class="h-180 w-full fz-12">
                  <div class="inline-block h-90 w-Equally-4 relative box-border p-all-1"
                       v-for="(val, key) in gift_showShare_obj.giftlist.slice(k*8, (k+1)*8)"
                       @click="selectGift( k, key)"
                       :class="[]"
                       :key="k + 'giftItem'+ key">
                    <div class="abosolute top bottom left right box-border ba-1px"
                         style="border-color: black;"
                         :class="[gift_select_key == `${k}'giftItem'${key}`? 'active_gift': '']">
                      <div v-if="val.mark == 1"
                           class="absolute top-2 left-2 h-14 w-36 bg-red line-14 rounded-20 fz-10 text-center">{{langSwitch('热门')}}</div>
                      <div v-if="val.type == 1"
                           class="absolute top-2 right-2 h-14 w-20 bg-a8a8a8 line-14 rounded-20 fz-10 text-center">{{langSwitch('豪')}}</div>
                      <div class="h-50 flex justify-center items-end">
                        <img :src="val.gifticon"
                             class="h-42 w-42"
                             alt="">
                      </div>
                      <div class="h-20 text-center"
                           :class="getters_rootStore.lang !='zh-CN' && getters_rootStore.lang !='zh-TW' ? 'fz-8':''">{{val.giftname}}</div>
                      <div class="h-16 text-center fz-10 line-10 cl-a8a8a8">{{val.needcoin}} {{langSwitch('钻')}}</div>
                    </div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
            <!-- gift end -->
            <div class="w-full h-2 absolute bg-black left right z-index-100"
                 style="bottom:-1px;"></div>
          </div>
          <div class="w-full h-46">
            <div class="h-36 px-12 box-border flex">
              <div class="flex-1 h-36 line-36 cl-yellow fz-14">
                <van-icon class="mr-4"
                          name="diamond-o" />
                {{ gift_showShare_obj.coin }} >
              </div>
              <div class="flex-1 h-36 line-36 text-right">
                <div @click="sendGift"
                     class="inline pl-20 pr-20 pt-6 pb-6 fz-14 cl-white bg-a8a8a8 rounded-20">{{langSwitch('赠送')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </van-popup>
    <!-- 红包 -->
    <van-popup v-model="redBag_showShare"
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-240 h-350 bg-red rounded-10 relative fz-12">
        <!-- 红包 -->
        <div class="w-240 h-340 px-12 box-border">
          <div class="h-70">
            <div class="h-24 line-24 fz-14 cl-yellow text-center">{{langSwitch('直播间红包')}}</div>
            <div class=" fz-10 line-16 cl-white">{{langSwitch('给当前直播间观众发红包')}}</div>
            <div class="h-30 fz-10 cl-white">
              <van-radio-group v-model="redBag_radio">
                <div class="h-30 w-full flex">
                  <div class="flex-1 flex items-center justify-end">
                    <van-radio name="1"
                               checked-color="#ffffff"
                               icon-size="12px">
                      <div class="h-30 line-30 cl-white">{{langSwitch('拼手气红包')}}</div>
                    </van-radio>
                  </div>
                  <div class="flex-1 pl-12 box-border">
                    <van-radio name="2"
                               checked-color="#ffffff"
                               icon-size="12px">
                      <div class="h-30 line-30 cl-white">{{langSwitch('平均红包')}}</div>
                    </van-radio>
                  </div>
                </div>
              </van-radio-group>
            </div>
          </div>
          <div class=" h-180 flex flex-col w-full mt-10">
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-12 box-border">
                <div class="w-50">{{langSwitch('总金额')}}</div>
                <div class="flex-1 flex items-center">
                  <van-field v-model="redBag_total"
                             type="number"
                             :placeholder="langSwitch('请输入总金额')" />
                </div>
                <div class="w-36 text-right cl-a8a8a8">{{langSwitch('钻石')}}</div>
              </div>
            </div>
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-12 box-border">
                <div class="w-50">{{langSwitch('数量')}}</div>
                <div class="flex-1 flex items-center">
                  <van-field v-model="redBag_count"
                             type="digit"
                             :placeholder="langSwitch('请输入数量')" />
                </div>
                <div class="w-36 text-right cl-a8a8a8">{{langSwitch('个')}}</div>
              </div>
            </div>
            <div class="h-60 flex items-center">
              <div class="h-54 line-54 w-full bg-white rounded-10 flex px-12 box-border">
                <van-field v-model="redBag_text"
                           type="textarea"
                           :placeholder="langSwitch('恭喜发财，大吉大利')" />
              </div>
            </div>
          </div>
          <div class="h-90">
            <div class="h-50 pt-20 box-border flex justify-center">
              <div class="w-90 h-14 bg-mask rounded-20 relative">
                <div class="w-68 text-center h-18 bg-white line-18 rounded-20 absolute cl-red fz-10 left"
                     v-if="!redBag_checked"
                     @click="redBag_checked = true"
                     style="top:-2px;">{{langSwitch('延时3分钟')}}</div>
                <div class="w-68 text-center h-18 bg-white line-18 rounded-20 absolute cl-red fz-10 right"
                     v-if="redBag_checked"
                     @click="redBag_checked = false"
                     style="top:-2px;">{{langSwitch('立即发放')}}</div>
              </div>
            </div>
            <div class="h-40">
              <van-button type="warning"
                          size="small"
                          block
                          color="yellow"
                          round><span class="cl-red fz-14">{{langSwitch('发红包')}} {{redBag_total}} {{langSwitch('钻石')}} </span></van-button>
            </div>
          </div>
        </div>
        <!-- close -->
        <div class="text-center line-60">
          <van-icon name="close"
                    class="cl-white"
                    @click="redBag_showShare = false;"
                    size="24" />
        </div>
      </div>
    </van-popup>

    <van-popup v-model="show_attention_tip"
               close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-240 h-240 bg-white rounded-12 flex items-center flex-col justify-center relative">
        <div class="">
          <div class="h-60 w-full flex items-center justify-center">
            <div class="w-60 h-60 rounded scroll-hide">
              <img v-real-img="ANCHOR.avatar_thumb"
                   :src="zwfImg"
                   class="w-full h-full"
                   alt="">
            </div>
          </div>
          <div class="h-50 w-full text-center fz-12 bolder flex items-center justify-center">{{langSwitch('关注主播不迷路~')}}</div>
          <div class="h-46 w-full flex items-center justify-center">
            <div class="w-180 h-30 bg-pink rounded-30 line-30 fz-12 text-center cl-white"
                 @click="toAttention_exit">{{langSwitch('关注并退出')}}</div>
          </div>
          <div class="h-46 w-full flex items-center justify-center">
            <div class="w-180 h-30 bg-white rounded-30 line-30 fz-12 text-center box-border cl-pink"
                 @click="toBack()"
                 style="border:1px solid pink">{{langSwitch('离开')}}</div>
          </div>
        </div>
        <!-- close -->
        <div class="absolute right-6 top-4">
          <van-icon size="20"
                    @click="show_attention_tip = false"
                    name="cross" />
        </div>
      </div>
    </van-popup>
    <!-- 首充超值大礼包 -->
    <van-popup close-on-click-overlay
               position="bottom"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <div class="w-200 h-200 bg-F2CF40">

      </div>
    </van-popup>

    <!-- 付费房间提示 -->
    <van-popup v-model="paidVideoTip"
               close-on-click-overlay
               position="center"
               :style="{ height: '100%', width: '100%' }"
               class="flex items-center justify-center"
               style="background:transparent !important;"
               round>
      <!-- 增加蒙层颜色深度,拒绝白嫖 -->
      <div class="absolute top bottom right left flex items-center justify-center"
           style="background: rgba(0,0,0,0.7)">
        <div class="w-280 h-120 bg-white rounded-8 p-all-8 box-border flex flex-col">
          <div class="flex-1 flex flex-col">
            <div class="flex-1 fz-14 flex items-center justify-center relative">
              {{langSwitch('提示')}}
            </div>
            <div class="flex-1 bb-1px box-border fz-12 flex items-center justify-center">
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

    <div v-show="false">
      <van-count-down :time="TIMECOUNT*1000"
                      @change="TIMECOUNT_fn">
      </van-count-down>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Toast } from 'vant';
// ws消息解密
import protoRoot from '@/proto/proto';
import protobuf from 'protobufjs';
import lotteryBarrage from '@/views/widget/barrage/lotteryBarrage';
import socketEvent from "@/mixins/socketEvent";
import pageScrollEvent from "@/mixins/pageScrollEvent";
import { lottery8, lottery10, lottery14, lottery26, lottery28, lottery29, lottery30, lottery31 } from "@/components/lotteryGame";

export default {
  name: 'liveMask',
  components: {
    lotteryBarrage,
    lottery8,
    lottery10,
    lottery14,
    lottery26,
    lottery28,
    lottery29,
    lottery30,
    lottery31,
  },
  props: ['mSocket'],
  mixins: [socketEvent, pageScrollEvent],
  data () {
    return {
      liveMaskSlide: '',
      inner_liveMaskSlide: 'van-slide-right',
      innerVisible: true,
      innerVisible_bet: true,
      visible: true,
      isBetBool: false,
      // 弹框类
      zbmp_show: false,  // 主播名片
      other_user_show: false, // 用户信息名片
      current_user: '',
      report_user_show: false, // 举报
      report_content: '',
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
      bigTurntable_draw_active: 'djjl',
      bigTurntable_draw_obj: {},
      zwfImg: require("@/assets/images/zwf.png"),
      game_showShare: false, // 游戏
      gift_showShare: false, // 礼物
      gift_showShare_obj: '',
      gift_select_key: '',
      gift_current: '',
      redBag_showShare: false, // 红包
      redBag_radio: '1',
      redBag_total: '100',
      redBag_count: '10',
      redBag_text: '',
      redBag_checked: false,
      // 聊天列表信息
      live_content_msg: [],
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
      TIMECOUNT: ''
    };
  },
  watch: {
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch('加载中...'),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    },
    live_content_msg: {
      handler (val) {
        if (!!this.innerVisible && !!this.innerVisible_bet) {
          if (!!val && !!this.$refs.chat_element.scrollHeight) {
            let tiemr = setTimeout(() => {
              this.$refs.chat_element.scrollTop = this.$refs.chat_element.scrollHeight;
              clearTimeout(tiemr)
            }, 200) // 解决数据滚动相关
          }
        }
      },
      deep: true
    },
    // room_lottery_isTime (val) {
    //   let timer;
    //   if (!val) {
    //     timer = setTimeout(() => {
    //       this.room_lottery_isTime = true;
    //       this.room_lottery.time = 55;
    //       clearTimeout(timer);
    //     }, 5000)
    //   }
    // },
    innerVisible (val) {
      if (!val) this.lotteryBarrage_show = false;
    },
    innerVisible_bet (val) {
      if (!val) this.lotteryBarrage_show = false;
    },
    visible (val) {
      if (!val) this.lotteryBarrage_show = false;
    },
    isBetBool (val) {
      if (!val) {
        this.currentGameComponent = '';
      }
    }
  },
  created () {
    // console.log(JSON.parse(JSON.stringify(this.ANCHOR)));
    // console.log(JSON.parse(JSON.stringify(this.getters_getEnterRoom)));
    let { data } = this.getters_getTaskList;
    this.boxData = data;
    this.boxSetData = this.translateData(data);
    this.currentContentResult();
    // 用户停留时间
    this.stayTime_start = new Date();
  },
  beforeMount () { },
  mounted () {
    this.conn();
    this.broadcastingListen();
    // 检查付费
    this.checkPayRoom();
  },
  methods: {
    ...mapActions(['actions_getCheckLive', 'actions_getRoomCharge', 'actions_getTimeCharge', 'actions_getBalanceNew', 'actions_getLotteryList', 'actions_getBetting', 'actions_getBetViewInfo', 'actions_getSetAttent', 'actions_getSendGift', 'actions_getLuckydrawRecord', 'actions_getDoLuckydraw', 'actions_getLuckydraw', 'actions_getLiveContact', 'actions_getUserHome', 'actions_getSetReport', 'actions_getGuardList', 'actions_getDayGiftRank', 'actions_getEnterRoom', 'actions_getGiftList']),
    ...mapMutations(['mutations_rootStore', 'mutations_SET_REQUEST', 'mutations_publicTime']),
    TIMECOUNT_fn (timeData) {
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
      this.toRouter('live');
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
          }, 2000)
        } else {
          Toast(res.msg);
        }
      })
    },
    checkPayRoom () {
      let { stream, uid } = this.ANCHOR;
      let params = { liveuid: uid, stream, };
      this.actions_getCheckLive(params).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.currentRoom_type = res.info[0].type;
          if (res.info[0].type == 2 || res.info[0].type == 3) {
            this.paidVideoTip = true;
            this.paidVideoTip_msg = res.info[0].type_msg;
          }
        } else if (res.code == 1005) {
          // 用户直播已结束;
          Toast(res.msg);
          this.delayFn(() => {
            this.toRouter('live')
          }, 3000)
        } else {
          Toast(res.msg);
        }
      })
    },
    isBetBool_fn () {
      let { lottery_type } = this.ANCHOR;
      let live_id = this.ANCHOR.uid;
      // console.log(this.ANCHOR)
      // console.log(this.getters_getEnterRoom)
      // 针对关注列表字段缺失
      if (!lottery_type) {
        lottery_type = this.getters_getEnterRoom.roomLotteryInfo.lotteryType;
        let val = this.ANCHOR;
        val.lottery_type = lottery_type;
        this.mutations_rootStore({ key: 'ANCHOR', val })
      }
      let params = { lottery_type, live_id }
      this.actions_getBetViewInfo(params).then(res => {
        if (res.code == 0) {
          this.currentGameComponent = `lottery${lottery_type}`;
          this.isBetBool = true;
        }
      })
    },
    game_showShare_fn () {
      this.actions_getLotteryList().then(res => {
        if (res.code == 0) { this.game_showShare = true; }
      })
    },
    // room_lottery_isTime_fn (timeData) {
    //   this.deliveryTime = timeData.seconds;
    //   if (timeData.seconds < 1) {
    //     this.room_lottery_isTime = false;
    //   }
    // },
    submitMsg () {
      this.sendChatMessage();
    },
    sendGift () {
      if (!this.gift_current) {
        Toast(this.langSwitch('请选择礼物'))
        return;
      }
      // console.log(this.gift_current);
      this.sendGiftMessage();
      // this.actions_getSendGift().then(res => { console.log(res) })
    },
    selectGift (k, key) {
      this.gift_select_key = `${k}'giftItem'${key}`;
      this.gift_current = this.gift_showShare_obj.giftlist[(k * 8) + Number(key)];
    },
    // 中奖记录
    getDoLuckydraw () {
      // 初始化这个值
      this.bigTurntable_draw_active = 'djjl'
      let params = {
        record_type: 'all'
      }
      this.actions_getLuckydrawRecord(params).then(res => {
        if (res && res.code == 0) {
          this.bigTurntable_draw_obj['djjl'] = res && res.info[0].record;
          this.bigTurntable_draw_show = true;
        }
      })
      this.actions_getDoLuckydraw().then(res => {
        this.bigTurntable_draw_obj['wdjl'] = (res && res.info[0].record) || [];
        // this.bigTurntable_draw_show = true;
      })
    },
    // 大转盘抽奖，奖池派对
    bigTurntable () {
      this.actions_getLuckydraw().then(res => {
        this.bigTurntable_data = res && res.info[0];
        this.bigTurntable_show = true
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
      this.gift_showShare_obj = '';
      this.gift_select_key = ''
      this.gift_current = '';
      this.actions_getGiftList().then(res => {
        this.gift_showShare_obj = res && res.info[0];
        this.gift_showShare = true;
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
    liveroom_user (v) {
      // console.log(v);
      let touid = v.id || v.uid;
      this.actions_getUserHome({ touid }).then(res => {
        // console.log(res);
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
        this.innerVisible_bet = true;
        this.isBetBool = false;
        this.$bus.$emit('shareTime');  // 通知时间事件;
        this.delayFn(() => { this.room_lottery.time = this.getters_componentTime }, 200)
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
      if (!this.innerVisible_bet) {
        this.innerVisible_bet = true;
        return;
      }
      this.innerVisible = true;
    },
    upSlide () {
      if (this.isBetBool) return;
      if (this.innerVisible) return;
      if (this.visible == false) return;
      console.log('upSlide');
      let key = this.ANCHOR_KEY, maxL = this.ANCHOR_LIST.length, _this = this;
      if (key == maxL - 1) { key = 0 } else { key++ };

      this.liveMaskSlide = 'van-slide-down'
      this.disconnect()
      this.live_content_msg = [];
      this.barrage_list = [];
      this.stayTime_start = new Date();
      this.delayFn(() => {
        this.innerVisible = true;
        let val = _this.ANCHOR_LIST[key];
        _this.visible = false; _this.liveMaskSlide = 'van-slide-up'
        _this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
        _this.mutations_rootStore({ key: 'ANCHOR', val, })
        // 请求接口返回
        let { stream, uid } = val;
        let params = { liveuid: uid, stream, };
        this.actions_getEnterRoom(params).then(res => {
          _this.visible = true
          _this.conn()
        })

        this.clear_timekeeping_mode();
        this.checkPayRoom();

        this.$emit('changeClassRoom')

      }, 300)
    },
    downSlide () {
      if (this.isBetBool) return;
      if (this.innerVisible) return;
      if (this.visible == false) return;
      console.log('downSlide');
      let key = this.ANCHOR_KEY, maxL = this.ANCHOR_LIST.length, _this = this;
      if (key == 0) { key = maxL - 1 } else { key-- };

      this.liveMaskSlide = 'van-slide-up'
      this.disconnect()
      this.live_content_msg = []
      this.barrage_list = []
      this.stayTime_start = new Date();
      this.delayFn(() => {
        this.innerVisible = true;
        let val = _this.ANCHOR_LIST[key];
        _this.visible = false; _this.liveMaskSlide = 'van-slide-down'
        _this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
        _this.mutations_rootStore({ key: 'ANCHOR', val, })
        // 请求接口返回
        let { stream, uid } = val;
        let params = { liveuid: uid, stream, };
        this.actions_getEnterRoom(params).then(res => {
          _this.visible = true
          _this.conn()
        })

        this.clear_timekeeping_mode();
        this.checkPayRoom();

        this.$emit('changeClassRoom')

      }, 300)
    },
    // 蒙层上滑下滑事件;
    upSlide_inner () {
      if (this.isBetBool) return;
      if (this.visible == false) return;
      console.log('shang滑');
      let key = this.ANCHOR_KEY, maxL = this.ANCHOR_LIST.length, _this = this;
      if (key == maxL - 1) { key = 0 } else { key++ };

      this.liveMaskSlide = 'van-slide-down'
      this.disconnect()
      this.live_content_msg = []
      this.barrage_list = []
      this.stayTime_start = new Date();
      this.delayFn(() => {
        let val = _this.ANCHOR_LIST[key];
        _this.visible = false; _this.liveMaskSlide = 'van-slide-up'
        _this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
        _this.mutations_rootStore({ key: 'ANCHOR', val, })
        // 请求接口返回
        let { stream, uid } = val;
        let params = { liveuid: uid, stream, };
        this.actions_getEnterRoom(params).then(res => {
          _this.visible = true
          _this.conn()
        })

        this.clear_timekeeping_mode();
        this.checkPayRoom();

        this.$emit('changeClassRoom')

      }, 300)
    },
    downSlide_inner () {
      if (this.isBetBool) return;
      if (this.visible == false) return;
      console.log('xia滑');
      let key = this.ANCHOR_KEY, maxL = this.ANCHOR_LIST.length, _this = this;
      if (key == 0) { key = maxL - 1 } else { key-- };

      this.liveMaskSlide = 'van-slide-up'
      this.disconnect()
      this.live_content_msg = []
      this.barrage_list = [];
      this.stayTime_start = new Date();
      this.delayFn(() => {
        let val = _this.ANCHOR_LIST[key];
        _this.visible = false; _this.liveMaskSlide = 'van-slide-down'
        _this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
        _this.mutations_rootStore({ key: 'ANCHOR', val, })
        // 请求接口返回
        let { stream, uid } = val;
        let params = { liveuid: uid, stream, };
        this.actions_getEnterRoom(params).then(res => {
          _this.visible = true
          _this.conn()
        })

        this.clear_timekeeping_mode();
        this.checkPayRoom();

        this.$emit('changeClassRoom')

      }, 300)
    },
    rightSlide_inner () {
      if (this.isBetBool) return;
      this.innerVisible = false;
    },
    rightSlide_inner_bet () {
      this.innerVisible_bet = false;
    },
    // 连接房间聊天
    conn () {
      let { stream, uid } = this.ANCHOR;
      let event = this.WSEVENT['SOCKET_CONN'];
      let params = {
        uid: this.UID,
        token: this.TOKEN,
        liveuid: uid,
        roomnum: uid,
        stream,
        lang: this.LANG,
        is_enter_room: true
      }
      this.mSocket.emit(event, params);
    },
    // 重连
    // reConnect () {
    //   this.mSocket.on('reconnect', this.conn());
    // },
    // 退出房间聊天
    disconnect () {
      let event = this.WSEVENT['SOCKET_LEAVE_ROOM'], params = {};
      this.mSocket.emit(event, params);
    },
    // system_msg
    broadcastingListen () {
      const StreamMsg = protoRoot.lookup('common.StreamMsg');
      let event = this.WSEVENT['SOCKET_BROADCAST']
      this.mSocket.on(event, (rawResponse) => {
        let StreamMsg_buf = protobuf.util.newBuffer(rawResponse)
        let { msgID, msgData } = StreamMsg.decode(StreamMsg_buf);
        let msg_buf = protobuf.util.newBuffer(msgData);
        let msg_id = protoRoot.lookup(`s2c.${this.MSGID[msgID]}`);
        let result = msg_id.decode(msg_buf);
        // console.log(result);
        // 处理房间聊天室
        if (msgID == 0 || msgID == 1 || (msgID == 8 && result.msg.lotteryType == this.getters_getEnterRoom.roomLotteryInfo.lotteryType) || msgID == 33 || msgID == 17) {
          if (msgID == 0) {
            this.live_content_msg.unshift({ msgID, msgData: result })
          } else {
            this.live_content_msg.push({ msgID, msgData: result })
          }
        }
        if (msgID == 1 && result.msg.ct.id == this.UID) { this.self_info = result.msg.ct; } // 存贮用户信息

        // 处理房间彩种相关
        // console.log(this.getters_getEnterRoom.roomLotteryInfo.lotteryType); // 房间彩种
        if (msgID == 13 && result.msg.lotteryType == this.getters_getEnterRoom.roomLotteryInfo.lotteryType) {
          // console.log(result);
          this.room_lottery_isTime = true;
          this.room_lottery = result.msg.lotteryInfo;
          this.TIMECOUNT = result.msg.lotteryInfo.time;
        }

        if (msgID == 9 && result.msg.lotteryType == this.getters_getEnterRoom.roomLotteryInfo.lotteryType) {
          this.room_lottery.time = 59;
          this.room_lottery_isTime = true;
          this.TIMECOUNT = 59;
        }

        if (msgID == 2) {
          // console.log(result);
        }
        // 彩票弹幕
        if (msgID == 15) {
          // console.log(new Date())
          // console.log(result.msg.barrageArr);
          this.barrage_list = this.barrage_list.concat(result.msg.barrageArr);
        }
        // 礼物

        // 中奖
        if (msgID == 16) {
          console.log(result);
          this.actions_getBalanceNew();
        }

      })
    },
    updata_barrage_list (val) {
      this.barrage_list = val;
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
    betAssistant (params) {
      this.actions_getBetting(params).then((res) => {
        if (res.code == 0) { this.actions_getBalanceNew() } else {
          Toast(res.msg);
        }
      })
    },
    goToDoing (v) {
      if (v.completed != 0) return;
      let { name } = this.$route;
      if (v.id >= 21610) {
        if (name == 'recharge') { this.isBoxPopup = false; return; }
        this.toRouter('recharge')
      } else if (v.id >= 10000 && v.id < 21610) {
        if (name == 'game') { this.isBoxPopup = false; return; }
        this.toRouter('game')
      } else {
        if (name == 'mine') { this.isBoxPopup = false; this.$bus.$emit('init_mine_withdraw'); return; }
        this.toRouter('mine', {}, () => { this.$bus.$emit('init_mine_withdraw'); })
      }
    }
  },
  computed: {
    ...mapGetters(['getters_getLotteryList', 'getters_rootStore', 'getters_publicTime', 'getters_componentTime', 'MSGID', 'UID', 'TOKEN', 'LANG', 'WSEVENT', 'ANCHOR', 'ANCHOR_KEY', 'ANCHOR_LIST', 'getters_getEnterRoom', 'getters_getBaseInfo', 'getters_getConfig', 'getters_isAppending', 'getters_getTaskList']),
    // 主播名片
    zbmp_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'live_contact')
    },
    // 每日任务
    mrpj_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'task')
    },
    // 奖池派送
    jcpd_obj () {
      return this.getters_getEnterRoom.live_icon.filter(e => e.type == 'luckdraw')
    }
  },
  destroyed () {
    this.disconnect();
    this.clear_timekeeping_mode();
    this.mutations_publicTime('');
  }
}
</script>
<style lang='scss' scoped>
.liveMask {
  .van-notice-bar {
    height: 30px !important;
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
    background-color: #000000;
    color: #ffffff;
  }
  .active_gift {
    border-color: yellow !important;
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
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .bet-bg-img-header {
    background-image: url("~@/assets/images/lotteryBg/yfks_bgview_top.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>