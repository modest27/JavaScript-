const fn1 = (x) => {
  return x + 1
}

const fn2 = (x) => {
  return x + 2
}

const fn3 = (x) => {
  return x + 3
}

const fn4 = (x) => {
  return x + 4
}

const compose = (...fns) => {
  if (fns.length === 0) return (num) => num
  if (fns.length === 1) return fns[0]
  return fns.reduce((pre, next) => {
    return (num) => {
      return pre(next(num))
    }
  })
}

const a = compose(fn1, fn2, fn3, fn4)

console.log(a(1));