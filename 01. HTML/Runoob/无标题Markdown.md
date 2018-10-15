## 常用标签         
tag                 | description
---                 | ---
`<html>`            | 定义HTML文档
`<head>`            | 定义文档的头部
`<body>`            | 定义文档的主体
`<h1>`~`<h6>`       | 标题，依次为默认字体的200%，150%，120%，100%，80%，60%，默认字体为16px
`<hr>`              | 水平线，用于分割内容
`<!--注释内容-->`   | 注释内容
`<p>`               | 定义段落
`<br>`              | 定义一个换行

## 文本格式化标签
tag         | description
---         | ---
`<b>`       | 定义粗体：<b>样式</b>
`<em>`      | <em>定义着重文字：<em>样式</em>
`<i>`       | 定义斜体文字：<i>样式</i>
`<small>`   | 定义小号文字: <small>样式</small>
`<strong>`  | 定义加重语气内容：<strong>样式</strong>
`<sub>`     | 定义下标文字：Cu<sub>2</sub>
`<sup>`     | 定义上标文字：4<sup>2</sup>
`<ins>`     | 定义插入文字：<ins>插入文字</ins>
`<del>`     | 定义删除字：<del>删除内容</del>

## 计算机输出标签
tag         | description
---         | ---
`<code>`    | 定义计算机代码：<code>code</code>
`<kbd>`     | 定义键盘码
`<samp>`    | 定义计算机代码样本，电脑输出的例子？
`<var>`     | 定义变量
`<pre>`     | 定义预格式文本

## HTML 引文，引用，以及标签定义
tag             | description
---             | ---
`<abbr>`        | 定义缩写，可用title写全称，鼠标移过去显示的文本(abbreviation)
`<address>`     | 定义地址
`<bdo>`         | 定义文字方向，属性`dir=rtl`从右显示到左
`<blockquoto>`  | 定义长引用,使用cite指定引用的来源，一般浏览器会把blockquoto元素呈现处一段左右两侧缩进40px的文本
`<q>`           | 定义短引语
`<cite>`        | 定义作品的标题
`<dfn>`         | 定义一个项目

## 链接
tag                                                         | description
---                                                         | ---
`<a href="http://www.weico.tech/">Blog</a>`                 | 链接网页
`<a href="#tips">提示</a>`                                  | 链接到本页面某个id位置
`<a href="http://www.weico.tech/index.html#tips">提示</a>`  | 链接到某页面的某id位置

**NOTE**  
- 若url为某一文件夹，则自动打开index.html，若url为某一文件名，则会产生两次请求？一次发现为文件夹名，第二次就到该文件夹下寻找index.html 
- 可以使用图片作为链接内容
- 使用target属性指定打开链接的位置
 
Value       | Description
---         | ---
`_blank`    | 为在空白标签或窗口
`_self`     | 在同一框架下打开链接
`_top`      | open the linked Document in full body of the window
`_parent`   | open the linked document in the parent frame
`framename` | open the linked document in the framename

## HTML<head>
element | descriptioon
---     | ---
title   | 设置文档标题
base    | 设置默认链接地址/目标 `<base href="http://www.weico.tech/" target="_blank">`
link    | 定义文档与外部资源之间的关系，常用语链接到样式表以及设置图标，`<link rel="stylesheet" type="text/css" href="mystyle.css">``<link rel="icon" href="weico.ico">`
style   | 该标签中可以直接添加样式来渲染文档
meta    | 描述了一些基本的元数据（不会显示，但是被浏览器解析）
script  | 加载脚本文件，如Javascript

## meta 
- `<meta name="keyword" content="HTML, CSS, XML, XHTML, Javascript">`,定义搜索引擎关键字
- `<meta name="description" content="免费 Web & 编程 教程">`,为网页添加描述内容
- `<meta name="author" content="Runoob">`，定义网页作者
- `<meta http-equiv="refresh" content="30">`,定义每30秒刷新当前页面
- `<meta http-equiv="refresh" content="5; http://www.weico.tech/">`，定义5秒钟后转向网站weico.tech

