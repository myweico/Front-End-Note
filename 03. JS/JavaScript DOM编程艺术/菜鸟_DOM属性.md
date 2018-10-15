## innerHTML属性
- 可以获取并且替换HTML元素的内容

```js
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
 
<p id="intro">Hello World!</p>
 
<script>
var txt=document.getElementById("intro").innerHTML;
document.write(txt);        // Hello World
</script>
 
</body>
</html>
```

## nodeName属性
- nodeName规定了节点的名称
- 总是返回大写

节点        | nodeName
:---:       | :---:
元素节点    | 标签名
属性节点    | 属性名
文本节点    | #text
文档节点    | #document

## nodeValue属性
- 规定了节点的值

节点        | nodeValue
:---:       | :---:
元素节点    | undefined或者null
属性节点    | 属性值
文本节点    | 文本本身

## nodeType属性
- 规定了节点的类型

节点        | nodeType
:---:       | :---:
元素节点    | 1
属性节点    | 2
文本节点    | 3
注释节点    | 8
文档节点    | 9

## 节点关系的属性
#### parentNode
#### childNodes（元素子节点和文本子节点）
#### firstChild
#### lastChild
#### nextSibling
#### previousSibling

## 元素节点
#### parentElement
#### children
#### firstElementChild
#### lastElementChild
#### previousElementSibling
#### nextElementSibling