---
editLink: false
sidebar: false
---

# this

> `this`是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。  

## 为什么要使用this呢？
this提供了一种更优雅的方式来隐式“传递”一个对象引用  

```javascript
function indentify(){
    return this.name.toUpperCase();
}

function speak(){
    var greeting ="Hello I`m " + indentify.call(this);
    console.log(greeting); 
}

var me = {
    name:"Kyle",
}

var yout = {
    name:"Reader",
}

speak.call(me)   //Hello I`m KYLE
speak.call(yout)    //Hello I`m READER
```

## this存在的误区
- this指向函数自身
- this指向函数的作用域

## 调用位置
在理解this的绑定过程之前，首先要理解`调用位置`：函数在代码中被调用的位置。  
查找`调用位置`就要分析`调用栈`.
下面通过一段代码来理解`调用位置`与`调用栈`
```javascript
function baz(){
    //当前调用栈 baz
    //因此当前调用位置是全局作用域
    bar()  // bar的调用位置
}

function bar(){
    // 当前调用栈是baz -> bar
    // 因此调用位置在baz中

    foo() // foo的调用位置
}

function foo(){
    // 当前调用栈是 baz -> bar -> foo
    // 因此调用位置在bar中
}

baz()  // <-- baz的调用位置
```
> 调用栈中的第二个位置就是真正的调用位置

## 绑定规则
找到函数的调用位置之后就要判断`this`使用了下面哪条规则

#### 默认绑定
默认绑定即:**独立函数调用**  
可以把这条规则看作是无法应用其他规则时的默认规则

```javascript
function foo(){
    console.log(this.a);
}
var a = 123;
foo();   // 123
```
> 在上面代码中 ,foo()直接使用不带任何修饰的函数引用进行调用,因此只能使用默认绑定,无法应用其他规则 

如果使用了严格模式(strict mode),则不能将全局对象用于默认绑定,因此this会绑定以到undefined

```javascript
function foo(){
    "use strict";
    console.log(this.a);
}
var a = 123;
foo();   // TypeError: this is undefined
```

这时需要注意一个细节:如果函数foo()在严格模式下调用,则不影响默认绑定

```javascript
function foo(){
    // foo 处于非严格模式下
    console.log(this.a);
}

var a = 123;

(function(){
    "use strict"
    // foo 在严格模式下调用并不影响 默认绑定
    foo();   // 123
})()
```
 
####  隐式绑定
调用位置上是否有上下文对象.

```javascript
function foo(){
    console.log(this.a)
}

var obj = {
    a:2,
    foo:foo,
}

obj.foo()   // 2
```

> 当函数引用有上下文对象时,隐式绑定规则会把函数调用中this绑定到这个上下文对象.


对象属性引用链中只有上一层或者说最后一层在调用位置中起作用

```javascript
function foo(){
    console.log(this.a)
}

var obj2 = {
    a:42,
    foo:foo,
}

var obj1 = {
    a:2,
    obj2:obj2,
}

obj1.obj2.foo();   // 42
```

##### 隐式丢失
隐式绑定最大的问题就是容易出现函数丢失绑定对象

```javascript
function foo(){
    console.log(this.a)
}

var obj = {
    a:2,
    foo:foo,
}

var bar = obj.foo;   // 函数别名
var a = "oops,global";   //
bar();   //oops,global
```
> bar是obj.foo的一个引用,实际上bar引用的是foo函数本身,因此,bar()其实是一个不带任何修饰的函数调用,使用了默认绑定规则

```javascript
function foo(){
    console.log(this.a)
}

function doFoo(fn){
    fn()
}

var obj = {
    a:2,
    foo:foo,
}

var a = "oops global";

doFoo(obj.foo);   //oops global

```
> 参数传递实际是一种隐式赋值

如果把函数传语言内置的函数而不是传入自己声明的函数,结果是一样的
```javascript
function foo(){
    console.log(this.a)
}

var obj = {
    a:42,
    foo:foo,
}

var a = "oops, global",

setTimeout(obj.foo,1000);   // oops, global
```

### 显式绑定
显式绑定使用的是函数的`call()`和`apply()`方法  
JavaScript提供的绝大数的函数以及自己人创建的所有函数都可以使用`call()`和`apply()`方法

它们的第一个参数是一个对象,是给`this`准备的,接着在调用函数时将其绑定到this.

```javascript
function foo(){
    console.log(this.a)
}

var obj = {
    a:2
}

foo.call(obj)  // 2
```

>如果传入的是一个原始值,这个原始值会被转换成它的对象形式(也就是 new String(), new Boolean()).


显式绑定依然无法解决丢失绑定的问题,不过可以通过显式绑定的变种来解决绑定丢失的问题

#### 1.硬绑定

```javascript
function foo(){
    console.log(this.a)
};

var obj = {
    a:42,
}