## img
- `<img src="" alt="" title="" width="304" height="228">`
- align属性设置图片对齐文字位置，bottom对齐文字底部(默认)，top对齐文字顶部，middle对齐文字中部（html5已废弃，使用css代替）
- 图片属于内联元素，空元素，没有html内容
- 图像映射:
```html
<img src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap">

<map name="planetmap">
    <area shape="rect" coords="0, 0, 82, 126" alt="Sun" href="sun.html">
    <area shape="circle" coords="90, 58, 8" alt="Mercury" href="mercur.html">
    <area shape="circle" coords="124, 58, 8" alt="Venus" href="venus.html">
</map>
```

## Bill  
- 基本：  
```HTML
<table>
    <tr>
        <td>row1, cell1</td>
        <td>row1, cell2</td>
    </tr>
    
    <tr>
        <td>row2, cell1</td>
        <td>row2, cell2</td>
    </tr>
</table>
```
<table>
    <tr>
        <td>row1, cell1</td>
        <td>row1, cell2</td>
    </tr>
    
    <tr>
        <td>row2, cell1</td>
        <td>row2, cell2</td>
    </tr>
</table>
- 表头用th， 标题用caption，框架thead,tbody,tfoot
- 分组colgrop, 列属性：
```HTML
<colgroup>
    <col span="2" style="background-color:red">
    <col style="background-color:yellow">
</colground>
```
- 跨行使用rowspan属性，跨列使用colspan属性
- cellpadding设置单元格内边距，cellspace设置单元的间距

## 列表
#### 有序列表
- ol li
- type="":1, a, A, i, I

#### 无序列表
- ul li

#### 定义列表
- dl dt dd

## 表单
- 表单内容使用form标签来定义
- 表单在浏览器并不可见，而是把表单内的数据打包发送给远端的服务器
- name元素就好像数据包裹上的标签，提供服务器识别
- 表单元素：

Bill Element                                        | Description
---                                                 | ---
`<input type="text" name="firstname">`              | 输入文字域，宽度缺省为20个字符
`<input type="password" name="pwd">`                | 密码字段，不会明文显示，而是用星号或圆点代替
`<input type="radio" name="sex" value="male">male`  | 单选按钮，选择后male为1
`<input type="checkbox" name="vehicle" value="bike">I have a bike<br/>;`<br/> `<input type="checkbox" name="vehicle" value="car">I have a car` |  复选框，注意name和value的区别
`<input type="submit">` | 定义了提交按钮，会将表单的数据打包
`<select name="cars">`<br/>`<option value="volvo">Volve</option>`<br/>`<option value="saab">Saab</option>`<br/>`<select>` | 定义下拉列表，若要预先选择那一个，则填写selected属性即可，使用\<optgrounp\>定义对选项进行分组
`<textarea rows="10" cols="30">`                    | 定义一个文本框
`<input type="button" value="Hello world">`         | 定义一个button，按钮上的文本为hello，world
`<input type="reset" value="reset">`                | 定义一个重置按钮
定义有边框的表单：  
```
<form action="" method="">
<fieldset>
<legend>Personal information:</legend>
Name:<input type="text" size="30"><br />
Email:<input type="text" size="30">
</fieldset>
</form>
```

可以使用表单发送邮件

## 表单属性
Attribute               | Description
---                     | ---
autocomplete            | 自动填充
novalidate              | 规定提交表单时不应该验证form或input域，对form元素使用？
autofocus               | 规定页面加载时，该域自动获取得焦点
form                    | 输入域所属的一个或多个表单，当为多个表单时使用空格分隔列表
formaction              | 描述表单提交的URL地址，且会覆盖form元素仲的action属性
formenctype             | 描述提交到服务器的数据编码（只对form表单中的method="post"的表单），该属性会覆盖form元素仲的enctype属性，主要与typt="submit"和"image"配合使用
formmethod              | 定义表单提交的方式，覆盖了form元素仲的method属性，也是配合submit和image类型使用
formnovalidate          | 描述<input>元素在提交表单时无需被验证
\<input\>height, width  | 规定image类型的input标签的图像高度和宽度
\<input\>list           | 规定输入域的datalist，datalist是选项列表
\<input\>min, max, step | 规定包含数字或日期的input类型的约束条件
\<input\>multiple       | 规定可以选择多个值
\<input\>pattern        | 规定使用一个正则表达式用于验证\<input\>元素的值
\<input\>placeholder    | 提供一种提示，描述输入域所期待的值，暂时占据着输入位置
\<input\>required       | 规定提交之前必须要填写该输入域

