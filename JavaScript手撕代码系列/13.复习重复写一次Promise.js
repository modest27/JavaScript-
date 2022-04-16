class MyPromise{
  // 构造函数
  constructor(executor) {
    // 初始化值
    initValue()
    // 初始化this绑定
    initBind()
    // 执行传入的executor
   try {
    executor(this.resolve,this.reject)
   } catch (e) {
     this.reject(e)
   }
  }

  initValue() {
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.onFulfilledCallBack = []
    this.onRejectedCallBack = []
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value) {
    if(this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    while (this.onFulfilledCallBack.length) {
      this.onFulfilledCallBack.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    if(this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallBack.length) {
      this.onRejectedCallBack.shift()(this.PromiseResult)
    }
  }

  // then 方法
  then(onFulfilled, onRejected) {
    // 先参数校验，判断是不是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    
    var thenPromise = new MyPromise((resolve, reject) => {
      // 判断上一次then返回结果的状态，再决定这次promise状态函数
      const resolvePromise = cb => {
        setTimeout(() => {
          
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
              throw new Error('不能返回自身')
            }
            if (x === MyPromise) {
              x.then(resolve,reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
          }

        })
      }

      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else {
        this.onFulfilledCallBack.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallBack.push(resolvePromise.bind(this,onRejected))
      }
    })

    return thenPromise
  }

  // all 方法
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const res = []
      let count = 0
      
      var addData = (value, i) => {
        res[i] = value
        count++
        if(count === promises.length) resolve(res)
     }

      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData(res,index)
          },err=>reject(err))
        } else {
          addData(promise,index)
        }
      })
    })
  }

  // race 方法
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => { 
            resolve(res)
          }, err => {
            reject(res)
          })
        } else {
          resolve(promise)
        }
      })
    })
  }

  // allSettled 方法
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      const res = []
      let count = 0

      var addData = (status, val, i) => {
        res[i] = {status,val}
        count++
        if(count === promises.length) resolve(res)
      }

      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData('fulfilled',res,index)
          }, err => {
            addData('rejected',err,index)
          })
        } else {
          addData('fulfilled',promise,index)
        }
      })
    })
  }

  // any 方法
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => {
            count++
            if(count === promises.length) reject(new AggregateError('All promise were rejected'))
          })
        } else {
          resolve(promise)
        }
      })
    })
  }

}