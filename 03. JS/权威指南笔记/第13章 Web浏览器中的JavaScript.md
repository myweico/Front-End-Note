## 客户端JavaScript
- window对象是所有客户端JavaScript特性和API的主要接入点
- window对象其实就是JavaScript客户端的全局对象，其属性和方法就是全局变量和全局函数
- window对象有一个指向自身的window属性，通过window属性就可以访问window对象
- window对象定义了很多重要的属性、方法和构造函数
- window对象中一个很重要的属性就是document，它引用Document对象，表示窗口中的文档。
- 通过docuemnt对象的相关方法可以获取文档上的一些与元素对象
- 可以使用document对象的相关方法设定元素对象的相关内容、属性、样式、事件等等
- Window、Docuemnt和Element对象上重要的属性集合就是事件处理程序相关的属性。
- 事件处理程序可以让JavaScript代码修改窗口，文档和组成文档的元素的行为。事件处理程序都是以单词“on”开头的

#### Wen文档里的JavaScript
- JavaScript程序通过Document对象和它包含的Element对象遍历和管理文档的内容
- 可以通过操作CSS的样式和类，修改文档内容的呈现
- 可以通过注册适当的事件处理程序来定义文档元素的行为。
- 内容、呈现和行为的组合叫做动态HTML和DHTML。

#### Web应用里的JavaScript
- 在文档中使用JavaScript DHTML的特性都会在Web应用中应用到，除了内容、呈现和操作API外，还依赖Web浏览器环境提供的更基础的服务
- 当前的Web已经不仅仅作为显示文档的工具，而渐渐变成了一个**简易的操作系统**
    - 传统的操作系统而可以组织桌面和文件夹里的图标，Web浏览器可以在工具栏以及文件夹里组织书签
    - 系统可以在一个窗口里运行多个应用程序，Web网页可以在一个标签里显示多个文档（我理解是一个窗口可以显示多个标签）
    - 操作系统定义了很多底层网络API，提供绘制图像、保存文件等功能，Web浏览器也定义了底层网络API、保存数据和绘制图像
- **Web浏览器就是一个简易操作系统**
- Web应用可以定义为JavaScript访问浏览器更多的高级服务（比如网络、图像和数据存储）的Web页面
- 高级服务里最有名的就是XMLHttpRequest对象，后者可以对HTTP请求编程来启动网络，Web应用使用这个服务获取新的信息，而不用重新载入页面
- HTMl5标准和相关的标准为Web应用定义了很多其他重要的APi，例如数据存储和图像API、地理位置信息、历史管理和后台线程
- JavaScript只是增强了Web文档，设计良好的文档在禁用了JavaScript后仍能正常地访问,而Web应用则是JavaScript程序，不要指望禁用了JavaScript后仍能正常使用

## 在HTML里嵌入JavaScript
在HTML文档里潜入客户端JavaScript代码有4种方法：
- 内联，放置在\<script>和\<\script>中（少用了）
- 放置在由\<script>标签内src属性指定的外部文件中
- 放置在HTML元素标签内事件属性的处理程序中
- 放在一个URL里，这个URL使用特殊的`javascrit:`中（伪协议，很少用）

#### <script>元素内联标签
- JavaScript代码可以以内联的形式出现在HTML文件的<script>标签中
```html
<script>
// JavaScript code
</script>
```
- 若代码中包含了"<"或"&"字符，那么这些字符将被解析为XML标记，若想使用XHTML，最好使用JavaScript代码放入到CDATA部分里
```html
<script><![CDATA[
    // JavaScript代码
]]></script>
```
#### 外部文件中的脚本
- <script>标签中的src可以引用外部的文件
```html
<script src="../../scripts/util.js"></script>
```
- 标签中即使没有内容，结束标签也不能省略，XHTML可以使用简短的<script/>标签
- 使用src属性时，标签之间的内容会忽略，若需要可以在其之间添加代码的补充说明或者版权信息（注意在其中添加非空白字符或者非JS注释文本，HTML5检验器都会报错
- src的优点：
    - 内容与结构分离，简化文档，可一大段删除
    - JS文件可以在多个文档中共用，只需管理一份文档
    - 若JS文件由多个页面共享，只需要下载一次，使用它的第一个页面下载后，随后的页面可以从浏览器缓存中检索它
    - src可以是任意的URL，可以是另一个Web服务器输出的代码，互联网广告依赖与此
    - 可以使用其他网站缓存好的脚本
