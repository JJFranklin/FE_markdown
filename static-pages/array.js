/**
数组在遍历(map,forEach,for)等方法中，对数组元素进行删除和添加，都会影响原数据索引顺序;
优化方式
1、使用filter 的方式进行遍历，返回符合条件的新数组
2、遍历的时候，改变下索引值，并使用for循环；
3、数组中的元素是对象时，对数组中的元素进行改变，会影响原来数据，值类型的数据不会影响；
*/


let s  = [{a:1},{a:2},{a:3}];

// s.map((item,index)=>{
//     // let _item = {...item};
//     if(item.a == 2){
//         // _item.a = 5;
//         s.splice(index,1);
//         // console.log(s);
//     }
//     // return item;
// });

// s.forEach((ele,index) => {
//     if(ele.a>1){
//         s.splice(index,1);
//         index--;
//         // console.log(s);
//     }
// });

for (let index = 0; index < s.length; index++) {
    const element = s[index];
    if(element.a>1){
        s.splice(index,1);
        index--;
        // console.log(s);
    }
}

