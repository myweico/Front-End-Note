### normal
- 默认情况就是normal
- 遇到换行符不换行而是当成空白符
- 多个空白符合成一个空白符
- 对多个单词会适应宽度进行换行

### pre
- 遇到换行符换行
- 保留空白符
- 不会适应宽度换行
- 像pre标签一样，采用空白字符

### pre-wrap
- 遇到换行符换行
- 保留空白符
- 适应宽度换行

### pre-line
- 遇到换行符会换行
- 多个空白符合并为一个空白符
- 适应宽度换行

### nowrap
- 遇到换行符不换行，将其当为空白符
- 多个空白符合并为一个空白符
- 不会适应宽度换行
- 常与overflow配合使用

white属性   | 源码空格  | 源码换行  | 适应换行  | br换行
---         | ---       | ---       | ---       | ---
normal      | 合并      | 空格      | 适应      | 换
nowrap      | 合并      | 空格      | 不将就    | 换     
pre         | 保留      | 换行      | 不将就    | 换
pre-wrap    | 保留      | 换行      | 适应      | 换
pre-line    | 合并      | 换行      | 适应      | 换

### 隐藏过多的文字
#### 隐藏一行
```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

#### 隐藏多行
```css
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

