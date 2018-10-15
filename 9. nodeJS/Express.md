# Express
> 原生的http在某些方面不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率

[首页](http://expressjs.com)

## 使用
### Hello Express
```
var express = require('express')

// 创建应用程序，相当于原来的http.createServer
var app = express()

// 当服务器受到get请您求的时候，调用后面的回调函数
app.get('/', function (req, res) {
    res.send('hello express')
})

//相当于 server.listen
app.listen(3000, function () {
    console.log('app is running at port 3000')
})
```

### 解析URL
识别URL，进行对应处理
```
app.get('/', funciton (req, res) {
    res.send('hello express')
})
```
通过req.query直接获取get参数
```
app.get('/', function (req, res) {
    console.log(req.query)
    res.send('Hello Expresss')
}) 
```
express结合art-template渲染模版
```
res.render('文件名',{模版对象})
```

### 静态资源服务
> 静态资源都会向服务端发送请求，需要对资源进行路由设置，单个设置太麻烦，故将静态资源都统一放置在一个地方，若目的为这个地方的请求，则直接返回对应地方的资源

方式一：
```
// /public/css/main.css
app.use('/public/', express.static('./public/'))
```
当忽略第一个参数`/public/`的时候，可以忽略`/public/`直接输入后面的url进行访问，将基地址改为/public/
```
// /css/main.css
app.use(express.static('/public/'))
```

### 重定向
```
res.redirect('/')
```

### 基本路由
> 路由其实是一张表，这个表里面有一个具体的映射关系

get:
```
app.get('/', function (req, res) {
    res.send('Get a get request')
})
```

post:
```
app.post('/', function (req, res) {
    res.send('Get a post request')
})
```

### 获取数据
#### 获取get数据
工作请求对象的query属性即可
```
app.get('/get', function (req, res) {
    console.log(req.query)
})
```

#### 获取post数据
在Express中没有哦内置获取表单post请求体的API，需要使用一个第三方包：`body-parser`

安装：
```
npm install --save body-parser
```

配置：
```
var express = require('express')
// 引包
var bodyParser = require('body-parser')
var app = express()

// 通过配置body-parser，req请求对象就会附带一个body属性
// 通过req.body获取表单post请求体数据即可
// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```
使用：
```
// 通过req.body来获取请求体
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

### 在express中使用art-template
安装：
```
npm i art-template express-art-template -S
```
配置：
```
// 第一个参数表示当渲染.html结尾的文件的时候，使用art-template模版引擎
// express-art-template依赖art-template

app.engine('html', require('express-art-template')
```
使用：
```
// res.render('模版名', { 模版数据 })
// 第一个参数不能写路径，默认会去项目中的views目录查找该模版
// express有一个约定：开发人员吧所有的视图文件都放到views文件夹中

res.render('template.html', { data })
```
若想修改默认的查找目录，可以：
```
app.set('views', 目录路径)
```

## 常用方法
### app.send()
将字符串参数发送回客户端

### app.json()
将提供的参数转换为JSON格式的字符串并且发送回客户端

## 自动重启服务器
我们可以首映第三方命名行工具：`nodemon`来解决频繁修改代码重启服务器的问题

安装：
```
npm install nodemon --global
```

使用：
```
nodemon app.js
```

## CRUD
### 模块化设计
将每个功能进行模块化，每个模块要各司其职，最好只完成自己对应的功能

### 先画框架，再填充
在写代码之前，最好先构思清楚，写好大概的框架，然后再慢慢地填写

### 路由设计
最好先进行总体的设计，在依次完成，循序渐进

get /students => 渲染首页

get /students/new => 添加

post / students => 处理

get /students/edit => 渲染修改

post /students/edit => 提交修改

get /students/delete => 删除

先写好框架，再直接添加内容

### 新建router模块
#### 方式一
app.js文件
```
var router = require('./router')
router(app)
```

router.js文件
```
module.exports = function (app) {
    ...
}
```

#### 方式二
routers.js创建路由容器
```
var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    ...
})

...

router.get('/', function (req, res) {
    ...
})

// 导出router
module.exports = router
```
app.js挂载router
```
var express = require('express')
var app = express()
app.use(router)
```

- 注意路由中的文件路径是相对于app.use(router)这个位置的，而不是相对于router.js这个文件的位置
- 注意模版输出的时候，即使渲染为字符串也不会加上引号，也就是说字符串和数字的输出是一样的，直接输出内容
- 表单经过网络的传输，无论是get或者post方法，所有提交的参数都会变成字符

## 中间件
[expressjs官方教程](http://expressjs.com/en/guide/using-middleware.html)

### 理解
自来水厂 => 中间处理（中间件） => 用户

中间件就是中间处理环节，有输入有输出

在原生的nodejs中，在请求到响应之间，有一系列的处理（例如解析get，解析post，获取cookies，获取session，渲染模版等方法），是为了后面更好地处理逻辑，这中间的一个一个处理，这些操作就是中间件
![](https://blog-1257268092.cos.ap-guangzhou.myqcloud.com/Markdown/node-%E4%B8%AD%E9%97%B4%E4%BB%B6.png)

### express的中间件
#### 无需匹配请求路径或者请求方法的中间件
```js
app.use(function (req, res, next) {
    // 所有express的请求都会经过这个中间件
    // 不管任何请求路径或者请求方法
    
})
```
#### 匹配路径而无需匹配方法的中间件
```js
app.use('/b', function (req, res, next) {
    conosel.log(req.url)
    next()
})
```

#### 匹配方法并且匹配路径的中间件
##### app.get()
```js
app.get('/b', function (req, res, next) {
    ...    
})
```
##### app.post()
```js
app.post('/b', function (req, res, next) {
    ...
})
```

#### 全局错误处理中间件
若前面的中间件使用next传入参数，就会立即进入后面的err中间件

当发生错误的时候，可以使用next传递错误参数，那么就会被全局错误处理中间件匹配并处理之

一定要注意参数的个数，个数匹配时，才会定义为错误中间件
```js
app.get('/', function (req, res, next) {
    fs.readFile('./a.txt', function (err, data) {
        if (err) {
            next(err)
        }
        ...
    })
})
app.use(function (err, req, res, next) {
    console.log
})
```

#### 404处理中间件
放到最后，前面的都无法匹配，就会进入到这个中间件
```js
app.use(function (req, res) {
    res.render('404.html')
})
```

#### 第三方的中间件
第三方的中间件一般都会调用一个函数，然后返回一个中间件处理函数

##### parse-body

##### express-session


### 中间件的处理顺序
从上到下匹配中间件，条件符合则进入中间件处理，使用next则结束该中间件控制，继续向下匹配（相当于开启流到下一个地方的阀门）

例子：
```js
// M1
app.use(function (req, res, next) {
    console.log(1)
    next()
})

// M2
app.get('/abc', function (req, res, next) {
    console.log('abc')
    next()
})

// M3
app.get('/', function (req, res, next) {
    console.log('2')
    next()
})

// M4
app.use(function (req, res, next) {
    console.log('3')
    next()
})

// 若输入'/'，会进入M1，M3，M4
```
注意：所有经过的中间件所获取的req，res都是同一个中间件

### 用于查找的新API
- array.find
- array.findIndex

## 学习
- 结构化思维
- 演讲
    - why
    - what
    - how
    - where
    - what