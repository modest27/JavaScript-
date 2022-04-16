Object.prototype.wh_assign = function (target, ...args) {
  if (target === undefined || target === null) {
    throw new TypeError('复制的目标对象有误，不是一个对象')
  }

  target = Object(target)

  for (const obj of args) {
    for (const key in obj) {
      obj.hasOwnProperty(key) && (target[key] = obj[key])
    }
  }

  return target
}