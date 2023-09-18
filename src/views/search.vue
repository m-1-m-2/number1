<template>
  <div class='search absolute top bottom left right'>
    <div class="w-full h-44">
      <van-search v-model="value"
                  show-action
                  shape="round"
                  :placeholder="langSwitch('请输入您要搜索的昵称或ID')"
                  @input="inputDebounce"
                  @cancel="toBack()" />
    </div>
    <div class="w-full absolute top-44 bottom left right pt-8 box-border">
      <template v-if="!!searchInfo && searchInfo.length != 0">
        <div class="h-50 w-full px-10 box-border flex"
             v-for="(v,k) in searchInfo"
             @click="goToAnchorDetails(v)"
             :key="k + 'searchInfo'">
          <div class="w-50 h-50 rounded">
            <img :src="zwfImg"
                 v-real-img="v.avatar"
                 class="w-full h-full rounded"
                 alt="">
          </div>
          <div class="flex-1 h-50 px-8 box-border">
            <div class="w-full h-24 line-24 mt-1 fz-14 bolder flex items-center">
              {{v.user_nicename}}
              <div class="flex">
                <img class="h-12 w-12 ml-4"
                     :src="v.sex==1?require('@/assets/images/sex_man@2x.png'):require('@/assets/images/sex_woman@2x.png')">
                <img class="h-12 w-26 ml-4"
                     :src="v.level_anchor > 0 && getters_getConfig.levelanchor[v.level_anchor-1].thumb" />
                <img class="h-12 w-26 ml-4"
                     :src="v.level > 0 && getters_getConfig.level[v.level-1].thumb" />
              </div>
            </div>
            <div class="w-full h-24 line-24 mt-1 fz-12">
              {{v.signature}}
            </div>
          </div>
          <div class="w-60 fz-12 flex items-center justify-center cl-yellow">
            <div class="pt-4 pb-4 pl-10 pr-10 ba-1px rounded-12"
                 @click.stop="toAttention(v)"
                 style="border-color:yellow;">
              {{v.isattention == 0 ? langSwitch('关注'): langSwitch('已关注')}}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="absolute top bottom left right flex items-center justify-center">
          <!-- 搜索提示 -->
          <van-empty image="search"
                     :description="langSwitch('未搜索到相关内容')" />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { VueDebounce } from '@/common/js/utils'
import { Toast } from 'vant';

export default {
  name: 'search',
  props: [''],
  data () {
    return {
      value: '',
      searchInfo: '',
      zwfImg: require("@/assets/images/zwf_1.png"),
    };
  },
  watch: {
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    },
  },
  created () {

  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getSearch', 'actions_rootStore', 'actions_getUserHome', 'actions_getSetAttent']),
    onInput () {
      // 搜索优化
      if (!this.value) return;
      let payload = {
        key: this.value
      }
      this.actions_getSearch(payload).then(res => {
        this.searchInfo = res.info;
      });
    },
    inputDebounce: VueDebounce('onInput', 1000),
    goToAnchorDetails (v) {
      let touid = v.id || v.uid;
      this.toRouter('anchorDetails', { touid })
    },
    toAttention (v) {
      let params = { touid: v.id }
      this.actions_getSetAttent(params).then(res => {
        if (res.code == 0) {
          v.isattention = res.info[0].isattent;
        } else {
          Toast(res.msg);
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getters_isAppending', 'getters_getConfig']),
  }
}
</script>
<style lang='scss' scoped>
.search {
}
</style>