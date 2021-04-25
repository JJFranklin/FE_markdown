
/*
1、async 表示有异步操作，返回一个promise 对象；
2、await 必须在async中执行
3、遇到await 先返回，遇到异步操作，然后等待异步操作执行完后，在执行函数体内的后的代码，
类似于执行了一个new promise的操作，new 了之后马上执行，然后等待异步的结果执行；
4、await 后面一般是返回一个Promise对象
5、await 后面返回的是promise 对象的时候，相当于执行是promise 中的then，等于执行一个微任务，等异步任务有结果后，在执行后面的内容
6、多个await 执行也是按照顺序执行，等到前一个执行返回状态，才会执行后一个；

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
function sleep(interval,i) {
// setTimeout(()=>{
//     console.log(i*interval);
// }, interval)
return new Promise(resolve => {
    // setTimeout(resolve, interval)
    ss = setTimeout(()=>{
        resolve(console.log(i*interval));
    }, interval);
    
});
}

// 用法
async function one2FiveInAsync() {
    for(let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000,i);
        console.log(ss+"fwffwe");
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
let promises = Promise.all([promise1,promise2,promise3]);
async function printPromise(){
    for(let i=0,len=promises.length;i<len;i++){
        let promise = await promises[i];
        console.log(promise);
    }
};

// 同步执行，顺序输出
// 原理：map运行时，回调函数不受async 的影响，是同步执行，所以不用等待前一个执行完成，再执行下一个；
// 返回一个promise 的对象，并不是返回执行的结果,所以并不需要等待上一个结果执行完毕，在执行下一个；
// 然后在for 循环中顺序执行出最后的结果
async function printPromise(){
    let promises = urls.map(async function(url){
        return await promise(url);
     });
    for(let i=0,len=promises.length;i<len;i++){
        let promise = await promises[i];
        console.log(promise);
    }
};

// 继发执行，顺序输出,缺点需要等待前一个完成，才能执行后一个
async function printPromise(urls){
    for(let i=0,len=urls.length;i<len;i++){
        let promise = await promises(url);
        console.log(promise);
    }
};



