class LRUCache {
  constructor(size) {
    this.size = size
    this.cache = new Map()
  }

  get(key) {
    const hasKey = this.cache.has(key)
    if(!hasKey) {
      return -1
    }else {
      const val = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key,val)
      return val
    }
  }

  put(key, value) {
    const hasKey = this.cache.has(key)
    if(hasKey) {
      this.cache.delete(key)
    }
    this.cache.set(key,value)
    if(this.cache.size > this.size) {
      // this.cache.keys() 是一个MapIterator迭代器
      // 例如：let a = new Map([['a',1],['b',2]])
      // a.keys().next() --> {value: 'a', done: false}
      this.cache.delete(this.cache.keys().next().value)
    }
  }
}