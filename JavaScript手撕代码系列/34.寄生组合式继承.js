// 利用寄生式继承将这两个问题给解决掉.
// 需要先明确一点: 当我们在子类型的构造函数中调用父类型.call(this, 参数)这个函数的时候, 
// 就会将父类型中的属性和方法复制一份到了子类型中. 所以父类型本身里面的内容, 我们不再需要.
// 这个时候, 我们还需要获取到一份父类型的原型对象中的属性和方法.


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

// 定义object函数
function object(obj) {
  function Func() {}
  Func.prototype = obj
  return new Func()
}

// 定义寄生式组合继承核心函数
function inheritPrototype(student, person) {
  student.prototype = object(person.prototype)
  student.prototype.constructor = student
}

inheritPrototype(Student, Person)