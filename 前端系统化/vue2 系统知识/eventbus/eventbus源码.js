export function eventsMixin (Vue: Class<Component>) {
    const hookRE = /^hook:/
    /**
     *  监听事件 用于兄弟组件传值
     *  @event 事件名或者由事件名组成的数组，
     *  @fn 回调函数
     *  实际使用中 
     *  this.$on('event1',()=>{ });或者
     *  this.$on(['event1','event2'],()=>{ });
     *  在事件触发处，this.$emit('event1'); 或者 this.$emit('event2'); 都可以触发同一个回调。
     *  另一种情况
     *  this.$on('event1',()=>{ 回调1 });
     *  this.$on('event1',()=>{ 回调2 });
     *  同一个事件，可以监听多次，在触发的时候，可以依次触发回调
     *  this.$emit('event1') 依次执行 回调1 回调2
     *  所以 on 会遍历事件数组，绑定回调，
     *  同一个事件也可以绑定一个 事件回调的数组，回调时依次执行
     */
    
    Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
      const vm: Component = this
      if (Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn)
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn)
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true
        }
      }
      return vm
    }
  
    Vue.prototype.$once = function (event: string, fn: Function): Component {
      const vm: Component = this
      function on () {
        vm.$off(event, on)
        fn.apply(vm, arguments)
      }
      on.fn = fn
      vm.$on(event, on)
      return vm
    }
  
    Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
      const vm: Component = this
      // all
      if (!arguments.length) {
        vm._events = Object.create(null)
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
          vm.$off(event[i], fn)
        }
        return vm
      }
      // specific event
      const cbs = vm._events[event]
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null
        return vm
      }
      // specific handler
      let cb
      let i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
      return vm
    }
  
    Vue.prototype.$emit = function (event: string): Component {
      const vm: Component = this
      if (process.env.NODE_ENV !== 'production') {
        const lowerCaseEvent = event.toLowerCase()
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip(
            `Event "${lowerCaseEvent}" is emitted in component ` +
            `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
            `Note that HTML attributes are case-insensitive and you cannot use ` +
            `v-on to listen to camelCase events when using in-DOM templates. ` +
            `You should probably use "${hyphenate(event)}" instead of "${event}".`
          )
        }
      }
      let cbs = vm._events[event]
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs
        const args = toArray(arguments, 1)
        const info = `event handler for "${event}"`
        for (let i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info)
        }
      }
      return vm
    }
  }