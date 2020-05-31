const fp = require('lodash/fp');
const { log } = console

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

// log(f('Hello       world'))

// 提前字符串中的首字母大写并用字符 . 拼接合并
// const get = fp.flowRight(fp.join('.'), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
const get = fp.flowRight(fp.join('.'), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

// log(get('world is peace')) // W.I.P

// class Container {
//     constructor(value) {
//         this._value = value //要有一个接受值
//     }

//     map(fn) { //要有一个map方法
//         return new Container(fn(this._value)) //要返回一个处理了值的新函子
//     }
// }
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value //要有一个接受值
    }

    map(fn) { //要有一个map方法
        return this.isNull() ? Container.of(null) : Container.of(fn(this._value)) //要返回一个处理了值的新函子
    }

    isNull() {
        return this._value === undefined || this._value === null
    }
}
let r = Container.of(5).map(x => x + 1).map(x => x * 2)
    // log(r)

// log(Container.of(5)
//     .map(x => x + 1)
//     .map(x => x * 2)
//     .map(x => null)
//     .map(x => x.split(' ')))

class left {
    static of(value) {
        return new left(value)
    }
    constructor(value) {
        this._value = value //要有一个接受值
    }

    map(fn) {
        return this
    }
}

class right {
    static of(value) {
        return new right(value)
    }
    constructor(value) {
        this._value = value //要有一个接受值
    }

    map(fn) {
        return right.of(fn(this._value))
    }
}

function parse(value) {
    try {
        return right.of(JSON.parse(value))
    } catch (e) {
        return left.of({ error: e.message })
    }
}

// log(parse('xcsd'))
// log(parse('{ "name": "zs" }'))

class IO {
    static of(value) { //of 还是返回函子，但是一个包装了一个外部数据的函子
        return new IO(function() { //刚好按构造函数定义传了一个fn
            return value
        })
    }
    constructor(fn) { //IO 函子就不是传value ,而是一个fn
        this.value = fn
    }
    map(fn) {
        // this.value == function (){ return value }
        return new IO(fp.flowRight(fn, this.value)) //IO 的map 是返回一个新的函子，不是of 直接调用。并将两个函数组合
    }
}
log(IO.of(process).map(p => p.execPath).value())