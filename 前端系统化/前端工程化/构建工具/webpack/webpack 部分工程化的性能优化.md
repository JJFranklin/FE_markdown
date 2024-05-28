工程化涉及的点

webpack 构建
1. webpack, chunk, treeshaking, happypack, cache-loader
2. Webpack Module Federation

资源
1. 图片、字体压缩
2. 清求以列
3. oss
4. cdn

应用
1. 数据结构优化
2. 应用模块更新
 
缓存
1. 强缓存
2. 协商缓存
3. 策略緩存

性能优化考虑的点

1、首屏速度，白屏时间
从服务器获取资源加载
首屏 js加载并且执行
首屏数据请求
Dom 渲染
2、操作速度以及渲染速度
3、缩小查找范围


1、打包工具的压缩，减少首屏资源体积，异步加载（不需要马上用到并且体积很大的库），去除大的base64体积;
2、tree-shaking
 Tree Shaking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的， 因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中），
 这让 Webpack 可以简单的分析出哪些 export 的被 import 过了, 在使用tree-shaking, 才能确认剔除哪些不需要的模块和代码，只使用需要的模块和代码

3、页面实在是优化手段做完了，可以使用分批随滚动渲染，原理类似于虚拟长列表

目前的 Tree Shaking 还有些的局限性，经实验发现：
1、不会对entry入口文件做 Tree Shaking。
2、不会对异步分割出去的代码做 Tree Shaking。



vue 优化
vue 3 本身通过静态提升，动态节点收集，和重新写的 diff 算法，优化已经很好，有几个优化的小点
1、keep-alive 缓存
2、不用大量重复操作dom
3、区分场景使用v-if 和v-show;
4、更加细粒度的调用接口
5、适当的合并接口调用


webpack 性能优化

webpack 5

1、减少处理文件
```javascript
resolve:{
    // 特定指定文件后缀，顺序按照从多到少的出现评率寻找
    extensions:['.js','.jsx'],
    // 配置别名可以提高webpack 中模块查找的速度
    alias:{
        'bootstrap': bootstrapCsspath, // 使用到 bootstrapcss 的时候，直接从bootstrapCsspath 路径中寻找，不用加载不必要的文件，比如会加载到 bootstrap.js 文件
    },
    modules:[],// 指定查找目录
    mainFields:[] // 指定 从package.json 文件中查找入口文件
},
// 
resolveLoader:{
    modules:[], // 指定自定义的loader寻找路径，让自定义的 loader 在loader 解析中使用
},
optimization:{
    minimize:true, // 开启优化
    minimizer:[
        new terserWebpackPlugin()
    ]
}
module:{
    // 使用正则匹配，匹配上了，配置哪些模块文件不需要进行解析，不需要解析依赖的第三方大型库，提高整体加载速度
    // lodash jquery 等独立模块，不需要依赖第三方
    // 模块中的文件不能使用 export,require、import等语法
    noParse:/test/,

    rules:[
        {
            // 只要匹配一个 loader 就不用匹配其他的loader 提高速度
            oneOf:[
                {
                    use:[
                        // style-loader，css-loader 等其他消耗资源大的转化loader,可以使用cache-loader 缓存资源，默认存储路径
                        // node_modules/.cache/cache-loader
                        {
                            // 单独提取css
                           miniCssExtractPlugin.loader,
                           'css-loader'
                        },
                        /**
                         * 
                         * thread-loader：多进程解析loader
                            1、把thread-loader放置在其他loader 之前，放置在这个loader 之后的loader 就会在一个单独的 worker 池（worker pool）中运行
                            2、include 表示哪些目录中的，js文件需要进行 babel-loader
                            3、exclude 表示哪些目录中的，js文件不要进行 babel-loader
                            4、exclude的优先级高于include，尽量避免exclude，更倾向于使用include
                         */
                        // 开启线程和通信都需要消耗一般不需要开启，看项目情况来定，大项目可能会需要
                        {loader:'thread-loader',options:{
                            workers:3
                        }},
                        {
                            loader:'babel-loader',
                            options:{
                                cacheDirectory:true,// 启用缓存 默认存放位置 node_modules/.cache/babel-loader
                            }
                        },
                        {
                            test:'\图片格式正则表达式\',
                            use:{
                                // 压缩图片
                                loader:'image-webpack-loader',
                            }

                        }
                    ]
                },// 各种loader 
                {},
            ]
        }
    ]
},
plugin:[
    // ignorePlugin 忽略特定的模块，让webpack 不打包进去，减少打包体积
    new webpack.ingnorePlugin({
        // 表示打包忽略moment中的语言包，然后单独引用所使用的语言包，减少打包体积
        resourceRegExp:'/local/'// 正则匹配忽略的模块和文件夹
        contextRegExp: '/moment/' // 上下文正则，目录正则
    }),
    // 打包压缩 css 文件
    new optimizationCssAssertWebpackPlugin(),

    // 1,匹配任意字段，包括路径分隔符，*匹配任意字符，不包含路径分隔符
    // 去掉css 中不用的 css 样式代码
    new PurgeCssWebpackPlugin({
        paths: global.sync("*${PATHS.src)/**/**", ({nodir: true})
    }),
    // 压缩 html 代码
    new HtmlWebpackPlugin(
        template: '•/src/index.html',
        minify:{//压缩HTML
            collapseWhitespace: true, 
            removeComments: true
        }),
        // 定义全局变量，可以在所有模块中读取到设置的变量
        // 定义在编译阶段的变量使用，在浏览器阶段就没有了
    new DefinePlugin({
        key:value,
    }),
    ]

// 利用缓存提升重复构建的速度
babel-loader:
将babel-loader 的转换之后的结果缓存起来，重新打包的时候，从缓存读取缓存数据，提高打包的效率和速度，降低消耗

hard-source-webpack-plugin 
原理是将第一次构建的资源缓存起来（在 node_modules/.cache/hard-source 目录下）
为模块提供中间缓存，在第二次构建后可以节约打包的时间

// 引入的第三方库不想被webpack打包，又不想影响其他的全局引用的包
externals:{}
```


