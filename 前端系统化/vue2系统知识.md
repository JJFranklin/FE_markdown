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
  2、eventBus事件总线,触发事件$emit 接收触发事件$on，相当于把数据传递给兄弟组件，兄弟组件再将数据传递给接受的组件
  3、vuex
  4、$attr：后代组件（包括子组件、孙子组件）接收除了在props 中已经定义了的所有父组件中子组件定义的属性，不包括class 和style
  5、$linstener：子组件或者孙子组件可以拿到所有在父组件中定义在子组件上的监听事件。
  6、provider 和 inject
  7、this.$ref 的形式

  ```

  ```
dep 和 watcher 是多对多的关系
每个属性 都有一个dep属性 ，dep 存放着watcher .
dep中可以有多个watcher ，因为一个watcher可能被多个属性所依赖
```
- Vue 指令 v-if、v-show、v-for等

- 计算属性

- Watch

- 生命周期

  ```
  挂载：父组件 created -> 子组件 created -> mounted -> 父组件 mounted
  更新：父组件 beforeUpdate ->子组件 beoforeUpdate ->updated -> 父组件 updated
  销毁：父组件 beforedestory -> 子组件 beforedestory -> destory -> 父组件destory
  ```

- vue 中css 和style样式处理

- vue 高级特性

  自定义v-model(自定义双向绑定)

  $nextTick

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
  > 2、mixin 里面，如果使用data 属性，会覆盖掉组件的data 属性
  > 3、mixin 里面，如果使用生命周期钩子，会覆盖掉组件的钩子
  > 4、不能显示的知道属性或者方法来自于哪一个mixin
  > 5、data 中的属性会合并
  > 6、props、methods、inject、computed 后面的覆盖前面的
  > 7、生命周期和 watcher 是 放在队列中顺序执行
  > 8、申明的 component、指令和过滤器都是通过原型链层层叠加

  Vuex

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
mutations: 提交事件的中介，接受事件类型
actions：提交mutations的地方，改变状态前的一个步骤，一个actions,可以包含多个mutation，也已包含异步操作；
modules：多个复杂的项目，可以根据业务逻辑分多个模块，每一个模块中包含完整的（state,getter,actions,mutations）使用的时候，可以通过模块路径分别引用其中的state,action
```

