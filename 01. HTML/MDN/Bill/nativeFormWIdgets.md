# 原生表单部件

## 通用属性

| 属性      | 作用                     |
| --------- | ------------------------ |
| autofocus | 让部件聚焦               |
| disabled  | 禁止部件填写             |
| form      | 指明部件属于的表单       |
| name      | 指明了部件数据提交的名称 |
| value     | 指明了部件的初始值       |

## 文本输入域

通用规范：

- readonly，用户不能修改
- disabled，输入值不能被填写以及不会被提交
- placeholder，文本框中未填写时的提示文本
- size，框的物理尺寸
- length，长度，可以输入的最大字符数

### 单行文本域

出现的情形：

- type 为 text
- input 的 type 没有填写，就是默认值 text
- 当部件不支持时，就是采取默认值 type=type 为 text

### E-mail 地址域

- type 为 email
- 非邮箱将在表单提交时提示错误
- 使用 multiple 属性，将允许用户输入多个邮箱（逗号分隔）
- 在某些设备上弹出适合填写邮箱的虚拟键盘

### 密码域

- type=password
- 会模糊界面的上密码
- 只是在界面层级隐藏密码，对传送过程没有影响

### 搜索域

- type=search
- 和文本域的区别
  - 以圆角或给定一个'x'来清除输入的值
  - 值可以保存的同一站点的多个个页面的自动完成

### 电话域

- type=tel
- 由于世界上电话的格式不一，所以不会对用户输入的值进行任何限制
- 可能会在设备上弹出合适的虚拟键盘

### URL 域

- type=url
- 输入非 url 在提交表单时将会提示错误

### 多行文本域

- 使用 textarea 元素
- 允许用户输入包含硬换行符（回车）的文本
- 额外的属性
  - cols，默认 20，控件的可见宽度
  - rows，控件的课件文本行数
  - wrap，提交表单时，文本自动换行的换行符是否提交
- textarea 是一个闭合元素，默认值写在元素的中间
- textarea 只接受文本内容，放入 textarea 中的内容都会成呈现为纯文本内容

### 下拉内容

两种类型的下拉内容：select box 和 autocomplete box

#### 选择框

- select 元素创建，option 元素指明选项
- option 元素的 selected 属性指定选中值
- option 可以嵌套在 optgroup 元素中
- option 元素的 value 值指定了选中的值，若没有，则元素中间的内容作为提交值

#### 多选选择框

- select 元素添加 multiple 属性
- 选项将会出现在一个显示的列表中，使用系统多选的方式选中多个值

#### 自动补全输入框

- 使用 datalist 元素，为小部件提供建议，自动完成的值，option 指定选项
- 使用 list 属性指定绑定的文本域

```html
<label for="myFruit">What's your favourite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="muSuggestion" />
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>Blackberry</option>
  <option>Lemon</option>
</datalist>
```

- datalist 元素的备用内容

```html
<label for="myFruit">What's your favourite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="muSuggestion" />
<datalist id="mySuggestion">
  <label for="suggestion">or pick a fruit</label>
  <select id="suggestion" name="altFruit">
    <option>Apple</option>
    <option>Banana</option>
    <option>Blackberry</option>
    <option>Lemon</option>
  </select>
</datalist>
```

## 可选中项
- 单选以及复选按钮使用checked属性设置选项的选中状态
- 选项部件与其他部件不一样，若选项没有选中，则不会发送任何东西，包括他们的名字
- 为可以使用fieldset包围每个项目的列表，并使用legend提供列表的描述

### 复选框
- type=checkbox
- checked属性让复选框加载时自动选中
- value为一个数组的时候，选中的值都会加入到这个数组中

### 单选按钮
- type=radio
- name为相同值得选项将会作为同一组单选，只能有一个被选中

## 按钮
三种按钮：
- submit
- reset
- button

使用button元素以及input元素都可以创建按钮，type属性指定创建怎么样的按钮

button以及input元素的不同之处：
- button元素可以使用html内容，input元素只能接受纯文本内容
- button可以拥有一个不同于按钮标签的值（通过将其设置为value属性）

## 高级表单控件
### 数字
- type=number
- min和max属性可以约束其值
- step属性来指定更改的步长

### 滑块
- type=range
- 同样可以使用min，max以及step属性
- 默认的滑块部件没有数值反馈，需要配合js增加可读性

### 日期时间选择器
- 类型有datetime-local, month, time, week

### 拾色器
- type=color

### 文件选择器
- type=file
- 使用multiple属性可以选择多个文件
- 使用accept属性越苏文件类型

### 隐藏内容
有时候由于技术原因，只想提交数据，而不想展示给用户，可以添加一个不可兼得元素，设置其name以及value即可
- type=hidden
```html
<input type="hidden" name="timestamp" value="1285230342">
```

### 图像按钮
属性和img元素一致，其作用就是充当一个提交按钮
- type=image
- 拥有和img元素一致的src，alt，width以及height属性
- 提交时将会得到一个相对于图像左上角的坐标值

### 仪表和进度条
#### 进度条
- 使用progress元素创建，max表示增长的最大值
- 内容不会该元素的路蓝旗的回退，可不支持辅助技术对其发声
```html
<progress max="100" value="75">75/100</progress>
```

#### 仪表
仪表表示一个指示，当其出现在某一个区间的时候提示不同的颜色
- 使用meter元素创建仪表
- min,low, hign, max四个值划分三个区间
- optimum定义了仪表的评判标准（最优解）

详情参考[MDN的仪表和进度条](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/The_native_form_widgets#%E4%BB%AA%E8%A1%A8%E5%92%8C%E8%BF%9B%E5%BA%A6%E6%9D%A1)