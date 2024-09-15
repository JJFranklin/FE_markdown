### vue 3  diff 算法

https://zhuanlan.zhihu.com/p/150103393

1、ref、toRef、Reactive、toRefs

vue 3 响应式处理的缺点，处理后的对象和和原来的对象有很大的不同，甚至不是原来的对象

ref: 将基本数据类型变成响应式
也可以将对象变成响应式，实质是通过`reactive`的方式转换，但是需要通过 `.value`的形式访问和修改
```javascript
let name = ref('franklin');
name.value  = 'baike';

// 将对象通过ref 变成响应式
const obj = ref({
    name:'franklin',
    sex:'male',
    info:{
        school:'daxue',
        schoolInfo:{
            no:1
        }
    }
});

obj.value.name = 'bailke';
```

reactive: 将对象，数据等变成响应式数据
```javascript
const obj = reactive({
    name:'franklin',
    sex:'male',
    info:{
        school:'daxue',
        schoolInfo:{
            no:1
        }
    }
});
// 修改数据对象不需要通过 .value 的形式
obj.info.schoolInfo.no = 5;
// 直接对 reactive 类型的对象使用 `...` 解构运算会使其丧失响应式
// 通过先 toRefs 的方式，再解构可以保留响应式
```
在实际的开发过程中，reactive 声明的对象，不能直接赋值，会丢失响应式；

```javascript
每次直接把一个对象或者数组赋值给reactive创建的对象或数组时，导致reactive创建的响应式对象被新赋值的直接代理，再vue3中操作的都是proxy代理对象，所以失去了响应式
在vue3中不管是对象还是数组都不能直接将整个数据进行赋值，这样会造成reactive定义的响应式失效
通俗说： 就像对象的地址被替换，就不是原来的那个对象了
自己的理解：
在进行 reactive 声明一个对象赋值给一个变量的时候，此变量是保存了 指向 reactive 声明对象的地址，变量有了响应式
再次对 变量进行重新赋值新的对象时，相当于将新对象的地址赋值给原来的变量，导致响应式丢失。

 // 当reactive 之后返回一个代理对象的地址被vue 存起来，
 // 用一个不恰当的比喻来说，就是这个地址具备响应式的能力
 const vue = reactive({ a: 1 })
 
 //  而当你对于vue重新赋值的时候不是将新的对象赋值给那个地址，而是将vue 换了个新地址
 // 而此时新地址不具备响应式，可不就失去响应式了吗
 vue = { b: 2 };
 
```
解决方案
1、将原来的reactive 对象包一层，将原来需要赋值的对象变成新对象的一个属性，需要赋值的时候，赋值给对应的属性；
// 原来的对象
const foo = reactive({
    name:'',
    age: 12
});
// 这样赋值会丢失响应式
foo = {
    name:'344',
    age:35
}

// 修改方式，外面再包一层
const foo = reactive({
    info:{
    name:'',
    age: 12
    }
});
// 不会丢失响应式
// res.data 接口的返回值
foo.info = res.data

2、将原来的 reactive 声明的对象变成使用 ref 的声明方式

const foo = ref({});

// res.data 接口的返回值
foo.value = res.data;

``` 

toRef: 
1、将响应式对象的某个属性单独变为 ref 方式的响应式
2、两者保持引用关系

```javascript
const obj = reactive({
    name:'franklin',
    sex:'male',
    info:{
        school:'daxue',
        schoolInfo:{
            no:1
        }
    }
});

const nameRef = toRef(obj,'name');
// 通过 ref 的方式修改数据
nameRef.value = 'baike';
```

toRefs
1、一种用于破坏响应式对象并将其所有属性转换为 ref 的实用方法
2、将响应式对象（reactive封装）转成普通对象
3、对象的每个属性(Prop)都是对应的ref
4、两者保持引用关系

```javascript
const obj = reactive({
    name:'franklin',
    sex:'male',
    info:{
        school:'daxue',
        schoolInfo:{
            no:1
        }
    }
});
const reactiveRef = toRefs(obj);
obj.name.value = 'baike';

