## 使用`<caption>`添加表格标题

## 添加<thead>、<tfoot>,和<tbody>结构
使用thead、tfoot以及tbody更容易结构化以及更容易样式化

## 表格嵌套
表格可以嵌套表格，通常不建议，因为标记看起来难以理解

## 对于视力受损用户的表格
### 使用scope
使用scope标记row, col, colgroup, rowgroup
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Items sold summary</title>
    <link href="minimal-table.css" rel="stylesheet" type="text/css">
</head>

<body>
    <h1>Items sold summary</h1>

    <table>
      <caption>Items Sold August 2016</caption>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <th colspan="3" scope="colgroup">Clothes</th>
            <th colspan="2" scope="colgroup">Accessories</th>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <th scope="col">Trousers</th>
            <th scope="col">Skirts</th>
            <th scope="col">Dresses</th>
            <th scope="col">Bracelets</th>
            <th scope="col">Rings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="3" scope="rowgroup">Belgium</th>
            <th scope="row">Antwerp</th>
            <td>56</td>
            <td>22</td>
            <td>43</td>
            <td>72</td>
            <td>23</td>
          </tr>
          <tr>
            <th scope="row">Gent</th>
            <td>46</td>
            <td>18</td>
            <td>50</td>
            <td>61</td>
            <td>15</td>
         </tr>
         <tr>
           <th scope="row">Brussels</th>
           <td>51</td>
           <td>27</td>
           <td>38</td>
           <td>69</td>
           <td>28</td>
         </tr>
         <tr>
           <th rowspan="2" scope="rowgroup">The Netherlands</th>
           <th scope="row">Amsterdam</th>
           <td>89</td>
           <td>34</td>
           <td>69</td>
           <td>85</td>
           <td>38</td>
         </tr>
         <tr>
           <th scope="row">Utrecht</th>
           <td>80</td>
           <td>12</td>
           <td>43</td>
           <td>36</td>
           <td>19</td>
         </tr>
       </tbody>
    </table>

</body>

</html>
```

### 使用id和header属性标记
colgroup, rowgroup, row, col都使用id标记，然后所有具体的数据都是用header属性标记，属性值是colgroup, rowgroup, row, col的组合
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Items sold summary</title>
    <link href="minimal-table.css" rel="stylesheet" type="text/css">
</head>

<body>
    <h1>Items sold summary</h1>

    <table>
      <caption>Items Sold August 2016</caption>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <th colspan="3" id="clothes">Clothes</th>
            <th colspan="2" id="accessories">Accessories</th>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <th id="trousers">Trousers</th>
            <th id="skirts">Skirts</th>
            <th id="dresses">Dresses</th>
            <th id="bracelets">Bracelets</th>
            <th id="rings">Rings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="3" id="belgium">Belgium</th>
            <th id="antwerp">Antwerp</th>
            <td headers="clothes trousers belgium antwerp">56</td>
            <td headers="clothes skirts belgium antwerp">22</td>
            <td headers="clothes dresses belgium antwerp">43</td>
            <td headers="accessories bracelets belgium antwerp">72</td>
            <td headers="accessories rings belgium antwerp">23</td>
          </tr>
          <tr>
            <th id="gent">Gent</th>
            <td headers="clothes trousers belgium gent">46</td>
            <td headers="clothes skirts belgium gent">18</td>
            <td headers="clothes dresses belgium gent">50</td>
            <td headers="accessories bracelets belgium gent">61</td>
            <td headers="accessories rings belgium gent">15</td>
         </tr>
         <tr>
           <th id="brussels">Brussels</th>
           <td headers="clothes trousers belgium brussels">51</td>
           <td headers="clothes skirts belgium brussels">27</td>
           <td headers="clothes dresses belgium brussels">38</td>
           <td headers="accessories bracelets belgium brussels">69</td>
           <td headers="accessories rings belgium brussels">28</td>
         </tr>
         <tr>
           <th rowspan="2" id="netherlands">The Netherlands</th>
           <th id="amsterdam">Amsterdam</th>
           <td headers="clothes trousers netherlands amsterdam">89</td>
           <td headers="clothes skirts netherlands amsterdam">34</td>
           <td headers="clothes dresses netherlands amsterdam">69</td>
           <td headers="accessories bracelets netherlands amsterdam">85</td>
           <td headers="accessories rings netherlands amsterdam">38</td>
         </tr>
         <tr>
           <th id="utrecht">Utrecht</th>
           <td headers="clothes trousers netherlands utrecht">80</td>
           <td headers="clothes skirts netherlands utrecht">12</td>
           <td headers="clothes dresses netherlands utrecht">43</td>
           <td headers="accessories bracelets netherlands utrecht">36</td>
           <td headers="accessories rings netherlands utrecht">19</td>
         </tr>
       </tbody>
    </table>

</body>

</html>
```