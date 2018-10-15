## 原生主要代码
```js
var xhr = XMLHttpRequest();
xhr.open("GET", "time.php");
xhr.send();
xhr.on("readystatechange",function(){
   if (this.readyState != 4) return;
   console.log(this.responseText);
});
```

## XMLHttpRequest对象
### 属性
属性        | 描述
---         | ---
readyState  | 请求的状态，创建请求对象后为0，使用open建立连接后为1，接受到响应头后为2，加载响应体为3，接受完响应体后为4
responseType| 设置解析响应报文的类型，`xhr.responseType = "json";`
responseText | 响应报文的响应体的内容
response     | 返回的内容，会根据reponseType变化
responseXML  | 返回的XML结构树，可利用document处理结构树的方法处理
responseURL  | 返回报文的URL地址

### 方法
方法                                | 描述
---                                 | ---
open("TYPE","URL",true)                  | 用于建立连接，并且设置请求行，open过后`responseState`变为1,第三个参数为是否异步，默认为异步true
setRequestHeader("name", "value")   | 用于设置请求头，可多次调用
send("key1=value1&key2=value2")     | 设置请求体并且将请求报文发送出去，注意请求体使用url编码的时候设置请求头`Content-Type: application/x-www-form-urlencoded` ，若为同步的话，send必须等到接受完请求体后才执行下一行代码

### 事件
事件                | 描述
---                 | ---
readystatechange    | 每次请求状态改变时触发
load                | HTML5中提供的,XMLHttpRequest v2.0定义的函数 ，即加载完成时间的事件

## jQuery中的ajax
[官方文档](https://api.jquery.com/category/ajax/)
### ajax()
- 方式一 $.ajax(url[,setting])
```js
$.ajax('./time.php',{
    type: 'post',
    succes: function(){}
})
```

- 方式二 $.ajax(setting)
```js
$.ajax({
    url: 'json.php',
    type: 'get',
    data: {id:1, name: '张三'},
    dataType: 'json',
    beforeSend: functoin(xhr) {},
    success: function(res) {
        console.log(res)
    }
    error: function(xhr) {},
    complete: function(xhr) {}
})
```

### 高度封装的函数
- $.get()
    - `jQuery.get( url [, data ] [, success ] [, dataType ] )`
    - `jQuery.get( [settings ] )`
- $.post()
    - `jQuery.post( url [, data ] [, success ] [, dataType ] )`
    - `jQuery.post( [settings ] )`
- $.getJSON()
    - `jQuery.getJSON( url [, data ] [, success ] )`
- jQuery.getScript()
    - `jQuery.getScript( url [, success ] )`
- .load
    - `.load( url [, data ] [, complete ] )`
### 全局事件函数 
- .ajaxComplete()   
Register a handler to be called when Ajax requests complete. This is an AjaxEvent.

- .ajaxError()  
Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event.

- .ajaxSend()    
Attach a function to be executed before an Ajax request is sent. This is an Ajax Event.

- .ajaxStart()  
Register a handler to be called when the first Ajax request begins. This is an Ajax Event.

- .ajaxStop()   
Register a handler to be called when all Ajax requests have completed. This is an Ajax Event.

- .ajaxSuccess()    
Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event.

## 渲染模版
- 使用script标签创建模版
    - 里面的标签不会显示到页面上
    - 当type不为text/javascript时，里面的内容不会当成js执行
    - 可以通过DOM获取到里面的元素
- 步骤：
    1. [选择一个模板引擎](https://github.com/tj/consolidate.js#supported-template-engines)
    2. 下载模板引擎JS文件
    3. 引入到页面中
    4. 准备一个模板
    5. 准备一个数据
    6. 通过模板引擎的JS提供的一个函数将模板和数据整合得到渲染结果HTML
    7. 将渲染结果的HTML 设置到 默认元素的 innerHTML 中

- 目前主流的模版引擎有
    - [handlebar](https://handlebarsjs.com/)
    - [art-template](http://aui.github.io/art-template/zh-cn/)
    - ejs
    - jade
    - nunjucks

## Ajax的封装过程以及相关思考
- 传回调函数的原因，异步加载造成的找不到变量
- 
- 封装的步骤：
    1. 写一段正常功能的代码
    2. 使用函数将代码包装
    3. 将代码中灵活变动的量使用变量代替
    4. 考虑不同变量的处理情况
    5. 考虑兼容性以及健壮性
    6. 可以传入一个回调函数执行相关的行为

- ajax返回值处理方式
    - 加载完成后返回,由事件函数异步执行返回，返回值无法使用
    - 使用封装函数内部的变量返回，但是由于异步，无法及时更新变量值就立即返回
    - 传递回调函数

## 跨域请求
- 使用script标签前后端配合,jsonp
- 后端设置接受请求的域名
- 服务端填写接受跨域请求的域名
    - `header('Access-Control-Allow-Origin: *');`
    - `header('Access-Control-Allow-Origin: http://site2.tech')`

### JSONP
jsonp就是json padding 在json外面使用函数包裹

思考过程：
1. 联想可以跨域请求的元素，img，link，script，只有scripot可以跨域请求并且可以获取服务端的数据

2. script标签可跨域获取服务端的js代码，然后再本地执行。若服务端将数据写在js代码中，本地便可以获取得到服务端的数据

3. 若存储在一个变量中，可能由于JS异步加载无法及时使用该变量，故可以声明一个函数，让服务端使用该函数对数据进行处理，即使用客户端的函数包括数据

4. 使用php创建可以将数据库的数据获取出来，并且将数据和js代码结合，使用header设置文档的类型将文档以js的形式执行



## 注意
- 使用post方式提交时,enctype默认为`text/plian`，会导致无法提交数据，需要设置请求报文头部，`xhr.setRquestHeader('Content-Type','application/x-www-form-urlencoded')`
- php应该配合设置`Content-Type`
- 可以使用postman测试服务端
- JS字符串可以使用`${var}`引用变量，例如\`string${var}string\`,注意使用的是反引号
- 可以使用`console.time('index')`以及`console.timeEnd('index')`来计时
- 数据复杂时，可以使用渲染模版进行渲染
- 无法使用getAttribute获取表单元素中动态的value
- 进度条的库NProcess.js


# 参考案例
## JSONP的封装
### html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSONP</title>
</head>
<body>
    <script>
        function jsonp(urlto, data, callback){
            var funcName = "jsonp" + Date.now() + Math.random().toString().slice(2);

            data = data || "";
            if (typeof data == "object") {
                var tempArr = [];
                for (var name in data) {
                    tempArr.push(name + "=" + data[name]);
                }
                data = tempArr.join("&");
            }

            var scriptElem = document.createElement("script");
            scriptElem.src= urlto + "?" + data + (callback ? "&callback="+funcName : "");
            document.body.appendChild(scriptElem);

            window[funcName] = function(data){
                callback(data);

                // 执行后删除随机生成的函数
                delete window[funcName];

                // 删除标签
                document.body.removeChild(scriptElem);
            }
        }

        jsonp("http://site1.tech/jsonp.php",{"ok":"ok","nice":"nice"},function(res){
            console.log(res);
        });
    </script>
</body>
</html>
```

### php文件
```php
<?php 
    $data = file_get_contents("users.json");

    if (empty($_GET['callback'])) {
        header('Content-Type: application/json');
        echo $data;
    } else {
        header("Content-Type: application/javascript");
        $funcName = $_GET['callback'];
        echo "typeof {$funcName} == 'function' && {$funcName}({$data})";
    }
?>
```

