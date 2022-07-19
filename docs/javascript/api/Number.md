---
editLink: false
sidebar: false
menu: false
---

## isNaN()
作用:确定传递的值是否一为`NaN`,并且检查其类型是否为`Number`,

::: tip
它是原来的全局`isNaN()`的更稳妥版本
:::

#### 语法
```javascript
Number.isNaN(value);
```

#### 参数
- `value`:要检测是否为`NaN`的值

#### 返回值
返回一个布尔值,表示给定的值是否是`NaN`

#### 与全局isNaN()区别
Number.isNaN()不会自行将参数转换成数字,只有在参数是值为`NaN`的数字时,都会返回`true`