# TypeScript

### （一）概述

### （二）主要内容

1.强类型和弱类型
 强类型不允许又隐式类型转换；落泪行可以

 javascript的问题
  const obj={}
  obj.foo() //运行才报错

数字+‘字符串’==拼接字符串

强优势
1、错误更早提醒
2、代码智能，提示，准确
3、重构绕靠
4、减少不必要的类型判断


2.静态类型和动态类型
 静态类型就是申明之后的变量，类型就确定了， 相反动态就是可以改

3.javascript 自有类型系统问题

4.Flow静态类型检查方案

Flow java..类型检查其 
类型注解 ：:numbe--babel--->

两种方案处理：babel. flow-remove-types---删除类型注释。控制文件能再生产运行

运行才能提示错误，不友好，所以用插件处理错误提示Flow language support

cosnt a:number = NaN infinity

const :undfiend x void=undifend


元组

对象类型的限制

字面量类型--联合类型 a|b|c

type:xxx---maybe

mix any 联合类型。。string，boolean...
需要类型判断处理

any 类型
还是弱类型。。。

flow 资料
![](./note-img/3-2.png) 

内置对象 APi

HTMLElement 类型



4.Typescript语言规范与基本应用


java 超集，扩展 比flow 更强、生态更号

yarn tsc --init ==>配置表json--->strictNullChecks

原始数据类型


symbol()

标准申明库  声明文件

target-->lib['ES2015']...lib['ES2015','DOM']

配置ts 错误提示--vscode performenc


作用域

对象 不单指对象 const obj:{foo: nubmer,bar: string}={foo:1,bar:'xxx'}

数组类型  flow 基本一直

元组 tuple:[number,string]=[18,'xxx']  一一对应，不多不少

枚举

//定义状态，然后就能维护，这样其他模块中就能直接用，也不会因为时间久了不知道对应的code含义
enum state {
  undo=-1,
  doing=0,
  done=1,
}//不赋值就从0（或者赋值的第一个值的开始 ）累加，


const test={
  states:state.undo/.doing
}


函数类型


...rest 操作符控制任意参数


任意类型 any

隐式推断  就是赋值的变量会被认为是什么类型 can not x asssign..

类型断言 as  告诉它 这是什么类型  <string>a //jsx 不能


接口 interface -->其实就是定义数据的一个类型规范，有那些属性和属性类型

interface men{
  name:string;
  age:number;
  marry?:boolean//可选
  readonly xx: //只读属性
}

动态的接口定义

interface men{
  [tmp:string]: string  //key 随便命名，但是都要是string
}

类Class

类的修饰符--private 私有属性，public protected(子类能访问)  readonly

抽象类 abstract  注意要实现抽象方法

泛型
Array<T>---->Array<number>  ----》Array<string>  

类型声明
declare
