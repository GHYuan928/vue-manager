import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function addRole(role) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data: role
  })
}

export function updateRole(role, id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data: role
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
