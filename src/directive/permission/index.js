import permission from './permission'

const install = function(Vue) {
  console.log('install -> Vue 全局指令 permission')
  // 全局指令
  Vue.directive('permission', permission)
}

if (window.Vue) {
  console.log('window.Vue 存在')
  window['permission'] = permission
  // 通过 Vue.use 插件的方式 使用Vue 生成 指令
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
