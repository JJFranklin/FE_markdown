/**
 * 在A中找出B，元素必须是连续的（也就是在A中找出连在一起的5，8，7），
 * 返回符合这种情况的B的第一个元素在A的位置（也就是5的位置，第3位），
 * 如果没有，返回一个负数；
 * 注意数组字符串拼接的时候会有类型转换
 */
let sourceArr = [1, 2, 3, 5, 8, 7, 6, 5, 9, 1, 1, 6, 9, 8]
let targetArr = [8, 6, 5];

function findIndex(targetArr, sourceArr) {
    let index = -1;
    let sourcelen = sourceArr.length;
    let targetlen = targetArr.length;
    let targetStr = targetArr.join("");
    if (targetlen > sourcelen) return index;
    for (let i = 0; i < sourcelen; i++) {
        let item = sourceArr[i];
        if (targetArr[0] == item) {
            if (i + targetlen - 1 > sourcelen - 1) {
                break;
            } else {
                let sourceStr = item;
                for (let j = 0; j < targetlen - 1; j++) {
                    sourceStr = sourceStr + "" + sourceArr[i + 1 + j];
                }
                index = sourceStr === targetStr ? i : -1;
                break;
            }
        }
    }
    return index;
}


// 手写bind 的实现
// 核心，返回一个新的函数
// 1、改变this 的指向，this指向第一个参数，
// 2、能够传参，传参形式和call一致
// 3、作为构造函数使用，实例能拿到调用函数的内部属性和原型链上的属性,this 指向实例对象
// 4、作为普通函数使用，this指向window

