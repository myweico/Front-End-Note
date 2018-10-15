var express = require('express')
var md5 = require('blueimp-md5')
// 引入mongoose的模板
var User = require('./modules/user')

var router = express.Router()


router.get('/', function (req, res) {
  console.log(req.session.user)
  res.render('index.html', { user: req.session.user })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {
  /**
   * 状态码：
   * 203：登录成功
   * 204：密码或者邮箱不匹配
   * 503：查询密码匹配过程出错
   */
  var body  = req.body
  console.log(body)
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }).then(function (data) {
    // 邮箱或者密码不匹配
    if (!data) {
      return res.status(200).json({
        errorCode: 204,
        message: 'Email or password is invalid.'
      })
    }

    // 保存登录状态
    req.session.user = data

    // 密码以及邮箱匹配
    res.status(200).json({
      errorCode: 203,
      message: 'Login successfully'
    })
  }, function (err) {
    res.status(500).json({
      errorCode: 503,
      message: 'Server is busy, please try later'
    })
  })
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  /**
   * 错误代码：
   * 201：成功创建
   * 202：账户或者邮箱已经存在
   * 501：账户持久化失败
   * 502：查询是否存在时候发生错误
   */
  User.findOne({
    // 或语法
    $or: [
      { email: req.body.email },
      { nickname: req.body.nickname }
    ]
  }).then(function (data) {
    // 成功查找
    if (data) {
      // 账户或者邮箱存在
      return res.status(200).json({
        errorCode: 202,
        message: 'The email or nickname already exists, please enter another one'
      })
    }
    
    // 邮箱以及账户都可用，可以注册
    // 使用md5对密码进行加密
    req.body.password = md5(md5(req.body.password))

    new User(req.body).save().then(function (data) {
      // 注册成功
      // 保存session
      req.session.user = data
      res.status(200).json({
        errorCode: 201,
        message: 'Account registered successfully.'
      })
    },function (err) {
      // 无法持久化
      res.status(500).json({
        errorCode: 501,
        message: 'Server is busy, please try later'
      })
    })
  }, function (err) {
    // 无法查询是否存在
    return res.status(500).json({
      errorCode: 502,
      message: 'Server is busy, please try later'
    })
  })
})

router.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/')
})

module.exports = router