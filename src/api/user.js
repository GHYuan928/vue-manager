import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/vue-element-admin/user/login',
    data
  })
}
export function getInfo(token) {
  return request({
    method: 'get',
    url: '/vue-element-admin/user/info',
    params: { token }
  })
}
