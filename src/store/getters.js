const getters = {
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  permission_routes: state => state.permission.routes
}
export default getters