- 从文档服务器之外的服务器里载入脚本由重要的安全隐患，同源安全策略会阻止一个域文档中的JavaScript脚本与另一个域的内容进行交互。
- 当在页面中更实用给src属性包含一个脚本时，交给了脚本作者完全控制Web页面的权力

#### 脚本类型
- JS时Web的默认脚本类型，<script>标签中不写type属性也没关系
- 若要使用非标准的脚本语言，显示VBScript则需要使用type属性指定脚本的MIME类型
```html
<script type="text/VBScript">
    // 代码
</script>
```
- 老的浏览器也会使用language属性替代type属性，但language属性已经废弃了，不该继续使用
- 当Web浏览器遇到<script>元素中包含不可识别的type属性时，其会解析这个元素但不会尝试显示或者执行它的内容（解析是什么意思？？？）
- 可以使用<script>元素写入文本但不显示或者执行，然后获取其内容，这种方式只能是内联的方式，若src引用的是外部无效的文件，浏览器将会忽略，不下载任何内容

#### HTML中的事件处理程序
- 可以在HTML标签中的事件处理属性中添加JavaScript代码
```html
<input type="checkbox" name="options" value="giftwrap" onchange="order.options.giftwrap = this.checked;">
```

#### URL的JavaScript （p318)
- 部分浏览器（firefox）会执行URL里的代码并返回字符串作为新文档的显示内容
- 部分浏览器（Chrome和Safari）不允许URL像上面那样覆盖当前文档，他们会忽略当前的返回值
- 可以使用void将函数调用结果或者表达式转为undefined值
```js
<a href="javascript: void window.open('about:blank');">打开一个窗口</a>
```
- 书签其实就是一个URL
- 如果书签就是`javascript:`，则保存起来的是一段脚本，叫bookmarklet；可以从菜单或者工具栏启动，对当前文档进行操作
```html
<a href="javascript:
var e = '', r = '';
do {
    /* 输出表达式和结果，并要求输入新的表达式 */
    e = prompt('Expression: ' + e + '\n' + r + '\n', e);
    try { r = 'Result: ' + eval(e);}
    catch(ex) {r = ex}
} while (e);        /* 直到没有输入表达式或者单机了Cancel按钮才会停止，否则一直循环执行*/
void 0;
">
```
- 通过硬编码可以将它另存为可以在任何页面上运行的书签

## JavaScript程序的运行
- 客户端JavaScript程序为Web页面中所包含的所有JavaScript代码组成（上面四个部分的代码）
- 所有这些单独的代码共用同一个全局window对象，可以看到相同的Document对象共享相同的全局函数和变量集合
- 如果一个Web页面包含了一个嵌入的窗体（通常使用<iframe>元素），**嵌入文档中JavaScript代码和被嵌入文档里的JavaScript代码（？？？两者区别**）会有不同的全局变量
- JavaScript由两个阶段：载入文档内容，并执行<script>元素里的代码（内联和外部引用都是）。脚本通常是（不总是）按照文档里出现的顺序执行。JavaScript都是从上往下，按照顺序、循环、条件以及其他控制语句控制的顺序执行。
- 当文档载入完成后，所有的脚本执行完成后，JavaScript进入到第二个阶段。这个阶段是异步的，而且由事件驱动。（事件可以是鼠标点击、键盘活动、网络活动、运行事件和代码错误）
- 事件驱动阶段第一个事件就是load事件，表示文档完全载入。只要Web显示文档，这个事件驱动状态就会一致持续下去。
- 核心JavaScript和客户端JavaScript都有一个单线程执行模型。脚本和事件在同一个时间只能执行一个，没有并发性。

