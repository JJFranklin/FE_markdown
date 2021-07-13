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

promise.then((res) => {

}).catch((err) => {

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
        this.value = null; // 初始化结果，回调函数返回的值
        this.fulfilledArr = [];
        this.rejectedArr = []; // 存储等待执行回调的队列

        handler(this.newResolved.bind(this), this.newRejected.bind(this));
    }
    newResolved(val) {
        if (this.status !== PENDING) return;
        this.value = val;
        this.status = FULFILLED;
        this.fulfilledArr.map(cb => cb(val));
    }

    newRejected(err) {
        if (this.status !== PENDING) return;
        this.value = err;
        this.status = REJECTED;   
        this.rejectedArr.map(cb => cb(val));
    }
     
    // then 返回一个新的promise对象
    newThen(onFulilled, onRejected) {
        let {
            status,
            value
        } = this;

        return new NewPromise((resolvedThen, rejectedThen) => {
            // 成功时执行的函数
            let fulilledAction = (result) => {
                // 如果then的第一个不是函数，是基本类型的值，直接返回数据
                if (!isFunction(onFulilled)) {
                    resolvedThen(result);
                } else {
                    // 是函数类型

                    // 拿到成功回调的结果
                    // 如果成功回调的结果是 promise对象，
                    // 需要等待上一个promise对象执行完毕，才能执行新的promise 对象的回调，拿到最新的结果
                    // 成功回调如果不是 promise 对象，直接resolve，返回最后的结果
                    let res = onFulilled(result);
                    if (res instanceof NewPromise) {
                        res.newThen(resolvedThen, rejectedThen);
                    } else {
                        resolvedThen(res);
                    }
                }
            }

            let rejectedAction = (result) => {
                if (!isFunction(onRejected)) {
                    rejectedThen(result);
                } else {
                    // 是函数类型
                    let res = onRejected(result);
                    if (res instanceof NewPromise) {
                        res.newThen(resolvedThen, rejectedThen);
                    } else {
                        rejectedThen(res);
                    }
                }

            }

            // 返回成功的状态，立即执行成功回调；
            // 返回失败状态，立即执行失败回调
            // 不是这两种状态将当前状态存储起来，等待执行，到then的时候，
            // 状态不一定变成了成功或者失败，需要将回调暂存起来，等到变成了成功或者失败，再执行

            switch (status) {
                case PENDING:
                    this.fulfilledArr.push(onFulilled);
                    this.rejectedArr.push(onRejected);
                    break;
                case FULFILLED:
                    fulilledAction(value);
                    break;
                case REJECTED:
                    rejectedAction(value);
                    break;
                default:
            }
        });
    }
}
let p = new NewPromise(function (resolved, rejected) {
    resolved("1234666")
});

p.newThen(res => {
    console.log("res", res);
});