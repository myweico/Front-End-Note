## 三种viewport
layout viewport：因为屏幕太小，因此使用了一个虚拟的viewport摆放布局，这个布局就是layout viewport，大小基于css像素，移动端以这个viewport作为布局基准

visible viewport：屏幕内所显示的css像素布局（屏幕总共可以显示多少个css像素），放大和缩小时，屏幕显示的css像素的多少将会发生变化，因此visible viewport的大小也会随着发生变化

ideal viewport：以适当大小显示的时候，屏幕所能显示的css像素布局

默认情况下，移动端都是以layout viewport作为基准大小进行布局，然后设置visible layout为layout大小显示所有的内容

## 获取viewport大小
获取layout viewport的大小，`document.documentElement.clientWidth`以及`document.documentElement.clientHeight`

获取visible viewport大小：`window.innerWidth`以及`window.innerHeight`，随着放大和缩小，visible viewport的大小会随着改变

获取屏幕大小：`screen.width`以及`screen.height`，获取到的是设备像素大小，基本没什么用处

## 滚动长度
window.pageXOffset以及window.pageYOffset获取html滚动的长度（CSS像素大小）

## html元素的实际大小
document.documentElement.offsetWidth/Height

## 媒体查询
device-width以及width的区别，和desktop的区别，为什么作者说device-wdith以及width无法决定哪个更好

## 事件坐标
event.pageX/Y：距离layout viewport左上角的css像素距离

event.screenX/Y：距离visible viewport左上角的物理像素距离

event.clientX/Y：距离visible viewport左上角的css像素距离



