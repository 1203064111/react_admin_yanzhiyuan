/**
 * Created by shenjiabo on 16/7/18.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextWebpacklugin = require('extract-text-webpack-plugin');

module.exports = {
    //插件项
    plugins: [
                new webpack.optimize.CommonsChunkPlugin('common.js'),
                new webpack.HotModuleReplacementPlugin(),//热更新
                new webpack.NoErrorsPlugin()//报错但不退出webpack进程

            ],
    //页面入口文件配置
    entry: {
        index : ['webpack/hot/dev-server',path.join(__dirname ,'./index.js')]
    },
    //入口文件输出配置
    output: {
        path:path.join(__dirname ,'./build'),
        filename: '[name].js',
    },
    devServer: {
        inline: true,
        port: 8099
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                compact : true
            }
        }, {
            test: /\.jsx$/,
            loader: 'babel!jsx-loader?harmony'
        },{
            test: /\.css$/,
            loader: "style!css"
        },],
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: './../../', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {

        }
    },
    postcss: [
        require('autoprefixer') //调用autoprefixer插件,加入各个浏览器的前缀
    ],
};