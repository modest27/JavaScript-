let observer_ids = 0
let observed_ids = 0

// 观察者
class Observer {
  constructor() {
    this.id = observer_ids++
  }

  // 观察到变化后的处理
  update(ob) {
    console.log(`观察者${this.id}-检测到被观察者${ob.id}的变化`);
  }
}

// 被观察者
class Observed {
  constructor() {
    this.observers = []
    this.id = observed_ids++
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  removeObserver(observer) {
    this.observers.filter(o=>{
      return o.id != observer.id
    })
  }

  // 通知所有观察者更新
  notify() {
    this.observers.forEach(observer=>{
      observer.update(this)
    })
  }
}

// let mObserved = new Observed()
// let mObserver1 = new Observer()
// let mObserver2 = new Observer()

// mObserved.addObserver(mObserver1)
// mObserved.addObserver(mObserver2)

// mObserved.notify()