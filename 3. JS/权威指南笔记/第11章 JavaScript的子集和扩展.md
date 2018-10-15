## JavaScript的子集
#### 精华
- 目标：简化语言，规避怪癖和缺陷部分，使编程更轻松，程序更健壮
- 不包含with和continue、eval函数
- 提倡使用函数定义表达式而不是函数定义语句定义函数
- 循环体和条件分支都使用花括号扩起来，不允许使用一条语句的时候省略花括号
- 任何语句只能使用花括号或者分毫结尾
- 子集中并未包含逗号运算发、位运算符以及“++”和“--”。也不包含“\==”和“!=”（推荐使用“\=\==”和“!==”
- 由于JavaScript不包含块级作用域，var语句只能出现在函数体的顶部，并要求将函数内所有变量声明写在一条var语句中，子集中禁止使用全局变量

#### 子集的安全性
- 安全子集比精华子集要更大，用于在容器或者“沙盒”中更安全地运行不可信的第三方JavaScript代码
- 所有破坏这个沙盒并且影响全局执行环境的语言特性和API在这个安全子集中是禁止的
- 每个子集都带有一个静态的检查器，用于对代码进行解析检查确保代码符合子集规范
- 由于检查其的检验规则比较严格，因此有一些沙盒系统定义了范围更广、检验更松散的子集，并添加了代码转换

##### 要通过安全检查，某些特性必须移除：
- 禁用eval()和Function()构造函数
- 禁用this
- 禁用with
- 禁用某些全局变量，例如window和document
- 禁用某些属性和方法，例如argument的caller和callee，函数的call()和apply()方法以及constructor和prototype两个属性
- 禁止使用[]方括号存取，会将其转为全局函数，通过调用全局函数查询和设置对象属性
- 安全子集有：ADsafe、dojox.secure、caja、FBJS、Microsoft Web Sandbox

## JavaScript的扩展
#### 常量
- 在JS1.5以及后续版本可以使用const定义常量，对常量重新赋值会失败但不报错，重复声明会报错
- const是JS的保留字（没有使用）

```js
const pi = 3.14;
pi = 4;                 // 失败，但不报错，直接忽略
const pi = 4;           // 重复声明会报错
var pi = 4;             // 在声明变量也会报错
```
- const和var行为类似，常量会被提前到函数定义的顶部

#### 局部变量
- JavaScript的变量缺少块级作用域的支持被普遍认为是其短板
- 在JS1.7中，针对这个缺陷增加了关键字let，其在JS1.7后的版本才能识别，需要手动加入版本号
- 如果使用Spidermonkey和Rhino作为单独的解析器，可以使用命令行指定语言版本，或者调用内置函数version()来指定版本（版本号要乘100）
- 若在Firefox中，通过标签扩展版本
```html
<script type="application/javascript; version=1.8">
```
- 关键字let有4种方式：
    - 用于变量声明，和var一样
    - 在for和for/in的循环种，作为var的替代方案
    - 在语句块中定义新变量并显式指定他的作用域
    - 定义一个在表达式内部作用域的变量，这个变量只在表达式内可用

- 使用let替代var后，变量便具有块级作用域，通过let声明的变量只属于就近的花括号括起来的语句（包括它所嵌套的语句块）
- 在声明语句中使用let，其只在作用域中解析赋值语句，在循环体的初始化中，其在外部的作用域解析
```js
let x = 1;
for (let x = x + 1; x < 5; x++) {   
    // x初始化为2，x一开始为作用域外的结果
    console.log(x);                     // 书本为2~4，实际上，没有输出
}

{
    let x = x + 1;                      // NaN
    console.log(x);                     // 输出NaN
}
```
- let也会变量提前声明
- 使用一个圆括号初始化然后使用花括号使用可以在外部的作用域解析
```js
let x = 1, y = 2;
let (x = x + 1; y = x + 2) {
    console.log(x + y);                 // 书本输出5，实际出错
};
console.log(x + y);                     // 输入3
// --------------------------------------
let x = 1, y = 2;
console.log(let (x=x+1, y=x+2) x+y);    // 书本上是5，实际报错
```

#### 解构赋值
- Spidermonkey1.7实现了一种混合式赋值，我们称之为“结构赋值”
- 当发生解构赋值时，右侧的数组和对象中的一个或多个指会提取出来（解构），然后一次赋值给左侧对应的变量名

```js
let [x, y] = [1, 2];                    // 等价与 x = 1, y = 2;
[x, y] = [x + 1, y + 1];                // x = x + 1, y = y + 1, [2, 3]
[x, y] = [y, x];                        // 交换x，y的值，[3, 2]
console.log([x, y]);                    //  [3, 2]

// 变量的情况
let transparent = { r:0.0, g:0.0, b:0.0, a:1.0 };
let {r:read, g:green, b:blue} = transparent;    // red => 0.0, green => 0.0, blue => 0.0

// 将Math对象解构赋值给对应变量
let [sin:sin, cos:cos, tan:tan] = Math;
```
- 当函数使用数组返回结果时，可以使用解构赋值简化程序代码
- 解构赋值左边多余的变量为undefined，右边多余的值将会省略

