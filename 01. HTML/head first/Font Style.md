# 文本样式
## 字体系列
字体 | 效果
--- | ---
Sans-Serif | 包括没有衬线的字体，通常认为在计算机上更加易读，**高雅、传统**
Serif | 包括有衬线的字体，通常让人想到新闻报纸上的文字排版，**清晰，可读**
Monospace | 包括固定宽度的字符。例如i和m的宽度是相同的。这些字体主要用于显示软件代码的实例，**打印机**
Cursive | 包括看似手写的字体，有时会看到标题中使用这些字体
Fantasy | 包括某种风格的装饰性字体

**字体系列**  
```css
body{
    font-family: Vendana, Geneva, Arial, sans-serif;
}
```
- 通常指定的family都是同一个字体系列
- font-family可以指定多个字体，只需要输入这些字体名，并用逗号分隔
- 字体名称的大小写必须要与字体名称一致
- 最后总是放一个通用的字体系列名来保证显示效果

**Web字体的显示过程**
- 字体文件存放在Web服务器上，以“.woff”作为扩展名，表示web开放字体
- 一般先向Web服务器获取HTML文件，再获取这个页面上的Web字体文件，获取到字体文件后，浏览器显示页面时就会使用这个字体

**Web字体的格式**  
- TrueType Font：.ttf
- OpenType Font：.otf
- Embedded OpenType Font：.eot（这是微软专用的，仅IE支持）
- SVG Font：.svg 使用SVG通用图像格式表示的字符的格式
- Web Open Font Format：.woff 建立在TrueType之上的一个Web字体标准。
- **注意ttf和woff字体在IE8以及之前的版本中并不可用**

**使用@font-face规则添加Web字体**   
font-face与普通的css规则不同，font-face会建立一个字体，并且指定一个font-family名以便使用，而不是选择一组元素并指定样式
```css
@font-face {
    font-family: "Emblema One";\\创建一个字体名字，最好与字体名一致
    src: url("http://wickedlysmart.com/hthtmlcss/chapter8/journal/EmblemaOne-Regular.woff")，
         url("http://wickedlysmart.com/hthtmlcss/chapter8/journal/EmblemaOne-Regular.tff")
}
```
其余：  
- @font-face并不是一个选择器规则，而是一个内置的css规则。利用@font-face规则可以获取一个Web字体,并为它分配一个font-family名称，然后在css规则中利用该font-family
- 还有其余的内置css规则，例如`@import`（允许导入其他css文件）以及`@media`（创建特定某些“媒体”类型的css规则，例如印刷业、桌面屏幕或者手机）
- 尽管Web字体看起来很棒，但是对于移动设备和小型设备并不支持Web字体，因此需要考虑候选字体
- 使用Web字体需要一定的时间，第一次获取字体时，页面性能有可能会受到影响
- 可以使用[FontSquirrel](http://www.fontsquirrel.com/)以及[Google Web Font](http://https://fonts.google.com/)托管字体

## 调整字体大小
格式：`font-size: small`
单位 | 意义
--- | ---
px | 像素，说明一个字体高度为14像素，这说明字母的最低部分到最高部分之间有14像素、
% | 相对与父像素属性的大小
em | 一个比例因子，表示是相对父像素字体的1.2倍，若不为整数，浏览器会四舍五入到整数
关键字 | xx-small、x-small、small、medium、large、x-large或者xx-large，浏览器会自动将关键字转换成像素，会使用浏览器中的默认值完成这个转换，一般每一挡都会比前一挡大20%，small一般为12px（每个浏览器对关键字的定义并不相同，可以重新给出自己的定义）

**建议：**  
- body一般使用关键字small或者medium定义字体大小（便于阅读），然后其他元素都使用em或者百分比相对与body的大小，这样当放大缩小时，其余元素的字体会随着body的字体大小而改变
- 老版本的IE并不支持放大缩小像素指定的大小，因此body使用关键字，而其余元素相对与body使用em或者比例，IE也可以正确地缩放你的字体
- 使用比例指定大小有利于维护，只需修改参考位置的字体大小，其余位置的字体大小也随着改变，而且能够让用户缩放大小，其他元素也会随着改变（我认为缩放实际就是改变浏览器small或者medium关键字的值）

**其余：**  
- body默认的字体大小一般为16px，\<h1\>的默认大小为默认大小的200%, \<h2\>为150%， \<h3\>为120%，\<h4\>为100%，\<h5\>为80%，\<h6\>为60%。
- body使用百分比或者em则是相对与默认字体大小
- 尽管在不同的浏览器上会有些许差别，但这是很细微的，若在保证各浏览器之间有着一致的效果，这个需要长时间的调试，往往这花的时间是得不偿失的

## 改变字体粗细
可以使用font-weight属性控制字体的大小
属性值 | 作用
--- | ---
font-weight:bold | 使用粗体
font-weight:normal | 使用正常的字体大小
font-weight:lighter/font-weight:bolder | 更细/更粗一点，但是一般没有多少字体能够支持粗细程度细微的差别,因此，这两个通常没有什么效果
100-900（整百的倍数） | 这个特性没有得到字体或者浏览器的广泛支持因此通常不用

## 为字体添加风格
- `font-style: italic;`可以添加斜体风格，不仅字体会倾斜而且有时会有额外的弯曲衬线，但是不是所有的字体都支持斜体风格，实际上得到的有可能是倾斜文本，即不是专门设计的倾斜字符，而是由浏览器将正常的文字倾斜  
- `font-style: olique;` 可以直接使用倾斜文本
- \<em\>也能实现斜体效果，但是注意\<em\>是用来表示“强调”的结构的，不能指望\<em\>一直都是斜体效果，不能因为要实现斜体效果，就将内容变为强调结构

## Web颜色
**指定颜色的方法：**
- `color: silver;` 有16中基本色以及150中扩展颜色可以采用这种方法
- `color: rgb(80%, 40%, 0%);`或者`color: rgb(204, 102, 0);` 使用rgb函数
- `color: #cc6600;`或者`color: #c60;`使用十六进制表示  

**其他：**  
- 如今Web用户的计算机显示屏已经能够显示上百万以上的颜色，因此Web安全色已经成为过去
- 对于颜色搭配：文本和背景要使用对比度最大的颜色，这样能够提高可读性
- 对于像#559933这种每一组颜色分量两位数字相同的可以简写为#593
- color实际控制着一个元素的前景色，因此它会控制文本和边框的颜色，而边框色可以用`border-color`来控制

## 文本装饰
使用`text-decoration`属性来为文本添加装饰，三种属性值：  
- underline 添加下划线
- overline 添加上划线
- line-through 添加删除线

**注意：**  
- 若要同时添加两种效果，应该在同一属性中添加：`text-decoration: underline overline;`，而不应该分开一次添加
- 若要表示显示删除的内容或者插入的内容，最好选择\<del\>和\<ins\>来表示，因为这样不仅表示了样式还表示了内容（要表示该内容采用这些标签，不能仅为样式而采用该标签）

## 字体样式简写
`font:font-style font-variant font-weight font-size/line-height font-family`  
- font-style: normal, italic, olique, inherit
- font-variant: normal, small-caps, inherit