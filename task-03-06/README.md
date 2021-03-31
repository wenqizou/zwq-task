解答题：
1、说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

解答：

application/json：以 json 格式来提交数据
application/x-www-form-urlencoded：以表单格式提交数据，数据序列化

2、说一说在前端这块，角色管理你是如何设计的。

- 添加角色功能
- 角色列表展示，角色编辑、删除、以及角色列表搜索
- 给角色添加菜单权限、以及修改菜单权限
- 给角色添加数据操作权限、以及修改数据操作权限
- 在用户列表中给用户设置不同的角色让其拥有不同的权限

3、@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

抽离cli service层，使构建更新更加简单
插件化，如果你要做深度的vue-cli定制化，不建议直接写在vue.config.js中，而是封装在插件中，独立的维护这个插件，然后项目再依赖这个插件。这样就可以简化升级的成本和复杂度。
GUI界面
快速原型开发，直接将一个vue文件跑起来，快速原型开发或验证某些想法
现代模式，给先进的浏览器配合先进的代码(ES6之后),同时兼容旧版本的浏览器，先进的代码不管从文件体积还是脚本解析效率都有较高的提升。
4、详细讲一讲生产环境下前端项目的自动化部署的流程。

**(目前没有实际操作了，实在是太忙了，急于解锁后面课程，所以先按之前作业中的自动化处理)**

将本地代码加入 git 管理

设置 token

目录所在地 Settings --> Developer settings --> Personal access tokens
起一个名称， 勾选第一个选项 repo
得到 token 保存后续使用，这个 token 只出现一次
配置 Secrets

在项目中点击 Settings --> Secrets --> New repository secret
名字 TOKEN 内容： 上一步获得的 token
名字 HOST 内容： 服务器外网 ip
名字 PASSWORD 内容： 服务器密码
名字 PORT 内容： 默认 22
名字 USERNAME 内容： root
项目根目录创建 pm2.config.json

{
  "apps": [
    {
      "name": "name",
      "script": "npm",
      "args": "start"
    }
  ]
}
项目根目录创建 .github/workflows/main.yml

编写执行的任务
将所有代码提交 git 创建tag提交

提交成功后在github项目上查看构建状态 Acctions

点击 Releases 查看历史版本

5、你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

**当前项目没有敲完，后续找时间补上，现实工作安排量多，涉及到前端监控埋点和组件库的开发维护，都是要花时间的调研的，所以只能说出现实工作中开发的问题：**

- 就拿监控埋点来说，拦截Http请求，获取api url 、responseCode ，就是看xmlhttprequest对象的各种API 文档，然后先将自己要实现的功能TODO 备注，个个击破，然后再代码监视
- canvas 绘制一个标签云围绕头像，因为头像是椭圆，所以当时没有现成的，所以是自己直接花，画中间头像还好，但是画标签就麻烦，如何考虑这个位置能不能画下这个标签，然后找资料，通过canvas的方法去判断该位置是否有像素，有的画就重新随机位置
- 画像在移动端不清晰，将画板放大一倍，然后控制显示宽度为一倍，这样就清晰了

6、针对新技术，你是如何过渡到项目中？

解答：首先进行技术的预判，看项目中是否合适以及该技术是否成型。在遇到问题时是否能有解决的方案。该技术的稳定性，基本都符合了，会在新的项目中使用部分功能，不会将老项目全部迁移。