## 动画基础知识
- 虽然JS可以改变元素的样式，但是CSS仍然是最佳的工具
- 若想随着时间改变而不断地改变某个元素的样式，只能使用JavaScript实现了。
- JavaScript可以按照预定的时间间隔重复调用一个函数，随着时间的推移而不断地改变某个元素的样式
- 动画就是让元素的位置随时间而不断地发生变化

#### 位置
- HTML只是描述了页面的内容以及内容之间的结构关系，而位置信息一般由CSS给出
- 可以使用absolute、fixed、relative定位方式，然后使用top，right，bottom，left指定元素的位置（意为距离某个方向的距离）
- 可以使用“子绝父相”来让子元素相对父元素定位

#### JS与时间相关的函数
- JavaScript的执行太快，若没有设定时间间隔会瞬间执行完毕，看不到动画的效果，可以使用setTimeout实现动画的效果
- 使用setTimeout能够让某个函数经过一段预定的时间之后才开始执行
##### setTimeout()
- setIimeout("function", interval)，第一个参数是一个函数执行的名字，第二个参数是时间间隔，以毫秒为单位
- 使用clearTimeout取消某个正在等待执行的函数

```js
// setTimeout函数形式
// 第一个参数是执行的代码或者函数，param指传给函数的参数
// 返回值为正整数，表示定时器的编号，可以传给claerTimeour来取消定时
// 注意setTimeout和setInterval()共用一个编号池，技术上两者通用
// setTimeout取消定时的函数为clearTimeout()，setInterval的则为clearInterval()
var timeoutID = scope.setTimeout(function[, delay, param1, param2, paream3]);
var timeoutID = scope.setTimeout(function[, delay]); 
var timeoutID = scope.setTimeout(code[, delay]);


// 取消正在排队的等待执行的函数
variable = setTimeout("function", interval);
clearTimeout(variable);
```

#### 实现某段时间后移动元素的例子
##### html
```html
// <p id="message">Whee!</p>
```
##### JS
```js
// 添加元素的位置信息
function position() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    // 让5秒后执行moveMessage函数
    // 声明的全局变量，在函数外可以使用clearTimeout取消执行
    movement = setTimeout("moveMessage()", 5000);
}

// 移动信息
function moveMessage() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.left = "200px";
}

// 加载完成后执行代码
addLoadEvent(positionMessage);
addLoadEvent(moveMessage);
```

#### 时间递增量
- 某个元素在5秒后移动太过生硬，真正的动画效果是一个递增的过程
- 可以递归使用函数从而每个一段时间改变一次样式

```js
function moveElement(elemId, finalX, finalY, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elemId)) {
        console.log("The element you want to move do not exist.");
        return false;
    }
    // 获取想要移动的元素
    var elem = document.getElementById(elemId);

    // 获取元素的x坐标
    var xpos = elem.style.left || 0;
    xpos = parseInt(xpos);

    // 获取元素的y坐标
    var ypos = elem.style.top || 0;
    ypos = parseInt(ypos);
    if (xpos == finalX && ypos == finalY) return true;

    // 声明一个递增量
    var dist = 0;
    if (xpos < finalX) {
        dist = Math.ceil((finalX - xpos)/10)
        xpos += dist;
    }
    if (xpos > finalX) {
        dist = Math.ceil((xpos - finalX)/10)
        xpos -= dist;
    }

    if (ypos < finalY) {
        dist = Math.ceil((finalY - ypos)/10)
        ypos += dist;
    }
    if (ypos > finalY) {
        dist = Math.ceil((ypos - finalY) / 10);
        ypos -= dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    movement = setTimeout(moveMessage, interval, elemId, finalX, finalY, interval)
}
```
## 实用的动画：使用JS创建链接预览
#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Useful Animation</title>
    <link rel="stylesheet" href="styles/usefulAnimation.css">
</head>
<body>
<h1>Web Design</h1>
<p>These are the things you should know</p>
<ol id="linklist">
    <li><a href="structure.html">Structure</a></li>
    <li><a href="presentation.html">Presentation</a></li>
    <li><a href="behavior.html">Behavior</a></li>
    <li><a href="contact.html">Contact</a></li>
</ol>
<div id="slideshow">
    <img src="images/conbination.png" alt="building blocks of web design" id="preview">
</div>
<script src="scripts/addLoadEvent.js"></script>
<script src="scripts/usefulAnimation.js"></script>
</body>
</html>
```

#### css
```css
#slideshow {
    width:128px;
    height: 72px;
    overflow: hidden;
    position: relative;
}
```

#### js
```js
function previewImg() {
    // 确保方法都存在
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;

    // 确保元素都存在
    if (!document.getElementById("linklist")) return false;
    if (!document.getElementById("slideshow")) return false;

    // 获取所有链接
    var links = document.getElementById("linklist").getElementsByTagName("a");

    // 获取图片
    var preview = document.getElementById("preview");
    // 设置样式
    preview.style.position = "absolute";
    preview.style.left = "0px";
    preview.style.top = "0px";

    // 绑定事件
    links[0].onmouseover = function () {
        moveElement("preview", 0, 0, 20);
    };
    links[1].onmouseover = function () {
        moveElement("preview", -128, 0, 20);
    };
    links[2].onmouseover = function () {
        moveElement("preview", -256, 0, 20);
    };
    links[3].onmouseover = function () {
        moveElement("preview", -384, 0, 20);
    }
}

function moveElement(elemId, finalX, finalY, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elemId)) {
        console.log("The element you want to move do not exist.");
        return false;
    }

    // 获取想要移动的元素
    var elem = document.getElementById(elemId);

    // 若该元素之前有定时，先将其曲膝拗
    if (elem.movement) clearTimeout(elem.movement);
    // 获取元素的x坐标
    var xpos = elem.style.left || 0;
    xpos = parseInt(xpos);

    // 获取元素的y坐标
    var ypos = elem.style.top || 0;
    ypos = parseInt(ypos);
    if (xpos == finalX && ypos == finalY) return true;

    // 声明一个递增量
    var dist = 0;
    if (xpos < finalX) {
        dist = Math.ceil((finalX - xpos)/10)
        xpos += dist;
    }
    if (xpos > finalX) {
        dist = Math.ceil((xpos - finalX)/10)
        xpos -= dist;
    }

    if (ypos < finalY) {
        dist = Math.ceil((finalY - ypos)/10)
        ypos += dist;
    }
    if (ypos > finalY) {
        dist = Math.ceil((ypos - finalY) / 10);
        ypos -= dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    elem.movement = setTimeout(moveElement, interval, elemId, finalX, finalY, interval)
}

addLoadEvent(previewImg);

```