---
sidebar: false
editLink: false
---

`Lambda`就是一小段可以作为参数传递的代码。  

> Lambda表达式在底层被转换成了匿名类的实现方式。这就表明，每调用一次Lambda表达式，都会创建一个新的匿名类实例，当然也会造成额外的内存和性能开销。解决办法是使用`内联函数`

语法结构

```kotlin
{参数1:参数类型,参数2:参数类型 -> 函数体}
```

需求:找出最长单词的水果名

```kotlin
val list = listOf("Apple","Banana","Orange","Pear","Grape","Watermelon");
val lambda = {fruit:String -> fruit.length};
val maxFruitName = maxBy(lambda);
```

直接将lambda表达式传入maxBy函数中
```kotlin
val maxFruitName = maxBy({fruit:String -> fruit.length});
```

当Lambda参数是函数的最后一个参数时，可以将Lambda表达式移到函数括号的外面
```kotlin
val maxFruitName = maxBy(){fruit:String -> fruit.length}
```

如果Lambda参数是函数的唯一一个参数的话，还可以将函数的括号省略
```kotlin
val maxFruitName = maxBy{fruit:String -> furit.length}
```

由于Kotlin拥有出色的类型推导机制，Lambda表达式中的参数列表其实在大多数情况下不必声明参数类型
```kotlin
val maxFruitName = maxBy{fruit -> fruit.length}
```

当Lambda表达式的参数列表中只有一个参数时，也不必声明参数名，而是可以使用it关键字来代替
```kotlin
val maxFruitName = maxBy{it.length}
```
