// 方法1
const quchong1 = (arr) => {
  return [...new Set(arr)]
}

// 方法2
const quchong2 = (arr) => {
  const res = []
  arr.reduce((pre, next) => {
    if (!pre.has(next)) {
      pre.set(next, 1)
      res.push(next)
    }

    return pre
  }, new Map())
  
  return res
}