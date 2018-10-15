## ES6中代码的变化
### 模块化
#### 导出
##### export default
默认导出可以没有名字，并且接受导入的时候可以使用任意的变量
```js
export default {
    ...
}
```

##### export
平常的导出需要制定名称，引用的时候也要指定名称
```js
// 导出变量
export var name = 'weimy'

// 导出函数
export funcion add (a + b) {
    return a + b
}

// 批量导出
var a = 1
var b = 2
export { a, b }
```

#### 导入
##### import x from
获取一个文件中的默认导出对象，可以使用任何名字接受
```js
import app from 'app.js'
```

##### import {} form 
可以获取一个文件对应的输出量，名字要与文件导出的一致
```js
import { name, add } from 'myPackage.js'
```

### 对象语法
#### 对象属性的简写
若对象中属性名字与引用的对象名字相同，则可直接写该对象的名字
```js
var user = {
    name: 'weimy',
    age: 18
}

var message = {
    user
}
```

#### 方法的简写
若方法是一个匿名函数，则可直接忽略`: function`
```js
var obj = {
    add (a, b) {
        
    }
}
```

### 箭头函数
箭头函数主要用于替换匿名函数，并且里面的this恒指向最近的对象
```js
var add = (a, b) => {
    return a + b
}

// 若只有一行代码，可以省略{}
// 若该一行代码为return语句，可以忽略return
// 上面的行数可以写为
var add = (a, b) => a + b
```