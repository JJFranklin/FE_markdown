#### Vue 的基本梳理

- 语法

- 事件绑定、事件处理缩写

- 插槽

- Vue 单文件组件

- Vue 模板

- 父子组件传值、兄弟组件传值

  ```
  1、props & emit 
  2、eventBus事件总线,触发事件$emit 接收触发事件$on 
  3、vuex
  ```

- Vue 路由

- Vue 指令 v-if、v-show、v-for等

- 计算属性

- Watch

- 生命周期

  ```
  挂载：父组件 created -> 子组件 created -> mounted -> 父组件 mounted
  更新：父组件 beforeUpdate ->子组件 beoforeUpdate ->updated -> 父组件 updated
  销毁：父组件 beforedestory -> 子组件 beforestory -> destory -> 父组件destory
  ```

- vue 中css 和style样式处理

- vue 高级特性

  自定义v-model(自定义双向绑定)

  $nextClick

  > 对data中的属性进行改变之后，不会立即更新dom元素，不能获取到最新的dom 节点；
  >
  > 因为 vue 渲染是异步渲染，$nextTick等渲染完，在回调函数中拿到最新的dom 节点；

  slot：父组件向子组件插入一部分内容

  > 插槽作用域：含有slot 定义的子组件，传参数到父组件；

  动态组件

  > <component :is="componentName"> </component>

  异步组件

  > import 按需加载组件：()=>import(" 组件名称 ");
  >
  > 性能优化点1

  keep-alive

  > 缓存组件
  >
  > 页面内容是静态的，不需要根据数据渲染
  >
  > 性能优化点2

  Mixin

  > 提取组件的公共逻辑部分
  >
  > 问题
  >
  > 1、使用用多个mixin时，多个mixin里面，会出现命名相同的情况

- vue 响应式原理



vue 深度监听，拿不到oldVal值

v-for 和 v-if 不能一起使用：v-for比v-if 的优先级高   

vue的事件是挂在的触发事件的元素上

vue触发事件传输的event 对象是原生的event 对象

- vuex

> 

- vue-router



- Vue 原理

   Object.defineProperty 缺点

  > 1、循环遍历嵌套对象，不能用到时进行再进行遍历
  >
  > 2、对数组进行监听时，需要特殊处理：使用Objecr.create生成一个对象，指向数组原型，不影响数组对象上的方法

  虚拟dom的js对象结构

  ```javascript
  // 此处将文本节点，不算做子节点，需要确认
  {
    tag:"div",
    text:"",// 没有dom 标签(也就是没有children)，只有文本节点，
    // 没有文本节点，只有dom 标签(也就是只有children)
    children:[
      {
        tag:"fdsafsd",
  			props:{},
        children:[],
      } 
    ],
    props:{
      className:"tag-class",
      id:"c1",
      style:{
        "fontSize":"14"+px,
      }
    }
  }
  ```

   diff 基本方式

  >0、是一个树结构的数据 
  >
  >1、只进行同一层级比较，不进行深度比较；
  >
  >2、同一层级，不同的接节点类型不相同，不进行比较；
  >
  >3、节点类型不同，key 也不相同，直接删除掉旧的节点，添加新的节点；
  >
  >使用key 在diff 函数中比价是否是同一节点，提高渲染效率

  template-complier生成render函数，render函数执行返回vnode

  >createElement是其中的要点

- vue 渲染和更新的过程

  基本要点：模板编译、Vnode、patch、diff 算法、render 函数、响应式

  >初次渲染：
  >
  >1、通过template-complier 将vue 的模板解析转化成render 函数；
  >
  >2、对data 属性进行响应式处理，使用object.defineProperty添加setter和getter属性访问器，并在此时进行依赖收集，对每一个属性添加依赖，进行监听；
  >
  >3、运行render 函数生成Vnode;
  >
  >4、使用patch(ele,Vnode),将生成的Vnode path到对应的元素之中；
  >
  >更新的过程：
  >
  >1、用户操作导致，data 属性变化，触发对应的setter 属性访问器，通知对应的依赖发生变化；
  >
  >2、依赖发生变化，运行render 函数（此处需要进行确定），重新生成新的vnode ；
  >
  >3、运行patchVnode函数，新旧节点进行比较(diff 算法)，返回最新的节点，
  >
  >异步渲染

