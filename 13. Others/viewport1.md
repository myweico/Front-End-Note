## css像素以及物理像素
物理像素指的是显示器上一个显示的像素点，用作单位指的是显示像素点的个数

css像素我理解为是一个相对的显示像素点，这个相对像素点是若干个像素点的集合，集合的数量取决于设备的像素密度，例如PC的1css像素相当于1个物理像素，手机上1css像素相当于4个或者9个物理像素

## 屏幕尺寸（screen size）
屏幕尺寸大小的单位都是指物理像素，指的是有多少个物理像素点组成，可以使用`screen.width`以及`screen.height`获取屏幕的物理像素宽高

## 窗口尺寸（windows size）
窗口尺寸指定可以布局的CSS像素的数量，使用`window.innerWidth`以及`window.innerHeight`可以获取窗口的css像素宽高

缩小时，窗口大小不变，物理像素的数量不变dp，dpr减小，px=dp/dpr，px增多，所以window size变大，可以布局的css像素增多

放大时，px减小，可以布局的css像素减少

## scroll offset
`window.pageXOffset`以及`window.pageYOffset`可以获取document滚出窗口上面以及左边的css像素长度

放大和缩小时，浏览器保持滚动出去的元素不变，因此滚出去的css像素长度没有发生变化


## Viewport
在桌面端，viewport即使html的上一层，默认的宽高就是浏览器的宽高

因为html为块元素，其设置`width: 100%;`为父元素宽度的100%，其父元素相当于是viewport，因此html元素的宽就是viewport的100%，即浏览器宽的100%

### viewport的大小测量
`document.documentElement`指的是html元素

特殊地，浏览器将`document.documentElement.clientWidth`和`-clientHeight`设定为获取viewport的宽和高，而不是获取html元素的宽和高（不论html设置width和height为多少），若想要获取html元素的宽和高，使用`-offsetWidth`以及`-offsetHeight`

`window.innerWidth`以及`-innerHeight`也可以获取viewport尺寸，但要注意`window.innerWidth`以及`-innerHeight`包括滚动条，`document.documentElement.clientWidth`以及`-clientHeight`不包括滚动条

`window.innerWidth/Height`又Netscape提出，`docuemnt.documentElement.clientWidth/Height`由IE提出，后来Netscape支持`docuemnt.documentElement.clientWidth/Height`而微软继续不支持`window.innerWidth/Height`

## pageX/Y clientX/Y screenX/Y
事件中的pageX/Y指的距离html元素（文档）左上角的距离，

clentX/Y指的是距离viewport（windows窗口）左上角的距离

screenX/Y指的是距离屏幕左上角的距离

## 媒体查询中的width
width/height查询的时`document.documentElement.clientWidth/Height`，即viewport的宽高

device-width/height查询的是`screen.width/height`,即屏幕的宽高

```css
div.sidebar {
	width: 300px;
}

@media all and (max-width: 400px) {
	// styles assigned when width is smaller than 400px;
	div.sidebar {
		width: 100px;
	}

}
```