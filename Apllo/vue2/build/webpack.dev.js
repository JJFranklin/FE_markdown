const {merge} = require("webpack-merge");
const baseCommon = require("./webpack.base");
const webpack = require("webpack");
 
module.exports = merge(baseCommon,{
    mode: "development",
    devtool:'eval-source-map', // 2. 这个配置必须
    devServer: {
        contentBase: '../dist',
        compress: true,
        port: 6688,
        host: 'localhost',
        quiet: false,
        hot: true, // 开启了模块热更新
        // proxy:{
        //     "/api":{
        //         target:"http://localhost:6688/",
        //         pathRewrite:{
        //             "^/api":"/static/mock"
        //         }
        //     }
        // }
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
})