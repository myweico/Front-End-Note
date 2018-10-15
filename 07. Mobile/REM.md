# 字体的知识点
- rem是相对单位，基于html（root）元素的字体大小
- em，ex的大小时基于包含块的字体大小
- %相对于父元素的字体大小
- 根元素的父元素字体大小相当于默认的字体大小
- 浏览器的默认大小，一般为16px，字体默认为inherit

# rem适配方案
### 适配方案
- 伸缩布局 flex
- 流式布局 百分比
- 响应布局 媒体查询
- rem布局 rem
- 前三种只能做到宽度的适配（高度不会变，图片除外）
- rem布局宽度和高度都能适配（等比缩放）

### rem适配
- 所有的元素都是使用rem单位
- 通过html字体大小便可以控制所有的元素的尺寸
    - 把px单位转换成rem单位
    - 页面设计的px转换成rem，设置基准大小
    - 当尺度变化时，改变基准尺度
    - 当前基准 = 原基准 * 当前尺寸 / 设计稿尺寸

# 案例：苏宁
### 项目less结构
+ less
    - adapptor.less
    - index.less
    - var.less
    - mixins.less
    - reset.less

### less
- less中没有循环，使用迭代替代循环
- 函数有when条件语法，当满足条件时执行
- less中也有数组类型
    - `adaptorList: 750,616;`
    - 使用`extract(@adaptorList, @index)`获取数组的值

### 坑
- input元素会被当成内容，无法被float的元素盖住
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            box-sizing: border-box;
        }

        form {
            width: 800px;
            height: 60px;
            background: pink;
        }

        span {
            float:left;
            background: url("../images/icon_search.png") no-repeat center / 27px 28px ;
            height: 60px;
            width: 100px;
        }

        input {
            width: 500px;
            height: 60px;
        }
    </style>
</head>
<body>
<form action=""><span></span><input type="text"></form>
</body>
</html>
```
- position:fix的百分比是相对于窗口