编译体积优化

1、压缩js,css，html 和图片
• optimize-css-assets-webpack-plugin 是一个优化和压缩CSS资源的插件
• terser-webpack-plugin 是一个优化和压缩JS资源的插件
• image-webpack-loader 可以帮助我们对图片进行压缩和优化
• html-webpack-plugin: 压缩html 代码

清除无用的 css 
1、purgecss-webpack-plugin 
提取css
1、mini-css-extract-plugin 插件

问题
1、要了解 node_modules 模块引入规则


webpack 构建优化分为四个方面

1、提高构建速度

1.1、使用 happypack 插件，多个子进程并发处理任务，处理完成后，处理完成后将结果返回给主进程，提高处理速度；
1.2、使用 hard-source-webpack-plugin 插件，为模块提供中间缓存，将第一次构建的数据缓存到硬盘 node_modules/.cache/hard-source 目录下，再次构建的时候，直接从缓存获取文件，提高速度
1.3、thread-loader 写在 loader 处理的最前面，后面的 loader 会在一个单独的worker池中运行，开启多个核心处理文件；
后续 loader 的限制，因为放到线程池中很多东西都失效了
- 使用webpack api 生成的文件
- 无法使用自定义的 插件 api
- 无法访问 webpack 的options 选项

1.4、cache-loader 写在 loader 的前面，将 loader 处理过的文件缓存起来，下次构建直接使用，提高处理速度
1.5、开启 babel-loader 中 options 中的 cacheDirectory 选项，缓存 babel-loader 对js处理后的文件
  cache-loader 相对于 babel-loader 第二次的构建时间会短一些，因为，cache-loader 缓存的信息会更多，而且缓存内容是以 buffer 二进制的形式存储，效率更高
1.6、使用 webpack DllPlugin 和 DllReferencePlugin 提前打包缓存一些不怎么改变的文件，配置在 `webpack.dll.js` 中


2、减少处理文件或者缩小范围

2.1、在 loader 解析的时候，配置 include 选项，缩小处理文件的范围
2.2、使用 noparse 正则匹配一下不依赖其他库的第三方库，如果匹配到了，就不用转化和解析，减少解析转化过程；
会直接保存 经过loader 处理后的代码
2.3、在resolve 中配置 extensions 后缀，将使用频率高的文件后缀写在最前面，同时后缀列表尽量少一些， 提高命中率
2.4、使用 ingorePlugin 插件，通过正则配置，决定加不加载指定的模块中的指定文件，比如 引用 moment 包，不加载多语言文件，减少处理文件，需要使用中文时，单独引用；
2.5、tree-shaking 利用 es6 中静态引用的特点，可以确定哪些文件使用了那些文件没有使用，就可以只加载使用的代码和模块
2.6、在 resolve 配置 alias 缩小文件寻址范围，更加快速找到文件；

3、压缩体积

3.1、使用 terser-webpack-plugin 插件，压缩处理 js 文件；
3.2、使用 html-webpack-plugin，去除空格和注释，压缩处理 html 文件；
3.3、使用 image-webpack-plugin 压缩处理图片等文件；
3.4、使用 optimizeCssAssertWebpackPlugin 压缩处理 css 文件；
3.5、使用 mini-css-extract-plugin 单独提取 css 文件，然后使用 puregcsswebpckplugin 文件，去除无用的css代码；

4、其他

