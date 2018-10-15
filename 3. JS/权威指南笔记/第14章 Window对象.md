## 计数器
#### setTimeout()和clearTimeout()
- 实现一个函数在指定的毫秒数之后运行。
- 返回一个值，可以传递给clearTimeout()用于取消这个函数的执行
```js
var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
var timeoutID = scope.setTimeout(function[, delay]);
var timeoutID = scope.setTimeout(code[, delay]);
```
#### setInterval()和clearInterval()
- setInterval()指定函数在指定毫秒数后**重复执行**
- setInterval()同样会返回一个值，用于传递给clearInterval()曲膝拗这个函数的执行
```js
var intervalID = scope.setInterval(func, delay[, param1, param2, ...]);
var intervalID = scope.setInterval(code, delay);
```
#### 定时器应用函数
```js
/*
 *
 *
 *
 *
 *
 */
 function invoke(f, start, interval, end) {
     if (!start) start = 0;
     if (argument.length <= 2) {
         setTimeout(f, start);
     } else {
         setTimeout(repeat, start);
         function repeat() {
             var h = setInterval(f, interval);
             // end有定义的前提下，在end秒后停止调用
             if (end) setTimeout(function(){clearInterval(h)}, end);
         }
     }
 }
```
#### 注意
- 由于离实原因，setTimeout和setInterval()的第一个参数可以作为字符串传入。这个字符串会在指定的时间内执行，相当于eval()
若setTimeout()的时间参数设置为0，指定的函数并不会立即执行，而是将其放到队列中，邓涛前面等待状态的事件处理程序执行完后再“立即”调用它。

## 浏览器定位和导航
- Window对象的location属性引用的是Location对象，表示当前显示文档的URL，并定义了方法使窗口载入新的文档
- Location方法和属性总结

方法或属性  | 描述
---         | ---
protocol    | 网络协议：http
host        | 主机名和端口号：www.baidu.com:80
hostname    | 主机名：www.baidu.com
port        | 端口名：80
pathname    | 相对路径名字：/s
search      | ?以及后面的字符（到下一个符号为止）：?wd=google
hash        | #以及后面的字符：#top
href        | 就是url，直接赋值可以跳转到指定的页面，并保留原来页面的历史纪录，相当于assign
assign()    | 跳转到传入字符串指定的url的页面，保留原页面的历史
reload()    | 刷新当前页面
replace()   | 使用传入字符串的url页面替代当前的页面，不保留原页面的历史

```js
window.location === document.location // 总是返回ture
```
- document对象也有一个URL属性，其表示文档首次载入后保存该文档的URL静态字符串。如果定位到文档的片段标识符，Loaction对象会做对应的更新，而document.URL属性却不会变

#### 解析URL
- Location对象href是一个字符串，其表示URL的完整文本。Loaction对象的toString()方法返回href属性的值
- Location对象的其他属性——protocol, host, hostname, port, pathname、search、hash，分别表示URL的各个部分，它们称为URL分解属性
- hash属性返回URL的“片段标识符”部分。
- search属性返回问号之后的URL，这部分通常是某种类型的查询字符串。

```js
// 提取URL中搜索字符串中的参数
function urlArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (far i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos+1);
        value = decodeURLComponent(value);
        args[name] = value;
    }
    return args;
}
```

#### 载入新文档
- Loaction对象的assign()方法可以使窗口载入并显示指定的URL中的文档。
- replace()则是替代当前文档载入显示指定URL中的文档。（被替代文档并不会显示在历史纪录中）
- 如果检测到用户的浏览器不支持某些特性来显示功能齐全的版本，可以使用location.replace()来载入静态的HTML版本

```js
// 如果浏览器不支持XMLHttpRequest对象，将其重定向到一个不需要Ajax的静态页面
if (!XMLHttpRequest) location.replace("staticpage.html")
```

- reload()可以让浏览器重新载入当前文档
- 可以直接将新的URL赋值给location属性直接跳转（相对路径会自动解析，还可以使片段标识符#top）
- location对象URL分解属性是可写的，对它们重新赋值会改变URL的位置，并导致浏览器载入一个新的文档（如果是hash属性，则会在当前文档中进行跳转）

```js
location = "http://www.oreilly.com";
location = "page2.html"
location = "#top"
location.search  = "?page=" + (pagenum + 1); // 载入下一个页面
```

## 浏览历史
- window对象的history属性引用的是该窗口的History对象。History对象是用来把窗口的浏览历史用文档和文档状态列表形式显示。
- History对象的length属性表示浏览器历史列表中的元素数量，但出于安全的因素，脚本不能访问已保存的URL避免窥探浏览历史。
- History对象的back()和forward()方法实现浏览器的后退和前进功能。
- History对象的go()接受一个整数参数，可以在历史列表中前进后退任意多页。（负数表示后退）
- <iframe>元素的浏览历史也会按顺序插入到主窗口的浏览历史中。
- HTML5之前历史管理是个更复杂的难题。应用程序必须要在窗口浏览历史中创建一个新的条目来管理自身的历史纪录，用历史条目关联自身的状态信息。另一种方式是隐藏的<iframe>来保存状态信息并在浏览器历史中创建条目。

