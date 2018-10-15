 ## 标记
 - 图片库的采用的结构

 ```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Gallery</title>
</head>
<body>
<h1>SnapShots</h1>
<ul>
    <li><a href="images/20180221 Ålvundeidet村附近的Innerdalsvatna湖，挪威 1920x1080.jpg" title="A Lake ">1</a></li>
    <li><a href="images/20180430 1943年在纽约举行的爵士即兴演出中爵士乐钢琴家玛丽·卢·威廉斯的手部特写 1920x1080.jpg" title="A hand on the piano">2</a></li>
    <li><a href="images/20180510 布鲁克林大桥公园展出的汤姆·弗鲁因的‘Kolonihavehus, 2010'作品，纽约布鲁克林区 1920x1080.jpg" title="Newyork Block">3</a></li>
    <li><a href="images/20180517 历史悠久的捕鱼仓库，挪威特隆赫姆 1920x1080.jpg" title="A warehouse">4</a></li>
</ul>

<!--添加一个占位标签以显示图片-->
<img src="" alt="" id="placeholder">
<!--添加一个占位标签以显示图片说明-->
<p id = "showText"></P>
</body>
</html>
```

## JavaScript
#### 步骤
- 事件函数中的this指代这个调用对象

```js
object.onClick(this)
```

- 获取对象的的href属性以及文本

```js
var source = this.getAttribute("href");
var text = this.getAttribute("title");
```

- 获取显示的位置

```js
var placeholder = document.getElementById("placeholder");
var showText = document.getElementById("showText");
```

- 设置显示

```js
placholder.setAttribute("src", source);
showText.firstChild.nodeValue = text;
```

#### 非DOM解决方案
- setAttribute()方法是“第一级DOM”（DOM Level1），它可以设置任意元素节点的任意属性
- 在第一级DOM出现之前，还可以通过下面一些方法设置属性值，但不是全部属性都可以通过该方法设置

```js
// 设置input的value值
element.value = "the new nalue";
// 等同于 element.setAttribute("value", "the new value");

// 设置图片的src属性
imgelement.src = source;
// 等同于imageelement.setAttribute("src", source);
```

- 使用setAttribute不用记忆哪些属性可以使用老方法
- 使用第一级DOM移植性更好，可以用于任何一种标记语言，而老方法仅限用于Web文档
- 记住DOM是一种适用于多种环境和多种程序设计语言的通用型API

## 事件处理函数
- 事件处理函数通常使用“on”开头
- 但某些行为发生时，其会自动调用特定的JS代码
- 事件处理函数的工作机制：在给某个元素添加了事件处理函数后，一旦事件发生，相应的JS代码便会执行，执行代码后会返回一个值给事件处理函数。驶入给链接添加onclick事件，实际点击会执行代码，若代码返回true则onlick事件处理函数认为连接被点击了，若返回false则事件处理函数认为链接没有被点击。

## 节点的拓展
#### childNodes属性
- childNodes属性可以获取一个元素的所有子节点（元素节点、属性节点以及文本节点等）

#### nodeType属性
- 节点的nodeType属性说明节点属于哪一类的节点，表示如下
nodeType值  | 表示节点
---         | ---
1           | 元素节点
2           | 属性节点
3           | 文本节点
8           | 注释节点
9           | 文本节点

#### nodeValue属性
- 使用nodeValue获取一个节点的值
- p标签这个元素节点的nodeValue元素为一个空值，p标签中文本就是p元素节点下的文本节点（可以使用firstChild获取），文本节点就是文本本身
- 可以使用nodeValue来刷新图片描述

#### firstChild以及lastChild
- 可以使用firstChild和lastChild获取调用节点的第一个子节点和最后一个子节点

## 最终代码
#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Gallery</title>
</head>
<body>
<h1>SnapShots</h1>
<ul>
    <li><a href="images/20180221 Ålvundeidet村附近的Innerdalsvatna湖，挪威 1920x1080.jpg" title="A Lake " class="show" onclick="showPic(this);return false;">1</a></li>
    <li><a href="images/20180430 1943年在纽约举行的爵士即兴演出中爵士乐钢琴家玛丽·卢·威廉斯的手部特写 1920x1080.jpg" title="A hand on the piano" class="show" onclick="showPic(this); return false;">2</a></li>
    <li><a href="images/20180510 布鲁克林大桥公园展出的汤姆·弗鲁因的‘Kolonihavehus, 2010'作品，纽约布鲁克林区 1920x1080.jpg" title="Newyork Block" class="show" onclick="showPic(this);return false;">3</a></li>
    <li><a href="images/20180517 历史悠久的捕鱼仓库，挪威特隆赫姆 1920x1080.jpg" title="A warehouse" class="show" onclick="showPic(this);return false;">4</a></li>
</ul>

<!--添加一个占位标签以显示图片-->
<img src="images/20180517 历史悠久的捕鱼仓库，挪威特隆赫姆 1920x1080.jpg" alt="" id="placeholder">
<!--添加一个占位标签显示图片表述-->
<p id="textShow">Choose an image.</p>

<script src="scripts/showPic.js"></script>
</body>
</html>
````

#### JS
```js
function showPic(whichpic) {
    var source = whichpic.getAttribute("href");
    var text = whichpic.getAttribute("title");

    var placeholder = document.getElementById("placeholder");
    var textShow = document.getElementById("textShow");

    // 设置改变的值
    placeholder.setAttribute("src", source);
    textShow.firstChild.nodeValue = text;
}
```
