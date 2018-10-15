### 数据和方法
- vue实例创建的时候会将data中所有属性都加入到实例的属性中
- 只有在创建实例时候的数据才是响应式的，可以将属性添加到已经存在的响应式对象从而达到响应式
- 若data使用freeze()的对象，则响应式系统无法追踪变化
- Vue实例中使用前缀为$的特殊属性和方法
- vue创建的时候有着不同的生命周期阶段，不同阶段有自己的函数（生命周期钩子）

# 模版语法
### 插值
##### 文本 
- `{{text}}`
- `v-once`一次性插值

##### 原始html
-`v-html`
- `<span v-html="rawHtml"></span>`
- 直接将span内容替换为rawHtml

##### 特性
- `v-bind`
- `<div v-bind:id="dynamicId"></div>`
- `<button v-bind:disabled="isButtonDisabled"></button>`，若isButtonDisabled为假值，则按键不可用

##### 使用JavaScript表达式
数据绑定支持单个表达式
```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>

<!--下面的不支持-->
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

表达式会在所属Vue实例的数据作用域下解析

### 指令
- 指令Directives都是带有v-前缀的特殊特性
- 冒号`:`后为名称
- 句点`.`为修饰符
- 等号`=`后为特性名称，带引号，像属性名一样

##### 缩写
常用的指令有缩写
- `v-bind:` => `:`
```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```
- `v-on` => `@`
```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```
# 计算属性和监听器
### 计算属性
- 计算属性会根据依赖关系响应更新值
- 计算属性基于依赖来缓存， 变则更，静则直返
- 计算属性适合随着一些数据的变化而变化的数据

例子：
```html
<div class="example">
        <p>Original message: "{{message}}"</p>
        <p>Computed reversed message: "{{reversedMessage}}"</p>
        <p>Full Name: {{fullname}}</p>
    </div>
    <script src="vue/vue.js"></script>
    <script>
        var vm = new Vue({
            el: ".example",
            data: {
                message: "Hello, Vue!",
                firstname: "Mingye",
                lastname: "Wei"
            },
            computed: {
                reversedMessage: function () {
                    return this.message.split("").reverse().join("");
                },
                fullname: {
                    get: function () {
                        return this.firstname + " " + this.lastname;
                    },
                    set: function(value) {
                        var names = value.split(" ");
                        this.firstname = names[0];
                        this.lastname = names[names.length - 1];
                    }
                }
            }
        })
    </script>
```

### 侦听器
- 使用watch特性添加自定义的侦听器
- watch比computed更为通用，可以定义更丰富的功能

# Class and Style Binding
### Class
#### 对象语法
- class可以与原来的class共存
- class可以是一个内联的对象
```html
// html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>

// vue
data: {
  isActive: true,
  hasError: false
}
```

- class可以直接写一个对象数据
```
// html
<div v-bind:class="classObject"></div>

// vue
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
```
}

##### 数组语法
- class可以是一个数组
```html
<div v-bind:class="[activeClass, errorClass]"></div>

// vue
data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}
```

- 若要判断是否显示，可以使用三元运算符
```html
<div v-bind:class="[isActive ? activeClass : "", errorClass]"
```

- 可以与对象语法混用
```html
<div v-bind:class="[{active:isActive}, errorClass]"></div>
```

##### 与组件使用
- 与组件一起使用会和组件的class 一起
```html
// component
Vue.component("my-conponent", {
    template: "<p class='foo bar'>Hi</p>"
})

// html
<my-component class="baz boo"></my-conponent>

// render
<p class="foo bar baz boo">Hi</p>
```

- 可以与v-bind一起使用
```html
<my-component v-bind:class="{active: isActive}"></my-component>
```

# Binding Inline Styles
### 对象语法
##### 对象直接量，对象属性名为样式名，对象属性值为样式属性值
```html
    <div class="example">
        <div v-bind:style="{width:widthValue, height:heightValue, backgroundColor:color}"></div>
    </div>
    <script>
       var vm = new Vue({
        el: ".example",
        data: {
            widthValue: '200px',
            heightValue: '200px',
            color: 'red'
        }
       });
```

##### class写对象名字
```html
<div class="example">
    <div v-bind:style="styleObj"></div>
</div>

<script>
var vm = new Vue({
    el: ".example",
    data: {
        styleObj: {
            width: '200px',
            height: '200px',
            backgroundColor: 'red'
        }
    }
});
</script>
```

### 数组语法
##### 数组中引用多个样式对象
```html
<div v-bind:class="[baseStyle, overridingStyles]"></div>
```

##### 自动加前缀
vue会自动为需要添加前缀的样式添加前缀

##### 多值
- 从2.3开始，可以添加一个多值的数组，会采用最后一个有效的属性
```html
<div :style="{display: ['-webkit-box', '-ms-flexbox', 'flex']}"></div>
```

# 条件渲染（conditional rendering）
### v-if && v-else v-else-if
##### 单个条件渲染
```html
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

