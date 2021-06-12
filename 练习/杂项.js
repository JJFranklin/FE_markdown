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


let arr = [1,2,3,4,3,4,4,5,4,7,8];
let len = arr.length;
// for (let index = 0,len = arr.length; index < len; index++) {
//     if(arr[index] == 4){
//         arr.splice(index,1);
//     }
// }

for (let index = len - 1; index >=0; index--) {
    if(arr[index] == 4){
        arr.splice(index,1);
    }
}

console.log("arr",arr);

// let arr = [1, 2];
// arr.forEach((item, index) => {
//     arr.splice(index, 1);
//     console.log(1); //输出几次？
// });
// console.log(arr) //?
