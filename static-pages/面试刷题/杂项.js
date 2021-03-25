// 在非匿名自执行函数中，函数变量为只读状态无法修改；
var b = 10;
(function b(){
    b = 20;
    console.log(b);  // 函数 b  
})();
