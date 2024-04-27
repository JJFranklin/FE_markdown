/**
 * 1、evetnBus 中采取 {} 的形式保存下来
 * 2、以 事件的名字为 key,事件队列数组为value,数组里面存储着回调
 * vue 2 事件系统简化版
 */
class EventBus {
  constructor() {
    this.eventobj = {};
  }
  on(eventName, cb) {
    const vm = this;
    if (!eventName || !cb) return vm;
    // 先判断有没有一样的事件，没有的话，重新开一个数组存储
    // 有的话直接加入到数组中

    // 事件是可以接受单个事件，也可以接受事件数组，将多个事件绑定同一个回调
    if (Array.isArray(eventName)) {
      for (let i = 0, len = eventName.length; i < len; i++) {
        vm.on(eventName[i], cb);
      }
    } else {
      if (!this.eventobj[eventName]) {
        this.eventobj[eventName] = [];
      }
      this.eventobj[eventName].push(cb);
    }
    return vm;
  }
  emit(eventName, args) {
    const vm = this;
    // 找到对应的事件队列，遍历执行里面的回到
    if (this.eventobj[eventName]) {
      const cbs = this.eventobj[eventName];
      for (let index = 0; index < cbs.length; index++) {
        const cb = cbs[index];
        cb.apply(vm, [...args]);
      }
    }
    return vm;
  }
  /**
     *  移除自定义事件回调。
        如果没有提供参数，则移除所有的事件回调；
        如果只提供了事件，则移除该事件所有的回调；
        如果同时提供了事件与回调，则只移除这个回调的回调。
    */
  off(eventName, cb) {
    const vm = this;
    // 如果没有提供参数(事件参数)，则移除所有的事件回调；
    if (!eventName) {
      this.eventobj = {};
    } else {
      // 判断事件是不是数组
      if (Array.isArray(eventName)) {
        if (cb) {
          for (let i = 0, l = eventName.length; i < l; i++) {
            vm.off(eventName[i], cb);
          }
        }
      } else {
        if (cb) {
          // 如果同时提供了事件与回调，则只移除这个事件的回调。
          const cbs = this.eventobj[eventName] || [];
          if (cbs.length > 0) {
            const curIndex = cbs.findIndex((item) => item === cb);
            cbs.splice(curIndex, 1);
          }
          if (cbs.length === 0) {
            delete this.eventobj[eventName];
          }
        } else {
          // 如果只提供了事件，则移除该事件所有的回调；
          delete this.eventobj[eventName];
        }
      }
    }
    return vm;
  }
  once(eventName, cb) {
    const vm = this;
    // 只执行一次
    // 先要注册，注册完，等待调用的时候，在 off 掉
    // 在这里同时完成了对该事件的注册、对该事件的触发，并在最后取消该事件。
    const fn = (args) => {
      //触发
      cb.apply(vm, args);
      //取消
      vm.off(eventName, cb);
    };
    //监听
    this.on(eventName, fn);
    return vm;
  }
}
