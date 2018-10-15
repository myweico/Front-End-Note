# NodeJS2
## 版本
- x.x.x
- 第一个为大版本
- 第二个为添加功能
- 第三个为修复bug或者提高性能

## 复习
### NodeJS 和 PHP的区别
Node Server偏向于底层，什么都是自己编写的

PHP+Apache默认帮我们风转好很多底层的细节操作

在Node中，我们开启的Web服务器是一个完全的黑盒子，用户只能访问指定的资源

而php无论是网页或者代码，都可以通过web url路径来访问

nodeJS可以把url地址精简得十分优雅和漂亮（将url映射到哪里就哪里，做什么处理都可以）

php也可以做到，但是比较困难

### 重定向
- 301：永久重定向，记录在缓存中，下次连接直接重定向
- 302：临时重定向，下次还是重新连接到原网站

##  Node中的模块系统
 - ECMAScript语言
 - 可信模块
 - 第三方模块
 - 自己写的模块

#### 什么是模块化
- 文件作用域
- 通信规则
    - 加载 require
    - 导出 

## CommonJS模块规范
在Node中的JavaScript有一个重要的概念：模块系统
- 模块作用域
- 使用require方法用来加载模块
- 使用module.exports接口对象导入模块中的成员
- 若一个模块想世界导出一个成员可以直接赋值module.exports
```js
module.exports = add
```
### 加载`require`
syntax:
```
var 自定义变量名称 = require('模块')
```
两个作用：
- 执行被加载模块的代码
- 获取加载模块导出的成员

### 文件操作路径和模块标识路径问题
- `./data/a.js`当前目录
- `data/a.js` 当前目录
- `/data/a.js`磁盘根目录
- `c:/data/a.js`C盘的相对路径

#### 相对路径
文件操作中的相对路径可以省略`./`
```
fs.readFile('data/a.txt', function (err, data) {
    if (err) {
        return console.log('读取失败')
    } else {
        console.log(data.toString())
    }
})
```

在模块加载中，相对路径的./不能省略

#### 直接写/
`/`表示磁盘根目录


### 导出`exports`
Node是模块作用域，模块间无法直接访问对方的作用域

若一个模块想分享成员给外部，需要将成员加入到exports对象中

分享多个成员:
```
exports.foo = 'ok'
exports.add = function (a, b) {
    return a + b
}

// 也可以
module.exports = {
    foo: 'ok',
    add: function (a, b) {
        return a + b
    }
}
```

分享单个成员
```
mudle.exports = function (x, y) {
    return x + y
}
```

### 模块的模型
可以认为在Node的模块都有一个内部的module对象，module对象中，有一个成员exports，若外部模块通过require获取模块，则会返回这个module中的exports对象

但是发现每次赋值的时候，`.`太多了，所以Node单独设定一个变量exports，令`var exports = module.exports`

exports只是对module.exports的引用，最后return的实质上还是module.exports

exports.foo实质上更改的还是module.exports.foo

对exports或者module.exports赋值都会断开彼此的联系

### jQuery的each和js原生中的foreach
- jq2以及以下的each可以兼容ie8，js中的foreach是es5支持的，不兼容ie8
- jq对象不支持foreach方法，可以通过下面的方法使用
```
[].slice.call(jq对象)
```

### require加载规则
优先从缓存中加载，加载过的不会再加载，再次加载是是为了获取其输出接口
```
// main.js
require('/a')
require('/b')

// a.js
console.log('a被加载了')
require('/b')

// b.js
console.log('b被加载了')

// b只会被加载一次，因为node会判断b是否加载过，因为b在a中已经被加载过了，所以不会再加载，这里是为了获取b模块的输出的对象
```

若为非路径形式的模块表示，node会认为是核心模块或者第三方模块

路径形式：
```
./a.js
../
/               // 绝对路径
c:/             // 绝对路径
```
.js 后缀名可以省略

核心模块的本质也是文件，但是已经被编译到二进制文件中，只需要通过按照名字来加载就可以了

既不是核心模块，也不是路径形式的模块，会
1. 先找到当前文件所处目录中的node_modules目录
2. 找node_module/art-template
3. node\_module/art-template/package.json
4. node\_module/art-template/package.json中的main属性
5. main属性记录了art-tamplate的入口模块地址
6. 然后加载使用这个第三方包
7. 最终加载的还是文件
8. 如果package.json文件不存在或者main的入口地址不靠谱就会尝试找当前模块目录下的index.js
9. 如果上面任何一个条件都不成立，都会按照上一级查找node_modules依次查找
10. 如果上一级还没有就到上上一级查找
11. 。。。
12. 直到当前根目录都没有找到，就会报错`Can not find module xxx`

一般一个项目有且仅有一个node_modules并且放到项目的额根目录