- Vue 原理
  
  vue 依赖收集 

  每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
  
  > 1、vue 实例化的时候，会对属性进行响应式处理，在响应式处理过程中，设定getter 和 setter 函数；
  触发getter，会进行依赖收集，将响应式属性收集到对应的依赖中；
  >
  > 2、当响应式属性发生变化的时候，会触发对应的setter 属性访问器，通知对应的依赖发生变化；
  >
  > 3、依赖发生变化，会重新运行render 函数，重新生成新的vnode；
  >
  > 4、运行patchVnode函数，新旧节点进行比较(diff 算法)，返回最新的节点；
  >   
  > 5、再次将新的节点渲染到界面上。 

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
        text:"",
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

  依赖收集到更新的的细节

  ```javascript
  1、vue 在进行实例化的时候，会对属性进行响应式处理，并且在响应式处理过程中，会触发`getter`访问器，同时生成一个 `dep` 实例，进行依赖收集，将和当前属性有关的依赖(watcher)全部收集到dep 中，如果有嵌套的情况进行递归依赖收集；
  2、在数据变化之后，会触发 `setter` 访问器，通知 对应的`dep`,触发 `notify` 方法，实质是遍历的 dep 中收集的 `watcher`，执行watcher 的`update` 方法；
  3、在 update 方法中，会将watcher放到一个数组 queueWatcher 中；
  4、在 queueWatcher 中，先判断此时的 watcher 是不是已经在更新队列中，如果不是，标记为ture,代表其添加到更新队列中
  5、接着判断，更新队列是否正在更新中，如果是在更新中，用此时的 watcher.id 做对比，如果比他大的还没执行，就直接插入到刚好小于他的 watcher.id 之前，等待执行；
  6、第一次执行的时候，队列的初始等待状态`waiting`为false，就直接执行，如果是true，说明已经有队列正在执行，等待上一个执行完毕。执行放在在 `flushSchedulerQueue` 函数中，在函数中遍历执行 watcher.run()，对对应的数据进行新旧替换；
  7、数据新旧替换完成后，在遍历调用 `update`的生命周期函数，更新依赖此属性的组件实例。
  8、`flushSchedulerQueue` 里面的操作是放在 `nextTick`中执行，就可以保证，保证所有的依赖属性变化完毕后，一次更新完队列中的watcher，得到新的 vnode，最后重新更新页面

  ```
  nextTick 原理
  vue 异步更新的基本，
  比如问：在更新后，数据更新了，但是dom没有更新，为什么？
  因为vue的更新是异步的，数据更新是在 dom 更新之前，所以会出现可以获取新的值，但是dom 还未更新，这时候针对数据类型，手动触发更新。
  同时也可以在nextTick回调中对dom进行操作。 

  ```javascript
  1、nextTick 函数主体主要是将 nextTick 的回调函数收集在一个数组中 callbacks 中；
  2、然后再 timeFunc 函数中统一遍历执行 callbacks；
  3、timeFunc 函数执行策略，是将 `统一遍历执行 callbacks` 这个操作根据不同的情况，作为 setTimeout、setImmdiate 等宏任的回调中，或者放在 mutationObserver、以及promise.then 中，确保，回调能够在下一轮的事件循环队列中执行，将宏任务或者微任务在执行栈中运行。
  4、保证了频繁操作同一个数据，不会频繁执行数据更新，页面渲染等操作。
  5、也可以保证在上一个 dom，更新完毕后可以在 nextTick 的回调中，拿到最新的 dom 元素 

  ```

  keep-alive 基本解释
  https://juejin.cn/post/6862206197877964807
  需要理清楚 组件缓存机制，组件初次渲染流程，组件更新流程

  组件缓存机制
  ```javascript
  1、获取第一个组件，因为keep-alive 要求同时只有一个子元素被渲染
  2、会根据include 和 exclude 来对 Vnode 进行过滤，得到实际需要缓存的组件；
  3、在渲染的时候，会比较当前的子组件有没有被缓存，如果没有缓存，直接加入到缓存队列中，如果被缓存了，证明这个组件此时被使用了，就会将此组件加入到队列的队尾，表示你是最近使用的。
  4、接着比较缓存数组的长度和最大能够缓存数组的数量，如果超过了最大缓存数量，删除掉第一个，因为第一个事使用频率最低的，保证每次都不超过最大缓存数。

  ```

  组件初次渲染流程
  发生在 patch 阶段

  ```javascript
  1、keep-alive 是个虚拟组件 abstract 为 true，不会和包裹的组件建立父子关系，会将包裹keep-alive 的组件作为父组件；
  2、初次渲染的时候，在 patch 流程中是通过`createComponent`来创建组件的。
  3、在`createComponent`中由于包裹的组件还未挂载成功，此时的组件实例是undefined，经过判断，进入到组件初始化阶段，就是`componentVNodeHooks`中的 init 函数;
  4、在初始化组件函数中，此时还没有组件实例，判断进入创建组件实例逻辑`createComponentInstanceForVnode` 中，并返回创建的组件；
  5、重新回到 `createComponent`，此时被包裹的组件实例创建完毕，就会将创建的组件实例插入到父元素中。
  6、同时将组件缓存起来。

  ```
  组件更新流程
  ```javascript
  1、切换缓存组件的过程也发生在 `patch`中，属于组件更新，会调用patcheVnode函数；
  2、在patchVnode 中，keep-alive 是相当于包裹着一个插槽，因此会走resolveSolt 方法，解析插槽，返回执之前缓存的插槽，并强制更新渲染，需要再走一遍渲染流程，重新进入到 `createComponent` 中；
  3、在 createComponent 中判断已经存在了 组件实例，进行 componentVNodeHooks.prepatch 操作，就不会进行 created 和mounted 的阶段，直接将新的节点插入到父组件中。
  4、节省了资源和性能。
  ```

  render 函数
  ```javascript
  实质是运行createElement() 函数,返回一个Vnode
  createElement（TagName，Option，Content）接受三个参数 createElement(" 定义的元素 "，{ 元素的性质 }，" 元素的内容"/[元素的内容])
  ```

  插槽的编译渲染过程
  默认插槽，具名插槽、作用域插槽
  ```javascript
  1、插槽一般时候会被父组件包裹，那么解析编译的时候，父组件就会先于插槽，而且会将插槽作为子元素处理放到存储子元素数组children中；
  2、在解析编译的过程中，遇到 slot 开头的时候，会将 slot的元素变成对应的vnode，存储起来；
  3、在对插槽进行解析编译的时候，会使用 resolveSlot 函数，里面接受2个参数，一个是上一步产生的子元素数组，另一个就是父元素的实例 vm;
  4、在 resolveSlot 主要执行的是对 children 的遍历，获取里面每一个元素的 slot 名称，和2中生成的vnode，拼凑成一个以slot名称为key,vnode 的 对象 vm.$slots;
  5、在 对插槽进行渲染的时候，会将上述步骤中生成 vm.$slots 在父组件渲染的时候，就可以对插槽进行替换。
  ```

  diff 基本方式
  
   v-for 循环的时候不推荐使用index 做key 
   原因：https://juejin.cn/post/6844904113587634184
   基本概括：
   1、数组数据改变顺序的时候导致不能复用旧节点，会重新生成新的节点，进行页面渲染，导致性能损失很大，
   2、删除某一个元素的时候，使用index 做key，会导致删除错误；
   3、使用随机数做key，基本上数据不能复用，将原来的旧节点删除，然后会重新创建新的节点，性能损失很大。


  https://www.infoq.cn/article/udlcpkh4iqb0cr5wgy7f

  >0、是一个树结构的数据 
  >
  >1、只进行同一层级比较，不进行跨层级比较，降低算法复杂度（时间复杂度）；
  >
  >2、同一层级，不同的节点类型不相同，不进行比较；
  >
  >3、节点类型不同，key 也不相同，直接删除掉旧的节点，添加新的节点；
  >
  > 使用key 在diff 函数中使用 `sameNode 函数` 比较 是否是同一节点，提高渲染效率
  > 判断 sameNode 的时候，只会判断key、 tag、是否有data的存在（不关心内部具体的值）、是否是注释节点、是否是相同的input type，来判断是否可以复用这个节点

  template-complier生成render函数，render函数执行返回vnode

  >createElement是其中的要点

