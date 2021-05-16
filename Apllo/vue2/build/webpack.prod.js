const {merge} = require("webpack-merge");
const path = require("path");
const baseCommon = require("./webpack.base");
const webpack = require("webpack");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩js文件
const ParalleUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 压缩css文件
const OptiminizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CompressionPlugin = require("compression-webpack-plugin")
 
module.exports = merge(baseCommon,{
    devtool:false,
    mode: "production",
    optimization: { 
        // minimize: true,
       
    },
    plugins: [
        // 开启多进程压缩js
        new ParalleUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false,
                    comments: false
                },
                warnings: false,
                compress: {
                    drop_console:true,
                }
            },
        }),

        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'),
                '**/*'
            ],
        }),  

        new MinCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[name].css'
        }),

        new OptiminizeCssPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
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
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            deleteOriginalAssets:false,
            test: /\.(js|css)/
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],

});