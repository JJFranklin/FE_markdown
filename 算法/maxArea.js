// 盛水最多的容器
// 动态规划法，思路：什么情况面积最大
// i++ 是先使用i本来的值，然后再加
// ++i 是先加，然后再使用加之后获得的新值
var maxArea = function (arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return;
    let maxArea = 0;
    for (let i = 0, j = arr.length - 1; i < j;) {
        let minVal = arr[i] < arr[j] ? arr[i++] : arr[j--];
        maxArea = Math.max(maxArea, minVal * (j - i + 1));
    }
    return maxArea;
};

let arr = [1,8,6,2,5,4,8,3,7];
console.log("getMaxArea", maxArea(arr));