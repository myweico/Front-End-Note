# Vue介绍
* 14年诞生
* 作者尤雨溪
* 核心概念：        组件化 （基于ES5中的defineProperty，兼容性，IE9才兼容）
* angular核心：     模块库 双向数据绑定（基于数组，脏检测）
    + 开发一个登陆的模块，登陆需要显示的头部、底部、中部
    + 组件：组合起来的一个部件（头部、底部、中部）
    + __细分代码__
        - 头部：页面、样式、动态效果
        - 代码：template stype script

### 为什么要学习流行框架
- 提高企业开发效率
- 原生JS => Jquery(解决兼容) => 前端模版引擎（解决渲染） => angular或者vue（解决不必要的渲染，双向数据流），框架让程序员只关注数据的业务逻辑，不必操作DOM
- 增加个人就业竞争力，人无我有，人有我优

### 框架和库的区别
- 框架：
    - 一整套完整的解决方案
    - 对项目的侵入性大，更换框架需要重新架构

- 库（插件）
    - 提供一个小功能
    - 对项目侵入性较小，某个库无法完成需求，可以很容易切换
    - 例如jq=>zepto

### MVC和MVVM之间的区别
- MVC是后端分层开发的概念
    - M，Model层，处理数据
    - V，视图层，前端页面
    - C，控制层，业务逻辑层
- MVVC
    - app.js项目一切的入口模块，一切的请求都要先进入这里进行处理，没有路由奋发功能需要调用router.js模块进行处理
    - router.js路由奋发处理模块，只负责奋发路由，不负责具体业务逻辑处理，若涉及业务逻辑处理，只能调用controller模块进行业务逻辑处理
    - controller，业务逻辑层，封装了一些具体的业务逻辑处理代码，不负责处理数据的CRUD，需要调用Model层
    - Vue视图层：每当用户操作了页面，如果需要进行业务处理，都会 通过网络请求，去请求后端的服务器，此时我们这个请求都会被后端的App.js监听到
        - MVVM是前端视图层的分层开发思想，主要将每个压面分成M、V和VM，其中VM就是MVVM的思想核心，，是MV之间的调度者
        - M保存的是每一个页面中单独的数据
        - V是每个页面的HTML结构
        - VM是调度者，分割了M和V，每当V层想要获取后保存的数据的时候，都要右VM做中间的处理

### 数据流
- 双向数据流
    - js内存属性发生改变，影响页面的变化
    - 页面的改变影响js内存属性的改变

# 语法
### 基本结构
```js
var vm = new Vue({
    el: '#app',     // 表示Vue实例，要控制某个区域
    data: {
        msg: '第一次使用VUe'    // 通过Vue提供的指令很方便
    }
});

// 新建的vm实例就是m和v之间的调度者vm
```
### 常用指令
##### v-cloak
v-cloak   将v-cloak的元素隐藏，解决闪烁问题

##### v-text
- v-text    是元素的innerText，只能在双标签中使用，没有内容的话没有闪烁问题，完全替换标签内的内容

##### v-html
- v-html    是元素的innerHTML，不能包含{{xxxx}}

##### v-bind
- 简写：`:`
- 会将内容当成代码解析

##### v-if
- v-if      根据后面的元素是否渲染

##### v-show
- v-show    根据后面的布尔值决定是否显示

##### v-model
- v-model   双向数据流，页面影响js内存的数据，内存的数据也影响着页面的数据
- v-bind    单向数据流，js内存中的数据影响页面的数据

##### v-on
简写：@
- 绑定事件，后面无法直接使用原生的函数，例如alert
- .self只会阻止自己事件冒泡的触发


# 案例：搜索框
- 数组的新方法：forEach、fliter、some、findIndex
- es6中，为字符串添加新的方法string.prototype.include()，若字符串包含参数的字符串，返回true

### 遍历寻找一定条件下的数组下标
##### findIndex
- 当然返回true时，返回当前索引
```js
var index =  this.message.findIndex((item) => {
if (item.id = id) {
return true;
}
});
console.log(index);
```
##### some或者every
- 找到元素后需要立即处理
- return true或者false可以提前结束遍历

##### foreach
- foreach虽然也可以找到，但是会遍历所有的元素，效率低

### 查看一条字符串中是否含有某一段字符
##### string.prototype.indexOf
##### string.prototype.includes

### 过滤器
- 被用作常见文本的格式化
- 只能作用于占位符以及v-bind

