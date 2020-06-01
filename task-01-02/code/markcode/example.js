// function once(fn) {
//     let done = false;
//     return function() {
//         if (!done) {
//             done = true;
//             console.log(111, arguments);
//             return fn.apply(this, arguments);
//         }
//     };
// })
// let test = once(function(abc, number) {
//     console.log(`abc is ${abc} number ${number}`);
// })

// test('abc', 110917);

//面向过程
// let array = [1, 2, 3, 4, 5]
// for (let index = 0; index < array.length; index++) {
//     console.log(arr[index])
// }

//高阶函数
// forEach(array, function(item) {
//     console.log(item)
// })

function test() {
    let msg = 'test'
    return function() {
        console.log(msg)
    }
}

test()()

function makePower(pow) {
    return function(number) {
        return Math.pow(number, pow)
    }
}

let power2 = makePower(2)
let power3 = makePower(3)

console.log(power2(4))
console.log(power3(4))


let min = 18

function check(age) {
    let min = 18
    return age >= min
}

function getsum(a, b, c) {
    return a + b + c
}
const currd = _.curry(getsum)

log(currd(1, 2, 3))