// 寻找两个数组的中位数

function findMedianSortedArrays(arr1,arr2){
    if(!Array.isArray(arr1) || !Array.isArray(arr2)) return;
    if(arr1.length == 0 && arr2.length == 0) return;
    let arr = arr1.concat(arr2).sort((a,b)=>{
        return a - b;
    });
    let len = arr.length;
    if(len == 1) return arr[0];
    if(len%2 == 0){
        return (arr[len/2] + arr[(len/2) - 1 ])/2;
    } else {
        return arr[Math.floor(len/2)];
    }
}

let arr1 = [];
let arr2 = [2,4];
console.log("findMedianSortedArrays",findMedianSortedArrays(
    arr2,arr1
))