import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
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
    }
  }
}
