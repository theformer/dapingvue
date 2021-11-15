// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import echarts from 'echarts'
// import echarts_fill from 'echarts-liquidfill'
import vueCountTo from 'vue-count-to'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible';
import ElementUI from 'element-ui';
import axios from 'axios';
import animated from 'animate.css';
import Modal from 'vuejs-modal';
import VueAwesomeSwiper from 'vue-awesome-swiper';
var echarts = require('echarts')
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */ )

// 如果你想使用默认的模板：
import confirm from 'vuejs-modal/lib/confirm.vue'

Vue.use(Modal, {
  modals: {
    confirm //默认的模板
  } //你的modals，它是个对象
})



axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/json'
let token = localStorage.getItem('token') || ''
axios.defaults.headers['token'] = token
axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  return Promise.reject(error);
})

axios.interceptors.response.use(function(res) {
  return res
})

Vue.use(animated);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
// Vue.prototype.$echarts_fill = echarts_fill
Vue.prototype.$axios = axios
Vue.prototype.$defaultcid = 'awegwegawegaw'
Vue.config.productionTip = false
Vue.component('vueCountTo', vueCountTo);

// 设置间隔请求时间(ms)
const commonTime = 3600 * 1000
Vue.prototype.$MallRevenueTime = commonTime // 商城平台营收
Vue.prototype.$MallOperateTime = commonTime // 商城运营统计
Vue.prototype.$EnvelopeTime = commonTime // 红包运营统计
Vue.prototype.$RevenueTime = commonTime // 实时数据
Vue.prototype.$SexTime = commonTime // 性别年龄分布
Vue.prototype.$OperateTime = commonTime // 运营漏斗图
Vue.prototype.$UserIncreaseTime = commonTime // 用户月增长曲线
Vue.prototype.$PropertyServiceTime = commonTime // 物业服务费
Vue.prototype.$PropertyQuotaTime = commonTime // 企业通勤服务
Vue.prototype.$ParkingManageTime = commonTime // 停车场管理
Vue.prototype.$ParkingPayTime = commonTime // 在线缴费车次统计
Vue.prototype.$PassRealTime = commonTime // 通行实时情况
Vue.prototype.$VisitorServiceTime = commonTime // 访客服务统计
Vue.prototype.$PeopleCarTime = commonTime // 人车通行
Vue.prototype.$ModalPVTime = commonTime // 全站PV
Vue.prototype.$ModalUVTime = commonTime // 全站UV
Vue.prototype.$ModalRegisterUserTime = commonTime // 注册用户
Vue.prototype.$ModalNewUserTime = commonTime // 新增用户
Vue.prototype.$ModalDealPriceTime = commonTime // 成交总额
Vue.prototype.$ModalOrderLineTime = commonTime // 今日订单量（折线）
Vue.prototype.$ModalOrderUserLineTime = commonTime // 今日下单人数（折线）
Vue.prototype.$ModalPriceLineTime = commonTime // 今日客单价（折线）
Vue.prototype.$ModalOrderTime = commonTime // 今日客单价（折线）
Vue.prototype.$ModalOrderNumTime = commonTime // 今日订单量
Vue.prototype.$ModalOrderUserTime = commonTime // 今日下单人数
Vue.prototype.$ModalPriceTime = commonTime // 今日客单价
Vue.prototype.$ModalCancelOrderTime = commonTime // 取消订单数
Vue.prototype.$ModalCancelUserTime = commonTime // 取消用户数
Vue.prototype.$ModalRefundTime = commonTime // 申请退货次数
Vue.prototype.$ModalRefundUserTime = commonTime // 申请退货用户数
Vue.prototype.$ModalUserAreaTime = commonTime // 用户地域分布
Vue.prototype.$ModalUserSexTime = commonTime // 用户性别分布

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
