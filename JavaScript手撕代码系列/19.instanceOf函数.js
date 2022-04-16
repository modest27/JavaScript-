const wh_instanceOf = (parent, children) => {
  let fp = parent.prototype
  let cp = children.__proto__
  while (cp) {
    if (fp === cp) {
      return true
    }
    cp = cp.__proto__
  }
  return false
}