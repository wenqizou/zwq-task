# ES Module



现在基本都已经适用于当前很多浏览器，最基本的用法

通过给script 标签添加type = module 的属性，就可以以ES module的标准执行其中的JS代码了

```html
<!-- 通过添type=module 来设置，就可以用ES module标准执行其中的JS代码 -->
<script type="module">
	console.log('this is es module')
</script>

<!-- 基本特性 -->
<!-- 1、ESM自动采用严格模式，忽略“ use strict” -->
<script type="module">
	console.log(this) //undefined
</script>
<!-- 2、每一个模块都是一个当都的作用域 -->
<script type="module">
    var foo='123'
	console.log(foo) //123
</script>
<script type="module">
	console.log(foo) //error
</script>
<!-- 3、ESM 都是通过跨域资源共享 CORS的方式去请求外部JS模块  -->

<!-- 4、ESM 都是延迟执行脚本，类似添加defer 脚本加载  -->
<script defer src="test.js"></script> //test.js 的脚本就会等页面加载完再执行
```



### 导入导出（export import）

```javascript
export var name='foo' //导出私有属性
import {name} from './xx'

//一般我们都是在文件最后做导出
var name='foo'
function test(){
    
}
class person{
    
}

export { name, test ,person} //这样更加直观的表示这个模块对外的成员。
//----------------------------------------------------------------

export { name as fooname } //也可以通过关键字进行重命名，当然import就也要fooname 了
import {fooname} from './xx'

//如果设置为default
export { name as default}//默认导出成员
import { default as defaultname} from './xxx' //因为default关键子不能直接用。
//另外一中就是export default
export default name
import abc from './xxx' //那import 就可以自己定义了
```



**导出注意事项**

```javascript
var name='jack'
var age=18

export { name, age}
//虽然这个导出很像是将一个对象的字面量导出，但是实际上是两码事。
//我们知道，ES6 中对象字面量定义，如果key 和value 是一样的，我们可以缩写
var obj={
    name:name,
    age:age
}
//上面就可以缩写为
var obj={
    name,
    age
}
//那这个和 export { name, age} 就感觉一摸一样。就会误认为导出一个对象的感觉，其实这就是一个语法，类似function 必须要有{ }

//同样 import {name, age} 也不是对象的解构

//另外就是这个导入变量是个只读的成员，是模块成员中的引用
import { name,age }from './module/xx'

console.log(name) //这个name 就是我们定义的'jack'的引用地址，如果你在上面的export 模块中将name = 'rose'，那这里导入的name 也变成了rose

//但是这并不代表着我们可以手动修改name的值，因为在导入模块中 它只是一个只读的变量

name='jact2' //assignment to constant variable....这是不允许的

```



**导入的注意事项**

```javascript
//1、导入的路径必须写全，不能省略index.js或者.js
import {name} from './module'// 必须是'./module.js' || './module/index.js'

//2、相对路径的话也不能省略./ 或者 /
import {name} from 'module.js'// 必须是'./module.js' || '/module/index.js'，不然会被认为是加载第三方的模块

//3、可以使用全路径
import {name} from 'http://xxxx/sdsd/module.js'

-----------------------
    
// 如果只是加载模块而不用，我们可以什么都不导入
import {} form './module.js' // 或者 import './module.js'

// 那如果是要全部导出
import * as test from './module.js'// 记得要as ... 放对象test 中

------------------

//有时候想动态去import模块

var modulePath='./module.js'
import {name} from modulePath //那这种是不允许的

if(true){
   import {name} form './module.js'  //这样也是不允许的，因为import 关键字是必须在最外的
}
//ESM 提供import() 函数，它是一个promise函数
import('./module.js').then(function(module){
    console.log(module)
})

//导出成员的简写化
import {name, age, default as foo} from './module.js' // 同时导出default 和一些其他成员
import abc, {name, age} from './module.js' // 这种也是可以的，前面的abc 就和上面提到的import default 规则一致
```



**我们还可以直接导出 导入的成员**

```javascript
export {name, age} from './module.js' //一般可以定义这样的index.js 入口文件，将组件或者库的内容导出
console.log(name,age) // 当然当前模块下，这两个变量就没了

//---------------
//比如我在component文件夹下有两个模块a, b
// module a 
export var slide='slide'
// module b 
export var button='button'

//那我在引入文件就要做两次import 

import {slide} from './component/a.js'
import {button} from './component/b.js'

//所有我们可以定义一个index 做一个集成

import {slide} from './component/a.js'
import {button} from './component/b.js'

export {slide,button} 

//那再简化下
export {slide} from './component/a.js' // 当然如果有default 的化，你就要使用as ... 关键字了
export {button} from './component/b.js'
```



### Esmodule与nodejs的交互 

nodejs 要直接使用的化，需要是mjs 后缀才行

commonjs能再ESModule 中使用，但是反过来ESModule 不能在commonjs 中require



