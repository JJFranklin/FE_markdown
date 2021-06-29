let ss = `19/377/38/14265/210/921/593/210
473
959
364
330/73/3199
1592
12998/27818/13418/25324/34650/37560
451/32/6368
13/35/39866/10533/973
24/5449/3346/3863/8288
50191.4
97.94/0/13861.6/6886.73/6237.52
5244.73
5326.55/1783.17
2664.98/470.64/180.6/6682.39/2150.50/1944.73/408.83/2664.98/410.28/181.05
10776.55
2546.83
`;

let sArr = ss.split(/[\s\n]/);
// console.log(sArr);

let strArr = [];
sArr.map(item=>{
    let numberArr = item.replace(/[^\d.]/g, ",");
    strArr.push(numberArr);
});

let secdArr = [];
strArr.map(item=>{
    let itemarr = item.split(",");
    secdArr.push(itemarr)
});
// console.log("secdArr",secdArr)
let result = 0;
let invalidNums = [];
secdArr.map(item=>{
    if(item.length>0){
        item.map(val=>{
            if(!isNaN(val)){
                result = result + Number(val);
                console.log(val,Number(val));
            } else {
                invalidNums.push(val);
            }
        });
    }
});

console.log("result",result.toFixed(2),invalidNums)



