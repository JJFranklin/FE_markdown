/**
 * promise状态变化
 * 1、只能从pending变为fulfilled,或者 pending 变为 rejected
 * 2、回调函数接收2个参数，resolved 和 rejected ,resolve 返回fulfilled结果，reject 返回 rejected 结果
 * 3、then 方法返回一个新的promise对象，接收2个参数，分别对应resolved和rejected回调返回的数据 
 */

let promise = new Promise((resolve, reject) => {
    resolve();
});

promise.then((res) => {

}, (err) => {

});

function isFunction(func) {
    return typeof func === "function";
}

const PENDING = "PENDING";
const FULFILLED = "FULILLED";
const REJECTED = "REJECTED";

class NewPromise {
    constructor(handler) {
        if (!isFunction(handler)) {
            throw new Error("参数必须是函数！");
        }
        this.status = PENDING; // 状态初始化为PENDING 
        this.value = null; // 初始化结果

        handler(this.newResolved.bind(this), this.newRejected.bind(this));
    }
    newResolved(val) {
        if (this.status === PENDING) return;
        // resolve传入的值是是一个新的promise实例
        // 需要不断回调得到最后非 peomise 对象的值
        if (val instanceof NewPromise) {
            val.newThen(res => {
                this.value = res;
            });
        } else {
            // 普通值类型的值
            this.value = val;
        }
        this.status = FULFILLED;
    }

    newRejected() {

    }
    newThen(onFulilled, onRejected) {


    }
}
new NewPromise(function (resolved, rejected) {
    resolved("1234")
});
// // let p  = 
// p.newResolved();