-  Vue-router 的路由模式

  单页面(spa)应用：hash 模式和h5 history，都可以切换以页面，但是不刷新页面

  hash 

  > window.onhashchange();
  >
  > 监听hash 变化，切换到对应的单页面

  h5-history:需要服务端支持

  > history.pushState();// 添加新的路由
  >
  > history.popState();// 前进后退
  >
  > 切换到对应的单页面
  
  路由守卫
  
  > 

#### webpack 基本梳理

https://juejin.cn/post/6844903726981840904

https://notes.jindll.com/webpack/20%20Webpack%20%E4%BC%98%E5%8C%96%E4%B9%8B%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96.html#%E5%88%A9%E7%94%A8%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%8F%90%E5%8D%87%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6

webpack 基本配置

> webpack-merge 合并公共部分和开发和生产环境的配置，避免重复性的公共代码

webpack 构建和打包

webpack 高级配置

> 多入口配置
>
> entry 需要设置多个js 文件，设置多个入口文件
>
> HtmlWebpackPlugin配置需要设置chunks
>
> chunks 设置页面引入哪些js 文件
>
> splitChunks：根据实际的需求进行打包



webpack 中loader 和plugin

loader

> 主要将依赖的非js 的模块，转化为能够识别的js语言。
>
> 转化的时机：加载依赖模块的时候
>
> 比如，less-loader 将less 语言转化为css
>
> css-loader:将css 转化能够识别的js模块
>
> style-loader : 将转化的css模块生成style 标签插入到dom 结构中

plugin

> webpack 的插件，扩展丰富webpack 的功能
>
> 作用于webpack的整个流程

webpack 构建优化—构建速度

> Dllplugin: 将同一个第三方库直接打包好，不用每次构建都需要打包
>
> 1、先使用Dllplugin，预打包；
>
> 2、需要使用第三方依赖库的时候，使用DllReferPlugin在manifest.json 查找是否有第三方库，如果有，直接引用打包的文件
>
> 优化bable-loader ：
>
> happyPack：开启多进程打包
>
> IgnorePlugin：利用正则表达式，对插件中某些部分，不进行打包
>
> noPrase：设置不需要解析的文件/模块，比如第三方库等
>
> ParallUglifyPlugin：多进程压缩js，一般在生产环境；
>
> 热更新：状态不会丢失，网页不刷新；
>
> 自动刷新：状态会丢失，整个网页全部刷新，速度较慢

多进程打包：对于大项目来说，可以提高构建速度；小项目，可能会降低速度，因为开启多进程会有开销；

splitChunks：代码分割，避免重复打包，减少打包的后的体积

https://segmentfault.com/a/1190000021074403

> 作用:
>
> 单独分割出公共部分依赖；
>
> 提高代码打包的速度；
>
> 使用场景：
>
> 1、将代码按照需要分割，按照每个页面需要得依赖进行加载，一般和有多个入口文件配合使用；
>
> 2、打包的时候，避免重复打包依赖；

多入口文件打包配置

> entry：需要多个入口js文件
>
> 需要配置多个 min-css-extract-plugin 
>
> 需要配置 多个 htmlWebpackPlugin 

webpack 开发环境需要放的配置

> 热更新
>
> 代理配置
>
> sourceMap:方便调试
>
> eslint 等规范工具

webpack  生产环境需要放的配置

> 压缩css、js 代码
>
> 去除注释和console
>
> 提取公共代码

es6 module 和 commjs 的区别

mutation 什么建议是同步

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65

vuex

https://www.yht7.com/news/9777

