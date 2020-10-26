// vue 2.0 如何实现响应式原理
// 数据变化了  可以更新视图
function observer(target){
  // 先判断传递过来的数据是否为object; 如果传递过来的不是对象或者 是null 那么就把这个传递过来的数据 return出去
  if(typeof target !== 'object' && target === null){
    return target;
  };
  // 如果是对象, 用 defineReactive() 这个方法重新定义数据的属性
  for(let key in target) {
    defineReactive(target,key,target[key]);
  };
};
// 开始重写数据的属性，比如 get 获取属性值,以及set 设置属性值
function defineReactive (target,key,value) {
  // 如果是多层数据  比如 let data ={name: 'bryant', age: {n: 27}}; 这种数据类型 在data中的age属性还是一个对象,即为多层嵌套 所以我们要对这个value再次进行观察、
  observer(value); // 是个递归  这也是vue2的一个缺陷，如果数据层级过多，则会出现大量的递归，造成内存性能损耗。
  Object.defineProperty(target,key,{  // vue2.0  主要就是靠 Object.defineProperty 来进行重写数据
    get() {
      return value
    },
    set(newValue) {
      if(newValue !== value){
        updateView();
        value = newValue;
      }
    }
  })
};

function updateView() {
  console.log('更新视图')
};
// 使用 Object.defineProperty 就是可以重新定义属性 给属性增加 getter 和 setter
let data = {name: 'bryant',age:{n: 27}};
observer(data); // 观察属性
data.name = 'wzy';
data.age.n = 28;
