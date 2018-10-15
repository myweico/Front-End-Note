# 初试Canvas
- 不建议使用css样式表设置Canvas，原始大小没有改变，只是按比例放大缩小

### 步骤
1. 准备画板
```html
<canvas width="600" height="400"><canvas>
```
- 默认为白色，默认大小300*150
- 设置大小 `width="600" height="300"`

2. 准备绘图工具
    1. 获取元素
    ```js
    var canvas = document.querySelector("canvas");
    ```
    2. 获取上下文(获取绘图的工具箱)
    ```js
    var ctx = canvas.getContext("2d");
    // 一般看的3d现在一般都是web gl做的
    // 3d的上下文，现在还没有
    ```

3. 使用绘图工具画图
    1. 移动画笔，开始画的起点
    ```js
    ctx.moveTo(100,100);
    ```
    2. 思索好绘画的轨迹
    ```js
    ctx.lineTo(200,100)
    ```
    3. 开始下笔
    ```js
    ctx.stroke();
    ```

# 基本绘制
### 方法
方法                                | 描述
---                                 | ---
moveTo(x,y)                         | 移动绘画的起点
lineTo(x,y)                         | 绘制横线的轨迹    
stroke()                            | 对前面的轨迹进行描边,使用最近的画笔设置，不会跳回再前面的轨迹绘制
fill()                              | 对前面的轨迹填充，使用最近的填充设置，并且会自动闭合，使用非零闭合
beginPath()                         | 清除前面的路径，开始新的路径
closePath()                         | 闭合路径
setLineDash([5,10])                 | 5为实，10为虚，数组设置虚线的一小段组成，若不参数则获取，获取的是是不重复的（奇偶有别）
lineDashOffset                      | 设置虚线的偏移，正往开始方向偏移，负往结束方向偏移
createLinearGradient(x1,y1,x2,y2)   | 创建一个直线的渐变方案，参数决定了渐变的长度以及方向
createRadialGradient(x1,y1,x2,y2)   | 创建一个径向的渐变方案，参数决定了渐变的长度以及方向
gradient.addColorStop(0."pink")     | 设置渐变方案的颜色，第一个参数为0~1的比例，第二个参数为渐变的样色

##### 非零填充
- 从要判断的区域画一个线出去，若顺时针方向+1，逆时针方向-1，若该区域非零则填充，若为0则不填充

##### 绘制不同的线条
- ctx.strokeStyle = 'green', 设置颜色
- ctx.lineWidth = 30, 设置线条的宽度

# 注意
### 默认设置问题
- 默认的线条是1px，颜色是黑色的，但是整数坐标的萧条看起来是2px，颜色是灰色的？
    - 因为线条的中心是对着两个像素点的中间的，因此线条会以两个0.5px显示，所以看起来是2px并且颜色不饱和

### ctx属性（画笔的状态）
属性            | 描述
lineWidth       | 画笔的粗细，线条的宽度
strokeStyle     | 画笔的颜色
fillStyle       | 填充的颜色
lineCap         | 断点的类型，butt（默认），round，square，round和square款增加长度（戴帽子）
lineJoin        | 相交拐点的类型，mitter（默认），bevel（斜面，切面），sround
canvas          | 获取画布
canvas.width    | 获取画布宽度
canvas.height   | 获取画布高度

# 绘制矩形

### 方法
方法                | 描述
---                 | ---
rect(x,y,w,h)       | 绘制矩形的路径，不是独立的路径，会覆盖
strokeRect(x,y,w,h) | 独立的路径，使用前面的画笔设置
fillRect(x,y,w,h)   | 独立路径，使用前面的画笔设置

# 绘制弧形
方法                                | 描述
---                                 | ---
arc(x,y,r,startR,endR,direction)    | 1、 开始弧度和结束弧度都是按照顺时针来计算，dirction是按照那个方向画弧，false为默认的顺时针，true为默认的逆时针 2、只是绘制弧线路径，还没有描边

# 绘制文字
### 方法
- ctx.font = '40px Microsoft YaHei'，设置字体的尺寸和字体
- ctx.textAlign，设置文本水平对齐方式，相 对绘制坐标来说
    - left，字体框的左边贴着绘制坐标
    - right，字体框的右边贴着绘制坐标
    - center, 字体框的中心跟在绘制坐标
    - start, 字体靠在开始的方向
    - end，字体靠在结束的地方
- ctx.direction属性
    - left
    - right
- ctx.textBaseline 设置基线
    - top，字体顶部在绘制坐标所在的y线
    - middle，字体的中线在绘制坐标的y线
    - bottom，字体的底部在绘制坐标的y线上
    - hanging，印度文的基线的绘制坐标的y线上，文本的基线处于文本的正上方，并且和文本粘合
    - alphabetic，默认值，基线处于文本的下方，并且穿过文字
    - ideographic，y线在文本下方，与bottom类似但是不一样
