/**
 * 上下文分为：全局执行上下文、函数执行上下文
 * 上下文存储在栈中，js 运行的时候，遇到新的上下文，就将上下文入栈；
 * js 是顺序执行，首先遇到的全局上下文，全局上下文入栈，执行全局上下文，在执行过程中调用函数，
 * 则将函数产生执行上下文入栈，执行执行当前执行上下文，调用函数，生成新的执行上下文，入栈，重复上述过程，直到js全部运行完毕。
 * 所以全局上下文永远在栈底，当前执行的上下文永远在栈顶。
 * 
 * 执行上下文生命周期
 * 1、产生阶段：确定作用域链，确定this 指向，生成变量对象；
 * 2、执行阶段：执行代码，变量赋值等操作
 * 
 * 在一个函数上下文中，this由调用者提供，
 * 由调用函数的方式来决定。
 * 如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。
 * 如果函数独立调用，那么该函数内部的this，则指向undefined。
 * 但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。
 * 
 * 单独的{}是不会形成新的作用域的
 */
// function f1(){
//   var n=999;
//   function f2(){
//     console.log(n);
//   }
//   return f2;
// }

// var result=f1();
// result();

// var name = "window";

// var p = {
//   name: 'Perter',
//   getName: function() {

//     // 利用变量保存的方式保证其访问的是p对象
//     var self = this;
//     return function() {
//       return self.name;
//     }
//   }
// }

// var getName = p.getName();
// var _name = getName();
// console.log(_name); // Perter

// demo2
/**
 * 在生成变量对象阶段，已经存在变量对象中的以函数名，
 * 在遇到同名的变量名作为属性名时不会覆盖掉，也就是不会被赋值为undefined
 * **/
// function test() {
//   function foo() {
//       return 'hello';
//   }
//   var foo;
//   var bar;
//   console.log(foo);
//   console.log(bar);

//   foo = 'Hello';
//   console.log(foo);
//   bar = function () {
//       return 'world';
//   }
// }
// test();


// demo01
// function test() {
//     // console.log(a);
//     // console.log(foo());

//     // var a = 1;
//     // function foo() {
//     //     return 2;
//     // }
//     function foo() {
//         return 2;
//     }
//     var a;
//     console.log(a);
//     console.log(foo());
//     a=1;
// }

// test();

function test() {
    // console.log(foo);
    // console.log(bar);

    // var foo = 'Hello';
    // console.log(foo);
    // var bar = function () {
    //     return 'world';
    // }

    // function foo() {
    //     return 'hello';
    // }
    function foo() {
        return 'hello';
    }
    var foo;
    console.log(foo); // foo
    console.log(bar); // undefined
    var bar;
    foo = 'Hello';
    console.log(foo); // Hello
    bar = function () {
        return 'world';
    }
}

test();