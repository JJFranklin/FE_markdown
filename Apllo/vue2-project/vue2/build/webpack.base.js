const path = require('path');
const VueLoader = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const CpoyWebpackPlugin = require("copy-webpack-plugin");
// 压缩js文件

// webpack-dev-server 开发者模式下 hot=true 开启hrm;
// MinCssExtractPlugin 组件不支持热更新，不能在hrm 模式下使用;
// hrm模式下，使用style-loader 进行样式热更新,在开发模式使用;
// 非hrm模式下，可以使用MinCssExtractPlugin 压缩打包css,在生产模式使用;
// style-loader 和MinCssExtractPlugin 不在一起使用

// 上面说的有些问题
// 热更新在开发模式下使用，
// 生产环境不用热更新，只需要打包一次就行了

// 环境变量
let ENV_MODE = process.env.NODE_ENV;
let isProductMode = ENV_MODE == 'production';


const baseWebpack = {
    entry: {
        "index":path.resolve(__dirname, '../src/index.js'),
        "echartIndex":path.resolve(__dirname, '../src/echartIndex.js')
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        // 去掉元素间的空格
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        // presets: ['@babel/preset-env'],
                        // include:path.resolve(__dirname,'src')
                    }
                }
            },
            {
                test:/\.(sass|scss|less|css)$/,
                use: [
                    isProductMode ? MinCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'fast-sass-loader'
                    },
                    {
                        // 全局获取scss的变量
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: isProductMode,
                            resources: path.resolve(__dirname, '../resource/scss/variable.scss')
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
             }
        ]
    },
    plugins: [
        new VueLoader(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject:true,
            minify: {
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../echartIndex.html'),
            filename: 'echartIndex.html',
            chunks:["echartIndex"],
            inject:true,
            minify: {
                collapseWhitespace: true
            },
        }),
        new CpoyWebpackPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname, '../static'),
                    to:path.resolve(__dirname, '../dist/static')
                }
            ]
        }),
    ],
    optimization:{
        splitChunks:{
            minSize: 10000,
            chunks: 'all',
            cacheGroups:{
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: -10, // 权限更高，优先抽离，重要！！！
                    test: /[\\/]node_modules[\\/]/, // 一般第三方模块都是从node_modules引进来如lodash
                    minSize: 20000,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },                     
            }
        },
    },
    
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            '@resource': path.resolve(__dirname, '../resource'),
            '@components': path.resolve(__dirname, '../src/components'),
        }
    },
}
module.exports = baseWebpack;