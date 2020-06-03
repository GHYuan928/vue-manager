import store from '@/store'
export default {
  // 被绑定元素插入父节点时调用
  /**
   * el：指令所绑定的元素，可以用来直接操作 DOM
   * binding
   *  name：指令名，不包括 v- 前缀
   *  value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2
   *  arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
   * vnode：Vue 编译生成的虚拟节点
   */
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    // debugger
    if (value && value instanceof Array && value.length) {
      const permissionRoles = value
      const hasPermission = roles.some(r => {
        return permissionRoles.includes(r)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
