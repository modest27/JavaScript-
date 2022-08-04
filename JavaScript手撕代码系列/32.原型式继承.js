// 方法1
function object1(obj) {
  function Func() {}
  Func.prototype = obj
  return new Func()
}

// 方法2
function object2(obj) {
  var newObj = {}
  Object.setPrototypeOf(newObj,obj)
  return newObj
}

// 方法3
let student = Object.create(obj,{
  address:{
    value:'北京市',
    enumerable:true
  }
})