// const input = [
//   [1, 1],
//   [2, 1],
//   [2, 4],
//   [2, 5],
//   [3, 2],
//   [3, 4],
//   [4, 4],
//   [4, 5],
//   [4, 6],
//   [4, 7],
//   [5, 3],
//   [6, 3],
//   [6, 4],
//   [6, 5]
// ]

// // input => output
// // output 结果举例，数组顺序不做要求
// [
//   [
//     [1, 1],
//     [2, 1]
//   ],
//   [
//     [2, 4],
//     [2, 5],
//     [3, 4],
//     [4, 4],
//     [4, 5],
//     [4, 6],
//     [4, 7]
//   ],
//   [
//     [3, 2]
//   ],
//   [
//     [5, 3],
//     [6, 3],
//     [6, 4],
//     [6, 5]
//   ]
// ]

const inputArray = [
    [1, 1],
    [2, 1],
    [2, 4],
    [2, 5],
    [3, 2],
    [3, 4],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 3],
    [6, 3],
    [6, 4],
    [6, 5]
];


function getCloseArr(array){
    let inputArr = array.sort(function(a,b){
        return a[0] - b[0];
    });
    let arr = [];
    let j = 0;
    for(let i=0,len=inputArr.length;i<len;i++){
        let item = inputArr[i];
        if(arr.length == 0){
            arr[i] = [];
            arr[i].push(item);
        } else {

            let lastIndex = arr[j].length - 1;
            let lastItem = arr[j][lastIndex];

            if(lastItem && Math.abs(lastItem[0] - item[0])<=1 && Math.abs(lastItem[1] - item[1])<=1){
                arr[j].push(item);
            } else {
                j = j+1;
                arr[j] = [];
                arr[j].push(item);
            }
        }
    }
    return arr;
}

console.log("arr",getCloseArr(inputArray));
