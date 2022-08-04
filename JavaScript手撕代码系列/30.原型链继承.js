// 原型链继承的弊端
// 但是目前有一个很大的弊端：某些属性其实是保存在p对象上的；
// 第一，我们通过直接打印对象是看不到这个属性的；
// 第二，这个属性会被多个对象共享，如果这个对象是一个引用类型，那么就会造成问题；
// 第三，不能给Person传递参数，因为这个对象是一次性创建的（没办法定制化）；


// 1.定义父类构造函数
function Person() {
  this.name = 'lilei'
}
// 2.父类原型上添加方法
Person.prototype.running = function() {
  console.log(this.name + 'running');
}

// 3.定义子类构造函数
function Student() {
  this.age = 17 
}
// 4.创建父类对象，作为子类的原型对象
let p = new Person()
Student.prototype = p
// 5.在子类原型上添加方法
Student.prototype.studenting = function() {
  console.log(this.name + 'studenting');
}