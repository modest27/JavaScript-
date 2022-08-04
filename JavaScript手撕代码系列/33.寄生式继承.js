// 寄生式继承的思路是结合原型类继承和工厂模式的一种方式；
// 即创建一个封装继承过程的函数, 该函数在内部以某种方式来增强对象，最后再将这个对象返回；


// 定义父类构造函数
function Person() {
  this.name = 'lilei'
}

// 定义object函数
function object(obj) {
  function Func() {}
  Func.prototype = obj
  return new Func()
}

// 寄生式继承函数
function createObj(obj) {
  let newObj = object(obj)
  newObj.studying = function() {
    console.log(this.name + 'studying');
  }
  return newObj
}