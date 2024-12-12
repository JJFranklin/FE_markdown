### commonJS 和 ES6 模块的区别
- CommonJS 输出的模块是一个值的拷贝，ES模块输出的是一个模块的引用；
- CommonJS 模块输出的是值的拷贝，一旦输出之后，无论模块内部怎么变化，都无法影响之前的引用，
- commonJS 会缓存加载的模块，后面直接从缓存里面取值；
- ESModule import一个模块后生成一个引用链接，在脚本真正执行时才会根据这个引用链接去模块里面取值，模块内部的原始值变了import加载的模块也会变。
- CommonJS运行时加载，ESModule编译阶段引用。
- CommonJS在引入时是加载整个模块，生成一个对象，然后再从这个生成的对象上读取方法和属性。
- ESModule 不是对象，而是通过export暴露出要输出的代码块，在import时使用静态命令的方法引用指定的输出代码块，并在import语句处执行这个要输出的代码，而不是直接加载整个模块。
- 暴露方式的区别，commonJS modules.exports = {module};ES6 export default module 或者 export {module} 
- 引入方式 commonJS require("module") es6 import {moduleName} from "module"