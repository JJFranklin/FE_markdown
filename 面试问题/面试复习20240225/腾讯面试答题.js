// 1、全排列算法（无重复数字全排列/有重复数字全排列）
// https://leetcode.cn/problems/permutations/solutions/2668319/leetcode-46-quan-pai-lie-1-hui-su-by-110-972f/

Function.prototype.before = function (callback) {
  return () => {
    callback.apply(this, arguments);
    return this.apply(this, arguments);
  };
};
Function.prototype.after = function (callback) {
  return () => {
    var retFuc = this.apply(this, arguments);
    callback.apply(this, arguments);
    return retFuc;
  };
};
func=function (){
console.log(2); 
};
before(function (){ console.log(1))
    .after(function (){ console.log(3); });
    func();
