# 1.起步
动态网站指的是网页的源代码会与实时的数据结合产生新的页面，也就是页面会实时更新。

> PHP一开始是Personal Home Page，后面更名为Personal Home Page: Hypertext Preprocessor，是一种广泛引用的脚本语言，可以嵌入到HTML中，尤其适合做动态网站开发

我理解的动态页面：页面会和某些服务端代码结合在一起，每次客户端请求服务端将会执行文件中代码生成新的页面返回给客户端。

## 1.1 PHP标记
> http://php.net/manual/zh/language.basic-syntax.phpmode.php

- `<?php`可以让代码进入到PHP模式
- `?>`可以让代码推出PHP模式
- PHP输出的代码将会出现在嵌套的文件中
- 若忽略结束标记，不会产生额外的空行，输出的只有PHP产生的结果

## 1.2 输出内容的方式
- echo
    - 可以输出多个字符串
    - echo是特殊的指令，无需使用`()`调用

```php
<?php 
echo "hello php";
echo "hello", "world";
?>
```

- print
    - 只能输出一个字符串
    - 不能正确输出完整的类型
```php
<?php 
print "hello world!";
print false;        // => ,什么没输出
print ture;         // => 1
?>
```

- var_dump
    - 是一个函数，常用于调试
    - 可以输出类型的结构组成

```php
<?php
var_dump(false);    // => bool(false)
var_dump(true);     // => bool(true)
```

## 1.3 与HTML混编
- 普通嵌入
```php
<p><?php echo "hello" ?></p>
```

- 语句混编（结构使用括号）
```php
<?php if ($age >= 18) { ?>
    <p>成年人</p>
<?php } else { ?>
    <p>小盆友</p>
<?php } ?>
```

- 命令混编（结构使用命令语）
```php
<?php if ($age >= 18): ?>
    <p>成年人</p>
<?php else: ?>
    <p>小盆友</p>
<?php endif ?>
```

## 1.4 注释
- 单行注释： `//`或者`#`
- 多行注释：`/* comment */`

# 2. 语法
- 变量
- 运算符
- 字面量
- 结构
    - 顺序结构
    - 分支结构
    - 循环结构
- 函数

## 2.1 变量
- 声明使用美元符`$`后面跟一个变量名表示
- 区分大小写
- 无需声明类型
```php
<? php
// 声明变量，但未赋值
$foo;

// 声明bar变量，并赋值字符串
$bar = 'baz';
```

### 2.1.1 数据类型
- string，字符串
- integer，整型
- float，浮点型
- boolean，布尔型
- Null，空类型
- array，数组
- object，对象
- Resource，资源类型
- Callback/Callable，回调类型和可调用类型

#### 字符串
- 单引号字符串
    - 不支持特殊的转义字符，例如`\n`
    - 表示一个单引号，使用`\'`
    - 表示反斜杠，使用`\\`

- 双引号字符串
    - 支持转义符号
    - 支持变量解析

- 例子

```php
<?php
// ===== 单引号 =====
echo 'hello\nworld';
// => 'hello\nworld'

echo 'I\'m a better man';
// => 'I'm a better man'

echo 'OS path: C:\\Windows'
// => 'OS path: C:\Windows'

// ===== 双引号 =====
echo "hello\nworld";
/* => 
'hello
world'
*/

echo "I\'m a better man";
// => "I'm a better man"

echo "OS path: C:\\Windows"
// => "OS path: C:\Windows"

$name = "Weico";
echo "$name is a handsome boy"
// => "Weico is a handsome boy"
```

