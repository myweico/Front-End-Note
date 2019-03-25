# 响应式图片

## 分辨率切换

根据设备采用不同尺寸的图片，可以节省带宽，更快加载

使用 srcset 和 sizes 属性指定在不同资源集合以及在显示的尺寸

```html
<img
  srcset="
    elva-fairy-320w.jpg 320w,
    elva-fairy-480w.jpg 480w,
    elva-fairy-800w.jpg 800w
  "
  size="(min-width: 320px) 280px,
            (max-width: 480px) 480px,
            800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dress as a fairy"
/>
```

srcset 定义浏览器选择的图像集以及每个图像的大小，图像之间以逗号分隔，图像信息包括图像的路径 以及大小（固定宽度），以w为单位

size定义媒体查询条件以及最佳展示尺寸，浏览器从上到下检查媒体查询条件，找到第一个符合条件的便会停止检查，然后采用符合条件的对应槽大小

有了这些属性：浏览器会：
- 查看设备宽度
- 检查sizes列表中哪个媒体条件是第一个为真
- 查看给予该媒体查询的槽大小
- 加载srcset列表中引用的最接近所选的槽大小的图像

老旧浏览器不支持这些特性，将会忽略这些属性，使用src加载图像

##
