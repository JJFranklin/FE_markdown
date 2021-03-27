// 继承
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

Child.prototype.a = 1;

var child1 = new Child('kevin', '18');

console.log("sss:", Child.prototype.__proto__ == F.prototype, F.prototype, Parent.prototype);