#### 同步、异步和延迟的脚本
- HTML解析器遇到<script>标签时，默认先停止解析以执行脚本，执行完后恢复文档的解析和渲染
- 若<script>引用外部的文件，后面的文档部分在下载和执行脚本之前都不会出现在浏览器中
- 脚本的执行默认都是同步和阻塞的。某些浏览器的<script>标签支持defer和async属性，这些值是布尔值，出现则为true
- defer和asyn属性告诉浏览器不会生成文档内容，让浏览器可以放心地进行解析和渲染文档

```html
<script defer src="ferred.js"></script>
<script async src="asyn.js"></script>
```
- defer属性使得浏览器延迟脚本的执行，直到文档的载入和解析完成
- async属性使得不用在下载脚本时阻塞文档解析，再下载完文档后尽快执行
- 若同时支持defer和asyn，浏览器会遵循asyn
- 延迟的脚本会按它们在文档里出现的顺序执行，异步脚本是在它们载入后执行（我理解是下载后执行，由于下载脚本大小有差别），它们可能会无序执行

#### 事件驱动的JavaScript
- 对于大部分浏览器中的大部分来说，会把一个对象传递给时间处理程序作为参数，那个对象的属性提供了事件的详细信息
- 事件处理函数的返回值有时用来指示函数是否充分处理了事件，以及阻止浏览器执行事件的默认操作
- 有些事件的目标是文档元素，其经常会将触发传递给文档树，这个过程叫做“冒泡”。（例如<button>没有click事件没有处理函数，时间会冒泡到按钮嵌套的容器元素，任何注册在容器元素上的单击事件都会被触发。
- 若想为一个事件注册多个事件处理程序函数，需要用到addEventListener()的方法，允许注册多个监视器

```js
window.addEventListener("load", function() {...}, false); // 第一个参数为事件的名称

// IE8及以前的浏览器中，必须使用一个相似的方法，叫做attachEvent():
window.attchEvent("onload", function(){...});

```

#### 客户端JavaScript的线程模型
- JavaScript语言核心并不包含任何的线程机制，并且客户端JavaScript传统上也没有定义任何的线程机制
- 单线程可以让编程变得简单，编写代码时可以确保两个事件处理程序不会同一时刻运行，操作文档内容时也不必担心其他线程的试图同时修改文档，也不需要担心心锁、死锁和竞态条件
- 单线程意味着程序在实行的时候停止用户的输入，意味着脚本和事件处理程序不能运行太长事件。脚本太长，会让文档后面的内容长时间得不到显示。事件处理程序执行计算密集的任务将会让用户等待过长的事件，导致用户认为浏览器崩溃。
- 若应用程序不得不执行过多的计算，需要考虑告知程序正在运行，浏览器并没有挂起，可以考虑将计算分解为离散的子任务，可以使用setTimeout()和setInterval()的方法在后台运行子任务，同时更新一个进度提示器向用户显示反馈。
- HTML5定义了一种并发的控制方式，叫做“Web worker”，其用于执行计算密集任务而不冻结用户界面的后台线程。

#### 客户端JavaScript的时间线
1. Web浏览器创建Document对象，解析HTML元素和其中的文本，添加Element对象和文本节点到文档中，此时的document.readystate为“loading”
2. 若遇到没有defer或者async的<script>元素时
    1. 会将script元素添加到文档中，然后执行行内脚本或者外部脚本
    2. 在脚本下载（需要时）和执行过程中，解析器暂停，脚本中可以用document.write()来把文档插入到输入流中
    3. 执行完后，解析器恢复，将脚本的内容解析为文档的一部分
