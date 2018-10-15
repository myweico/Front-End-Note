### mongoose中的或语法
```
User.findOne({
    $or: [
        { eamil: '470839856@392.com' },
        { name: 'coco' }
    ]
}, function () {})
```
### 服务器中的状态码
一般服务器都有一个状态的列表信息，里面罗列了状态所对应的信息，一般都是直接返回状态码的信息而不是直接返回信息

### 服务器中默认约定返回JSON格式的字符串
服务器端一般与客户端有个默认规则，方便提高效率，服务器端返回的接口为JSON格式的字符串，客户端将JSON格式的字符串转为对象处理

mongoose中可以使用res.json将对象等转换为JSON格式的字符串，返回返回给客户端

### 使用JavaScriptMD5加密密码
```
var md5 = require('blueimp-md5')

var password = md5(md5(req.body.password))

// 为了别人知道你二次加密，需要添加一个特殊的字符串
var password = md5(md5(req.body.passord) + 'weimy')
```

### 同步提交和异步提交
#### 同步操作
同步提交，浏览器会锁死页面

同步提交之后，无论服务端返回的结果是什么，都会覆盖原来的页面

没有ajax之前，可以加上一些数据，重新渲染原页面
    - 页面可以保持一致，在固定的地方显示信息
    - 交互一致性，避免用户不支持ajax
    - 服务端处理更安全
    - github就是这样的处理

#### 异步操作
异步不会改变当前的页面，可以更好地提高用户的体验

注意，重定向只针对同步请求，异步请求对重定向请求无响应，异步请求相当于现在一个地方接受信息，重定向请求只是发送到那个缓存的地方，没有直接发送回浏览器，因此浏览器并没有重新跳转

异步形式可以通过与服务器端约定接受特定的消息时，表示跳转，然后由客户端自己跳转，例如返回的数据中有一个status的属性，该属性表示301的时候就重新跳转，跳转页面写在json格式对象中的location


### session
Express中默认不支持session，需要安装第三方的中间件：`express-session`

#### 安装
```shell
npm i express-session
```

#### 使用
引入session
```js
var session = require('express-session')
```
一定要在引入路由之前配置路由
```js
app.use(session({
    secret: 'keyboard cat', // 加密字符串，相当于md5(md5('password') + 'keyboard cat')
    resave: false, 
    saveUninitialized: true // 无论是否使用session都分配session_id
}))
```
把这个插件配置好后，可以通过req.session来访问和设置Session成员
    - 添加数据：`req.session.foo = bar`
    - 访问数据：`req.session.foo`

例子：
```js
// 可以将注册用户的信息存储到session中
req.session.user = user
// 每次页面加载主页的使用，通过判断session中是否存在user属性来渲染
// 未登录页面亦或是已登录页面
```
设定了session之后，服务器会自动将将session对应的密匙通过cookie来返回给客户端，每次发送请求的时候，服务器端会通过key来获取session中的值

#### session的声明周期
默认Session数据是内存存储的，服务器一旦重启就会丢失，真正的生存环境中，会将session进行持久化存储

## 总的步骤
1. `npm init`
2. 创建主入口文件app.js
3. 使用express创建服务器
4. 分离router模块，设计路由
5. 设计页面
6. 根据页面逻辑（登录，注册等）设计moggose
7. 开启mongodb，设计模型
8. 在路由中设计业务逻辑

## 总结
- path模块
- `__dirnmae` 和 `__filename`两个属性
- 模版引擎的语法
    - include
    - extend
    - block
- 表单同步提交和异步提交
    - 同步提交后直接渲染整个页面
    - 以前有的甚至直接渲染提示信息，用户需要直接后退重新填写
    - 异步提交不用刷新页面而且不会锁死
- express-esssion
- md5

## 学习方法
直接看例子，容易上手