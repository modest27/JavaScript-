const add = (a, b, c) =>  a + b + c  
const curring = (fn, ...args) => {
  let allargs = [...args]
  const num = fn.length
  const res = (...args2) => {
    allargs = [...allargs, ...args2]
    if (allargs.length === num) {
     return fn(...allargs)
    } else {
      return res
    }
  }

  return res
}

const a = curring(add, 1)
console.log(a(2)(3))