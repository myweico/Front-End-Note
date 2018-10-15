var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')

var app = express()
var router = require('./router')

// 设置使用art-template
app.engine('html', require('express-art-template'))

// 配置session
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'weimy'
}))

// 设置body的请求体的插件
// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 开放静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 挂载路由
app.use(router)

// 打开服务器
app.listen(3000, function (err) {
  if (err) {
    return console.log('Sever start failed')
  }
  console.log('Server is running')
})
