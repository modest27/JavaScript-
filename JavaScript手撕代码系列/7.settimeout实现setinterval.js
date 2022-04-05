const mySetInterval = (fn, delay) => {
  let timer = null
  const interval = () => {
    fn()
    timer = setTimeout(interval, delay)
  }
  timer = setTimeout(interval, delay)
  
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}