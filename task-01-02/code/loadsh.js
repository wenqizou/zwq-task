const _ = require('lodash');
const { log } = console;
// const arry = ['test', 'dsad', 'dddd']
// log(_.first(arry))
// log(_.last(arry))

// //因为同样的输入会有同样的输出，那我们就可以将输入后的输出结果缓存，然后下次就可以直接拿来用，这样就性能优化了

// function memoize(fn) {
//     let cache = {} //通过fn的参数去配置结果，这样就下次传的参数一样就可以直接拿来用了
//     return function() {
//         //通过arguments拿参数咯
//         let key = JSON.stringify(arguments)
//         cache[key] = caches[key] || fn.apply(fn, arguments)
//         return caches[key]
//     }
// }

// function getsum(a, b, c) {
//     return a + b + c
// }
// const currd = _.curry(getsum)

// log(currd(1, 2, 3))
// log(currd(1, 2)(3))
// log(currd(1)(2, 3))

// const match = _.curry(function(reg, str) {
//     return str.match(reg)
// })

// const findspace = match(/\s+/g) //...得到寻找空格的柯里化函数
// const findnumber = match(/\d+/g) //...得到寻找数字的柯里化函数

// log(findspace('heodas dsad'))
// log(findnumber('dsad123'))

// const filter = _.curry(function(fn, arry) {
//     return arry.filter(fn)
// })

const filter = _.curry((fn, arry) => arry.filter(fn))

// log(filter(findspace, ['abc', 'ddd das']))



function getsum(a, b, c) {
    return a + b + c
}
const currd = curry(getsum)

log(currd(1, 2, '3')) // args
log(currd(1, 2)(4))
log(currd(1)(2, 5))

function curry(fnc) {
    return function curried(...args) { //curry 返回一个函数，这个是肯定的，所以return function。
        log(args, arguments)
            // args展开运算符，你也可以用arguments
            //args 是实际的参数，fnc.length 则是形参数(函数.length就是形参个数)。
        if (args.length < fnc.length) { // 然后根据柯里化的概念，如果参数全传递，那就直接返回结果，不然就返回剩余参数的函数
            // 剩余的参数怎么控制？
            return function(...args2) {
                //这里就是第二次甚至第三次，第四次执行，那这个func在执行的时候也是又argument的
                //所以处理方式就是将这次的参数argument和第一次args 合并看是否是形参的个数，如果是那就返回结果，所以就相当于再执行一下外部的func,
                //那就将外部的函数定义名字，再执行一下
                return curried(...args.concat(args2))
            }
        }
        return fnc(...args) // 或者func.apply(func,args)
    }
}