### Vue中的render方法
render渲染的是el对应的位置
```html
<script>
    var login = {
        template: '<h1>这是登录组件</h1>'
    }
    
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {},
        render: function(createElement) {
            // 注意createElement会将模版对象转换成为html结构
            retrun createElements(login);
        }
    });
</script>
```

与原始页面的区别
- 原始方式会在原来占位符的地方替换
- 使用render会替换el中的全部内容

### 导入vue以及网页vue的区别
- 使用`import vue form  'Vue'`的vue为阉割版的vue
- runtime-only版的vue并不能通过实例的方式显示数据，下面的内容将无法生效

html：
```html
<p id="demo">{{ ok }}</p>
```
js：
```js
// main.js
import vue form 'vue'

var vm = new Vue({
    el: 'demo',
    data: {
        ok: 'demo'
    }
})
```
- runtime-only版的vue无法在网页中使用component的标签
- 无法使用模版对象的方式创建组件
- r-o版只能通过render的方式渲染到html

##### 包的查找规则（以vue为例）
1. 查找当前文件目录下的node_modules中vue文件夹
2. 查找vue文件夹中的package.json文件
3. 寻找main属性指定的入口文件
4. 若指定入口文件，则按照路径打开入口文件
5. 若没有指定入口文件，则尝试打开vue文件夹中的index.js
6. 若上面都不存在，尝试到上一层目录中查找node_modules文件
7. 重复上述的1-6步骤，若查询到根目录都没有查找到入口文件则提示无法查到模块

<del>
1. 找项目根目录中查找有没有node_modules的文件夹
2. 在node_modules中根据包名寻找 对应的vue文件夹
3. 在vue文件夹中，找一个叫做package.json的包配置文件
4. 在package.json文件中，查找一个main属性（main属性指定了这个包在加载时的入口文件）
5. 默认指定的是vue.runtime.common.js入口文件
</del>

##### 更换为完整版的方法
- 直接更改package.json中的main属性
- 直接导入完整路径的vue.js
- 更改webpack.json中resolve分支
```js
 resolve: {
     alias: {
         // 修改带入vue被导入时候包的路径
         "vue$": "vue/dist/vue.js"
     }
 }
```

##### 在runtime-only组件使用
- 在webpack中推荐使用.vue组件模版文件定义组件
- runtime-only无法使用component方式创建组件并且直接通过标签的方式渲染
- 定义一个login.vue文件创建一个纯粹的组件
```vue
<template>
    <div>
        <h1></h1>
    </div>
</template>


<script>

</script>

<style>

</style>
```
- 导入vue文件需要安装loader
    - `cnpm i vue-loader vue-template-compiler -D`
- 添加相关的module的检查rules
    `{ test: /\.vue$/, use: 'vue-loader'}`
- 在vue-loader15.*版本以后，vue-loader都需要依赖VueLoaderPlugin,引入插件：
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    devtool: "sourcemap",
    entry: './js/entry.js', // 入口文件
    output: {
        filename: 'bundle.js' // 打包出来的wenjian
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module : {
    ...
}
}
```
- 使用require指令可以引入某个class
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
```

### export 和 export default
- 在es6中定义了如何导入和导出模块

##### 导入模块
- `import 'moduleName' from 'moduleCol'`
- `import 'path'`

##### 导出模块
- 在es6中使用export default 和 export向外暴露成员
** export default**
- export default 只能暴露一次成员
- 可以使用任意的变量获取暴露的成员
- export和export default可以同时向外暴露成员，但是两者接受成员的方式不一样
    - export default 可以直接使用变量名称
    - export 必须使用花括号，花括号里面可以根据需求填写需要的成员
```js
// 暴露成员
export default {
    name: 'zs',
    age: 18
}

// 获取成员
// 使用friend获取这个文件暴露的成员
import friend from './test.html'
```

**export** 
- 使用export暴露的成员只能使用花括号接受，这种方式叫做按需接受
- 使用export可以向外暴露多个成员
- 并且接受的名字必须一致（或者使用`original as othername`）
```js
// 文件地址为./test.js
// 暴露成员
var object1 = "小星星";
var object2 = "小月亮";
export object1;
export object2;

export var object3 = "大太阳";

// 接受成员
import {object1, object2 as mylove} form './test.js'
```

