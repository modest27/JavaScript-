Function.prototype.wh_call = function (obj, ...args) {
  obj = obj || window
  const fn = Symbol()
  obj[fn] = this
  const res = obj[fn](...args)
  delete obj[fn]
  return res
}