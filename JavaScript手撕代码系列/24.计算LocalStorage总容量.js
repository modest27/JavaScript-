let str = '0123456789'
let temp = ''
// 准备一个10kb的字符串
while (str.length !== 10240) {
  str += '0123456789'
}

// 先清空
localStorage.clear()

const computedTotal = () => {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      try {
        localStorage.setItem('temp', temp)
      } catch (err) {
        // 证明超出容量了
        resolve(temp.length / 1024 - 10)
        // 清除定时器和localStorage
        clearInterval(timer)
        localStorage.clear()
      }
      temp += str
    }, 0)
  })
}

;(async () => {
  const total = await computedTotal()
  console.log(`localStorage的总容量是${total}kb`)
})()
