/**
 * keyof 和 typeof
 * keyof 获取对象的 键 或者属性
 * typeof 接收的变量是对象，则 typeo 返回的类型不是 object，而是同样结构的类型字面量
 * */

// keyOf 作用示例 1
// 获取 T 的键值
function getProp<T>(obj: T, key: keyof T) {
  // 所以不会报错，有 key 才会运行
  return obj[key];
}

console.log(getProp([1, 2, 3], "length"));

// keyOf 作用示例 2
const Colors = {
  Red: "#FF0000",
  White: "#FFFFFF",
} as const;

function getColor(key: keyof typeof Colors) {
  return Colors[key];
}
console.log(getColor("Red"));

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

// 同样结构的类型字面量
type newPerson = {
  name: string;
  age: number;
  gender: boolean;
  action: Function;
};

// 相当于 type propertyType = "gender" | "name" | "action" | "age"
type propertyType = keyof typeof person3;

// typeof 处理数组、对象数组
// 本质是将 数据每一个对象作为一个新定义的类型，组合成联合类型

const numArr = [1, 4, 3] as const;
console.log('numArr', numArr);

type typeNumArr = (typeof numArr)[number]; // type typeNumArr = 1 | 4 | 3;

const data = ["hello", "world"] as const;
type Greeting = (typeof data)[number]; //   type Greeting = 'hello' | 'world';

export const locales = [
  {
    locale: "se",
    language: "Swedish",
  },
  {
    locale: "en",
    language: "English",
  },
] as const;

type Locale1 = (typeof locales)[number];
/**
 * 相当于 
 * 
 * type Locale1 = {
  locale: 'se',
  language: 'Swedish'
} | {
  locale: 'en',
  language: 'English'
}
 * */
type Locale2 = (typeof locales)[number]["locale"];

// type Locale2 = 'se'| 'en';
// 相当于从从联合类型中取出 locale 的属性，作为新定义的联合类型

