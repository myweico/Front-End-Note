# SVG
## 什么是矢量图形
矢量图形使用各种几何形状来描述图像

SVG的优点
- 所有图像信息都是由标签组成，图像中的文本可以被访问到（便于SEO）
- SVG中的图形可以使用CSS描绘以及使用JS控制

SVG的缺点
- 当描述图像很复杂的时候需要复杂的运算，将占用更多的渲染时间
- 旧版的浏览器不支持SVG，SVG在IE9开始得到支持

## 添加SVG
img引入svg图片
```html
<img
  src="quilateral.svg"
  alt="triangle with all three sides equal"
  height="87px"
  width="100px" />
```
优点：
- 方便快捷

缺点：
- 无法使用JS操作图像
- CSS只能在svg文件中描述
- 就相当于一幅图片

可以使用srcset属性进行渐进设计，支持svg才会使用srcset属性的svg，否则将使用src中的png或者jpg
```html
<img src="example.png" srcset="example.svg" alt="example picture">
```

svg作为CSS背景的兼容处理
```css
background: url("example.png") no-repeat center;
background-img: url("example.svg");
backround-size: contain;
```

### 使用SVG标签在HTML引入
> SVG内联或内联SVG：在HTML中直接嵌入SVG

使用svg标签嵌入：
```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="green">
</svg>
```

优点：
- 可以使用JS控制
- 可以使用CSS描绘
- 可以使用CSS设置交互，如:focus和CSS动画的方法
- 使用SVG内联可以减少加载时间

缺点：
- 不利于SVG图形的复用，多次使用将会导致密集型维护
- 额外的SVG将会增大HTML的大小
- 不能像缓存普通图片那样缓存内联SVG
- 不支持SVG的浏览器可能要使用<foreignObject>元素进行回退，而支持SVG仍然会下载<foreignObject>元素的内容，增加不必要的开销

### 使用iframs元素嵌入SVG
就像嵌入网页那样嵌入SVG图像即可
```html
<iframes src="example.svg" width="500" height="500" sandbox">
  <img src="triangle.png" alt="Triangle width three unequal sides" />
</iframes>
```

### svg的一个例子
```html
  <svg width="100%" height="100%">
    <rect width="100%" height="100%" fill="red" />
    <circle cx="100%" cy="100%" r="150" fill="blue" stroke="black" />
    <polygon points="120,0 240,225 0,225" fill="green"/>
    <text x="50" y="100" font-family="Verdana" font-size="55"
          fill="white" stroke="black" stroke-width="2">
            Hello!
    </text>
  </svg>

```