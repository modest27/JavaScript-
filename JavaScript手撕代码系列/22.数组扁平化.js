// 实现一个方法将多维数组变成一维数组

// 递归法

function flatter(arr) {
  if (!arr.length) return
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur]
  }, [])
}

// console.log(flatter([1, 2, 3, [4, 5, [6]]]))

// 任意层数数组扁平化
let count = 0
var flatter = function (arr, k) {
  if (!arr.length) return
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      count++
      if (count === k) {
        return [...pre, cur]
      } else {
        return [...pre, ...flatter(cur)]
      }
    } else {
      return [...pre, cur]
    }
  }, [])
}
