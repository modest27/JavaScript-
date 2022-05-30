function Axios(config) {
  // 初始化
  this.defaults = config //为了创建 default 默认属性
  this.intercepters = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

// 在Axios原型上添加相关的方法
Axios.prototype.request = function (config) {
  // 创建一个promise对象
  let promise = Promise.resolve(config)
  // 声明一个数组
  let chains = [dispatchRequest, undefined] // undefined 占位
  // 处理拦截器
  // 请求拦截器 将请求拦截器的回调 压入到 chains 的前面 request.handlers = []
  this.intercepters.request.handlers.forEach(item => {
    chains.unshift(item.fulfilled, item.rejected)
  })
  this.intercepters.response.handlers.forEach(item => {
    chains.push(item.fulfilled, item.rejected)
  })
  // 遍历
  while (chains.length) {
    promise = promise.then(chains.shift(), chains.shift())
  }
  // 返回 promise 结果
  return promise
}

Axios.prototype.get = function (config) {
  return this.request({ method: 'GET' })
}

Axios.prototype.post = function (config) {
  return this.request({ method: 'POST' })
}

//声明函数
function createInstance(config) {
  // 实例化一个对象
  let context = new Axios(config)

  // 创建请求函数
  // 此时instance 是一个函数，并且可以 instance({})
  // 但是此时还不能当做对象来调用，比如 instance.get()
  let instance = Axios.prototype.request.bind(context)

  // 将 Axios.prototype 对象中的方法添加到instance函数对象中
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context)
  })

  // 为instance函数对象添加属性 default 与 interceptors
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })

  return instance
}

// dispatchRequest 函数
function dispatchRequest(config) {
  // 调用适配器发送请求
  return xhrAdapter(config).then(
    response => {
      // 对响应的结果进行转换处理
      // ...
      return response
    },
    error => {
      throw error
    }
  )
}

// adapter 适配器
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    // 发送 ajax 请求
    let xhr = new XMLHttpRequest()
    // 初始化
    xhr.open(config.method, config.url)
    // 发送
    xhr.send()
    // 绑定事件
    xhr.onreadystatechange = function () {
      // 判断成功的条件
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          // 成功状态
          resolve({
            // 配置对象
            config: config,
            // 响应体
            data: xhr.response,
            // 响应头
            headers: xhr.getAllResponseHeaders(),
            // xhr 请求对象
            request: xhr,
            // 响应状态码
            status: xhr.status,
            // 响应状态字符串
            statusText: xhr.statusText
          })
        } else {
          // 失败状态
          reject(new Error('请求失败，失败的状态码为' + xhr.status))
        }
      }
    }

    // 关于取消请求的处理
    if (config.cancelToken) {
      // 对cancelToken对象身上的promise对象指定成功的回调
      config.cancelToken.promise.then(resolve => {
        xhr.abort()
        // 将整体结果设置为失败
        reject(new Error('请求已经被取消'))
      })
    }
  })
}

// 拦截器管理器构造函数
function InterceptorManager() {
  this.handlers = []
}

InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  })
}

// CancelToken 构造函数
function CancelToken(executor) {
  // 声明一个变量
  var resolvePromise
  // 为实例对象添加属性
  this.promise = new Promise(resolve => {
    // 将resolve赋值给resolvePromise
    resolvePromise = resolve
  })
  // 调用excutor函数
  executor(function () {
    // 执行resolvePromise函数
    resolvePromise()
  })
}
