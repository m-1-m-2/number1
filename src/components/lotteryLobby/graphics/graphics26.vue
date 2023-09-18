<template>
  <div class='graphics26 absolute top left right bottom flex'
       ref="graphics26">
    <!-- 大小 -->
    <template v-if="selectIndex == 0">
      <div v-for="(val, key) in transList"
           class="h-96 w-16"
           :key="key+'transList'">
        <div class="w-16 h-16 flex items-center justify-center"
             v-for="(v, k) in val"
             :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
             :key="k + 'graphics26'">
          <div class="w-16 h-16 rounded flex items-center justify-center"
               :class="[v.spare_2[1] == langSwitch('大')? 'bg-red': 'bg-blue']">
            <div class="w-10 h-10 bg-white rounded line-10 text-center fz-9 cl-A4FE3B">
              <span v-if="v.die">{{v.die}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 单双 -->
    <template v-else>
      <div v-for="(val, key) in transList_odd_even"
           class="h-96 w-16"
           :key="key+'transList_1'">
        <div class="w-16 h-16 flex items-center justify-center"
             v-for="(v, k) in val"
             :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
             :key="k + 'graphics26'">
          <div class="w-16 h-16 rounded flex items-center justify-center"
               :class="[v.spare_2[2] == langSwitch('单')? 'bg-red': 'bg-blue']">
            <div class="w-10 h-10 bg-white rounded line-10 text-center fz-9 cl-A4FE3B">
              <span v-if="v.die">{{v.die}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'graphics26',
  components: {},
  props: ['list', 'selectIndex', 'openAwardData'],
  data () {
    return {
      transList: [],
      transList_odd_even: [],
      listIndexOne: '',
      // baozi: ['豹子1', '豹子2', '豹子3', '豹子4', '豹子5', '豹子6'],
      baozi: ['1,1,1', '2,2,2', '3,3,3', '4,4,4', ',5,5,5', '6,6,6'],
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
    this.transList_odd_even = this.transListFn_odd_even();

  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getOpenHistory']),
    transListFn () {
      let mid_el = {
        spare_2: [[], []]
      };
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 无和值  需要处理豹子
        if (key == 0) {
          if (this.baozi.includes(el.open_result)) {
            array[index] = [];
            array[index].push(el);
          } else {
            array[index] = [];
            array[index].push(el);
            mid_el = el;
          }
        } else {
          if (this.baozi.includes(el.open_result)) {
            array[index][array[index].length - 1]['die'] = el.open_result.substr(0, 1);
          } else {
            if (el.spare_2[1] == mid_el.spare_2[1]) {
              array[index].push(el);
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
      if (this.baozi.includes(array[0][0].open_result)) { array.splice(0, 1) }

      return array;
    },
    transListFn_odd_even () {
      let mid_el = {};
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 无和值
        if (key == 0) {
          if (this.baozi.includes(el.open_result)) {
            array[index] = [];
            array[index].push(el);
          } else {
            array[index] = [];
            array[index].push(el);
            mid_el = el;
          }
        } else {
          if (this.baozi.includes(el.open_result)) {
            array[index][array[index].length - 1]['die'] = el.open_result.substr(0, 1);
          } else {
            if (el.spare_2[2] == mid_el.spare_2[2]) {
              array[index].push(el);
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
      if (this.baozi.includes(array[0][0].open_result)) { array.splice(0, 1) }

      return array;
    },
    render_zstList () {
      let params = { page: 0, lottery_type: 26 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) {
          let listIndexOne = res.info.list[0];
          this.list.push(listIndexOne);
          let params = this.$refs.graphics26.scrollWidth;
          this.$emit('changeNumberVar', params)
          this.transList = this.transListFn();
          this.transList_odd_even = this.transListFn_odd_even();
        }
      })
    },
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.graphics26 {
}
</style>