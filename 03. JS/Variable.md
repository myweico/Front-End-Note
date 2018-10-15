#### Dinification
```js
var wukong;
wukong = 123;
alert("wukong");
```
- do not need define the variable kind

#### Name rules
- Can't use number as the initial
- Can't use the character as the initial
- Best not use the reserving name
- Best not use the Chinese name
- Case sensitively

#### Get the variable
```js
var Centigrade = prompt("Please input the centigrade:");
var Fahrenheit = Centigrade * 9 / 5 + 32;
alert(Fahrenheit);
```

## Data Type
#### Check the data type
- Function:`typeof()`  
- Usage:
    ```js
    var n1=1223;
    alert(typeof(n1));
    ```

#### Simeple Data Type
**number**
- positive number, negetive number,decimal
    ```js
    var n1 = 123; //decimal
    var n2 = 0x123; //hexadecimal
    var n3 = 0123; //octonary
    ```
- range
    - Max:+/- 1.7976931348623157*10<sup>308</sup>
    - Min: +/- 5*10<sup>-324</sup>

- NaN
    - NaN is belong to number type
    - Don't exist any value equil to NaN(include NaN)
    - isNaN():any value that can't change to Number will return true

**String**  
```js
var n5="Weico";
var n6="123";
```
- Use “+” to incorporate the string

**Boolean**  
```js
var n1=2;
var n2=3;
alert(n1==n2);  //false
alert(n1<n2);   //true
```
- Boolean only has two value: true and false, and case is sensitive
- Exist value equil to Boolean
- Change into Boolean type

Type | To true | To false
--- | --- | ---
Boolean | true | false
String | Any nonempty string | Empty string
Number | Any non-zero number(include infinity) | zero
Object | Any object | null
Undefined | **n/a???** | undefined


**undefined**  
```js
var n1;         //define but no assigning
```

**null**  
```js
var n2 = null;  //the variable is not be referred
```


#### Complex Variable
**array**  
```js

// Use new to generate an array
var arr1 = new Array();   

// Creat a new array directly
var arr2 = [];      

// Use subscript to assign
arr[1] = 23;
arr[2] = "Chinese";         
arr[3] = "American";

//Initialization
var arr2 = [12, 4, 56, "中国人", "美国人"]; 

alert(arr1);

// Use circulation to traverse the array
for(var i=0; i<5; i++){
    alert(arr2[i]);
}

//Use length attribution
for(var i=0; i<arr1.length; i++){
    alert(arr1[i]);
}

//Optimization: Assign the length to a variable first
for(var i=0,n=arr1.length; i<n; i++){
    alert(arr1[i]);
}

//The length of the array
num = arr1.length;

//The merge of the arrays-arr.concat
arr3 = [1, 2, 3, 4, 5];
arr4 = ["ok", "fine"];
arr5 = arr3.concat(arr4);
alert(arr5);

//Join something between the array element
arr6 = [1, 2, 3, 4, 5];
arr7 = arr6.join("||");
alert(arr7);
```
- object

#### Arithmatic Operator
**Add**
- num + num = num
- num + str = str
- str + str = str

**Subtract**
- num - num = num
- num - num_str = num
- num - not_num_str = NaN(Not a number,but a number type)

**Divide**
- num / num = num
- num / num_str = num
- num / not_num_str = NaN
- num / 0 = Infinity

**Mod**  
%


## Type exchange
#### Number to strings
**String()**  
```js
var n1 = String(n1);
```

**variaty.toString()**  
```js
var n2 = 1234;
n3 = n2.toString();
```

#### String to number
**Number**  
```js
var n1 = "123";
var n2 = "123str";
var n3 = "str123";
var n4 = "string";
var n5 = "12.3"

alert(Number(n1)); // 123,number
alert(Number(n2)); // NaN,number
alert(Number(n3)); // NaN,number
alert(Number(n4)); // NaN,number
alert(Number(n5)); // 12 ,number
```

**parseInt()**  
```js
var n1 = "123";
var n2 = "123str";
var n3 = "str123";
var n4 = "string";
var n5 = "12.3"

alert(parseInt(n1)); // 123,number
alert(parseInt(n2)); // 123,number
alert(parseInt(n3)); // NaN,number
alert(parseInt(n4)); // NaN,number
alert(parseInt(n5)); // 12 ,number
```

**parseFloat()**  
```js
var n1 = "123";
var n2 = "123str";
var n3 = "str123";
var n4 = "string";
var n5 = "12.3"

alert(parseFloat(n1)); // 123,number
alert(parseFloat(n2)); // 123,number
alert(parseFloat(n3)); // NaN,number
alert(parseFloat(n4)); // NaN,number
alert(parseFloat(n5)); // 12.3,number
```

#### To Boolean
**Boolean()**  
```js
var n1 = 123;
var n2 = "345";
var n3;
var n4 = null;
var n5 = 0;
var n6 = Infinity;

alert(Boolean(n1)); //true
alert(Boolean(n2)); //true
alert(Boolean(n3)); //false
alert(Boolean(n4)); //false
alert(Boolean(n5)); //false
alert(Boolean(n6)); //true
```

#### Implicit Type Exchange
1. 
```js
var n1 = 12;
var n2 = "3";
var n3 = n1 - n2;
alert(n3);              //9
alert(typeof(n3));      //number
```

## Operators
#### Equal Mark
Sign | Description
--- | ---
= | Assignment
== | Judge if the data is equal regardless of the type
=== | Not only judge the data but also the type
!= | Judge if the data 
!=== | Not only judge the data but also the type

#### Auto-Increase
Sign | Description
--- | ---
a++ | Execute first,then increase
++a | Increase first then execute