// import Mock from 'mockjs'

const user = require('./user')
const role = require('./role/index')
console.log(user, role)
const remoteSearch = require('./remote-search')
const mocks = [
  ...user,
  ...remoteSearch,
  ...role
]
module.exports = mocks
