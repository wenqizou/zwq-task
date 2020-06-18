// 实现这个项目的构建任务
const sass = require('sass')
const loadgruntTasks = require('load-grunt-tasks')

const data = {
    menus: [{
            name: 'Home',
            icon: 'aperture',
            link: 'index.html'
        },
        {
            name: 'Features',
            link: 'features.html'
        },
        {
            name: 'About',
            link: 'about.html'
        },
        {
            name: 'Contact',
            link: '#',
            children: [{
                    name: 'Twitter',
                    link: 'https://twitter.com/w_zce'
                },
                {
                    name: 'About',
                    link: 'https://weibo.com/zceme'
                },
                {
                    name: 'divider'
                },
                {
                    name: 'About',
                    link: 'https://github.com/zce'
                }
            ]
        }
    ],
    pkg: require('./package.json'),
    date: new Date()
}

//1、html,css,js

module.exports = grunt => {
    grunt.initConfig({
        //配置基本的任务
        clean: {
            temp: './dist'
        },
        sass: {
            options: {
                sourceMap: false,
                implementation: sass
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/styles/',
                    src: ['**/*.scss'],
                    dest: 'temp/assets/styles/',
                    ext: '.css'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scripts/',
                    src: ['**/*.js'],
                    dest: 'temp/assets/scripts/',
                    ext: '.js'
                }]
            }
        },
        swig: {
            options: {
                data: data,
                defaults: { cache: false }
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    dest: 'temp/',
                    src: ['*.html'],
                    ext: '.html'
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['**/*'],
                    dest: 'temp'
                }]
            }
        },
        // concat: {
        //     options: {
        //         separator: ';',
        //     },
        //     dist: {
        //         src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
        //         dest: 'dist',
        //     },
        // },
        // cssmin: {
        //     options: {},
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: 'temp/assets/styles/',
        //             src: ['**/*.scss'],
        //             dest: 'dist/assets/styles/',
        //             ext: '.css'
        //         }]
        //     },
        // },
        // uglify: {
        //     options: {},
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: 'temp/assets/scripts/',
        //             src: ['**/*.js'],
        //             dest: 'dist/assets/scripts/',
        //             ext: '.js'
        //         }]
        //     },
        // },
        useref: {
            html: 'dist/**/*.html', //没有将Jq&bootsrwarp压缩打包。望指导老师指点一下。
            temp: 'dist'
        },
        imagemin: {
            options: {
                optimizationLevel: 3 //定义 PNG 图片优化水平
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images/',
                    src: ['**/*'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: 'dist/assets/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
        watch: {
            files: 'src/**',
            tasks: ['complies'],
            options: {
                livereload: true,
            }
        },
        browserSync: {
            options: {
                watchTask: true,
                port: 8090,
                server: {
                    baseDir: ['temp', 'src', 'public'],
                    routes: {
                        '/node_modules': 'node_modules'
                    }
                }
            },
            main: {
                bsFiles: {
                    src: 'dist/**/*'
                }
            }
        }
    })

    loadgruntTasks(grunt)

    //编译
    grunt.registerTask('complies', [
        'sass',
        'babel',
        'swig',
        'copy'
    ])

    //开发环境
    grunt.registerTask('develope', [
        'complies',
        'browserSync',
        'watch'
    ]);

    //上线环境
    grunt.registerTask('build', [
        'clean',
        'complies',
        'useref'
    ]);

}