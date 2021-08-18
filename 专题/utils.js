/**
 * 常用的工具函数
*/

// 合法ip地址
const isValidateIp = function(str){
  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return ipReg.test(str);
}

let ip = '192.168.1011.1';
// console.log(isValidateIp(ip));
