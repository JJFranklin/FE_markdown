// // 输入
// let a = [1,2,3,4,5,6,55,4,3,21,2,1,69,10,'12',{},[],NaN,NaN];
// // 输出 每个元素出现的次数

// let result = {
//     1/*元素*/:1/* 次数*/,
//     2:2,
//     ...
// }

// const a = {};
// const b = Object.create([]);

// console.log(a instanceof Array);

// console.log(a.constructor === Array);

// 返回最原始的值
// const objToString = Object.prototype.toString;

// 其他对象的 toString 方法都是继承并且重写了 Object.toString 的方法，返回自定义的值
// console.log('a.toString();', a.toString());
// console.log('objToString', objToString.call(a).slice(8,-1));

// function Animal(){
// }

// Animal.prototype = {
//     constructor: Animal,
//     getName(){
//         console.log('name, 1');
//         return 1;
//     }
// }

// const dog = new Animal();
// console.log(Object.getPrototypeOf(dog) === Animal.prototype);

// async function getUserSex(){
//     return 'an apple';
// };

// console.log(getUserSex().then(res=>{
//     console.log('res',res);
// }));

// var tmp = new Date();

/**
 * 函数的优先级最高
 * 先执行函数，此时tmp 还没有申明，输出 undefined
 */
// function f() {
//   var tmp;
//   console.log(tmp);
//   if (false) {
//     tmp = "hello world";
//   }
// }

// f();

// const symbolA = Symbol();
// console.log(typeof symbolA);

function timeout(ms) {
  return new Promise((resolve) => {
    console.log("50");
    setTimeout(()=>{
        resolve(true);
    },ms);
  });
}

async function asyncPrint(value, ms) {
    try {
        await timeout(ms);
    } catch (error) {
        console.log(error)
    }
  console.log(value);
}

asyncPrint("hello world", 50);

class Animal{

}
