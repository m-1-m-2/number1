<template>
  <div class='graphics30 absolute top left right bottom flex'
       ref="graphics30">
    <template v-if="selectIndex == 0">
      <div v-for="(val, key) in transList"
           class="h-96 w-16"
           :key="key+'transList'">
        <div class="w-16 h-16 flex items-center justify-center"
             v-for="(v, k) in val"
             :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
             :key="k + 'graphics30'">
          <div class="w-16 h-16 rounded flex items-center justify-center"
               :class="[isResultFn(v.open_result) == 0 ? 'bg-blue': isResultFn(v.open_result) == 1?'bg-red' :'']">
            <div class="w-10 h-10 bg-white rounded">
              <div v-if="v.die"
                   class="w-10 h-2 bg-green mt-4"
                   style="transform:rotate(-45deg)"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="selectIndex == 1">
      <div v-for="(val, key) in transList_1"
           class="h-96 w-16"
           :key="key+'transList_1'">
        <div class="w-16 h-16 flex items-center justify-center"
             v-for="(v, k) in val"
             :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
             :key="k + 'graphics30'">
          <div class="w-16 h-16 rounded flex items-center justify-center"
               :class="[isResultFn_1(v.open_result) == 0 ? 'bg-blue': isResultFn_1(v.open_result) == 1?'bg-red' :'']">
            <div class="w-10 h-10 bg-white rounded">
              <div v-if="v.die"
                   class="w-10 h-2 bg-green mt-4"
                   style="transform:rotate(-45deg)"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(val, key) in transList_2"
           class="h-96 w-16"
           :key="key+'transList_2'">
        <div class="w-16 h-16 flex items-center justify-center"
             v-for="(v, k) in val"
             :class="[k >=6 ? `absolute left-${16*(key + (k-5))} top-80`:'']"
             :key="k + 'graphics30'">
          <div class="w-16 h-16 rounded flex items-center justify-center"
               :class="[isResultFn_2(v.open_result) == 0 ? 'bg-green': isResultFn_2(v.open_result) == 1?'bg-blue' :isResultFn_2(v.open_result) == 3?'bg-red' :'']">
            <div class="w-10 h-10 bg-white rounded">
              <div v-if="v.die"
                   class="w-10 h-2 bg-green mt-4"
                   style="transform:rotate(-45deg)"></div>
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
  name: 'graphics30',
  components: {},
  props: ['list', 'selectIndex', 'openAwardData'],
  data () {
    return {
      transList: [],
      transList_1: [],
      transList_2: [],
      // 32,4,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3
      // 15,19,2,17,6,13,11,8,10,24,33,20,31,22,29,28,35,26
      red_list: ['32', '4', '21', '25', '34', '27', '36', '30', '23', '5', '16', '1', '14', '9', '18', '7', '12', '3'],
      black_list: ['15', '19', '2', '17', '6', '13', '11', '8', '10', '24', '33', '20', '31', '22', '29', '28', '35', '26'],
      history_index: [],
      list_a: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      list_b: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',],
      list_c: ['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'],
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
    this.transList_1 = this.transListFn_1();
    this.transList_2 = this.transListFn_2();
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getOpenHistory']),
    transListFn () {
      let mid_el = { open_result: '' };
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 轮盘
        if (key == 0) {
          if (this.isResultFn(el.open_result) == 2) {
            array[index] = []
            array[index].push(el)
          } else {
            array[index] = []
            array[index].push(el)
            mid_el = el;
          }
        } else {
          if (this.isResultFn(el.open_result) == 2) {
            array[index][array[index].length - 1]['die'] = true;
          } else {
            if (this.isResultFn(el.open_result) == this.isResultFn(mid_el.open_result)) {
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
      if (this.isResultFn(array[0][0].open_result) == 2) { array.splice(0, 1) }
      return array;
    },
    isResultFn (result) {
      if (result == 0) {
        return 2
      } else if (result > 18) {
        return 1
      } else if (result <= 18 && result > 0) {
        return 0
      }
    },
    transListFn_1 () {
      let mid_el = { open_result: '' };
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 轮盘
        if (key == 0) {
          if (this.isResultFn_1(el.open_result) == 2) {
            array[index] = []
            array[index].push(el)
          } else {
            array[index] = []
            array[index].push(el)
            mid_el = el;
          }
        } else {
          if (this.isResultFn_1(el.open_result) == 2) {
            array[index][array[index].length - 1]['die'] = true;
          } else {
            if (this.isResultFn_1(el.open_result) == this.isResultFn_1(mid_el.open_result)) {
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
      if (this.isResultFn_1(array[0][0].open_result) == 2) { array.splice(0, 1) }
      return array;
    },
    isResultFn_1 (result) {
      if (result == 0) {
        return 2
      } else if (this.red_list.includes(result)) {
        return 1
      } else if (this.black_list.includes(result)) {
        return 0
      }
    },
    transListFn_2 () {
      let mid_el = { open_result: '' };
      let array = [];
      let index = 0;
      this.list.forEach((el, key) => {
        // 轮盘
        if (key == 0) {
          if (this.isResultFn_2(el.open_result) == 2) {
            array[index] = []
            array[index].push(el)
          } else {
            array[index] = []
            array[index].push(el)
            mid_el = el;
          }
        } else {
          if (this.isResultFn_2(el.open_result) == 2) {
            array[index][array[index].length - 1]['die'] = true;
          } else {
            if (this.isResultFn_2(el.open_result) == this.isResultFn_2(mid_el.open_result)) {
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
      // console.log(array);
      // 处理数组第一项为和值集合
      if (this.isResultFn_2(array[0][0].open_result) == 2) { array.splice(0, 1) }
      return array;
    },
    isResultFn_2 (result) {
      if (result == 0) {
        return 2
      } else if (this.list_a.includes(result)) {
        return 1
      } else if (this.list_b.includes(result)) {
        return 0
      } else if (this.list_c.includes(result)) {
        return 3
      }
    },
    render_zstList () {
      let params = { page: 0, lottery_type: 30 }
      this.actions_getOpenHistory(params).then((res) => {
        if (res.code == 0) {
          let listIndexOne = res.info.list[0];
          this.list.push(listIndexOne);
          let params = this.$refs.graphics30.scrollWidth;
          this.$emit('changeNumberVar', params)
          this.transList = this.transListFn();
          this.transList_1 = this.transListFn_1();
          this.transList_2 = this.transListFn_2();
        }
      })
    }
  },
  computed: {}
}
</script>
<style lang='scss' scoped>
.graphics30 {
}
</style>