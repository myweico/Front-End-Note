# Div - A Block Logical Part
## Unknown
- \<div\> offen use as a container to divide content into clear area
- every element in html can see as a box
- in order to get the effect,you need to consider the position,background and text format(color,line-height,type) and content
- some browsers allow the window smaller than the \<div\> element while some can't,when it is allowed,the content in the \<div\> won't change as the windows
- **"width"** attribution just denite the width of the content,true width need to add the padding ,borders' and margin
- **"auto"** attribution allow the content fill the space exclude the padding,border or margin
- width can be dinite with precentage,which will dicide by the width of its father container
- the **"height"** attribution always be set as auto,which can make sure the content can be display,when we set a exact height,the content would be overflow
- blockquoto always use `text-align`to align the content

## \<div\> Attribution
CSS                 | Effect
---                 | ---
width               | Set the width of the content(auto is default)
height              | Set the height of the content(auto is default)
text-align          | Align the text in the div(in fact for all the inline element and theblockquoto may inherit the value)
background-image    | Set the background image in the div
background-repeat   | Definite how to repeat the background

# Span - A Inline Logical Part
**NOTICE:**  
- Inline element can set margin and padding too,but the padding won't effect the line-height
- img element is different from other inline element, width will effect the size of the picture

# Span and Div 
1. clearly show the struction
2. conveniently setting the css(positive and layout, style)
3. Use to much div or span,the browser can identy the content turely, using the extract meaning tag to structure can help the browser,search engine,reader identify the content