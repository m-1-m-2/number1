<template>
  <div class='login absolute top bottom left right fz-12 px-12 box-border z-index-10 imgBlurLogin cl-white flex'>
    <div class="flex-1 flex flex-col">
      <div class="h-44 w-full flex line-44">
        <div class="flex-1 fz-16 bolder">{{langSwitch('手机号登录')}}</div>
        <!-- <div class="flex-1 cl-yellow text-right"
             @click="guestLogin">{{langSwitch('游客登录')}}</div> -->
      </div>
      <div class="w-full h-20 line-20 fz-10"
           @click="isProtocol = true">{{langSwitch('登录注册代表您同意《用户注册服务协议》、《隐私政策》')}}</div>
      <div class="w-full h-40 flex mt-50 flex items-center z-index-10">
        <div class="flex-1 fz-16 text-center">{{langSwitch('国家/地区')}}</div>
        <div class="w-240">
          <template v-if="DialingCodeBool">
            <countryCodeSelector :countryCode.sync="countryCode"></countryCodeSelector>
          </template>
        </div>
      </div>
      <div class="w-full h-70 flex flex-col justify-center">
        <div class="h-50 bg-black-1 rounded-50">
          <van-field v-model="phone_value"
                     type="digit"
                     class="box-border"
                     :placeholder="langSwitch('请输入手机号')" />
        </div>
      </div>
      <div class="w-full h-70 flex flex-col justify-center">
        <div class="h-50 bg-black-1 rounded-50">
          <van-field v-model="code_value"
                     type="digit"
                     class="box-border"
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
      <div class="mt-30 mb-10">
        <van-button type="info"
                    :color="submit_color"
                    @click="submitLogin"
                    block
                    round>{{langSwitch('登录')}}</van-button>
      </div>
      <div class="mt-10 mb-10">
        <van-button type="info"
                    @click="guestLogin"
                    block
                    round>{{langSwitch('游客登录')}}</van-button>
      </div>
      <div class="h-40 line-40 text-center">{{langSwitch('登录/注册遇到问题？')}}<span @click="isContact = true"
              class="cl-orange">{{langSwitch('联系客服')}}</span></div>
      <div class="flex-1 flex flex-col justify-end">
        <div class="h-40 line-40 text-center mb-20">
          <!-- {{langSwitch('版本号')}} v:1.0.0 -->
          {{PLATFORM}}-1.0.0 {{sysLang}}
        </div>
      </div>

      <!-- 协议 -->
      <van-popup v-model="isProtocol"
                 position="right"
                 :style="{ height: '100%',width: '100%' }">
        <div class="absolute top bottom left right flex flex-col cl-black">
          <div class="h-36 w-full van-hairline--bottom box-border flex">
            <div class="w-36 h-36 flex items-center justify-center">
              <van-icon @click="isProtocol = false"
                        size="20"
                        name="arrow-left" />
            </div>
            <div class="flex-1 h-36 flex items-center justify-center fz-14">{{langSwitch('用户协议')}}</div>
            <div class="w-36"></div>
          </div>
          <div class="flex-1 relative">
            <div class="absolute top bottom left right"></div>
          </div>
        </div>
      </van-popup>
      <!-- 联系客服 -->
      <van-popup v-model="isContact"
                 position="right"
                 :style="{ height: '100%',width: '100%' }">
        <div class="absolute top bottom left right flex flex-col cl-black">
          <div class="h-36 w-full van-hairline--bottom box-border flex">
            <div class="w-36 h-36 flex items-center justify-center">
              <van-icon @click="isContact = false"
                        size="20"
                        name="arrow-left" />
            </div>
            <div class="flex-1 h-36 flex items-center justify-center fz-14">{{langSwitch('在线客服系统')}}</div>
            <div class="w-36"></div>
          </div>
          <div class="flex-1 relative">
            <div class="absolute top bottom left right">
              <iframe :src="chat_service_url"
                      frameborder="0"
                      class="w-full h-full"
                      id="iframe"></iframe>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import countryCodeSelector from 'vue-country-code-selector';