### 安装路由
##### 安装路由
- 安装路由
    - `cnpm i vue-router -S`
- 使用路由
```js
// 导入vue-router包
import VueRouter from 'vue-router'

// 手动安装VueRouter
Vue.use(VueRouter)
 
// 创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/account', component: account }
        { path: '/goodlist', component: goodlist }
    ]
})
```

### 组件中的样式
- 组件中的样式都是全局的,若想里面的样式只针对组件内的样式，使用scope属性
    - `<script scoped></script>`
- 普通的style标签支持普通的样式，若想要使用less或者sass需要使用lang属性
    - `<script lang="scss></script>`
    - `<script lang="less></script>`

##### scope实现原理
- scope的实现使用过属性选择器实现的
    - 为模板设置一个属性
    - 然后为style里面的样式都添加一个属性选择器将范围限定在该容器内

# Mint UI
> mint是基于vue的组件库，使用vue封装好

[官网](http://mint-ui.github.io/#!/zh-cn)

### 安装
- 引入全局的mintui后，无需按需引入，因为Vue.use全局声明了所有的变量

### 组件
##### css component
##### js cpmponent

# MUI
[官网](http://dev.dcloud.net.cn/mui/)
> 代码片段，配套html片段和样式片段，体验上类似于于bootstrap
mui和bootstrap适用于任何项目，mint-ui只适用于vue项目

### 安装
- mui不支持npm安装，需要从github上面下载然后解压导入

# 项目实例
### 项目管理
##### 源代码
##### 配置.gitignore
- node_modules
- .idea
- .vscode
- .git

##### readme
##### 开源协议
- 注意开源协议的区别

### github的使用
- git init
- git add
- git commit -m "init my project"
- github外国，服务器较慢
- 码云，国内，速度较快

### app页面
##### 主要结构
顶部栏

中间区域放置路由

底部tabbar（首页、会员、购物车、搜索）

##### 主要功能
点击tabbar上面的按钮切换中间的路由显示区

### 主页页面
##### 轮播图
##### 九宫格
点击九宫格里面的选项就切换到home的子路由，并且组件显示到app页面中的路由显示区

##### 新闻资讯列表
监听主页/新闻列表路由，切换到新闻列表的组件

创建新闻列表的组件

先写几个列表作为模版调整样式

发送ajax请求获取数据

异步处理请求，将数据加载到组件的数据里面

将新闻列表改造为动态渲染

##### 新闻资讯
将上面的a标签换为router-link并且动态渲染跳到的id

监听主页/新闻资讯列表/新闻资讯，跳到新闻资讯组件

在新闻资讯构造好大概的页面，先调整样式

根据发送过来的id发送请求获取对应的数据，请求最好使用呢全局的请求根目录

动态渲染页面

构造全局的时间过滤器格式化时间

若图片过大，可能是scoped的问题

##### 评论组件
评论组件存在于多个内容当中，故使用全局的组件

在组件中的export default中可以使用compnents注册子组件

同样先写好结构和调整样式

异步请求获取评论的数据，注意加载更多的时候应该到数组而不是覆盖数组

##### 两端对齐
```
display: flex;
justify-content: space-between;
```

##### 发表评论
1. 将输入框和数据绑定

2. 发表按钮绑定发表事件

3. 校验内容是否为空，然后使用toast提示用户

4. 将内容、用户、邮箱、发送事件发送到客户端保存起来

5. 同时将内容追加到显示的数组当中


### 图片页面
1. 监听图片页面的路由，转到图片页面
2. 新建一个图片页面的组件
3. 绘制图片页面的结构并且调整样式

##### 顶部滑动条
- 使用mintui或者mui中的插件
- 适当选择组件的样式（观察）
- 若想要效果，可能需要添加js初始化
- mui中的代码可能与webpack中严格模式冲突，mui中使用了caller，callee等方法，这在webpack中默认启动了严格模式，这两个冲突了
    - 可以取消webpack中的严格模式
    - 也可以修改mui中的代码（不现实）
- 取消严格模式，使用插件`barbel-plugin-transform-remove-strict-mode`
- 若滑动的时候出现警告可以设置样式
```css
* {
    // chrome为提高页面流畅性而折腾出来的东西
    // 指定区域是否允许用户操作
    touch-action: pan-y;
}
```
- 注意初始化的时机，否则造成无法滑动（还没渲染好就初始化造成无效果）
- 可以滑动但是无法操作tabbar的问题是因为tab-bar按钮的的类名冲突了，需要重新更改名字

- 获取数据然后动态渲染

##### 图片列表
- 图片列表需要懒加载技术，我们可以使用mintUI提供的现成组件 `lazy-load`
- 根据lazy-load的文档，尝试使用
- 动态渲染

##### 实现了 点击图片跳转到图片详情页面
1. 在将li改为router-link的时候可能会改掉样式（默认渲染不为li），可以使用tag属性设置
2. 监听路由，跳转到对应的组件，并设置传入的参数
3. 获取参数保存到数据中，简化使用
4. 根据参数获取对应的数据
5. 根据数据动态渲染并调整样式
6. 缩略图使用vue-preview插件

### 商品购买页表
##### 商品左右靠边
```css
display: flex;
justyfy-content: space-between;
```

##### 让下面的价格栏靠底栏
```css
flex-direction: column;
justify-content: space-between;
```
### 跳转的两种方式
##### a标签中的hash
##### 编程式导航（JS原生中window.location.href）
- 使用vue-router中的编程式导航
- vue的实例中含有的$route为参数对象，含有的$ruter为路由导航对象，用它可以方便地使用JS代码，实现路由的前进、后退和跳转到新的URL地址
```
// 字符串
router.push("/home/goodinfo/" + id)

// 对象
$router.push({ path: "/home/goodinfo/")

// 命名的路由，填写的是路由配置对象里面的name属性值
$router.push({ name: 'goodinfo', params: {userId: 123}});

// 监听对象里面的name
{ path: 'home/goodinfo', conponent: goodinfo, name: "goodinfo"}

// 带查询参数，变成 /register?plan=private
router.push({path: 'register', query: {plan: 'private'}})
```

##### margin塌陷
- magin塌陷可以使用overflow:hidden取消

##### 完美解决小球移动的距离
- 因为小球是写死的，所以会出现问题
- 要解决问题需要根据实际的位置调整移动的位置
##### getBoundingClientRect()获取元素的位置
- 该方法返回一个矩形对象，包含四个属性:left、top、right、bottom，表示元素在页面的距离

# Promise
### 获取文件的封装
```js
const fs = require('fs');
const path = require('path');

function getFileByPath (fpath, succCall, errCall) {
	fs.readFile(fpath, 'utf-8', (err, data) => {
		if (err) return errCall(err);
		succCall(data);
	});
}

getFileByPath(path.join(__dirname, './test.txt'), function (data) {
	console.log('成功获取文件！获取到的数据为：'+data);
}, function (err) {
	console.log('获取文件失败!失败消息：' + err.message);
});
```

### 回调地狱
- 当要按照顺序获取多个文件的时候，就需要多次嵌套打开文件的函数
- 当嵌套很深的时候，就叫做回调地狱

<div style="text-align:center">
    <img src="https://blog-1257268092.cos.ap-guangzhou.myqcloud.com/Markdown/%E5%9B%9E%E8%B0%83%E5%9C%B0%E7%8B%B1.png" width="480">
</div>

### 解决回调地狱
##### promise
- Promise是一个构造函数，Promise的属性
- resolve：成功之后的回调函数
- reject：失败之后的回调函数
- then：在promise构造函数的prototype属性上的方法，也就是promise构造函数创建的实例都继承了then方法
- Promise实例表示一个异步操作，每当我们new一个实例，这个实例就表示一个具体的异步操作，只有成功和失败两种状态
- 异步操作无法使用return把操作的结果返回调用者

传入一个包含异步操作的函数,当Promise已创建实例就会立即执行里面的异步操作并且获取的到一个异步操作的对象
```
var fs = require('fs');

var promose = new Promise (function () {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err) throw err;
        console.log(dataStr);
    })    
});
```

若不想函数立即执行，可以使用一个函数将创建promise实例的过程包裹起来，
```
function getFileByPath(fpath) {
    var promose = new Promise (function (resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
            if (err) reject(err);
            resolve(dataStr);
        })
    });
}

var p = getFileByPath('./test.txt');
p.then(function (data) {
    console.log("获取成功")
}, function (err) {console.log(获取失败});
```

promise实例的回调函数通过then方法传入
```
promise.then(resolve,err);
```

### 使用promise解决回调地狱
```
getFileByPath('./1.txt')
    .then(function (data) {
        console.log(data);
        
        return getFileByPath('./2.txt');
    })
    .then(function (data) {
        console.log(data);
        return getFileByPath('./3.txt');
    })
    .then(function () {
        console.log(data);
    });
```
注意若前面promise执行失败，若不想影响后面的代码执行，在错误的回调里面返回对应的异步对象即可
```
getFileByPath('./1.txt')
    .then(function (data) {
        console.log(data);
        return getFileByPath('./2.txt');
    }, function (err) {
        console.log('错误信息：'+err.message);
        return getFileByPath('./2.txt');
    ))
    .then(function (data) {
        console.log(data);
        return getFileByPath('./3.txt');
    })
    .then(function () {
        console.log(data);
    });
```
若出错不想执行后续代码，可以在后面添加一个catch的方法，若前面出现任意错误都会立即执行catch中的代码
```
    .then(function (data) {
        console.log(data);
        
        return getFileByPath('./2.txt');
    })
    .then(function (data) {
        console.log(data);
        return getFileByPath('./3.txt');
    })
    .then(function () {
        console.log(data);
    })
    .catch(function () {
        console.log('发生错误');
    });
```

### jquery也支持then操作


# Vuex
> Vuex是Vue配套的公共数据管理工具，它可以把一些共享的数据保存到Vuex中，方便整个程序中的任何组件直接获取或修改我们的公共数据。（相当于公共的数据作用域）

### 安装
```
npm i vuex -S
```

### 使用
```
// 导入包
import Vuex from 'vuex'

// 注册Vuex到vue中
vue.use(vuex);

var store = new Vuex.Store({
    state: { // 此处的state相当于Vue实例中的数据
        count: 0;
    },
    mutation: {}
})

// 挂载到vm实例中
var vm = new Vue({
    el: 'demo',
    data: {},
    store
});

// 如果要在组件中使用store中的数据，通过this.$store.state.***即可访问数据
```

### state属性
- 如果要在组件中使用store中的数据，通过this.$store.state.***即可访问数据

### mutation属性
- 不推荐在组件中直接使用函数改变store中的数据，因为造成数据错误的时候无法迅速定位到是谁造成问题
- 要操作store中的数据，使用vuex提供的方法改变数据，这样可以记录操作的对象
mutation中方法的格式：
```
var store = new Vuex.Store({
    state: {
        count: 0;
    },
    mutation: {
        add(state) {
            // mutation中，第一个参数已经固定死了，为state
            state.count++;
        }
    }
});
```
- 子组件中要使用vuex中的mutation则需要使用
```
this.$store.commit('方法名')

// 能且只能传入第二个参数
this.$store.commit('方法名', '参数')
```
- 注意mutaion中的方法只能识别两个参数，第一个参数为store中中state，第二个为传入的参数，若想传入多个

### getter属性
- store中的getter属性只允许获取不允许修改，想要修改必须要经过mutaion
```
var store = new Vuex.Store({
    state: {
        count: 0
    },
    mutation: {
        add (state) {
            state.count++;
        }
    },
    getters: {
        optCount: function (state) {
            return state.cocunt;
        }
    }
});
```
- getter会将数据处理返回给调用者，并且一旦state中的数据变化，getter中相关的数据也会 随着改变，相当于computed方法
- 使用方法
    - `this.$store.getters.xxx`

# 将项目托管到apache
- 将打包好的bundle.js和index.html拷贝到根目录即可
- 原本的bundle.js可以使用apache的gzip压缩技术减少体积！！！

### 开启apache的gzip服务器压缩技术
1. 在apache的httpd.conf配置文件中开启deflate\_Module和headers\_Module
2. 在httpd.conf文件的最后需要加入一下的内容
```
<IfModule deflate_module>
    SetOutputFilter DEFLATE
    DeflateCompressionLevel 9
</IfModule>
```
- 最少要加上以上的内容，可以让gzip功能生效，由于没有嘉善其他额外的配置，都采用apache的默认配置，DeflateCompressionLevel表示压缩级别， ，值越大表示压缩越厉害

# 使用ngrok将本机映射为外网的Web服务器
