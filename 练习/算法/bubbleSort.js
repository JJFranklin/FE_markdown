// 冒泡排序
// 相邻的两个数比较比较大小，前一个数，比后一个数大，
// 交换位置，进行下一步比较，如此循环，直到这一轮中，最大的数排到最后，
// 重复上述步骤，直到所有的数比较完毕

function bubbleSort(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (arr.length === 1) return arr;
    for (let i = 0; i < arr.length - 1; i++) {
        // 外层循环，保证所有数都能进行比较
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // 内层循环，两个相邻的数进行比较；
            // 比较的数据，每一次循环会少一个，因为每一次内层循环都会将，最大的数放到最后
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 选择排序
/**
 * 每次将最小（最大）的数放在最前（最后）面，在剩余的中找到最小数或者最大数，
 * 放到已经排好的顺序的末尾；
 * */


function selectSort(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (arr.length === 1) return arr;
    let minIndex = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1;j < arr.length; j++) {
            minIndex = arr[j] > arr[minIndex] ? minIndex : j;
        }
        [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
    }
    return arr;
}

let arr = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 100, 9, 70];
bubbleSort(arr);
console.log("selectSort(arr)", selectSort(arr));