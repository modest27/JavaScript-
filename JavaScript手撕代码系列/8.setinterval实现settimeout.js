const mySettimeout = (fn, delay) => {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, delay)
}