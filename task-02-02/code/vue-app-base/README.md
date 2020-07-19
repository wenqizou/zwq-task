# 项目说明文档

首先一开始我们并不能一下就知道要安装那些依赖，但是这个基于vue 的项目，所以毫无疑问vue-loader 是必要的，所以去查看vue-loader 的配置得知如何配置

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')
...
{
    test: /\.vue$/,
    exclude: /node_modules/,
    include: [resolve('src')],
    use: 'vue-loader'
}
...
new VueLoaderPlugin(),
```



1、我们需要启动起来，那就需要配置webpack-dev-serve

​	所以安装webpack-dev-serve 用来启动

```javascript
    devServer: {
        contentBase: ['./public','./src'],
        port: 3000,
        open: true
    }
```

2、那配置dev server 的过程中，像正常其他情况一样，我们需要需要加载器其他非js 资源，如css, png，以及项目中用到了less ....所以需要安装一个less-loader,

那按照配置多个loader，后面先执行的规则处理，所以配置如下；

那因为在启动之后发现vue 中写有的css 报错不识别，所以发现需要配置vue-style-loader的加载器处理；

那png图片就是正常的加载器处理；

最后就是开头提到了，vue 项目必然需要一个vue 的加载器，（需要配置VueLoaderPlugin）

```javascript
module: {
        rules: [{
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                enforce: "pre",
                include: [resolve(__dirname, 'src')],
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 10 * 1024,
                        name: '[name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: [resolve('src')],
                use: 'vue-loader'
            }
        ]
    },
```

那到这里，一个基本Loader 配置就差不多了。接下来是plugins 配置



3、plugins 配置，毫无疑问，主要是html-webpack-plugin，那其中因为public 中有index.html ，那就以此为模板，但是需要注意的是其中模板中有个BASE_URL，需要配置处理一下啊，

```javascript
 new HtmlWebpackPlugin({
     template: './public/index.html',
     templateParameters: {
         BASE_URL: '/'
     }
 })
```

剩下的就是其他辅助插件，如清空文件夹，拷贝公用文件处理，因为这两个插件主要是上线的前的操作所以就配置在product 模式下

```javascript
plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: ['public/favicon.ico']
    })
]
```



然后剩下的就是将公用的打包模块提取道common.js 中去，然后在dev.js 和prod.js 中通过webpack-merge去合并，

webpack.dev.js

```javascript
const common = require('./webpack.common')
const {
    merge
} = require('webpack-merge')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: ['./public','./src'],
        port: 3000,
        open: true
    }
})
```

webpack.dev.js

```javascript
const common = require('./webpack.common')
const {
    merge
} = require('webpack-merge');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: ['public/favicon.ico']
        })
    ]
})
```



然后配置相应命令到 package.json，至于eslint 的配置，有点欠缺。就是配置了一个loader 去处理....不太理解配置这个快速命令的含义是什么。。望导师指点！

```javascript
  "scripts": {
    "serve": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "lint": "eslint ./src"
  }
```

