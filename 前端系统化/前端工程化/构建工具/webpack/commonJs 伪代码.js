/**
 *
 * @param {*} path 模块 id 在代码中是文件路径
 * require('./file.js');
 * @returns
 */
function require(path) {
  /*是否能够找到之前打包的模块，如果找的到直接返回缓存*/
  if (isExistModuleCache) {
    return; // 找得到返回缓存
  }

  function _run(exports, require, module, __fileName, __dirName) {
    // 模块代码在此运行
    // 所以在 node 的环境中，可以直接获取到 5个参数，同时避免了参数被污染，因为是在函数内部运行
  }

  var module = {
    exports: {},
  };

  // 此处使用call 将 this 指向指为 module.exports，等同于在 _run 函数中 exports 的形参
  // 所以 this、module.exports、exports 是指向同一个引用地址，初始值为 {}
  _run.call(
    module.exports,
    module.exports,
    require,
    module,
    modulePath, // 模块所在路径
    moduleDir // 模块所在目录
  );

  // 将module.exports 加入到缓存
  return module.exports;
}
