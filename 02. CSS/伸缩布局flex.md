# 参考资料
[阮一峰：Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰：Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
# 主要概念
![主要概念](http://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)

- flex容器：采用flex布局的父元素
- 项目：flex容器里面的子元素
- main-axis: 主轴，默认水平从左往右
    - main-start：主轴开始的地方
    - main-end：主轴结束的地方
    - main-size：项目占据主轴的长度
- cross-axis：交叉轴，垂直主轴的轴
    - cross-start：交叉轴开始的地方
    - cross-end：交叉轴结束的地方
    - cross-size：项目占据交叉轴的长度

# 容器的属性
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content


### flex-direction
> 定义了主轴的方向

flex-direction  | 描述
---             | ---
row（✔）       | 主轴水平 L -> R
row-reverse     | 主轴水平 R -> L
column          | 主轴垂直 T -> D
column-reverse  | 主轴垂直 D -> T


### flex-wrap
> 定义项目排在一条轴线上，摆放不下时怎么换行的的行为

flex-wrap       | 描述
---             | ---
nowrap（✔）    | 不换行
wrap            | 换行
wrap-reverse    | 从end开始摆放，换行

##### nowrap 
![](http://www.runoob.com/wp-content/uploads/2015/07/9da1f23965756568b4c6ea7124db7b9a.png)

##### wrap
![](http://www.runoob.com/wp-content/uploads/2015/07/3c6b3c8b8fe5e26bca6fb57538cf72d9.jpg)

##### wrap-reverse
![](http://www.runoob.com/wp-content/uploads/2015/07/3c6b3c8b8fe5e26bca6fb57538cf72d9.jpg)


### flex-flow
> 即flex-direction和flex-flow的简写形式，默认为row nowrap

```
.box {
    flex-flow: row nowrap;
}
```

### justify-content属性
> 定义了项目在数轴上的对齐方式

justify-content | 描述
---             | ---
flex-start（✔）| 靠着flex-start
flex-end        | 靠着flex-end
center          | 对齐主轴中线
space-between   | 对齐主轴两端
space-arround   | 每个项目两侧的边距相等

![](http://www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)

### align-items
> 定义项目在交叉轴上面对齐的方式

align-item          | 描述
---                 | ---
flex-start          | item-cross-start <=========> cross-start
flex-end            | item-cross-end <=========> corss-end
center              | item-cross-middle <=======> cross-middle
baseline            | item-baseline <==========> item-firstline-lowest-baseline
stretch（✔）       | item-height:cross-start <====>cross-end

![](http://www.runoob.com/wp-content/uploads/2015/07/2b0c39c7e7a80d5a784c8c2ca63cde17.png)


### align-content
> align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

![](http://www.runoob.com/wp-content/uploads/2015/07/f10918ccb8a13247c9d47715a2bd2c33.png)

# 项目的属性
- order：`定义项目的排列顺序。数值越小，排列越靠前，默认为0`

- flex-grow：`定义项目的分配剩余空间的比重，默认为0，即使有剩余也不分配`

- flex-shrink：`定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小`
- flex-basis：`定义了在分配多余空间之前，项目占据的主轴空间（main size）`

- flex：`是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto`

- align-self：`允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch`


### order
> 定义了项目在主轴方向上面的显示顺序，数值越小越靠前，默认为0，当都相等的时候按照文本流出现的顺序排列
![](http://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)


### flex-grow
> flex-grow属性定义项目的分配剩余空间的比重

```css
flex-grow: <positive-number> /*默认为0，不分配剩余空间*/
```

- 默认为0，即如果存在剩余空间，也分配。
- 若都为1，则将剩余空间（有的话）平分
- 若一个为2，其余为1，则2的分的剩余空间比其他大
![](http://www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)


### flex-shrink
> flex-shirnk定义了项目空间不足，对减少空间的分担比重

```css
flex-shrink: <positive-number>  /*默认为1，同比缩小*/
```
- 默认为1，即空间不够时，都同比缩小
- 若为0，该项目在空间减少时，不缩小
![](http://www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)


### flex-basis
> 定义项目占据主轴的长度，从而可以统计出剩余的空间

```css
flex-basis: <length> /*默认为auto，项目原本大小*/
```
- 默认值为auto，即原本项目的大小

### flex属性
> flex-grow，flex-shrink, flex-basis的集合，默认分别为0，1，auto

```
flex: none | [<grow> <shrink> <basis>]
```

### align-self属性
> 定义项目在交叉轴的位置，该元素可以忽略父容器的item-align

- 默认为auto，继承父元素align-items属性，若没有父元素则等同于strech
```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```
![](http://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)