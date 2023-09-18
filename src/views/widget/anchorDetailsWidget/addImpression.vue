<template>
  <div class='addImpression fz-12'>
    <div class="w-full h-36 flex box-border bb-1px cl-black">
      <div class="w-36 h-36 flex items-center justify-center">
        <van-icon @click="$emit('isDetailsShowFn')"
                  size="20"
                  name="arrow-left" />
      </div>
      <div class="flex-1 fz-14 flex items-center justify-center">
        {{title}}
      </div>
      <div class="w-36 h-36 line-36 text-center cl-orange"
           @click="saveFn">
        {{langSwitch('保存')}}
      </div>
    </div>
    <div class="absolute top-36 bottom left right cl-a8a8a8 fz-14 text-center">
      <div class="h-60 line-60">{{langSwitch('请你选择你对主播的印象')}}</div>
      <div class="w-full flex justify-center">
        <div class="w-280">
          <span class="pl-8 pr-8 pt-4 pb-4 rounded-4 mr-10 inline-block mb-10 ba-1px"
                v-for="(v) in list_data"
                :style="{'color': v.colour,'borderColor': v.colour, '--bgcolor': v.colour}"
                :class="[v.ifcheck == 1? 'active': '']"
                @click="select_items(v)"
                :key="v.id">{{v.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  name: 'addImpression',
  components: {},
  props: ['touid'],
  data () {
    return {
      title: this.langSwitch('主播印象'),
      list_data: '',
      selected_options: []
    };
  },
  watch: {

  },
  created () {
    this.actions_getUserLabel({ touid: this.touid }).then(res => {
      this.list_data = res.info;
    })
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getUserLabel', 'actions_getSetUserLabel']),
    select_items (v) {
      let { id, ifcheck } = v;
      if (ifcheck == 0) {
        this.selected_options.push(id);
        if (this.selected_options.length > 3) {
          Toast(this.langSwitch('最多选择三项'));
          this.selected_options.splice(-1, 1);
          return;
        }
        v.ifcheck = 1;
      } else {
        this.selected_options.splice(this.selected_options.indexOf(id), 1)
        v.ifcheck = 0;
      }
    },
    // 保存方法
    saveFn () {
      if (this.selected_options.length == 0) return;
      let params = {};
      params.touid = this.touid;
      params.labels = this.selected_options;
      this.actions_getSetUserLabel(params).then((res) => {
        if (res.code == 0) Toast(res.msg);
        this.$emit('isDetailsShowFn');
      })
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.addImpression {
  .active {
    color: white !important;
    background: var(--bgcolor);
  }
}
</style>