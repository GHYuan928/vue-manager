import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/)
/**
 * files 是一个函数， files(files.keys()[0]
 * files.keys() 返回 文件名数组
 * files.id 返回 相对路径 本处为： ./src/store/modules
 * files.resolve(files.keys()[0] 返回路径 ./src/store/modules/app.js
 * files(files.keys()[0]) 返回 app.js 的模块 === import '.app.js'
 */
const modules = files.keys().reduce((modules, modulePath) => {
  // ./app.js -> app.js     (.*) 为 $1
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = files(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// {app:{namespaced:true,state:{},actions:{}}} 这种格式

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules
})
/**
 * app 模块。 作为全局的 state.  有 sidebar
 * settings模块。 是右边设置按钮 的配置
 * permission模块。是权限permission.js 的配置，路由相关
 * user模块。用户信息
 * tagsView模块。是 tagsView 视图的配置
 */

