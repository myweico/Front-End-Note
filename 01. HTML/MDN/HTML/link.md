# 超链接
## 创建超链接
```html
<a href="weimingye.com">我的博客</a>
```

## 使用 title 添加支持信息
title 指定的信息会在鼠标悬停在链接的时候显示
```html
<p>I'm creating a link to
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
</p>
```

注意使用 键盘来导航的人很难获取得的方式呈现

## 建立块级链接
可以将行内块元素转换成为一个超链接，比如 img 元素，将图像转为链接，只需要将图像放在 a 标签中间即可
```html
<a href="https://www.mozilla.org/en-US/">
  <img src="mozilla-image.png" alt="mozilla logo that links to the mozilla homepage">
</a>
```

## 统一资源路径（url）和路径
- `.`表示当前文件夹
- `../`
- `/`表示根路径

一般对于同一个网站的内容使用相对路径，其他网站的内容使用绝对路径，若同一个网站的内容使用绝对路径，对于带有域名的绝对路径，需要消耗解析 DNS 的时间

## 文档片段
文档片段：超链接链接到文档的部分

使用 id 标记文档片段
```html
<h2 id="Mailing_address">Mailing address</h2>
```

在 url 后包含文档即可
```html
<!-- 链接到某个文档的文档片段 -->
<p>Want to write us a letter? Use our <a href="contacts.html#Mailing_address">mailing address</a>.</p>

<!-- 链接到当前文档的文档片段 -->
<p>The <a href="#Mailing_address">company mailing address</a> can be found at the bottom of this page.</p>
```

## 使用清晰的链接措辞
原因：
- 有利于屏幕阅读器使用者快速以及正确地获取到链接
- 搜索引擎会将链接的关键词作为链接文档的描述
- 便于读者高效地获取到链接信息

清晰的标准：
- 不多余
- 简短（不会浪费 visual impair 的时间
- 确切描述到链接的作用
- 若链接到非 html 资源，需要提示（word、pdf、需要 flash 等）

## 使用下载属性
若要链接到下载的资源而不是在浏览器中打开的时候，可以为 a 链接添加一个 download 属性来触发浏览器下载资源
```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
   download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```