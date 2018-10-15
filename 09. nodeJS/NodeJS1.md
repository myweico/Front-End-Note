# NodeJS
- [oschina在线工具](tool.oschina.net)
# 为什么学JS
### 职业要求
- front-end
    - 写页面
    - 发请求
    - 用户交互
- back-end
    - 数据交互
    - 只有了解服务端才能更好地后端交流
- 基本的网站开发能力
    - 服务端
    - 前端
    - 运维部署
- 服务端开发语言
    - Java
    - PHP
    - Python
    - Ruby（github的后端）
    - .Net
    - NodeJS：采用javascript 

# NodeJS是什么
> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- Node.js不是一门语言
- Node.js不是库、不是框架
- Node.js是一个JavaScript运行时环境
- Node.js可以解析和执行JavaScript代码
- javascript可以脱离浏览器运行
- Google Chrome的v8引擎是目前工人最快的js解析引擎
- nodejs作者将V8引擎移植出来，开发了一个独立的JavaScript独立开发环境

### 浏览器中的JavaScript
- ECMAScript
    - 基本的语法
    - if
    - var
    - function
    - Object
    - Array
    - BOM
    - DOM

### NodeJS
> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- 没有BOM和、DOM
- ECMAScript

##### NodeJS的API
- 在Node这个JavaScript执行环境中为JavaScript提供了一些服务器级别的操作
    - 文件读写
    - 网络服务的构建
    - 网络通信
    - http服务器
    - 。。。

##### NodeJS特性
- event-driven
- non-blocking I/O model
- lingweight and efficient 轻量和高效

##### npm
> Node.js's package ecosystem, npm, is the largest ecosystem of open source liarary in the world

- npm 是世界上最大的开源库生态系统
- 将绝大多数的JavaScript的相关包存放到一个平台，方便开发人员下载和托管

# Node.js能做什么
- Web服务器后台
    - 游戏服务器
    - 接口服务器
- 命令行工具
    - npm（node）
    - git（C语言开发）
    - hexo（node）
    - 。。。
- 对于前端开发工程师，接触最多的是他的命令行工具
    - 自己写的很少，主要是使用别人开发的包

# 预备知识
- html
- css
- javascript
- 简单的命令行操作
    - cd
    - dir
    - ls
    - mkdir
    - rm
    - mv
- 具备服务器开发经验

# 一些资源
- 深入浅出Node.js
    - 阿里巴巴的朴灵
    - 推荐，偏理论
    - 理解底层原理有帮助
- node.js权威指南
    - api讲解
    - 没有业务，没有实战
- javascript标准参考教程
    - 阮一峰
- node入门
    - 推荐，很短
- 官方api
- 中文文档（版本比较久，凑合看）
- cnode社区
- cnode新手入门
- 《编写可维护的JavaScript》（推荐）

# 知识点
- B/S编程模型
    - Browser - Server
    - back-end
    - 任何服务端技术这种bs编程模型都是一样的，与语言无关
    - nodeJS知识作为学习bs编程模型的一个工具而已
    - 任何语言都只是一种工具
- 模块化编程
    - CSS：`@import('文件路径')`
    - Node可以import JS文件
- Node常用API
- 异步编程
    - 回调函数
    - Promise
    - async
    - generator
    - Express Web开发框架
    - ECMAScript6新语法

# 初体验
### hello world
-  在文件夹下面按住shift右键可以出现在此处打开cmd的选项
-  `node hello.js`
- 文件名不要使用node或者使用中文
- 在node中有没bom以及dom

### 读取文件
1. 使用require方法加载fs核心模块
2. 读取文件第一个参数为读取的文件的路径
3. 第二个参数是一个回调函数（可以第二个参数为编码格式，第三个参数为回调函数）
    - 回调函数的第一个参数为error对象
    - 第二个参数为获取的数据
    - 获取成功：null,data
    - 获取失败：error,null

```
// fs是文件系统的简写
// node中要进行文件操作就需要引入fs这个核心模块
// fs这个核心模块中包含了所有的文件操作api
// 使用require方法加载fs核心文件
var fs = require('fs')

fs.readFile('./data/hello.text',function(error, data) {
    // console.log为ECMAScript中的方法，故可以支持
    // 文件中保存到是二进制数据，会转成16进制显示
    console.log(data)
    // 若想看到代表的的文件，需要使用toString方法
    console.log(data.toString())
})
```

### 写文件
- fs.writeFile()
    - argu1：文件路径（需要路径存在，否则出错）
    - argu2：写入内容
    - argu3：回调函数，回调函数的第一个参数为err

```js
var fs = require('fs');

fs.writeFile('./data/你好.md','大家好，我叫nodejs', function(err) {
	if (!err) {
		console.log('文件写入成功');
	} else {
		console.log(err);
	}
});
```

### http
> 这个模块的职责就是帮你创建服务器

