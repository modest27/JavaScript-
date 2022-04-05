const ajax = {
  // 封装ajax的get方法
  get(url, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responseText)
      }
    }

    xhr.send()
  },

  // 封装ajax的post方法
  post(url, fn, data) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlcoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responseText)
      }
    }

    xhr.send(data)
  }
}