import SvgIcon from '@/components/SvgIcon'
import vue from 'vue'
vue.component('svg-icon', SvgIcon)

// import all svg
/** require.context是webpack 方法， 自动导入文件
 *  参数1 : 文件夹路径
 *  参数2 ： 是否递归查找
 *  参数3 ： 文件类型
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
