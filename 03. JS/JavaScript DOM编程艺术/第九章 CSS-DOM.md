## 三位一体的网页
#### 结构层
网页的结构层由HMTL或者XHTML等标记语言创建。结构层描述了内容的结构。

#### 表示层
表示层由css完成。表示层描述页面内容的呈现效果。

#### 行为层
行为层由JavaScript和DOM完成，其负责描述内容如何响应事件。

#### 注意
- 表示层和行为层总是存在的（没有添加浏览器也有默认的层）
- 我认为结构层是底层，然后再依次添加表示层和行为层，逐渐增强，平稳退化。
- 这几个层有重合之处
    - JS、DOM可以查看和设置内容的结构
    - CSS的伪类可以设置某些事件的效果
    - JS和DOM也存在获取和设置元素的样式的方法

## style属性
- style属性存放的是一个元素的所有样式，style属性是一个对象
- 元素的每个样式都是style对象中的属性

```js
element.style.property
```

#### 获取样式
- 获取元素的某种样式其实就是读取该元素的style属性中的属性
- 当获取的属性名中含有减号的属性的时候，DOM要求使用驼峰命名法

```js
element.style.property

// 读取字体颜色
element.style.color

// 获取带减号的属性
element.style.fontFamily        // font-family
element.style.backgroundColor   // background-color
element.style.marginTopWidth    // margin-top-width
```

- DOM能够解析font的速度属性（简写形式)
```js
< p id="example" style="color:grey; font: 12px 'Arial', sans-serif;">
para = document.getElementById("example");
para.style.fontSize     // 12px, 即使是简写形式也可以识别
```

#### 缺点
- style属性只能获取到内联样式（也就是只有嵌在标签中的样式可以获取），然而使用内联样式将结构和表示结合，明显不是一个好的选择，因此style属性有很大的局限性
- 使用外部样式表的样式是不能通过style属性获取的（在head头部声明的样式也是一样）
- 虽然如此，但是通过DOM设置的样式还是可以通过DOM将其检索出来

#### 设置属性
- style对象的中的样式都是可写的，可用其取更新样式的信息
- style对象中的属性（其实就是样式），其属性值都是字符串

```js
element.style.property = value;

// 设置颜色
para.style.color = "black";
para.style.font = "2em 'Times', serif"
```
## 何时采用元素在DOM脚本设置样式
- 大多数场合都是使用CSS声明样式，在CSS不方便的场合，可以利用DOM对文档的样式做一些小的增强

#### 根据元素在节点树的特定位置来设置样式
- CSS选择元素主要有三种方法：标签名、id、class名
- css2还声明了许多位置相关的选择器，`:first-child`, `:last-child`
- css3还声明了`:nth-child()`和`nth-of-type()`之类的位置选择器。还可以通过`h1~*`选择器为所有的h1元素的下一辈元素声明样式
-当浏览器不支持css3的某些选择器或者使用css设置难度较大的受，可以考虑使用DOM方法来设置样式
- 下面使用JS和DOM结合的方法模仿`h1~ *`设置样式：

```js
function styleHeaderSiblings() {
    // 检测是否支持所用的方法
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName("h1");
    var elem;
    // 遍历h1元素，获取其下一个元素设置样式
    for (var i = 0; i < headers.length; i++) {
        elem  = getNextElement(headers[i].nextSibling);
        if (!elem) continue;
        elem.style.fontWeight = "bold";
        elem.style.fontSize = "1.2em";
    }
}

function getNextElement(node) {
    if(node.nodeType == 1) {
        return node;
    }

    if(node.nextSibling) {
        return getNextElement(node.nextSibling);
    }

    return null;
}

// 添加到加载事件里面
addLoadEvent(styleHeaderSiblings);
```

#### 根据某种条件反复设置某种样式
- 有一个表格，对其奇数行和偶数行采用不同的背景颜色增强可读性（斑马条状）
- 若支持css3使用`nth-child(even)`和`nth-child(odd)`设置即可
- 如果使用class类，当数量多的时候麻烦，并且删除或新添后需要花费大量时间重改
- JavaScript擅长处理重复的任务，使用循环加条件判断即可轻松完成任务
- 对文档中的每一个表格的偶数行都添加背景颜色（其实可以对偶数行添加类名，然后使用类名在css添加样式，将样式和行为分离）


```js
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                rows[j].style.backgroundColor = "#ffc";
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

addLoadEvent(stripeTables);
```

#### 响应事件
- css中的某些伪类属性可以根据HTML状态来改变样式，DOM也可以通过事件对HTML状态的变化做出响应，这两者很难怕判断该什么时候使用
- 两者应该选择最容易实现的方法
- 使用css的伪类快捷简单，使用DOM添加行为兼容性好
- 使用JS和DOM实现`tr:hover`的效果

```js
function hightlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].onmouseover = function() {
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function() {
            this.style.fontWeight = "normal"; // 为什么函数里不能使用rows[i]
        }
    }
}
```

#### className 属性
- 除了使用JS和DOM直接添加属性外，还可以使用JS和DOM为原需要改变样式的元素添加类，然后再使用css给该类添加样式，这样可以让表示层和行为层分离得更彻底
- 任何一个元素节点都函数有一个className的属性，通过该属性可以读取和设置类，注意直接给该属性赋值会直接替代（可以写函数添加类名）

