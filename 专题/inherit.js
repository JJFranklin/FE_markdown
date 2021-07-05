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
// 子类的原型作为父类的实例，实际上是子类实例的原型对象指针指向了父类的原型对象
// 子类实例可以继承父类原型链上的属性
Child1.prototype = new Parent();
// 还原子类的构造函数，经过上面改造之后，构造函数就指向了父类
// 此时修改回来
Child1.prototype.Constrct = Child1;


// 构造函数继承
function Child(name, age) {
    // Parent.call(this, name);
    Parent.apply(this,arguments);
    this.age = age;
}

// 关键的三步 寄生组合继承
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

Child.prototype.a = 1;

var child1 = new Child('kevin', '18');

console.log("sss:", Child.prototype.__proto__ == F.prototype, F.prototype, Parent.prototype);