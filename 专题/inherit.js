// 继承
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

// 原型继承
function Child1(){

}
let subchild = new Child1();
subchild = Parent.prototype;
subchild.Constrct = Child1;

// 构造函数继承
function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步 计生组合继承
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

Child.prototype.a = 1;

var child1 = new Child('kevin', '18');

console.log("sss:", Child.prototype.__proto__ == F.prototype, F.prototype, Parent.prototype);