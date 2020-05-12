const bodyParser = require('body-parser')
const Mock = require('mock')

function registerRoutes(app) {
  const mocks = require('./index.js').default
  // mocks = [{url:'/login',method:'get',response:fn}]
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  console.log(mocksForServer)
}
function responseFake(url, type, respond) {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}
/**
 * router.use("/profile",function (req,res) {
      console.log(req.body);
      //调用mock方法模拟数据  req  [客户端发过来的请求所带数据]
      //可使用res.send返回数据，res.json返回json数据，res.down返回下载文件
      var data = Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|1-10': [{
                  // 属性 id 是一个自增数，起始值为 1，每次增 1
                  'id|+1': 1
              }]
          }
      );
      return res.json(data);
  })
 */
module.exports = (app) => {
  console.log('-----error---')
  require('@babel/register')
  console.log('>>>>mock-server', app)
  // body-parser 解析json格式数据
  app.use(bodyParser.json())
  // 此项必须在 bodyParser.json 下面,为参数编码
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // 先注册路由
  // const mockRoutes = registerRoutes(app)
}
