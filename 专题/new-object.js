// 模拟 new 进行操作
/*
1、生成一个新的对象
2、构造函数原型对象指向新的对象，新的对象能够继承原型对象上的属性
3、通过apply或者call改变构造函数的this的指向,this指向新的对象，此时会执行构造函数，能够访问构造函数的属性
4、返回新的对象

新的对象不仅可以继承原型上的属性，还可以继承构造函数内初始化的属性
*/ 

/**
 * 使用字面量重写构造函数原型，相当于重新生成了一个对象原型，
 * 和原来的对象原型没有关联，切断了和原来的对象原型的联系
*/
function Person (){}

function newCreateObj(){
    // 1、生成一个新的对象
    // let obj = new Object();
    // 取出第一个参数，是传入的后构造函数
    let baseClass = Array.prototype.shift.call(arguments);
    // 2、构造函数原型对象指向新的对象，新的对象能够继承原型对象上的属性 
    // 此处有问题，并不是所有浏览器都支持 __proto__ 属性
    // obj.__proto__= baseClass.prototype;
    // 优化 基于原型对象创造一个实例对象，可以继承原型对象上的属性
    obj = Object.create(baseClass.prototype); 
    // 此时 obj.__proto__= baseClass.prototype
    // 3、通过apply或者call改变构造函数的this的指向,this指向新的对象,此时会执行构造函数
    baseClass.apply(obj,arguments);
    // 4、返回新的对象
    return obj;
}

newCreateObj(Person);



