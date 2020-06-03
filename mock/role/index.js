import Mock from 'mockjs'
import { asyncRoutes, constantRoutes } from './routes.js'
import { deepClone } from '../../src/utils/index'
const routes = deepClone([...constantRoutes, ...asyncRoutes])
const roles = [
  {
    key: '1',
    name: 'admin',
    description: '超级管理员，有访问所有页面的权限',
    routes: routes
  },
  {
    key: '2',
    name: 'editor',
    description: '普通编辑者，能看到除了权限页面以外的所有页面',
    routes: routes.filter(route => route.path !== '/permission')
  },
  {
    key: '3',
    name: 'visitor',
    description: '游客模式，只能看到Home页面和Document页面',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    method: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles from server
  {
    url: '/vue-element-admin/roles',
    method: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)') // 随机生成300-5000的数字
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