import { importScript } from '@/common/js/utils';
import { AES_ECB_ENCRYPT } from '@/common/js/secret';
import md5 from 'js-md5';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default {
  name: 'login',
  components: {
    countryCodeSelector
  },
  props: [''],
  data () {
    return {
      submit_color: '#e1e1e1',
      phone_value: "",
      code_value: "",
      isProtocol: false,
      isContact: false,
      chat_service_url: '',
      countryCode: 86,
      vms: null,
      fp: '',
      DialingCodeBool: false,
      sysLang: '',
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
    },
    vms: {
      handler (n) {
        if (n) {
          if (!this.isUserSignOut) {
            localStorage.removeItem('store');
            this.guestLogin();
          }
        }
      }
    }
  },
  mounted () { },
  created () {
    this.sysLang = window.navigator.language || window.navigator.userLanguage;
    //引入网易易盾
    importScript('https://acstatic-dun.126.net/tool.min.js?t=201903281201', data => {
      // 初始化SDK，只需初始化一次
      // auto使用默认值，即自动化模式
      initWatchman({
        productNumber: 'YD00974423788654',
        onload: (instance) => {
          this.vms = instance
        }
      })
    })

    let device = { "system_ver": "10", "have_app_wx": false, "have_app_qq": false, "have_app_alipay": false, "cpu": "armeabi-v7a", "have_app_dy": false, "bluetooth_name": "Android Bluedroid", "have_light": false };
    // AES_ECB 加密
    let device_base64 = AES_ECB_ENCRYPT(JSON.stringify(device));
    let device_md5 = md5(device_base64)
    FingerprintJS.load()
      .then(fp => fp.get())
      .then((res) => {
        this.fp = res.visitorId + device_md5;

        this.mutations_rootStore({ key: 'device', val: res.visitorId + device_md5 });

        this.actions_getConfig({ plat_id: this.PLATFORM }).then(
          res => {
            if (res.code == 0) {
              // console.log(this.fp)
              this.chat_service_url = res.info[0].chat_service_url.replace('{name}', 'Guest').replace('{uid}', this.fp);
              if (res.info[0].DialingCode) {
                this.countryCode = (res.info[0].DialingCode).substring(1) * 1;
              }
              this.DialingCodeBool = true;
            }
          }
        )
      });
  },
  beforeMount () { },
  methods: {
    ...mapActions(['actions_getConfig', 'actions_getCode', 'actions_postUserLogin', 'actions_postGuestLogin']),
    ...mapMutations(['mutations_rootStore']),
    //游客登录
    guestLogin () {
      let source = this.getchannelcode();
      this.vms && this.vms.getToken('YD00974423788654', async (token) => {
        let params = {
          //  device:'',
          guest_pass: this.fp,
          fp: this.fp,
          source,
          appid: '0',
          sub_plat: this.PLATFORM,
          deviceToken: '',
          uaToken: '',
          webUmidToken: '',
          device_mac: '',
          acd_token: token,
          acd_device: '',
          ali_device: '',
          net_ip: '',
          device: this.fp,
        }
        const formData = new FormData()
        Object.keys(params).forEach(key => {
          formData.append(key, params[key])
        })
        Toast(source);
        this.actions_postGuestLogin(formData).then(res => {
          if (res.code == 0) {
            Toast(this.langSwitch('登录成功！'))
            this.mutations_rootStore({ key: 'uid', val: res.info[0].id })
            this.mutations_rootStore({ key: 'token', val: res.info[0].token })
          } else {
            Toast(res.msg);
          }
        })
      })
    },
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
    //登录
    async submitLogin () {
      if (!this.phone_value) { Toast(this.langSwitch('请输入手机号')); return; }
      if (!this.code_value) { Toast(this.langSwitch('请输入验证码')); return; }
      if (this.phone_value && this.code_value) {
        // 获取当前路由
        let source = this.getchannelcode();
        this.vms && this.vms.getToken('YD00974423788654', (token) => {
          let params = {
            user_login: this.phone_value.replace(/^0+/gi, ''),
            mobile_code: this.code_value,
            user_pass: this.code_value,
            acd_token: token,
            source,
            appid: '0',
            net_ip: '',
            deviceToken: '',
            acd_device: '',
            ali_device: '',
            device_mac: "",
            webUmidToken: '',
            uaToken: '',
            fp: this.fp,
            sub_plat: this.PLATFORM,
          }
          const formData = new FormData()
          Object.keys(params).forEach(key => {
            formData.append(key, params[key])
          })
          // console.log(formData.get("user_login"))
          Toast(source);
          this.actions_postUserLogin(formData).then(res => {
            if (res.code == 0) {
              Toast(this.langSwitch('登录成功！'))
              this.mutations_rootStore({ key: 'uid', val: res.info[0].id })
              this.mutations_rootStore({ key: 'token', val: res.info[0].token })
            } else {
              Toast(res.msg)
            }
          })
        });
      }
    },
    // 获取channelcode;
    getchannelcode () {
      let geturl = window.location.href;
      let getqyinfo = geturl.split('?')[1]
      let getqys = new URLSearchParams('?' + getqyinfo)
      let getchannelcode = getqys.get('channelcode');
      return getchannelcode || 'web';
    }
  },
  computed: {
    ...mapGetters(['PLATFORM', 'isUserSignOut']),
    check_submit () {
      let { phone_value, code_value } = this;
      return { phone_value, code_value }
    }
  }
}
</script>
<style lang='scss'>
.login {
  .flag-list-box {
    border-radius: 4px;
    background: #ffffff !important;
    .search-input {
      color: red;
    }
  }
  .van-field {
    background-color: transparent !important;
    .van-field__control {
      color: #ffffff;
    }
  }
}

.imgBlurLogin::before {
  content: "";
  display: inline-block;
  background-image: url("~@/assets/images/login_xxx.jpg");
  background-position: center;
  background-size: cover;
  // background-attachment: fixed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; /* 將 ::before 置於 main 的後方 */
  /* 模糊效果 */
  filter: blur(0px);
}
</style>