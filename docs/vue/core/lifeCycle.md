---
editLink: false
sidebar: false
---
> 本文不涉及`keep-alive`的场景和错误处理的场景.

### beforeCreate
`new Vue(options)`之后,会初始化`事件`和`生命周期`  
完成之后调用`beforeCreate`生命周期
```javascript
callHook(vm,'beforeCreate')
```



### created
这个阶段完成应用数据与选项的初始化

- 初始化`inject`
- 初始化`state`
    - 初始化`props`
    - 初始化`methods`
    - 初始化`data`
    - 初始化`computed`
    - 初始化`initWatch`
- 初始化`provide`  

> 由于`props`比`data`先初始化,所以在`data`中使用`props`可以的,反之则不行.

然后调用`created`生命周期
```javascript
callHook(vm,'created')
```

### beforeMount
在这个阶段完成对`template`编译和优化,但是这个阶段分两种情况

- runtime-compile
    - 编译`template`部分,生成`ast`抽象语法
    - 优化这个`ast`,标记静态节点.(渲染过程中不会变的那些节点,优化性能)
    - 根据`ast`,生成`render`函数

- runtime-only
    - 直接进入到`mountComponent`阶段.

调用`beforeMount`生命钩子
```javascript
callHook(vm,'beforeMount')
```
### mounted
> 定义好`渲染组件函数`,并通过`Watcher`执行
```javascript
updateComponent = () =>{
    vm._update(vm._render(),hydrating)
}
```
- `vm._render()`:上一步`render()`生成的`vnode`,
- `vm._update()`:则会对`vnode`进行`patch`操作,帮我们把`vnode`通过`createElm`函数创建新节点并渲染到`dom节点`

在这个阶段,将完成组件挂载.
通过`beforeMount`阶段定义好`渲染组件函数`,接下来就是执行这个函数,由响应式核心类`Watcher`负责执行.
```javascript
new Watcher(vm,updateComponent,noop,{
    before(){
        if(vm._isMounted){
            callHook(vm,'beforeUpdate')
        }
    }
},true/*isRenderWatcher*/)
```
`mounted`之后页面已经展示到浏览器中

调用`mounted`钩子
```javascript
callHook(vm,'mounted')
```

### beforeUpdate
当一个响应式属性被更新后,触发了`Watcher`的回调函数,也就是`vm._update(vm._render())`,在更新之前,会先调用刚才在`before`属性上定义的函数.

由于`Vue`异步更新机制,`beforeUpdate`的调用已经在`nextTick`中

```javascript
nextTick(flushSchedulerQueue)

function flushSchedulerQueue {
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
     // callHook(vm, 'beforeUpdate')
      watcher.before()
    }
 }
}
```

```
callHook(vm,'beforeUpdate')
```

### updated
经过一系列的`patch`,`diff`流程后,组件重新渲染完毕,调用`updated`钩子
```javascript
callHook(vm,'updated')
```

### beforeDestory
在`patch`过程中,如果发现有组件在下一轮渲染中消失了,那么就会调用`removeVnodes`进入组件销毁流程.
`removeVnodes`会调用`vnode`的`destory`生命周期,而`destory`内部会调用我们相对比较熟悉的`vm.$destory()`  
这时就会调用`callHook(vm,'beforeDestory')`(`keep-live`包裹的子组件除外)

### destoryed
经过一系列的清理逻辑,清除父子关系,`Watcher`关闭等逻辑.
然后调用`callHook(vm,'destoryed')`

> 整理于 [Vue 的生命周期之间到底做了什么事清？（源码详解）](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247483690&idx=1&sn=0b4571948d961031eefe24bd8697492e&chksm=eb043953dc73b045e241e0316708ef20a02b25be44869a162d4555194a66cea144ec90895a38&scene=178&cur_album_id=1337062339644014592#rd)