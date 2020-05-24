# zwq-task-01-01
### 简答题

1、a[6]() 执行结果为9，因为for中的var i=0;循环完之后就是9了。作用域的问题

2、会报错，因为let 在if 代码块里，tmp 虽然在上面有定义，但是会优先找代码块中的声明，没有的话再向上找（作用域链），但是let 声明必须在前，不能像var

3、找数组中的最大最小值，可以用Math对象方法
Math.min()-->取最小值
例:
var x = 10, y = -20;
var z = Math.min(x, y);//-20

但是参数必须一个一个传的话，就可以用数组展开运算符
 const arr=[12,34,32,89,4]
 console.log(Math.min(...arr))

4、var 定义的变量会有变量提升，但是let const不会，另外var let 都可以先定义后赋值，但是const不可以，let的作用域是当前块，var 会是全局


5、obj.fun()==>20
this指向问题，正常是谁掉用就指向谁，但是箭头函数将setTimeout 的this外抛给obj，所以还是obj中的this,所以指向obj的a，如果setTimeout 是ES5的写法，就是指向window。那就是10

6、symbol()
没有在项目中实际用过，视频中讲的主要是控制对象的私有变量，因为唯一性可以不让其被点语法直接拿；

7、浅拷贝就是复制变量的栈内存地址，深拷贝则是创建一个新的栈内存地址指向新的栈内存数据

8、JS异步编程就是为了解决JS单线程相对耗时和排队处理机制的问题

EventLoop 主要就是循环监听（）调用栈和队列里面有没有程序要执行，然后将消息队列中的第一位的程序放入调用栈执行

宏任务就可以认为是要执行的回调队列（消息队列）中的任务

微任务则是指在这个宏任务执行的过程中，产生的新的一个小任务，这就不用再去消息队列排队，可以立即执行。


9、
```javascript
new Promise(resolve => {
    console.log(1)
    setTimeout(() => {
        console.log('队列1')
        resolve('hello')
    }, 10)
}).then(res => {
    console.log(2)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('队列2')
            resolve(res + 'lagou')
        }, 10)
    })
}).then(res => {
    console.log(3)
    setTimeout(() => {
        console.log(res + 'I love u')
    }, 10)
})
```
10、Typescript 其实就是JavaScript的一个扩展，优化js 一些语法和强类型的校验

但是ts编译后就是js.毕竟在浏览器中能执行的就是js代码，ts只是在开发阶段给我们提供了很多便捷以及校验处理

11、优点：能够提供很多语法功能， 如泛型、代码提示啊，检验提前报错通知，
缺点：要编译？要学习它自己的一些语法？