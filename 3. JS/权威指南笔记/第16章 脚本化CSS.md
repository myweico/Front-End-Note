## 其他
- 使用window.getComputedStyle或者element.currentStyle获取由浏览器解析得到元素对应的css属性

## 其他
#### offset、client和scroll系列的区别
##### offset系列:获取元素的宽,高,left,top, offsetParent
- offsetWidth: width+paddingLR+borderLR
- offsetHeight: height+paddingTB+boderTB
- offsetLeft: 元素边框盒子距离BFC左边的距离
- offsetTop: 元素边框盒子距离BFC上方的距离

##### scroll系列:卷曲出去的值
- scrollLeft:向左卷曲出去的距离
- scrollTop:向上卷曲出去的距离
- scrollWidth:元素中内容的实际的宽(如果内容很少,没有内容,元素自身的宽),（width+paddingLR）
- scrollHeight:元素中内容的实际的高(如果内容很少或者没有内容,元素自身的高),没有边框（height+paddingTB）

##### client系列:可视区域
- clientWidth:可视区域的宽(没有边框),边框内部的宽度
- clientHeight:可视区域的高(没有边框),边框内部的高度
- clientLeft:左边边框的宽度
- clientTop :上面的边框的宽度

#### 隐藏元素的几种方式
```js
//隐藏div
//不占位
//my$("dv").style.display="none";

//占位
//my$("dv").style.visibility="hidden";

//占位
//my$("dv").style.opacity=0;

//占位
//my$("dv").style.height="0px";
//my$("dv").style.border="0px solid red";

// 溢出区域隐藏
overflow: hidden;
left: 1000px
```

#### 阻止超链接跳转
- return false
- window.event.preventDefault()