```

watch 对比 watchEffect

watch

1、只能监听响应式的数据，不能监听单个对象的属性；
2、如果想监听单个对象的属性，可以使用一个函数`getter`的形式;
3、使用的 getter 函数返回响应式对象的形式，那么响应式对象的属性值发生变化，是不会触发 watch 的回调函数的,
可以通过添加  `{deep:true}` 来深度监听

```javascript
//  getter 形式监听响应式对象属性
watch(
    ()=>info.name,
    (value,oldValue)=>{
        // 处理代码
    }
);
// getter 形式监听响应式对象
watch(
    ()=>info,
    (value,oldValue)=>{
        // 处理代码
    },
    {deep:true}
);
```

watchEffect

1、隐式的监听响应式的数据；
2、响应数据初始化时就会立即执行回调函数

```javascript
watchEffect(()=>{
    // 执行代码
});
```


watch 中的 flush 参数 有 post、pre、sync, 是回调的刷新时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。
这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

sync 同步触发的侦听器，能够同步监听 vue 组件的任何更新，不建议使用，性能损耗大 ？？？
pre 回调函数能访问 vue 组件更新之前的 dom，是默认值
post 表示将 watch 的回调函数放到微任务队列中，等到 vue 组件更新之后执行, 
能访问到 vue 组件更新之后的 dom，和 nextTick 的作用基本一致

https://segmentfault.com/q/1010000042325613


1、当 flush 为 sync 的时，表示它是一个同步 watcher，即当数据变化时同步执行回调函数
2、当 flush 为 pre 的时，回调函数通过 queueJob 的方式在组件更新之前执行，
    如果组件还没挂载，则同步执行确保回调函数在组件挂载之前执行
3、如果设置 flush 为 post，回调函数通过 queuePostRenderEffect 的方式在组件更新之后执行

vue 3优势
```javascript
Tree shaking 是基于ES6模板语法（import 与 exports），主要是借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量。

Tree shaking 做了两件事：

1、编译阶段利用ES6 Module判断哪些模块已经加载
2、判断哪些模块和变量未被使用，进而删除对应代码

Vue3更快主要体现在编译方面：

1、diff算法优化
2、静态提升：
    2.1、对静态的dom 或者文本，打上标记，在pacth diff 的时候不处理直接拿来使用。
    2.2、将静态dom的编译放在render函数之外处理，并且缓存起来，到diff 的时候直接拿来使用
3、事件监听缓存
4、SSR优化
5、模板优化：Fragments，模板无需创建唯⼀根节点。

```

vue 3 对比 vue 2

1、diff 算法优化，改用的双头比较的策略
2、响应式处理方式 由 Object.defineProperty 改为了 Proxy

主要区别
2.1、从 Object.defineProperty 绑定单个属性的方式，变成 Proxy 直接绑定一个对象，并且在 handler 中对对象的变化进行劫持，解决了vue2 中 对响应式处理的漏洞
2.1.1、新加入的属性，没有响应式；
2.1.2、对象嵌套层级深的情况，不需要像 vue2 中逐层递归遍历，vue3 中只对访问到的属性进行劫持处理，同时对于新加入的对象，在getter 对新加入的对象数据进行响应式处理
2.1.3、对于数组形式的情况，vue3 能对数组的 删除，添加等操作进行劫持，不需要像vue2 中重新覆写 数组原型上的处理方式

2、更加灵活的组件组织形式
3、使用tree-shakeing 的形式，减少打包体积；

3.1、Tree shaking是基于ES6模板语法（import与exports），主要是借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量
3.2、Tree shaking无非就是做了两件事：
3.3、编译阶段利用ES6 Module判断哪些模块已经加载
3.4、判断那些模块和变量未被使用或者引用，进而删除对应代码

4、可以有多个根节点
5、静态标记，将静态节点进行标记，在 patch 阶段不参与，提高效率；


### 问题
####  vue3 的插槽实现个和工作原理
####  setup 函数在选项式api 中和 composition Api 中的区别
setup 只在组件被挂载的时候执行一次
```js
// 一个组件里面必须有一个 render 函数
// 选项式api
// setup 函数接受2个参数

setup(props, context){
    // props 是组件接受外部传来的 props 属性
    // context 是当前组件的上下文，主要是 slots、emit、attrs等组件接口的重要数据
}
// 情况1：返回一个函数，会被用作 render 函数来使用，返回一个 vnode
setup(){
  return ()=>{
    return {type:'div', children:'我是setup'}
  }  
}
// 情况2：返回一个对象，返回的对象，将会给 模板使用
setup(){
  const name = ref('franklin');
  return {
    name
  };
  render(){
    return {
        type:'div', children:'我是setup'
    }
  }
}
```


##### 生命周期

https://blog.csdn.net/qq_42445025/article/details/121978510

![vue3生命周期](../md-images/vue%203%20生命周期.png)















