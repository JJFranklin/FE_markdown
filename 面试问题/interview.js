// let arr=[0,9,2,8,3,7,4,5,6,100];

// 1
// 洗牌算法
// // 随机每次输出不一样的数，并且不能重复

// for (let i = 0,len=arr.len; i<len; i++) {
//     let radom  = Math.floor(Math.random(0,i));

//     console.log(arr[i]);   
// }

// 2
// 找出连续三个和最大，并返回值

// function getMaxSum(arr){
//     let max = 0;
//     for(let i=0,len=arr.length;i<len-2;i++){
//         let cursum = arr[i] + arr[i+1] + arr[i+2];
//         max = max>cursum?max:cursum;
//     }
//     return max;
// }

// console.log(getMaxSum(arr));

// 代码按照传入参数 分组

function newSliceArr(arr,num){
    if(!Array.isArray(arr) || num <=1) return arr;
    let arrLen = arr.length;
    let groupNum = Math.ceil(arrLen/num);
    let finalArr = [];
    for(let i=0;i<groupNum;i++){
        finalArr[i] = arr.slice(i*num,(i+1)*num);
    }
    return finalArr;
}

// let testArr = [1,2,3,4,5,6,7,8,8,9,10];
// console.log(newSliceArr(testArr,0));

// var arr = [1, 2, 3];
// for (var i = 0, j; j = arr[i++];) {
//     console.log(j);
// }

// console.log('---------');
// console.log(i);
// console.log('---------');
// console.log(j);
// console.log('---------');

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

///////
// a
function Foo () {
    getName = function () {
      console.log(1);
    }
    return this;
   }
   // b
   Foo.getName = function () {
    console.log(2);
   }
   // c
   Foo.prototype.getName = function () {
    console.log(3);
   }
   // d
   var getName = function () {
    console.log(4);
   }
   // e
   function getName () {
    console.log(5);
   }
   
   Foo.getName();           // 2
   getName();               // 4
   Foo().getName();         // 1
   getName();               // 1 
   new Foo.getName();       // 2
   new Foo().getName();     // 3
   new new Foo().getName(); // 3
   ////////

   let afunc = function(){}

   const b = [1,afunc,3,4,4,NaN,6,{},{},null,undefined,NaN,afunc]