## Flow
### Block Element
- Block Element will have a enter behind it automatically.That means block element will occupy the whole line space 
- Block Element flow enter browser is from up to down
- If block element has no width setting, they will fill the whole width of parent element automatically

### Inline Element
- Inline element won't occupy the whole line,they will share the line space
- Inline element flow enter the browser from left to right, when there isn't not enough space, they will return 

### Magin merge
- The left and right margin won't merge, they will add together
- The up and down margin will merge
- The margin of the element escaping from the flow won't merge with the normal flow

### Float
- Float will make the element out of flow, other block element will ignore the float element while the inline element will consider the it,they will surround the float element
- Float element is out of the flow 
- Element only can float to left or to right
- Using float may led to the content quence is not well
- The float element must have the width

### Layout
- I think when the width is wide,we had better use the Jello Layout, when the width become narrow,wo need to use the liquid layout.
- The layout is the process of putting boxes

### Four position
1. Static Position `position: static`
    - Static position is default setting
    - It won't be out of the normal flow
    - The float element is belong to this position
2.  Absolute Position `position: absolute`
    - Absolute position is relative to the parent element
    - Absolute position is out of the flow, block element and inline element  in the normal flow both will ignore the absolutely positioned element
3. Fixed Position `position: fixed`
    - Fixed position is relative to the browser window
    - Abosolute position is out of flow,and the normal block and inline element will ignore the fixed element out of the flow
4. Relative Position `position: relative`
    - Relative is still in the normal flow
    - It is relative to the normal position
5. Others
    - Can use `z-index` to set the priority that show to the visitor, the bigger the value is the great priority the element has
    - Use the `top right bottom left`to set the position

### CSS Table Layout
- `display: table;` to set the table
- `display: teble-row;` to set the row
- `display: table-cell;`to set the cell
- Use div to make up the HTML construction
