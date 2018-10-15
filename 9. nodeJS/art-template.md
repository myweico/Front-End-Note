# art-template
[官网](http://aui.github.io/art-template/)
## 语法
### 标准语法
#### 输出
```js
{{ value }}
{{ data.key }}
{{ data['key'] }}
{{ a ? b : c }}
{{ a || b }}
{{ a + b }}
```
#### 源代码输出
```js
{{ @ value}}
```

#### 条件语句
```js
{{ if value }}
    ...
{{ /if }}
```

#### 循环语句
```html
{{ each target }}
    {{ $data }}
    {{ $value }}
    {{ $index }}
{{ /each }}

<!-- 自己设定变量 -->
{{ each target val key }}
    ...
{{ /each }}
```
#### 变量
```html
{{ set temp = data.sub.content }}
```

#### 模板继承
```html
<!-- 继承模板 -->
{{ extend './layout' }}

<!-- 替换子模板自有内容 -->
{{ block 'head' }}
    ...
{{ /block }}
{{}}
```

继承的父模版内容：
```html
<!-- layout.art -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{ block 'title' }}My Site{{ /block }}</title>
    {{ block 'style' }}
        <link rel="stylesheet" href="mian.css">
    {{ /block }}
</head>

<body>
    {{ block 'content' }}{{ /block }}
    {{ block 'script' }}{{ /script }}
</body>
</html>
```

继承子模板的内容：
```html
<!-- 继承模版 -->
{{ extent './layout.art' }}

<!-- 填充内容 -->
{{ block 'title' }}I am a child page{{ /block }}
{{ block 'content' }}<h1>This is my start</h1>{{ /block }}
```

#### 子模板
```html
{{ include './header.art' }}
{{ include './header.art' data }}
```

#### 变量
引入变量
```js
template.default.imports.log = console.log
```
模版中使用变量
```html
{{ $imports.log('hello world') }}
```
模版中可以使用的全局变量
- `$data`
- `$imports`
- `print`
- `include`
- `extend`
- `block`

### 原生语法

## API
### template(filename, content)
若content为对象，则读取文件，渲染模版，返回字符串，若使用浏览器版本，则filename就是html文件中的id
```js
var html = template('/welcome.art', {
    value: 'aui'
})
```

若content对字符串，则将字符串保存为filename的文件，并且返回一个模版函数用于渲染
```js
// 编译然后保存
template('welcome.art', 'hi, <%= vaule %>')

// 使用模版
template('welcome.art', {
    value: 'aui'
})
```
### template.compile(source, options)
将source字符串转换为一个函数，可以用于渲染模版
```js
var render = tempalte.compile('hi, <% value %>')
var html render({ value: 'aui' })
```

### template.render(source, data, options)
会将source字符串直接转换为模版函数并且立即使用data渲染
```js
var html = tempalte.render('hi, <%= value %>', { value: 'aui' })
```