##### Vite 打包快的原因分析

1、基于 ESM 模块化的标准得到大部分浏览器支持

2、底层打包使用了 edbuild 的转化和打包工具，效率大大提升

3、由于浏览器支持了 esm 模块化标准，浏览器加载到对应模块，才向vite 启动的服务发送指令，让 vite 使用esbuild 转化加载对应的模块代码分解整理 成 esm 模块发送给浏览器。做到真正的按需加载，不会因为项目模块增多而成倍增加打包运行时间，对比 webpack。



vite[开发环境](https://zhida.zhihu.com/search?q=开发环境&zhida_source=entity&is_preview=1)依赖esbuild进行预构建，生产环境则依赖rollup进行打包，并且充分利用了[现代浏览器](https://zhida.zhihu.com/search?q=现代浏览器&zhida_source=entity&is_preview=1)的特性，比如http2、ES module，vite是站在众多[巨人肩膀](https://zhida.zhihu.com/search?q=巨人肩膀&zhida_source=entity&is_preview=1)上的一个产物， 类似webpack + webpack-dev-server的结合体，是一个非常棒的前端项目的构建工具。



##### 技术点

esbuild、

http2

```la
在http1中，对同一个域名请求有限制，在发送请求时，会限制请求的数量，
在http2中，打破了这个限制，可以并发发送很多请求，因此可以，将模块切分成很多很小的部分，这样就提高了发送的速度，加载解析模块速率
```



rollUp、

重写热更新、

[前端 - Vite 热更新(HMR)原理了解一下 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000044831179)

[前端 - 深入探索Vite的热更新（HMR）实现 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000045057656)

```la
1、区别于webpack的热更新，每次文件改动，都会重新编译打包修改的文件，vite 只重新请求修改的部分，不需要重新编译打包
2、并且对第三方的模块进行了缓存处理，在下次加载的时候，速度更快。
3、会以更新的模块为中心，不断的递归寻找和此模块有关连的模块，形成一个更新模块边界，如果所有模块都在此边界内，就执行此模块的更新，有模块不在此边界内，就会重新加载完整的页面。
4、流程：用户操作模块更新 => 服务器中的文件监视器捕捉到更新的模块 => 将捕捉到的更新模块传递给 handleHotUpdate 函数 => 执行更新
```

<img src="C:\Users\hemmc\AppData\Roaming\Typora\typora-user-images\image-20240912160101459.png" alt="image-20240912160101459" style="zoom:67%;" />

预构建技术：

```latex
1、用 esbuild 将非esm的模块转化成 esm 模块；
2、不需要对我们整个项目进行编译打包，而是在浏览器需要加载某个模块时，拦截浏览器发出的请求，根据请求进行按需编译，然后返回给浏览器
```





##### 其他影响因素

1、生产环境使用 rollUp 进行打包，使用 Tree-shaking 技术，去掉不用的代码，只打包使用的代码，减少转化打包体积。

2、hrm 模式下，更快，基本上不需要重新打包，对比 webpack 

3、支持 **预构建** 将 非 esm 的代码处理成 esm 模块，将多个esm 模块合并成一个模块，减少请求数量和模块数量

4、esbuild 底层 使用 go 语言编写，go 编译时，将编程语言解析成机器语言，提高运行效率；

5、缓存，将处理后的代码进行缓存。提高加载速度 

 

##### esbuild 快的原因

1、js 是单线程串行，esbuild 是单独开一个进程，并且多线程并行，提高操作效率和多核优势。

2、go 编译时，将编程语言解析成机器语言

3、在编译阶段，共用类似的 ast 结构，减少 string 到 ast 的转换，提高效率



##### RollUp

[javascript - JS打包工具rollup——完全入门指南 - KainStar的专栏 - SegmentFault 思否](https://segmentfault.com/a/1190000010628352#item-10)

1、执行 es6 模块标准

2、使用 tree-shaking 的技术，减少打包没有必要的代码，减少打包体积 

3、可以使用 rollup-plugin-node-resolve 和 rollup-plugin-commonjs 插件，将第三方 npm 模块和 commonJs 标准的代码转化为 es6 模块标准的代码

4、也可以使用压缩插件，压缩需要的代码，减少打包体积



##### 问题

1、vite 为什么在开发环境使用 Esbuild，在生产环境使用 RollUp

```latex
1、Esbuild 不提供操作打包产物的接口，像 Rollup 中灵活处理打包产物的能力(如renderChunk钩子)在 Esbuild 当中完全没有。
2、Esbuild 不支持自定义 Code Splitting 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。
3、Esbuild 没有拆包功能
```



##### 其他的技术点

babel:  将高阶的 es6 的语法编译为浏览器能够接受的 es5 的语法。



```javascript
<script type="module">
  import exampleModule from 'exampleModule';
</script>
1、script 标签设置type 为module的属性，其中代码可以直接使用import 语法，导入代码，并且可以直接在支持 esm 标准的浏览器中运行；
2、在运行代码时，如果标签中有 src 属性，直接会开启一个http的请求，异步加载js代码；
3、其中的代码，遇到 import 时，会发起 http 请求，去加载对应的模块，不需要编译成es5 语法。
```



