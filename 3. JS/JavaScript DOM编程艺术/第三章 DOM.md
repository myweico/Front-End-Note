## 文档：DOM中的“D”
创建的一个网页把它加载到浏览器中，DOM便会产生。其将编写的网页文档转换为一个文档对象。

## 对象：DOM中的“O”
- 对象是一个自足的数据集合，与其相关联的变量成为这个对象的属性，于其相关联的函数成为对象的方法。
- JS的三种对象：用户自定义对象、内建对象、宿主对象
- 即使在最初的JS版本中，对编写脚本来说十分重要的一些宿主对象就已经可用了，例如其中最基础的window对象，其对应于浏览器窗口本身，这个对象的属性和方法通常称为BOM（Browser Object Model）。
- Document对象的主要功能是处理网页的内容。

## 模型：DOM中的“M”
- 模型（Model）或者也可以说是Map（地图）表示的是某种结构，DOM把一份文档表示为一棵家谱树。

## 节点
- 节点是一个网络术语，表示网络中的一个连接点。一个网络就是一些节点的集合。（我理解为是某个结构的组成元素）
- DOM可以理解为是节点的集合。
- 每个节点都是一个对象

```html
// 结构的例子
<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset= "utf-8" />
        <title>Shopping List</title>
    </head>
    
    <body>
        <h1>What to buy</h1>
        <p title="a gentle reminder">Don't forget to buy this stuff.</p>
        <ul id="purchases">
            <li>A tin of beans</li>
            <li class="sale">Cheese</li>
            <li class="sale important">Milk</li>
        </ul>
    </body>
</html>
```

#### 元素节点
- 每个标签都可以认为是一个元素，其为DOM文档中的元素节点。
- \<html>元素是节点树的根元素
- 文档中的每一元素都是一个对象

#### 文本节点
- 标签（元素）所包含的文本就是一个文本节点。

#### 属性节点
- 属性节点用于对元素做出更具体的表述。
- 元素的属性组成了元素节点下的一个属性节点。

## 获取元素
- 一共有三种方法获取文档中的元素，（获取到的元素为一个对象），分别是通过id、标签名以及类名。
- 都是document对象中的方法
- 在某个对象上调用这些方法意味着在该对象内进行查找

#### getElementById
- 输入参数为id对应的字符串
- 返回id对应元素这个对象

```js
var objPur = document.getElementById("purchases");

// 检测获取的变量类型
console.log("objPur: ", objPur);
console.log("typeof objPur: ", typeof objPur)
```

#### getElementsByTagName
- 属于标签名对应的字符串
- 返回一个对象数组，数组里面的对象就是标签名对应的元素（按文档中出现的顺序编号）
- 即使标签名对应的元素只有一个，其返回的也是只有一个元素的数组
- 可以使用通配符获取到文档中的所有元素，输入“*”即可
- 可以结合getElementById和getElementsByTagName使用（实质就是查找调用对象中是否含有元素（document指包含全部的对象）

```js
// 获取标签li的所有元素
var liEle = document.getElementsByTagName("li");

// 查看获取结果的类型
console.log("typeof liEle: ", typeof liEle);
console.log("liEle instance of Array: ", liEle instanceof Array); // false, 说明不是一个数组
console.log(leEle.constructor);                                    // ƒ HTMLCollection() { [native code] }

// 查看获取到的元素个数
console.log("liEle: ", liEle.length);

// 遍历所有li标签的元素
for (var i = 0; i < liEle.length; i++) {
    console.log(typeof liEle[i]);
}

// 获取文档的所有元素
var allEle = document.getElementsByTagName("*"):

// 将id和tagname组合使用
var shopping = document.getElementById("purchases");
var items = shopping.getElementsByTagName("*");
console.log("items.length: ", items.length);

```
 
#### getElementsByClassName
- HTML5 DOm新添的方法
- 通过class类名获取元素
- 输入元素为class属性对应的字符串，返回一个对象数组(如果有两个参数，第一个为搜索的节点，第二个为类名字符串)
- 若需要查找多个类名的元素，需要用空格分隔类名（类名的顺序不重要，只需要包含有即可）
- 若有些浏览器不支持，可以使用下面的方法替代

```js
// 获取类名为sale的元素
var sale = document.getElementsByClassName("sale");

// 验证是否只有两个元素
console.log(sale.length);

// 替代的方法
function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        // 若原方法存在，使用原方法
        return node.getElementsByClassName(classname);
    }
    else {
        var results = new Array();
        // 获取所有元素
        var elems = getElementsByTagName("*");
        len = elems.length;
        for (var i = 0; i < len; i++) {
            // 判断元素的类名是否存在classname
            if (elems[i].class.indexOf(classname) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results
    }
}
```

## 获取和设置属性
#### getAttribute()
- getAttribute()方法不属于document对象，不能通过document对象使用，只能通过元素节点对象使用（document并不是一个节点，而是包含了所有节点的对象）
- 只有一个参数，属性名的字符串
- 返回属性值的字符串

```js
var paras = document.getElementsByTagName("p");
paras[0].getAttribute("title");
```

#### setAttribute()
- 只能用于元素节点
- 第一个参数为属性名字符串，第二个参数为属性值字符串

```js
// setAttribute()方法的参数      
object.setAttribute(attribute, value);

// 设置属性值
var shopping = document.getElementById("purchases");
// 显示设置前的属性值
console.log("Before setting: ", shopping.getAttribute("title"));
// 设置title属性
shopping.setAttribute("title", "a list of goods");
// 显示设置后的title属性
console.log("After setting: ", shopping.getAttribute("title"));
```
- setAttribute做出的修改不会反映在文档的源代码中，这就说明了DOM的工作模式。
- DOM的工作模式：先加载文档的静态内容，再动态刷新，动态刷新不影响静态内容。
- DOM的威力：对页面进行刷新而不需要在浏览器里刷新页面。
- 