- strokeText(str, x, y, maxWidth);
- fillText(str, x, y, maxWidth);
- measureText(str),获取文本对应的测量对象，测量对象Obj.width()便可获取宽度

# 绘制图片
### 创建图片的两种方式
- 创建节点，不插入
```js
var img = document.createELement('img');
img.src = 'image/01.jpg';
```

- 创建图片对象
```js
var img = new Image();
img.src = 'image/01.jpg';
```

- 等待图片加载完后再操作
使用img.onload事件监听图片加载完成的的时刻
```js
img.onload = function () {
    // handler
}
```

### 绘制图片的三种方式
- ctx.drawImage(img, toX, toY)
- ctx.drawImage(img, toX, toY, targetWidth, targetHeight)
- ctx.drawImage(img, fromX, fromY, cropWidth, croppHeight, toX, toY, targetX, targetY)

# 坐标的转换
### 移动坐标原点
- ctx.tranlate(x,y);

### 缩放x，y轴
- ctx.scale(0.5,0.5);

### 旋转坐标轴
- ctx.rotate(angle)
# 案例
### 绘制渐变矩形
- 考虑到线是由点组成
```js
for (var i = 0; i < 255) {
    ctx.beginPath();
    ctc.moveTo(100+i-1,100);
    ctx.lineTo(100+i,100);
    ctx.strokeStyle = "rgb("+i+","+i+","+i+")";
    ctx.stroke();
}
```

### 绘制网格大小
```js
var mycanvas = document.getElementById("canvasPrac");
var ctx = mycanvas.getContext("2d");
var grid = 20;
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
console.log(canvasWidth);
console.log(canvasHeight);
var xgrid = Math.floor(canvasWidth / grid) + 1;
var ygrid = Math.floor(canvasHeight / grid) + 1;

// 绘制平行x轴的线条
for (var i = 0; i < ygrid; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * grid + .5);
    ctx.lineTo(canvasWidth, i * grid + .5);
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

// 绘制平行y轴的线条
for (var i = 0; i < xgrid; i++) {
    ctx.beginPath();
    ctx.moveTo(i * grid + .5, 0);
    ctx.lineTo(i * grid + .5, canvasHeight);
    ctx.stokeStyle = "#ddd";
    ctx.stroke();
```

### 绘制坐标轴
```js
// 绘制x轴
ctx.beginPath();
ctx.moveTo(space,canvasHeight - space);
ctx.lineTo(canvasWidth - space, canvasHeight - space);
ctx.lineTo(canvasWidth - space - arrowSize, canvasHeight - space - arrowSize / 2);
ctx.lineTo(canvasWidth - space - arrowSize, canvasHeight - space + arrowSize / 2);
ctx.lineTo(canvasWidth - space, canvasHeight - space);
ctx.strokeStyle = "#000";
ctx.stroke();
ctx.fill();

// 绘制y轴
ctx.beginPath();
ctx.moveTo(space, canvasHeight - space);
ctx.lineTo(space, space);
ctx.lineTo(space + arrowSize / 2, space + arrowSize);
ctx.lineTo(space - arrowSize / 2, space + arrowSize);
ctx.lineTo(space, space);
ctx.strokeStyle = "#000";
ctx.stroke();
ctx.fill();
```

### 绘制矩形的三种方式
```js
var mycanvas = document.querySelector("#canvasPrac");
var ctx = mycanvas.getContext("2d");
ctx.moveTo(100, 50);
ctx.lineTo(300, 50);
ctx.lineWidth = 1;
ctx.strokeStyle = "pink";

// 绘制矩形的路径
ctx.rect(100, 100, 200, 100);   // 不是独立的路径，会和上面的路径一起进行绘制操作，此时并不显示
ctx.stroke();

// 绘制描边的矩形
ctx.strokeRect(100, 300, 200, 100); // 使用独立的路径，会单独地进行描边，使用最近的画笔设置进行绘制

// 绘制填充的矩形
ctx.fillRect(100,500, 200, 100);    // 使用独立的路径并且会单独地进行填充，使用最近的画笔设置进行绘制
```
### 使用渐变方案绘制矩形
```js
var mycanvas = document.getElementById("canvasPrac");
var ctx = mycanvas.getContext("2d");

// 创建渐变方案，参数指定渐变的长度以及方向
var gradientPlan = ctx.createLinearGradient(100,100,100,400);

// 设置渐变的颜色，第一个参数为0~1的比例，第二个参数为颜色
gradientPlan.addColorStop(0,"pink");
gradientPlan.addColorStop(1,"yellow");
ctx.fillStyle = gradientPlan;
ctx.fillRect(100,100,100,300);
```


