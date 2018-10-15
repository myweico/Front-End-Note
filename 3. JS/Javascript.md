#### 书写位置
- 内嵌式`<script type="text/javascript">...</script>
- 引用文件`<script src="1.jpg"><script>`
- 写js不能省分号，没有分号当一行

#### 渲染原理
- 书写位置与渲染顺序相关，即html页面中出现script标签后，会让页面暂停等待脚本的解释和执行，待其完成后再继续下载以及渲染
- 尽量将script写在html结束标签后
- 尽量将js代码写到一个js文件中

#### js输出消息的方式
way | description
--- | ---
`alert("text");` | pop up a alert window
`confirm("message")` | pop up a comfirm window(confirm cancel),it can assign to the variable
`consel.log("message")` | show the message in the console,mainly debug
`prompt("message")` | pop up a prompt window to get the information,the data get is belong to string type
`documnet.write("message")` | output the message in the html,tag is acceptable
`alert("ok,\"i\""")` | output the message with special characters

#### JS
- single line: `//comment`
- multiple lines: `/* comment */`

#### Constitution
- Ecmascript: JS Gramma Norm
- Dom: Manipulate the element
- Bom: Manipulate the browser

#### Trait
- Easy
- Explain and execute
- Base on the object