3. 当解析器遇到asyn的<script>元素时，边下载脚本，边继续解析文档，脚本会下载后尽快执行。异步脚本禁止使用document.write()方法。
4. 当文档解析完成，document.readystate的状态变为“interactive”
5. 所有的defer的脚本，会按照他们在脚本里出现顺序执行，异步脚本可能会在这个时间执行，延迟脚本能访问完整的文档树，禁止使用document.write()方法
6. 浏览器的DOM内容加载完成后，Document对象会触发DocumentContentLoaded事件，标志着程序执行从同步脚本执行阶段转换到了异步事件驱动阶段。（可能还有异步脚本没有执行完成）（我理解为大概的文档结构加载完毕），这时文档加载完毕，但其他内容没有载入，如图片。
7. 当图片内容的和异步脚本完成载入和执行，document.readystate的状态就变为“complete”，Web浏览器触发Window对象上的load事件
8. 从此刻起，会调用异步事件，以异步响应用户输入事件、网络事件、计算器过期等
- DOMContentLoaded事件所有当时的浏览器都支持
- document.readyState属性当时被大多数的浏览器支持，只是属性的值在浏览器之间有细微的差别
- defer被所有的IE浏览器支持，asyn属性在写此书的时候并不通用

## 兼容性和互用性
Web浏览器时Web应用的操作系统。Web文档和应用在不同的操作系统、浏览器开发商、不同的浏览器版本中查看和运行。写一个健壮的程序在不同的环境中运行，是一个挑战。   
兼容性和互用性问题分为三类：
- 演化：特性被广泛接受变为标准，新特性旧浏览器不支持，要做出抉择
- 不一致：实现同一个功能在不同的浏览器中有所差异，有的支持有的不支持
- bug：每个浏览器都有bug，没有按照规范实现所有客户端的API，需要编写兼容各个浏览器的程序
- Js语言本身是所有浏览器厂商实现实现的，其不是兼容性问题的源头
- 可以使用一些类库解决兼容性问题，
- 使用JavaScript框架的一个重要功能就是其定义了新的客户端API并兼容所有的浏览器

#### 分级浏览器支持
从某种维度对浏览器厂商/版本/操作系统变体进行分级。
- 分级浏览器的A级要通过所有的功能测试
- C级浏览器只需要HTML完整的情况下可用即可，不需要JS和CSS完全正常工作
- 那些不是A级和C级的浏览器称作X级浏览器

#### 功能测试
- 功能测试就是在脚本中添加检测功能是否存在的代码

```js
if (element.addEventListener) {
    // 若功能存在，使用它
    element.addEventListener("keydown", handler, false);
    element.addEventListener("keypress", handler, false);
} 
else if (element.attachEvent) {
    element.attachEvent("onkeydown", handler);
    element.attachEvent("onkeypress", handler);
}
else {
    element.onkeydown = element.onkeypress = handler;
}
```

- 功能测试并不涉及浏览器的开发商和版本
- 功能测试只是测试浏览器是否支持功能，但不能验证功能实现的完整性

#### 怪异模式和标准模式
- IE6发布时，定义了IE5没有的CSS标准特性，为了向后兼容，定义了两种模式：怪异模式和标准模式
- 标准模式或CSS兼容模式中，浏览器遵循CSS标准，在怪异模式中，浏览器表现与IE4和IE5的怪异非标准模式一样。
- 渲染模式的选择依赖于HTML文件顶部的Doctype声明，IE6中打开没有Doctype声明或者打开声明了某些Doctype权限的页面都会使用怪异模式，定义了严格Doctype页面会按照标准模式进行渲染
- 使用document.compatMode属性检测浏览器工作的模式

#### 浏览器测试
- 有时候需要解决某个浏览器中个别的bug或者难题，但是却没有方法检测bug的存在性，这时候就需要检测浏览器的信息，针对浏览器做出对应的处理
- 可使用Navigator对象获取浏览器信息
- 确定当前浏览器的厂商和版本的代码通常叫做浏览器嗅探器或者客户端嗅探器

