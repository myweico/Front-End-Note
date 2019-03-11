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