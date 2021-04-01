/**
 * 节流：在指定的时间内，执行一次请求，超过指定时间后，才执行下一次请求
 * 1、判断超时
 * 2、返回一个闭包，包含执行时间和执行上下文
*/

function throttle1(cb,wait){
    let pretime = 0;
    return function(){
        let that = this;
        let now = (new Date()).getTime();
        if(now - pretime > wait){
            pretime  = now;
            cb.apply(that,arguments);
        }
    }
}

function throttle2(cb,wait){
    let timer = null;
    return function(){
        let that = this;
        !timer && clearTimeout(timer);
        // 只有执行完成之后，才能进行下一次请求
        if(!timer){
            timer = setTimeout(function(){
                cb.apply(that,arguments);
                // 执行完，值为空
                timer = null;
            },wait);
        }  
    }
}

/**
 * 防抖：在n秒内，如果接收到新的请求，从接收新的请求那一刻重新开始计时，
 * 直到n秒内没有接收到新的请求，就执行请求
*/

function  debounce(cb,wait) {
    let timer = null;
    return function(){
        let that = this;
        // 每次都会清除掉上一个定时器，保证重新计时
        clearTimeout(timer);
        timer = setTimeout(function(){
            cb.apply(that,arguments);
        },wait);
    }
}
