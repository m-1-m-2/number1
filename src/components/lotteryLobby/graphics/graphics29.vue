<template>
  <div class='graphics29 absolute top left right bottom flex'
       ref="graphics29">
    <div v-for="(val, key) in transList"
         class="h-96 w-16"
         :key="key+'transList'">
      <div class="w-16 h-16 flex items-center justify-center"
           v-for="(v, k) in val"
           :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
           :key="k + 'graphics29'">
        <div class="w-16 h-16 rounded flex items-center justify-center"
             :class="[v.who_win == 0 ? 'bg-blue': v.who_win == 1?'bg-green' :'bg-red']">
          <div class="w-10 h-10 bg-white rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'graphics29',
  components: {},
  props: ['list', 'openAwardData'],
  data () {
    return {
      transList: []
    };
  },
  watch: {
    openAwardData (v) {
      if (v) {
        this.render_zstList();
      }
    }
  },
  created () {
    // console.log(this.list)
    this.list.reverse();
    this.transList = this.transListFn();
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getOpenHistory']),
    transListFn () {
      let mid_el = {};
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 无和值
        if (key == 0) {
          array[index] = []
          array[index].push(el)
          mid_el = el;
        } else {
          if (el.who_win == mid_el.who_win) {
            array[index].push(el)
          } else {
            index++;
            array[index] = []
            array[index].push(el)
            mid_el = el;
          }
        }
      });
      // console.log(array)

      return array;
    },
    render_zstList () {
      let params = { page: 0, lottery_type: 29 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) {
          let listIndexOne = res.info.list[0];
          this.list.push(listIndexOne);
          let params = this.$refs.graphics29.scrollWidth;
          this.$emit('changeNumberVar', params)
          this.transList = this.transListFn();
        }
      })
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.graphics29 {
}
</style>