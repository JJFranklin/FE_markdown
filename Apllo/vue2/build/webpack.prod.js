const merge = require("webpack-merge");
const baseCommon = require("./webpack.base");
 
module.exports = merge(baseCommon,{
    devtool:false,
    mode: "production",
    optimization: { // 1. 这个配置必须
        minimize: true,
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

});