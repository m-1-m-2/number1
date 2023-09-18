<template>
  <div class='result8 absolute top bottom left right flex items-center justify-end'>
    <div class="flex items-center">
      <div v-for="(v,k) in result.split(',')"
           :key="k +'result8'">
        <div class="h-20 w-20 bg-black rounded fz-12 line-20 text-center mr-1"
             :class="[blue.includes(v)?'bg-blue':'',green.includes(v)?'bg-green':'',red.includes(v)?'bg-red':'']"
             v-if="k != 6">
          {{v < 9? '0':''}}{{v}}
        </div>
      </div>
      <div class="ml-3 mr-4 fz-20">+</div>
      <div class="h-20 w-20 bg-black rounded fz-12 line-20 text-center"
           :class="[blue.includes(result.split(',')[6])?'bg-blue':'',green.includes(result.split(',')[6])?'bg-green':'',red.includes(result.split(',')[6])?'bg-red':'']">
        {{result.split(',')[6] < 9? '0':''}}{{result.split(',')[6]}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result8',
  components: {},
  props: ['result'],
  data () {
    return {
      blue: ['3', '4', '9', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
      green: ['5', '6', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'],
      red: ['1', '2', '7', '8', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    };
  },
  watch: {},
  created () {
    // console.log(this.result);
  },
  beforeMount () { },
  mounted () { },
  methods: {},
  computed: {}
}
</script>
<style lang='scss' scoped>
.result8 {
}
</style>