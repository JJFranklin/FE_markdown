const path = require('path');
const VueLoader = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩js文件
const ParalleUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 压缩css文件
const OptiminizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

// webpack-dev-server 开发者模式下 hot=true 开启hrm;
// MinCssExtractPlugin 组件不支持热更新，不能在hrm 模式下使用;
// hrm模式下，使用style-loader 进行样式热更新,在开发模式使用;
// 非hrm模式下，可以使用MinCssExtractPlugin 进行样式热更新,在生产模式使用;
// style-loader 和MinCssExtractPlugin 不在一起使用


// 环境变量
let ENV_MODE = process.env.NODE_ENV;
let isProductMode = ENV_MODE == 'production';

let devServer = {
    contentBase: '../dist',
    compress: true,
    port: 9090,
    host:'localhost',
    quiet:false,
    hot:true,
};


const baseWebpack= {
    entry: path.resolve(__dirname,'../src/index.js'),
    output: {
        filename: 'js/index.[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test:/\.scss$/,
                use:[
                    // isProductMode ? MinCssExtractPlugin.loader : 'style-loader',
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:MinCssExtractPlugin.loader,
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    }
                ]

            }
        ]
    },
    optimization: {    // 1. 这个配置必须
        minimize: isProductMode,
    },
    devtool:isProductMode?false:'source-map', // 2. 这个配置必须
    mode:ENV_MODE,
    plugins: [
        new VueLoader(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../index.html'),
            filename:'index.html',
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets:true,
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'),
                '**/*'
            ],
        }),
        new MinCssExtractPlugin({
            // filename:'[name].css',
            chunkFilename:'[id].css'
        }),
        new ParalleUglifyPlugin({
            uglifyJS:{
                output:{
                    beautify:false,
                    comments:false
                },
                warnings:false,
                compress:{
                    drop_console:false,     
                }
            },
        }),
        new OptiminizeCssPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            // cssProcessorOptions: cssnanoOptions,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        }),
    ],
    devServer: devServer,
    resolve:{
        extensions:['.js','.vue','.scss'],
        alias:{
            '@resource':path.resolve(__dirname,'../resource'),
            '@components':path.resolve(__dirname,'../components'),
        }
    }
}
console.log(baseWebpack);

module.exports = baseWebpack;