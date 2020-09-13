# vue-router 源码剖析


### 手写Vue Router

vue Router 的两种模式history & hash 模式

前置知识点：

- 插件
- 混入
- vue.observable()
- 插槽
- render函数
- 运行时和完整版的Vue



#### Hash 模式

- URL中# 后面的内容作为路径地址
- 监听**hashchange**事件
- 根据当前路由地址找到对应组件重新渲染

#### History 模式

- 通过history.pushState() 方法改变地址栏
- 监听**popstate** 事件
- 根据当前路由地址找到对应组件重新渲染



### vue Router 模拟实现

- 回顾Vue Router的核心使用

  ```javascript
  //注册插件
  //Vue.use() 内部调用传入对象的install 方法，如果传入的函数，就会直接调用这个函数
  
  Vue.use(VueRouter)
  // 创建路由对象
  const router = new VueRouter({
  routes: [
  { name: 'home', path: '/', component: homeComponent }
  ]
  })
  // 创建 Vue 实例，注册 router 对象
  new Vue({
  router,
  render: h => h(App)
  }).$mount('#app')
  
  ```

  



<img src="C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\1.png" style="zoom: 67%;" />

实现分析：

- options 毫无疑问，
- routeMap 存储options中定义的路由的映射关系
- data 中有个current 属性记录当前的路由地址，而且需要一个响应式对象，data 对象是个响应式对象



+对外公开的方法，—私有方法

initEvent()--->注册popstate 事件

createRouteMap()--->将路由信息以key----value的形式放入routeMap 



![](C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\2.png)

- **install 方法**

```javascript
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 1、判断vue Router 是否已经安装注册过
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2、把vue 构造函数记录到全局变量....这点我没太理解含义
    _Vue = Vue
    // 3、把创建vue 实例的时候传入的router 对象属性注入到Vue 实例上
    /*
     *   const router = new VueRouter({
     *   mode: 'history',
     *   base: process.env.BASE_URL,
     *   routes--->路由配置数组
     *   })
     *   ....
     *   new Vue({
     *    router,
     *    render: h => h(App)
     *   }).$mount('#app')
     */
    // 混入：同名属性和方法合并。。属性会覆盖，方法会都执行，所以毫无疑问这样写的beforeCreate 在每个组件生命周期都有，就都会触发
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) { // 因为只有实例才会又这个属性
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }
}

```

- constructor

```javascript
  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({ // observable 创建一个响应式对象
      current: '/'
    })
  }
```

- createRouteMap

```javascript
  createRouteMap() {
    // 遍历路由规则数组，存到routerMap 中
    /*
    *const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes---->routes:routes 因为key-value 相同就可以省略写key
    })
    */
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }
```

- initComponents

```javascript
  initComponents(Vue) {
    //肯定是要创建一个router-link 组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      template: '<a :href="to"><solt></solt></a>'
    })
  }
```

- init

```javascript
  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
  }
```

然后再install 中创建注入的时候调用

```javascript
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) { // 因为只有实例才会又这个属性
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init() // this.$options.router 就是new Vue()传入的router 实例
        }
      }
    })
```



**但是但是但是但是但是但是但是但是**

![](C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\4.png)

不能直接使用template

![](C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\3.png)





#### 两种解决办法

1、添加vue.config.js 配置

```javascript
module.exports={
    runtimeCompiler: true
}
```



2、使用render() 函数渲染

```javascript
  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          }
        }, [this.$slots.default])
      }
    })
  }
```

![](C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\5.png)



同理，我们也需要处理router-view 组件的渲染了

```javascript
  initComponents(Vue) {   
    ....
	const self = this
    Vue.component('router-view', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        // 匹配路由地址，找到componet 去渲染
        const component = self.routeMap[self.data.current]// 因为这里直接调用this 是不对的，不是vue 实例对象
        return h(component) // 如果直接传组件，就能直接渲染
      }
    })
  }
```



到这里，你就可以打开运行浏览器，查看了，但是你会发现，路由切换没有刷新视图，而且每次切换，路由地址都去请求了服务器，因为我们点击的是超链接

所有接下里的需求分析：

- 取消超链接的默认事件，或者说刷新页面的处理
- 但是我们又需要更新地址栏的地址，那就需要调用history的pushState方法了，这个方法不会请求，只是把地址栏修改
- 然后需要将当前路由视图渲染



```javascript
// 重新添加事件处理后的代码
initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,
            class: 'test div'
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: { // 这里有点类似写vue 的页面了，加一个methods 对象
        clickHandler(e) {
          // 改变地址栏
          history.pushState({}, '', this.to)
          // 加载视图组件
          this.$router.data.current = this.to //这就是为什么用observate创建一个响应式对象,因为会自动更新视图
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        // 匹配路由地址，找到componet 去渲染
        const component = self.routeMap[self.data.current] // 因为这里直接调用this 是不对的，不是vue 实例对象
        return h(component) // 如果直接传组件，就能直接渲染
      }
    })
  }
```



以上基本没有问题，但是有个缺陷，就是地址栏的前进后退会有问题，没有更新视图，所以需要监听浏览器的popstate 

```javascript
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
```







以下是整体代码：

vue-router-fake.js

```javascript
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 1、判断vue Router 是否已经安装注册过
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2、把vue 构造函数记录到全局变量....这点我没太理解含义
    _Vue = Vue
    // 3、把创建vue 实例的时候传入的router 对象属性注入到Vue 实例上
    /*
     *   const router = new VueRouter({
     *   mode: 'history',
     *   base: process.env.BASE_URL,
     *   routes--->路由配置数组
     *   })
     *   ....
     *   new Vue({
     *    router,
     *    render: h => h(App)
     *   }).$mount('#app')
     */
    // 混入：同名属性和方法合并。。属性会覆盖，方法会都执行，所以毫无疑问这样写的beforeCreate 在每个组件生命周期都有，就都会触发
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) { // 因为只有实例才会又这个属性
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({ // observable 创建一个响应式对象
      current: '/'
    })
  }

  createRouteMap() {
    // 遍历路由规则数组，存到routerMap 中
    /*
    *const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes---->routes:routes 因为key-value 相同就可以省略写key
    })
    */
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,
            class: 'test div'
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          // 改变地址栏
          history.pushState({}, '', this.to)
          // 加载视图组件
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      props: {
        to: String
      },
      //   template: '<a :href="to"><slot></slot></a>'
      render(h) {
        // 匹配路由地址，找到componet 去渲染
        const component = self.routeMap[self.data.current] // 因为这里直接调用this 是不对的，不是vue 实例对象
        return h(component) // 如果直接传组件，就能直接渲染
      }
    })
  }

  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}

```



