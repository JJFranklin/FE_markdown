// promise 链式调用使用示例
function p1(){
    return new Promise((resolve,reject)=>{
        resolve(1);
    });
}

function p2(){
    return new Promise((resolve,reject)=>{
        resolve(2);
    });
}

function p3(){
    p1().then((res)=>{
        console.log("res1",res);
        // 此处返回 promise 实例 用作下次then调用
        return p2();
    }).then(res=>{
        console.log("res2",res)
    });
}
p3();
