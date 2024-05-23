let moduleObj = require('./commonJS.js');
console.log(moduleObj.a);
moduleObj.a = moduleObj.a + 1;
console.log('moduleObj', moduleObj);