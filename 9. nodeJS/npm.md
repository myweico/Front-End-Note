# 常用命令

npm -v  | 查看版本
npm install npm -g  | 使用使用npm服务器更新呢本地npm
cnpm install npm -g | 使用淘宝npm更新本地npm


# 安装模块
### 使用npm命令安装模块（淘宝npm则为cnpm）
- 安装格式
    - npm install [module name]

- 引入格式
    - var module = require('moduleName')

### 全局安装和本地安装
- 全局安装加上-g
- 全局安装将文件安装到user/local或者安装目录下的node_module中
- 本地安装则是将模块安装到在当前目录的node_module（可以直接将module文件放到文件夹下，然后直接引用，不用使用远程服务器）
- 若要在两个地方使用npm link
- 使用npm list -g 查看所有全局安装的模块
- 使用npm list grunt 查看grunt模块的版本号
- 使用模块下面的package.json查看包的信息

### 卸载模块
- npm uninstall moduleName 卸载模块
- npm ls 查看是否还在

### 更新模块
- npm update moduleName

### 搜索模块
- npm search moduleName

### 注册用户
- npm addUser

### 发布模块
- npm pubish

### 查看帮助
- npm help