import { login, getInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import router,{resetRouter} from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    roles: [],
    avatar: '',
    name: '',
    introduction: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLES(state, role) {
      state.roles = role
    },
    SET_AVATAR(state, avatar) {
      state.avatar = avatar
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { user, pwd } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: user.trim(), password: pwd }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then((response) => {
          const { data } = response
          if (!data) {
            reject('验证失败，请重新登录')
          }
          const { roles, name, avatar, introduction } = data
          if (!roles || roles.length <= 0) {
            reject('getInfo: 角色不能为空')
          }
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    resetToken({ commit }) {
      return new Promise((resolve) => {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        resolve()
      })
    },
    // 动态修改权限
    async changeRoles({commit, dispatch}, val){
      return new Promise((resolve)=>{
        const token = val+'token'
        commit('SET_TOKEN',token)
        setToken(token)
        const { roles } = await dispatch('getInfo')
        // 重置路由
        resetRouter()
        // 重新生成动态路由
        const accessRoutes = await dispatch('permission/generateRoutes', roles)
        // 动态添加路由
        router.addRoutes(accessRoutes)
        // 删除 tagsView

        resolve()
      })
    }
  }
}
