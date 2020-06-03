import { asyncRoutes, constantRoutes } from '@/router'

// 当前路由是否包含 roles 权限
function hasPermission(roles, tmp) {
  if (tmp.meta && tmp.meta.roles) {
    const flag = roles.some(role => tmp.meta.roles.includes(role))
    return flag
  } else {
    return true
  }
}

// 过滤路由 。
function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) { // 包含。 则查看子路由是否包含该权限
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
export default {
  namespaced: true,
  state: {
    addRoutes: [], // 角色添加的路由
    routes: [] // 所有路由
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes // 角色添加的路由
      state.routes = constantRoutes.concat(routes) // 所有路由
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('admin')) {
          // admin 权限。 可以获得动态路由的全部路由
          accessedRoutes = asyncRoutes || []
        } else {
          // eidtor 权限，可以获得动态路由的 部分路由
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        // 路由存到 store 中
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
