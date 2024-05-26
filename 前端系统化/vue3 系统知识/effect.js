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