#### Internet Explorer的条件注释
- 大多数的浏览器兼容性问题都是针对IE浏览器
- IE浏览器支持条件注释，（其他浏览器会将其识别为注释，而IE能够识别条件并执行里面的代码）在处理不兼容性问题时非常有用

```html
<!-- [if IE 6]>
This content is actually inside an HTML comment.
It will only be display in IE 6.
<![endif]-->

<!-- [if lte IE 7]>
This content will only be displayed by IE5, 6 and 7 and earlier.
lte stands for "less than or equal". You can alse use "lt", "gt", and "gte"
<![endif]-->

<!--[if !IE]> <-->
This is normal HTML content, but IE will not display it
because of the comment above and the comment below.
<!--><![endif]-->

This is normal content, displayed by all browsers.

<!-->仅当IE引用excanvs.js库<-->
<!--[if IE]><script src="excanvas.js"></script><![endif]-->
```

- IE中的JS也有条件注释，其以文本`/*@cc_on`开头，以文本`@*/`结束

```js
/*@cc_on
    @if (@_jscript)
    // 该代码位于一条JS注释内但在IE中执行它
    alert("In IE");
    @end
    @*/
```
- 关键字@if、@else和@end划出IE浏览器条件执行的地方。JScript为Microsoft自己的JavaScript解释器的名字，`@_jscript`变量在IE中总是为true

```js
/*@cc_on
    @if (@_jscript)
        // 这里的代码在条件注释语句中，普通的浏览器会将其当成注释，IE却识别条件
        alert('You are using Internet Explorer');
    @else*/
        // 这里的代码不在注释语句中，但在IE的注释语句内
        // 普通浏览器会执行这里的代码，但是IE跳过这里的代码
        alert('You are not using Internet Explorer');
    /*@end
 @*/
 ```
 
 ## 可访问性
 - Web是发布信息的理想工具，而JavaScript程序可以增强对信息的访问。
 - 应该保障有视觉障碍或者肢体困难的用户没办法正确地获取信息。
 - 屏幕阅读器有的能识别JS，但有的不能，所以呈现数据不应该过分依赖JS
 - JS应该用于增加表现力，而不是负责信息的呈现
 - 注意只能使用键盘但不能使用鼠标的用户，事件的发生不应当过分依赖鼠标，应当充分考虑键盘用户（考虑代价）
 
## 安全性
#### JS的限制
- Web浏览器针对恶意代码的第一道防线就是不支持某些功能
    - 客户端JS没有权限写入或删除客户计算机上任意文件或列出任意目录
    - 客户但JS没有通用的网络能力，可以对HTTP协议编程，HTML5有一个用于和指定服务器通信的API，WebSockets
- 第二道防线就是在自己支持的某些功能上施加限制。
    - 只有响应鼠标单击时，才能弹出新的浏览器窗口，避免广告商滥用弹出
    - JS可以关闭自己打开的窗口，但是不允许它不经过用户确定关闭其他的窗口
    - HTML FileUpload的value属性是只读的，避免秘密上传用户的任意文件
    - ** 脚本不能读取从不同浏览器载入的文档的内容，除非这个就是包含该脚本的文档**（？？？？）

