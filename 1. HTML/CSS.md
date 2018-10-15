## 加入css
- 在HTML文件中的<style>便签中加入样式
- 引入外部链式表`<link type="text/css" rel="stylesheet" href="lounge.css">`,type说明信息类型为“text/css”（在HTML5中是可选的）,rel
指定了HTML文件与所链接的文件之间的关系，href指定css文件的位置

## 选择器

## Bullet Points
- 规则、选择器、属性、属性名
- 选择器可以并列，类、ID、子类
- 属性有继承性、继承覆盖性
- [W3C的CSS验证工具](https://jigsaw.w3.org/css-validator/)可以验证css文件

## 其他设置
Code                    | Effect
---                     | ---
`line-height: 1.2em`    | 设置行距，行之间的距离

## Selection
- univesal 
    - `\* {sRules}`
- element
    - `E {sRules}`
- class
    - `.class {sRules}`
- ID
    - `#ID {sRules} `
- Relation:
    - `E1 E2`, Descendant Combinator
    - `E1 > E2`, Child Combinator
    - `E1 + E2`, Adjacent Sibling Combinator
    - `E1 ~ E2`, General Sibling Combinator
- Attribution:
    - `E[attr]`, combinate the element with attr
    - `E[attr = "value"]`, combinate the element with attr which is value
    - `E[attr ~= "value"]`, combinate a element with attr, and its attr list contain value(space split)
    - `E[attr |= "value"]`, combinate a element with attr, and its attr list splited with "-" bigins with value
    - `E[attr ^= "value"]`, combinate a element with attr, and its attr's prefix contains value
    - `E[attr $= "value"]`, combinate a element with attr, and attr's suffix contains value
    - `E[attr *="value"]`, combinate a element with attr, and attr contains string value
- Pseudo-Classes Selectors
    - `E:link`, set the style for links which have not been visited
    - `E:visited`, set the style for links that have been visited
    - `E:hover`, set the style for the element when the cursor hovering above it
    - `E:active`, set the style for the element when cliking the mouse
- Strcutrual Pseudo-Class Selectors
    - `E:root`
    - `E:nth-child(n)`,parent's nth child,1,2,3,2n+1,2n,odd,even
    - `E:nth-last-child(n)`, same as the nth-child(n) but the sequence is reversed
    - `E:nth-of-type(n)`,parent's nth E type,1,2,3,2n,2n+1,odd,even
    - `E:nth-last-of-type(n)`
    - `E:first-child`
    - `E:last-child`
    - `E:first-of-type`
    - `E:last-of-type`
    - `E:only-chlid`, select the elements, which only contain one child E
    - `E:only-of-type`, select the elements,which only contain one type E
- UI Element States Pseudo-Classes Selectors
    - `E:enabled`
    - `E:diabled`
    - `E:checked`
- Not Pseudo-Classes Selectors
    - `E:not(s)`
- Group Selectors
    - `E1, E2, E3 {sRules};`

when it set \<a\> color, all the effect of pseudo of a tag will lose efficacy
#### Why call it pseudo classes?  
Because it look like a class,and you can't find it in your HTML file.  
Taking E:link as example, at first, brower will scan the link and find out which have not been visited, the browser will divide these into the unvisited category and the corresponding css takes effect.

#### Why it is called Cascading Style Sheet?
- Becase it has different kinds of style sheet and they all have priority, authors > users > defaults
- And the repetive style will be cover too

#### The pocess of finding the style of \<h1\>'s font-size
1. Collecting all the style sheets
2. Get all style about \<h1\> font-size 
3. Sorting by defaults, authors and users
4. Sorting by the priority
5. The hignest priority decide the font size of \<h1\>,if it has a conflict, the
lower has the higher priority


#### How to know the priority?
1. 3 figures 0(a) 0(b) 0(c)
2. id:a++, class:b++, elem name:c++

**others**  
- user can use `!important`to cover author's css
