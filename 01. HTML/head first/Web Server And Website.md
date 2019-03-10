## URL
1. url就是统一资源定位器（Uniform Resources Locators）,即网络上资源的地址。
2. 组成：http://www.google.com/index.html <br/> 第一部分（http）用于指出获取资源的协议，http指超文本传输协议（hypertext transfer protocol），一种传输超文本文件的协议，此外还有file协议，浏览器打开本地文件所用的协议，ftp协议，文件传输协议。
<br/>
第二部分指网址，www.google.com, 代表了根目录
<br/>
第三部分指根目录到资源的绝对地址
3. 若url只是给出一个目录名，则浏览器会自动在其后加上“\”，将其变为该进入该目录路径，若给出目录路径则，浏览器会自动寻找该目录下的默认文件，例如：index.html、default.htm(windows web 服务器)，或者index.php
4. url有相对路径和绝对路径，一般相对路径用于访问同一网站下的其他网页，绝对路径用于访问其他网站上的页面，用相对路径可以相对与主目录，当域名更改时无影响，具有较好的移植性？v

## Others
1. 域名与网站名不一样，域名指weico.tech,网站名指www.weico.tech。一个域名可以创建多个网站,例如cool.weico.tech、mail.weico.tech等等
2. 锚标签设置target属性为“_blank”可以在新的窗口中打开网页，若多个target设置为“coffee”，则都会在名为“coffee”的窗口中打开网页
3. 使用“title”属性可以添加可读性，并且能为视力障碍人士提供语音帮助
4. 锚标签可以快速定位到id标签处，在url中添加“#标签名”即可，例如
&lt;a href="www.weico.tech#tag"&gt;