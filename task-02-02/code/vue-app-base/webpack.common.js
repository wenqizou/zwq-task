/*
 * 需求分析：
 * 1、我需要配置开发环境的基础，那就需要webpack-dev-server, 打包毫无疑问需要webpack, 所以先安装
 * 2、这是一个vue 项目，那我应该需要处理配置一下vue 项目的loader ?
 * 3、因为用到less, 毫无疑问我需要配置less-loader
 * 4、HMR去配置开发环境
 * 5、
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
    resolve
} = require('path')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
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
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                BASE_URL: '/'
            }
        })
    ]
}