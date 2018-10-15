# MongoDB
[菜鸟教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)

## 关系型数据库和非关系型数据库
### 关系型数据库
表就是关系
或者说表与表之间存在关系
- 所有关系型数据库都需要通过sql语言来操作
- 所有关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
    - 唯一
    - 主键
    - 默认值
    - 非空

### 非关系型数据库
- 非关系数据库库非常灵活
- 有的菲关系型数据库就是key-value对
- MongoDB是长得最像关系型数据库的菲关系型数据库
    - 数据库 => 数据库
    - 数据表 => 集合（数组）
    - 表记录 => （文档对象）
- MongoDB不需要设计表结构
- 你可以任意往里面存储数据

## 基本概念
可以有多个数据库，多个集合，多个文档，文档的结构没有任何限制

MongoD非常灵活，不需要像MySQL那样先创建库，表，设计表结构

MongoDB只需要插入数据的时候，指定往哪个数据库集合里面插入数据，MongoDB就会帮你自动完成艰苦建表这件事

```js
{
    qqDb: {
        // qq数据库，对象
        userCol: [
            // 用户集合
            user1: {
                // 文档
                name: '张三',
                age: 15
            },
            user2: {
                name: '李四',
                age: 16
            }
        ],
        productsCol: [
        
        ]
    },
    taobao: {
        
    },
    baidu: {
        
    }
}
```

## 安装
[官网community版本](https://www.mongodb.com/download-center?jmp=nav#community)

安装完成后，需要将安装目录下面bin的路径添加到环境变量中

## 启动和关闭数据库
mongodb默认情况下使用mongod命令，会在所处盘根目录下的`data/db`作为自己的数据存储目录，所以第一次执行该命令之前先自己手动新建一个 /data/db

#### 开启服务命令
```
mongod
```

#### 修改默认的数据存储目录
```
mongod --dbpath=数据存储目录路径
```

#### 停止命令：
```
ctrl^c

alt+F4
```

## 连接和退出数据库
#### 连接：
```shell
# 该命令默认连接本机的MongoDB服务
mongo
```

#### 退出：
```shell
# 在连接状态下输入exit退出连接
exit
```

## 常用命令
#### 查看数据库
```
show dbs
```
#### 查看当前的数据库
```
db
```
#### 切换到数据库
没有的话会自动创建（虚拟的，使用db可以显示），当插入数据的时候就可以真正地创建
```shell
# 切换数据库，use 数据库名称
use test
```
#### 插入数据
```shell
db.students.insertOne({"name": "Jack"})
```
#### 显示集合
```shell
show collections
```
#### 查看集合
```shell
db.students.find()
```

## 在Node中操作数据库
### 使用MongoDB操作
[github文档](https://github.com/mongodb/node-mongodb-native)

一般不使用原生的包，比较麻烦

### 使用第三方包mongoosejs
[mongoose官网](https://mongoosejs.com/)

对原生的包进一步包装，可以更简单
 
## Mongoose的使用
> 由WordPress 开发团队开发

#### 简单的demo
```js
// 引用包
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 连接数据库
// 指定连接的数据库，若不存在，会自动创建一个虚拟的数据库，当插入一个数据的时候，数据库就会真正地创建
mongoose.connent('mongodb://localhost/weimy')

// 设计集合结构（表架构）
// 字段名称就是表结构中的属性名称
// 约束是为了数据的完整性以及统一性，保证不存在脏数据
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

// 将数据结构发布为模型
// mongoose.model方法就是用来将一个架构发布为model
// 第一个参数为大写名词单数字符串，表示数据库名称，然后mongoose会自动将其转为小写复数名词作为集合？？？User并未作为数据库名称，数据库名称为连接的weimy，然后其下面只有一个users集合
// 第二个参数就是架构Schema
// 返回一个模型对象，或者模型构造函数
var User = mongoose.model('User', userScheme)

// 有了模型构造函数之后，就可以利用这个构造函数对users中的数据增查改删

// 新添
var admin = new User({
    username: 'admin',
    password: '123456',
    email: 'admin.com'
})

// 持久化
// 回调函数的第二个参数会传入生成的数据
admin.save(function (err, ret) {
    if (err) {
        console.log('Svae failed')
    } else {
        console.log('Saved')
        console.log(ret)
    }
})
```

#### 新增
```js
// 新添
var admin = new User({
    username: 'admin',
    password: '123456',
    email: 'admin.com'
})
```

#### 持久化
```js
// 持久化
// 回调函数的第二个参数会传入生成的数据
admin.save(function (err, ret) {
    if (err) {
        console.log('Svae failed')
    } else {
        console.log('Saved')
        console.log(ret)
    }
})
```

#### 查询
##### 查询所有
即使没有找到数据，结果也是一个空数组
```js
User.find(function (err, ret) {
    if (err) {
        console.log('Read failed')
    } else {
        console.log('Read: ' + ret)
    }
})
```

##### 条件查询，多个的查询
若没有结果，返回[]

若结果只有一个，返回包含该对象的数组

若结果有多个，返回一个数组
```js
User.find({ name: 'zs' }, function () {
    if (err) {
        console.log('Find failed')
    } else {
        console.log('Found: ' + red)
    }
})
```

##### 条件查询，只查一个
不输入参数就返回第一个
```js
User.findOne({
    username: 'zs',
    password: '1234556789'
}, function (err, ret) {
    if (err) {
        console.log('Read failed')
    } else {
        console.log('Found result: ' + ret)
    }
})
```

#### 删除数据
##### 根据条件删除所有
```js
// 根据条件删除，符合条件的全部删除
User.remove({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log('Remove failed')
    } else {
        console.log('Removed')
    }
})
```

##### 根据条件删除一个
```js
Model.findOneAndRemove(conditions[,options][,callback])
```

##### 根据id删除一个
```js
Model.findByIdAndRemove(conditions[,options][,callback])
```

#### 更新数据
##### 根据条件更新所有
```js
Model.update(conditions[,options][,callback])
```

##### 根据条件更新一个
```js
Model.findOneAndUpdate([conditions][,update][,callback])
```

##### 根据ID更新
```js
User.findByIdAndUpdate('5b85efd67708d110243c0ac2', {
    password: '123'
}, function (err, ret) {
    if (err) {
        console.log('Update failed')
    } else {
        console.log('Updated')
    }
})
```

## 查询语句
### 语法“或”
```
>db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

## 注意
- mongoose中自动生成的id名为`_id`