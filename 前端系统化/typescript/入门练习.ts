let a: number = 235;
let b: string = '123';

let c: string | number = '5';
c = 1234;

let getName = (name: string): string => {
    return name;
};

function printId(
    id: number | string
) {
    id = Number(id);
}

// 单一类型 数组
let arr1:number[] = [];
// 混合类型
let arr:(number | string)[] = [1,'3',3, 5];
// 泛型接口的混合类型
let testArr:Array<number> = [1,2,3,4];

// 重新顶一个一个 字符串数组 类型
// 所以里面的所有元素都是字符串类型
type Names = string[];
type Name = Names[0];
let d:Name = '45'; 
console.log('name: ', d);

let arr3:readonly number[]= [3,4,5];

// 元组
let t1:[number,string] = [1,'3'];

// 新定义
type newArrNumber = [
    string,
    ...number[],
];

let newArrNumberInstance:newArrNumber = [
    '5',
    1,2,3
];
// 数组转化为只读元组
const point = [4,5] as const;
const ab = typeof point[number];

