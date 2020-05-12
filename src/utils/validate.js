export const isExternal = (s) => {
  return /^(https?:|tel:|mailto:)/.test(s)
}
export const validUsername = (name) => {
  // 检查输入格式。或者指定的 账号
  const users = ['admin', 'editor']
  return users.indexOf(name) !== -1
}
export const validPassword = (pwd) => {
  if (pwd.length < 6) {
    return false
  }
  return true
}
