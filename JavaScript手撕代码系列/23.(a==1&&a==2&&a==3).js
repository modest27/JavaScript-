// 方法一
var a = {
  i: 1,
  toString: function () {
    return a.i++
  }
}

console.log(a == 1 && a == 2 && a == 3) // true

// 方法二
var a = [1, 2, 3]
a.join = a.shift
console.log(a == 1 && a == 2 && a == 3)

// 方法三
var val = 0
Object.defineProperty(window, 'a', {
  get() {
    return ++val
  }
})
console.log(a == 1 && a == 2 && a == 3)
