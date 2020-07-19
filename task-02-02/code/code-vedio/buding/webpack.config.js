const path = require('path')

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            // {
            //     test: /.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /.png$/,
            //     // use: 'url-loader', //将file-loader 换成url-loader，这样图片就会被打包成base64
            //     //添加options
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10 * 1024 // 10 KB,超出的还是会以file-loader去打包，当然前提你得安装，它只是在内部做了调用
            //         }
            //     }
            // }
            {
                test: /.md$/,
                use: './markdown-loader.js' //这里不只是可以配置loader名称，还可以配置路径，就像require()函数
            }
        ]
    }
}