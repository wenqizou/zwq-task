## 一、简答题

1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答：不是响应式的，在vue 实例化的过程中会对传入的data进行数据劫持形成响应式数据，但是这个时候dog是个空对象，所以里面的属性都不会有响应式，那clickHandler中的this.dog.name 自然不在响应式的行列中，最明显的就是没有setter/getter 方法;

如果要变成响应式，那就再实例化的开始，也定义一个name属性，value 为空或者null 都行；或者使用vue提供的方法Vue.set()，这个是项目开发中经常遇到的


2、请简述 Diff 算法的执行过程

因为真实的DOM操作是很耗性能的，因此需要尽量减少DOM操作。但是前端开发避免不了操作Dom，所以就有了virtual dom，而virtual dom需要对比才能决定更新什么内容，这个对比的过程就需要diff 算法

diff算法主要执行过程：

patch(container, vnode) ，首次渲染，将 container 转为 vnode，并对比新旧 VNode 是否相同节点然后更新DOM
patch(vnode, newVnode) ，数据改变二次渲染，对比新旧 VNode 是否相同节点然后更新DOM
createElm(vnode, insertedVnodeQueue)，先执行用户的 init 钩子函数，然后把 vnode 转换成真实 DOM（此时没有渲染到页面），最后返回新创建的 DOM
updateChildren(elm, oldCh, ch, insertedVnodeQueue), 如果 VNode 有子节点，并且与旧VNode子节点不相同则执行 updateChildren()，比较子节点的差异并更新到DOM




### 二、编程题

1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。


2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。


3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：![](C:\project\code\homework\zwq-task\zwq-task\task-03-01\notes\note-img\Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png)



### 



