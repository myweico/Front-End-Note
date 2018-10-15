## 常用的命令
- v-cloak
- v-text
- v-html
- v-bind:name="command",
    - 简写`:`
- v-on
    - 简写：`@`
- v-if
- v-show
- v-model

## 过滤器
用于格式化文本

常作用于v-bind命令中的数据绑定以及模版占位符的数据格式化

### 声明全局的过滤器
```js
Vue.filter('name', function (data) {
    
})
```

### 声明局部的过滤去
var vm = new Vue({
    el: '#demo',
    data: {
        
    },
    filters: {
        name: (name) => {
            
        }
    }
})

### 调用
v-bind:data-demo="data | filter"
```
<p>{{ content | filter }}</p>
```
## Vue的声明周期
- new Vue()
- 初始化声明周期函数和生命周期钩子等自身的东西
- beforeCreate
- 初始化数据，方法等，自定义的属性
- created
- beforeMount,编译模版，插入到DOM前
- mountd，插入到DOM后
- befoteUpdate
- updated
- beforeDestroy
- destroyed

### 处理get，post，jsonp请求
使用vue-resource或者axios
```js
vm.$http.get()
vm.$http.post()
vm.$http.jsonp()
```

## 过渡
为要过渡的单个元素添加transition，若要为多个元素添加过渡则使用transition-group

设置过渡的元素在某个时期Vue会自动为其添加上特定的类

类名可以通过name属性添加，默认为v-开头

添加类的时期如下：
- v-enter: 在插入前生效，插入后的第一帧移除
- v-enter-active: 插入后的第一帧生效，过度完后移除
- v-enter-to: 插入后的第一帧生效，enter-active移除后移除
- v-leave：要移除节点前生效，然后下一帧移除
- v-leave-active：v-leave生效的时候添加，过渡结束后移除
- v-leave-to: v-leave移除的那同时生效，过渡结束后移除，然后节点就被移除

## 动画

## 组件
### 全局组件
```js
Vue.component('name', {
    data: function () {
        return {
            ...
        }
    },
    temmplate: '<h1>...</h1>'
})

Vue.component('name',Vue.extend({
    
}))

// 模板可以是字符串也可以是id对应的tamplate元素，tempalte元素都需要有一个根节点
Vue.conponent('name', {
    template: '#id'
})
```

### 局部组件
```js
var vm = new Vue({
    el: '#id',
    data: {
        
    },
    components: {
        cpn1: {
            data: function () {
                return { data }
            },
            template: '#id'
        }
    }
}) 
```

### 引入组件文件 cpn.vue
```html
<template>
<div>
    ...
</div>
</template>

<script>
export default {
    data: function () {
        return {}
    },
    methods: {
        
    }
}
</script>

<style scoped type="less">
    ...
</style>
```

## 组件间的数据交互
### 父给子传值
```html
<!--parent area-->
<tmpt :name="name" :age="age"></tmpt>
```
```js
// child component
components: {
    tmpt: {
        props: ['name', 'age']
    }
}
```
### 父给子传方法
```html
<!--parent area-->
<tmpt @event:"parentMethod"></tmpt>
```
```js
// child component
components: {
    tmpt: {
        methods: {
            childMethod () {
                this.$emit('event')
            }
        }
    }
}
```

### 父组件获取子组件的值
- 通过触发事件调用父组件的方法获取动态的值
- 通过ref获取DOM元素以及组件从而可以获取此刻的数据
```html
<!--通过ref属性设定标识-->
<component ref='cmpn'></component>
```
```js
this.refs.cmpn
this.refs.cpmn.data
this.refs.cpmn.method()
```

## 路由
路由的使用
```js
var router = VueRouter({
    routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
    ]
})

// 挂载到组件上
var app = new Vue({
    el: '#id',
    data: {},
    router
})
```
挂载在某个Vue实例上，其将会显示在该vue实例中的路由显示容器中

设置监听，设置显示的组件，改变hash

### 路由的嵌套
```js
var router = new VueRouter({
    routes: [
        {
            path: '/user', 
            component: userCmpn, 
            children: [
                { path: 'login', component: login },
                { path: 'register', component: register },
            ]
        }
    ]
})
```