##### 
- 调用格式：{{ name | nameope }}
- Vue.fliter('过滤器的名称', function(name){})
- 私有过滤器使用`filter: {name: function() {}};
- 过滤器的第一个参数都是管道符前面的参数
- 过滤器可以串联
 
##### es6添加的填充新方法padStart(maxLength, padChar)

### 自定义指令
- 自定义指令的定义时，指令名区分大小写保存，引用的时候，驼峰 => 横杠，或者全部变小写
- 自定义指令有几个阶段：
    - bind
    - inserted
    - update
    - componentUpdate
    - unbind
- 若定义指令的时候直接写函数，则默认为绑定到bind以及update钩子函数上

##### 让某个表单元素聚焦
- 若要某个表单元素聚焦可以选中该元素，然后调用原生的focus()方法
- 使用Vue.directive('focus',{})添加自定义指令
- [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)
```js
Vue.directive('focus', {
    // 每个函数中第一个参数都是el元素，表示绑定元素的本身，这个el元素时候原生的DOM对象
    //  调用的时候需要加上v-
    bind: function () {
        // 当指令绑定到元素上的时候，会立即实行这个函数，只执行一次
        // 触发1次
        // 样式相关可以在这设置
    }，
    
    inserted: function () {
        // 当元素插入到DOM中的时候，会执行inserted函数
        // 触发一次
        // 行为最好在这里设置，防止不生效
    }，
    
    updated: function () {
        // 当Vnode更新的时候，会执行updated，可能会触发多次
    }
    
})
```

### Vue实例的生命周期
##### 生命周期钩子：就是生命周期的事件函数
- new Vue()：表示开始创建一个Vue的实例对象
- Init Events & Lifecycle，刚初始化一个Vue实例对象，只有一些一些生命周期函数和生命周期钩子
    - 然后触发beforeCreate事件
- Init Injection & reactivity
    - created，初始化Vue的数据以及方法等完成
- beforeMount：然后开始编辑模板，执行vue中的指令，在内存中编译好最终的模板，但是还没有挂载到页面中（页面中的元素还没有完全被替换过来）
- mounted：然后将内存中编译好的模版挂载到页面中去，然后就会触发mounted事件，mounted为实例创建期间的最后一个生命周期函数，
    - 如果要通过某些插件操作节点，最早从mounted执行
- 组件运行周期函数有两个：
    - 若数据改变时候，在更新前触发beforeUpdate
    - 更新时，会在内存中更新好虚拟的DOM树，然后在将虚拟的DOM树更新到页面中
    - 更新后则触发updated函数
- beforedestroyed
- afterdestroyed

# Vue实现get，post，jsonp请求
### vue-resource
- 使用vue-resource或者axios
- vue-resource依赖vue，引用在vue后面
- [官方说明](https://github.com/pagekit/vue-resource)
- 使用get后，使用then处理请求（这里使用了promise）
- 通过result.body获取数据，（data也可以）
```js
vm.$http.get();
vm.$http.post();
vm.$http.jsonp();
```
- 手动发起的post请求默认没有表单个格式，需要设置数据格式为application/x-www-form-urlencoded（emulateJSON:true）
- 可以全局设置数据请求的根路径，然后使用相对路径就会自行进行拼接，注意使用全局根路径的时候，注意请求路径不能使用`/`
- 可以全局配置http设置


# 动画
- 动画的本质：让用户有更好的体验

### 自定义过度
- 自定义过度类名

### 第三方的动画：
    - `enter-active-class="bounceIn"`
    - `leave-active-class="bounceout"`
- 分别设置动画时长
    - `:duration="{ enter: 200, leave: 400}"`

### 半场动画
使用动画的钩子函数
- before-enter()：动画入场之前，此时动画尚未开始，在这里设置开始动画之前的起始样式
- enter()：表示动画开始之后，这里可以设置小球完成动画之后的结束状态
- after-enter()：动画完成之后的状态，这里可以设置小球完成动画之后的状态
- enter-cancel()

- enter的时候使用`el.offsetWidth`强制刷新
- enter传入done参数则after-enter不会自动执行，若不传入done则after-enter会自动执行并且有延迟
- 没有动画的时候顺序（全部console.log或者alert）居然为beforeEnter => afterEnter => enter

- 注意切换的时候为相同的标签，vue默认只会替换标签内的内容，不会删除节点再添加，因此不存在节点的过渡，因此不会触发transition
- 若要实现切换的效果，必须为每一个标签设置一个独特的key值，当两者不一的时候，vue就会删除节点重新替换，才实现过渡的效果

### transition-group组件添加列表的动画
- 列表元素的enter和leave的过渡会移动其他元素，可以为其他元素添加一个移动的效果
- 为transition-group添加v-move类的属性或者给里面的子元素使用transition也可以
- 注意需要适时使用`position:absolute`及时脱离文本流
- 使用appear可以指定初次渲染的动画
- transition-group会显式地出现在DOM中，默认渲染为span标签，可以使用tag属性改变渲染的标签

- 通过mode="out-in"以及mode="in-out"设置过渡模式

# 组件
### 组件的概念
##### 模块和组件的区别
- 模块化：是从代码逻辑（功能）的角度进行划分的；方便代码分层开发
- 组件化：是从UI界面（样式）的角度进行划分；前端的组件化，方便UI组件的重用
- 注意创建的时候使用驼峰命名，使用的时候需要使用横杠连接

### 组件的创建
##### 使用Vue.extend创建全局的Vue组件
```js
// 1.1 使用Vue.extend创建组件模版对象
var coml = Vue.extend({
    // 通过template创建显示出来的html结构
    template: '<h3>使用Vue.extend创建出来的组件</h3>' 
})