- vue 渲染和更新的过程

  基本要点：模板编译、Vnode、patch、diff 算法、render 函数、响应式

  >初次渲染：
  >
  >1、通过template-complier 将vue 的模板解析转化成render 函数；
  >
  >2、对 data 中的属性进行响应式处理，同时通过 object.defineProperty 添加setter和getter属性访问器，并在此时进行依赖收集，对每一个属性添加依赖，进行监听；
  >
  >3、运行render 函数生成Vnode;
  >
  >4、使用patch(ele,Vnode),将生成的Vnode patch到对应的元素之中；
  >
  >更新的过程：
  >
  >1、用户操作导致，data 属性变化，触发对应的setter 属性访问器，通知对应的依赖发生变化；
  >
  >2、依赖发生变化，重新运行 render 函数，重新生成新的vnode ；
  >
  >3、运行patchVnode函数，新旧节点进行比较(diff 算法)，返回最新的节点;
  >
  >4、再次将新的节点渲染到界面上。

  >异步渲染


-  Vue-router 的路由模式
  
单页面(spa)应用：hash 模式和h5 history，都可以切换以页面，但是不刷新页面

#### Hash
hash 模式下，
1、不会重新加载页面，
2、每一次修改了# 之后的值，会在历史记录中增加一条新的记录，因此前进或者后退不需要请求服务端
3、hash 不需要提交到服务端
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

