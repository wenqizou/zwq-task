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