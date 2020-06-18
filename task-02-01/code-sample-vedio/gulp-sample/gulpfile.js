// // exports.foo = done => {
// //     console.log('task done')
// //     done()
// // }

// // const { series, parallel } = require('gulp')

// // const task1 = done => {
// //     setTimeout(() => {
// //         console.log('task1ing')
// //         done()
// //     })
// // }

// // const task2 = done => {
// //     setTimeout(() => {
// //         console.log('task2ing')
// //         done()
// //     })
// // }

// // exports.foo = series(task1, task2)
// const fs = require('fs');
// exports.callback = done => {
//     console.log('callback done')
//     done()
// }
// exports.callback_error = done => {
//     console.log('callback_error done')
//     done(new Error('task failed!'))
// }
// exports.promise = () => {
//     console.log('promise done')
//     return Promise.resolve() // 这里你传值也会被gulp忽略
// }
// exports.promise_reject = () => {
//     console.log('promise_reject done')
//     return Promise.reject(new Error('task_failed'))
// }

// exports.stream = () => {
//     const readstream = fs.createReadStream('package.json')
//     const Wstream = fs.createWriteStream('temp.txt')
//     readstream.pipe(Wstream) //
//     return readstream //其实也就是做了 readstream.on('end',()=>{ done() })
// }

const { src, dest } = require('gulp')

exports.default = () => {
    return src('src/*.css').pipe(dest('dist'))
}