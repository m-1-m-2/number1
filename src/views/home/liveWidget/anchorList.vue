<template>
  <div class='anchorList'>
    <van-row type="flex">
      <van-col span="12"
               class="flex items-center justify-center"
               v-for="(v,k) in list"
               :key="k + 'anchorList'">
        <div class="w-full h-186 flex items-center justify-center p-all-2 box-border"
             @click="enterRoom(v,k)">
          <div class="w-full h-182 rounded-10 scroll-hide relative">
            <van-image :src="v.thumb"
                       class="w-full h-full"
                       fit="cover"
                       v-lazy
                       v-once>
              <template v-slot:loading>
                <van-loading type="spinner"
                             size="20" />
              </template>
            </van-image>
            <div class="absolute top left cl-white fz-12 p-all-2 pl-8 pr-8"
                 v-if="v.lottery_name"
                 style="background: linear-gradient(to right, #EF4B8D ,#9988ff); border-top-right-radius: 2px; border-bottom-right-radius:14px;">{{v.lottery_name}}</div>
            <div class="absolute top-20 left h-20 w-full flex fz-12 cl-white">
              <div class="pl-4"
                   v-if="v.live_region_icon">
                <img :src="v.live_region_icon"
                     class="h-20 w-20"
                     alt="">
              </div>
              <div class="fz-12 line-20 pl-4">
                {{v.live_region}}
              </div>
            </div>
            <div class="absolute top-2 right w-60 h-20"
                 v-if="v.type == 2 || v.type == 3">
              <img :src="classroomType(v.type)"
                   class="w-full h-full"
                   alt="">
            </div>
            <div class="absolute bottom-20 left-4 cl-white fz-12">{{v.title}}</div>
            <div class="absolute bottom-4 left-4 cl-orange fz-12">{{v.user_nicename}}</div>
            <div class="absolute bottom-4 right-4 cl-white fz-12">
              <van-icon name="fire"
                        color='red' />
              {{v.nums}}
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  name: 'anchorList',
  components: {},
  props: ['list'],
  data () {
    return {
    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getEnterRoom']),
    ...mapMutations(['mutations_rootStore']),
    classroomType (type) {
      // let M = new Map([['2', '付费房间'], ['3', '计时房间']])
      // return M.get(type) || "";
      return require(`@/assets/images/multiLanguage/${this.LANG}/${this.LANG}_live_${type}.png`)
    },
    enterRoom (val, key) {
      this.mutations_rootStore({ key: 'ANCHOR', val, })
      this.mutations_rootStore({ key: 'ANCHOR_KEY', val: key, })
      this.mutations_rootStore({ key: 'ANCHOR_LIST', val: this.list, })

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
  },
  computed: {
    ...mapGetters(['LANG']),
    max_length () {
      return this.list.length || 0;
    }
  }
}
</script>
<style lang='scss' scoped>
.anchorList {
}
</style>