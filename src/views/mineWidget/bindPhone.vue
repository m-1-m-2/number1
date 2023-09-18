<template>
  <div class='bindPhone absolute top bottom left right px-20 box-border fz-12'>
    <div class="w-full h-120 flex items-center">
      <div>
        <div class="fz-20">{{langSwitch('绑定您的手机号')}}</div>
        <div class="line-30">{{langSwitch('为了方便您存取款 请绑定手机号')}}</div>
      </div>
    </div>
    <div class="w-full h-24 flex items-center">
      <div class="flex-1 fz-16 text-center">{{langSwitch('国家/地区')}}</div>
      <div class="w-240">
        <countryCodeSelector :countryCode.sync="countryCode"></countryCodeSelector>
      </div>
    </div>
    <div class="w-full h-100 flex flex-col">
      <div class="h-50 line-50 flex items-center">
        <van-icon name="phone-o"
                  size="24">
          <span class="fz-12 relative bottom-6 left-6">{{langSwitch('手机')}}</span>
        </van-icon>
      </div>
      <div class="h-50">
        <van-field v-model="phone_value"
                   type="digit"
                   class="bb-1px box-border"
                   :placeholder="langSwitch('请输入手机号')" />
      </div>
    </div>
    <div class="w-full h-100 flex flex-col">
      <div class="h-50 line-50 flex items-center">
        <van-icon name="shield-o"
                  size="24">
          <span class="fz-12 relative bottom-6 left-6">{{langSwitch('验证码')}}</span>
        </van-icon>
      </div>
      <div class="h-50">
        <van-field v-model="code_value"
                   type="digit"
                   class="bb-1px box-border"
                   :placeholder="langSwitch('请输入验证码')">
          <template #button>
            <van-button size="small"
                        color="#EF4B8D"
                        @click="sendCode"
                        round>{{langSwitch('发送验证码')}}</van-button>
          </template>
        </van-field>
      </div>
    </div>
    <!-- submit -->
    <div class="mt-50">
      <van-button type="info"
                  :color="submit_color"
                  block
                  @click="submit_bindPhone"
                  round>{{langSwitch('确认')}}</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapActions, mapGetters } from 'vuex';
import countryCodeSelector from 'vue-country-code-selector';
import { importScript } from '@/common/js/utils'
import md5 from 'js-md5';
import { AES_ECB_ENCRYPT } from '@/common/js/secret';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
export default {
  name: 'bindPhone',
  components: {
    countryCodeSelector
  },
  data () {
    return {
      submit_color: '#e1e1e1',
      phone_value: '',
      code_value: '',
      countryCode: '',
      vms: null,
      fp: ''
    };
  },
  watch: {
    check_submit: {
      handler (n) {
        if (!!n.phone_value && !!n.code_value) {
          this.submit_color = "#EF4B8D"
        } else {
          this.submit_color = '#e1e1e1'
        }
      },
      deep: true
    }
  },
  created () {
    this.countryCode = (this.getters_getConfig.DialingCode).substring(1) * 1 || 86;
    let device = { "system_ver": "10", "have_app_wx": false, "have_app_qq": false, "have_app_alipay": false, "cpu": "armeabi-v7a", "have_app_dy": false, "bluetooth_name": "Android Bluedroid", "have_light": false };
    // console.log(AES_ECB_ENCRYPT(JSON.stringify(device)))
    // AES_ECB 加密
    let device_base64 = md5(AES_ECB_ENCRYPT(JSON.stringify(device)));
    FingerprintJS.load()
      .then(fp => fp.get())
      .then((res) => {
        // console.log(res.visitorId);
        this.fp = res.visitorId + device_base64;
      });
  },
  beforeMount () { },
  mounted () { },
  methods: {
    ...mapActions(['actions_getCode', 'actions_setMobile']),
    //发送验证码
    async sendCode () {
      if (!this.phone_value) { Toast(this.langSwitch('请输入手机号')); return; }
      let params = {
        mobile: this.phone_value.replace(/^0+/gi, ''),
        country_code: this.countryCode,
        sign: md5(`mobile=${this.phone_value}&76576076c1f5f657b634e966c8836a06`)
      }
      let res = await this.actions_getCode(params)
      if (res.code == '0') {
        Toast(this.langSwitch('验证码发送成功'))
      } else {
        Toast(this.langSwitch('验证码发送失败'))
      }
    },
    //绑定手机号
    async submit_bindPhone () {
      if (!this.phone_value) { Toast(this.langSwitch('请输入手机号')); return; }
      if (!this.code_value) { Toast(this.langSwitch('请输入验证码')); return; }
      if (this.phone_value && this.code_value) {

        // console.log(token, 'token')
        let params = {
          mobile: this.phone_value.replace(/^0+/gi, ''),
          code: this.code_value,
          sub_plat: this.PLATFORM,
        }
        let formData = new FormData()

        Object.keys(params).forEach(key => {
          formData.append(key, params[key])
          // console.log(formData.get("user_login"))
        });

        this.actions_setMobile(formData).then(res => {
          if (res.code == 0) {
            Toast(this.langSwitch('绑定成功！'))
            this.mutations_rootStore({ key: 'uid', val: res.info[0].id })
            this.mutations_rootStore({ key: 'token', val: res.info[0].token })
          } else {
            Toast(res.msg)
          }
        })
      }
    }
    // //绑定手机号
    // submit_bindPhone () {
    //   if (!!this.submit_color) {
    //     if (!this.phone_value) { Toast(this.langSwitch('请输入手机号')); return; }
    //     if (!this.code_value) { Toast(this.langSwitch('请输入验证码')); return; }

    //   } else {
    //     Toast(this.langSwitch('绑定成功！'));
    //   }
    // }
  },
  computed: {
    ...mapGetters(['UID', 'TOKEN', 'PLATFORM', 'getters_getConfig']),
    check_submit () {
      let { phone_value, code_value } = this;
      return { phone_value, code_value }
    }
  }
}
</script>
<style lang='scss'>
.bindPhone {
  .flag-list-box {
    border-radius: 4px;
    background: #ffffff !important;
  }
}
</style>