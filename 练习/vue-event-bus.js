/**
 * 1、evetnBus 中采取 {} 的形式保存下来
 * 2、以 事件的名字为 key,事件队列数组为value,数组里面存储着回调
 */
class EventBus {
    constructor(){
        this.eventobj = {};
    }
    on(name,cb){
        // 先判断有没有一样的事件，没有的话，重新开一个数组存储
        // 有的话直接加入到数组中
        if(!this.eventobj[name]){
            this.eventobj[name] = [];
        }
        this.eventobj[name].push(cb);
    }
    emit(name,args){
        // 找到对应的事件队列，遍历执行里面的回到
        if(this.eventobj[name]){
            const cbs = this.eventobj[name];
            for (let index = 0; index < cbs.length; index++) {
                const curCb = cbs[index];
                curCb(...args);
            }
        }
    }
    off(name,cb){
        // 在事件队列里面找到对应的回调，找到逐个删除
        // 判断完全删除掉后，直接删除全部的事件对象
        const cbs = this.eventobj[name] || [];
        if(cbs.length > 0){
            const curIndex = cbs.findIndex((item)=>item === cb);
            this.cbs.splice(curIndex,1);
        }
        if(cbs.length === 0){
            delete this.this.eventobj[name];
        }
    }
    once(name,cb){
        // 只执行一次
        // 先要注册，注册完，等待调用的时候，在 off 掉
        // 在这里同时完成了对该事件的注册、对该事件的触发，并在最后取消该事件。
        const fn=(...args)=>{
            //触发
            cb(...args);
            //取消
            this.off(name,cb);
        };
        //监听
        this.on(name,fn);
    }
}