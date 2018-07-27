import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale1 from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import '@/icons' // icon
import '@/permission' // permission control
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.use(ElementUI, { locale1 })
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
