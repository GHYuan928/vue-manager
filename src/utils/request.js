import axois from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

const service = axois.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true, // 跨域请求时发送Cookie
})
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error) // for debug
  return Promise.reject(error)
})
service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // token 无效
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, error => {
  console.log('err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
export default service
