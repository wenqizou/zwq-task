const fp = require('lodash/fp');
const { log } = console
const { Maybe, Container } = require('./support')

//练习1
let maybe = Maybe.of([5, 6, 1]);
let ex1 = function(value) {
    return fp.map(x => {
        return fp.add(x, 1)
    }, value)
}
log(maybe.map(ex1))

//练习2
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = fp.first(xs._value);
// 这道题和下面这道题没有理解什么意思！不应该只是考_value吧？

//练习3
let safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x]);
});

let ex3 = function() {
    let name = safeProp(('name'), { id: 2, name: "Albert" })._value;
    return fp.first(name);
};

//练习4
let ex4 = function(n) {
    return Maybe.of(n).map(x => parseInt(x))._value
}