```js
// 添加类的函数
function addClass(elem, value) {
    oldvalue = elem.className;
    if (!oldvalue) {
        elem.className = value;
    } else {
        elem.className += " " + value;
    }
}
```
#### 对函数上面进行抽象
- 注意到上面的函数都是针对特定的元素进行操作的，可以将特定的元素变为参数，那么函数就可以对输入的元素进行操作，从而提高了函数的可用性

#### left 系列
- 若使用绝对定位，left指包括margin的区域的左上角作为原点，其到上一个定位父元素的的内边框的距离

#### offset系列
- 通过style属性访问的的只能访问到标签内的属性，一旦元素的样式是由外部样式表或者通过style标签设置，则无法通过元素对象的style属性获取
- 可以使用offsetWidth，offsetHeight，offsetLeft，offsetTop获取元素的位置
- 注意offsetLeft和offsetTop的设置（以left为例）
    - 未脱离文本流时，则位置大小包括所有祖先元素的margin，border，padding以及自身的margin
    - 脱离文本流时，位置大小只包括自身left和margin（left是到上一个定位父元素内边框的距离，元素坐标是从margin左上角开始）

#### scroll系列
- scrollWidth，scrollHeight都是指内容实际的宽度和高度
- scrollLeft，scrollTop指内容滚出母对象区域的左边大小和滚出上方的大小
- element.onscroll元素滚动的事件
- 使用`window.pageXOffset || document.body.srollLeft || document.documentElement.scrollTop`获取页面从左边滚出的距离
- 使用`window.pageYOffset || window.body.scrollTop || document.documentElement.scrollTop`获取页面从上面滚出去的距离
- 使用`eventArgumentObject.pageX`或者当前页面距离加上滚出去的距离获取当前鼠标在页面的距离- 使用`eventArgumentObject.pageY`或者当前页面距离加上滚出去的距离获取当前鼠标在页面的距离

```js
<!--图片跟着鼠标移动-->
var evt={
    //window.event和事件参数对象e的兼容
    getEvent:function (evt) {
      return window.event||evt;
    },
    //可视区域的横坐标的兼容代码
    getClientX:function (evt) {
      return this.getEvent(evt).clientX;
    },
    //可视区域的纵坐标的兼容代码
    getClientY:function (evt) {
      return this.getEvent(evt).clientY;
    },
    //页面向左卷曲出去的横坐标
    getScrollLeft:function () {
      return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
    },
    //页面向上卷曲出去的纵坐标
    getScrollTop:function () {
      return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
    },
    //相对于页面的横坐标(pageX或者是clientX+scrollLeft)
    getPageX:function (evt) {
      return this.getEvent(evt).pageX? this.getEvent(evt).pageX:this.getClientX(evt)+this.getScrollLeft();
    },
    //相对于页面的纵坐标(pageY或者是clientY+scrollTop)
    getPageY:function (evt) {
      return this.getEvent(evt).pageY?this.getEvent(evt).pageY:this.getClientY(evt)+this.getScrollTop();
    }
  };
  //最终的代码

  document.onmousemove=function (e) {
    my$("im").style.left=evt.getPageX(e)+"px";
    my$("im").style.top=evt.getPageY(e)+"px";
  };
```

#### 获取计算后的属性值
**window.getComputedStyle(element, pseudoElt)**
- window.getComputedStyle(element,pseudoElt)，第一个参数为想要获取样式属性的元素，第二个参数指定一个要匹配的伪元素的字符串，返回的时实时的CSSStyleDeclaration对象，当元素的样式的样式更改时，它会自动更新本身

- 返回的对象与从元素的 style  属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从getComputedStyle返回的对象是只读的，可以用于检查元素的样式（包括由一个<style>元素或一个外部样式表设置的那些样式）。elt.style对象应用于在特定元素上设置样式。

- 第一个参数必须是Element对象(传递一个非节点元素，如 一个#text 节点， 将会抛出一个错误). 从Gecko 1.9.2   (Firefox 3.6 / Thunderbird 3.1 / Fennec 1.0) 开始, 现在返回的一个在URL周围有引号的URL值，像这样： url("http://foo.com/bar.jpg").

- 例子

```js
// 1.
let elem1 = document.getElementById("elemId");
let style = window.getComputedStyle(elem1, null);

// 它等价于
// let style = document.defaultView.getComputedStyle(elem1, null);

// 2.
<style>
 #elem-container{
   position: absolute;
   left:     100px;
   top:      200px;
   height:   100px;
 }
</style>

<div id="elem-container">dummy</div>
<div id="output"></div>  

<script>
  function getTheStyle(){
    let elem = document.getElementById("elem-container");
    let theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("height");
    document.getElementById("output").innerHTML = theCSSprop;
   }
  getTheStyle();
</script>

// 3.
function dumpComputedStyles(elem,prop) {

  let cs = window.getComputedStyle(elem,null);
  if (prop) {
    dump("    "+prop+" : "+cs.getPropertyValue(prop)+"\n");
    return;
  }
  let len = cs.length;
  for (var i=0;i<len;i++) {
 
    let style = cs[i];
    dump("    "+style+" : "+cs.getPropertyValue(style)+"\n");
  }

}

```

**element.currentStyle**
- 不标准的写法，支持IE8浏览器，与window.getComputedStyle类似，返回一个样式对象
- element.currentStyle.left
