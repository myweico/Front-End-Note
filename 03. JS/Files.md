# 文件相关内容

## 下载文件

### 新窗口打开文件

在窗口打开文件的链接,即可调用浏览器的下载 API,调出下载窗口．这通常是最常用的一种方式．

- a 标签链接到文件 url

```html
<a href="/file/plan.txt" title="下周的工作安排">工作安排</a>
```

- 使用 js 打开文件的链接

```js
window.open('/file/plan.txt')
```

### 通过a标签的download属性
设置了a标签的download属性,download属性指定了下载时候的名字. 在点击a标签的时候就会触发浏览器的下载
```html
<a href="download.txt" donwload="download.txt">下载文件</a>
```
在异步获取到文件的url后,无法通过打开新窗口下载的话,那么可以插入一个带有download属性的a标签,然后模拟点击
```js
fetch('/file').then(res => {
  // res.data表示url的时候
  let a = document.createElement('a')
  let url = res.data
  let filename = 'file.txt'
  a.url = url
  a.download = filename
  a.click()

  // 若返回的是二进制文件数据,可以考虑构造blob对象后,URL.createObjectURL来创建一个url,然后通过模拟a标签点击来下载
})
```

### 使用隐藏的表单获取文件
若文件数据是在异步请求中获取得到,则难以在获取到异步响应响应的时候触发浏览器的下载窗口. 只能通过插入一个隐藏的表单,通过提交表单来触发浏览器的下载窗口.方法如下

```js
function downloadFile (opt = {}) {
  // 没有url提示错误
  if (!opt.url) return console.error('Can't download file without url)

  let url = option.url
  let method = option.method || 'post'
  let params  = option.params
  let form = document.createElement('form')

  form.setAttribute('style', 'display: none')
  form.setAttribute('method', option.methods || 'post')
  form.setAttribute('target', '_blank')
  form.setAttribute('action', url)

  // set params
  for (var name in params) {
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('value', params[name])
    input.setAttribute('name', name)
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  form.remove()
}
```
调用API只需要传入对应的参数,当响应返回时,将会在新的页面打开响应,当检测到响应式一个文件的时候就会触发浏览器的下载窗口.调用的例子如下:
```js
/**
 * params 为传给后端的参数
 * 后端会传文件的数据过来
 */
downloadFile({
  url: '/api/company_data/index_associate',
  method: 'post',
  params: {
    type: 1,
    select: this.select,
    from: this.from,
    where: this.where
  }
})
```

### Blob对象
response对象含有blob()方法,其会返回一个返回blob对象的Promise,然后使用URL.createObjectURL将其转化成一个url,便可以通过模拟click点击触发下载
```js
fetch('http://somehost/somefile.zip').then(res => res.blob().then(blob => {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    var filename = 'myfile.zip';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}))
```

### 后台直接传二进制流
当没有可用的url时,后端可直接传送文件的二进制流,然后设置`Content-Disposition`设置内容的展现形式为`attachment`即可,`filename`表示文件的名字
```js
// 下面对nodeJS的形式展示
res.set({
  'Content-Type': 'application/octet-stream',
  'Content-Disposition': 'attachment; filename=filename.txt',
  'Content-Length': 1000
});
//file是服务器上的文件的具体路径
fs.createReadStream(file).pipe(res);
```

## 上传文件的方式
文件上传都是构造一个formData对象,然后包含文件对象上传,要么使用html的表单自动构建formData对象上传,要么使用js构造formData对象
上传
### html表单上传
```html
<form action="/test/" method="POST" enctype="multipart/form-data">
    <p>名称：<input type="text" name="user"></p>
    <p>文件：<input type="file" name="testfile"></p>
    <p><input type="submit" value="提交"></p>
</form>
```

### 构建formData
```js
let formData = new formData()
let file = document.getElementById('file_upload').files[0]
formData.set('file', file')
fetch('/upload', {
  body: formData,
  headers: {
    'content-type': 'form-data',
  },
  method: 'POST'
})

/* MDN */
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```