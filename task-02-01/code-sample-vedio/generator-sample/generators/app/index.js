//此文件作为ge 入口
//需要导出一个 继承于Yeoman ge.的类型
//yeoman ge 在工作时会自动调用我们在此类型中定义的一些生命周期方法
//我们呢可以在这些方法中通过调用父类提供的一些工具方法实现一些功能，例如：文件写入


const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        //Yeoman 询问用户环节自动调用该方法
        //调用父类的prompt() 方法对用户命令询问
        // 数组参数
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname //项目生成目录名称
        }]).then(answer => {
            // answer == 用户自己输入的内容,对象形式{}--key 是name的值
            this.answers = answer //挂在到 this ,这样write的时候就能用了
        })
    }
    writing() {
        //yeoman 自动在生成文件阶段调用此方法
        //尝试在项目目录写入一个简单文件
        // this.fs.write( //两个参数，路径和内容
        //     this.destinationPath('temp.txt'),
        //     Math.random().toString()
        // )

        // 2、使用模板方式
        const tmpl = this.templatePath('bar.html'); // /templates/ 这个方法就是在这个路径下找
        const output = this.destinationPath('bar.html');
        // const content = {
        //     title: '测试一下',
        //     success: true
        // }
        const content = this.answers
        this.fs.copyTpl(tmpl, output, content)
    }
}


// module.exports = plop => {
//     plop.setGenerator('component', { //自己定义名称，后面执行命令用
//         description: 'creat a component',
//         prompts: [{
//             type: 'input',
//             name: 'yourName',
//             message: 'component name',
//             default: 'Mycomponent'
//         }],
//         actions: [ //真正执行的配置
//             {
//                 type: 'add', // 代表新增文件
//                 path: 'src/components/{{yourName}}/{{yourName}}.js', //
//                 templateFile: 'plop-templates/components.hbs' //后缀名是一种模板类型
//             }
//         ]
//     });
// };