// JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

// addTask(1000,"1");
// addTask(500,"2");
// addTask(300,"3");
// addTask(400,"4");
// 的输出顺序是：2 3 1 4

// 整个的完整执行流程：

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4

class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.queue = []
    this.count = 0
  }

  // add 添加请求函数
  add(time, str) {
    const requestStr = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(str)
          resolve()
        }, time)
      })
    }
    this.queue.push(requestStr)
  }

  // request 请求函数
  request() {
    if (!this.queue.length || this.count > this.limit) {
      return
    }
    this.count++
    this.queue
      .shift()()
      .then(() => {
        this.count--
        this.request()
      })
  }

  // 根据limit 限制额度取出请求执行
  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request()
    }
  }
}

const a = new Scheduler(2)

a.add(1000, '1')
a.add(500, '2')
a.add(300, '3')
a.add(400, '4')

a.taskStart()
