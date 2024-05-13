"use strict";
/**
 * 小插曲 keyof 和 typeof
 * keyof 获取对象的 键
 * typeof 接收的变量是对象，则 typeo 返回的类型不是 object，而是同样结构的类型字面量
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.locales = void 0;
// keyOf 作用示例 1
// 获取 T 的键值
function getProp(obj, key) {
    // 所以不会报错，有 key 才会运行
    return obj[key];
}
console.log(getProp([1, 2, 3], "length"));
// keyOf 作用示例 2
const Colors = {
    Red: '#FF0000',
    White: '#FFFFFF'
};
function getColor(key) {
    return Colors[key];
}
console.log(getColor('Red'));
// typeOf 作用示例 处理对象
const person3 = {
    name: "Rock",
    age: 19,
    gender: false,
    action: () => {
        console.log("hello");
    },
};
typeof person3; // 想当于根据 person3 的各键值和各键值的类型重新定义了一个新的类型数据
// typeof 处理数组、对象数组
// 本质是将 数据每一个对象作为一个新定义的类型，组合成联合类型
const numArr = [1, 4, 3];
const data = ["hello", "world"];
exports.locales = [
    {
        locale: "se",
        language: "Swedish",
    },
    {
        locale: "en",
        language: "English",
    },
];
function dd(url, method) {
    console.log("lll");
}
let option = {
    url: "https:",
    method: "POST",
};
// dd(option.url, option.method)第二个参数会报错的,
// 因为option.method的值是个字符串类型，而不是自己定义的Method类型
// ts 类型推断的能力有限，有时候不能动态的知道某个变量是什么类型 需要显示的指出来
// 可以用类型断言 as 因为string类型是大的范围，缩小到'POST'和'GET'这种小范围的类型
dd(option.url, option.method);
let a = 235;
let b = "123";
let c = "5";
c = 1234;
let getName = (name) => {
    return name;
};
function printId(id) {
    id = Number(id);
}
// 单一类型 数组
let arr1 = [];
let arr = [1, "3", 3, 5];
// 泛型接口的混合类型
let testArr = [1, 2, 3, 4];
let d = "45";
console.log("name: ", d);
let arr3 = [3, 4, 5];
// 元组
let t1 = [1, "3"];
let newArrNumberInstance = ["5", 1, 2, 3];
// 数组转化为只读
const point = [4, 5];
// 函数 常用形式
// function test(a:string, b:string):number{
//     return Number(a) + Number(b);
// }
// 箭头函数形式
// undefined、null、NaN、0、""（空字符串）和 false
const test = (a, b = "120") => {
    if (!Number(b)) {
        return Number(a);
    }
    return Number(a) + Number(b);
};
console.log(test("10"));
// ts 中函数的箭头函数形式
// 返回值会自动推断为 number 形式
const hello = (a) => a;
const testFunc = (a, b) => Number(a) + Number(b);
let aa = [1, 2, 3];
let aaa = [1, "3"];
console.log("aaa", aaa);
// 箭头函数
aa.map((item) => {
    return `${item}`;
});
const voidTest = (a, b) => {
    return Number(a + b);
};
console.log(voidTest("1", "2"));
// function fn(x:boolean):void;
// function fn(x:string):void;
// 联合函数解决重载问题
function fn(x) {
    console.log(x);
}
function createElement(ele) {
    return;
}
const obj1 = {
    a: 1,
    b: "3",
    c: () => 3,
};
const obj2 = {
    a: 1,
    b: "3",
    c: () => 3,
};
// 使用断言 将对象改为 const
// 里面的所有属性都不可更改 方便进行类型推断
const obj3 = {
    name: "wer",
    info: {
        age: 19,
    },
};
// 使用属性索引定义属性的方式定义，不用一个属性一个属性定义
// 属性类型可以是联合类型
const obj4 = {
    a: "3",
    b: "4",
    c: "6",
    d: 8,
};
console.log(obj4);
//
const obj5 = {
    x: 6,
    y: "7",
};
// 解构赋值 并制定单个的对象数据类型
const { x: xVal = 23, y: yVal = "34" } = obj5;
const s1 = "34";
const person = { sex: "male" };
person.age = 30;
console.log(person);
const child1 = {
    x: 1,
    y: "2",
};
const Parent = child1;
/**
 * ts 中不允许存在空对象，必须要在声明对象的时候
 * 同时初始化值
 */
