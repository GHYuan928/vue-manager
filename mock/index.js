// import Mock from 'mockjs'

const user = require('./user')
const remoteSearch = require('./remote-search')
const mocks = [
  ...user,
  ...remoteSearch
]
module.exports = mocks
