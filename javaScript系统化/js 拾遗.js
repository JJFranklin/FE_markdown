/**
 * 1、函数参数设置默认值，只有转入参数是 undefined 的时候，才会使用默认值，
 * 其他的假值情况，如，false,0,'',null,使用的是传入的值；
 * 2、使用 Object.assign({key:defaultValue},Obj); 设置默认值
 * 
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
