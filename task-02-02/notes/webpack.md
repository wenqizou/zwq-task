

# Webpack

内容摘要

- 模块化的演变过程
- 模块化的规范
- 常用的模块化的打包工具
- 基于模块化构建现代的Web应用
- 打包工具的优化技巧



### 模块化的演变过程

stage1、最早期完全依靠约定规范去模块化，每个script中 定义自己的模块，每个模块中都定义自己的变量，要使用哪个就引入哪个script

```javascript
// module-a script
var name='module-a';

function method1(){
    console.log(name+'#method1')
}

function method2(){
    console.log(name+'#method2')
}

...

// module-b script
var name='module-b';

function method1(){
    console.log(name+'#method1')
}

function method2(){
    console.log(name+'#method2')
}

```

​	缺点：代码一旦上了一个体量之后就会很难维护，容易覆盖冲突，**模块成员容易被改写**，**污染全局**

stage2、命名空间方式

```javascript
var moudle={
    name:'module-b',
    method1:function(){
        console.log(this.name+'#method1')
	},
    method2:function(){
        console.log(this.name+'#method2')
	}
}
```

虽然有优化，但是本质的问题还是没有解决



stage3、IIFE模式**（立即执行函数）**

```javascript
;(function(){
    var name='module-a';

    function method1(){
        console.log(name+'#method1')
    }

    function method2(){
        console.log(name+'#method2')
    }
    window.moduleA={
        method1:method1,
        method2:method2
    }
})()
```

这种方式实现了模块中的私有成员的概念，因为是个闭包，所以函数里面的name 没有办法直接获取。只能通过挂在到window全局对象中的方法去获取；

而且这种方式能更好的去知道模块的依赖关系；

比如上面的模块需要使用到 jQuery的话

```javascript
;(function($){
    var name='module-a';

    function method1(){
        console.log(name+'#method1')
        $('body').css(...)
    }

    function method2(){
        console.log(name+'#method2')
    }
    window.moduleA={
        method1:method1,
        method2:method2
    }
})(jQuery)
```

以上就是早期没有工具和规范的情况下对模块化的一个落地方案，解决了一些问题，但是还是遗留了很多问题

而且就目前而言，所有的模块引入和取消引入都是手动在html页面加script 和删除script 。这样维护起来也是很麻烦的

那这个时候.....



**模块化规范**就出现了



### 模块化的标准+模块加载器



### 模块化规范：



- CommonJS规范（nodeJs的一种规范）= CJS

  1. 一个文件是一个规范
  2. 每个规范都有单独的作用域
  3. 通过module.exports导出成员
  4. 通过require函数载入模块
  5. commonjs是以同步模式加载模块，这个和node的加载机制有关，但是浏览器就会影响效率了

- AMD(Asynchronous Module Definition)   异步模块 // 同时出现Require.js

  ```javascript
  //定义一个模块
  define('module1',['jquery','./module2'],funtion($,module2){//参数就是对应依赖项
    //向外部导出一定的对象     
    return {
         start:function(){
              $('body').css(xxx)
              mdoule2()
  		}
  	}       
  })
  //对应的还有一个require，这个就只是调用了
  require(['./module2'],funtion(module2){
     mdoule2()
  })
  ```

  目前第三方的库都是支持AMD，生态也全面；但是：

  - AMD相对使用起来比较复杂，除了要编写业务逻辑代码，你好要处理这个define.require...
  - 模块的请求次数比较多，请求频繁，页面效率低下

- CMD  (require.js同期出现的，tabao推出seajs)

  ```javascript
  //CMD 规范，类似CommonJS 规范
  define(funtion(require,exports,module){//参数就是对应依赖项
      //通过require 引入依赖
      var $=require('jquery')
      //通过exports 或者 module.exports 对外暴露成员
      module.exports=function(){
          console.log(111)
      }      
  })
  ```



以下两种不算是模块化标准，只能一种定义方法


- UMD  Universal Module Definition（通用模块规范）是由社区想出来的一种整合了CommonJS和AMD两个模块定义规范的方法。`UMD` 其实不是什么标准, 可以看成是 `IIFE` `amd` + `cjs` 的兼容版.

