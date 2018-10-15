## CSS Sprites
#### Why
- When there are many small picture, it will cause the server spend lots of time to deal with the requests, because each picure will generate a request
- So it always put he small picure into a picture to generate a request to optimize the precess

#### How
css:  
```css
width: the width of the icon;
height: the height of the icon;
background: url("1.png") -left -top;
```

#### Firework
- 选中 - 右键 -  通过剪切新建位图
- 新建透明 ，尽量靠近