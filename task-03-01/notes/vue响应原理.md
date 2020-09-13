# VUE 响应式原理

- 数据驱动
- 响应式的核心原理
- 发布订阅者模式和观察者模式



数据驱动

- 数据响应式、双向绑定、数据驱动
- 数据响应式
  - 数据模型仅仅式不同的JS对象，而我们修改数据时，视图会进行更新，避免了繁琐的DOM操作，提高效率
- 双向绑定
  - 数据改变，视图改变；视图改变，数据也改变
  - 我们使用v-model 表单元素上创建双向数据绑定
- 数据驱动式Vue 最独特的特性之一

### 数据响应式的核心原理

#### vue 2.0

- [Vue2.0深入响应式原理]（https://cn.vuejs.org/v2/guide/reactivity.html）
- MDN-Object.defineProperty
- 浏览器兼容IE8以上（不兼容IE8）



Object.defineProperty

```javascript
<!DOCTYPE html>
<html lang="cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>defineProperty</title>
</head>
<body>
  <div id="app">
    hello
  </div>
  <script>
    // 模拟 Vue 中的 data 选项
    let data = {
      msg: 'hello'
    }

    // 模拟 Vue 的实例
    let vm = {}

    // 数据劫持：当访问或者设置 vm 中的成员的时候，做一些干预操作
    Object.defineProperty(vm, 'msg', {
      // 可枚举（可遍历）
      enumerable: true,
      // 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义）
      configurable: true,
      // 当获取值的时候执行
      get () {
        console.log('get: ', data.msg)
        return data.msg
      },
      // 当设置值的时候执行
      set (newValue) {
        console.log('set: ', newValue)
        if (newValue === data.msg) {
          return
        }
        data.msg = newValue
        // 数据更改，更新 DOM 的值
        document.querySelector('#app').textContent = data.msg
      }
    })

    // 测试
    vm.msg = 'Hello World'
    console.log(vm.msg)
  </script>
</body>
</html>
```

那其实如果多个属性，只要遍历一下就好了

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>defineProperty 多个成员</title>
</head>
<body>
  <div id="app">
    hello
  </div>
  <script>
    // 模拟 Vue 中的 data 选项
    let data = {
      msg: 'hello',
      count: 10
    }

    // 模拟 Vue 的实例
    let vm = {}

    proxyData(data)

    function proxyData(data) {
      // 遍历 data 对象的所有属性
      Object.keys(data).forEach(key => {
        // 把 data 中的属性，转换成 vm 的 setter/setter
        Object.defineProperty(vm, key, {
          enumerable: true,
          configurable: true,
          get () {
            console.log('get: ', key, data[key])
            return data[key]
          },
          set (newValue) {
            console.log('set: ', key, newValue)
            if (newValue === data[key]) {
              return
            }
            data[key] = newValue
            // 数据更改，更新 DOM 的值
            document.querySelector('#app').textContent = data[key]
          }
        })
      })
    }

    // 测试
    vm.msg = 'Hello World'
    console.log(vm.msg)
  </script>
</body>
</html>
```



Vue3.0---Proxy

- 直接监听对象，而非属性
- ES6 中新增，IE不支持，性能由浏览器优化（性能比define....好）

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Proxy</title>
</head>
<body>
  <div id="app">
    hello
  </div>
  <script>
    // 模拟 Vue 中的 data 选项
    let data = {
      msg: 'hello',
      count: 0
    }

    // 模拟 Vue 实例
    let vm = new Proxy(data, {
      // 执行代理行为的函数
      // 当访问 vm 的成员会执行
      get (target, key) {
        console.log('get, key: ', key, target[key])
        return target[key]
      },
      // 当设置 vm 的成员会执行
      set (target, key, newValue) {
        console.log('set, key: ', key, newValue)
        if (target[key] === newValue) {
          return
        }
        target[key] = newValue
        document.querySelector('#app').textContent = target[key]
      }
    })

    // 测试
    vm.msg = 'Hello World'
    console.log(vm.msg)
  </script>
</body>
</html>
```





#### 发布订阅模式和观察者模式

发布/订阅模式

- 订阅者（家长）
- 发布者（老师）
- 信号中心（考试的孩子成绩）

https://juejin.im/post/6844903742936973326

> 我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。**这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）**。



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 自定义事件</title>
</head>
<body>
  <script src="./js/vue.js"></script>
  <script>
    // Vue 自定义事件
    let vm = new Vue()
    // { 'click': [fn1, fn2], 'change': [fn] }
	// vm 内部存储一个对象来绑定事件名称---事件处理fn

    // 注册事件(订阅消息)
    vm.$on('dataChange', () => {
      console.log('dataChange')
    })

    vm.$on('dataChange', () => {
      console.log('dataChange1')
    })
    // 触发事件(发布消息)
    vm.$emit('dataChange')
  </script>
</body>
</html>
```



$emit 可以认为式发布者，$on 可以认为式订阅者



#### 模拟一个发布订阅

```javascript
<!DOCTYPE html>
<html lang="cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>发布订阅模式</title>
</head>
<body>
  <script>
    // 事件触发器
    class EventEmitter {
      constructor () {
        // { 'click': [fn1, fn2], 'change': [fn] }
        this.subs = Object.create(null)
      }

      // 注册事件
      $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
      }

      // 触发事件
      $emit (eventType) {
        if (this.subs[eventType]) {
          this.subs[eventType].forEach(handler => {
            handler()
          })
        }
      }
    }

    // 测试
    let em = new EventEmitter()
    em.$on('click', () => {
      console.log('click1')
    })
    em.$on('click', () => {
      console.log('click2')
    })

    em.$emit('click')
  </script>
</body>
</html>
```



#### 观察者模式

- 观察者（订阅者）--Watcher
  - update()：当事件发生，具体要做的事
- 目标（发布者）-- Dep
  - subs数组：存储所有观察者
  - addSub()：添加观察者
  - notify()：当事件发生，调用所有观察者的update()方法
- 没有事件中心

