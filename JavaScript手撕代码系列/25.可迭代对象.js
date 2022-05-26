const info = {
  friends: ['lilei', 'james', 'xiaofang'],
  [Symbol.iterator]: function () {
    let index = 0
    return {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },

      return() {
        console.log('迭代器提前中断了')
        return { done: true }
      }
    }
  }
}
