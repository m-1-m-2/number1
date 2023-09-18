// #plugins/axios/MD5.encrypt.js文件
import md5 from 'js-md5';
import store from '@/store';

export default (config, plat) => {

  let { device } = store.getters;
  // 设备相关
  // console.log(device);
  let { userAgent, productSub, appVersion } = navigator;
  let url_array = config.url.split('?')[1].split('=');
  // console.log(url_array,'url_arr')
  let params = config.method == 'get' ? config.params : config.data;

  config.method == 'get' ? params[url_array[0]] = url_array[1] : ''
  if (config.method == 'get') {
    // 必须字段传值
    if (!params.plat) { params.plat = 'web' }
    if (!params.device) { params.device = device }
    if (!params.plat_id) { params.plat_id = plat }
    if (!params.devicetype) { params.devicetype = navigator }
    if (!params.version) { params.version = '2.6.0' }
    if (!params.rtm) { params.rtm = parseInt(new Date().getTime() / 1000) }
  } else if (config.method == 'post') {
    if (!params.get('plat')) { params.append('plat', 'web') }
    if (!params.get('device')) { params.append('device', device) }
    if (!params.get('plat_id')) { params.append('plat_id', plat) }
    if (!params.get('devicetype')) { params.append('devicetype', navigator) }
    if (!params.get('version')) { params.append('version', '2.6.0') }
    if (!params.get('rtm')) { params.append('rtm', parseInt(new Date().getTime() / 1000)) }
  }


  // key排序方法
  function jsonSort (data) {
    let newkey = Object.keys(data).sort(), newObj = {};
    for (let i = 0; i < newkey.length; i++) { newObj[newkey[i]] = data[newkey[i]]; if (typeof data[newkey[i]] == 'object') { jsonSort(data[newkey[i]]) } }
    return newObj;
  }

  params = jsonSort(params);  // 重新赋值params
  // console.log(params)
  let params_string = '';
  Object.keys(params).forEach((key) => { params_string += key + params[key]; });
  let md5_string = md5(`0011${params_string} `);
  params._sign = md5_string;
  config.method == 'get' ? config.params = Object.assign(config.params, params) : config.data = Object.assign(config.data, params);



  return config
}