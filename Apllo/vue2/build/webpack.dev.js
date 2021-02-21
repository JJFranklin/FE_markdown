const merge = require("webpack-merge");
const baseCommon = require("./webpack.base");
 
module.exports = merge(baseCommon,{
    mode: "development",
    devtool:'source-map', // 2. 这个配置必须
    devServer: {
        contentBase: '../dist',
        compress: true,
        port: 6688,
        host: 'localhost',
        quiet: false,
        hot: true,
    },
})