- IIFE 其实在大家应该都用过,只不过没想到还有个名字;标准简单说就是执行一个匿名函数,

  ```javascript
  (function(global){
      // code
  })(this);
  ```

  

  ## 总结

  > `iife` 的方便会让其长期存在
  > `amd` 在浏览器端还是霸主阶段
  > 在服务端 `es6` 标准化取代 `cjs` 是一种趋势, 但`cjs`标准的庞大类库,会让它暂时难以取代.

  | 标准 | 变量问题 | 依赖 | 动态 加载 | 静态分析 |
  | :--- | :------- | :--- | :-------- | :------- |
  | iife | ✔        | ✘    | ✘         | ✘        |
  | amd  | ✔        | ✔    | ✔         | ✘        |
  | cmd  | ✔        | ✔    | ✔         | ✘        |
  | cjs  | ✔        | ✔    | ✘         | ✘        |
  | es6  | ✔        | ✔    | ✘         | ✔        |

### ES Modules

**现在的模块化规范，es2015-module**





# 模块化打包工具的由来



### 需要解决的需求问题

最基本的就是我想兼容ESmodule 的使用，然后就是优化请求，因为模块化请求会变多，影响效率

- 编译脚本，样式
- 支持不同类型的资源模块化，不仅仅是JavaScript
- html,css,都有模块化的需求



1、ES 使用的一些ES6+的模块需要编译成ES5

2、Es module 模块开发固然很方便区分模块，但是资源请求过多......这就很烦，所以能不能打包成一个去请求

3、各种资源，css，png，scss...等等也是需要打包考虑的

### 模块化打包工具

- webpack
  1. 模块打包器（Module bundler）--将零散的代码打包到同一个js文件
  2. 模块加载器（loader）---在打包过程中处理一些编译
  3. 代码拆分（code splitting）---打包过程中按照我们的需要去打包，因为不可能全部资源都打包到一个文件中，把第一次要运行的打包一起，然后剩下的按模块去加载，这样就避免了文件太碎，或者文件太大
  4. 资源模块（Asset Module）----以模块可以载入各种资源
- rollup
- Parcel



### webpack 配置文件

**webpack 4.0+** 以后都支持**零配置的方式**去打包，默认就是将 **src/index.js**  作为入口文件输出就是**dist/main.js**

当然大部分还是通过配置webpack.config.js去配置

因为这个文件是一个运行在nodejs 环境下的文件，那自然是支持commonjs 规范去写代码

```javascript
const path= require('path')

module.exports={
    entry:'./src/mian.js',//相对路径的. ./是不能省略的
    output:{
       filename:'bundle.js',
       //path:'output'//这样式不行的，因为必须是绝对路径，那因为是在node下运行，那我们就可以载入node下的path模块来用
       path:path.join(__dirname,'output')//这样就定义了自己的输出文件夹
    }
}
```



### webpack工作模式

其实就是针对不同环境做的不同处理，--mode 的参数控制

- --mode developement
- --mode product
- --mode none 这就是最原始不压缩的



更多不同可以参考webpack官网介绍，当然也可在配置文件中添加mode 参数

```javascript
module.exports={
	mode:'developement'
}
```



### webpack打包的运行原理



```javascript
// Load entry module and return exports
return __webpack_require__(__webpack_require__.s = 0);
// 这个其实就是赋值然后传递赋值后的数据
// 等价于
__webpack_require__.s = 0
__webpack_require__(__webpack_require__.s)

//就像
const y=3
console.log(x=y+1) //4
```



```javascript
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/		
    			//其实这就是定义了一个module 对象，然后exports属性上去将模块的内容导出，那__webpack_require__ 就能require	
    			//其实在nodejs 就是这样的  module.exports  然后require()去加载这个模块，本身webpack 就是运行在nodejs 下
    			
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
```

```javascript
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
// 这里就是将module.exports  转成Es module 类型，具体应该是看这个有没有 Symbol(Symbol.toStringTag): "Module"
```



### webpack 资源模块加载器

1、css 模块加载

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-1.png)



```javascript
//webpack.config.js
const path = require('path')

module.exports = {
    mode: 'none',
    entry: './src/main.css',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{ //rules 数组就是用于配置所有类型文件的打包加载，每个对象都要设置两个test、use 两个属性
            test: /.css$/, //正则匹配文件格式的正则
            use: 'css-loader'//use 配置使用什么加载器
            //use:['style-loader','css-loader'] //配置多个loader的话，从后往前执行顺序
        }]
    }
}
```

导入资源模块就是为了和当前的js 模块建立关系

### 文件资源加载器 -（File-loader） 

