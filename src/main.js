import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

const axiosInstance = axios.create({
  baseURL: 'http://beautysalon/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})

Vue.prototype.$axios = axiosInstance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
