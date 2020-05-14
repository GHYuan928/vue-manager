import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done()
    // } else {
    // 通过userinfo 检查用户是否包含角色权限
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      try {
        // get user info 根据token 获取用户信息
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        const { roles } = await store.dispatch('user/getInfo')

        // 生成基于role的路由表
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        // 动态添加路由
        router.addRoutes(accessRoutes)
        // 确保addRoutes完整的hack方法
        // 设置 replace = true，这样导航就不会留下历史记录
        next({ ...to, replace: true })
      } catch (error) {
        // 移除 token, 重新登录
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        Message.error(error || '出现错误')
        NProgress.done()
      }
    }
    // }
  } else {
    // no token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: `/login?redirect=${to.path}` })
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

