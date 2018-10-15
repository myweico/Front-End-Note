# Positing
#### Static Position

## Abdolute Position
- `position: absolute;`
- 脱离文本流，相对与最近的设定了定位（absolute, relative）的祖先元素
- 给行内元素使用绝对定位后，转换为行内块（知道就行，不推荐使用）

## Relative Position
- `position: relative;`
- 使用left, right, top, bottom
- 相对于正常的文本流位置定位
- 还占据原来位置，下面的文本不会替上去
- 一般使用自绝父相
- 行内元素只用相对定位不能够转为行内块元素

## Fixed Position
- `position: fixed;`
- 固定定位会脱离文本流，不占据空间
- 固定定位相对与窗口
- 使用固定定位之后能够将行内元素转为行内块元素

## 层叠顺序
使用`z-index`设置层叠顺序，数字越大，显示优先度越高

## 定位盒子的居中显示
- static定位的盒子可以使用margin: 0 auto;
- 移动50%，然后返回移动自身宽度的一半
    ```css
    left: 50%;
    margin-left: -width/2;//负值
    ```