4.1、使用 webpack-bundle-analyzer 插件分析包的情况，并是使用 splitChunk 来根据实际需求，拆包的大小，引用次数等配置，拆分引用的包，避免重复引用
4.2、其他 没办法拆分或者实际很大的库，或者图片，使用cdn进行引用，避免打包进文件，增加包的大小；
4.3、通过 cdn 的方式引入了第三方库之后，在 externals 进行配置之后，可以通过 import 的方式使用，还不用打包进js中
4.4、webpack 中的作用域提升 scoped hosting 
4.4.1、在开发环境的时候，每一个模块或者函数被 webpack 放置在单独的 作用域中进行处理，避免模块作用域互相干扰，但是会导致重复代码的产生和运行效率的下降，应为要执行很多重复的代码；
4.4.2、scoped hosting 是 webpack 内置的优化，在生产环境开发会自动开启，提高代码运行效率，降低代码体积；
4.4.3、在模块被多次引用 或者 非 es module 的模式下 或者动态导图的情况下，不会开启。

webpack slitchunk 默认的分包策略

- 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹：被多次使用
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）：
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30

```javascript
// SplitChunks插件是什么呢，简单的来说就是Webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。
optimization: {
    splitChunks: {
      chunks: 'async', // all 不管同步异步全部进行分包处理，async 异步 inital 同步
      minSize: 20000, // 超过 20kb 进行分包
      minRemainingSize: 0,
      minChunks: 1,// 被引用次数大于1次进行分包
      maxAsyncRequests: 30, // 异步请求的最大数量小于或等于 30
      maxInitialRequests: 30, // 并发请求的最大数量小于或等于 30
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // 默认分包的配置
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
````


webpack 5 对于资源文件的处理

1、webpack 5 中对于资源文件不需要再使用 loader 来进行处理；
在原来loader的配置上，取消loader 的配置，保留正则匹配，加上type 表示对哪一类资源进行处理
2、同时在资源输出路径，要在output 中进行设置
示例如下：
```js
// 同时在资源输出路径，要在output 中进行设置
output:{
    path:// 路径
    assertModuleFileName:'assert/[hash:5][ext]', // 自定义资源文件保存目录
},
module:{
  rules:[
    // 在原来loader的配置上，取消loader 的配置，保留正则匹配，加上type 表示对哪一类资源进行处理
    {
        test:'/\.png/', // 正则匹配图片文件
        type:'assert/resource', // 作用类似于 file-loader
    }
    
    ]
}
```
webpack 模块解析流程

![模块解析](/Users/franklin/Documents/code/FE_markdown/前端系统化/md-images/模块解析.png)

HMR 的原理

要点
1、在webpack-dev-serve 和浏览器之间建立一个websocket连接，方便双方进行消息通信
2、记录更新内容和更新文件的 manifest.json 文件

具体原理步骤
1、第一次打包编译的文件，浏览器会根据各种chunk.js 进行页面渲染，缓存起来并记录各种chunk的 hash值或者 id；
2、在修改文件或者模块后，webpack 监听到哪些文件或者模块发生变化，会对对应的文件或者模块进行重新编译或者打包，生成hash 值或者id 值的 chunk 文件；
3、根据变化的 hash 值或者 id 值，生成 manifest.json 文件，记录更新的内容；
4、同时 webpack-dev-serve 依靠建立的 websockt 连接，向浏览器推送消息，告诉浏览器，我已经有新的内容更新；
5、浏览器会去请求服务端新生成的 manifest.json 文件和新生成的chunk文件，根据 manifest.json 内容来进行局部更新；

项目中的实战优化策略

1、采用 noparse 对 `vue|vue-router|vuex|vuex-router-sync` 进行处理
`vue|vue-router|vuex|vuex-router-sync` 在使用 `import vue from 'vue'` 的时候，会解析 vue 会不会依赖其他，没有的话，就可以使用 `noparse` 对这类库进行处理，不进行解析，节省处理文件数量，节省构建时间。

2、使用 splitChunks 中cacheGroups  配置对包进行进一步的拆分,比如 对 node_modules 完成的包中的文件进行进一步的拆分，减少包的体积；
对于项目中不经常改变的包独立打包和缓存，比如项目中经常使用的 megvii-ui、megvii-gis 或者 视频播放组件 megvii-player 

```javascript
webpackChain.optimization
    .splitChunks({
      cacheGroups: {
        ui: {
          name: 'common-ui', // 单独 chunk 名称
          test: /[\\/]megvii-ui[\\/]/,
          priority: -1,
          chunks: 'all'
        },
        gis: {
          name: 'common-gis',
          test: /[\\/]@megvii-gis|^ol|^ol-ext|@turf[\\/]/,
          priority: -2,
          chunks: 'all'
        },
        media: {
          name: 'common-media',
          test: /[\\/]@megvii-video-player[\\/]/,
          priority: -3,
          chunks: 'all'
        },
        vendors: {
          name: 'chunk-vendors', // 对于 node_module 中的文件匹配，单独打包
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        // 公共  chunk 提取
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'all'
        }
      }
    });
```









