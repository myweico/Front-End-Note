## 引入自定义的字体
```css
@font-face {
    font-family: Weico,
    src: url('../fonts/weico.ttf')
}
```

## 使用字体
### font
```
font: font-size font-family1, 'font family'
```

## 设置placeholder
参考：[SegementFault](https://segmentfault.com/q/1010000000397925)

webkit和blick使用伪元素
```css
::-webkit-input-placeholder
```
Mozilla Firefox 4-18使用伪类
```css
:-moz-placeholder
```
Mozilla Firefox 19+使用伪元素
```css
::-moz-placeholder
```
IE10使用伪类
```css
:-ms-input-placeholder
```