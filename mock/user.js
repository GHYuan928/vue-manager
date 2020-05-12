const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
export default [
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: (app) => {
      const { username } = app.body
      const token = tokens[username]
      if (!token) {
        return {
          code: 60204,
          message: '账号或者密码错误'
        }
      }
      return {
        code: 20000,
        data: token
      }
    }
  }
]