##### 条件渲染多个请添加父容器
```html
<template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph</p>
    <p>Paragraph</p>
</template>
```

##### vue默认会服用已经渲染的元素
- 当渲染的元素一致时，vue不会重新渲染新的元素，而是利用已经存在的元素
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
上面的lable和input元素不会重新渲染，内容不变，只改变label和占位符


- 若不需要则添加key属性来标识唯一个的元素
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

### v-show
##### v-show会渲染到页面上，只是改变是否显示
有较高初始渲染消耗

# 列表渲染
### 遍历数组类型
##### v-for="item in array"
```html
<ul id="example">
    <li v-for="item in array">
        {{item.name}}
    </li>
</ul>
<script>
var vm = new Vue({
    el: "#example",
    data: {
        array: [
            {name:"li0"},
            {name:"li1"},
            {name:"li2"}
        ]
    }
});
</script>
```

##### v-for="(item, index) in array"

### 遍历对象
##### v-for="value in object"
##### v-for="(value, name) in object"
##### v-for="(value, name, index) in object"

# key
[key](https://vuejs.org/v2/guide/list.html#key)
- 没有指定key的时候，多选框只记住了索引，没有绑定是哪一组
- key值只能是字符串或者数字

<div style="text-align:center">
<img src="https://blog-1257268092.cos.ap-guangzhou.myqcloud.com/Markdown/vue-key.png" width=480>
</div>

### 遍历整数
从1开始遍历到integer
```html
<div>
    <span v-for="n in 10">{{n}}<span>
</div>

// => 12345678910
```

### 遍历模版
```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### v-for和v-if配合使用
- v-for比v-if优先级高，在同一个标签内使用为遍历中使用条件渲染
- 若想要条件渲染判断是否需要循环则可以添加一个父元素

### 配合组件使用
- [ToDoList](https://vuejs.org/v2/guide/list.html#v-for-with-a-Component)

### 数组变更命令
##### 变更方法
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

##### 非变更方法
- fliter
- concat
- slice
- 若想变更可直接赋值原来的元素

### 非响应式变更操作
1. 使用索引直接赋值 `vm.item[index] = newValue`
2. 改变数组长度 `vm.item.length = newLength`

##### 响应式操作1的方法
- Vue.set(vm.$set === Vue.set)
```html
Vue.set(vm.items, indexOfItem, newValue)
```

- Array.prototype.splice
```html
vm.item.splice(indexOfItem, 1, newValue)
```

##### 响应式操作2的方法
- Array.prototype.splice
```html
vm.items.splice(newLength)
```

### 对象变更
- Vue只能响应创建vue实例时的数据，对于新添加的数据无法实现实时响应
```html
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` is now reactive

vm.b = 2
// `vm.b` is NOT reactiv
```
- 可以添加数据到创建vue实例对象时候的数据对象中实现实时响应
- 对于单个数据，使用`Vue.set`或者`vm.$set`
```html
Vue.set(vm.userProfile, 'age', 27);
vm.$set(vm.userProfile, 'age', 27);
```

- 对于批量数据，可以使用`Object.assign()`,先将两个对象融合为一个然后替换原来的对象
```html
vm.uerProfile = Object.assign({}, vm.userProfile, {
    age: 27,
    favouriteColor: "Vue Green"
})
```

# 事件处理
### 监听事件
- 使用`v-on:event.setting="handler"`监听事件，简写`@event.setting="handler"`
- handler为代码直接量
```html
    <ul id="container">
        <button @click="n++">有胆就点我</button>
        <span>你居然点了我{{n}}次，真有胆！</span>
    </ul>
    <script>
       var vm = new Vue({
        el: "#container",
        data: {
            n: 0
        }
       });
    </script>
```

- handler为方法名称
```html
   <ul id="container">
       <button @click="add">有胆就点我</button>
       <span>你居然点了我{{n}}次，真有胆！</span>
   </ul>
   <script>
      var vm = new Vue({
       el: "#container",
       data: {
           n: 0
       },
       methods: {
           add: function () {
               this.n++;
           }
       }
      });
   </script>
```
- 使用JS行内表达式，`v-on:click="say('hi')"`
- 在事件绑定的行内表达中，$event表示事件传入的事件参数对象
- 若事件绑定表达式中使用方法名字，但是没有传实参，则其方法的第一个参数为事件参数对象

### 事件修饰符
- 使用句点`.`添加事件修饰符
- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `passive`
```html
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form v-on:submit.prevent></form>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div v-on:click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div v-on:click.self="doThat">...</div>
```

### 键值修正符
##### 常用的按键
- `.enter`
- `tab`
- `.esc`
- `left`
- `right`
- `up`
- `down`
- `space`
- `delete`(delete or backspace)

##### 系统修饰按键
当下面的事件按下的时候，鼠标或键盘或键盘事件才会触发
- `alt`
- `shift`
- `ctrl`
- `meta`

##### 鼠标修饰符
- `up`
- `right`
- `down`
- `left`

##### exact修饰符
```html
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

##### 自定义全局按键修饰符
```js
Vue.config.keyCodes.f2 = 113;
// 然后就可以使用f2 代替113的键盘码
```

##### 自动聚焦
# 表格输入绑定
- 使用`v-model`实现双向数据流，内存中的数据影响页面（input）,页面的数据（input）也会影响内存的数据（data）
- `v-model`会忽略初始的value、checked以及selected，应该使用data中绑定的数据初始化

### input
数据 <==> value
```html
<ul id="container">
    <input type="text" v-model="message" placeholder="请在这里输入">
    <span>{{message}}</span>
</ul>
<script>
   var vm = new Vue({
    el: "#container",
    data: {
        message: "我是输入框"
    }
   })
</script>
```

### textarea多行文本
```html
<div id="container">
    <p :style="styleObj">{{text}}</p>
    <textarea cols="30" rows="10" resize="no" v-model="text"></textarea>
</div>
<script>
    var vm = new Vue({
        el: "#container",
        data: {
            text: "I an text",
            styleObj: {
                whiteSpace: "normal",
                width: "200px"
            }
        }
    });
</script>
```

### checkbox复选按钮
##### single
- single checkbox返回的是一个布尔值
```html
<div id="container">
<input type="checkbox" value="henhao" v-model="checkValue"></input>
<span>{{checkValue}}</span>
</div>
<script>
var vm = new Vue({
    el: "#container",
    data: {
        checkValue: false;
    }
});
```

- multiple checkbox 则是将input中的value值插入到数据中（数据要初始化为数组，否则为布尔值）
```html
<div id="container">
    <input type="checkbox" value="xiaoming" v-model="checkValue"></input>
    <input type="checkbox" value="xiaohong" v-model="checkValue"></input>
    <input type="checkbox" value="xiaogang" v-model="checkValue"></input>
    <span>{{checkValue}}</span>
</div>

<script>
var vm = new Vue({
    el: "#container",
    data: {
        checkValue: ["xiaoming", "xiaohong"]
    }
});
```

### 单选按钮
- 单选按钮会将value值传到数据中
- 数据根据value值选择对应的单选按钮
```html
<div id="container">
    <input type="radio" value="爱好男" v-model="checkValue"></input>
    <input type="radio" value="爱好女" v-model="checkValue"></input>
    <span>{{checkValue}}</span>
</div>

<script>
var vm = new Vue({
    el: "#container",
    data: {
        checkValue: "爱好男"
    }
});
</script>
```

### select下拉选项
##### single
传入的数据 = valule || innerText
```html
<div id="container">
    <select v-model="selectValue">
        <option>xiaoming</option>
        <option>xiaohong</option>
        <option>xiaogang</option>
    </select>
    <span>{{selectValue}}</span>
</div>

<script>
var vm = new Vue({
    el: "#container",
    data: {
        selectValue: ""
    }
});
```

##### multiple
将选中的多个option的内容添加到数据中，(不用将数据初始化为数组)

### 数值绑定
对于radio，checkbox，select，data中的数据可以使用对应的value选择对应的选项

总是会将value值返回给数据

##### checkbox
checkbox可以使用true-value,false-value选择选中与否的值
```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
// when checked:
vm.toggle === 'yes'
// when unchecked:
vm.toggle === 'no'
```

##### radio
radio可以使用`v-bind:value=`控制选中时候传入的数据
```html
<input type="radio" v-model="pick" v-bind:value="a">

<!--when checked:-->
<!--vm.pick === vm.a-->
```

##### select option
```html
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
结果：
```js
// when selected:
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

### 修饰符
- `.lazy`，使用change事件改变而不是input事件改变
```html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" >
```
- `.number`，将输入的数据转换成数字（否则即使是数字类型也换转成字符串）
```html
<input v-model.number="age" type="number">
```
- `.trim`，去除数据两边空白符
```html
<input v-model.trim="msg">
```

# Component
### 实例
- 创建模板
```js
// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
- 创建结构
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
- 渲染模板
```js
new Vue({
    el: '#components-demo'
})
```

### 模板可以复用
- 模板可以复用并且每个模板都有自己的数据作用域（模板的数据使用函数返回变量）
- 若模板直接返回变量会让所有的模板都具有相同的数据作用域

### 通过Props传递数据给子模块
props就是将对应名字的特性的内容传递给模块，作为模块的数据渲染

### 唯一的根目录
- 模版必须要有一个根节点
- 当模版需要的数据很多时，可以将多个数据放在一个对象内，使用对象传递数据
```html
<!--传递多个数据麻烦-->
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>

<!--将数据打包为一个对象，模版中使用对象获取数据-->
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>

<!--模版中使用对象获取数据
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
!-->
```

### 给父对象传递信息
##### 使用$emit('event')触发事件给父元素
- 案例，每篇文章添加一个可以增大博客字体的按钮

component
```js
Vue.component("blog-post", {
    props: ['post'],
    template: `
        <div class="blog-post">
            <h3>{{post.title}}</h3>
            <button @click="$emit('enlarge-font')">Enlarge Font</button>
            <div v-html="post.content"></div>
        </div>
        `
})
```

html
```html
<div id="blog-post-events-demo">
    <div v-bing:style="{fontSize: postFontSize + 'px'}">
        <blog-post
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:post="post"
            v-on:enlarge-font="fontSize+=1"
        ></blog-post>
    </div>
</div>
```

vue
```js
var vm = new Vue({
    el: "#blog-post-events-demo",
    data: {
        posts: [
            {id: 0, title: "the Wings1", content: "content1"},
            {id: 1, title: "the Wings2", content: "content2"},
            {id: 2, title: "the Wings3", content: "content2"}
        ]
        postFontSize: 12
    }
});
```

##### 触发事件并传递值
- $emit()函数的第二个参数就是触发事件的事件参数
```js
<button v-on:click="$emit("enlarge-font", 1)">Enlarge Font</button>
```
- 若使用命令处理，可以使用$event指代事件参数
```js
<blog-post
    ...
    v-on:enlarge-font="postFontSize += $event"
></blog-post>
```
- 若使用方法处理，默认事件参数传到第一个参数
html
```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

vm.methods
```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 对组件使用v-model
##### v-model的过程
```html
<!--使用v-model-->
<input v-model="searchText">

<!--上式等价于下面-->
<input 
    v-bind:value="serachText"
    v-on:input="searchText = $event.target.value"
>
```
##### component使用v-model
- component使用v-model的过程
```html
<custom-input
    v-bind:value="searchText"
    v-on:input="serachText = $event"
></custom-input>
```
- component若要使用v-model,可以如下设置
```js
Vue.component("custom-input", {
    props: ['value'],
    template: `
        <input
        v-bind:value="value"
        v-on:input="$emit("input", $event.target.value)"
        >
    `
});
```

### 使用Slot加载组件内容
- 使用slot可以加载使用组件时的内容
```html
<alert-box>
    Somethind bad happened
</alert-box>
```
组件的内容
```js
Vue.component("alert-box", {
    template: `
        <div class="demo-alert-box">
            <strong>Error</strong>
            <slot></slot>
        </div>
    `
});
```

### 动态的组件
- 使用is这个特殊的属性可以选择加载的组件
```html
<component v-bind:is="CurrentTabComponent"></component>
```
- CurrentTabComponent可以是
    - 已经注册组件的名字
    - 组件的设置对象

### 模版解析的警告
- 注意`<ul>`,`<ol>`,`<table>`, `<select>`等标签中回限制只能添加某些标签，因此无法时候用自定义的组件
- 可以使用不受限制的标签，然后使用is属性调用对应组件即可

# 过渡和动画
### 过渡
##### 单个元素或者组件的过渡
- 使用transition将单个元素或者组件包裹
- 在特定的时间节点，vue会自动加上或者删除类名，没有使用name属性的情况下，默认以v前缀开头
    - v-enter：插入前生效，插入后的下一帧移出
    - v-enter-active：在插入前生效，过渡期间生效，过渡完后移出
    - v-enter-to：在插入后的下一帧生效，过渡完后移出
    - v-leave：在过渡生效的瞬间生效，开始过渡的下一帧失效
    - v-leave-active：在过渡的期间都生效
    - v-leave-to：在过渡生效的下一帧生效，v-leave失效后就生效，产生一个类的过渡，过渡完后就移出节点
- 使用name可以自定义前缀，然后在特定时间节点添加或者删除特定的类
- 对于动画的transition,v-enter以及v-leave在动画产生的下一帧并不会移出而是在动画结束之后统一移出
- 可以使用其他的类名，这样在某个时间节点会添加其他的类名
    - enter-class
    - enter-active-class
    - enter-to-class
    - leave-class
    - leave-active-class
    - leave-to-class

##### 钩子函数
- v-on:beforeEnter=""
- v-on:enter=""
- v-on:after-enter=""
- v-on:enter-cancelled=""

- v-on:beforeLeave=""
- v-on:leave=""
- v-on:afterLeave=""
- v-on:leaveCancelled=""

> 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。