- 字符串函数
> - [PHP官网](http://php.net/manual/zh/ref.strings.php)
> - [w3cschool](http://www.w3school.com.cn/php/php_string.asp)

#### 数组
PHP中数组分两类：
- 索引数组
与JavaScript中的数组一致

```php
<?php
// 定义一个数组
$arr0 = Array(1,2,3,4,5);
var_dump($arr0);

// PHP5.4之后可以使用`[]`定义
$arr1 = [1,2,3,4,5];
var_dump($arr1);
```

- 关联数组
通过键值引用数组元素，类似于JavaScript中的对象

```php
// 键只能是integer或者string
$arr0 = array('key0' => 'value0', 'key1' => 'value1', 'key2' => 'value2');
var_dump($arr0);

$arr1 = ['key0' => 'value0', 'key1' => 'value1', 'key2' => 'value2];
var_dump($arr1);
```

## 2.2 运算符
- 数学运算符和逻辑运算符与JS一致

- 字符串连接符与JS不同，使用句点符`.`

```php
<?php
$name = 'Weico';
$message = 'hey '.$name;
print $message;

// .= 相当于+=
$foo = 'hello,';
$foo .= $message;
pring $foo;
```

## 2.3 语句
- 逗号分隔
- if，switch，while，for，foreach，function

## 2.4 流程控制
### 2.4.1 顺序结构

### 2.4.2 分支结构
#### if...else
#### switch case

### 2.4.3 循环结构
#### while
#### for
#### foreach
专门用于遍历数组的结构
```php
<?php
$arr = array('name' => 'Weico', 'age' => '18');

foreach ($arr as $key => $value) {
    echo $key.': '.$value.'<br>';
}
```

## 2.5 函数
- 定义与使用函数的方式与JS相同
- PHP函数名不区分大小写，但是建议按照区分大小写的方式编写代码

```php
<?php
function foo ($name, $title) {
    echo "$name ($title)";
}

// 调用
foo('zce', 'UFO');
Foo('zgd', 'SBO'); // 不区分大小写
```

> 建议PHP中采用下划线的命名规则

# 3. 特性
## 3.1 变量作用域
- PHP的函数内不能访问函数作用域外面的作用域

```php
<?php
$top = 'top variable';

function foo() {
    $sub = 'sub variable';
    
    echo $top;
    // => 无法访问
    
    function bar() {
        echo $top;
        // => 无法访问
        
        ehco $sub;
        // => 无法访问
    }
    
    bar();
}

foo();
```

- 使用`global`关键字访问全局作用域

```php
<?php
$top = 'top variable';

function foo() {
    // 声明使用全局作用域的$top
    global $top;
    
    $sub = 'sub variable';
    
    echo $top;
    // => "top variable"
    
    function bar() {
    // 在当前作用域声明使用全局作用域的$top以及$sub
    
        echo $top;
        // => "top variable"
        
        ehco $sub;
        // => 由于全局作用域不存在$sub，故无法访问
    }
    
    bar();
}

foo();

```

3.2 超全局变量
- PHP定义了一些在所有作用域都可以使用的变量，无需使用`global $variable`声明使用

- 超全局变量：

超全局变量  | 意义
---         | ---
$GLOBAL     | 引用全局作用域中可用的全部变量
$_SERVER    | 获取服务器端的相关信息
$_REQUEST   | 获取提交参数
$_POST      | 获取POST提交参数
$_GET       | 获取GET提交参数
$_FILES     | 获取上传文件
$_ENV       | 操作环境变量
$_COOKIES   | 操作Cookies
$_SESSION   | 操作Session

3.2.1 $GLOBALS
- $GLOBALS可在任何位置使用全局变量，其是一个关联数组
- 全局变量的名字就是其在$GLOBAL中的键

```php
$x = 75;
$y = 25;

function foo() {
    $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}

foo();

echo $z;
// => 100
```

## 3.3 常量的定义和使用
- 可以使用常量符号代替一般的数字或者字符常量从而可以添加代码的可读性
- 一般全局的配置常量一个额外添加一个文件，便于维护以及可以共同使用
### 3.3.1 定义常量
- 使用`define`函数
- argu0：常量名称，一般全大写字母命名，多单词使用下划线
- argu1：常量的数值
- argu2：是否区分大小写，false区分
```php
define("SYSTEM_NAME", "haha");
define("SYSTEM_ENABLE",true);
```

### 3.3.2 使用常量
- 常量不使用`$`符号
```php
<?php
echo SYSTEM_NAME;
echo SYSTEM_ENABLE;
```

## 3.4 载入其他的文件
文件代码过长，可能会分成几个部分

PHP中引入其他PHP文件有四种方式
- require
- require_once
- include
- include_once


四种方式的比较：
&nbsp;                          | require   | r\_once   | Include  |i\_once
---                             | ---       | ---       | ---       | ---
被载入文件不存在是否继续运行    | Y         | Y         | N         | N
多次调用是否重复执行被载入文件  | Y         | N         | Y         | N

总结来说：
- 横向分为两类：require和include两种，区别在于require会因为载入文件不存在而停止当前文件执行，而include 不会。
- 纵向分为两类：xxx 和 xxx\_once，区别在于代码中每使用一次 xxx就执行一次载入的文件，而 xxx_once 只会在第一次使用是执行。

使用层面：
- include 一般用于载入公共文件，这个文件的存在与否不能影响程序后面的运行
- require 用于载入不可缺失的文件
- 是否采用一次载入（once）这种方式取决于被载入的文件


# 4. 常用的API
> 对于常人，仅仅使用任何编程语言本身并不能有多大的发挥，大多数都需要使用API

PHP的能力来源于它有1000+内置函数，不是每一个都可以直接使用，有的需要安装或者启动额外的“插件”扩展

## 4.1 字符串处理
> 非拉丁字符都属于宽字符
宽字符需要开启php_mbsrting扩展

### 4.1.1 开启PHP扩展
1. 将PHP目录中的php.ini-development复制并修改为php.ini
2. 修改扩展文件所在目录extension_dir
3. 修改文件中的部分选项(;是注释符)
4. 在Apache配置文件中申明一下php.ini所在的目录

### 4.1.2 字符串处理函数
- 字符串截取
    - `string substr ( string $string, int $start [,int $length] )`
    - `string mb_substr ( string $str , int $start [, int $length = NULL [, string $encoding = mb_internal_encoding() ]] )`
- 字符串长度
    - `int strlen ( string $string )`
    - `mixed mb_strlen ( string $str [, string $encoding=mb_internal_encoding() ] )`
- 大小写转换
    - `string strtolower ( string $string )`
    - `string strtoupper ( string $string )`
- 去除首尾空白字符
    - ` string trim ( string $str [, string $character_mask = " \t\n\r\0\x0B" ] )`
    - ` string ltrim ( string $str [, string $character_mask ] )`
    - ` string rtrim ( string $str [, string $character_mask ] )`
- 查找字符串中某些字符首次出现位置
    - `mixed strpos ( string $haystack , mixed $needle [, int $offset = 0 ] )`
    - `int mb_strpos ( string $haystack , string $needle [, int $offset = 0 [, string -$encoding =mb_internal_encoding() ]] )`
- 字符串替换
    - `mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int -&$count ] )`
- 重复字符串
    - `string str_repeat ( string $input , int $multiplier )`
- 字符串分割
    - `array explode( string $input, string $char )`

## 4.2 数组处理
- 获取关联数组中全部键/值
    - `array_keys() / array_values()`
- 判断关联数组中是否存在某个键
    - `array_key_exists()`
- 去除重复的元素
    - `array_unique()`
- 将一个或多个元素追加到数组中
    - `array_push()`
    - `$arr[] = 'newvalue'` （这里并不会覆盖）
- 删除数组中的最后一个元素
    - `array_pop()`
- 数组长度
    - `count()`
- 检测存在
    - `in_array()`
- 可以使用isset()是否声明，并且其会消除Undefined index的警告
- 使用empty()查看是否没有声明或者是否为false，没有则为true，直接使用js的方法会报错

## 4.3 时间处理
- 时间戳：`time()`
    - 从Unix纪元（格林威治时间 1970-01-01 00:00:00）到当前时间的秒数
- 格式化日期：`date()`
    - 获取有格式的当前时间
    - 格式化一个指定的时间戳
    - 可以通过`strtotime()`将有格式的时间字符串转换为时间戳
- 使用strtotime将有格式化的字符串转换为时间

```php
// 1. 通过代码设置时区
date——default_timesone_set('PRC');
// 2. 通过配置文件设置时区
date.timezone = PRC;

// 获取1970年1月1日 0时零分零秒到目前的秒数
echo date();

// 使用date格式化时间
echo date('Y-m-d H:i:s',date());


```

## 4.4 文件操作
函数    | 描述
---     | ---
basename()  | 返回路径文件
copy()      | 复制文件
dirname()   | 返回除了文件名，目录的部分
file()      |  读取文件放入一个数组中

> [参考：W3Cschool](http://www.w3school.com.cn/php/php_ref_filesystem.asp)

## 其他
使用`php.exe -a`进入到交互模式

当php.ini中 display_error = on 时候回显示错误的信息，生产环境时注意将其设置为off