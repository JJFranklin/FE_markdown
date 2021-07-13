// // 在非匿名自执行函数中，函数变量为只读状态无法修改；
// var b = 10;
// (function b(){
//     b = 20;
//     console.log(b);  // 函数 b  
// })();


// var a = 10;
// (function () {
//     var a;
//     console.log(a) //  undefined
//     a = 5
//     console.log(window.a) // 10
//     a = 20;
//     console.log(a) //20
// })()


// let arr = [1,2,3,4,3,4,4,5,4,7,8];
// let len = arr.length;
// for (let index = 0,len = arr.length; index < len; index++) {
//     if(arr[index] == 4){
//         arr.splice(index,1);
//     }
// }

// for (let index = len - 1; index >=0; index--) {
//     if(arr[index] == 4){
//         arr.splice(index,1);
//     }
// }

// console.log("arr",arr);

// let arr = [1, 2];
// arr.forEach((item, index) => {
//     arr.splice(index, 1);
//     console.log(1); //输出几次？
// });
// console.log(arr) //?

// 实现每100秒交替出现 红 黄 绿 灯
// function red(){
//     console.log("red");
// }

// function yellow(){
//     console.log("yellow");
// }

// function green(){
//     console.log("green");
// }

// function light(cb,wait){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             cb()
//             resolve();
//         }, wait);
//     });
// }

// function step(){
//     Promise.resolve().then(()=>{
//         return light(red,1000);
//     }).then(()=>{
//         return light(yellow,1000);
//     }).then(()=>{
//         return light(green,1000);
//     }).then(()=>{
//         step();
//     });;
// }

// step();

// function test(){
//     let args = Array.prototype.shift.call(arguments,1);
//     console.log("args",args,arguments);
// }
// test(1);

// function BaseClass(name, sex) {
//     console.log("1");
//     this.name = name;
//     this.sex = sex;
//     this.arr = [1, 2, 23];
// }

// BaseClass.prototype.setName = function () {
//     this.name = "23542533";
// }

// function Child() {
//     console.log("2");
//     BaseClass.call(this, ...arguments);
// }

// Child.prototype = new BaseClass();
// Child.prototype.constructor = Child;

// let a = new Child();

let arr = [];
let arr1 = [1,2,3,4,55,5];

arr1.forEach(item=>{
    arr.push(item);
});
console.log("arr",arr);

arr1.map(item=>{
    arr.push(item);
});