const obj7 = {};
// obj7.a = '234'; // 报错
// 声明的同时赋值
const obj8 = { a: 9 };
const dog = {
    type: "dog",
    age: 2,
    sex: "male",
};
const human1Instance = {
    canThink: true,
    canTalk: true,
    name: "franklin",
    sex: "male",
};
// 继承类
class City {
    constructor() {
        this.providerJob = false;
    }
    walk() {
        return "walk slowly";
    }
}
const wuhanCity = {
    manyPeople: false,
    providerJob: true,
    walk: () => "walk fast",
};
const user1 = {
    p1: "99",
    p2: 99,
    func: () => 1,
};
// 对象
const obj9 = {
    a: 1,
    b: "9",
};
/**
 * 类
 * 1、TypeScript 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。
 * 2、作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型
 * */
class C {
    // 属性在构造函数中或者在声明的时候初始化
    // 构造函数不需要 显示 指明返回类型，因为构造函数总是返回 this
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const c1 = new C(10, 20);
class D {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const d1 = new D();
d1.x = 30;
d1.y = 50;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ABC extends Point {
}
// 错误
function createPoint(PointClass, x, y) {
    return new PointClass(x, y);
}
/**
 * 类的结构性原则
 * 1、两个类有至少一个相同的属性，属性少的是 父类，属性多的是子类，父类可以兼容子类，反之不成立
 * */
class Aline {
    constructor() {
        this.name = "franklin";
    }
}
class AlinePerson {
    constructor() {
        this.name = "BaiKe";
        this.age = 0;
    }
}
// Aline 是父类，AlinePerson 是子类，父类兼容子类
const aline = new AlinePerson();
/**
 * 类的子类不能定义父类中同名的私有成员，否则会报错
 * private 修饰符的成员，
 * 1、子类和类的实例都不能访问，
 * 2、只能在类内部，通过类的实例进行访问
 *
 * protected 修饰符的成员，子类和类的实例都不能访问，
 * 1、在父类的内部，通过类的实例进行访问；
 * 2、在子类中可以使用访问
 * 3、并且在可以在子类中定义和父类中同名的属性成员
 *
 * 抽象类不能用来实例化，只能被用来做基类，用于继承
 * 抽象类的子类也可以是抽象类，也可以用来被继承，所以抽象类可以继承抽象类
 */
/**
 * 泛型
 * 建立函数参数类型，返回值类型之间的联系，保持类型的同步
 * 有点类似于模板
 *
 */
function getNewName(arr, arr1) {
    // 为什么泛型数据不能转换
    const arr2 = arr.map((item) => Number(item));
    return arr1;
}
// function getNewName(arr:string[],arr1:number[]):number[]{
//   const arr2 = arr.map(item=> Number.parseInt(item));
//   return arr1.concat(arr2);
// }
console.log(getNewName(["1", "2", "4"], [4, 5]));
// 泛型函数写法
function func1(str1) {
    // 断言，显示指出 返回值是 T 类型
    return `2024-09-09:${str1}`;
}
console.log(func1("hello word"));
// 泛型函数表达式的写法
const func2 = (str) => str;
console.log(func2(100));
let box = {
    title: "124",
};
// 泛型类的写法
class Person1 {
    constructor(name) {
        this.name = name;
    }
}
// 第一中写法
const person1 = {
    name: "franklin",
};
// 第二种写法
const person2 = new Person1("baiKe");
const obj111 = {
    name: "franklin",
    age: 30,
};
// 泛型默认值 不指定 类型时，默认类型就是 number
function getFirstArr(arr) {
    return arr[0];
}
getFirstArr([123, 345]);
class Caclulator {
    constructor() {
        this.list = [];
    }
    add(t) {
        this.list.push(t);
    }
}
const cc1 = new Caclulator();
cc1.add(4);
// cc1.add('5'); // 报错 因为默认类型是 number
// 泛型参数约束条件
function newArr(obj) {
    // return {
    //   name:'franklin'
    // } as T;
    if (obj.name) {
        return obj;
    }
    const aObj = {
        name: "franklin",
    };
    return aObj;
}
// newArr([1,2,3]);// 约束条件必须满足 有 name 属性 否则会报错
newArr({ name: "13" });
