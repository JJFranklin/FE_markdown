
// this指向调用他的对象
// 模拟生成apply、call和bind
/**
 * 显式的改变this的指向
 * 1、apply func.apply(obj,[p1,p2,p3...]);
 * 2、call func.call(obj,p1,p2,p3...);
 * 3、bind func.bind(obj,p1,p2,p3...); 返回一个新的函数
 * 
 * 模拟实现的思路
 * 目的，将func中this的指向，指向调用的s对象；
 * 1、将方法作为对象的一个属性，属性中的this，就是对象的this;
 * 2、执行调用方法；
 * (3)、避免给属性添加多余的属性，执行完成之后，就删除属性
*/

const obj = {
    a:1,
    func:()=>{}
}

Function.prototype.newCall = function(obj,...args){
    // 将方法作为对象的一个属性，属性中的this，就是对象的this;
    // obj为null的时候this 指向window 
    obj = obj||window;
    obj.func = this; // 此时的this,就是调用此方法的函数 即funcA
    // 执行调用方法
    obj.func(...args);
    // 删除属性
    delete obj.func;
}

// funA.newACall(obj,a);
// funA.call(obj,a);

Function.prototype.newApply = function(obj,args){
    obj = obj || window;
    obj.func = this;
    obj.func(args);
    delete obj.func;
} 

Function.prototype.newBind = function(){
    let args = Array.prototype.slice.call(arguments) || [];
    let Obj = args.shift();
    let that = this;
    return function(){
        // 可以第二次传值
        let moreArgs = Array.prototype.slice.call(arguments) || [];
        moreArgs = moreArgs.concat(args);
        return that.apply(Obj,moreArgs);
    }
};

let person = {
    name:"franklin",
    sex:"fmale",
    arr:[1,2,34]
}
function print(name,male){
    this.sex = male;
    this.name = name;
    console.log("name:",this.name,"sex:",this.sex);
}

function printArr(arr){
    this.arr = this.arr.concat(arr);
    console.log('this.arr',this.arr);
}

// print.newCall(person,"xiaobai","male");

// printArr.newApply(person,[4,5,6,7,9]);

let newPrint  = print.newBind(person,21);
newPrint(56);

