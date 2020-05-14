const bodyParser = require('body-parser')
const chokidar = require('chokidar')
const Mock = require('mockjs')
const chalk = require('chalk')
const path = require('path')
const mockDir = path.join(process.cwd(), 'mock')
function registerRoutes(app) {
  let mockLastIndex
  const mocks = require('./index.js')
  // mocks = [{url:'/login',method:'get',response:fn}]
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    console.log(mock)
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}
function responseFake(url, type, respond) {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('>>>request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}
/**
 *
app.post('/login/login', function (req, res) {
  res.json(Mock.mock(loginAPI.loginByUsername(req)))
}
 * router.use("/profile",function (req,res) {
      //调用mock方法模拟数据  req  [客户端发过来的请求所带数据]
      //可使用res.send返回数据，res.json返回json数据，res.down返回下载文件
      return res.json( Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|1-10': [{
                  // 属性 id 是一个自增数，起始值为 1，每次增 1
                  'id|+1': 1
              }]
          }
      ))
  })
 */
module.exports = (app) => {
  require('@babel/register')
  // body-parser 解析json格式数据
  app.use(bodyParser.json())
  // 此项必须在 bodyParser.json 下面,为参数编码
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // 先注册路由
  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
