import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// 无需权限可访问的路由
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 用户是否登录 (本地获取存储的token)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前是 dashboard 页面，将不会触发 afterEach 路由钩子，所有需要手动 完成
    } else {
    // store中查看是否存在 roles 且 roles 数组长度大于 0
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
      // 说明是存在 user信息 next()， 如果存在动态改变权限，需要做hasPermission判断
        next()
      } else {
        try {
        // roles 数组为空，说明没登录 ，不存在 user 信息，。那么用token去登陆。
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo') // 上面存在 aync 所以这里能用 await
          // 生成基于role的路由表 保存store,并返回 动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加路由
          router.addRoutes(accessRoutes)
          // 确保addRoutes完整的hack方法
          // 设置 replace = true，这样导航就不会留下历史记录
          console.log(to)
          next({ ...to, replace: true })
        } catch (error) {
        // 移除 token, 重新登录
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          Message.error(error || '验证失败，请重新登录')
        }
      }
    }
  } else {
    // no token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: `/login?redirect=${to.path}` })
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

