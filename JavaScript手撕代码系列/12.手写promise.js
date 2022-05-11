class MyPromise {
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 初始化绑定
    this.initBind()
    // 执行传进来的函数
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  initValue() {
    this.PromiseResult = null
    this.PromiseState = 'pending'
    this.onFulfilledCallBacks = [] // 保存成功回调
    this.onRejectedCallBacks = [] // 保存失败回调
  }

  resolve(value) {
    // state状态不可变
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value

    while (this.onFulfilledCallBacks.length) {
      this.onFulfilledCallBacks.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    // state状态不可变
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallBacks.length) {
      this.onRejectedCallBacks.shift()(this.PromiseResult)
    }
  }

  then(onFulfilled, onRejected) {
    // 进行参数校验
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
              throw new Error('不能返回自身')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
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
      } else if (this.PromiseState === 'reject') {
        resolvePromise(onRejected)
      } else {
        this.onFulfilledCallBacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallBacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }

  // all 方法
  static all(promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value
        count++
        if (count === promises.length) resolve(result)
      }

      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              addData(index, res)
            },
            err => reject(err)
          )
        } else {
          addData(index, promise)
        }
      })
    })
  }

  // race 方法
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              resolve(res)
            },
            err => {
              reject(err)
            }
          )
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
      const addData = (status, value, i) => {
        res[i] = { status, value }
        count++
        if (count === promises.length) resolve(res)
      }

      promises.forEach((promise, i) => {
        if (promise instanceof MyPromise) {
          promise.then(
            res => {
              addData('fulfilled', res, i)
            },
            err => {
              addData('rejected', err, i)
            }
          )
        } else {
          addData('fulfilled', promise, i)
        }
      })
    })
  }

  // any 方法
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      promises.forEach(promise => {
        promise.then(
          res => {
            resolve(res)
          },
          err => {
            count++
            if (count === promises.length) {
              reject(new AggregateError('All promises were rejected'))
            }
          }
        )
      })
    })
  }
}
