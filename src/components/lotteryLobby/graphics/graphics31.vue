<template>
  <div class='graphics31 absolute top left right bottom flex'
       ref="graphics31">
    <div v-for="(val, key) in transList"
         class="h-96 w-16"
         :key="key+'transList'">
      <div class="w-16 h-16 flex items-center justify-center"
           v-for="(v, k) in val"
           :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
           :key="k + 'graphics31'">
        <div class="w-16 h-16 rounded flex items-center justify-center"
             :class="[v.who_win == 1? 'bg-red': v.who_win == 0?'bg-blue' :'']">
          <div class="w-10 h-10 bg-white rounded">
            <div v-if="v.die"
                 class="w-10 h-2 bg-green mt-4"
                 style="transform:rotate(-45deg)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'graphics31',
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
      let mid_el = { who_win: '' };
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 龙虎 和值
        if (key == 0) {
          if (el.who_win == 2) {
            array[index] = []
            array[index].push(el)
          } else {
            array[index] = []
            array[index].push(el)
            mid_el = el;
          }
        } else {
          if (el.who_win == 2) {
            array[index][array[index].length - 1]['die'] = true;
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
        }
      });
      // console.log(array)
      // 处理数组第一项为和值集合
      if (array[0][0].who_win == 2) { array.splice(0, 1) }

      return array;
    },
    render_zstList () {
      let params = { page: 0, lottery_type: 31 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) {
          let listIndexOne = res.info.list[0];
          this.list.push(listIndexOne);
          let params = this.$refs.graphics31.scrollWidth;
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
.graphics31 {
}
</style>