## 浏览器信息
- 使用navigator属性获取浏览器的信息
- 过去，Navigator经常用于确定是在IE运行还是在Netscape中运行，这种浏览器嗅探方法有问题，需要随着新浏览器和现有浏览器的新版不断地调整 

属性            | 描述
---             | ---
appName         | Web浏览器的全称，IE中就是Microsoft Internet Explorer,firefox就是Netscape，为了兼容现存浏览器嗅探代码，其他浏览器一般都是Netscape
appVersion      | 以数字开始，并跟着浏览器厂商和版本信息的详细字符串
userAgent       | 在USER-AGENT HTTP头部中发送的字符串
platform        | 运行浏览器的操作系统
onLine          | 表示浏览器是否连接上网络
geolocation     | 用于确定用户地理位置的信息接口
javaEnabled()   | 当浏览器可以运行java小程序的时候返回true
cookieEnable()  | 浏览器可以保存永久的cookie是，返回true

## 返回屏幕信息
- screen属性提供有关窗口显示的大小和可用的颜色数量的信息
- 属性width和height指定的是以像素为单位的大小
- availWidth和availHeight指定的是实际可用的显示大小，会排除像桌面任务栏这样的特性所占用的空间
- colorDepth指的是显示的BPP（bits-per-pixil）的值

## 对话框
- alert()向用户显示一条信息并等待用户关闭对话框
- confirm()显示一条信息，要求用户点击确定或取消按钮
- prompt()显示信息，等待用户输入字符串，并返回这个字符串
- showModalDialog()显示一个包含HTML格式的模态对话框，可以传给参数以及从对话框里返回值。第一个参数是提供对话框HTML内容的URL，第二个参数是一个任意值（数组和访问对象），可以通过window.dialogArguments属性访问。第三个参数是一个非标准的列表，设置窗口的参数。
- 一般都是使用自己创建的对话框，因为可以设置样式

```js
// 调用的js文件
var p = showModalDialog("multiprompt.html", ["Enter 3D point coordinates", "x", "y", "z"], "dialogwidth:400; dialogheight:300; resizable:yes");
```
```html
<form>
<fieldset id="fields"></fieldset>
<div style="text-aligh:center">
<button onclick="okey()">Okay</button>
<button onclick="cancel()">Cancel</button>
</div>
<script>
var args = dialogArguments;
var text = "<legend>" + args[0] + "</legend>";
for (var i = 1; i < args.length; i++) {
    text += "<lable>" + args[i] + ":<input id='f" + i + "'></label><br>";
}
docuement.getElementById("filed").innerHTML = text;

// 关闭这个对话框，不设置返回值
function cancel() {window.close();}

// 读取输入的值，然后设置一个返回值，之后关闭
function okay() {
    window.returnValue = [];
    for (var i = 1; i < args.length; i++) {
        window.returnValue[i-1] = document.getElementById("f" + i).value;
    }
    
    window.close();
}
</script>
</form>
```

## 错误处理
- Window对象的onerror属性是一个事件处理程序，当未捕获的异常传播到调用栈上时就会调用它，并把错误消息输出到浏览器的JavaScript控制台上。
- 如果这个事件是一个函数，那么只要窗口中发生了JavaScript错误，就会调用该函数。
- onerror的调用通过三个字符串函数，而不是通过通常传递的事件对象。window.onerror的第一个参数是描述错误的一条信息，第二个参数是存放引发错误的JavaScript代码所在文档的URL，第三个参数是文档中发生错误的行数。
- onerrer的返回值为false时，它通知浏览器事件处理程序已经处理了错误，firefox的则是返回true表示已经处理了错误。

```js
window.onerrer = function(msg, url, line) {
    if (onerror.num++ < onerror.max) {
        alert("Error: " + msg + "\n" + url + ":", + line);
        return true;
    }
}

onerror.max = 3;
onerror.num = 0;
```

## 作为Window对象属性的文档元素
- 如果HTML文档中使用id属性为元素命名，且Window对象中灭有以该id命名的属性，window对象会自动生成一个属性，该属性为id名字，属性指向id对应的HTMLElement对象。
- 如果Window对象有相同名字的属性，则该名字的属性会覆盖默认生成的id名属性
- 最好使用document.getElementById()方法获取元素，因为window的默认属性会被覆盖
- 相同对于name属性，window也会自动生成属性指向名字对应的属性，其指向的是一个类数组对象
- 有name或id属性的<iframe>元素是个特殊的例子，其创建的window默认属性并不指向其对应的元素，而是指向其对应窗口的window对象。