// 1.2 使用Vue.component('组件名称', 创建出来的组件模板对象)
// 注意创建的时候使用驼峰命名，使用的时候需要使用横杠连接的形式
Vue.conponent('myComl', coml)
```
- 可以将上面两者连在一起写
```js
Vue.conponent('myComl', Vue.extend({
    template: '<h3>使用Vue.extend创建出来的组件</h3>'
}))
```

##### 直接使用对象
- 将extend的模版对象直接换成对象
- 创建出来的组件的模版必须有且只有一个根元素
```js
Vue.component('mycoml', {
    template: '<h3>使用Vue.extend创建出来的组件</h3>';
})
```

##### template通过选择符指定外边的元素
- 现在html的页面中使用标签创建模版，可以有语法提示

```html
<template id="tmpl">
    <div>
        <h1>Hello！</h1>
        <h2>Hi</h2>
    </div>
</template>
```

- 然后创建组件的时候通过选择器指定模版

```js
Vue.component('mytemp', {
    template: '#tmpl'
})
```

##### 创建局部组件
```js
var vm = new Vue({
    el: "",
    data: {},
    methods: {},
    computed: {}
    watches: {},
    conponents: {
        mytemp: {
            template: '#tmpl'
        }
    },
    directives: {},
    
    beforeCreate () {},
    created() {},
    beforeMount () {},
    mounted () {},
    beforeUpdate () {},
    updated() {},
    beforeDestroy () {},
    destroyed () {}
})
```

### 组件的设置
##### data
- 组件中data属性应该是一个返回对象的函数
- 组件中data的使用方式跟普通的vue实例一致
```js
Vue.component('mycoml', {
    template: '<h1>这是全局组件</h1>',
    data: function () {
        return {
            msg: '这是组件中的data定义的数据'
        }
    }
})
```
- data为一个函数的原因：让不同的组件拥有不同的数据作用域

### 组件的切换
- 使用v-if和v-else切换
- 使用`v-bind:is="component"`切换

### 父组件给子组件传值
- 子组件中无法直接使用父组件的数组，自己使用私有的数据作用域
- 通过属性绑定的形式给子组件传值
- 组件中，只有props为数组，获取通过某个属性传过来的数值
- props中的数值都是只读的，子组件中无法改变props中的数值

### 父组件给子组件传递方法
- 父组件通过事件绑定的形式给子组件传递方法
- 然后子组件中使用`$emit(event)`来触发事件引用传递过来的值
```
<tmpl @func="parentMethod"></tmpl>
template = '<button @click="childMethod" >click</button>'

