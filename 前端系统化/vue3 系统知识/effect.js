// 全军变量记录当前被注册的函数
let activeEffect;
function effect(fn,options = {}){
    const effectFn = ()=>{
        //  当 effectFn 执行是，将全局的 activeEffect 注册为 fn
        activeEffect = effectFn;
        fn()
    }
    // 将可选项挂载到 副作用函数上，例如里面有调度器
    /**
     * 调度器将 执行任务 放到调度器里面的宏任务中
     * sechdule((fn)=>{
     *   setTimeout(fn);
     * });
    */
    effectFn.options = options;
    // 记录和当前 effectFn 副作用函数有关的依赖
    effectFn.deps = [];
    // 执行副作用函数
    effectFn();
};


/**
 * watch 中的 flush 参数 有 post、pre、sync, 是回调的刷新时机
 * 
 * 当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
 * 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。
 * 这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
 * 
 * sync 同步触发的侦听器，能够同步监听 vue 组件的任何更新，不建议使用，性能损耗大 ？？？
 * pre 回调函数能访问 vue 组件更新之前的 dom，是默认值
 * post 表示将 watch 的回调函数放到微任务队列中，等到 vue 组件更新之后执行, 
 * 能访问到 vue 组件更新之后的 dom，和 nextTick 的作用基本一致
 * 
 * https://segmentfault.com/q/1010000042325613
 * */ 