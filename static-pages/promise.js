/*
1、new promise 是宏任务，新建之后就马上运行
2、Promise.then 的回调函数是微任务，在每一次宏任务运行完毕后把微任务全部执行完，
3、promise是异步的，表现上将异步任务写成了同步任务的方式，不过在then链中运行是遵循同步的方式
即：前一个then 链执行完了之后，才会执行下一个then,前提是前一个then 链返回得是promise对象。
4、promise.all 执行有顺序，按照数组的顺序，返回值也是按照数组的顺序，
只有当所有的执行完毕之后或者其中一个返回rejected状态，才执行promise.all的回调函数；
5、传入 promise.all 的promise 对象，其中一个有捕获异常处理，在其返回rejected的时候，
会被自己的catch捕获，返回resolved状态,
不会被promise.all的catch 的捕获，会被promise.all回调函数的resolved接收,并返回包含错误信息的结果数组；
如果其中一个没有异常处理，返回异常，会直接被promise.all的catch捕获，
*/ 

// function setname(name){
//     return new Promise((resove,reject)=>{
//         if(name){
//             resove(name);
//         }else {
//             reject("错误的名字！");
//         }
//     });
// }

// // 方式2  可
// let newName = '';

// function setage(d){
//     console.log(d+100);
// }

// function p(){
//     setname("franklin").then(res=>{
//         setage(res);
//     }).catch(error=>{
//         console.log(error);
//     });
//     console.log('innner ',newName);
// }
// p();

// console.log('outter ',newName);


// promise 实际测试

// http://azu.github.io/promises-book/json/comment.json
// http://azu.github.io/promises-book/json/people.json
const commentUrl = "http://azu.github.io/promises-book/json/comment.json";
const peopleUrl = "http://azu.github.io/promises-book/json/people.json";

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        console.log("promise");
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

async function getCommons(){
    let comments = await getURL(commentUrl);
    console.log(comments);
}

getCommons();

console.log("ceshi");







