import Vue from 'vue'

/** normalize.css 替代 css reset
 * 保护有用的浏览器默认样式而不是完全去掉它们
 * 一般化的样式：为大部分HTML元素提供
 * 修复浏览器自身的bug并保证各浏览器的一致性
 * 优化CSS可用性：用一些小技巧
 * 解释代码：用注释和详细的文档来
 */
import 'normalize.css/normalize.css'

// 引入 element-ui 和 主题 以及 语言
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 定义 element 用的常量
import './styles/element-variables.scss'

// 全局css
import '@/styles/index.scss'

Vue.use(ElementUI, { locale })

import App from './App.vue'
import router from './router'
import store from './store'

// import svg图
import './icons'
// permission 权限控制
import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
