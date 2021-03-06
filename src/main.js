// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//This Swiper plugin use 3.3.1 version
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import store from './store'
import ElementUI from 'element-ui';

import Swiper from 'swiper'
import VueResource from 'vue-resource'
import Icon from 'vue-svg-icon/Icon.vue'

import '@/assets/css/common.css'
import 'swiper/dist/css/swiper.min.css'
import 'mint-ui/lib/style.css'
import './assets/styles/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(new Swiper)
Vue.use(VueResource)
Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
