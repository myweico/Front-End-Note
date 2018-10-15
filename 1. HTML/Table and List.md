## Bullet Points
- HTML表格用于建立表格数据结构，CSS表格用于显示布局
- HTML表格元素
    - \<table\>说明要建立一个表格
    - \<tr\>标记行结构
    - \<th\>用于标记表头
    - \<caption\>用于标记表格
- 即使没有内容也需要使用\<td\>标签占位以保持结构完整
- 若要在表格左边显示表头，调整\<th\>在每个\<tr\>标签对中的第一个即可
- 每个表格都有自己的内容区、内边距、边框，而外边距用每个单元格的间距来表示，`margin`用`border-space`来代替
- 可以使用`border-collapse`来消除表格间的边框间距
- 使用`colspan`以及`rowspan`来使单元格跨越多列或者多行
- 表格可以内嵌
- Can using `caption-sede` to change the positon of the caption

## HTML Table Tag
Tags    | Effect
---     | ---
&lt;table&gt;   | Define table
&lt;th&gt;      | Define the head of table 
&lt;tr&gt;      | Define a row of a table
&lt;td&gt;      | Define a item of a table
&lt;caption&gt; | Define a caption of a table 
&lt;thead&gt;   | Define a head of a table frame
&lt;tbody&gt;   | Define a body of a table frame
&lt;tfoot&gt;   | Define a foot of a tabme frame
## Using Table
Code：  
```HTML
<table>
    <tr>
        <th>city</th>
        <th>Date</th>
        <th>Temperature</th>
        <th>Altitue</th>
        <th>Population</th>
        <th>Diner Rating</th>
    </tr>
        <tr>
        <td>Walla Walla,Wa</td>
        <td>June15th</td>
        <td>75</th>
        <td>1,204</td>
        <td>29,686</td>
        <td>4/5</td>
    </tr>
    <tr>
        <td>Magic City,ID</td>
        <td>June 25th</td>
        <td>74</td>
        <td>5,312</td>
        <td>50</td>
        <td>3/5</td>
    </tr>
</table>
```
Display Effect:  
 <table>
    <tr>
        <th>city</th>
        <th>Date</th>
        <th>Temperature</th>
        <th>Altitue</th>
        <th>Population</th>
        <th>Diner Rating</th>
    </tr>
        <tr>
        <td>Walla Walla,Wa</td>
        <td>June 15th</td>
        <td>75</th>
        <td>1,204</td>
        <td>29,686</td>
        <td>4/5</td>
    </tr>
    <tr bgcolor="red">
        <td>Magic City,ID</td>
        <td>June 25th</td>
        <td>74</td>
        <td>5,312</td>
        <td>50</td>
        <td>3/5</td>
    </tr>
</table>

## Decorating Table
Attribution Value   | Effect
---                 | ---
border              | Set the weight of the border(0 is default)
bordercolor         | Set the color of border frame
bordercolorlight    | Set the color of light border 
bordercolordark     | Set the color of dark border
colspan             | Set the account of the span columns
rowspan             | Set the count of the span rows
cellpadding         | Set the padding of the cell
cellspacing         | Set the spaces between the border
align               | Set the align of the content

# HTML List 
## Tags
Tags    | Description
---     | ---
\<ol\>  | Define the order list
\<ul\>  | Define the unorder list
\<dl\>  | Define the difinite list
\<li\>  | Define the item of the order list or the unorder list 
\<dt\>  | Define the item of definite list
\<dd\>  | Define the description of a item of definite list
**others:**  
- Using `list-style-positon` to decide how to display the content when it return
    - inside, to display in the box of the list
    - outside,appear beside the box of the list
## Order Lists
Code:  
```HTML
<h4>编号列表：</h4>
<ol>
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>大写字母列表：</h4>
<ol type="A">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>小写字母列表：</h4>
<ol type="a">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>罗马数字列表：</h4>
<ol type="I">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>小写罗马数字列表：</h4>
<ol type="i">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

</body>
</html>
```
<h4>编号列表：</h4>
<ol>
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>大写字母列表：</h4>
<ol type="A">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>小写字母列表：</h4>
<ol type="a">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>罗马数字列表：</h4>
<ol type="I">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

<h4>小写罗马数字列表：</h4>
<ol type="i">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ol>  

## Unorder List
Code：  
```HTML
<p><b>注意：</b> 在 HTML 4中 ul 属性已废弃，HTML5 已不支持该属性，因此我们使用 CSS 代替来定义不同类型的无序列表如下：</p>

<h4>圆点列表：</h4>
<ul style="list-style-type:disc">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>  

<h4>圆圈列表：</h4>
<ul style="list-style-type:circle">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>  

<h4>正方形列表：</h4>
<ul style="list-style-type:square">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>
```
<p><b>注意：</b> 在 HTML 4中 ul 属性已废弃，HTML5 已不支持该属性，因此我们使用 CSS 代替来定义不同类型的无序列表如下：</p>

<h4>圆点列表：</h4>
<ul style="list-style-type:disc">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>  

<h4>圆圈列表：</h4>
<ul style="list-style-type:circle">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>  

<h4>正方形列表：</h4>
<ul style="list-style-type:square">
 <li>Apples</li>
 <li>Bananas</li>
 <li>Lemons</li>
 <li>Oranges</li>
</ul>

## Definite List
Code:  
```HTML
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
