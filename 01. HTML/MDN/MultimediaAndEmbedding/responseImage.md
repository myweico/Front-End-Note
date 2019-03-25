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

srcset 定义浏览器选择的图像集以及每个图像的大小，图像之间以逗号分隔，图像信息包括图像的路径 以及大小（固定宽度），以 w 为单位

size 定义媒体查询条件以及最佳展示尺寸，浏览器从上到下检查媒体查询条件，找到第一个符合条件的便会停止检查，然后采用符合条件的对应槽大小

有了这些属性：浏览器会：

- 查看设备宽度
- 检查 sizes 列表中哪个媒体条件是第一个为真
- 查看给予该媒体查询的槽大小
- 加载 srcset 列表中引用的最接近所选的槽大小的图像

老旧浏览器不支持这些特性，将会忽略这些属性，使用 src 加载图像

## 尺寸相同，选择不同分辨率的图片

根据像素比（物理像素/css 像素)来选择图片

```html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy"
/>
```

## 艺术方向

艺术方向涉及要修改图像以适应不同的显示尺寸

使用 picture 标签

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```

source标签指定来源，media指定媒体查询的条件，srcset指定图片的路径（可以使用多分辨率图片），使用img作为备选内容，不支持piecture标签的时候，img将会显示，当所有媒体查询条件都为false的时候，img也会显示

## 不使用CSS或者JS来设置响应式图片的原因
不太懂，参考[MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Why_can't_we_just_do_this_using_CSS_or_JavaScript)

## 大胆的使用现代的图片格式
通过picture标签，有了img作为后备内容可以大胆地使用现代的图片格式（体积小质量高）
```html
<picture>
  <source type="image/svg+xml" srcset="pyramid.svg">
  <source type="image/webp" srcset="pyramid.webp">
  <img src="pyramid.png" alt="regular pyramid built from four equilateral triangles">
</picture>
```

type类型指定MIME类型，有助于浏览器快速检查是否支持该类型选择加载还是跳过