## 多窗口和窗体
- 浏览器的多个标签页都是独立的“浏览上下文”，都有独立的Window对象。
- 通常每个窗口也是独立的Window对象
- 文档中使用<iframe>嵌套的文档，嵌套的文档和原来的文档是独立的
- 当一个窗口或者标签中的脚本打开新的窗口或标签页，这样的多个窗口或者标签的文档之间就是有关系的，可操作的
- 如果是同源的文档，则可以使用同源文档的属性和方法
- 还可以使用HTML5提供的基于事件的消息传输API进行间接通信

#### 打开窗口
- 使用Window对象的open()方法可以打开一个新的浏览器窗口（或者标签页），其载入指定的URL并返回对应的Window对象
- open()的第一个参数是新窗口中显示文档的URL，如果这个参数省略，那么就使用空白页面的URL：about:blank
- 第二个参数是新打开窗口的名字，若为已存在窗口的名字，则其会在对应的窗口打开URL，若省略则使用`_blank`打开一个新的、未命名的窗口。
- 第三个参数是设置窗口属性的以逗号分隔的列表。若省略，新窗口采用默认大小带有整组标准UI组件。第三个参数是非标准的，HTML5规范主张卢兰其应该忽略它。（没有指定值都忽略其功能）
- 第四个参数是是否替换窗口以前文档的的历史条目，true则替换，false则新建条目。
- open()的返回值岱庙命名或新创建窗口的window对象
- 当且仅当同源的文件或者是文档脚本打开的具关系的新窗口才可以通过名字来指定存在的窗口
- 窗口的名字可以允许在对应的窗口打开新的页面，并可以作为<a>和<form>元素的target属性。target属性可以设置为`_blank`, `_parent`或者`top`，分别表示空白窗口，父窗口，和文档顶端。
- window对象的opener表示打开它的window对象
- 避免窗口弹出被滥用，浏览器都添加了弹出窗口过滤系统（自动弹出的会过滤并且提醒），open()方法只有当用户手动点击按钮或者链接的时候才会调用

#### 关闭窗口
- 使用close()方法关闭窗口，如果创建了Window对象w，则可以使用`w.close()`将其关掉
- 要显式地使用widow对象调用，否则容易和documen中的close()混淆
- 在表示窗体而不是顶级窗口或者标签页上的Window对象执行close()方法不会有任何效果，它不能关闭一个窗体（反之可以从它包含的文档中删除iframe）

#### 窗体之间的关系
- 打开的窗口可以使用opener引用打开这个窗口的窗口
- 原来的窗口可以使用创建窗口时返回的引用对象引用创建的窗口
- 打开的窗口和原窗口可以相互引用，彼此都可以读取对方的属性或是调用对方的方法
- 任何窗口或者窗体在自己的JS代码中可以使用window或self引用自己的窗口和窗体
- 窗体可以用parent属性引用包含它的窗口（顶级的parent属性对应自身）
- top属性可以引用顶级的窗体（顶级的top对应自身）
- 可以通过获取<iframe>元素对象引用<iframe>对应的窗口
- <iframe>的contentWindow属性引用窗体的Window对象，窗体对象使用frameElement属性引用<iframe>元素
- 每个对象都有一个frames属性，它引用自身包含的窗口或窗体的子窗体frames[0]表示第一个子窗体，parent.frames[1]引用兄弟窗体
- 如果<iframe>元素使用了name或者id属性，那么除了用数字进行索引之外，还可以使用名字或者id进行索引，例如frames["f1"]或者frames.f1
- <iframe>元素的name也会作为对应Windos对象的name属性，以这种方式给出的名字可以用作一个链接的target属性

#### 窗口的交互
- 同源的页面可以使用脚本进行交互

```js
// 一个页面的<iframe>元素分别叫“A”或者“B"，并假设这些窗体所包含的文档来源同一个服务器
// 窗体A的脚本定义了一个变量i：
var i = 3;

// 在窗口A中可以直接使用全局变量i的名字，也可以显式地使用window.i
i
window.i

// 窗口B中调用窗口A的变量i，需要引用窗口A然后再找到变量i
parent.A.i = 4          // 改变窗口A中变量i的值

// 窗口B定义了一个全局函数f
parent.B.f();
// 若使用得多，可以使用将其赋予一个变量
var f = parent.B.f
```
- 注意词法规则，调用时候得词法作用域取决于定义时候得作用域，例如调用了函数f()，其变量都是在窗体B中寻找
- 构造函数也具有作用域，即使是同意类型，但是窗A得实例不是窗B得实例
- 注意每个窗口的window对象独立，每个窗口都有独自的原型，instanceof()不能够跨窗口工作
- 尽管窗体或者窗口载入了新的文档，但是引用窗体或窗口的Window对象还仍然是一个有效的引用
- 全局对象会在窗口或窗体载入新的内容的时候替换。我们称的“Window对象”的对象实际上不是一个全局对象，而是全局对象的代理。每当查询或者设置Window对象的属性时，就会在窗口或窗体的当前全局对象上查询或设置相同的属性值。HTML5规范称这个代理为WindowProxy

#### 