#### webpack 基本梳理

https://juejin.cn/post/6844903726981840904

https://notes.jindll.com/webpack/20%20Webpack%20%E4%BC%98%E5%8C%96%E4%B9%8B%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96.html#%E5%88%A9%E7%94%A8%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%8F%90%E5%8D%87%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6

webpack 基本配置

> webpack-merge 合并公共部分和开发和生产环境的配置，避免重复性的公共代码

webpack 构建和打包

webpack 高级配置

> 多入口配置
>
> entry 需要设置多个js 文件，设置多个入口文件
>
> output 需要配置对应打包输出文件
>
> HtmlWebpackPlugin 为每一个多入口文件生成对应的html页面，同时配置chunks,让每个页面引用对应的js文件
>
> splitChunks：根据实际的需求进行打包，分块打包，提取公共的部分，避免重复打包



webpack 中loader 和plugin、chunk

chunk 
组成最终打包完成的部分、几种情况下会产生chunk
1、多入口
2、根据需要分块 splitChunk 
3、路由懒加载组的时候，会产生不同的chunk

module 就是需要加载解析的代码

loader

> 主要将依赖的非js 的模块，转化为能够识别的js模块。  
> 转化的时机：加载依赖模块的时候  
> 比如，less-loader 将less 语言转化为css  
> css-loader:将css 转化能够识别的js模块  
> style-loader : 将转化的css模块生成style 标签插入到dom 结构中  
> vue-loader:解析但vue文件，将vue 文件中的template、script、style 分别提取出来交给对应的loader进行处理；  
> vue-template-complier-loader:将vue-loader解析出来的template 部分转化为render函数，最终输出Vnode  


plugin

> webpack 的插件，扩展丰富webpack 的功能
>
> 作用于webpack的整个流程

webpack 构建优化—构建速度

> Dllplugin: 将同一个第三方库直接打包好，不用每次构建都需要打包
>
> 1、先使用Dllplugin，预打包；
>
> 2、需要使用第三方依赖库的时候，使用DllReferPlugin在manifest.json 查找是否有第三方库，如果有，直接引用打包的文件
>
> 优化bable-loader ：
>
> happyPack：开启多进程打包，将主任务分解，然后给多个子进程，进行处理，处理完成后，在返回给主进程。
> 在运行多任务处理的时候，可以开启，可以提高效率。小的文件处理时，不需要开启，开启多个子进程，也需要时间和空间开销。
>
> IgnorePlugin：利用正则表达式，对插件中某些部分，不进行打包
>
> noPrase：设置不需要解析的文件/模块，比如第三方库等
>
> ParallUglifyPlugin：多个子进程压缩js，一般在生产环境；
>
> 热更新：状态不会丢失，网页不刷新；
>
> 自动刷新：状态会丢失，整个网页全部刷新，速度较慢

splitChunks：代码分割，避免重复打包，减少打包的后的体积

https://segmentfault.com/a/1190000021074403

> 作用:
>
> 单独分割出公共部分依赖；
>
> 提高代码打包的速度；
>
> 使用场景：
>
> 1、将代码按照需要分割，按照每个页面需要得依赖进行加载，一般和有多个入口文件配合使用；
>
> 2、打包的时候，避免重复打包依赖；

多入口文件打包配置

> entry：需要多个入口js文件
>
> 需要配置多个 min-css-extract-plugin 
>
> 需要配置 多个 htmlWebpackPlugin 

webpack 开发环境需要放的配置

> 热更新
>
> 代理配置
>
> sourceMap:方便调试
>
> eslint 等规范工具

webpack  生产环境需要放的配置

> 压缩css、js 代码
>
> 去除注释和console
>
> 提取公共代码

webpack 编译打包原理及过程

> 1、收集命令行和webpack配置作为complier的基本参数；
>
> 2、拿到基本参数后，确定entry的入口
>
> 3、确定入口，根据入口的js 代码，加载入口代码所依赖的模块，并使用对应的loader解析加载的模块，在解析加载过程中，如果发现依赖模块，还有对应的依赖，递归加载调用对应loader解析，直到所有模块加载解析完毕；
>
> 4、模块加载解析完毕后，产生依赖图谱。
>
> 5、根据依赖图谱，将module 转化成chunk。
>
> 6、将不同的chunk 进行组合，生成最终的文件写入到指定的目录中，比如，打包的dist目录下
>
> 在整个过程中，webpack 会在特定的时候，触发事件，让插件知道，执行插件所要执行的逻辑
>
> 例子1：在loader的`翻译`过程中，如果使用的happpypack，就会触发happypack 的逻辑，将`翻译`的任务分解成多个小任务给多个子进程并行处理，提高`翻译`效率；
>
> 例子2：在组成chunk的过程中，使用miniExtractCss 和 ParalleUglifyPlugin分别对css 和js文件进行提取的压缩；

补充:
安装babel的核心模块
babel-core
babel-env
babel-loader

------

webpack 感想

产生chunk 的情况

1、entry 中每一个入口产生单独的chunk；

2、异步加载的文件，产生单独的chunk;

3、使用splitChunk 对产生的chunk 进一步加工；

打包构建过程

1、预备环境：初始化参数，初始化插件，比如entryOptionPlugin，处理entry 配置；

2、make 构建过程：主要使用各种loader 和插件对模块进行处理，生成依赖关系图谱；

3、seal 生成阶段：根据2中的依赖图谱，将module 转化成chunks集合。

4、write 写入：将生成的chunks 组织写入到某个文件中输出。