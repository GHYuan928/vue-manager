import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, tmp) {
  if (tmp.meta && tmp.meta.roles) {
    const flag = roles.some(role => tmp.meta.roles.includes(role))
    return flag
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
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
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          console.log(asyncRoutes, roles)
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
