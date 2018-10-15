# 1. Apache的配置
## 1.1 Apache下载
Apache的最新版不支持安装版，这里提供解压版
> - [下载地址](https://www.apachelounge.com/download/)
> - [使用说明](https://httpd.apache.org/docs/current/platform/windows.html
)

安装方式如下：

```sh
# 使用管理员身份运行
# 切换到Apache目录下的bin文件夹内运行
$ cd <解压目录>/bin

# 安装Apache服务，-n参数指定服务名称
$ httpd.exe -k install -n "Apache"

# 如果需要卸载Apache，可以使用以下命令
$ httpd.exe -k uninstall -n "Apache"

# 使用下面的命令测试Apache是否正常
$ httpd.exe -t
```

执行安装命令会报错，根据提示修改即可

## 1.2 Apache常用命令
可以使用右下角的图标对Apache服务器进行设置

也可以使用命令行对Apache命令进行设置
```sh
# 启动Apache服务器
$ httpd -k start -n "Apache"

# 重启
$ httpd -k restart -n "Apache"

# 停止服务
$ httpd -k stop -n "Apache"

# 安装服务
$ httpd -k install -n "Apache"

# 测试服务
$ httpd -t

# 删除服务
$ httpd -k uninstall -n "Apache"
```

## 1.3 常用设置
### 1.3.1 设置服务的主路径
Apache的设置文件在conf中

Apache的设置文件httpd.conf都是以此为路径为参考寻找对应的设置文件等
> ServerRoot "C/Develop/Apache"

### 1.3.2 设置服务器的主目录
网站的主目录就是以该路径为参考，这里的主目录指只用一个主机的情形

若使用虚拟主机，localhost将会指向第一个虚拟主机

> DocumentRoot "F:/www"

### 1.3.3设置监听端口
Apache将会从指定的监听端口寻找网络请求，要确防火墙允许80端口的请求

在命令行中使用:`netstat -an`监视本机端口的使用情况

常用的端口
> - http默认的端口是80
> - https默认的端口是443

Apache中可以使用Listen指令监听窗口
 ```sh
Listen 80   
Listen 443
```

### 1.3.4 默认文档
设置`DirectoryIndex`设置可以设置打开目录时，默认打开的文档

默认文档可以设置多个，会按照前后优先顺序打开，没有找到文档则启动目录浏览

```sh
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>
```

### 1.3.5 设置不显示文件结构树
设置Directory中的`Options`即可

有`Indexes`表示使用文档目录树，没有则表示禁止文档目录树
```sh
<Directory "F:/Web/apache/site0">
	    Options Indexes FollowSymLinks
	    AllowOverride None
	    Require all granted
</Directory>
```

### 1.3.6 设置访问权限
`<directory />`表示所有的文档

下面的设置表示禁止访问所有文件
```sh
<Directory />
    AllowOverride none
    Require all denied
</Directory>
```

禁止所有文件后，允许特定的目录访问
```sh
<Directory "F:/Web/apache/site0">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```

## 1.4 虚拟主机设置
若一个主机只有一个网站，没有任何问题，所有向该网站发出网络请求的都会打开该网站

若一台主机有多个站点，就需要建立虚拟主机，当向主机发出请求的时候，Apache会根据请求的域名找到对应域名的虚拟主机的位置查找文件

在`httpd.conf`文件中引入虚拟主机的设置
> \# Virtal hosts   
> Include conf/extra/httpd-vhosts.conf

虚拟主机设置文件的设置：
```sh
# 配置一个虚拟主机 *:80 指的时绑定当前机器的任何IP的80端口
<VitrualHost *:80>
# 如果这里指定特殊的端口，一定要保证这个端口被Apache监听
<VirtualHost *:80>
    # 这台虚拟主机的主目录
    DocumentRoot "F:/site0"
    # 这台虚拟主机的域名
    ServerName site0.tech
    # 这台虚拟主机的错误日志文件
    ErrorLog "logs/site0.tech-error.log"
    # 这台主机的访问日志文件
    CustomLog "logs/site0.tech-access.log" common
</VirtualHost>
```

若要修改域名指定的地址，可以通过修改host文件(window/system32/drivers/etc/host)

域名解析的过程：
1. 若对应域名的网站呢在缓冲中有效存在，直接打开，没有继续下一步
2. 查找系统中的host文件，若域名在host文件中有对应的IP则直接使用该IP，否则进行下一步
3. 将域名发送给DNS服务器解析，返回IP，如没有则无法访问


## 1.5 配置PHP支持
Apache只解析静态的文件，若想要支持动态的文件，则需要配合PHP的模块

### 1.5.1 安装PHP
将php解压到纯英文的路径中

### 1.5.2 在Apache中添加支持PHP的配置
```sh
# php support
LoadModule php7_module C:/develop/php/php7apache2_4.dll
```

### 在`IfModule mime_module>`节点中添加.php扩展名解析支持
```sh
# parse .php file
AddType application/x-httpd-php.php
```

### 在默认文档中添加`index.php`
```sh
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule dir_module>
```