conponents: {
    methods: {
        childMethod () {
            this.$emit("func");
        }
    }
}
```

### 子组件给父元素传递数值
- 子组件通过参数调用父组件传递过来的方法可以给父组件传值

### 使用ref获取DOM元素以及组件
- 在元素添加ref特性，则vue自动会将该元素添加到vue实例中的$refs属性对象中，属性值为ref属性指获取
- 通过vm.$refs的方法可以获取组件的数值以及方法

```hmtl
<component ref="cmpn"></component>
```

```js
this.refs.cmpn              // 获取到该组件
this.refs.cmpn.value        // 获取组件的数值
this.refs.compn.method()    // 调用组件的方法
```


### 其他
##### 指令后面的属性值
- 指令后面的属性值都是表达式，会执行表达式然后给指令
    
# 路由
### 路由的概念
##### 后端路由
- 对于普通网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源（对应关系）

##### 前端路由
对于单页面应用来说，主要通过URL中的hash号实现不同页面之间的转换

hash有个特点就是HTTP请求不会包含hash的相关内容，使用hash只是在本页面跳转（跳转到本页面的锚点）

在单页面应用程序中，这种通过hash改变来切换页面的方式成为前端路由（区别于后端路由）

[参考文章：URL中的hash](https://www.cnblogs.com/joyho/articles/4430148.html)

### 安装
- cdn
- npm，模块化使用vue.use

### 使用
- 导入vue-router包之后，在window全局对象中，就有了一个路由的构造函数，叫做VueRouter
- 在新建一个路由对象的时候，为构造函数传递一个匹配对象
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>路由</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.min.js"></script>
	<script src="lib/vue/vue-router.js"></script>
</head>

<body>
	<div id="router-demo">
		<router-view></router-view>
	</div>
	
	<script>
		// 创建组件模版对象
		var login = {
			template: '<h1>登录组件</h1>'
		};

		var register = {
			template: '<h1>注册组件</h1>'
		};

		// 创建路由对象
		var routerObj = new VueRouter({
			routes: [
				{ path: '/login', component: login },
				{ path: '/register', component: register }
			]
		});

		// 创建Vue实例对象
		var vm = new Vue({
			el: "#router-demo",
			data: {

			},
			methods: {

			},
			components: {

			},
			router: routerObj
		});
	</script>
</body>
</html>
```
- 步骤：
    1. 引入文件
    2. 创建组件模版对象
    3. 新建路由规则对象, `new VueRouter({confObj})`,里面的routes表示规则，这是一个数组
    4. 创建vue
    5. 将路由器规则对象放入vue
    6. 使用路由显示容器（`<router-view></router-view>`）

### 路径切换
- 使用a标签，需要#
    - `<a href="#/login">登录</a>`
- 使用router-link标签，不需要#
    - `<router-link to="/login">登录<router-link>`
- router-link默认渲染为a标签，可以使用tag改变渲染的标签名;
- 加/为相对path路径
- 不加/则相对当前路径

### 更改根路径的显示内容
- 可以监听根目录并显示对应的组件（不推荐，路径上面没有正确反映当前内容）
    - `{ path: '/', component: login }`
- 可以重指向
    - `{ path: '/', redirect: '/login'}`

### 高亮当前链接
- 使用vue-router默认添加的类
    - 默认为`router-link-active`
- 使用vue-router配置对象更改当前路径添加的类名
    - `linkActiveClass: 'my-active'`

### 路由规则定义参数
##### 通过query传参
- 可在路径后面加入?传参
- 在切换的组件中可以获取得到路由的相关参数
    - this.$route
    - this.$route.fullPath
    - this.$route.path
    - this.$route.query

##### 通过params
- 设置监听的地址
    - `{ path:'/login/:id', component: login}`
- 通过路由规则解析，若匹配不上则不会跳转（没有参数也不会跳转）
    - `<a href="#/login/12">登录</a>`
- 通过`this.$route.params获取

### 注意
- 注意路由规则对象中使用routes数组配置路由规则

### 路由的嵌套
- 在路由设置里面嵌套一个children的数组，即可添加子路由
- 注意在children里面的路径不要写斜杠开头
- 注意在父路由的模板里面也要添加`<router-view></router-view>`的显示容器

### 路由命名视图
- router-view可以使用name命名，然后在路由器里面配置显示的组件
- 同一个路由里面要显示多个组件，需要将后面的component便为components对象


### 注意
- 路径上面写\表示从界面的path开始，若直接写名字则是直接从相对当前的地址
- 类名、ID名可以用横杠`-`作为连接符
- name属性也可以通过类名选择器选中


# 监听器
### 通过事件监听改变
### 通过watch监听改变
- watch会监听对应的数据，若数据发生变化则会重新调用watch中的函数

### 通过computed监听改变
- 计算属性调用的时候当成属性使用
- 计算属性中所依赖的值发生变化，计算属性会随着改变
- 若没有改变则直接返回上次结果，不会重新计算

### 三者的比较
- methods：表示具体的操作，主要书写业务逻辑
- watch是对象，其里面的键是监视的东西，值是对应的回调函数，里面是数据发生变化所执行的业务逻辑，可以看做是computed和methods的结合体