## 框架
#### 框架的使用
```html
<iframe src="http://www.baidu.com/" width="400" height="300"></iframe>
```
\<iframe\>元素为内联元素

#### 移除边框
```html
<iframe src="http://www.baidu.com/" width="400" height="400" frameborder="0">`
```

#### 使用框架来显示目标链接页面
```html
<iframe src="http://www.baidu.com/" name="search">
<p><a href="http://www.google.com/" target="search"></p>
```

## 脚本
#### 使用<script>标签插入脚本内容
- \<script\>标签用于定义客户端脚本，例如JavaScript
- \<script\>元素即可用于包含脚本语句，也可以通过src属性指向外部脚本文件
- JavaScript最常用于图片操作、表单验证以及内容动态更新

使用脚本让浏览器输出Hello World：  
```html
<script>
    document.write("Hello World!");
</script>
```
#### 使用<noscript>
- \<noscript\>用于显示无法使用脚本时的替代内容

## 字符实体
- 字符实体用于显示被html语法所占用的字符或者一些键盘上找不到的字符,也就是所谓的预留字符
- 字符实体区分大小写
- 使用字符实体名称比较容易记住但是有的浏览器并不支持实体名称
- 使用实体数字很难记住但是浏览器对其支持良好

#### 常用字符实体
显示结果    | 描述  | 实体名称  | 实体编号
---         | ---   | ---       | ---
&nbsp;      | 空格  | `&nbsp;`  | `&#160;`
&lt;        | 小于号| `&lt;`    | `&#60;`
&gt;        | 大于号| `&gt;`    | `&#62;`
&quot;      | 引号  | `&quot;`  | `&#34;`
&apos;      | 撇号  | `&apos;`  | `&#39;`
&amp;       | 和号  | `&amp;`   | `&#38;`
[实体字符参考手册](http://www.runoob.com/tags/ref-entities.html)

## 统一资源定位器（Uniform Resource Location）
#### 格式
```url
http://www.runoob.com/html/html-tutorial.html
scheme://host.domain:port/path/filename
```

- scheme:定义因特网服务的类型。最常见的是http

Scheme  | 访问              | 用于
---     | ---               | ---
http    | 超文本传输协议    | 以http://开头的普通网页。不加密。
https   | 安全呢超文本协议  | 安全网页，加密所有信息交换
ftp     | 文本传输协议      | 用于将文件下载或上传到网站
file    |                   | 访问计算机上的文件

- host:     定义域主机，http默认的主机为www
- domain:   定义因特网域名，比如runoob.com
- port:     定义主机上的端口，http默认端口为80
- path:     定义服务器上的路径(如果省略，默认访问根目录仲的index.html)
- filename: 定义文档/资源的名称

#### url字符编码
- url只能使用ascii字符集
- url编码使用%后跟阑尾十六进制数来替换非ascii字符
- url不能包含空格，而是用+来代替空格
- [url编码参考手册](http://www.runoob.com/tags/html-urlencode.html)


## 语意元素
- 注意在ie8之前无法在这些元素仲渲染css效果
 
tag | description
--- | ---
header | 定义文档的头部区域
nav | 定义文档的导航栏区域
section | 定义文档的分区区域，一定类似功能的集合
article | 定义文档的相对独立的内容，例如新闻，报道，文章
aside | 定义主区域内容之外的内容，例如广告、边栏？
footer | 定义文档底部区域
figuere | 定义独立的流内容，例如图像、图表、照片、代码等等
figcaption | 定义figure元素的标题，一般位于figure的元素仲的第一个或最后一个子元素的位置

## Web存储
- 早些时候，本地存储使用的是cookies，现在使用html5 web存储，更加安全和快速
- Web存储的数据不会保存在服务器上
- Web存储的数据只用于用户请求网站数据上，它也可以存储大量的数据，而不影响网站的性能
- 数据以键或值存在，web网页的数据只允许该网页访问使用