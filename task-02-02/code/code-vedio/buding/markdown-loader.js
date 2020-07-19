const marked = require('marked')
module.exports = sources => {
    //每个loader 都是一个函数，内部就是对内容的处理过程，
    //输入sources就是资源文件的内容
    //输出就是此次加工之后的结果
    console.log(sources)
    const html = marked(sources)
    return `export default ${JSON.stringify(html)}` //注意这里是需要返回JavaScript代码
}