### vue 3  diff 算法

https://zhuanlan.zhihu.com/p/150103393

1、ref、toRef、Reactive、toRefs

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
2、如果想监听，可以使用一个函数`getter`的形式;
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







