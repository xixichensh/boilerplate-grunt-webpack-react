
var path = require('path');
var resolve = path.resolve;
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    devtool:false,

    entry:{
        "index":['./index'],
        "vendor":['babel-polyfill','jquery','md5','base64','ttfund','common','requestmodel','routerhelper']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方
        filename: '[name]-[hash:5].min.js', //打包后输出文件的文件名
        publicPath: "./"
    },


    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,        //去掉注释
            compress: {
                warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
            }
        }),

        new webpack.ProvidePlugin({
            'Promise':      'es6-promise',
            'fetch':        'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            "React":        'react',
            "ReactDOM":     'react-dom',
            "Component":    ['react', 'Component'],
            "PropTypes":    'prop-types'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new HtmlWebpackPlugin({
            template: __dirname + "/index.tpl.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            filename: 'index.html',
            //要把script插入到标签里
            inject: 'body',
            chunks:["vendor","index"]
        }),


        new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity,
        })

    ],
    
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader?sourceMap',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 2
                        }
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    'less-loader?sourceMap'
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:  { presets: 
                    [
                        "env",
                        "babel-preset-stage-0",
                        "react"
                    ] 
                }
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:8192 // 图片小于8k就转化为 base64, 或者单独作为文件
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js','.css','.less'],
        modules: ['node_modules','components','views','resources','plugins','libs'],
        alias: {
            'jquery':           resolve(__dirname, 'libs/zepto'),
            'md5':           	resolve(__dirname, 'libs/md5'),
            'base64':           resolve(__dirname, 'libs/base64'),

            'common':           resolve(__dirname, 'plugins/common'),
            'ttfund':           resolve(__dirname, 'plugins/ttfund'),
            'requestmodel':     resolve(__dirname, 'plugins/requestmodel'),
            'nativebridge':     resolve(__dirname, 'plugins/nativebridge')
        }
    },

    recordsOutputPath: path.resolve(__dirname, 'dist',"records.json")

};