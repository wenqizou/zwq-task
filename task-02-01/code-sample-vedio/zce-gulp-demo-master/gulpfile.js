const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()

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


const clean = () => {
    return del(['dist', 'temp'])
}

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' }) //base 设置基础文件路径，这样打包的文件就能按源文件src后面的路径一致
        .pipe(plugins.sass({ outputStyle: 'expanded' })) //glup-sass 插件,expanded--设置打包后的格式样式，
        .pipe(dest('temp'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' }) //base 设置基础文件路径，这样打包的文件就能按源文件src后面的路径一致
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
}

const page = () => {
    return src('src/*.html', { base: 'src' }) //base 设置基础文件路径，这样打包的文件就能按源文件src后面的路径一致
        .pipe(plugins.swig({ data }))
        .pipe(dest('temp'))
}
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}
const compile = parallel(style, script, page, image, font)

const build = series(clean, parallel(compile, extra))


const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
        // watch('src/assets/images/**', image)
        // watch('src/assets/fonts/**', font)
        // watch('public/**', extra)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], browserSync.reload)

    browserSync.init({
        server: {
            baseDir: 'temp',
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        // html js css
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('dist')) //因为在压缩的过程中也是读写，所有这里可能会出现读写冲突，所以久不能用dist
}

module.exports = {
    compile,
    build,
    serve,
    useref
}