window.addEventListener('hashchange', () => {
   // 传入当前url的hash，并触发跳转
   this.transitionTo(window.location.hash.slice(1))
})

let routerView = routeView
 window.addEventListener('hashchange', ()=>{
     let hash = location.hash;
    //  加载路由对应的单页面
     routerView.innerHTML = hash;
 })

```
  
#### h5-history:需要服务端支持（访问二级页面或者刷新的时候，因为此时路由中并没没有配置对应二级页面路径）
原理：利用html5 新增的 history.popstate 和  history.pushstate、replaceState，api加载不同的页面。
跳转是不刷新页面
但是导航到一个全新的 路径 时需要服务端支持
> history.pushState 浏览器历史纪录添加记录
> history.replaceState 修改浏览器历史纪录中当前纪录
> history.popstate 当 history 发生变化时触发

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

window.addEventListener('popstate', ()=>{
     routerView.innerHTML = location.pathname
 })


```

#### 路由守卫

全局守卫
beforeEach: 全局前置路由守卫，每个路由在进入之前都会经过此路由，通常在此处进行权限判断，进度条等提示操作；
beforeResolve: 全局解析路由守卫，在异步组件被解析之后被调用。
afterEach: 全局后置路由守卫，


路由独享守卫
beforeEnter: 路由独享守卫，只出现在，路由配置配置中

组件独享路由守卫
beforeRouteEnter: 在组件进入之前调用
beforeRouteUpdate: 当前路由改变，但是该组件被复用时调用
beforeRouteLeave: 在离开当前组件路由时，被调用


mutation 什么建议是同步

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65
>
> https://www.zhihu.com/question/48759748/answer/112823337

#### Vue 源码解析
依赖收集的是什么东西？
> 依赖收集工作，收集的依赖是组件在模板里或者render里使用到的响应式属性。

vue 编译选择顺序
render 函数、template、outHtml;

##### vue 中是 style scoped 的作用
唯一 id的生成规则：项目名+文件路径+文件名
1、每个 Vue 文件都将对应一个唯一的 id，该 id 根据文件路径名和内容 hash 生成，通过组合形成scopeId；
2、编译 template 标签时，使用 templater-loader 生成一个唯一 scopeId，添加到vnode上作为属性；
3、同时 将 vnode 变成真实的 dom时，会将scopeId作为配置属性传递到 createElement 函数中，渲染到真实的 dom 上；
4、编译 style 标签时，会给样式添加一个`data-v-scopeId`的属性，这样单文件内的样式就不会污染其他单文件组件

watcher 有四种 
1、deep: 深入监听的watcher
会对监听的对象进行深层递归调用，响应式处理里面属性，这样，里面的深层次属性改变的时候就可以监听到

2、sync: 同步的 watcher
当响应式数据发送变化后，触发了 `watcher.update()`，只是把这个 `watcher` 推送到一个队列中，在 `nextTick` 后才会真正执行 `watcher` 的回调函数。
而一旦我们设置了 `sync`，就可以在当前 `Tick`事件循环队列中同步执行 `watcher` 的回调函数

3、user watcher
通过 `vm.$watch` 创建的 `watcher` 是一个 `user watcher`，其实它的功能很简单，在对 `watcher` 求值以及在执行回调函数的时候，会处理一下错误。

4、computed watcher 
1、并不会立即求值
2、只会在访问到对应的 对应的计算属性，就会发起这个计算属性所有的依赖的 getter 函数，返回最新的值；
