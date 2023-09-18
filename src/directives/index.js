import Vue from "vue"

Vue.directive('touch', {
  bind (el, binding, vnode) {
    var touchType = binding.arg; //传入的模式 press swipeRight swipeLeft swipeTop swipeDowm Tap
    var timeOutEvent = 0;
    var direction = '';
    //滑动处理
    var startX, startY;

    //返回角度
    function GetSlideAngle (dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection (startX, startY, endX, endY) {
      var dy = startY - endY;
      var dx = endX - startX;
      var result = 0;

      //如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
      }

      var angle = GetSlideAngle(dx, dy);
      if (angle >= -45 && angle < 45) {
        result = 'swiperight';
      } else if (angle >= 45 && angle < 135) {
        result = 'swipeup';
      } else if (angle >= -135 && angle < -45) {
        result = 'swipedown';
      }
      else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swipeleft';
      }
      return result;
    }

    el.addEventListener('touchstart', function (ev) {
      startX = ev.touches[0].pageX;
      startY = ev.touches[0].pageY;

      //判断长按
      timeOutEvent = setTimeout(() => {
        timeOutEvent = 0;
        if (touchType === 'press') {
          binding.value()
        }
      }, 500);

    }, false);

    el.addEventListener('touchmove', function (ev) {
      clearTimeout(timeOutEvent)
      timeOutEvent = 0;
    });

    el.addEventListener('touchend', function (ev) {
      var endX, endY;
      endX = ev.changedTouches[0].pageX;
      endY = ev.changedTouches[0].pageY;
      direction = GetSlideDirection(startX, startY, endX, endY);

      clearTimeout(timeOutEvent)

      switch (direction) {
        case 0:
          break;
        case 'swipeup':
          if (touchType === 'swipeup') {
            binding.value()
          }
          break;
        case 'swipedown':
          if (touchType === 'swipedown') {
            binding.value()
          }
          break;
        case 'swipeleft':
          if (touchType === 'swipeleft') {
            binding.value()
          }
          break;
        case 'swiperight':
          if (touchType === 'swiperight') {
            binding.value()
          }
          break;
        default:
      }
    }, false);
  }
})

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
  let imgURL = binding.value;//获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute('src', imgURL);
    }
  }
})

/**
* 检测图片是否存在
* @param url
*/
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function () {
      resolve(false);
      img = null;
    }
    img.src = url;
  })
}


// 筹码图片资源引入
let chip_2 = require("@/assets/images/chip_2.png");
let chip_10 = require("@/assets/images/chip_10.png");
let chip_100 = require("@/assets/images/chip_100.png");
let chip_200 = require("@/assets/images/chip_200.png");
let chip_500 = require("@/assets/images/chip_500.png");
let chip_1000 = require("@/assets/images/chip_1000.png");
let chip_any = require("@/assets/images/chip_any.png");

Vue.directive('chouMaBg', {
  bind: function (el) {
    let num = Number(el.firstChild.innerHTML), currentBg;
    switch (num) {
      case 2:
        currentBg = chip_2
        break;
      case 10:
        currentBg = chip_10
        break;
      case 100:
        currentBg = chip_100
        break;
      case 200:
        currentBg = chip_200
        break;
      case 500:
        currentBg = chip_500
        break;
      case 1000:
        currentBg = chip_1000
        break;
      default:
        currentBg = chip_any
        break;
    }

    el.style.background = `url(${currentBg})`;
    el.style.backgroundSize = `100%`;
  },
  update: function (el) {
    let num = Number(el.firstChild.innerHTML), currentBg;
    switch (num) {
      case 2:
        currentBg = chip_2
        break;
      case 10:
        currentBg = chip_10
        break;
      case 100:
        currentBg = chip_100
        break;
      case 200:
        currentBg = chip_200
        break;
      case 500:
        currentBg = chip_500
        break;
      case 1000:
        currentBg = chip_1000
        break;
      default:
        currentBg = chip_any
        break;
    }

    el.style.background = `url(${currentBg})`;
    el.style.backgroundSize = `100%`;
  }
})
