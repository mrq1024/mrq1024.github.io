---
sidebar: false
editLink: false
---
## 函数
函数是用来支行代码的载体,可以在一个函数里面编写很多行代码,当支行这个函数的时候,函数中的代码会全部运行.  

函数语法规则如下:
```kotlin
fun methodName(param1:Int,param:String):Int{
    return 0
}
```
函数语法不做过多解释,这里只记录与js不同的地方
- 参数  
    参数声明格式是 *参数*:*参数类型(数据类型)*;
    如果没有参数只写一个括号就行了
- 函数返回值类型  
    1: 参数括号后面的`:type`用来定义函数的返回值类型  
    2: 如果函数没有返回值,这部分可以不写  

定义一个函数
```kotlin
fun largerNumber(num1:Int,num2:Int):Int{
    return max(num1,num2);
}
```

当函数只有一行代码的时候,可以将代码直接写在函数定义尾部,而不用写函数体
```kotlin
fun largerNumber(num1:Int,num2:Int):Int = max(num1,num2); 
```
   
借助于`kotlin`类型推导机制加上上面函数的简写方式是通过`=`来实现,可以进一步简写
```kotlin
fun largerNumber(num1:Int,num2:Int) = max(num1,num2);
```

#### 函数可性修饰符
需要使用哪种修饰符时，直接定义在fun关键字的前面即可
- `public`:对所有类都可见.在kotlin中为默认选项
- `private`:只对当前类内部可见
- `protected`:只对当前类和子类可见
- `internal`:只对同一模块中的类可见

#### 函数参数默认值
在定义函数的时候给任意参数设定一个默认值，这样当调用此函数时就不会强制要求调用方为此参数传值，在没有传值的情况下会自动使用参数的默认值。
```kotlin
fun printParams(num:Int,str:String = "hello"){
    println("num is $num,str is $str")
}
printParams(123);   //num is 123,str is hello
```

如果将第一个参数设定默认值,就必须换一种传值的方式
```kotlin
fun printParams(num:Int = 123,str:String){
    println("num is $num,str is $str")
}
printParams("hello");   //此时kotlin就会报错,因为kotlin会将hello当作参数num的值,而num的数据类型是Int,

//可以使用下面的方法来解决
printParams(num = 123,str = "hello");

//num有默认值,因此可以省略
printParams(str = "hello"); //num is 123,str is hello

```

#### 静态函数
静态方法在某些编程语言里面又叫作类方法，指的就是那种不需要创建实例就能调用的方法，所有主流的编程语言都会支持静态方法这个特性。

和绝大多数主流编程语言不同的是，Kotlin却极度弱化了静态方法这个概念，想要在Kotlin中定义一个静态方法反倒不是一件容易的事。

Kotlin提供了比静态方法更好用的语法特性--单例类。

```kotlin
object Util{
    fun doAction(){
        println("do action")
    }
}
// 调用
util.doAction();     //直接调用就可以了
```

使用单例类的写法会将整个类中的所有方法全部变成类似于静态方法的调用方式,这样在一些使用场景并不是我们想要结果
这个时候就可以使用`companion`关键来实现
```kotlin
class Util{
    doAction1(){    //调用这个方法必须实例化util
        println("doAction1")
    }
    companion object{
        doAction2(){
            println("doAction2")
        }
    }
}
```
doAction2()方法其实也并不是静态方法,`companion object`这个关键字实际上会在Util类的内部创建一个伴生类，而doAction2()方法就是定义在这个伴生类里面的实例方法。

Kotlin确实没有直接定义静态方法的关键字，但是提供了一些语法特性来支持类似于静态方法调用的写法，这些语法特性基本可以满足平时的开发需求了。

如果你确确实实需要定义真正的静态方法， Kotlin仍然提供了两种实现方式:**注解**和**顶层方法**:

##### 注解的实现方式

前面使用的单例类和`companion object`都只是在语法的形式上模仿了静态方法的调用方式，实际上它们都不是真正的静态方法。因此如果你在Java代码中以静态方法的形式去调用的话，你会发现这些方法并不存在。而如果我们给单例类或`companion object`中的方法加上`@JvmStatic`注解

```kotlin
class Util{
    fun doAction1(){
        println("do action1")
    }
    
    companion object{
    
        @JvmStatic 
        fun doAction2(){
            println("do action2")
        }
    }
}
```

##### 顶层方法
那些没有定义在任何类中的方法就被称为**顶层方法**，比如我们在上一节中编写的main()方法。
Kotlin编译器会将所有的顶层方法全部编译成静态方法，因此只要你定义了一个顶层方法，那么它就一定是静态方法.

创建顶层方法方法
右击`包名 -> New -> Kotlin File/Class`,在弹出对话框中输入文件名即可.创建类型要选择`File`,在创建的这个文件中所有方法都会被编译成静态方法
```kotlin

// Help.kt文件
fun doSomething(){
   println("do something") 
}

```
如果是在Kotlin代码中调用的话,所有的顶层方法都可以在任何位置被直接调用，不用管包名路径，也不用创建实例，直接键入doSomething()即可

如果是在Java代码中调用，你会发现是找不到doSomething()这个方法的，因为Java中没有顶层方法这个概念，所有的方法必须定义在类中.刚才创建的Kotlin文件名叫作Helper.kt，于是Kotlin编译器会自动创建一个叫作HelperKt的Java类,因此在Java中使用HelperKt.doSomething()的写法来调用就可以了
```java
Helpkt.doSomethine();
```