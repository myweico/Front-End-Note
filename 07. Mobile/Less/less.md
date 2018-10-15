# 安装
1. 安装nodeJS
2. 常用命令
    - `node -v`查看nodeJS版本
    - `npm -v`查看npm版本
    - `lessc -v`查看less版本
    - `npm install -g less`全局安装less

# 要点
- less兼容css原生语法
- 浏览器不支持less文件，需要编译
- less手动编译`lessc test.less test.css`
- webstorm可以自动编译
- 若直接使用less文件，需要一个less.js插件
    - `<link rel="stylesheet" type="text/css" href="../less/test.less"`
    - 会找到text/less的标签内容，发送到服务器端编译并动态插入到style标签
    - 会使用ajax传到服务器编译并加入到文件中，因此需要使用http打开网页
    - 需要引入完less之后就要引入less.js执行，否则会因为异步原因无法正常渲染后面的页面
    - 使用`<script>less.watch()</script>`实时刷新，会隔一段时间
- css缺点：
    - 没有逻辑
    - 不利维护和扩展（带一个颜色需要不断地替换）
    - 不易于复用（很多地方都需要写重复的代码，例如颜色，兼容代码等）

# 历史
- 前端的前身：美工
- less出现的背景：大量后台涌入前端，发现css没有逻辑，大量冗余代码，不易维护，后台推动了前端的发展
- nodeJS也是后台逻辑的体现
    - nodeJS => 小型企业通信的网站？？？
    - PHP => 互联网网站
    - java => 企业级管理网站
- less有变量、函数、运算，scope（作用域）
- 案例：该同一个颜色，使用变量很快就搞掂~

# less原理
- less实质上是编译器，将使用一定语法编写的代码转换成css代码
- less并没有去除css原有特性，而是加上了程序式语言的特性
    - 变量
    - 运算
    - 函数
    - 嵌套
    - 导入（模块化思想）

