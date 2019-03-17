import Vue from 'vue'
import App from './App'
import wx from '@/utils/wx'
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.prototype.$wx = wx
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
