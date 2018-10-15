## Date
#### Date Object
```js
var mydate = new Date();
alert(mydate)
alert(Date());
alert(mydate.getDate());    //return the date
alert(mydate.getDay());     //return the day
alert(mydate.getMonth()+1); //return the month
alert(mydate.getFullYear());//return the year
alert(mydate.getHours());   //return the hour
alert(mydate.getMinutes()); //return the minutes
alert(mydate.getSeconds()); //return the seconds
```

## Math
#### Commonly used methods

Methods | Description
--- | ---
`ceil(x)` | get close number upwards
`floor(x)` | get close number downwards
`max(x, y)` | get the max between x and y
`min(x, y)` | get the min between x and y
`pow(x,y)` | return the y power of x
`random()` | return a random number **between 0 and 1**
`round(x)` | round

#### Usage
```js
var n1 = 12;
var n2 = 1.23;
var n3 = 3.98;
var n4 = -12.01;
var n5=Math.ceil(n1);
var n6=Math.floor(n2);
```

#### Math.ceil()
Num | How
--- | ---
Integer | Itself
Decimal | The integer bigger to it closest

#### Math.floor()
Num | How
--- | ---
Integer | Itself
Decimal | The integer smaller than it and cloest to it

