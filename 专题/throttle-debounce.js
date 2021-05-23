/*
节流：在指定的时间内，只响应一个回调请求，
不响应其他的请求，在指定的时间之后，才执行下一次的请求，
节流是持续事件触发的时候，每n秒内只执行一次函数
应用场景：页面滚动事件，频繁的上滑，下拉事件

防抖动：在指定时间内，接收新的请求，就从当前时间重新计时，
直到指定时间内，没有接收到新的请求，才响应回调
防抖是虽然事件持续触发，但只有等事件停止触发后 n 秒才执行函数
应用场景：窗口大小改变，即时搜索，可以一步到位的场景
*/


/**
 * 节流1
 * 1、返回一个函数，
 * 2、函数能够包含函数上下文的内容
 * 3、使用时间戳的方式，前一次执行的时间和 现在时间的差是否大于等待时间
 */

function throttle1(func, wait) {
    let that;
    let args = arguments;
    let preTime = 0;
    return function () {
        that = this;
        // 当前时间，要保存在闭包中，保证运行时能够每次得到当前时间
        let now = (new Date()).getTime();
        if (now - preTime > wait) {
            func.apply(that,args);
            preTime = now;
        }
    }
}

/*
节流2
使用setTimeout进行模拟
1、setTimtout执行之后再次执行
2、在每次运行闭包之前清除掉定时器
*/
function throttle2(func,wait){
    let timer = null;
    let args = arguments;
    return function(){
        let that = this;
        if(!timer){
            clearTimeout(timer);
            timer = setTimeout(function(){
                func.apply(that,args);
                timer = null;
            },wait);
        }
    }
}

/**
 * 防抖
 * 1、在等待的时间内接收到新的请求时重新计时，
 * 2、直到新的等待时间内，没有新的请求吗，就执行最近的回调请求
 * 相当于每次触发的时候重新生成一个新的定时器，重新计时
 * */ 

function debounce(func,wait){
    let timer = null;
    let args = arguments;
    return function(){
        let that = this;
        if(timer){
            // 清除上一个定时器，重新生产新的定时器
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            func.apply(that,args);
            timer = null;  // 每次运行完，重置定时器变量
        },wait)
    }
}

let count = 0;

function setHtml() {
    $(this).html(count++);
}

let newSetHtml = debounce(setHtml, 500,a=1);
$(".content").on("mousemove", newSetHtml);