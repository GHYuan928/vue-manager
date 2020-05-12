import router from './router'
import store from './store'
// import { Message } from 'element-ui'
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
    if (to.path === '/login') {
      console.log('has token ,to.path === login')
      next({ path: '/' })
      NProgress.done()
    } else {
      // 通过userinfo 检查用户是否包含角色权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')
        } catch (error) {
          NProgress.done()
        }
      }
    }
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
