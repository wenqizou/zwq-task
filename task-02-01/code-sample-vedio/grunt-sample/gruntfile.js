// grunt 入口文件
// 用于定义一些需要grunt自动执行的任务
// 需要导出一个函数
// 函数接受一个gurnt的形参，这个形参提供api 
const sass = require('sass')
const loadgruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/a.scss',
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {

                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-sass'); //随着使用的task多，那要写很多loadNpmTasks...安装load-grunt-tasks去做
    loadgruntTasks('grunt') //自动加载所有的你配置的插件任务。


    // 多任务模式，通过配置去形成多个子任务
    // grunt.initConfig({
    //     build: {
    //         js: 1,
    //         css: 2
    //     }
    // })
    // grunt.registerMultiTask('build', '任务描述', function() {
    //     console.log('多任务开始', this, this.data)
    // });
    // grunt.registerTask('test2', '任务描述', () => {
    //     console.log('test2', this)
    // })
    // grunt.registerTask('default', ['test', 'test2'])

    // grunt.registerTask('async', function() {
    //     const done = this.async()
    //     setTimeout(() => {
    //         console.log(111)
    //     }, 1000)
    // })
}