<template>
  <div class='guardRank cl-black fz-12'>
    <div class="w-full h-36 flex box-border bb-1px cl-black">
      <div class="w-36 h-36 flex items-center justify-center">
        <van-icon @click="$emit('isDetailsShowFn')"
                  size="20"
                  name="arrow-left" />
      </div>
      <div class="flex-1 fz-14 flex items-center justify-center">
        {{title}}
      </div>
      <div class="w-36 h-36 line-36 text-center">
      </div>
    </div>
    <div class="absolute top-36 bottom left right scroll-y">
      <div class="h-200 w-full flex flex-col"
           v-if="list_data.length != 0">
        <div class="h-130 flex items-center justify-center">
          <div class="w-160 h-120 relative flex justify-center">
            <div class="w-60 h-60 rounded bg-red relative top-46 left scroll-hide">
              <img :src="zwfImg"
                   v-real-img="list_data[0].avatar_thumb"
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
              {{list_data[0].user_nicename}}
            </div>
            <div class="h-20 flex items-center justify-center">
              <div>
                <img class="h-12 w-12 ml-4"
                     :src="list_data[0].sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                <img class="h-12 w-26 ml-4"
                     :src="list_data[0].level > 0 && getters_getConfig.level[list_data[0].level-1].thumb">
              </div>
            </div>
            <div class="h-20 text-center line-20 fz-12">
              本周贡献 <span class="cl-F2CF40">{{list_data[0].contribute}}</span> {{langSwitch('钻石')}}
            </div>
          </div>
        </div>
      </div>
      <div class="px-8 w-full box-border">
        <div v-for="(v, k) in list_data"
             :key="k + 'guard'">
          <div class="w-full h-52 py-8 flex bb-1px box-border"
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
           v-if="list_data.length == 0">
        <div class="h-130 flex items-center justify-center">
          <div class="w-160 h-120 relative flex justify-center">
            <img :src="require(`@/assets/images/multiLanguage/${LANG}/${LANG}_xwyd.png`)"
                 class="w-full h-full z-index-2 absolute"
                 alt="">
          </div>
        </div>
        <div class="h-24 cl-a8a8a8 flex flex-col justify-center items-center">
          <div>成为TA的第一个守护</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'guardRank',
  components: {},
  props: ['touid'],
  data () {
    return {
      title: this.langSwitch('守护榜'),
      list_data: [],
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {},
  created () {
    let params = {}
    params.liveuid = this.touid;
    this.actions_getGuardList(params).then(res => {
      this.list_data = res.info
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getGuardList'])
  },
  computed: {
    ...mapGetters(['getters_getConfig', 'LANG'])
  }
}
</script>
<style lang='scss' scoped>
.guardRank {
}
</style>