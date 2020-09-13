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
