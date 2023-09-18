<template>
  <div class='langSet absolute top bottom left right'>
    <van-radio-group v-model="langRadio">
      <van-cell-group>
        <van-cell :title="v.title"
                  clickable
                  v-for="(v, k) in langList"
                  :key=" k +'langList'"
                  @click="setLangRadio(v.value)">
          <template #right-icon>
            <van-radio :name="v.value" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { Locale } from 'vant';
import { en, id, ja, vi, zhCN, zhTW } from "@/locale/vant";
export default {
  name: 'langSet',
  components: {},
  props: [''],
  data () {
    return {
      langRadio: '',
      langList: [
        { title: '中文简体', value: 'zh-CN' },
        { title: '中文繁體', value: 'zh-TW' },
        { title: 'English', value: 'en' },
        { title: '日本語', value: 'ja' },
        { title: 'Tiếng Việt', value: 'vi' },
        { title: 'bahasa Indonesia', value: 'id' },
      ],

    };
  },
  watch: {},
  created () { },
  beforeMount () { },
  mounted () {
    this.langRadio = this.getters_rootStore.lang;
  },
  methods: {
    ...mapActions(['actions_rootStore']),
    ...mapMutations(['mutations_rootStore', 'mutations_SET_REQUEST']),
    setLangRadio (value) {
      let vantLocale = {
        'en': en,
        'ja': ja,
        'vi': vi,
        'id': id,
        'zh-CN': zhCN,
        'zh-TW': zhTW,
      }
      // vant 组件相关国际化
      Locale.use(value, vantLocale[value]);
      // 业务代码国际化
      this.$i18n.locale = value;
      this.mutations_rootStore({ key: 'lang', val: value });
      this.mutations_rootStore({ key: 'langSetAnimate', val: true });
      this.toRouter('home', { langSet: 'langSet' });
    },
  },
  computed: {
    ...mapGetters(['getters_rootStore']),
  },
}
</script>
<style lang='scss' scoped>
.langSet {
}
</style>