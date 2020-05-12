import Vue from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import './styles/element-variables.scss' // element 用的常量

import '@/styles/index.scss' // 全局css

Vue.use(ElementUI, { locale })

import App from './App.vue'
import router from './router'
import store from './store'

// import svg
import './icons'
// permission
import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
