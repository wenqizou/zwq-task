const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        }]).then(answer => {
            this.answers = answer
        })
    }
    writing() {
        var templates = [
            '.gitignore',
            'babel.config.js',
            'package.json',
            'README.md',
            'vue.config.js',
            'config/webpack.base.config.js',
            'config/webpack.dev.config.js',
            'config/webpack.prod.config.js',
            'public/favicon.ico',
            'public/index.html',
            'src/App.vue'
        ]
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}