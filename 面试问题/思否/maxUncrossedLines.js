var maxUncrossedLines = function(nums1, nums2) {
    if(!Array.isArray(nums1) || !Array.isArray(nums2) ) return 0;
    let len1 = nums1.length;
    let len2 = nums2.length;
    let toalLen = len1 + len2;
    let count = 0;
    let lastIndex = -1; // 记录上一次找到的位置
    if(len1>= 1 && len1<=500 && len2>= 1 && len2<=500 && toalLen>= 1 && toalLen<=2000 ){
        nums1.map((num,index)=>{
            let findIndex = nums2.indexOf(num,lastIndex + 1);
            if(findIndex > lastIndex){
                count = count + 1;
                lastIndex = findIndex;
            }
        });
    }
    return count;
};
let num1 = [2,5,1,2,5];
let num2 = [10,5,2,1,5,2];
console.log(maxUncrossedLines(num1,num2));
https://leetcode-cn.com/problems/uncrossed-lines/
https://leetcode-cn.com/problems/uncrossed-lines/submissions/
