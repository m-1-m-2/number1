<template>
  <div class='editInfoPopup'>
    <van-popup v-model="isShow"
               position="right"
               :style="{ height: '100%',width: '100%' }">
      <template v-if="isShow">
        <div class="h-36 w-full box-border bb-1px">
          <div class="w-full h-36 flex box-border">
            <div class="w-36 h-36 flex items-center">
              <van-icon @click="$emit('changeIsShow')"
                        size="20"
                        name="arrow-left" />
            </div>
            <div class="flex-1 fz-14 flex items-center justify-center">
              {{ editInfoContent[options.pKey].title}}
            </div>
            <div class="w-36 h-36 line-36 text-center fz-14">
              <span class="cl-red"
                    @click="saveInfo"
                    v-if="editInfoContent[options.pKey].isSave"> {{langSwitch('保存')}}</span>
            </div>
          </div>
        </div>

        <div class="absolute bottom left right top-36 bg-f4f4f4">
          <van-field v-model="editInputValue"
                     clearable
                     autofocus
                     v-if="editInfoContent[options.pKey].isSave"
                     class="bb-1px box-border" />
          <div class="fz-12 pl-16"
               v-if="options.pKey =='sign'">
            <div class="h-18 line-18">{{langSwitch('最多输入20个字')}}</div>
          </div>
          <div class="fz-12 pl-16"
               v-if="options.pKey =='nickname'">
            <div class="h-18 line-18">{{langSwitch('本次为首次修改，修改免费')}}</div>
            <div class="h-18 line-18">{{langSwitch('昵称最多8个字')}}</div>
            <div class="h-18 line-18">{{langSwitch('每次需花费0钻石（首次修改免费）')}}</div>
          </div>
          <!-- 我的名片 -->
          <div class="absolute top bottom left right bg-white"
               v-if="options.pKey == 'card'">
            <div>
              <div v-for="(v,k) in  getters_getBaseInfo. app_list"
                   :key="k+'app_list'"
                   class="flex h-44 fz-12 line-44">
                <div class="w-44 h-44 flex items-center justify-center">
                  <img src=""
                       class="w-36 h-36"
                       alt="">
                </div>
                <div class="w-fit px-4">{{v.app_name}}</div>
                <div class="flex-1 bb-1px box-border flex justify-end">
                  <van-field v-model="cardJSON[`${v.id}`]"
                             clearable
                             :placeholder="langSwitch('未填写')"
                             class="fz-12"
                             input-align="right">
                    <template #button>
                      <van-button size="small"
                                  @click="cardInfoSave(v.id)"
                                  color="linear-gradient(to right, #ff6034, #ee0a24)">{{langSwitch('保存')}}</van-button>
                    </template>
                  </van-field>
                </div>
              </div>
            </div>
          </div>
          <!-- 主播印象 -->
          <div class="absolute top bottom left right bg-white"
               v-if="options.pKey == 'impression'">
            <div class="w-full flex flex-col justify-center items-center fz-12">
              <div v-if="list_data && list_data.every(el=>el.ifcheck == 0)"
                   class="fz-12 line-20 h-20 text-center mt-16 cl-a8a8a8">{{langSwitch('你暂时还没有收到主播印象')}}</div>
              <div class="w-280"
                   v-else>
                <template v-for="(v) in list_data">
                  <span class="pl-8 pr-8 pt-4 pb-4 rounded-4 mr-10 inline-block mb-10 ba-1px"
                        :style="{'color': v.colour,'borderColor': v.colour, '--bgcolor': v.colour}"
                        :class="[v.ifcheck == 1? 'active': '']"
                        :key="v.id">{{v.name}}</span>
                </template>
              </div>
            </div>
          </div>
          <!-- 性别 -->
          <div class="absolute top bottom left right bg-white"
               v-if="options.pKey == 'sex'">
            <div class="">
              <div class="mt-120 flex items-center justify-center">
                <img :src="require(`@/assets/images/choice_${isMale?'male':'unmale'}.png`)"
                     class="h-48 w-48"
                     @click="sexSave(true)"
                     alt="">
              </div>
              <div class="mt-120 flex items-center justify-center">
                <img :src="require(`@/assets/images/choice_${!isMale?'female':'unfemale'}.png`)"
                     class="h-48 w-48"
                     @click="sexSave(false)"
                     alt="">
              </div>
            </div>
          </div>
          <!-- 绑定手机 -->
          <div class="absolute top bottom left right bg-white"
               v-if="options.pKey == 'phoneNumber'">
            <bindPhone></bindPhone>
          </div>
        </div>
      </template>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapGetters, mapActions } from 'vuex';
