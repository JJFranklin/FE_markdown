/**
 * 1、箭头函数为什么没有this ?
 * 箭头函数没有自己的this，它会捕获自己在定义时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。
 * 2、箭头函数为什么不能做构造函数
 * // 文中可以全部解决、https://blog.csdn.net/weixin_42798473/article/details/105319353
 * https://segmentfault.com/a/1190000021517139
 * 
 * 提示，
 * new 操作符的运行过程，回去看 红宝书的介绍
 *  */ 

console.log(1);

setTimeout(function(){
    console.log(2)
},0);

new Promise((resolve,reject)=>{
    console.log(3);
    resolve();
    console.log(4)
}).then(()=>{
    console.log(5)
});
console.log(6);