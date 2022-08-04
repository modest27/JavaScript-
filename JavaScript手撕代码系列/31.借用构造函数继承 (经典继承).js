// 组合继承存在什么问题呢? 
// 组合继承最大的问题就是无论在什么情况下，都会调用两次父类构造函数。
// 一次在创建子类原型的时候；
// 另一次在子类构造函数内部(也就是每次创建子类实例的时候)；
// 另外，如果你仔细按照我的流程走了上面的每一个步骤，你会发现：所有的子类实例事实上会拥有两份父类的属性
// 一份在当前的实例自己里面(也就是person本身的)，另一份在子类对应的原型对象中(也就是person.__proto__里面)；
// 当然，这两份属性我们无需担心访问出现问题，因为默认一定是访问实例本身这一部分的；


// 1.定义父类构造函数
function Person(name, friend) {
  this.name = name
  this.friend = friend
}
// 2.父类原型上添加方法
Person.prototype.running = function() {
  console.log(this.name + 'running');
}

// 3.借用构造函数组合继承
function Student(name, friend, age) {
  Person.call(this,name,friend)
  this.age = age
}

let p = new Person()
Student.prototype = p