##### 步骤
1. 加载http核心模块
```
var http = require('http');
```
2. 使用http.createServer()方法创建一个Web服务器
```
var server = http.createServer();
```
3. 服务器的职责
    - 接受请求
    - 处理请求
    - 发送请求
    - 发送响应
```
var http = require('http');

// 初始化一个服务器
var server = http.createServer();

// 监听给请求事件，若有请求则触发该事件
server.on('request', function() {
    console.log('接收到请求');
});

// 绑定端口，并且开启服务器
server.listen(3000, function() {
	console.log('启动服务器成功');
}) 
```
- request事件的事件处理函数有两个参数
    - argu1：request对象，获取客户端的一些请求信息，例如请求路径
    - argu2：response对象，响应对象可以用来给客户端发送信息
```
server.on('reponse', function(request, response) {
    console.log(request.url);
})
```
- response有一个方法，write可以用来给客户端发送响应数据
- write可以使用多次，但是最后需要使用end方法来结束响应，否则客户端会一直等待
- 一般都是直接使用end()方法，一旦写完信息后便立即结束

```
server.on('reponse', function(request, response) {
    console.log(request.url);
    response.write('hello');
    response.write(' world');       // hello world
    response.end(); // response.end('收到了');
})
```
- 所有的请求路径都是/开头的，表示网站的根目录
- favicon.ico的请求为请求网站的图标
- 响应数据只能是字符串或者二进制数据
- 可以使用`reponse.setHeader('Content-Type','text/plain; utf-8')`;

# Node中的JavaScirpt
- ECMAScript
- 核心模块
- 第三方模块
- 用户自定义模块

### 核心模块
> Node 为JavaScript提供了很多服务器级别的api，这些api根据功能包装到具体的模块中。例如操作文件的放入到fs模块中，用于http服务构建的放入到http模块中，用于路径操作的放入到path模块中，系统操作的放入到os模块中

##### fs
##### path
##### http
##### os

### 模块系统
##### require
> 用于加载模块，执行模块中的代码，获取模块中的输出对象

- 相对路径必须加上`./`
- 只有一个文件名可以忽略扩展名

##### 模块作用域
- 模块之间的作用域独立，无法直接相互访问

##### 共享数据
- 每个模块中默认都含有一个exports对象，在模块中通过给exports赋值就可以将数据共享到外部
- 在模块外，通过使用require方法引用模块，可以执行模块的代码，并且返回模块的exports对象
```
// b.js
var foo = 'bbb';
exports.foo = foo;

// a.js
var bExports = require('./b');  // 扩展名可以省略
console.log('foo');             // undefined
console.log(bExports.foo);      // "bbb" 

// fs
export.readFile = function (...) {...};
```

### 端口号
- 端口为进行通信的窗口
- IP用于定位计算机，端口号用来指定向哪个服务程序发送请求
- 有网络通信软件都需要监听主机上的某个端口用于接受信息
- 一般不适用常见的端口号，因为他们一般都是被应用程序占用了，调试之类的端口可以使用3000，5000等没有意义的端口
- 一台机器可以使用多个服务，但不同的服务要确保使用不同的端口号

### 解决中文乱码的问题
- 服务器默认发送的数据为utf-8编码，但是由于浏览器不知道你写的是什么内容，所以浏览器就将数据用系统的采用的编码
- 所以应该告诉浏览器传输数据所使用的编码（apache服务器的软件会自动帮你写，而NodeJS需要自己一步一步写）
```
rep.setHeader('Content-Type', 'text/plain; charset=utf-8');
```
- 通过传入content-type告诉浏览器怎么处理传输的数据

### Content-Type
Content-Type用于指定发送的文件类型，以告诉处理者怎么处理数据
- html文件：`text/html`
- jpg：`image/jpeg`，图片不需要编码，编码一般都指的是字符编码

### http结合fs发送文件内容

## 代码风格
### 采用团队的风格

### 大家比较认可的标准
    - JavaScript Standard Style
    - Airbnb JavaScript Style

