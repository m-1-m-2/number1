<template>
  <div class='editInfo'>
    <div class=" box-border w-full">
      <van-cell-group>
        <!-- avatar -->
        <van-cell :title="langSwitch('头像')"
                  @click="avatar_input = true">
          <template #right-icon>
            <div class="w-24 h-24 relative">
              <img class="w-32 h-32 rounded absolute"
                   style="top:-4px"
                   :src="getters_getBaseInfo.avatar_thumb"
                   alt="">
            </div>
          </template>
        </van-cell>
        <van-cell :title="langSwitch('昵称')"
                  :value="getters_getBaseInfo.user_nicename"
                  @click="showEditInfoPopup('nickname',getters_getBaseInfo.user_nicename)"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('手机号')"
                  :value="getters_getBaseInfo.isBindMobile ? getters_getBaseInfo.user_login:langSwitch('未绑定手机')"
                  :value-class="[getters_getBaseInfo.isBindMobile?'cl-black-i':'']"
                  @click="showEditInfoPopup('phoneNumber',getters_getBaseInfo.isBindMobile)"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('签名')"
                  :value="getters_getBaseInfo.signature"
                  @click="showEditInfoPopup('sign',getters_getBaseInfo.signature)"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('我的名片')"
                  @click="showEditInfoPopup('card','')"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('生日')"
                  @click="isBirthdayShow = true"
                  :value="getters_getBaseInfo.birthday"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('性别')"
                  :value="getters_getBaseInfo.sex == 1? langSwitch('男'):langSwitch('女')"
                  @click="showEditInfoPopup('sex',getters_getBaseInfo.sex)"
                  is-link>
        </van-cell>
        <van-cell :title="langSwitch('我的主播印象')"
                  @click="showEditInfoPopup('impression','')"
                  is-link>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- popup -->
    <editInfoPopup :isShow="isShow"
                   :options="options"
                   @changeIsShow="isShow = false"></editInfoPopup>

    <!-- 日期组件 -->
    <van-popup v-model="isBirthdayShow"
               position="bottom"
               :style="{ height: '40%',width: '100%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           :title="langSwitch('选择年月日')"
                           @confirm="isBirthdayShowFn"
                           @cancel="isBirthdayShow = false"
                           :min-date="minDate"
                           :max-date="maxDate" />
    </van-popup>

    <!-- 用户头像 -->
    <van-popup v-model="avatar_input"
               position="bottom"
               :style="{ height: '40%', width: '100%' }"
               class="flex items-end justify-center"
               style="background:transparent !important;">
      <div class="w-full bg-white h-fit pl-8 pr-8 pb-18 box-border flex flex-col"
           style="background:transparent !important;">
        <div class="w-full bg-white mb-10 rounded-4 flex items-center justify-center h-36">
          <input type="file"
                 accept="image/*"
                 capture="camera"
                 @change="upAvatar($event)"
                 class="fz-14">
        </div>
        <div class="h-36 line-36 fz-14 rounded-4 text-center w-full bg-white"
             @click="avatar_input = false">{{langSwitch('取消')}}</div>
      </div>
    </van-popup>

  </div>
</template>
<script>
import editInfoPopup from "./editInfoWidget/editInfoPopup";
import { mapActions, mapGetters } from 'vuex';
import { Toast } from 'vant';
export default {
  name: 'editInfo',
  components: { editInfoPopup },
  props: [''],
  data () {
    return {
      isShow: false,
      options: {},
      isBirthdayShow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      avatar_input: false,
    };
  },
  watch: {
    isShow (v) {
      // console.log(v)
      // console.log(this.options)
      if (!v && this.options.pKey == 'card') {
        this.actions_getBaseInfo();
      }
    }
  },
  created () {
    if (this.getters_getBaseInfo.birthday) {
      let arrayBirthday = this.getters_getBaseInfo.birthday.split('-');
      this.currentDate = new Date(arrayBirthday[0], (arrayBirthday[1] - 1), arrayBirthday[2])
    } else {
      this.currentDate = new Date()
    }
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_postUpdateAvatar', 'actions_postUpdateFields', 'actions_getBaseInfo']),
    showEditInfoPopup (k = "", v = "") {
      if (k == 'phoneNumber' && !!v) {
        Toast(this.langSwitch('已绑定手机号码'))
      } else {
        this.options.pKey = k;
        this.options.pValue = v;
        this.isShow = true;
      }
    },
    upAvatar (event) {
      let file = event.target.files[0];
      let params = {
        file,
      };
      let formData = new FormData();

      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      });
      this.actions_postUpdateAvatar(formData).then(res => {
        if (res.code == 0) {
          Toast(this.langSwitch('上传头像成功'))
          this.avatar_input = true;
        } else {
          Toast(res.msg)
        }
      })
    },
    isBirthdayShowFn (value) {
      let fields = JSON.stringify({
        birthday: this.formatDate(value)
      })
      this.upDataInfo(fields);
    },
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
          this.isBirthdayShow = false
        })
      }, 1000)
    }
  },
  computed: {
    ...mapGetters(['getters_getBaseInfo', 'TOKEN', 'UID']),
  }
}
</script>
<style lang='scss' scoped>
.editInfo {
  .van-cell-group {
    .van-cell__title {
      font-size: 12px !important;
      width: 100px !important;
    }
    .van-cell__value {
      flex: 2 !important;
      font-size: 12px !important;
    }
    & .van-cell:nth-child(2) {
      .van-cell__value {
        color: #000000;
      }
    }
    & .van-cell:nth-child(7) {
      .van-cell__value {
        color: #000000;
      }
    }
  }
}
</style>