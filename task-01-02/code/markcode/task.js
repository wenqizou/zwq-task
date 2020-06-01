const fs = require('fs')
const { task } = require('folktale/concurrency/task')
const { split, find } = require('lodash/fp')

function readfile(filename) {
    return task(resolver => { //固定参数
        fs.readFile(filename, 'utf-8', (err, data) => { // 编码格式和回调
            if (err) resolver.reject(err)

            resolver.resolve(data)
        })
    })
}

readfile('package.json')
    .map(split('\n')) //那其实这里就不用管内部实现，我们只要整体的运行机制。map 返回新的函子，并传递处理后的数据
    .map(find(x => x.includes('version')))
    .run() //返回的task 函子要run 才会运行
    .listen({
        onRejected: err => {
            console.log(err)
        },
        onResolved: value => {
            console.log(value)
        }
    })