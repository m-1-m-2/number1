import Vue from 'vue';
import VueI18n from 'vue-i18n';

// 导入语言包信息
import { en, id, ja, vi, zhCN, zhTW } from "@/locale/business";

// 注册i18n
Vue.use(VueI18n);

// 语言包根据语言环境分类
const messages = {
  en,
  "zh-CN": zhCN,
  ja,
  id,
  vi,
  "zh-TW": zhTW
}

// 通过选项创建 VueI18n 实例并导出
export default new VueI18n({
  locale: 'zh-CN', // 设置当前语言环境，默认中文简体
  messages, // 设置语言环境对应信息
})