# 学习资料
- [官网](http://lesscss.org/)
- [官方中文网](http://lesscss.cn/)
- [1024i](http://www.1024i.com/demo/less/)

# 语法
- 声明字符集
    - `@charset "UTF-8";`
- 注释 
    - `/**/`注释会编译到css
    - `//`注释不会编译到css

# 变量
### 声明变量
- @为声明前缀，:为等号，;为结束
    - `@mainColor: #e92322;`

### 变量的使用
- 若单独出现，可以直接写
- 若要和其他符号拼接的时候，使用花括号
    - `.@{className}{ color: @mainColor; }`

### 变量名规范
- 不能用数字开头，不能包含特殊字符
- 大小写敏感
- 与其他语言相似

# Mixin混入
### 类混入
##### 组合样式的例子
- 组建组合类的部件，但是会编译到css中，会造成冗余
```
.w50 {
    width: 50%
}

.f_left {
    float: left;
}

.f_right {
    float: right;
}
```

##### 类混入
- 继承类的样式
```less
w50-f_left {
    .w50();
    .f_left();
}
```

### 函数混入
##### 函数的定义
- 函数并不会定义到css文件中
- 没有参数的函数
```less
// 没有参数的函数
.w50() {
    width: 50%;
}

.f_left() {
    float: left;
}

.f_right() {
    float: right;
}
```
- 定义带参数的函数
- 注意定义了参数（没有默认值）的函数必须传入参数，否则会报错（不管里面有没有使用）
- 使用`:value`添加默认值
- 不会自己检验参数类型，需要自己注意
```less
.f(@direction) {
    float: @direction;
}

// 定义带默认值的函数
.f(@direction:left) {
    float: @direction;
}

// 使用函数定义兼容的代码，减少代码量
.borderRadius(@width: 100px){
    border-radius: @width;
    -webkit-border-radius: @width;
    -moz-border-radius: @width;
    -o-border-radius: @width;
    -ms-border-radius: @width;
}
```

# 嵌套
### 原生css的嵌套语法
- 嵌套的代码
```css
.wjs_app {
    display: block;
}

.wjs_app img {
    display: none;
}

.wjs_app:hover img {
    dispaly: block;
    position: absolute;
    left: 50%;
    margin-left: -60px;
    border: 1px solid #ccc;
    border-top: none;
    top: 40px;
    z-index: 1000000;
}
```
- 缺点
    - 写了冗余的前缀
    - 当块内代码很长的时候，很难看清楚嵌套关系

### less的嵌套语法
- 将上面的原生代码可以改成下面的代码
```less
.wjs_app {
    display: block;
    
    img {
        display: none;
    }
    
    // 要连接到.wjs_app后面，这里需要使用&运算符
    &:hover {
        img {
            dispaly: block;
            position: absolute;
            left: 50%;
            margin-left: -60px;
            border: 1px solid #ccc;
            border-top: none;
            top: 40px;
            z-index: 1000000;
        }
    }
}
```
- **注意：&表示当前位置的父选择器**

### 包括屏幕的规则
- code 
```css
.component {
    width: 300px;
    @media (min-width: 768px) {
        width: 600px;
        @media (in-resolution: 192dpi) {
            background-image: url(/img/retina2x.png);
        }
    }
    
    @media (min-width: 1280px) {
        width: 800px;
    }
}
```
- output
```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```
# Import导入
- 回忆：import && require
- 引入
```less
@charset "UTF-8";
@import "variable";
@import "mixins";
@import "topbar";
@import "nav";
```
- 会自动生成到main文件

# 运算及函数（内置函数）
### 运算
```less
@num: 5;
ul {
    width: 100% * @num;
    li {
        width: 100% / @num;
        color: red + yellow + blue;
        background: gray * 0.3;
        /*内置函数*/
        border-color: lighten(red, 20%);
    }
}
```

### 内置函数
- less会内置一些计算的函数
# 注意
- 分模块写css，不同页面使用不同的模块，将模块组合便可实现不同需求
    - 例如nav模块，topbar模块，banner模块等
- 高内聚低耦合

# 参考boostrap的less
+ 分块
    - mixins.less
    - variable.less
    - dropdown.less
    - forms.less
    - carousel.less
    - ...
- 使用变量less文件维护
- 根据需求选择模块，在bootstrap.less中选择是否导入


# 附录
### 内置函数
```less
escape(@string); // 通过 URL-encoding 编码字符串
e(@string); // 对字符串转义
%(@string, values...); // 格式化字符串
unit(@dimension, [@unit: ""]); // 移除或替换属性值的单位
color(@string); // 将字符串解析为颜色值
data-uri([mimetype,] url); // * 将资源内嵌到css中，可能回退到url()
ceil(@number); // 向上取整
floor(@number); // 向下取整
percentage(@number); // 将数字转换为百分比，例如 0.5 -> 50%
round(number, [places: 0]); // 四舍五入取整
sqrt(number); // * 计算数字的平方根
abs(number); // * 数字的绝对值
sin(number); // * sin函数
asin(number); // * arcsin函数
cos(number); // * cos函数
acos(number); // * arccos函数
tan(number); // * tan函数
atan(number); // * arctan函数
pi(); // * 返回PI
pow(@base, @exponent); // * 返回@base的@exponent次方
mod(number, number); // * 第一个参数对第二个参数取余
convert(number, units); // * 在数字之间转换
unit(number, units); // * 不转换的情况下替换数字的单位
color(string); // 将字符串或者转义后的值转换成颜色
rgb(@r, @g, @b); // 转换为颜色值
rgba(@r, @g, @b, @a); // 转换为颜色值
argb(@color); // 创建 #AARRGGBB 格式的颜色值
hsl(@hue, @saturation, @lightness); // 创建颜色值
hsla(@hue, @saturation, @lightness, @alpha); // 创建颜色值
hsv(@hue, @saturation, @value); // 创建颜色值
hsva(@hue, @saturation, @value, @alpha); // 创建颜色值
hue(@color); // 从颜色值中提取 hue 值（色相）
saturation(@color); // 从颜色值中提取 saturation 值（饱和度）
lightness(@color); // 从颜色值中提取 'lightness' 值（亮度）
hsvhue(@color); // * 从颜色中提取 hue 值，以HSV色彩空间表示（色相）
hsvsaturation(@color); // * 从颜色中提取 saturation 值，以HSV色彩空间表示（饱和度）
hsvvalue(@color); // * 从颜色中提取 value 值，以HSV色彩空间表示（色调）
red(@color); // 从颜色值中提取 'red' 值（红色）
green(@color); // 从颜色值中提取 'green' 值（绿色）
blue(@color); // 从颜色值中提取 'blue' 值（蓝色）
alpha(@color); // 从颜色值中提取 'alpha' 值（透明度）
luma(@color); // 从颜色值中提取 'luma' 值（亮度的百分比表示法）
saturate(@color, 10%); // 饱和度增加 10%
desaturate(@color, 10%); // 饱和度降低 10%
lighten(@color, 10%); // 亮度增加 10%
darken(@color, 10%); // 亮度降低 10%
fadein(@color, 10%); // 透明度增加 10%
fadeout(@color, 10%); // 透明度降低 10%
fade(@color, 50%); // 设定透明度为 50%
spin(@color, 10); // 色相值增加 10
mix(@color1, @color2, [@weight: 50%]); // 混合两种颜色
greyscale(@color); // 完全移除饱和度，输出灰色
contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]); // 如果 @color1 的 luma 值 > 43% 输出 @darkcolor，否则输出 @lightcolor
multiply(@color1, @color2);
screen(@color1, @color2);
overlay(@color1, @color2);
softlight(@color1, @color2);
hardlight(@color1, @color2);
difference(@color1, @color2);
exclusion(@color1, @color2);
average(@color1, @color2);
negation(@color1, @color2);
iscolor(@colorOrAnything); // 判断一个值是否是颜色
isnumber(@numberOrAnything); // 判断一个值是否是数字（可含单位）
isstring(@stringOrAnything); // 判断一个值是否是字符串
iskeyword(@keywordOrAnything); // 判断一个值是否是关键字
isurl(@urlOrAnything); // 判断一个值是否是url
ispixel(@pixelOrAnything); // 判断一个值是否是以px为单位的数值
ispercentage(@percentageOrAnything); // 判断一个值是否是百分数
isem(@emOrAnything); // 判断一个值是否是以em为单位的数值
isunit(@numberOrAnything, "rem"); // * 判断一个值是否是指定单位的数值

```