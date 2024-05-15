import { user } from "./user-class";
import { Person } from "./person-class";

// const pesrons:user[] = [
//     {
//         name: 'franklin',
//         age: 18,
//         address: '湖北生武汉市'
//     },
//     {
//         name: 'beike',
//         age: 19,
//         address: 'wuhan'
//     }
// ];
// pesrons.forEach((item:user,index:number)=>{
//     console.log(`name:${item.name} - age:${item.age} - address:${item.address}`);
// });

const persons: Person[] = [
  {
    adminname: "1",
    adminage: 0,
    adminaddress: "2",
    username: "3",
    userage: 0,
    useraddress: "4",
  },
  {
    adminname: "2",
    adminage: 0,
    adminaddress: "3",
    username: "4",
    userage: 4,
    useraddress: "5",
  },
] as const;

persons.forEach((item, index: number) => {
  let str: string = "";
  // 遍历联合类型的时候，每一项满足其中一项即可，就可能出现，
  // 某一项属性在其中一个存在，在另一个类型里面不存在，所以需要提前进行判断，避免报错
  if ("adminname" in item) {
    str += `adminname-${item.adminname}-`;
  }
  if ("adminage" in item) {
    str += `adminage-${item.adminage}-`;
  }
  if ("adminaddress" in item) {
    str += `adminaddress-${item.adminaddress}-`;
  }
  if ("username" in item) {
    str += `username-${item.username}-`;
  }
  if ("userage" in item) {
    str += `userage-${item.userage}-`;
  }
  if ("useraddress" in item) {
    str += `useraddress-${item.useraddress}`;
  }
  console.log("str", str);
});