```js
let [x, y] = [1];                       // x => 1, y => undefined
[x, y] = [1, 2, 3];                     // x => 1, y => 2, 3忽略
[, x, , y] = [1, 2, 3, 4];              // x => 2, y => 4
```

#### 迭代
##### for/each循环
- for/each循环用于遍历对象的属性值（for/in用于遍历对象的属性名）

```js
let o = {one:1, two:2, three:3 }            
for (let p in o){ console.log(p); }             // => 输出"one", "two", "threee"
for each (let v in o) { console.log(v) }        // => 1~3

// 可用于遍历数组
a = ['one', 'two', 'three'];
for (let p in a) { console.log(p)               // => 0, 1, 2
for each (let v in a) { console.log(v) }        // => 'one', 'two', 'three'
```

##### 迭代器
- 迭代器是一个对象，这个对象允许对它的值集合进行遍历，并保持任何必要的状态以能够跟踪当前遍历的位置
- 迭代器必须包含next()方法，每次调用next()函数返回集合中的下一个值

```js
// 返回迭代器的一个函数
function counter(start) {
    let nextValue = Math.round(start);
    return { next: function() {return nextValue++; }};
}
let serialNumberGenerator = counter(1000);
let sn1 = serialNumberGenerator.next();         // 1000
let sn2 = serialNumberGenerator.next();         // 1001
```
- 当迭代器用于有限的集合，遍历完所有的值并且没有多余的值可迭代时，再调用next()方法会抛出StopIteration
```js
// 返回一个迭代器的函数，迭代某个范围内的整数
function rangeIter(first, last) {
    let nextValue = Math.ceil(first);
    return {
        if (nextValue > last) throw StopIteration;
        return nextValue++;
    };
}

// 使用这个范围的迭代器进行一次糟糕的迭代
let r = rangeIter(1, 5);
while(true) {
    try {
        console.log(r.next());
    }
    catch(e) {
        if (e == StopIteration) break;
        else throw e;
    }
}
```
- JS1.7对for/in循环的功能进行了扩展，可以用它来遍历可迭代的对象。若in右边的对象时可以迭代的，则会自动调用它_iterator_()方法产生迭代器对象。使用其next()方法，赋值给循环变量，随即执行循环体。
- 可以使用Iterator()函数从一个可迭代对象中获取一个迭代器（调用其_iterator_方法返回），如果给Iterator()函数传入第二个参数，这个参数也会参与_iterator_()方法的调用
- 若Iterator()传入的对象没有定义_iterator_()方法，则会返回一个可迭代的自定义迭代器，每次使用迭代器的next()方法会都返回包含属性名和属性值这两个值的数组
- Iterator()函数返回的迭代器有两个特性：
    - 只对自由属性进行遍历而忽略继承的属性
    - 所第二个参数传入ture，返回的继承其只对属性名进行遍历
```js
for (let [k, v] in Interator({a:1, b:2})) {
    console.log(k + " = " + v);             // => a = 1, b = 2;
}

o = {x:1, y:2};
Object.prototype.z = 3;
for (let p in o) { console.log(p); }        // => x, y, z
for (let q in Iterator(o, true))            // => x, y
```
##### 生成器
- 用到关键字yield，JS版本为1.7
- 用法与retrun类似，返回函数的一个值，使用yield的函数会产生一个保持函数内部状态的值
- 任何使用yield的函数都称为“生成器函数”，生成器函数只通过yeild返回值，return用于终止函数的执行而不返回任何值
- 生成器函数使用function声明、typeof检测的类型也是function、并且也可以继承function.prototype的方法和属性
- 调用生成器函数并不返回一个值，而是返回一个生成器对象
- 生成器对象表示生成器函数的当前状态，其定义了一个next()方法。next()方法可以恢复生成器的执行，直到下一条yield语句为止。（每次从yield处出去，下次调用next()保留上次调用结果再从yield表达式后面继续执行），生成器函数中yield的返回值就是生成器next()方法的返回值
- 如果生成器函数通过执行return语句或者到达函数体末终止，那么生成器的next()方法将抛出一个StopIteration
- 只要一个对象包含可抛出StopIteration的next()的方法，它就是一个迭代器对象，可以使用for/in循环

```js
// 针对一个整数范围定义一个生成器函数
function range(min, max) {
    for(let i = Math.ceil(min); i < max; i++) {
        yield i;
    }
}

// 调用生成其函数获得一个生成器
var generator = range(3, 8);
for (let n in generator) {
    console.log(n);                 // 输出数字3-8
}

// ---------------------------------------------------
// 一个用以产生Fibonacci数列的生成器函数
function fibonacci() {
    let x = 0, y = 1;
    while (true) {
        yield y;
        [x, y] = [y, x + y];
    }
}
// 调用生成器函数生成一个生成器
var f = fibonacci();

// 输出Fibonacci的前十个树
for (let i = 0; i < 10; i++) {
    console.log(f.next());
}
```
- fibonacci()的生成器没有返回，也不会运行到程序结尾，因此不能将其用作一个迭代器，不可以使用for/in循环
- 当不再使用生成器的时候，使用f.close()方法将其关闭，相当于在函数挂起的位置执行了一条return语句
- 生成器有一个send()方法，其也可以像next()一样重启生成器的执行，但是send()可以接受一个参数作为yield表达式的返回值
- 可以使用throw()语句重启生成器

