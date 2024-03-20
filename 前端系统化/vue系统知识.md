#### Vue 的基本梳理

- 语法

- 事件绑定、事件处理缩写

- 插槽

- Vue 单文件组件

- Vue 模板

- vue 响应式原理

  https://blog.windstone.cc/vue/source-study/observer/

- 父子组件传值、兄弟组件传值

  ```
  1、props & emit 
  2、eventBus事件总线,触发事件$emit 接收触发事件$on 
  3、vuex
  4、$attr：后代组件（包括子组件、孙子组件）接收除了在props 中已经定义了的所有父组件中子组件定义的属性，不包括class 和style ；
  5、$linstener：拿到所有在父组件中定义在子组件上的监听事件。
  ```

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

> 核心:state、getter、actions、mutations、modules
```javascript
state：整个全局的数据对象，尽量不用太多嵌套，打平；
getter：对于state中数据根据业务逻辑进一步封装，满足页面显示的内容；
actions：提交mutations的地方，改变状态前的一个步骤，一个actions,可以包含多个mutation，也已包含异步操作；
modules：多个复杂的项目，可以根据业务逻辑分多个模块，每一个模块中包含完整的（state,getter,actions,mutations）使用的时候，可以通过模块路径分别引用其中的state,action
```

- vue-router



- Vue 原理

  Object.defineProperty 缺点

  > 1、循环遍历嵌套对象，不能用到时进行再进行遍历
  >
  > 2、对数组进行监听时，需要特殊处理：使用数组原型对象，Objecr.create生成一个新对象，基于数组对象原型上的方法重写方法，不影响数组对象上的方法。
  > 3、vue 不能监听数组对元素下标的修改和数组长度改变，因为数组元素的length 是不可枚举和不可配置的

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
   v-for 循环的时候不推荐使用index 做key 
   原因：https://juejin.cn/post/6844904113587634184
   基本概括：
   1、数组数据改变顺序的时候导致不能复用旧节点；
   2、删除某一个元素的时候，使用index 做key，会导致删除错误；
   3、使用随机数做key，基本上数据不能复用，将原来的旧节点删除，然后会重新创建新的节点，性能损失很大。


  https://www.infoq.cn/article/udlcpkh4iqb0cr5wgy7f

  >0、是一个树结构的数据 
  >
  >1、只进行同一层级比较，不进行深度比较；
  >
  >2、同一层级，不同的节点类型不相同，不进行比较；
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
  >2、对data 属性进行响应式处理，同时使用object.defineProperty对属性添加setter和getter属性访问器，并在此时进行依赖收集，对每一个属性添加依赖，进行监听；
  >
  >3、运行render 函数生成Vnode;
  >
  >4、使用patch(ele,Vnode),将生成的Vnode path到对应的元素之中；
  >
  >更新的过程：
  >
  >1、用户操作导致，data 属性变化，触发对应的setter 属性访问器，通知对应的依赖发生变化；
  >
  >2、依赖发生变化，重新运行render 函数，重新生成新的vnode ；
  >
  >3、运行patchVnode函数，新旧节点进行比较(diff 算法)，返回最新的节点;
  >
  >4、再次将新的节点渲染到界面上。

  >异步渲染

-  Vue-router 的路由模式
单页面(spa)应用：hash 模式和h5 history，都可以切换以页面，但是不刷新页面

#### Hash
hash 模式下，不会刷新页面，不会增加历史记录；
前进和后退也不会增加历史记录；
hash 不需要提交到服务端
只有改变hash的值才会在添加一条新的历史记录；
原理：监听 window.history.hashchange 事件改变，触发路由变化，加载不同的页面。
> window.onhashchange();
> 监听hash 变化，切换到对应的单页面
> hash值 不会传输到服务端，即不会参与服务端请求；

hash 原理代码实现
```javascript
window.onhashChange = (event)=>{
   // 获取url 的值
   let newURL = evetn.newURL;// 新的地址
   let oldURL = evetn.oldURL;// 旧的地址
   let newHash = location.hash;
   // 根据路由变化，加载不同的hash 值也就是不同的单页面
   location.href = newHash;
}

```
  
#### h5-history:需要服务端支持（访问二级页面或者刷新的时候，因为此时路由中并没没有配置对应二级页面路径）
原理：利用html5 新增的 history.popstate 和  history.pushstate、replaceState，api加载不同的页面。
跳转是不刷新页面
> history.pushState();// 添加新的路由 添加历史记录，不触发跳转
> history.popState();// 前进后退
> replaceState // 改变当前历史的历史记录 也不触发跳转

history 代码实现
```javascript
// 第一部分：打开新的路由
// 1、state对象 
state = {name:"page1"};
let url = "";
let title = "";
// 2、使用history.pushState() 打开一个新的路由
history.pushState(state,title,url);
// 3、服务端会根据url，看返回或者加载哪个页面；

// 第二部分：监听前进和后退
window.onpopstate = (event)=>{
  history.pushState(evetn.state,"",location.pathname);
}

```



mutation 什么建议是同步

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65
>
> https://www.zhihu.com/question/48759748/answer/112823337

#### Vue 源码解析
依赖收集的是什么东西？
> 依赖收集工作，收集的依赖是组件在模板里或者render里使用到的响应式属性。

vue 编译选择顺序
render 函数、template、outHtml;