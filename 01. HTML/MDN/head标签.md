head标签中的内容不会显示到浏览器中，主要是包含一些页面的元数据

## 添加标题
```html
<title>MDN</title>
```
## <meta>元素
### 指定文档中字符的编码
指定文档正确的编码，字符才能够正常地显示
```
<meta charset="utf-8">
```

### 添加作者和描述
添加作者
```html
<meta name="author" content="weimingye">
```
添加描述
- 可以显示到搜索的描述显示区域
- 增加别人对网站的了解

```html
<meta name="descroption" content="this is a website to record my life">
```

### 其他元数据
有一些服务商会从网页中提取特定的元数据，来实现某种功能

例如，Facebook会提取下面的元数据，作为Facebook分享链接中的图片和描述

```html
<meta property="og:image" content="https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

## 添加自定义图标
通过link标签引入图标
```
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

## 引入css
外部引入
```
<link rel="stylesheet" href="main.css">
```
style标签
```
<style>
    h1 {
        font-size: 24px;
    }
</style>
```
内联
```
<h1 style="font-size: 24px">Title</h1>
```

## 引入JavaScript
外部引入
```html
<script src="main.js"></script>
```
内部标签
```html
<script>
    console.log('script')
</script>
```
内联执行
```html
<button onclick="console.log('script'"></button>
```

## 设定主语言
设定主语言的优势
- 搜索有效索引，有的搜索是按照语言显示结果
- 让翻译工具可以检测到是否需要翻译
- 让屏幕阅读器可以正确地发音