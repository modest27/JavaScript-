const info = {
  friends: ['lilei', 'james', 'xiaofang'],
  *[Symbol.iterator]() {
    yield* this.friends
  }
}
