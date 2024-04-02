function getsum() {
  let lines = ["5", "3 1 5 7 9", "8"];
  let personNum = Number(lines[0]);
  let weightArr = lines[1].split(" ").map((item) => Number(item));
  let minWeight = Number(lines[2]);
  weightArr = weightArr.sort((a, b) => a - b);
  let count = 0;

  // 单个人满足的情况
  let hasJoin = [];
  for (let i = 0, len = weightArr.length; i < len; i++) {
    let ele = weightArr[i];
    if (ele >= minWeight && count < personNum) {
      count = count + 1;
      hasJoin.push(i);
    }
    if (count >= personNum) {
      count = personNum;
    }
  }

  // 两个人满足的情况
  if (count < personNum) {
    weightArr = weightArr.filter((item, index) => !hasJoin.includes(index));
    function getcount(arr){
        let newArr = [...arr];
        newArr.forEach((item,index)=>{
            let rest = minWeight - item;
            let newWeightArr = newArr.filter((w) => {
                if(w >= rest){
                    arr = arr.filter(a=>a!=w);
                    return w;
                }
            });
            arr = arr.filter(a=>a!=item);
            if (count + newWeightArr.length < personNum) {
              count = count + newWeightArr.length;
              getcount(arr);
            }
        });
    }
    getcount(weightArr);
  }
  if(count>personNum){
    console.log(personNum);
  } else {
    console.log(count);
  }
}

// getsum();

let arr = [3,1,5,7,9];
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    console.log(arr,element,index);
    if(element === 3 || element === 9){
        arr.splice(index,1);
    }
}
arr.map((item,index)=>{
    console.log('map',arr,item,index);
    if(item === 3 || item === 9){
        arr.splice(index,1);
    }
});
console.log(arr);