```js
// 例子11-1，P281，一个生成器管道
// 一个生成器，每次产生一行字符串
function eachline(x) {
    let p;
    while ((p = s.indexOf("\n")) != -1) {
        yield s.substring(0, p);
        s = s.substring(p + 1);
    }
    if (s.length > 0) yield s;
}

// 一个生成器函数，对于每个可迭代的i的每个元素，都会产生一个f(x)
function map(i, f) {
    for (let x in i) yield f(x);
}

// 一个生成器函数，针对每个结果都为true的f(x),为i生成一个元素
function select(i, f) {
    for (let x in i) {
        if (f(x)) yield x;
    }
}

// 准备处理这个字符串
let text = "#comment \n \n hello \n world\n quit \n unreached \n";

// 现在创建一个生成器管道来处理它
// 首先，将文本分割成行
let lines = eachline(text);

// 删除行首和行尾的空格
let trimmed = map(lines, function{line) {
    return line.trim(); 
});

// 最后，忽略空行和注释
let nonblank = select(trimmed, function(line){
    return line.length && line[0] != "#";
});

// 从管道中取出经过删减和筛选出来的行对其进行处理,知道遇到quit的行为止
for (let line in nonblank) {
    if (line === "quit") break;
    console.log(line);
}

// -----------------------------------------
// 生成器函数，从某个初始值开始计数
// 调用send()增加某个增量
// 调用生成器的throw("reset")来重置初始值
// 代码只是示例，不建议使用throw()这种方法
function counter(initial) {
    let nextValue = initial;
    while(true) {
        try {
            let increment = yield nextValue;
            if (increment) {
                nextValue += increment;
            } else {
                nextValue++;
            }
        }
        catch (e) {
            if (e === "reset") {
                nextValue = initial;
            } else {
                throw e;
            }
        }
    }
}

let c = counter(10);                        // 用10来创建生成器
console.log(c.next());                      // => 10
console.log(c.send(2));                     // => 12
console.log(c.throw("reset"));              // => 10, 注意会重新运行
```

#### 数组推导
- 数组推导是用另外一个数组或者可迭代对象来初始化数组元素的技术（从python中借用而来）
- 数组推导的语法为：
```definition
[expression for (variable in object) if (condition)]
expression: 对过滤后的值进行运算
for(variable in object): 迭代object中的值也可以使用for each循环
if (condition): 过滤迭代的值
```
- 例子

```js
// 例子1，返回1~10之间，偶数的的平方值
let evensquares = [x*x for(x in range(0, 10)) if (x % 2 === 0)]

// 上面的代码与下面等价：
let evensqures = [];
for (x in range(0, 10)) {
    if (x % 2 === 0) {
        evensquares.push(x);
    }
}

// 例子2
data = [2, 3, 4, -5];
squares = [x*x for each (x in data) if (x >= 0)];

// 如果数组元素是非负数，求它的平方根
roots = [Math.sqrt(x) for each (x in data) if (x >= 0)];

// 将一个对象的属性名放入新创建的数组中
o = {a:1, b:2, f:function(){}};
let allkeys = [p for (p in o)];
let ownkeys = [p for (p in o) if (o.hasOwnProperty(p))];
let notfuncs = [p for ([k, v] in Iterator(o)) if (typeof v !== "function")];
```

#### 生成器表达式
- JS1.8中，将数组推到中的方括号变为圆括号就是生成器表达式
- 生成器表达式返回值是一个对象
- 生成器表达式可以惰性求值，当有需要的时候才求值
- 使用生成器表达式需要对值进行顺序读取额如是随机读取

```js
// 前面生成器的函数map()
function map(i, f) {
    for (let x in i) yield f(x);
}

// 使用生成器表达式获取生成器
let h = (f(x) for(x in i));

// 对上面的生成器函数进行重写
let lines = eachline(txt);
let trimmed = (l.trim() for(l in lines));
let nonblank = (l for (l in trimmed) if(l.length > 0 && l[0] !== "#"));
```

#### 函数简写
- 对于简单的函数，JavaScript1.8引入了一种简写形式：表达式闭包
- 如果函数只计算一个表达式并返回它的值，关键字return和花括号都可以省略，表达式紧贴在参数列表后面即可

```js
let succ = function(x) x+1;
let yes = function() true;
let no = function() false;

// 对数组进行降序排序
data.sort(function(a, b) b - a);

// 计算数组的平方和
let sumOfSquares = function(data) Array.reduce(Array.map(data,function(x) x*x), function(a,b) a+b);
```

#### 多catch语句
- 当产生一个异常时，程序会尝试依次执行每一条catch语句
- 当catch语句条件表达式为真的时候，执行catch内的语句，然后跳过其他的catch语句
- 若没有条件表达式默认为真
- 若没有一条catch语句执行，则会向上抛出未捕获的异常

#### EX4：ECMAScript for XML （P286）

