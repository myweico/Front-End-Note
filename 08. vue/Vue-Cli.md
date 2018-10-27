# Vue-Cli
## 安装		

```shell
npm i vue-cli -g
```

## 使用
创建项目
```shell
vue init webpack todolist
```

开启服务
```shell
npm run dev
```

## vue.config.js设置

为路径设置别名

```js
configureWebpack: config => {
      config.resolve.alias.styles = path.join(__dirname, './src/assets/styles')
  }
```

为所有的stylus预加载文件

```js
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/variables.styl'),
        path.resolve(__dirname, './src/assets/styles/mixins.styl')
      ]
    }
  }
```

设置代理

```js
  devServer: {
    proxy: {
      '/api': {
        target: 'http://site0.tech', // target host
          changeOrigin: true, // needed for virtual hosted sites
          ws: true, // proxy websockets
          // pathRewrite: {
          //   '^/api': '/data', // rewrite path
          // }
      }
    }
  }
```