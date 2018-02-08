var path = require('path');
var resolve = path.resolve;
var webpack = require('webpack');

module.exports = {
    
    devtool:'cheap-module-eval-source-map',
	
    entry:{
        "trade":['babel-polyfill','./trade']
    },
	
    output: {
        path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方
        filename: '[name].js', //打包后输出文件的文件名
        publicPath: "/dist/"
    },

    devServer:{
        hot:true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.ProvidePlugin({
            "React":        'react',
            "ReactDOM":     'react-dom',
            "Component":    ['react', 'Component']
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
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
        extensions: ['.js','.css','.less','.scss'],
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
    }

};