### 分号问题
注意加分号的情况：
- 一行代码( [ `开头的避免
下面的代码会报错，可以在前面加上分号
圆括号情况
```js
function say() {
    console.log('hellow world');
}

say()

(function () {
    console.log('hello')
})
```

方括号情况
```
function say() {
    console.log('hellow world');
}

say()

['苹果', '香蕉'].forEach(function (item) {
    console.log(item);
})
```

反引号情况
反引号支持换行的字符串
```
`hello`.toString()
```

- 所以有可能看到;开头的代码

### 建议
不管有没有使用分号的风格，都建议上面3种情况都加上分号

有些人也喜欢花里胡哨的东西，例如在前面加上!号或者&等

### 使用Node.js实现Apache的基本功能
##### 实现功能
- 若为文件，直接读取响应
- 若为目录，读取渲染目录列表
- 若为目录并且目录中函数index.html，则直接打开index.html

##### 判断一个路径是文件还是文件夹
- 使用`fs.stat(urlPath, function (err, stats) {})`判别
- 若`stats.isFile()`为true则为文件，若`stats.isDirection()`为true则为文件夹

##### 获取一个文件夹的文件列表
- 使用fs.readdir('path', function (err, dirItem) {})
- dirItem为一个数组，数据元素为该目录下的文件名
```
fs.readdir(filePath, function (err, dirItem) {
if (err) {
  return res.end('Can not get the message of the dirctory.')
}
// 目录里包含index.html，直接打开
if (dirItem.includes('index.html')) {
  fs.readFile(filePath + '/index.html', function (err, data) {
    if (err) {
      console.log('Can not open the index.html')
      return
    } else {
      return res.end(data)
    }
  })
} else {
  // 目录不包含index.html，渲染列表
  // 获取模板
  fs.readFile('./apache-template.html', function (err, data) {
    if (err) {
      throw new Error('Can not open the tempalte file')
      return
    }
    // 获取模板后，渲染模板
    var renderPage = template.render(data.toString(), {
      'files': dirItem
    })
    return res.end(renderPage)
  })
}
})
```

### 模版引擎
##### 使用过程
- 安装 npm i art-template -S
- 加载包 require('packageName')
- 查文档使用api

##### 使用方法
- template.render('模版字符串', {数据对象})
```
template.render(tplStr, {
    name: weico,
})
```
- 使用文件写好模版文件，然后使用fs读取转换成为模版字符串即可

##### 客户端渲染以及服务端渲染的比较
- 客户端渲染
    - 先请求页面再异步请求数据渲染
    - 异步体验好，速度快例如 京东的评论
    - 异步不利于SEO
- 服务端渲染
    - 先在服务端渲染数据再返回完整的页面
    - 例如，JD的商品列表

# 留言本
### app.js
```
// 将所有需要的依赖项都声明在文件模块上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的html放到view中

var http = require('http')
var fs = require('fs')

http
    .createServer(function (req, res) {
        var url j= req.url
        if (url === '/') {
            fs.readFile('./view/index.html', function (err, data)
        }
    }
    .listen(3000, function (err) {
        if (err) {
            console.log('服务创建失败')
        } else {
            console.log('running')
        }
    })
```
- 当浏览器遇到html响应内容之后就要从上到下依次执行，当遇到以下标签的时候，就会发出一个请求
    - link
    - script
    - img
    - iframe
    - video
    - audio
    - 带有src或者href属性的标签
    - 上面的称为具有外链的连接标签

### 处理静态资源
- 为了统一处理静态资源，将所有的静态资源都统一放到一个public目录下
- 哪些资源可以访问，哪些资源不可以访问，都可以通过判断url来控制的
- 全后端都会，你就可以掌控一切
- 开放public资源
```
if (url.indexOf('/public/') === 0) {
    fs.readFile('.' + url, function (err, data) {
        if (err) {
            throw new Error(err.message)
            return res.end('404 Not Found.')
        } else {
            rep.end(data)
        }
    })
}
```

### 处理表单的验证
表单提交分为：
    - 表单的默认提交行为
    - 表单异步提交

form标签中输入处理的url

服务端判断url是否处理表单的url，若为表单处理的url，则进行url处理

url中若带有数据，可以用url模块解析整个url，注意服务器中请求事件的事件处理函数的请求对象只是主机名后面的字符串,然后通过判断pathname进行处理
```
var url = require('url')

server.on('request', function (req, rep) {
    // 获取不含查询字符串的pathname
    // 将查询字符串转为对象处理
    var urlObj = url.parse(req.url, true)
    var pathname = urlObj.pathname
    var qurey = urlObj.query
    if (pathname === '/pinglun') {
        // 请求处理评论
        // 保存数据
        // 重定向回评论页面
        // 因为数据已经改变所以评论页面已经发生改变
        var comment = urlObj.query
        comment.dateTime = '2018-08-25 14:11:22'
        comments.push(comment)
        // 重定向
        
    }
})
```
使用url.parse('url')解析url地址，若输入url.parse('url',true)则将query转为对象

##### 重定向
状态码设置为302临时重定向
```
response.statusCode = 302
```
设置响应头通过Location告诉客户端往哪里跳转
```
response.setHeader('Location', '/')
```
在浏览器中勾选`preseve log`可以查看重定向的日志

Node 不适合从来接触服务端的人学习，如果想要真正的学好服务端，还是老牌的Java、PHP这些平台

Node其实很厉害，具有经验的人可以玩得十分溜

不是很适合新手因为比较偏底层，而且太灵活

Java、php好入门的原因待遇这些平台屏蔽了一些底层，比如res.redirect('重定向')

##### 需求
1. index.html
2. 开放public目录中的静态资源
3. /post post.html
4. /pinglun
    1. 接受表单提交数据
    2. 存储表单提交的数据
    3. 表单重定向