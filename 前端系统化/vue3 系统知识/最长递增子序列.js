/**
 * 最长递增子序列
 * 思想：使用动态规划，找到前面有多少个比当前数据小，加上自己，就是总的最长递增子序列的长度
 * 1、声明一个数组 array，长度和输入的数组(list)长度相同，并用1填充，用来记录每一个递增子序列的长度，
 * 因为每一个元素都是单独的最长递增子序列，所以初始化的长度为1；
 * 2、采用双层循环，外层控制待比较的元素list[i]，内层，控制每一个 待比较元素 之前的元素list[j]和他进行对比；
 */
const arr = [0, 3, 4, 17, 2, 8, 6, 10];
function maxLenIncreseSubstr(list) {
  if (list.length === 0) return 0;
  // 创建一个和参数相同大小的数组，并填充值为 1
  // 用来记录小于等于当前数据的数据有多少，也就是递增子序列的长度
  let array = new Array(list.length).fill(1);
  // 从索引 1 开始遍历，因为数组已经所有都填充为 1 了
  // list 中第一个数的递增子序列是长度是1，所以从第二个数开始比较
  for (let i = 1; i < list.length; i++) {
    // 从索引 0 遍历到 i
    // 判断索引 i 上的值是否大于之前的值
    for (let j = 0; j < i; j++) {
      if (list[i] > list[j]) {
        // 对比之前的每一个元素，如果是大于，说明又找到了一个比之前大的数据，在之前递增的子序列长度基础上 +1
        // 每比较一轮都会在之前递增的子序列长度基础上 +1 赋值, 充当当前元素的递增子序列的长度，
        // 所以，每一轮比较都会上一轮比较的结果中取最大值
        array[i] = Math.max(array[i], 1 + array[j]);
      }
    }
  }
  // 遍历获取最长的递增子序列
  let res = 1;
  for (let i = 0; i < array.length; i++) {
    res = Math.max(res, array[i]);
  }
  return res;
}

console.log(maxLenIncreseSubstr(arr));