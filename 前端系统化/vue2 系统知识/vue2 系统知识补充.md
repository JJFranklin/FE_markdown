疑问
1、render 是怎么运行的，是怎么产生 vnode 的?
2、 watcher 里面传出一个render函数是怎么样的一个过程？
模板和虚拟 dom 的关系

1、在编译过程中，将模板转换成 AST（抽象语法树）；
2、再将抽象语法树，转换为 render 函数；

provide / indeject
响应式传值的方式
在 父组件 中，provide属性值是一个函数 返回一个对象过去，并且对象中的属性是响应式的，通过函数进行返回
```javascript
// 父组件 传递响应式方式1
// name 响应式属性
provide:function(){
    return {
        name:()=>this.name
    }
}
// 父组件 传递响应式方式2
provide:function(){
    return {
        //  obj 是响应式的对象
        obj:this.obj
    }
}

// 子组件接收
indject:['name'],
// 或者 通过 computed 的方式返回一个新的属性
computed:{
    newName(){
        return this.name;
    }
}
```

v-model 既可以作用于表单元素，又可以作用于自定义元素

作用于表单元素的时候，默认生成一个  value 和  input 事件，比如说在 input 文本框式，作用于 单选多选框是，生成一个 checked 属性和一个 changed 事件；

作用于自定义组件时，默认是 value 属性和 input 事件；
也可以自己定义
```javascript
<Comp v-model="data">

// comp 组件
默认的情况下
props:['value']
methods:{
    click(){
        this.$emit('input', this.value);
    }
}

// 自定义的情况下 多了一个 model 属性
model:{
    prop:'customVal', // 自定义的属性 customVal
    event: 'change',// 自定义的事件 为change
}
props:['customVal']
methods:{
    click(){
        this.$emit('change', this.customVal);
    }
}
```

#### 生命周期
vue2 生命周期在组件销毁、创建，更新过程中，是一个由外（父组件）到内（子组件），由内（子组件）到外（父组件）逐层递归执行生命周期的过程
组件A -> 子组件B -> 子组件C

创建过程：

组件A: beforeCreated -> created -> beforeMount
组件B: beforeCreated -> created -> beforeMount
组件C: beforeCreated -> created -> beforeMount

组件C: mounted
组件B: mounted
组件A: mounted

更新过程

组件A: beforeUpdated 
组件B: beforeUpdated 
组件C: beforeUpdated 

组件C: updated
组件B: updated
组件A: updated

销毁过程

组件A: beforeDestoryed 
组件B: beforeDestoryed 
组件C: beforeDestoryed 

组件C: destory
组件B: destory
组件A: destory

#### computed 

1、对 computed 的处理是在 beforeCreated 生命周期后；
基本原理
它会遍历computed配置中的所有属性，为每一个属性创建一个Watcher对象，并传入一个函数，该函数的本质其实就是computed配置中的getter 属性访问器，这样一来，getter运行过程中就会收集依赖
但是和渲染函数不同，为计算属性创建的Watcher不会立即执行，因为要考虑到该计算属性是否会被渲染函数使用，如果没有使用，就不会得到执行。因此，在创建Watcher的时候，它使用了lazy配置，lazy 的默认值是true，lazy配置可以让Watcher不会立即执行。
受到 1azy 的影响，Watcher内部会保存两个关键属性来实现缓存，一个是value，一个是 dirty，value属性用于保存Watcher运行的结果，受lazy的影响，该值在最开始是 undefined
dirty属性用于指示当前的value是否已经过时了，即是否为脏值（是否需要重新计算），受1azy的影响，该值在最开始是 true，Watcher创建好后，vue会使用代理模式，将计算属性挂载到组件实例中
当读取计算属性时，vue检查其对应的Watcher是否是脏值，如果是，则运行函数，计算依赖，并得到对应的值，保存在Watcher的value中，然后设置dirty为false，然后返回。I

巧妙的是，在依赖收集时，被依赖的数据不仅会收集到计算属性的Watcher，还会收集到组件的Watcher
当计算属性的依赖变化时，会先触发计算属性的Watcher执行，此时，它只需设置dirty为true即可，不做任何处理。
由于依赖同时会收集到组件的Watcher，因此组件会重新渲染，而重新渲染时又读取到了计算属性，由于计算属性目前已为dirty赋值为true，因此会重新运行getter进行运算
而对于计算属性的setter，则极其简单，当设置计算属性时，直接运行setter即可

#### 插槽的原理
？？？需要重新梳理

#### keep-alive 

1、避免组件频繁切换，频繁创建，销毁组件，减少创建组件带来的开销；
2、同时可以保留组件的状态













