// 方法1
function jsonToTree(list,rootValue){
  let arr = []
  list.forEach(item => {
    if(item.pid === rootValue){
      // 找到之后 就要去找item下面有没有子节点
      const children = jsonToTree(list,item.id)
      if(children.length){
        // 如果children的长度大于0 就说明找到了子节点
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}

// 方法2
// function jsonToTree(data) {
//   // 初始化结果数组，并判断输入数据的格式
//   let result = []
//   if(!Array.isArray(data)) {
//     return result
//   }
//   // 使用map，将当前对象的id与当前对象对应存储起来
//   let map = {};
//   data.forEach(item => {
//     map[item.id] = item;
//   });
//   // 
//   data.forEach(item => {
//     let parent = map[item.pid];
//     if(parent) {
//       (parent.children || (parent.children = [])).push(item);
//     } else {
//       result.push(item);
//     }
//   });
//   return result;
// }

let source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}]

console.log(jsonToTree(source,0));