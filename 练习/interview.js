let arr=[0,9,2,8,3,7,4,5,6,100];

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