> 如果想要理解更多的更多的细节，参考朴灵的《深入浅出Node.js》或者博客《深入node.js模块》

## npm 和 package.json
package.json会描述你包的信息

可以通过`npm init`创建package.json文件
```
npm init
```
初始化会提示下面的信息
```
name:
version
descripttion
entery point
test command
git repository
keywords
author
licence
```

`--save`或者`-S`修饰符用于说明这个安装是一个依赖项

若node\_modules被删了，可以使用
```
// 根据package中的依赖包描述下载
npm install
```

#### package-lock.json 和package.json
npm5以前是不会有`package-lock.json`这个文件的，在npm5之后才有

安装包的时候，npm都会生成或者更新`package-lock.json`

一个包可能会有其他依赖，npm会下载相关的依赖，因此下载的过程会分析依赖，这个`package-lock`会保存所有依赖的地址，以便删除后可以单独下载某个依赖项

从文件来看，有一个`lock`，称之为锁，可以锁定版本，`^1.11.1`表示该该版本以上，如果重新install，其实下载的不是`1.11.1`，而是会升级到最新的版本，有时候新版本可能会有所改变，导致依赖不可用，因此添加了lock文件来锁定这个版本

### npm网站（搜包和发包）
[npmjs.com](http://npmjs.com)

### npm命令
- npm --version 
    - 查看npm版本
- npm init 
    - 创建一个package.json包描述文件
    - npm init -y 跳过想到，快速生成
- npm install
    - 一次性把dependencies中的依赖项全部安装
    - npm i
- npm install --save 包名
    - 下载依赖项并保存道package.json中
    - npm i -S
- npm install --global 包名
    - npm i -g
- npm install --dev 包名
    - npm i -D
- npm uninstall
    - 只删除，依赖项依然会保存
    - npm un
- npm uninstall --save
    - 删除并且删除依赖项
    - npm un -S
- npm help
    - 查看帮组
- npm 命令 --help
    - 查看命令的使用规则
    - 例如忘记某个命令的简写，可以使用`npm uninstall --help`

### 解决npm被墙问题
安装淘宝的npm镜像cnpm
```
npm install --global cnpm
```
将安装包的时候把之前的npm替换成cnpm
```shell
# 这里走国外的npm服务器，速度比较慢
npm install jquery

# 使用cnpm就会通过淘宝的服务器下载
cnpm install jquery
```

如果不想安装cnpm邮箱使用淘宝的服务器来下载
```shell
npm install jqurey --registry=https://registry.npm.taobao.org
```
每一次都手动加参数很麻烦，所以加入到配置文件中
```shell
# 配置设置中registry
npm config set registry https://registery.npm.taobao.org

# 查看npm配置信息
npm config list
```
也可以安装nrm继续管理
```shell
# 安装
npm i nrm -g

# 查看来源
nrm ls

# 切换来源
nrm use taobao
```

## JavaScript 模块化
> JavaScript天生不支持模块化

浏览器模块化
- `<script>`标签引用加载，需要考虑加载的顺序
- require.js    第三方 AMD
- sea.js        第三方 CMD

无论是CommonJS，AMD，CMD，EcmaScript 6 Moudles都是为了解决JavaScript模块化问题

CommonJS，AMD，CMD都是民间的

ES在2015年发布了EcmaScript2016官方标准，其中就包含了官方对JavaScirpt模块化的支持，这时候语言就天生支持了

但是由于太新了，很多JavaScript运行环境还不支持

Node在8.5版本之后才对EcmaScript 7 Module进行了支持

EcmaScript6可以编译为EcmaScrpt5在低版本的运行环境中支持

## Promise
> 可以参考阮一峰老师的es6中的promise

未解决异步操作的顺序性，需要将事件嵌套，容易引起回调地狱问题（嵌套太深），所以引入了promise解决回调地狱问题

promise相当于一个容器，里面存放了一个异步任务，一开始为pending状态（正在执行），有可能变为resolved（成功，解决）或者rejected（失败，拒绝）

promise是一个构造函数，使用一个包含异步操作的函数初始化

Promise构造函数一旦创造，就会立即执行里面的函数

### 使用
```js
var p = new Promise(function (resolve, reject) {
    fs.readFile('./a.txt', function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

p.then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err)
})
```

### 解决嵌套问题
then可以设置由上一个then函数中返回的Promise对象

如果then中的成功函数return一个数值，则该数值作为下一个then函数的data数据
```js
var fs = require('fs')

function pReadFile(filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./a.txt')
    .then(function (data) {
        console.log(data)
        return pReadFile('./b.txt')
    })
    .then(function(data) {
        console.log(data)
        return pReadFile('./c.txt')
    })
    .then(function(data) {
        console.log(data)
    })
```