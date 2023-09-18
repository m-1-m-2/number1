exports.install = function (Vue, options) {
  // 需要vant UI组件的时候通过require的方式引入
  let { Dialog } = require('vant');
  Vue.prototype.toRouter = function (name, query = {}, callback) {
    let array = ['live', 'play', 'attention'];
    if (this.$route.name == name) return;
    // 针对home页面报错单独处理
    if (array.includes(this.$route.name) && name == 'home') return

    // 通过router中唯一的name来跳转
    this.$router.push({ name: name, query })

    // 判断callback是否存在
    if (!!callback) {
      let timer = setTimeout(() => {
        callback()
        clearTimeout(timer)
      }, 1000)
    }
  };

  Vue.prototype.toBack = function () {
    this.$router.go(-1)
  };

  Vue.prototype.langSwitch = function (key) {
    let name = this.$options.name;
    if (this.$t(name) && this.$t(name)[key]) {
      return this.$t(name)[key];
    }
    return key
  };

  Vue.prototype.langStyle = function (en, ja, id, vi) {
    // en 英语样式, ja 日语样式, id 印尼语样式, vi 越南语样式
  };

  Vue.prototype.showNotice = function (text) {
    Dialog.alert({
      // title: '标题',
      // theme: 'round',
      message: text,
      // overlay: false,
    }).then(() => {
      // on close
    });
  };

  // 工具函数 utils

  Vue.prototype.delayFn = function (fn, delayTime) {
    let delayIndex = setTimeout(function () {
      if (typeof (fn) == 'function') {
        fn();
      }
      clearTimeout(delayIndex);
    }, delayTime);
  }

  Vue.prototype.formatWord = function (val) {
    // 推广规则\n\n\n1:邀请的用户每次充值消费钻石数量的2%\n\n2:钻石直接提现的比列为:70%\n\n3:钻石充入账户的比列为:100%\n\n4:全天24小时都可申请提现\n\n5:钻石充入账号可即时到账\n\n6:如遇恶意刷注册，平台有权取消奖励，封禁账号
    return val.replace(/\n/g, '<br>')
  }

  Vue.prototype.jsonSort = function (data) {
    let newkey = Object.keys(data).sort();
    let newObj = {};
    for (let i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = data[newkey[i]];
      if (typeof data[newkey[i]] == 'object') {
        this.jsonSort(data[newkey[i]])
      }
    }

    return newObj;
  }

  Vue.prototype.postParamsToFormData = function (params) {
    let formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key])
    });
    return formData;
  }
};