Function.prototype.wh_bind = function (obj, ...args) {
  obj = obj || window
  const fn = Symbol()
  obj[fn] = this
  const _this = this

  const res = function (...innerArgs) {
    if (this instanceof _this) {
      this[fn] = _this
      this[fn](...[...args, ...innerArgs])
      delete this[fn]
    } else {
      obj[fn]([...[args, ...innerArgs]])
      delete obj[fn]
    }
  }

  res.prototype = Object.create(this.prototype)
  return res
}

// 再重复练习一次
Function.prototype.wh_bind2 = function (obj, ...args) {
  obj = obj || window
  const fn = Symbol()
  obj[fn] = this
  let _this = this

  const res = function (...innerArgs) {
    if (this instanceof _this) {
      this[fn] = _this
      this[fn](...[...args, ...innerArgs])
      delete this[fn]
    } else {
      obj[fn](...[...args, ...innerArgs])
      delete obj[fn]
    }
  }

  res.prototype = Object.create(this.prototype)
  return res
}