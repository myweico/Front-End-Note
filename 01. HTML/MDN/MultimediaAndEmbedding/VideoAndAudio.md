## 嵌入视频
### video标签
使用`<video>`嵌入一段简单视频
```
<video src="video.mp4" controls>
  <p>你的浏览器不支持HTML5视频。可点击<a href="video.mp4"></a></p>
</video>
```

属性  | 描述
---   | ---
src | 指定嵌入视频资源的路径
controls | 显示控制视频的控件
video标签里的内容 | 当不支持`<video>`标签时，标签里的内容将作为后备内容显示

### 多格式支持
不同浏览器对视频格式的支持不同。
MP3、MP4、WebM这些术语叫做容器格式。他们用不同的方式来来播放音频和视频。

当浏览器不支持媒体文件的格式的话，媒体文件将不会播放。可以提供多种文件格式，让浏览器选择支持的格式播放。兼容处理如下：
```html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

`<source>`标签提供了媒体文件的来源，浏览器会从上到下识别，播放第一个可以识别格式的媒体文件。

type可选属性指定媒体文件的类型（MIMIE types），通过检查这个属性来快速识别是否支持该文件格式，建议都加上这个属性，否则浏览器将会尝试加载每一个文件，直到找到一个能正常播放的文件，这样会消耗掉大量的时间和资源。

### 其他video特性
属性 | 描述
--- | ---
width和height | 设置视频的尺寸，注意视频始终保持视频的纵横比，没有填充的地方显示默认的背景颜色
autoplay | 视频或内容立即播放
loop | 视频是否循环播放
muted | 视频是否默认关闭声音
poster | 指向图像URL，将会在播放前显示
preload | 表示视频缓存的方式，none不缓存，auto加载后缓存媒体文件，metadata仅缓存文件的元数据

## audio
audio与video几乎一致，只是没有height、width和poster属性

## 显示音轨文本
在媒体标签中使用`<track>`标签添加WebVTT音轨文本

WebVTT文件格式：
```txt
WEBVTT
1
00:00:22.230 --> 00:00:24.606
第一段字幕

2
00:00:30.739 --> 00:00:34.074
第二段
```

与HTML媒体一起显示：
```html
<video>
  <source src="example.mp4" type="video/mp4">
  <source src="example.webm" type="video/webm">
  <track kind="subtitle" srclang="en" src="subtitle_en.vtt">
</video>
```

webvtt有三种格式：
- subtitle: 通过添加翻译字幕，帮助听不懂外国语言或听力障碍的人理解音频的中内容
- captions： 同步翻译对白，或者是描述  一个描述一些有重要信息的声音
- timed descoprton：将文字转换为音频，服务于有实力障碍的人

webVTT与HTML媒体一起显示：
1. .vtt后缀保存文件
2. 在video或者audio标签中使用track标签链接.vtt文件，kind属性指明类型，srclang描述使用什么语言编写
```html
<video controls>
  <source src="example.mp4" type="video/mp4">
  <source src="expamle.webm" type="video/webm">
  <track src="example.vtt" kind="subtitles" srclang="en">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```