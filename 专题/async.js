/*
1、async 表示有异步操作，返回一个promise 对象；
2、await 必须在async中执行
3、遇到await 先返回，遇到异步操作，然后等待异步操作执行完后，在执行函数体内的后的代码，
类似于执行了一个new promise的操作，new 了之后马上执行，然后等待异步的结果执行；
4、await 后面一般是接一个Promise对象，也可以返回常量，普通函数
5、await 后面返回的是promise 对象的时候，相当于执行是promise 中的then，等于执行一个微任务，等异步任务有结果后，在执行后面的内容
6、多个await 执行也是按照顺序执行，等到前一个执行返回状态，才会执行后一个；
7、await 此行后面代码的内容可以看做异步的内容
8、使用for...of 遍历顺序执行输出结果，不会同步输出结果

*/
// function test(text){
//     return new Promise((res,rej)=>{
//         res(text);
//     });
// }

// async function test(text){
//     console.log(text+"123421");
//     // setTimeout(()=>{
//     //     console.log(text)
//     // },1000);
// }

// async function timeout(ms) { 
//     await test("hello");
//     // .then(res=>{
//     //     console.log(res);
//     // });
//     console.log("我是async");
// }

// timeout();

// console.log("outer");
var ss = null;

function sleep(interval, i) {
    // setTimeout(()=>{
    //     console.log(i*interval);
    // }, interval)
    return new Promise(resolve => {
        // setTimeout(resolve, interval)
        ss = setTimeout(() => {
            resolve(console.log(i * interval));
        }, interval);

    });
}

// 用法
async function one2FiveInAsync() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000, i);
        console.log(ss + "fwffwe");
    }
}

one2FiveInAsync();

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//       setTimeout(resolve, ms, 'done');
//     });
//   }

//   timeout(10000).then((value) => {
//     console.log(value);
//   });



// async function f() {
//     return 'hello world';
// }

//  let text = f();
//  console.log(text);

// 同步执行，顺序输出
let promises = Promise.all([promise1, promise2, promise3]);
async function printPromise() {
    for (let i = 0, len = promises.length; i < len; i++) {
        let promise = await promises[i];
        console.log(promise);
    }
};

// 同步执行，顺序输出
// 原理：map运行时，回调函数不受async 的影响，是同步执行，所以不用等待前一个执行完成，再执行下一个；
// 返回一个promise 的对象，并不是返回执行的结果,所以并不需要等待上一个结果执行完毕，在执行下一个；
// 然后在for 循环中顺序执行出最后的结果
async function printPromise() {
    let promises = urls.map(async function (url) {
        return await promise(url);
    });
    for (let i = 0, len = promises.length; i < len; i++) {
        let promise = await promises[i];
        console.log(promise);
    }
};

// 继发执行，顺序输出,缺点需要等待前一个完成，才能执行后一个
async function printPromise(urls) {
    for (let i = 0, len = urls.length; i < len; i++) {
        let promise = await promises(url);
        console.log(promise);
    }
};



/***
 * 在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

执行一个宏任务（栈中没有就从事件队列中获取）
执行过程中如果产生微任务，就将它添加到微任务的任务队列中
宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
当前微任务执行完毕后，开始检查渲染，然后GUI线程接管渲染
渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

微任务在dom渲染前触发，宏任务在dom 渲染后触发

1、执行当前执行栈中的同步任务，执行栈空了
2、执行当前的微任务队列中的所有微任务，执行完毕（此处微任务来源于上一次执行栈中执行的宏任务或者同步任务产生的微任务）
3、进行dom渲染
4、渲染完成后，从宏任务队列中取出一个宏任务执行,放到执行栈中执行，执行完毕后重复上述2，3，4步骤，直到所有的任务执行完毕


宏任务是浏览器决定的
微任务是es6 决定的

同步任务：promise、script(整体代码) ==> 可以看做一个大的宏任务
宏任务：setTimeout()、setInterval()、ui 交互，xhr 请求回调
微任务：promise.then ，await 

*/


const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
    console.log('foo') //  1 
    setTimeout(bar, 0) // 宏任务1
    new Promise((resolve, reject) =>
        resolve('应该在 baz 之后、bar 之前')
    ).then(resolve => console.log(resolve)) // 微任务1 3
    baz() // 2
}

foo()

/**
 * foo
 * baz
 * 应该在 baz 之后、bar 之前
 * bar
*/