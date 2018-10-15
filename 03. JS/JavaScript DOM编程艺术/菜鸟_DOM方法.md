## 获取元素的方法
#### getElementById()
- 输入id对应的字符串
- 返回元素节点对象

```js
// 在某个节点node下搜索id为intro的元素节点
node.getElementById("intro")

// 在整个文档下搜索id为"face"的元素节点
var introNode = document.getElementById("face")
```

#### getElementsByTagName()
- 输入为标签名的字符串
- 返回一个类似对象数组的东西（构造函数为 HTMLColletor）

```js
// 在节点node下查找标签名为tagname的所有节点
var tagnameNodes = node.getElementsByTagName("tagname");

// 调用某个节点
tagnameNodes[0]
```

#### getElementsByClassName()
- HTML5 DOM新添的方法
- 通过class类名获取元素
- 输入元素为class属性对应的字符串，返回一个对象数组(如果有两个参数，第一个为搜索的节点，第二个为类名字符串)
- 若需要查找多个类名的元素，需要用空格分隔类名（类名的顺序不重要，只需要包含有即可）
- 若有些浏览器不支持，可以使用下面的方法替代

```js
// 获取类名为sale的元素
var sale = document.getElementsByClassName("sale");

// 两个参数的情况
var shopping = document.getElementById("purchases");
var sales = getElementsByClassName(shopping, "sale")

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

## 操作节点的方法
#### appendChild()
#### removeChild()
#### replaceChild()
#### insertBefore()

## 创建节点的方法
#### createAttribute()
#### createElement()
#### createTextNode()

## 操作元素属性的方法
#### getAttribute()
#### setAttribute()