#### 同源策略
 - 同源策略负责管理窗口或窗体中的JavaScript代码与其他窗口或帧的交互。脚本只能读取和所属文档来源相同的窗口和文档属性。
 - 文档的来源包含协议、主机以及载入文档的URL窗口。从不同的端口载入的文档具有来源，使用http和使用https协议的文档属于不同的来源，从不同Web浏览器载入的文档具有不同的来源。
 - 脚本的来源与同源策略无关，相关的是脚本所嵌入的文档的来源。来源A主机的脚本嵌入到主机B上的文档，脚本对和所嵌入的文档的来源相同的文档具有控制权(同样来自B主机同样的协议和同样的端口)。脚本若打开一个新的窗口并载入来源自主机B的另一个与嵌入文档来源相同的文档，脚本对这个新的文档具有完全的访问权限。若脚本打开第三个窗口并载入主机C的文档（来源不相同），同源策略就会发挥作用，阻止脚本访问这个文档。
 - 同源策略对不同源的窗口的大部分属性都起作用，尤其对Document的大部分属性而言。如果脚本可以打开不同源的窗口但是不能以任何方式查看窗口的内部。
 - 同源策略应用于使用XMLHttpRequest生成的HTTP请求。这个对象允许客户端JavaScript生成任意的HTTP请求到脚本所属文档的Web服务器，但是不允许脚本和其他的Web服务器通信。
 - 同源策略可以有效地放置脚本窃取私有的信息。若不存在同源策略，恶意代码容易打开一个新的窗口，然后在新的窗口打开正规的网站，然后诱使用户输入密码等信息，而恶意代码可以获取正规窗口的信息，然后发送回服务器。
 
** 不严格的同源策略**
- domain属性设置：使用document的domain属性支持多个域名站点的文档共享，domian使用的字符串必须具有有效的域前缀，domain的初始值是home.example.com，其domain可以设置为example.com但是不可以设置为home.example或者apple.com，另外domain必须要有一个点号，不能把它设置为com或者其他顶级域名
- 跨域资源共享：标准草案用新的`Origin:`请求头和新的Access-Control-Allow-Origin响应头来扩展HTTP。它允许服务器用头信息显式地列出源，或者使用通配符来匹配源并允许任何地址请求文件。
- 跨文档信息：允许一个文档的脚本传递文本信息给另一个文档的脚本。调用Window对象的postMessage()方法，可以异步传递消息事件到窗口的文档(onmessage事件处理程序函数).

#### 脚本化插件和AcitveX空间
- 尽管JavaScript语言和基本的客户端对象模型缺乏大多数恶意代码所需要的文件系统和网络功能，但浏览器上脚本话ActiveX和插件的能力存在着安全性问题。

#### 跨站脚本
- 跨站脚本叫做XSS(Cross-site script)，也就是攻击者像目标站点注入HTML标签或者脚本。
- 如果Web页面动态地产生文档内容，并且这些文档内容是基于用户提交的数据的，并没有通过从中移除任何嵌入的HTML标签来消毒（消除标签的功能），这个Web页面就很容易遭到跨站脚本的攻击。

```js
// 没有消毒，这里将可能会写入脚本
var name = decodeURLComponent(window.location.search.substring(1)) || "";
document.write("hello" + name);
```
- 通常，防止XSS攻击的方式是，在使用任何不可信的数据动态创建文档内容之前，从中移除HTML标签。

```js
// 将尖括号替换为对应的转义字符，消除其标签的作用
name = name.replace(/</g, "&lt;").replace.(/>/g, "&gt;");
```

#### 拒绝服务攻击
- 上面的同源策略和其他的安全限制可以很好地预防恶意代码毁坏数据或者侵犯隐私这种问题。然而它们并不能放置拒绝服务攻击。
- 如果访问了启动JavaScript功能的一个恶意Web站点，这个站点可以使用alert()对话框无限占用浏览器或者用一个无限循环或者没有意义的计算来占用CPu。
- 某些浏览器可以检测到运行很长的脚本并让用户选择终止它们。但是恶意代码还可以使用setInterval()定时运行脚本来占用资源。
- 这个是一个没有意义的攻击，我认为属于损人不利己的攻击手法。

#### 客户端框架
- 使用客户端框架或者类库可以便捷地创建它们的web应用
- 从某种意义来说，类库也是框架，它们对Web浏览器提供的标准的专用的API进行封装，向上提供了更高级的API，更高效地进行客户端开发
- 一旦使用一个框架，就要使用框架提供的API来写代码，高级的API可以简单地完成复杂的功能