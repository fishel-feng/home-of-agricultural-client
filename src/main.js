// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'
import axios from 'axios'
import {loadToken} from '@/common/js/cache'
import '@/assets/stylus/index.styl'

Vue.use(VueSocketio, 'http://39.106.41.253:7001')

Vue.use(MintUI)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

axios.interceptors.request.use(config => {
  if (loadToken()) {
    config.headers.Authorization = loadToken()
  }
  return config
}, err => {
  return Promise.reject(err)
})

/* eslint-disable no-new */
// document.addEventListener('deviceready', function () {
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     template: '<App/>',
//     components: { App }
//   })
//   window.navigator.splashscreen.hide()
// }, false)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
