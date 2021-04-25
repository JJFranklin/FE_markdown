let a = "outer";

function b() {
    let d = "innner";
    function c(){
        a = "c-innner";
        console.log(d);
    }
    return c();

};
// let d = b();

// console.info(Math.max.call(null,1,2,3));

// 继承方式
function Animal(name){
    console.log(this,1);
    this.sex = name;

}

Animal.prototype.getname = function(){
    console.log("csac",this.sex);
}

function Cat(){
    this.wang = "汪汪";
    console.log(this,2);
    // 构造函数继承
    Animal.call(this,"franklin");
}
// new 生成对象的过程，
/**
 * 1、生成一个新的对象
 * 2、将this指向新的对象，也就是将作用域给新的对象
 * 3、在this上面添加属性，即向新的对象添加属性
*/

// 继承的方式：原型继承，构造函数继承，原型和构造函数组合继承

// 原型继承
Cat.prototype = new Animal();

Cat.prototype.bark = function (){
    console.log(this.wang,"---",this)
}

let dog = new Cat();
dog.bark();
let hellokitty = new Cat();
Cat.prototype == hellokitty.__proto__;
let s = Cat.prototype.__proto__ == Animal.prototype;
hellokitty.getname();
console.log(hellokitty.getname == dog.getname);
// 单独使用构造函数继承，方法不能重用，每次new一个对象的时候，都要重新生成新的方法，
// 造成每个对象实例的方法指向的都不是同一个方法，造成困扰，不能够重用，

// 单独使用原型继承，会出现每次实例化一个新对象，都要生成一个新方法的问题。
// 由于属性都是在原型上的，值类型的属性，不存在修改一个影响另一个问题，引用类型的属性，修改会影响到其他的实例

// 因此采用两者结合的方式，构造函数继承，继承属性，解决引用类型属性的问题，
// 原型继承，解决每次都要实例化一个新方法的问题；



