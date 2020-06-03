import store from '../store'

export function checkPermission(permissionRoles) {
  if (permissionRoles && permissionRoles instanceof Array && permissionRoles.length) {
    const roles = store.getters && store.getters.roles
    return roles.some(r => {
      return permissionRoles.includes(r)
    })
  } else {
    console.log('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
