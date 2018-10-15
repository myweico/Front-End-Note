## Bullet Points
- css使用一个盒模型来控制元素如何显示，盒子由内容区和可选的内边距、边框和外边距组成，即一个元素是由内容区、内边距、边框以及内边距组成
- 内边距、边框和外边距都是可选的
- 内边距和外边距只能指定大小，不能指定样式
- 元素的背景会在内容、内边距以及边框下显示，但不会延伸到外边距的下面
- 内边距和外边距大小可以用用像素或者百分数来表示，（思考百分数是相对哪里）
- 对于希望成组指定样式的元素要使用class属性（一类）(.myweico)
- 对于唯一的元素用id指定样式，可以唯一地标志位置(#myweico)
- 在HTML中可以使用多个样式表，样式表越后具有越高的优先级
- 可以在<link>元素中使用媒体查询或者在css中使用@media规则为指定的设备选择指定的样式

## 指定行高 
- `line-height: 20px;`
- `line-height: 1.2em;`
- `line-height: 120%;`//比例都是相对与字体大小

## 设置边距
#### 外边距 
Code                            | Effect
---                             | ---
`margin: 10px;`                 | 将上右下左的外边距都设为10px
`margin：10px 12px;`            | 将上下外边距设为10px，右左外边距设为12px
`margin: 10px 12px 14px;`       | 将上外边距设为10px，右左外边距设为12px，将下外边距设为14px
`margin: 10px 12px 14px 16px;`  | 将上、右、下、左外边距一次设为10px，12px，14px，16px
`margin: 1.2em;`                | 此外还可以使用百分比、em设置大小  
`margin-left: 1.2em`            | 左外边距设置为1.2em大小

#### 内边距
与外边距相同，将`margin`改为`padding`即可

## 设置边框
#### 边框样式
设置方式：
- `border-style: top right bottom left;`//设置上右下左的边框样式
- `border-right-style: groove;`//单独设置右边框的样式

Attribution Value | Value
--- | ---
`solid ` | 实线
`dotted` | 虚线、点线
`dashed` | 破折线，即虚线中的点变成小横线
`groove` | 槽线，线条像水槽一样凹进去
`ridge ` | 脊线，边框像山脊一样凸起
`inset ` | 实现边框内的内容向内凹的效果
`outset` | 实现边框内的内容向外凸的效果

#### 边框宽度
Code | Effect
--- | ---
 `border-width: thin;`                     | 使用thin，medium或者thick关键字
 `border-width: 5px;`                      | 使用像素设置边框的大小
 `border-width： top right bottom left;`   | 设置上右下左的边框大小
 `border-right-width: 10px;`               | 设置右边框的大小

#### Color Of The Border
Code                                        | Effect
---                                         | ---
`border-color: top right bottom left;`      | 设置上右左下边框的颜色
`border-right-color: red;            `      | 单独设置右边框的颜色

#### Setting Radius
Code    | Effect
---     | ---
`border-radius: 15px;` | 设置四个角的半径
`border-top-left-radius: 15px;` | 设置左上角的半径，其余为top-right、bottom-left、bottom-right

#### Totol Border Setting
Code | Effect
--- | ---
`border-left: width color style;`   | 设置左边框
`border: width color style;`        | 设置全部边框

## 其他设置
#### 设置行高
Code：`line-height: 1.2em`  
`line-height:1`，when it use figure,it is relative to itself

#### 设置背景图像   
Code                                                    | Effect
---                                                     | ---
`background-image: url(images/background.gif) `         | 设置背景图像
`background-repeat: no-repeat;                `         | 设置背景图像不重复
`background-position: top left;               `         | 设置出现在左上角
`background-color:white`                                | 设置背景为白色
`background: white url(images/background.gif) no-repeat`| 综合设置背景

**repeat:**
- no-repeat 只出现一次，不重复
- repeat-x  图像只在水平线上重复
- repeat-y  图像只在垂直线上重复
- inherit   集成父元素的设置

**position:**  
- top、right、bottom、left的组合
- other position

#### 媒体查询
**CSS具有覆盖作用，越后越优先**  
```html
<link type="text/css" href="corporate.css" rel="stylesheet">
<link type="text/css" href="beverage-division.css" rel="stylesheet">
<link type="text/css" href="longe-seattle.css" rel="stylesheet">
```

**在HTML中使用媒体查询，对于不同的媒体使用不同css文件**  
```html
<link href="lounge-mobile.css" rel="stylesheet" media="screen and (max-device-width: 480px)">
<link href="lounge-print.css" rel="stylesheet" media="print">
```

**直接在css中添加媒体查询**  
```css
@media screen and (min-device-width: 481px) {
    #grarantee {
        margin-right: 250px;
    }
}

@media screen and (max-device-width: 480px) {
    #guarantee {
        margin-right: 30px;
    }
}

@media print {
    body {
        font-family: Times, "Times New Roman", serif;
    }
}
```