var bar = function(){
    foo.call(obj);
}

bar();  // 2
setTimeout(bar,100);  // 2
//即使对bar使用显式绑定,也改变不了foo的this指向
bar.call(window);   // 2
```

可以通过创建一个可以重复使用的辅助函数:
```javascript
function foo(something){
    console.log(this.a,something)
    return this.a + someting
}

function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments);
    }
}

var obj = {
    a:42,
}

var bar = bind(foo,obj);
var b = bar(3);   // 2 3;
console.log(b);  // 5
```

由于硬绑定是一种非常常用的模式,所以ES5提供了内置的方法--`bind`

```javascript
function foo(something){
    console.log(this.a,something)
    return this.a + someting
}


var obj = {
    a:42,
}

var bar = foo.bind(obj);
var b = bar(3);   // 2 3;
console.log(b);  // 5
```

#### 2.API调用的"上下文"
第三方库的许多函数,以及JavaScript语言和宿主环境中许多新的内置函数,都提供了一个可行参数,通常被称为"上下文",其作用和`bind()`一样,确保回调函数使用指定的`this`
```javascript
function foo(el){
    console.log(el,this.id);
}

var obj = {
    id:"awesome",
}

[1,2,3].forEach(foo,obj);
// 1 awesome  2 awesome  3 awesome
```


### new绑定
在Javascript中,构造函数只是一些使用`new`操作符时被调用的函数.它们并不属于某个类,也不会实例化一个类,只是被`new`操作符调用的普通函数而已.

使用new来调用函数时,会执行以下操作:
- 创建(或者构造)一个全新的对象,
- 这个新对象会被执行[[Prototype]]连接。
- 这个新对象会绑定到函数调用的this。
- 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。  

## 优先级
`new` > `显式绑定` > `隐式绑定` > `默认绑定`

## 绑定例外
在某些场景下this的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用的可能是默认绑定规则。

#### 被忽略的this
如果把null或undefined作为this的绑定对象传入call apply 或者 bind,这些值在调用的时候会被忽略,实际上应用的是默认绑定规则:
```javascript
function foo(){
    console.log(this.a)

}

var a = 2;
foo.call(null);  // 2
```

忽略this通常用在`展开数组`和`函数柯里化`
```javascript
function foo(a,b){
    console.log("a:" + a + ".b:" + b);
}

//展开数组
foo.apply(null,[2,3]);  // a:2,b:3

// 使用bind(...)实现柯里化
var bar = foo.bind(null,2);
bar(3);  //a:2,b:3
```
这两种方法都不关心this指向的对象，如果仍需要传入一个占位值，这时null可能是一个不错的选择

总是使用null来忽略this绑定可能产生一些副作用,“更安全”的做法是传入一个特殊的对象，把this绑定到这个对象不会对你的程序产生任何副作用
```javascript
var obj = Object.create(null);

function foo(a,b){
    console.log("a:" + a + ".b:" + b);
}

//展开数组
foo.apply(obj,[2,3]);  // a:2,b:3

// 使用bind(...)实现柯里化
var bar = foo.bind(obj,2);
bar(3);  //a:2,b:3
```


#### 间接引用
间接引用最容易发生在赋值的时候
```javascript
function foo(){
    console.log(this.a)
}

var a = 2;
var o = {a:3,foo:foo}
var p = {a:4}

o.foo();   // 3
(p.foo = o.foo)();   // 2   可以将这时理解成立即执行函数
```

#### 软绑定
给默认绑定指定一个全局对象和undefined以外的值，就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改this的能力。
```javascript
if(!Function.prototype.softBind){
    Function.prototype.softBind = function(obj){
        var fn = this;
        var curried  = [].slice.call(arguments,1);
        var bound = function(){
            return fn.apply(
                (!this || this === (window || global))?
                obj:this,
                curried.concat.apply(curried,arguments)
            )
        }
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}
```

使用
```javascript
var obj = {name:'obj'},
    ojb2 = {name:'obj2'},
    obj3 = {name:'obj3'};

var bar = foo.softBind(obj);
bar();   // obj
obj2.foo = foo.softBind(obj);
obj2.foo()   // obj2
bar.call(obj3);  //obj3
setTimeout(obj2.foo,10)  // obj
```

#### this词法
ES6新语法箭头函数并不适用上面四种规则,箭头函数的this是根据外层（函数或者全局）作用域来决定--词法作用域

```javascript
function foo(){
    //返回一个箭头函数
    return (a) => {
        // this 继承自foo
        console.log(this.a)
    }
}

var obj1 = {
    a:2
}

var obj2 = {
    a:3
}

var bar = foo.call(obj1);
bar.call(obj2);  // 2 不是3
```
::: tip 
foo()内部创建的箭头函数会捕获调用时foo()的this
:::


>内容整理于《你不知道的JavaScript 上》