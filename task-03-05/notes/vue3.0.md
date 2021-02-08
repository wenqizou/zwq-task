ToDoList

- 项目结构

 升级vueCli -版本4.5以上

可以先卸载老版本，再安装新版本

vue create 选择vue3.0，其实默认也是3.0



![image-20210203201801109](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210203201801109.png)





## 自定义指令



![image-20210203212329152](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210203212329152.png)

![image-20210203212408868](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210203212408868.png)





## watchEffect与 watch 有什么不同？

```

import { watchEffect, ref } from 'vue'
setup () {
    const userID = ref(0)
    watchEffect(() => console.log(userID))
    setTimeout(() => {
      userID.value = 1
    }, 1000)

    /*
      * LOG
      * 0 
      * 1
    */

    return {
      userID
    }
 }
```

- 第一点我们可以从示例代码中看到 `watchEffect` 不需要指定监听的属性，他会自动的收集依赖， 只要我们回调中引用到了 响应式的属性， 那么当这些属性变更的时候，这个回调都会执行，而 `watch` 只能监听指定的属性而做出变更(v3开始可以同时指定多个)。
- 第二点就是 watch 可以获取到新值与旧值（更新前的值），而 `watchEffect` 是拿不到的。
- 第三点是 watchEffect 如果存在的话，在组件初始化的时候就会执行一次用以收集依赖（与`computed`同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不需要，因为他一开始就指定了依赖。

### 停止监听

watchEffect 会返回一个用于停止这个监听的函数，如法如下：

```
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

例子来源于官方文档， 上面有链接。





## 响应式vue3.0



- Proxy 对象实现属性监听
- 多层属性嵌套，在访问属性过程中处理下一级属性
- 默认监听动态添加的属性
- 默认监听属性的删除操作
- 默认监听数组的索引和length属性
- 可以作为单独的模块使用





## 核心方法

- reactive/ref/toRefs/computed
- effect-(watch)
- track
- trigger

![image-20210208141911009](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208141911009.png)

![image-20210208142301523](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208142301523.png)



		## 模拟reactive

![image-20210208143122299](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208143122299.png)



## ref

![image-20210208151913141](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208151913141.png)







## vite

静态web服务器

![image-20210208163148077](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208163148077.png)



修改第三方模块路径

![image-20210208163948485](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208163948485.png)



加载第三方

![image-20210208164402413](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208164402413.png)



单文件，两次请求，一次加载, 一次render

@vue/compiler-sfc

![image-20210208165839426](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20210208165839426.png)