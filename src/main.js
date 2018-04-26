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
// 未登录时重定向到登录页
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.userInfo.userId) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