// as 的作用
type Method = "GET" | "POST";
function dd(url: string, method: Method) {
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
dd(option.url, option.method as Method);

let a: number = 235;
let b: string = "123";

let c: string | number = "5";
c = 1234;

let getName = (name: string): string => {
  return name;
};

function printId(id: number | string) {
  id = Number(id);
}

// 单一类型 数组
let arr1: number[] = [];
// 混合类型
type mixtyep = number | string;
let arr: mixtyep[] = [1, "3", 3, 5];
// 泛型接口的混合类型
let testArr: Array<number> = [1, 2, 3, 4];

// 重新顶一个一个 字符串数组 类型
// 所以里面的所有元素都是字符串类型
type Names = string[];
type Name = Names[0];
let d: Name = "45";
console.log("name: ", d);

let arr3: readonly number[] = [3, 4, 5];

// 元组
let t1: [number, string];

// 新定义
type newArrNumber = [string, ...number[]];

let newArrNumberInstance: newArrNumber = ["5", 1, 2, 3];

// 数组转化成元组
// 类型回推断为 readonly [1,2]
const point = [4, 5] as const;

// 8 函数 常用形式
// function test(a:string, b:string):number{
//     return Number(a) + Number(b);
// }

// 箭头函数形式
// undefined、null、NaN、0、""（空字符串）和 false
const test = (a: string, b: string = "120"): number => {
  if (!Number(b)) {
    return Number(a);
  }
  return Number(a) + Number(b);
};
console.log(test("10"));

// ts 中函数的箭头函数形式
// 返回值会自动推断为 number 形式
const hello = (a: number): number => a;

// 定义函数基本类型
type customFunc = (a: string, b: string) => number;
// 定义函数 后面会实现
let funcType1:(a:string,b:number)=>string;
funcType1 = (a,b)=>{
  return '123';
}

const testFunc: customFunc = (a: string, b: string) => Number(a) + Number(b);

let aa: number[] = [1, 2, 3];
let aaa: [number, string] = [1, "3"];
console.log("aaa", aaa);

// 箭头函数
aa.map((item: number): string => {
  return `${item}`;
});

type voidFunc = (a: string, b: string) => void;
const voidTest: voidFunc = (a: string, b: string) => {
  return Number(a + b);
};
console.log(voidTest("1", "2"));

// function fn(x:boolean):void;
// function fn(x:string):void;
// 联合函数解决重载问题
function fn(x: number[] | string): void {
  console.log(x);
}

function createElement(ele: HTMLBaseElement) {
  return;
}

// 对象
// 自定义对象类型
type newObj = {
  a: number;
  b: string;
  c: () => number;
};

const obj1: newObj = {
  a: 1,
  b: "3",
  c: () => 3,
};

const obj2: {
  a: number;
  b: string;
  c: () => number;
} = {
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
} as const;

// 使用属性索引定义属性的方式定义，不用一个属性一个属性定义
// 属性类型可以是联合类型
const obj4: {
  [x: string]: string | number;
} = {
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
const { x: xVal = 23, y: yVal = "34" }: { x: number; y: string } = obj5;

// 有点类似于 结构体
type User = {
  name: string;
  age: number;
};
type NameType = User["name"]; // string

const s1: NameType = "34";

type Person = {
  sex: string;
  age?: number;
};
const person: Person = { sex: "male" };
person.age = 30;

console.log(person);

/**
 * 结构类型原则
 * 两个对象有一个属性性质一样，属性字符串一样，属性类型一样
 * 就可以将子属性赋值给父属性，
 * */

type Child = {
  x: number;
  y: string;
};

const child1: Child = {
  x: 1,
  y: "2",
};

type Parent = {
  x: number;
  y: number;
};

const Parent: { x: number } = child1;
/**
 * ts 中不允许存在空对象，必须要在声明对象的时候
 * 同时初始化值
 */

const obj7 = {};
// obj7.a = '234'; // 报错
// 声明的同时赋值
const obj8: { a: number } = { a: 9 };

/**
 * 接口对比对象，没有等号
 * 接口相当于定义了一个模板结构
 * 可以按照此模板结构，定义新的数据
 * */
interface UserInfo {
  p1: string;
  p2: number;
  func: (a: number) => number;
}

// 对象的属性索引
/**
 * 属性索引为 number、string、symbol
 */
interface Animal {
  [prop: string | number]: /*索引类型*/ number | string /*属性值类型*/;
  type: string;
}

/**
 * 接口继承
 * 1、接口可以继承接口
 * 2、接口可以继承类型
 * 3、接口可以继承类
 * 4、接口可以继承多个父接口，但是多个父接口里面的属性，不能冲突
 * 继承过程中需要注意的点
 * 1、子类，父类中有相同的属性，子类属性会覆盖掉父类的属性
 * 2、子类中的属性类型和父类中，属性名称相同的情况下，类型也要相同，否则会报错
 * 3、
 * */

// 继承接口
interface Dog extends Animal {
  sex: string;
  age: number;
}
const dog: Dog = {
  type: "dog",
  age: 2,
  sex: "male",
};
// 继承类型
type Human = {
  canThink: boolean;
  canTalk: boolean;
  name: string;
};

interface human1 extends Human {
  sex: string;
}

const human1Instance: human1 = {
  canThink: true,
  canTalk: true,
  name: "franklin",
  sex: "male",
};

// 继承类

class City {
  providerJob: boolean = false;
  walk(): string {
    return "walk slowly";
  }
}

interface wuhan extends City {
  manyPeople: boolean;
}

const wuhanCity: wuhan = {
  manyPeople: false,
  providerJob: true,
  walk: (): string => "walk fast",
};

interface A {
  [prop: string]: number;
  [prop: number]: number; // 报错
}
// 可以通过方括号运算符取出属性类型
type pp1 = UserInfo["p1"];

const user1: UserInfo = {
  p1: "99",
  p2: 99,
  func: () => 1,
};

// 对象
const obj9: {
  a: number;
  b: string;
} = {
  a: 1,
  b: "9",
};

type B = number;

/**
 * 类
 * 1、TypeScript 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。
 * 2、作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型
 * */
class C {
  x!: number; // ! 表示非空，后面会赋值
  y?: number; // ? 表示可选参数，在参数列表最后
  // 属性在构造函数中或者在声明的时候初始化
  // 构造函数不需要 显示 指明返回类型，因为构造函数总是返回 this
  constructor(x: number, y?: number) {
    this.x = x;
    this.y = y;
  }
}
const c1 = new C(10, 20);

class D implements C {
  x: number = 0;
  y?: number = 0;
}

const d1 = new D();
d1.x = 30;
d1.y = 50;

// 采用非空断言，就可以不用赋初始值
class Point {
  x!: number;
  y!: number;

  constructor(x: number, y: number) {
    // this.x = x;
    // this.y = y;
  }
}

class ABC extends Point {}

// 错误
function createPoint(PointClass: typeof Point, x: number, y: number) {
  return new PointClass(x, y);
}

/**
 * 类的结构性原则
 * 1、两个类有至少一个相同的属性，属性少的是 父类，属性多的是子类，父类可以兼容子类，反之不成立
 * */
class Aline {
  name: string = "franklin";
}

class AlinePerson {
  name: string = "BaiKe";
  age: number = 0;
}

// Aline 是父类，AlinePerson 是子类，父类兼容子类
const aline: Aline = new AlinePerson();

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

function getNewName<T, U>(arr: T[], arr1: U[]): U[] {
  // 为什么泛型数据不能转换
  const arr2 = arr.map((item) => Number(item));
  return arr1;
}

// function getNewName(arr:string[],arr1:number[]):number[]{
//   const arr2 = arr.map(item=> Number.parseInt(item));
//   return arr1.concat(arr2);
// }

console.log(getNewName<string, number>(["1", "2", "4"], [4, 5]));

// 泛型函数写法
function func1<T>(str1: T): T {
  // 断言，显示指出 返回值是 T 类型
  return `2024-09-09:${str1}` as T;
}

console.log(func1<string>("hello word"));

// 泛型函数表达式的写法
const func2 = <T>(str: T): T => str;
console.log(func2<number>(100));

// 泛型接口的写法
interface Box<Type> {
  title: Type;
}
let box: Box<string> = {
  title: "124",
};

// 泛型类的写法
class Person1<K> {
  name: K;
  constructor(name: K) {
    this.name = name;
  }
}

// 第一中写法
const person1: Person1<string> = {
  name: "franklin",
};
// 第二种写法
const person2 = new Person1<string>("baiKe");

// 泛型 类别的写法
type newObj1<T, V> = {
  name: T;
  age: V;
};

const obj111: newObj1<string, number> = {
  name: "franklin",
  age: 30,
};

// 泛型默认值 不指定 类型时，默认类型就是 number
function getFirstArr<T = string>(arr: T[]): T {
  return arr[0];
}
getFirstArr<number>([123, 345]);

class Caclulator<T = number> {
  list: T[] = [];
  add(t: T) {
    this.list.push(t);
  }
}
const cc1 = new Caclulator();
cc1.add(4);
// cc1.add('5'); // 报错 因为默认类型是 number

// 泛型参数约束条件

function newArr<T extends { name: string }>(obj: T): T {
  // return {
  //   name:'franklin'
  // } as T;
  if (obj.name) {
    return obj;
  }

  const aObj = {
    name: "franklin",
  };
  return aObj as T;
}

// newArr([1,2,3]);// 约束条件必须满足 有 name 属性 否则会报错
newArr({ name: "13" });

/**
 * 13 枚举
 * 枚举在 ts 中是一种类型，也是一个值
 * 1、是一个值，指的是在编译成 js 后，其他类型的数据，会取掉类型，枚举 会变成一个 {key:value} 的对象 保留下来
 * 2、代码中不允许存在和枚举结构名相同的变量
 * 3、Enum 成员默认不必赋值，系统会从零开始逐一递增，按照顺序为每个成员赋值，默认值为0、1、2…… 等数值，也可以显式赋值，
 * 但是不能是 bigInt 类型，显示赋值的时候，成员值可甚至以相同，如果只赋值了一个值，后面的值默认递增
 * 4、成员都是只读的 不能重新赋值
 * 5、成员只允许为 string 和 number
 * 6、数值类型的成员可以 反向映射，通过值 找到对应的键，字符串类型的成员不行
 * */
// const Red = 1;
// const Green = 2;
const enum Color {
  Red,
  Green = "10", // 显示赋值为字符串之后，后面的值必须赋初值
  Yellolw = 12,
}

function func3(color: Color) {
  switch (color) {
    case Color.Red:
      console.log("red");
      break;
    case Color.Green:
      console.log("green");
      break;
    default:
      break;
  }
}

func3(Color.Red);

/**
 * 14 类型断言
 * 1、类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件
 * 2、类型断言要求实际的类型与断言的类型兼容
 * expr as T
 * expr是实际的值，T是类型断言，它们必须满足下面的条件：expr是T的子类型，或者T是expr的子类型
 */

type T = "a" | "b" | "c";
let foo = "a";
// 将 foo 指定为 T 的类型
let bar: T = foo as T; // 正确

/**
 * as const 断言
 * 作用
 * 1、将数据变成不可变类型，也就是只读类型，不能重新进行赋值
 *
 * let 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一；
 * const 命令声明的变量，则被推断为值类型常量。
 * 1、as const也不能用于表达式。
 * 2、as const 断言只能作用于枚举成员、字符串、数字、布尔值、数组或对象字面量
 * 3、as const 会将字面量的类型断言为不可变类型，缩小成 TypeScript 允许的最小类型。
 * */

// 类型推断为基本类型 string
let s2 = "JavaScript";

// 类型推断为字符串 “JavaScript” 是值类型常量
const s3 = "JavaScript";

const a111 = {
  a: 1 as const, // 将 属性 a 变成 只读类型
  b: 1,
};

const a112 = {
  a: 1,
  b: 2,
} as const; // 将整个对象变成只类型

/**
 * 非空断言
 * 保证变量不为空
 */

function fkfunc1(a: number, b?: number): string {
  return a.toString() + b!.toLocaleString();
}

/**
 * 15 模块
 * commonJS 标准下
 *
 * 导出模块
 * let obj = { foo: 123 };
 * export = obj;
 *
 * 引入模块
 * import fs = require('fs');
 */

/**
 * 17 装饰器
 * 基本特征
 *（1）第一个字符（或者说前缀）是@，后面是一个表达式。
 *（2）@后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。
 *（3）这个函数接受所修饰对象的一些相关值作为参数。
 *（4）这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。
 * 1、装饰器一般只用来为类添加某种特定行为
 * 
 * （1）kind：字符串，表示所装饰对象的类型，可能取以下的值。
    'class' // 类装饰器
    'method' // 方法装饰器
    'getter'
    'setter'
    'field' // 属性装饰器
    'accessor'
*/

function deco1(value: any, context: any) {
  console.log("新的装饰器");
}

@deco1
class DecoA {}

/**
 * 19 declare 关键字
 * declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。
 * 它的主要作用，就是让当前文件可以使用其他文件声明的类型
 * 1、关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。
 * declare let x:number = 1;  // 报错
 *
 * // 正常使用 只声明某个类型存在
 * declare let x:number;
 * x = 1;
 */

/**
 * 方括号
 * 方括号运算符（[]）用于取出对象的键值类型，比如T[K]会返回对象T的属性K的类型。
*/

type Person123 = {
  age: number;
  name: string;
  alive: boolean;
};

// Age 的类型是 number
type Age = Person123['age'];

/**
 * in 运算符
 * TypeScript 语言的类型运算中，in运算符有不同的用法，
 * 1、用来取出（遍历）联合类型的每一个成员类型。
 * 2、[Prop in keyof Obj]表示取出对象Obj的每一个键名。
 * */

type U = 'a'|'b'|'c';

type Foo1= {
  [Prop in U]: number;
};
// 等同于
// type Foo1 = {
//   a: number,
//   b: number,
//   c: number
// };

