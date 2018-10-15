# Webpack
## 网页中的静态文件
- JS
    - .js .jsx .coffee .ts(TypeScript 类 C# 语言)
- CSS
    - .css .less .sass .scss（sass改过来）
- Images
    - .jpg .png .gif .webp .bmp .svg
- Fonts
    - .svg .ttf .eot .woff .woff2
- 模版文件
    - .ejs .jade(不好用，不让写html标签) .vue(在webpack定义组件的方式，推荐这么用)

## 引入静态资源多了以后会出现的问题？
- 网页标签慢，发起很多次二次请求
- 要处理错综复杂的依赖关系
- 解决方法
    - JS、CSS，合并、压缩
    - 精灵图
    - base64编码（不会产生请求）
    - 使用requireJS或者Webpack处理各个包的依赖关系

## nrm
- npm默认从官网下载, 下载速度慢
- 可以使用nrm切换下载的原地址，下载还是使用npm
- 安装：`npm i nrm -g`
- 查看：`nrm ls`
- 切换：`nrm use npm`

## webpack的概念
- webpack是一个前端的项目构建工具，它是基于Node.js开发出来的前端工具

## Gulp和Webpack的比较
- Gulp基于task任务，以点的角度处理，相当于雷达，只能覆盖一小部分地区，若项目很大可能需要多个Gulp进行处理
- Webpack基于整个项目进行构建，宏观角度
- 基于webpack，可以完美实现资源的合并、压缩、打包、混淆等功能

## 安装
- 全局安装：`npm i webpack -g`
- 局部安装：`npm i webpack --save-dev` 或者 `npm i webpack -D`在项目根目录，安装到项目的依赖中
- `-D`一般是用于打包环境所依赖的包，`-S`一般是项目中所依赖的包
- 若`npm i package`不写参数，默认为以`-S`安装到项目
- 若本地有安装的pakage.json文件,里面写有包的名单，可以直接使用`npm i`安装没有安装的包
- package.json文件用于保留项目所依赖的包，package-lock.json用于纪录所有依赖的包的下载地址，版本等，可以加快下载速度以及锁定版本

## webpack的作用
- 能够处理js文件之间的相互依赖关系（一般情况下不可以在js中引用其他js文件，需要使用requireJS命令，可能浏览器不支持，使用webpack可以帮我们处理）
    - 之前的js文件都是通过script标签引入，如要考虑顺序、依赖关系、而且列表会很长，不易维护
- webpack可以处理js的兼容问题，将高级的，浏览器不能识别的语法转为低级的，浏览器可以正常识别的语法
- 可以处理预编译文件，例如ejs、jade模版文件、sass、less、stylus样式文件以及typescirpt、coffeescirpt等
- 可以将模块打包，分片传输、减少网络请求
- 可以自定义是否压缩、打包方式，自由化定制
- 可以使用插件提高开发效率，webpack-dev-server和webpack-html-plugin

## 项目的构建
- 在项目的根目录下使用`npm init -y`
- 安装jquery模块`npm i jquery -S`
- 不推荐直接在html文件里面引用任何包和css文件，在main.js中引用
    - DONOT: `<script src="/node_modules></script>`
- 在main.js中导入
    - 下面的命令相当于在nodejs中使用`const $ = require('jquery')`
    - `import $ from 'jquery'`, import .. form ... 是es6中导入模块方式
    - 若浏览器版本太低，会识别不了reqiure和import命令，这时候可以使用webpack做处理，在cmd中使用`webpack .\src\main.js .\dist\bundle.js`（webpack版本过高可能会出错，使用`webpack .\src\main.js -o .\dist\bundle.js`）

```js
import $ from 'jquery';

$(function () {
	$('li:odd').css('backgroundColor','green')
	
	// 注意下面使用了函数作为返回值
	$('li:even').css('backgroundColor', function () {
		return '#' + 'ECBD63'
	})
});
```

 若文件进行更改，需要重新打包，若不配置文件需要重复写输入路径和输出路径，很麻烦，故可以在配置文件`webpack.config.js`中设置默认的入口文件和出口文件，当使用webpack时不输入入口和出口参数，webpack会自动查找目录下的`webpack.config.js`文件

## 配置文件的设置
webpack基于nodeJS，所以使用nodeJS的语法
```js
const path = require('path');

// 配置文件，其实是一个js文件，通过node中的模块操作向外暴露了一个配置对象
module.exports = {
    // 配置文件，需要手动指定入口和出口
    entry: path.join(__dirname, './src/main.js'),// 入口，表示，需要使用webpack打包哪个文件呢
    
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```

- 使用webpack直接执行的时候
    - webpack会寻找webpack.config.js配置文件
    - 解析配置文件，require这个文件获取导出的对象
    - 从导出对象中获取配置对象
    - 拿到输出配置对象后就拿到入口和出口

## webpack-dev-server
- 使用webpack-dev-server这个工具实现监视文件修改并自动打包编译刷新浏览器的功能
- 运行`npm i webpack-dev-server -D` 把工具安装到项目的本地开发依赖环境中，因为用于webpack打包，所以使用`-D`开发环境
- webpack-dev-server依赖webpack，要求本地安装webpack
- 安装完毕后，使用方法和webpack命令的用法一样，运行`webpack-dev-sever --open --port 3000 --contentBase src --hot`

### 配置的第一种方法(推荐)
- webpack-dev-server只能本地安装，所以无法在powershell终端中直接运行，需要经运行webpack-dev-server的命令添加到package.json的scripts脚本中（推荐）
```packageJson
"scripts": {
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
}
```
- 然后使用`npm run dev`运行指令
- webpack-dev-server帮我们打包生成的bundle.js文件并没有存放的物理磁盘中而是存放到内存中（为了减少访问磁盘次数，提高性能），因此在项目根目录中无法找到打包好的bundle.js文件
- html中引入的js文件要的入口路径需要改为这个内存中的路径
- 修改完毕后使用webpack重新打包到物理内存中获取发布环境的文件

### 配置的第二种方法
pakage.json中只使用
```js
script: {
    "dev": "webpack-dev-server"
}
```

在webpack.config.js中配置
```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'web', // 设定编译目标，web平台
	entry: path.join(__dirname, './src/mian.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	devServer: {
		open: true,
		port: 3000,
		contentBase: 'src',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
```
不同平台设置`NODE_ENV`的方式不一样，windows需要`set NODE_ENV=production`，其他只需要`NODE_ENV=production`，为了可以跨平台设置，因此使用了cross-env插件，使用`cross-env NODE_ENV=production`即可
```js
// package.json
{
    ...
    "scripts": {
        ...
        "build": "cross-env NODE_ENV=production webpack --config webpack.config.js"
        "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
    }
}
```
webpack.config.js中需要判断环境变量使用不同的设置，所有的环境变量都可以通过`process.env`获取
```js
// webpack.config.json
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

// 不直接输出
const config = {
    target: 'web', // 设定编译目标，web平台
	entry: path.join(__dirname, './src/mian.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
    	new webpack.DefinePlugin({
    	    'process.env': {
    	        NODE_ENV: isDev ? '"development"' : '"production"'
    	    } // 区别打包环境？？？在js代码中也可以使用，Vue，React会根据开发环境进行打包，生产环境会删除注释，错误提示等等
    	}),
    	new HTMLPlugin()
	]
}

if (isDev) {
    config.devServer = {
        config.devTool = '#cheap-module-eval-source-map', // 映射原生的js代码
        port: 8000, //
        host: '0. 0. 0. 0' // 既可以通过127.0.0.1访问，也可以通过内网IP访问
        overlay: {
            error: true, // 在网页上显示错误
        },
        open: true, //打开浏览器
        hot: true,
        /*historyFallback: {
            映射地址？？？
        }*/
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
        new webpack.NoEmimtOnErrorsPlugin()
    )
}

mudule.exports = config
```
### 配置参数
- --open 自动打开浏览器
- --port 3000
- --contentbase src
- --hot 热重载（打补丁，只更新更改的部分，无刷新重载页面）

### 将页面放到内存中
默认打开的页面是物理磁盘中的html，引入的js为内存中的js文件

使用插件html-webpack-plugin
    - `npm i html-webpack-plugin -D`

webpack.config.js配置文件
```js
// 导入在内存中生成html页面的插件
// 插件都要插入到plungins里面
const htmlWebpackPlugin = require('html-webpack-plugin');


plugins: [
    new htmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        
        filename: 'index.html'
    })
]
```

- 内存中的html页面会自动添加内存中的bundle.js引用路径，因为这个插件已经帮我们自动创建了一个script标签并引入内存中的打包好的文件

## webpack 处理第三方文件的过程
1. 发现这个要处理的文件不是js文件，然后就去配置文件中，查找有没有对应的第三方loader规则
2. 如果能找到对应的规则，机会调用对应的loader
3. 调用的loader顺序为从后往前调用
4. 当最后一个loader调用完毕后会把处理结果直接交给webpack进行打包合并

## 处理css的loader
### 导入语法
```js
import './css/index.css'
```

### appropriate loader问题
- 默认webpack默认只能打包js类型的文件，无法处理其他非js类型文件
- 如果要处理非JS类型的文件，需要手动安装一些合适第三方的loader加载器
- 1.x可以忽略loader，2及以后都需要添加-loader后缀名
- 如果需要打包处理css文件
    - `npm i style-loader css-loader -D`
-  打开webpack.config.js配置文件，在里面新添一个配置节点，叫做module，它是一个对象，在这个module对象身上，有一个rules属性，这个rules属性是个数组；存放了所有第三方文件和处理规则
```js
module: {
    // 这个节点配置所有第三方模块
    // 若默认的无法处理，会在这里面匹配规则，匹配成功则使用对应的module
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader']
    ]
}
```
- **loader的匹配规则为从右到左**，css-loader => style-loader

### 处理less文件的loader
##### 处理less文件的loader
- `npm i less-loader -D`
- less-loader模块依赖less的包

##### 配置文件内容
```js
module: {
    rules: [
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
}
```

### 处理sass的louder
- `npm i sass-loader -D`
- sass-loader依赖node-sass包
- 配置文件类似less
- 注意node-sass一般在淘宝的cnpm安装才可以成功

### 处理url的loader：url-loader
- 默认情况下，webpack无法处理css中的url地址，不管是图片还是字体库，只要shiyonglrurl地址，都处理不了
- 安装loader
    - `npm i url-loader file-loader`
    - file-loader为内部依赖
- 设置module
```js
module: {
    rules: [
        { test: /\.{jpg | png | gif | webp }/, use 'url-loader' }
    ]
}
````
- 默认会转换为base64的数据
- 使用loader的limit可以转换为url地址
    - 图片尺寸 < limit值: 转为base64值
    - 图片尺寸 >= limit值，采用图片格式
- 默认的图片名改为hash值，避免图片重名，使用name进行更改
    - `url-loader?limit=65536&name=[hash:8]-[name].[ext]`
```js
module: {
    rules: [
        { test: /\.{jpg | png | gif | webp }/, use 'url-loader?limit=6321&name=[hash:8]-[name].[ext]' }
    ]
}
```
- 若图片重名的话，会显示同一张图片
- 使用【hash】和【name】可以添加hash值和原来的名字
- 若要通过路径的方式引入node\_modules目录下的modules中的相关文件，可以忽略node\_modules这一层目录，直接写包的名称，然后后面跟上具体的文件名,不写横杠默认到node_module下面寻找
    - `import 'bootstrap/dist/css/bootstrap.css'`

### 处理字体文件的loader
```
{ test: /\.(ttf | eot | svg | woff | woff2)$/, use: 'url-loader' } 
```

## babel的配置
### class
- 构造函数实现的方式并不是真正的方式
- es6中的class与java, c#等语言的类完全一致
- 使用static关键字，定义静态属性
    - 静态属性就是直接通过类名访问的属性
    - 通过类的实例访问属性就是实例属性
```js
class Person {
    static info = {
        name: 'zs', 
        age: 20
    }
}
```

### babel
- 默认的webpack默认只能识别一部分es6新语法，一些更高级的es6或者es7语法，webpack处理不了，这时候就需啊哟第三方的loader，来帮助webpack处理这些高级的语法，当第三方的loader把高级语法转为低级语法之后，会把结果交给webpack去打包到bundle.js中
- 通过Babel，可以帮我们将高级的语法转换为低级的语法

babel的安装以及配置：
1. 在webpack中，可以运行下面的两套命令，安装的两套包，取安装babel的相关内容功能：
    - `cnpm i babel-core babel-loader babel-plugin-transform-runtime babel-plugin-transform-vue-jsx -D`
    - `cnpm i babel-preset-env babel-preset-stage-0 -D`

第一套包用于转换，将es6转换为es3

第二套为转换规则，插件使用第二套包相互配合，将高级语法转换为低级的语法

新的安装：
```js
npm install -D babel-loader@7 babel-core babel-preset-env webpack
```
2. 打开webpack的配置文件，在module节点下rules数组添加以下新的匹配规则
```js
{ test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }
```
- 注意在配置babel的loader规则时候，必须把node\_module目录通过exclude选项排除掉，因为多余，没必要，消耗资源，转换后也不一定能够运行

3. 在项目的根目录下，新建一个名字就是.babelrc（.开头的文件名）的babel配置文件，这个配置文件，属于json格式，所以在写.babelrc配置的时候，必须符合JSON语法规范，不能写注释，字符串必须用双引号，引号只能为双引号
```json
{
    "presets": ["env", "stage-0"],
    "plugins": ["transform-runtime", "transform-vue-jsx"]
}
```
4. 目前我们安装的babel-preser-env是比较新的es语法，之前安装的是babel-preset-es2015，现在出了更新的语法插件，它包含了所有的和esxxx的相关语法

### 分离css打包
css以js的形式出现在js文件中，生产环境我们需要将css抽离出来，需要一个插件`extract-text-webpack-plugin`，不易做浏览器缓存，从js中写入css中环境中，对性能有影响

在`webpack.config.js`中引入`extract-text-webpack-plugin`
```js
const ExtractPlugin = require('extract-text-webpack-plugin')
```

根据环境配置webpack配置文件
```js
// webpack.config.json
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

// 不直接输出
const config = {
    target: 'web', // 设定编译目标，web平台
	entry: path.join(__dirname, './src/mian.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.[hash:8].js' // 生产环境使用hash
	},
	devServer: {
		open: true,
		port: 3000,
		contentBase: 'src',
		hot: true
	},
	plugins: [
    	new webpack.DefinePlugin({
    	    'process.env': {
    	        NODE_ENV: isDev ? '"development"' : '"production"'
    	    } // 区别打包环境？？？在js代码中也可以使用，Vue，React会根据开发环境进行打包，生产环境会删除注释，错误提示等等
    	}),
    	new HTMLPlugin()
	]
}

if (isDev) {
    config.mudule.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                option: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    
    config.devServer = {
        config.devTool = '#cheap-module-eval-source-map', // 映射原生的js代码
        port: 8000, //
        host: '0, 0, 0, 0' // 既可以通过127.0.0.1访问，也可以通过内网IP访问
        overlay: {
            error: true, // 在网页上显示错误
        },
        open: true, //打开浏览器
        hot: true,
        /*historyFallback: {
            映射地址？？？
        }*/
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
        new webpack.NoEmimtOnErrorsPlugin()
    ) else {
        config.output.filename = '[name].[chunkhash:8].js'
        config.module.rules.push({
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        })
    }
    confog.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
    )
}

