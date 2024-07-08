const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
//1、 第一个步骤在入口处确定哪一些是不怎么改变的文件
module.exports = {
  entry: {
    vendor: [
      "vue/dist/vue.esm.js",
      "vue-router",
      "vuex",
      "babel-polyfill", //提前打包一些基本不怎么修改的文件
    ],
  },
  //2、 在输出端配置输出文件的目录和名称
  output: {
    path: path.join(__dirname, "../static/js"), //放在项目的static/js目录下面
    filename: "[name].dll.js", //打包文件的名字
    library: "[name]_library", //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    //3、 生成上文说到清单文件 mainfest.json，放在当前build文件下面，这个看你自己想放哪里了。
    new webpack.DllPlugin({
      path: path.join(__dirname, ".", "[name]-manifest.json"),
      name: "[name]_library",
    }),
    //4、 核心是再次运行时，会找到上次打包的时候生成的 manifest.json 的目录，通过目录加载对应的缓存的文件
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, ".."),
      manifest: require("./vendor-manifest.json"),
    }),
    //这个主要是将生成的 vendor.dll.js文件加上hash值插入到页面中。
    //5、还有一步骤在 html 的主页面，引入 打包好的 dll 文件
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, "../dist/static/js/vendor.dll.js"),
        outputPath: utils.assetsPath("js"),
        publicPath: path.posix.join(config.build.assetsPublicPath, "static/js"),
        includeSourcemap: false,
        hash: true,
      },
    ]),
  ],
};