import { bindPhone } from "@/views/mineWidget"
export default {
  name: 'editInfoPopup',
  components: { bindPhone },
  props: ['isShow', 'options'],
  data () {
    return {
      editInfoContent: {
        nickname: { title: this.langSwitch('昵称'), isSave: true, max: 8 },
        sign: { title: this.langSwitch('签名'), isSave: true, max: 20 },
        card: { title: this.langSwitch('我的名片'), isSave: false, max: 20 },
        impression: { title: this.langSwitch('主播印象'), isSave: false, max: 20 },
        sex: { title: this.langSwitch('性别'), isSave: false, max: 20 },
        phoneNumber: { title: this.langSwitch('绑定手机'), isSave: false, max: 20 },
      },
      editInputValue: '',
      isMale: '',
      cardJSON: '',
      list_data: '',
    };
  },
  watch: {
    isShow (v) {
      if (v && this.options.pKey == "impression") {
        let params = {};
        params.touid = this.UID;
        this.actions_getUserLabel(params).then((res) => {
          console.log(res);
          this.list_data = res.info
        })
      }
      if (!v) {
        this.clearData();
      } else {
        // console.log(this.options)
        this.editInputValue = this.options.pValue;
        this.isMale = this.options.pValue == 1 ? true : false;
      }
      if (v && this.options.pKey == 'card') {
        this.cardJSON = this.cardJSONFn();
      }
    },
    getters_isAppending (val) {
      val ? this.$toast.loading({
        message: this.langSwitch("加载中..."),
        duration: 0,
        forbidClick: true
      }) : this.$toast.clear();
    }
  },
  created () {
    // console.log(this.options)
  },
  beforeMount () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapActions(['actions_getUserLabel', 'actions_postUpdateFields', 'actions_getBaseInfo', 'actions_postSaveContact']),
    saveInfo () {
      // console.log(this.options)
      let { pKey, pValue } = this.options;
      this[`${pKey}Save`]();
    },
    clearData () {
      this.editInputValue = '';
    },
    nicknameSave () {
      if (this.editInputValue.length > 8) {
        Toast(this.langSwitch('字数超出限制'));
        return;
      } else {
        let fields = JSON.stringify({
          user_nicename: this.editInputValue
        });
        this.upDataInfo(fields);
      }
    },
    signSave () {
      if (this.editInputValue.length > 20) {
        Toast(this.langSwitch('字数超出限制'));
        return;
      } else {
        let fields = JSON.stringify({
          signature: this.editInputValue
        });
        this.upDataInfo(fields);
      }
    },
    cardInfoSave (id) {
      if (!this.cardJSON[id]) {
        Toast(this.langSwitch('请输入内容'));
        return
      }
      if (this.cardJSON[id] && this.cardJSON[id] != this.getters_getBaseInfo.app_list[id - 1].info) {
        let contact = this.cardJSON[id];
        let params = { contact, id };
        let formData = this.postParamsToFormData(params);
        this.actions_postSaveContact(formData).then((res) => {
          if (res.code == 0) {
            Toast(`${this.getters_getBaseInfo.app_list[id - 1].app_name}${this.langSwitch('保存成功')}`)
          } else {
            Toast(res.msg)
          }
        })
      } else {
        Toast(`${this.getters_getBaseInfo.app_list[id - 1].app_name}${this.langSwitch('保存成功')}`)
      }
    },

    cardSave () {
      // let requestID = []
      // Object.keys(this.cardJSON).forEach(key => {
      //   requestID[key - 1] = true;
      //   if (this.cardJSON[key] && this.cardJSON[key] != this.getters_getBaseInfo.app_list[key - 1].info) {
      //     let contact = this.cardJSON[key];
      //     let id = key;
      //     let params = { contact, id };
      //     let formData = this.postParamsToFormData(params);
      //     requestID[key - 1] = false;
      //     if (key - 1 == 0) {
      //       this.actions_postSaveContact(formData).then((res) => {
      //         if (res.code == 0) {
      //           requestID[key - 1] = true;
      //         }
      //       })
      //     } else {

      //     }
      //   }
      // });
      // this.delayFn(() => {
      //   this.check_requestID(requestID);
      // }, 1500)
    },
    impressionSave () {

    },
    sexSave (bool) {
      if (this.isMale == bool) {
        Toast(this.langSwitch('当前无需更改'));
        return
      } else {
        let fields = JSON.stringify({
          sex: bool ? 1 : 2
        })
        this.upDataInfo(fields);
      }
    },
    upDataInfo (fields) {
      let params = { fields };
      let formData = this.postParamsToFormData(params);
      this.actions_postUpdateFields(formData).then(res => {
        if (res.code == 0) {
          Toast(res.info[0].msg);
          this.upDataRender();
        } else {
          Toast(res.msg);
        }
      })
    },
    upDataRender () {
      this.delayFn(() => {
        this.actions_getBaseInfo().then((res) => {
          this.$emit('changeIsShow')
        })
      }, 1000)
    },
    check_requestID (requestID) {
      // let bool = requestID.every(el => el == true)
      // if (bool) {
      //   Toast('保存成功');
      //   this.upDataRender();
      // } else {
      //   Toast('保存失败')
      //   this.upDataRender();
      // }
    },
    cardJSONFn () {
      let obj = {}
      this.getters_getBaseInfo.app_list.forEach((el) => {
        obj[el.id] = el.info;
      })
      return obj;
    }
  },
  computed: {
    ...mapGetters(['getters_getBaseInfo', 'UID', 'getters_isAppending']),
  }
}
</script>
<style lang='scss' scoped>
.editInfoPopup {
  .active {
    color: white !important;
    background: var(--bgcolor);
  }
}
</style>