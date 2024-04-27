// 输入数组和 要生成随机不重复数据的位数
/**
 * 数组 []
 * 不重复数据位数
 */
function getUniqNumber(arr = [], num, newArr = [], result = []) {
  const len = arr.length;
  if (len < num) return arr;
  if (newArr.length === num) {
    console.log(newArr);
    result.push(newArr);
    return;
  }
  for (let i = 0; i < len; i++) {
    let ele = arr[i];
    if (!newArr.includes(ele)) {
      newArr.push(ele);
      getUniqNumber(arr, num, newArr, result);
    }
  }
  return result;
}
let arr = [1, 2, 3, 4, 5, 6, 7];
let num = 3;
let result = getUniqNumber(arr, num);
console.log("result", result);
