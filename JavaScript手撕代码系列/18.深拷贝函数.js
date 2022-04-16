function isObject(val) {
  return typeof val === 'object' && val !== null
}

function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target)
  
  Reflect.ownKeys(obj).forEach(item => {
    if (isObject(obj[item])) {
      target[item] = deepClone(obj[item],hash)
    } else {
      target[item] = obj[item]
    }
  })

  return target
}

// 再重复写一次深拷贝
function isObject2(obj) {
  return typeof obj === 'object' && obj !==null
}

function deepClone2(obj, hash = new WeakMap()) {
  if (!isObject2(obj)) return obj
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let target = Array.isArray(obj) ? [] : {}
  hash.set(obj, target)
  Reflect.ownKeys(obj).forEach(item => {
    if (isObject2(obj[item])) {
      target[item] = deepClone2(obj[item],hash)
    } else {
      target[item] = obj[item]
    }
  })
  return target
}