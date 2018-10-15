# Node操作MySQL
[官网]()
## 安装
```shell
npm i mysql -D
```

## 创建连接
```js
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users'
})
```

## 连接
```js
connection.connect()
```

## 执行数据操作
所有的操作都使用`connection.query('command', function () {})`
```js
// 查询
connection.query('SELECT * FROM `users`', function (error, results, fields) {
    if (error) throw error
    console.log('The result is: ', result)
})

// 插入语句
connection.query('INSERT INTO users VALUES(NULL, "admin", "123456")', function (error, results, fields) {
    if (error) throw error
    console.log('The result is: ', result)
})
```
## 关闭连接
```js
connection.end()
```