mudule.exports = config
```

### 注意
- package.json中记录的devDependency只是记录了安装历史
- 若中途终止包的安装，可能会因为安装不完全而出错，最好删除所有node_modle
- vue中组件的样式都是随着组件的加载而加载到页面的，因此可以帮助我们节省流量
- 因为业务代码经常更新，如果将业务代码和一些静态文件打包在一起，则整个打包的文件需要随着业务的更新而更新，一些不怎么变化的静态文件则要随着包的更新而重新加载，便降低了效率，因此，将静态文件和业务的文件分开，静态文件可以缓存，而业务代码可以一直更新，效率便会更高，加载更快

```js
config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmimtOnErrorsPlugin()
    ) else {
        // 设置入口
        config.entry = {
            app: path.join(__dirnae, 'src/index.js'),
            vendor: ['vue'] // 单独打包文件
        }
        config.output.filename = '[name].[chunkhash:8].js'
        config.module.rules.push({
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        })
    }
    
    confog.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender'
        })
        new webpack.optimive.CommonChunkPlugin({
            name: 'runtime' // 将webpack单独打包到一个文件中，避免加入模块后id发生变化，有利于浏览器长缓存
        })
    )
```

#### hash与chunckhash差别
整个模块的hash一致，每个chunk一个chunkhash

### 使用webpack的步骤
- 创建webpack文件夹
- 初始化，不能带有中文名或者为webpack(不能直接 -y)
    - `npm init -y `

### 其他使用
- 使用postcss处理后css样式，例如编译完stylus后，对css进行处理，例如prefixer
```shell
npm i postcss-loader autoprefixer -D 
```
module配置
```js
 { 
    test: /\.styl$/, 
    use: [
      'style-loader', 
      'css-loader', 
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader' 
    ]
},
```
- 在vue中使用jsx
安装包
```shell
npm i babel-plugin-transform-vue-jsx
```
.babelrc配置
```json
{
  ...
  "plugins": [ "transform-vue-jsx" ]
}
```
module配置
```js
{ test: /\.jsx$/, use: 'babel-loader' }
```

### 配置的基本过程
#### 初始化
```shell
npm init -y
```
#### 配置webpack-dev-server
package.json中的命令设置，使用cross-env跨平台设置命令
```js
"scripts": [
    ...
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
    "dev": "cross-env NODE_ENV=production webpack --config webpack.config.js"
]
```
webpack.json.json设置
```js
const path = require('path')

