// 防抖(在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时)
export const VueDebounce = function (fnName, time) {
  let timeout = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fnName]();
    }, time);
  };
}

export const importScript = function (path, success, error) {
  let oS = document.createElement('script')
  oS.src = path
  document.getElementsByTagName('head')[0].appendChild(oS)
  oS.onload = function () {
    success && success()
  }

  oS.onerror = function () {
    error && error()
  }
}

export const getVideoRandomKey = function (x, y, z, o = null) {
  let count = x * y, random_num = Number(((25214903917n * z + 11n) % 24897695n)), random_array = [], random_obj = {};
  let changeFn = function (t1, t2) {
    let tmp = random_array[t1];
    random_array[t1] = random_array[t2];
    random_array[t2] = tmp;
  }

  for (let i = 0; i < count; i++) { random_array.push(i + 1); random_obj.a = i + 1; }
  for (let i = 1; i < count; i++) { changeFn(i, random_num % (i + 1)); }
  // console.log(random_array)
  let hashString = random_array.reduce((f, l) => String(f) + String(l));
  // console.log(hashString.substring(0, 16))
  return hashString.substring(0, 16)
}