```javascript
//main.js
import icon from './icon.png' //webpack 中只要出现import 就会被处理

const img = new Image()
img.src = icon

document.body.append(img)



//webpack.config.js
//省略部分...
{
     test: /.png$/,
     use: 'file-loader'
 }
//省略部分...
```

**我很好奇为什么图片都没有export 也能import 去导入**



正式按常理来说这个import 是不能识别的，所以才需要webpack loader 去加载，然后处理为导出的方式

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-2.png)



**文件打包要注意publicPath** 告诉webpack 你打包后的东西在哪里

```javascript
const path = require('path')

module.exports = {
...
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/' //注意不能省略
  },
...
}
```

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-6.png)

### 文件资源加载器2 -（DataUrl类型---url-loader）

```javascript
{
    test: /.png$/,
    use: 'url-loader', //将file-loader 换成url-loader，这样图片就会被打包成base64
    //添加options
    use: {
        loader: 'url-loader',
        options: {
            limit: 10 * 1024 // 10 KB,超出的还是会以file-loader去打包，当然前提你得安装，它只是在内部做了调用
        }
    }
}
```

影响运行速度，打包文件回偏大

总结：

- 小文件： 使用Data Urls，减少请求次数
- 大文件，还是当都提取存放，提供加载速度



### 常用加载器 Loader

- 编译转化类型（css-loader ....etc）
- ![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-7.png)
- 文件操作类型（file-loader拷贝到dist....将路径导出）
- ![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-8.png)
- 代码质量检查类型（统一代码风格）

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-9.png)

### webpack和ES2015

webpack 只是一个打包工具，针对js中出现的ES6 语法默认是不处理的，那要处理，自然还是要通过babel 去处理

babel 话，那就是三件套："@babel/core"； "@babel/preset-env"； "babel-loader"；

要注意babel 只是一个平台，真正运行的还是Babel下的各种插件，如：babel/preset-env 这个就是将Es6 最新的都编译



### webpack 模块加载方式 会触发打包

- 遵循ESmodules 标准的import 申明
- 遵循commonJs 标准的require 函数
- 遵循AMD标准的define函数和require 函数

此外，loader加载的非javascript也会触发资源加载。如：样式代码中的**@import 指令和url 函数**

**html 中的src 属性也会触发 以及 a 标签的href 有png 之类的**，只要用到了资源的就会被webpack 认为是资源模块，进行打包

<img src="C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-3.png"  />



其实就可以理解为，页面中或js 中用到的资源都会被webpack认为是模块，然后打包处理。然后资源类型通过不同类型的loader去处理加载

因为最后生成的是一个整合的资源文件



```javascript
module:{ 
{
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'a:href']
          }
        }
      }
    }
```



html 默认只有img src 才会打包。 a 标签的href 需要配置



### webpack 工作原理

 形成一个依赖树--然后进行递归找到文件，然后根据配置文件中的rules 属性找到模 块的加载器，然后去加载，将内容放到bundle.js

**loader机制是webpack 的核心**

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-4.png)

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-10.png)

### Loader 的工作原理

我们以开发一个md类型文件加载器来了解

```javascript
//about.md
# 关于我

我是一个人

//自己定义一个loader文件，etc:markdown-loader.js
const marked = require('marked') //解析markdown 文件并转成html 字符串

module.exports = sources => {
    //每个loader 都是一个函数，内部就是对内容的处理过程，
    //输入sources就是资源文件的内容
    //输出就是此次加工之后的结果
    console.log(sources)
    const html = marked(sources)
    return `module.exports=${JSON.stringify(html)}` //注意这里是需要返回JavaScript代码
    // 2、以及这里也是可以通过ES6 的语法处理`export default ${JSON.stringify(html)}`
}

//webpack.config.js
...
        rules: [
            {
                test: /.md$/,
                use: './markdown-loader.js' //这里不只是可以配置loader名称，还可以配置路径，就像require()函数
            }
        ]

...

//=============>打包之后就发发现在bundle.js中=========
...
/* 1 */
/***/ (function(module, exports) {

mdoule.exports= "<h1 id=\"关于我\">关于我</h1>\n<p>我是一个人</p>\n"

/***/ })
/******/ ]);

//=============>ES 语法的导出   打包之后就发发现在bundle.js中=========
...
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 id=\"关于我\">关于我</h1>\n<p>我是一个人</p>\n");

/***/ })
/******/ ]);
```

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-5.png)