// 获取打包的环境，通过process.env可以获取所有设置的变量
const isDev = process.env.NODE_ENV === 'development'

// 单独存为一个对象，方面后面修改
const config = {
    // 设置入口
    entry: path.join(__dirname, './src/index.js'),
    // 设置出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}

// 根据打包环境设置不同的config
if (isDev) {
    // 设置devtool，设置是否生成或者怎么生成source-map
    devtool: 'cheap-module-eval-source-map',
    config.devServer = {
        port: 5000,
        overlay: true,  // 显示错误信息
        hot: true，     // 启动热更新，需要配置HotModuleReplacementPlugin
    },
    config.plugin.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

// 输出对象
modules.exports = config
```
#### 配置html-webpack-plguin
```js
const HTMLWebpackPlugin = require('html-webpack-plugin')
...
const config = {
    ...
    plugins: [
        ...
        new HTMLWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            title: 'weicoPage',
            ...
            filename: 'index.html'
        })
    ]
}
```

#### 配置css-loader
安装loader
```shell
npm i style-loader css-loader -D
```
配置loader
```js
// webpack.config.js
module: {
    rules: [
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
}
```

#### 配置stylus
安装loader
```shell
npm i stylus stylus-loader -D
```

配置loader
```js
 ...
 rulues: [
    ...,
    { test: /\.styl$/, use: [ 'style-loader', 'css-loader', 'stylus-loader' ] }
 ]
```

#### 配置postcss
postcss用于处理由less，stylus等编译得到的css，例如可以使用autoprefixer添加各浏览器的前缀名

安装loader
```shell
npm postcss-loader autoprefixer precss -D
```

配置postcss.config.js文件
```js
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}
```

配置webpack中的reules
```js
    rules: [
        ...,
        { 
            test: /\.styl$/, 
            use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'true' // 使用前面传递过来的sourceMap
                        }
                    },
                    'stylus-loader'
                ] 
        }
    ]
```
#### 配置url-loader 
安装loader
```shell
npm i url-loader file-loader -D
```

#### 配置barbel
安装barbel
```shell
npm install babel-loader babel-core babel-preset-env webpack -D
```

配置module
```json
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

#### 配置jsx
安装插件
```
npm install
  babel-plugin-syntax-jsx
  babel-plugin-transform-vue-jsx
  babel-helper-vue-jsx-merge-props
  babel-preset-env
  --save-dev
```

配置module 
```js
module: {
  rules: [
    {
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['transform-vue-jsx']
        }
      }
    }
  ]
}
```
单独的文件使用：
```jsx
export defaut {
    data () {
        return {
            author: 'weimy'
        }
    },
    render () {
        return (
            <div id="footer">
                <span>Written By {weimy}</span>
            </div>
        )
    }
}
```
