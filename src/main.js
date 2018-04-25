// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/user'
import App from './App'
import router from './router'
// 引用工具文件
import utils from './utils/index.js'
// 引用API文件
import api from './api/index.js'
// 将工具方法绑定到全局
Vue.prototype.$utils = utils
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user))
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
