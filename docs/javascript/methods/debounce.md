---
editLink: false
sidebar: false
---
## 防抖
就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间;

```javascript
function debounce(func,wait,immediate){
    /*  
        func:
        wait:指定等待时间
        immediate:是否立即执行func方法
    */

    var timeout,
        result;         //返回func返回的结果--只有在立即执行情况下都会返回
    return function(){
    
        var context = this,         //解决this指向
            args = arguments;       //解决事件对象(event)
            
        if(timeout) clearTimeout(timeout)
        
        if(immediate){
            var callnow = !timeout;

            timeout = setTimeout(function(){
                timeout = null;
            },wait)
            
            if(callnow) result = func.apply(context,args);
            
        }else{
            timeout = setTimeout(function(){
                func.apply(context,args);
            },wait)
            
        }
        
        return result
    }
}
```

## 节流
指定时间内，只执行一次事件。  

实现节流有两个版本:
- 基于时间戳
- 基于定时器

### 基于时间戳
当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为`0`，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行.

```javascript
function throttle(func,wait){
    var previous = 0;
    
    return function(){
    
        var now = new Date().valueOf(),
            context = this,         //解决this指向
            args = arguments;       //解决事件对象(event)
            
        if(now - previous > wait){
            func.apply(context,args);
            previous = now;
        }
    }
}
```
::: tip 
基于时间戳的节流,`func`会立刻执行,事件停止触发后就不会再执行`func`
:::

### 基于定时器
当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。

```javascript
function throttle(func,wait){
    var timeout;
    
    return function(){
        var context = this,         //解决this指向
            args = arguments;       //解决事件对象(event)
        
        if(!timeout){
            timeout = setTimeout(function(){
                func.apply(context,args)
                timeout = null;
            },wait)
        }
    }
}
```
::: tip  
基于定时器的节流,`func`会在 n 秒后第一次执行,事件停止触发后依然会再执行一次`func `
:::

> 参考(chao)[冴羽](https://github.com/mqyqingfeng/Blog/issues/22)大神的博客.  
> 这里只取了自己常用的内容,完整内容请查看[冴羽](https://github.com/mqyqingfeng/Blog/issues/22)博客