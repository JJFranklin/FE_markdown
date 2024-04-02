function getLastWordLen(str) {
  if (!str) {
    return 0;
  }
  str.tolo;
  let strArr = str.split(" ");
  let len = strArr.length;
  let lastWord = strArr[len - 1];
  return lastWord.length;
}

function splitStr(num) {
  let arr1 = [];
  // for (let i = 1; i <= num; i++) {
  //     if(i>0){
  //         if(num % i === 0){
  //             arr1.push(i);
  //         }
  //     }
  // }
  // let arr2 = [];
  // for(let j = 0,len = arr1.len;j< len; j++){
  //     let ele = arr1[j];
  //     let count = 0;
  //     for(let i=1; i<=ele; i++){
  //         if(ele % i === 0 && ele >1){
  //             count = count + 1;
  //             if(count === 2 && i === ele){
  //                 arr2.push(ele);
  //             }
  //         }
  //     }
  // }
  //   console.log(arr2.join(" "));
}

// splitStr(180);
// let arr1 = [];
// // 辗转相除法获取因素
// // 开平方的方式，减少计算范围，
// let sqrt = Math.floor(Math.sqrt(num));
// for (let i = 2; i <= sqrt; i++) {
//   while (num % i === 0) {
//     arr1.push(i);
//     num = Math.floor(num / i);
//   }
//   if (num < i) break;
// }
// // 输入的参数是质素，就直接保存
// num > sqrt && arr1.push(num);

function actionStr(str) {
  let numStr = str;
  // 转化成2进制
  let number = parseInt(numStr).toString(2);
  let numStrArr = number.split("").filter((num) => num == 1);
  console.log(numStrArr.length);
}

function getInput() {
  const posStr = "A10;S20;W10;D30;X;A1A;B10A11;;A10;";
  function getPos(dir, pos = [0, 0]) {
    let [flag, delt] = dir;
    let [x, y] = pos;
    if (flag == "A") {
      return [x - delt, y];
    } else if (flag == "D") {
      return [x + delt, y];
    } else if (flag == "W") {
      return [x, y + delt];
    } else {
      return [x, y - delt];
    }
  }

  let flagArr = ["A", "W", "D", "S"];

  let posStrArr = posStr.split(";");
  let posStrArrFilter = [];
  posStrArr.map((item) => {
    if (item) {
      let flag = item.substring(0, 1);
      let delt = item.substring(1);
      if (Number(delt) && flagArr.includes(flag)) {
        posStrArrFilter.push([flag, Number(delt)]);
      }
    }
  });
  let i = 0;
  let originPos = [0, 0];

  while (i < posStrArrFilter.length) {
    originPos = getPos(posStrArrFilter[i], originPos);
    i = i + 1;
  }
  console.log(originPos.join(","));
}

function vilidatePwd(str){
    if(!str){
        console.log('NG');
        return;
    }
    if(str.length<8){
        console.log('NG');
        return;
    }
    let hasNumber = 0,hasUpperLetter = 0,hasLowerLetter = 0,hasOtherChar = 0,noCopyStr = 0;
    if(new RegExp('[a-z]').test(str)){
        hasLowerLetter = 1;
    }
    if(new RegExp('[A-Z]').test(str)){
        hasUpperLetter = 1;
    }
    if(new RegExp('[0-9]').test(str)){
        hasNumber = 1;
    }

    for(let i=0,len =str.length;i<len; i++){
        let item = str[i];
        if((!(new RegExp('[0-9a-zA-Z]').test(item))) && item!=' ' && item != '\n' && hasOtherChar === 0){
            hasOtherChar = 1;
        }
        let subStr = str.substring(i, i+3);
        let longerSubstr = str.substring(i+1);
        if(longerSubstr.includes(subStr)){
            noCopyStr = 1;
            break;
        } 
    }

    if((hasNumber + hasUpperLetter + hasLowerLetter + hasOtherChar >= 3) && noCopyStr === 0){
        console.log('OK');
    } else {
        console.log('NG');
    }
}

// vilidatePwd('80!2b^*t411699+^&4y@');

function dealData(){
    let lineArr = ['2 123 123','2 1 0' ];
    let iArr = lineArr[0].split(' ');
    iArr = iArr.slice(1)
    let rArr = lineArr[1].split(' ');
    rArr = rArr.slice(1);
    rArr = rArr.sort((a,b)=> Number(a)- Number(b));
    rArr = [...new Set(rArr)];

    let iArrStr = iArr.join('');
    rArr = rArr.filter(item=>{
        if(iArrStr.includes(item)){
            return item;
        }
    });
    let count = rArr.length;
    let initStr = rArr.join(' ');
    rArr.map((rItem)=>{
        iArr.map((iItem,idx)=>{
            iItem = iItem + '';
            if(iItem.includes(rItem)){
                initStr = `${initStr} ${idx} ${iItem}`;
                count = count + 2;
            }
        });
    });
    console.log(`${count} ${initStr}`);
}

dealData();
