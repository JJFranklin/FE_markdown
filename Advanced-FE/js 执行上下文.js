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
