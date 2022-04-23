// 要求：实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3)() = 6
// add(1,2,3)(4)() = 10

function add(...args1) {
  let allArgs = [...args1]

  const fn = (...args2) => {
    allArgs = [...allArgs, ...args2]
    return fn
  }

  fn.toString = function () {
    if (!allArgs.length) return

    return allArgs.reduce((sum, next) => {
      return sum + next
    })
  }
  return fn
}
