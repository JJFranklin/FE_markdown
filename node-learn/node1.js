// const a = [1,3,4];
// console.log(module.path);
// module.exports = {
//     a
// }


// const http = require('http');
// const sever = http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-type':"text/html;charset:'utf-8'"});
//     res.write('<head><meta charset="utf-8" /></head>')
//     res.end('我是一个摆个');
// });

// sever.listen(9091,'127.0.0.1');

// const fs = require('fs');
// const path = require('path');
// fs.readFile(path.join(__dirname,'xiaoshuo1.text'),'utf8',(err,data)=>{
//     console.log('res',data,err)
// });

let funcStr = `function getName(){
    console.log(123);
    return 1
}`;
let func = new Function(funcStr);
func();