# Iframs和其他嵌入技术
## Iframs
### Iframs的基本属性
- allowfullscreen：是否可通过全屏API设置全屏模式
- frameborder：设置框架的边框宽度，可以使用CSS实现同样的效果
- src：设置框架的资源路径
- width和height：框架的宽高
- 备选内容：标签内的内容就是备选内容，将在不支持标签的情况下显示
- sandbox：注意只在版本较高的浏览器起作用，可以提高安全性设置

### 安全隐患
黑客恶意修改网页或欺骗人们进行不想做的事情的攻击目标就是**攻击向量**

单击劫持：隐藏iframes，用它来捕获用户的交互。是误导用户和窃取敏感数据的常见方式

安全措施：
- 使用csp设置安全策略
- 只在有需要的时候允许嵌入
- 使用https
- 使用sandbox设置使用的权限

## embed和object元素
embed和object元素：用于嵌入多种类型的外部内容的通用嵌入工具

embed和object现在用处已不太大了：
- falsh弃用
- pdf倾向于被链接而不是预览
- 视频和音频有更好的video和audio处理
