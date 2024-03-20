/**
 * 1、函数参数设置默认值，只有转入参数是 undefined 的时候，才会使用默认值，
 *    其他的假值情况，如，false,0,'',null,使用的是传入的值；
 * 2、使用 Object.assign({key:defaultValue},Obj) 设置默认值
 * 3、不用添加区全局的函数，在类里面添加属性，属性值是函数
 * 4、使用函数式编程，不使用命令式编程，面向过程编程
 * 5、使用链式调用，像jQuery一样，返回生成的对象，即this
 * 6、单一职责原则、开闭原则、里氏替换原则、接口分离原理
 * 
*/

// 1
function getUserSex(sex = 'male'){
  return sex;
}
const sex = getUserSex(undefined);
console.log('sex',sex);

function getUserName(name){
  return name || 'franklin';
}

const userName = getUserName('');
console.log('userName',userName);

// 2
let userInfo = Object.assign({
  name:'baike' // 默认值
},{
  name:'franklin',
  age:12,
  sex:'male'
});
// 不这样使用默认值
userInfo = {
  name:'franklin' || 'baike',
  age:12,
  sex:'male'
}

// 5
class Animal{
  constructor(){}
  eat(){
    console.log("吃烧烤!");
    return this;
  }
  speak(){
    console.log("说中文!");
    return this;
  }
}

const cat = new Animal();

cat.eat().speak();