**所以Loader 的处理过程类似一个管道函数**。但是result 一定要是一个javascript 的代码。而中间的处理过程你可以通过多个loader去处理

就像上面提到的css-loader+style-loader



### webpack 插件机制

- 增强webpack自动化处理能力，plugin 解决除了Loader 加载的其他自动化操作，eg: 清除dist 目录，拷贝静态文件到输出目录，压缩代码

```javascript
//webpack.config.js
const path = require('path')

module.exports = {
    ....
    //添加一plugins参数
    plugins:[
        
    ]
}
```





### webpack 常用插件

详细的在webpack 官网都是有介绍的

- 清除之前的dist文件（clean-webpack-plugin）

  ```javascript
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  ....   
  plugins:[
     new CleanWebpackPlugin()
  ]
  ```

- 自动生成Html的插件（html-webpack-plugin）

  ```java
  plugins:[
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          title:'测试',
          meta:{
              viewport:'width=device-width'
          }
          template:'./src/index.html'
      })
  ]
  ...
      
  //index.html 模板中可以使用模板语法取值方式
  <%= htmlWebpackPlugin.options.title %>
  
  ```



输出多个配置文件index.html，就是配置多个html 插件配置实例

```javascript
 plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    })
  ]
```

- copy-webpack-plugin 复制文件





### 插件机制

 plugins 钩子机制Hooks，类似于事件 机制，  在整个打包过程中每个处理时机都是一个节点，那我们可以在这个节点上定义我们的任务，然后去扩展能力

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-11.png)

![](C:\project\code\homework\zwq-task\zwq-task\task-02-02\notes\note-img\2-2-12.png)



需求：一个可以把blund.js 中前面的 /****/ 注释 给清空

```javascript
class MyPlugin {
  // 固定的实现
  apply (compiler) { //
    console.log('MyPlugin 启动')
      
	//emit 是文档中说的最后一步，将内容输出到dist文件夹，刚好符合我们的需求
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) { //返回的是一个对象
        // console.log(name)
        // console.log(compilation.assets[name].source())
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length //这个size 是webpack要求的配置
          }
        }
      }
    })
  }
}
```







### 利用webpack 构建一个理想的开发环境

1、自动编译，自动刷新

2、提供服务器访问方式

3、sourceMap 方便debugger





### 自动编译

这个很简单，--watch 就能开启webpack监听

### 自动刷新浏览器

**browserSync** 

整个流程就是，--watch 自动监听更新编译打包到dist .然后browserSync 监听dist 目录，自动更新浏览器



其实以上两种就能解决，但是感觉还是操作麻烦，效率也低了，因为涉及到磁盘读写。

所以有了**webpack dev server**

他就是将打包的文件放内存中

```javascript
  devServer: {
    contentBase: './public',
    proxy: {
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        changeOrigin: true
      }
    }
  },
```



### sourceMap

主要是代码调试

```javascript
module.exports = {
  ...
  devtool: 'eval',
  ...
}

```



### sourceMap---devtool 模式对比

- **eval模式** **构建速度块，但是只能定位文件**

  eval('console.log(123)') //虚拟的运行环境 vmxx:1:

  eval('console.log(123) /# sourceURL=./foo/bar.js')  // ./foo/bar.js:1

- **eval-source-map** 能定位错误位置

- **cheap-eval-source-map** 

- **cheap-module-eval-source-map** 

- **cheap-module-eval-source-map** 

- **inline-souce-map**



- eval-xxxx  是否使用eval执行模块代码
- cheap -xxx  Source Map 是否包含行信息
- module -xxx  是否能够得到loader 处理之前的源代码





### 选择合适的source map

开发

生产

没有绝对，按自己的需求去定义



**以上基本的webpack 开发配置就好了，但是还有一个瑕疵，那就是**

**页面中有输入后，刷新完又得去重写填写，就像表单。**



### HMR热更新（热拔插） 强大。。。

hot module replacement

这个功能已经集成在webpack dev serve 中



### 开启HMR

HMR 是webpack-dev-serve 的内置功能

不能开箱即用，css是有效果，**但是js 好像不能**

脚手架中因为是框架所以会自己有规律



### HMR API

通过处理方法的调用，去处理那就不会刷新页面



definePlugin





### 代码分割





### 多个打包入口

entry 定义成对象



### Htmlplugin