Function.prototype.bind2 = function (context) {
    var self = this;
    // console.log("self",self);
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {
        // console.log("this",this);
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fbound.prototype = this.prototype;
    console.log("fbound.prototype", fbound.prototype);
    return fbound;
}

/**
 * 继承：原型链继承、构造函数继承、原型链-构造函数组合继承、原型继承（Object.Create()）模式 
 */
// 原型继承：子类的原型对象是父类的对象实例
// 原理：obj.__proto__ = BaseClass.prototype;

/**
 * 缺点：引用类型的数据被所有数据共享，无论是定义在父类构造函数内的，还是定义在父类或者子类原型链上的
 * 引用类型的属性通常不定义在原型链上
 * 不能向父类构造函数传值
 */

function BaseClass() {
    this.name = "franklin";
}
BaseClass.prototype.sex = [1, 2, 3];

function Child(name) {
    this.arr = [556666];
}
// 关键步骤
// 子类原型对象是父类的实例
Child.prototype = new BaseClass();
// 构造函数指向自己
Child.prototype.constructor = Child;

// BaseClass.prototype.sexs= [1,2,3];

// let c = new Child();
// let c2 = new Child();
// c.arr.push("8","9");
// c.sex.push("5566")
// c.sexs.push("9999")
// console.log(c.name,c2.arr,c2.sex,c2.sexs,c.sexs,c.constructor);

/* 构造函数继承：使用call/apply 将父类的this指向子类对象实例，子类对象就可以访问父类的属性
缺点：属性全部定义在构造函数内，方法每次new一个对象都要重新定义方法，重复
*/
// function BaseClass(name,sex){
//     this.name = name;
//     this.sex = sex;
//     this.arr = [1,2,23];
// }

// function Child(name) {
//     BaseClass.call(this,...arguments); 
//     // this.arr = [556666];
// }

// let c = new Child("franklin","male");
// let c2 = new Child("franklin","male");
// c.arr.push(4,5,6,7);
// console.log(c.sex,c.name,c.arr,c2.arr,c.sexArr,c2.sexArr,c.constrcutor);


/**
 * 原型-构造组合继承：解决构造函数和原型链继承的问题
 * 属性定义在构造函数中，方法定义在原型链上
 * 
 */
function BaseClass(name, sex) {
    this.name = name;
    this.sex = sex;
    this.arr = [1, 2, 23];
}

BaseClass.prototype.setName = function () {
    this.name = "23542533";
}

function Child() {
    BaseClass.call(this, ...arguments);
}

Child.prototype = new BaseClass();
Child.prototype.constructor = Child;

// let c = new Child("a","b");
// console.log(c.name,c.sex);
// c.setName();
// console.log(c.name);
// 原型继承 Object.Create的实现模式

// 优化组合继承
// 缺点，子类生成对象实例的时候会调用了2次基类
function BaseClass(name, sex) {
    this.name = name;
    this.sex = sex;
    this.arr = [1, 2, 23];
}

BaseClass.prototype.setName = function () {
    this.name = "franklin";
};

function Child() {
    BaseClass.call(this, ...arguments);
}

// 通过Obiect.create(obj)创建的对象在新的对象实例的原型属性上
// let newObj = Object.create(obj); newobj.__proto__ = obj;
// newObj 继承了obj 的属性
function createPrototype(obj) {
    function Obj() {};
    // 构造函数原型对象指向父类的原型对象，可以继承父类原型对象上的属性方法等，并返回对象实例
    Obj.prototype = obj;
    let newObj = new Obj();
    return newObj;
}

function perfectInhert(children, parent) {
    // 返回继承父类属性之后的对象原型
    let newPrototype = createPrototype(parent.prototype);
    // 子类原型对象继承父类的原型对象属性
    children.prototype = newPrototype;
    // 还原子类构造函数为子类
    children.prototype.constructor = children;
}

perfectInhert(Child, BaseClass);
// let c = new Child("21354","3251235325");
// c.setName();
// let c1 = new Child();
// c.arr.push("45");
// console.log(c.name,c.arr,c1.arr);

// promise 的实现
// https://github.com/YvetteLau/Blog/issues/2
function* add(a, b) {
    yield a + b;
    yield 1 + 2;
    yield 3 + 4;
    return
}


let resultAdd = add(4, 5);

function gernerate(result) {
    let res = result.next();
    console.log("res", res);
    if (!res.done) {
        gernerate(result);
    }
}
// gernerate(resultAdd);

async function timeout() {
    console.log("111");
    let timefunc = await setTimeout(() => {
        console.log(100);
    }, 0);
    console.log("33333", timefunc);
}
// timeout();


// promise then是执行回调函数，在本轮所有的同步任务执行完之后，在执行
// catch 之后还可以执行then
// then 可以接受两个回调函数，一个接收resolve 之后的参数，另一个接收reject 之后的参数
// then 的链式调用中，上一个必须返回promise 对象
/**
 * resolve 相当于执行回调，在then里面接受回调结果
 *promise().then() 微任务，在本轮主任务执行完之后，执行完所有微任务，
 在进入下一轮事件循环
 */
// function getJsonData() {
//     return new Promise((resolve, reject) => {
//         console.log("1");
//         resolve(333333);
//         console.log("2");
//     });
// }
// getJsonData().then((res) => {
//     console.log("4")
//     console.log(res);
// })
//  .catch((error)=>{
//         console.log('error',error);
// })
// .finally((res)=>{
//      console.log("345456");


Promise.resolve() // 将普通对象转化成promise 对象
// 等效为
let p1 = new Promise(resolve => {
    return resolve("我是p1")
});

// Promise.resolve(2).finally(() => {
//     console.log('res', res)
// }, () => {})

// generator 异步使用
// async/await 
/**
遇到 await 会先返回promise 对象，
然后等到异步执行完成之后，在执行后面的代码
await 返回是Promise 执行的结果,等同于，先返回Promise 对象之后，等待异步执行完毕之后，执行then的回调，输出最后的结果
async 返回的是Promise 对象，可以执行then 的链式回调
async 函数的多个await 所在行的代码是同步执行的，整个async 是异步执行的
*/
function print(){
    console.log("1");
    return new Promise((resolve,reject)=>{
        return resolve(p1);
    });
}


newPrint().then(function (res) {
    console.log('res',res);
}).catch(r=>{
    console.log("r",r)
});

async function output(){
    console.log("3")
    let res = await print();
    console.log('res1',res);
    console.log("4");
}

// output().then(res=>{
//     console.log("re2",res)
// });

const say = async (num) => {
    console.log(num, 'begin:')
    await new Promise(resolve => {
      setTimeout(() => {
        console.log(num)
        resolve()
      }, num * 1000)
    })
  }
  
  const nums = [2, 1]
  
  // 遍历 nums 打印
  async function for_Result() {
    for (let n of nums) {
      await say(n)
    }
  }
  
  // 遍历 nums 打印
  function forEach_Result() {
    nums.forEach(async function(n){
        await say(n)
    });
  }
  
  // 思考分别调用下面两个方法的结果：
//   for_Result()
  forEach_Result()

// 模拟 有回调函数的遍历 map,foreach等
function newForEach(cb){
    ch();
}
// 所以forEach_Result 可以变成
function forEach_Result() {
    let a = async function(n){
        await say(n)
    }
    nums.newForEach(function(n){
        a(n);
    });
    // 可以看到回调函数的执行并没有被await修饰，所以不用等待上一个回调执行完毕，再执行下一个，同步执行
    // for...of 或者其他的for循环的形式，没有回调函数，await 发挥了作用，会按照上一个执行完毕在执行下一个的顺序
  }

/**
两个遍历方法分别使用了 for of 和 forEach 循环数组，并使用 await等待异步方法的执行。
期望的都是实现同步执行，但是forEach并没有按照预期的去等待 say() 方法执行完毕。
难道forEach中的 await没有生效？
其实两种遍历并执行 say() 的方式是有区别的：
for of会在遍历到每个元素后，执行say()方法。
而forEach在遍历每个元素后，执行的是该方法接收的回调函数方法，然后在回调中，执行say()方法。
forEach方法内部调用 回调函数 时，并没有使用await修饰，所以回调方法并不会等待上一个回调执行完毕。
内部的 await 也就失去了意义。
同理for()循环和for of原理一样，所以也能达到期望的效果。
map 和 forEach 实现的效果是一样，都是并发执行，因为他的回调函数没有被await 修饰，
不用等上一个执行完成，在执行下一个
*/

