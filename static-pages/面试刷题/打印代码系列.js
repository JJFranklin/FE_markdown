
function Foo() {
    Foo.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
Foo.prototype.a = function () {
    console.log(3)
}
Foo.a = function () {
    console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

// 主任务中，所有的主任务执行完了，才执行异步任务
function wait(n) {
    return new Promise(resolve =>
      setTimeout(resolve, 10 * 100)
    )
  }
  
  async function main() {
    console.time();
    const x = wait(1);
    const y = wait(2);
    const z = wait(3); // 没有await 相当于同步运行了3个wait,生成了3个定时器，已经执行完成，
    await x;
    await y;
    await z; // 顺序输出之执行完成的结果，三个await的任务几乎同时执行，所以每个await的间隔时间很短，最长的时间是定时器最长的等待时间加上间隔时间；
    console.timeEnd(); // 时间大约10*1000 小于20*1000
  }
  main();
  
