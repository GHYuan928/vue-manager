import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/vue-element-admin/user/login',
    data
  })
}
