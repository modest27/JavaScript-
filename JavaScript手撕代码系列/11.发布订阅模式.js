class EventEmitter {
  constructor() {
    this.event = {}
  }

  // on订阅
  on(type, callback) {
    if (this.event[type]) {
      this.event[type].push(callback)
    } else {
      this.event[type] = [callback]
    }
  }

  // off 取消订阅
  off(type, callback) {
    if (this.event[type]) {
      this.event[type] = this.event[type].filter(item => {
        return item !== callback
      })
    } else {
      return
    }
  }

  // once 执行一次订阅
  once(type, callback) {
    function fn(type, callback) {
      callback()
      this.off(type, callback)
    }
    this.on(type, fn)
  }

  // emit 触发订阅
  emit(type, ...args) {
    this.event[type] &&
      this.event[type].forEach(fn => {
        fn.apply(this, args)
      })
  }
}
