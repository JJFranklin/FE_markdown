let http = require("http");
const querystring = require("querystring");

const server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    let resData = {"success":true};
    if ("/favicon.ico" !== req.url){
        new Promise((resolve,reject)=>{
            req.on("data",function(data){
                resData.data = querystring.parse(decodeURIComponent(data));
                resolve(resData);
            })
        }).then((result)=>{
            res.end(JSON.stringify(result));
        }).catch((err)=>{

        });
    }
    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.setHeader("X-Powered-By",' 3.2.1');
 
}).listen(8070, "127.0.0.1");