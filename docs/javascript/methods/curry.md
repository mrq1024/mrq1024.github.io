---
editLink: false
sidebar: false
---

## 柯里化
是一种处理函数中含有多个参数的方法，并在只允许单一参数的框架中使用这些函数。  

能把一个带有多个参数的函数转换一系列嵌套函数。它返回一个新函数，这个新函数期望传入下一个参数。当接收足够的参数后，会自动执行原函数。


### 使用Loash提供的柯里化函数
**语法**:`_.curry(func,[arit=func.length])`

创建一个函数，该函数接收func的参数，要么调用func返回的结果，如果func所需的参数已经提供，则直接返回func执行的结果。或返回一个函数，接受余下的func参数的函数。可以使用func.length设置需要累积的参数个数

```javascript
let obj = function(a,b,c){
    return [a,b,c];
}

const curried = _.curry(obj);
curried(1)(2)(3);       // [1,2,3]
curried(1,2)(3);        // [1,2,3]
curried(1)(2,3);        // [1,2,3]
```

::: tip
在数学和理论计算机科学中的柯里化函数，一次只能传递一个参数。而对于Javascript语言来说，在实际应用中的柯里化函数，可以传递一个或多个参数。
:::

### 柯里化作用
1. 参数复用
```javascript
function buildURL (scheme,domain,path){
    return `${scheme}://${domain}/${path}`;
}

buildURL('https','github.com','sfgihvke/mzy');
buildURL('https','github.com','ms/mzy');

//使用柯里化之后
const _ = require(lodash)
const buildURLCurry = _.curry(buildURL);

//实现参数复用
const myGitPath = buildURLCurry('https','github.com');
let sfgihvkeURL = myGitPath('sfgihvke/mzy');
let msURL = myGitPath('ms/mzy');
```

2. 延迟计算/运行
```javascript
let add = function (a,b){
    return a + b;
}

const curried = _.curry(add);
const plusone = curried(1);   //不传递第二个参数从达到延迟计算的目的
```

### 实现函数柯里化

**原理**:  
当柯里化后的函数接受够足够的函数后就开始执行原函数，如果接收到的参数不足的话，就会返回一个新的函数来接收余下的参数

```javascript
function curry(func){
    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this,args)
        }else{
            return function(...args2){
                return curried.apply(this,args.concat(args2));
            }
        }
    }
}
```