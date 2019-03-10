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

### 使用隐藏的表单获取文件
若文件数据是在异步请求中获取得到,则无法通过window.open打开 url触发下载的窗口,只能通过插入一个隐藏的表单,通过提交表单来触发浏览器的下载窗口.方法如下

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


