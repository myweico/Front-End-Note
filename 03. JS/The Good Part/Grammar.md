# Grammar
## Comment
1. Use `/* comment */`,but it is easy to cause the problem,like
```js
/*
    var rm_a = /a*/.match(s);
*/
```
2. Use `//`,it is recommended

3. The comment need describe the code exactlly or it is better to delete it


## Name
1. Start with letter, '_' and '$'
2. Can't use reserved words or key words

## Number
1. Javascript only has a number type 
2. It is represented internally as a 64-bit float point number 
3. 1 is equal to 1.0 internally
4. NaN is a number, it represents an operation result that can't be got normally
5. Infinity represents a number bigger than the value that javasript can represent

## String
1. String literal can be nest in the `""` and `''`, it possibly contains 0 or more characters
2. `\{char}` represent a eacape character
3. All the character in javascript is 16-bit
4. Character type does not exist in javascript,use a single character string to represent it
5. Escape character is not allowed to insert into the string normally
6. Use \u to signify a number character code,`"A" === "\u0041"`
7. `"seven".length == 5`
8. String can't be changed once you create it
9. You can use '+' to merge the string