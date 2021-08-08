const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const Dotenv = require("dotenv-webpack")
const sveltePreprocess = require('svelte-preprocess');

module.exports={
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path : path.resolve(__dirname,"./dist"),
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: '/node_modules/',
                use :{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html|svelte)$/,
                use :{
                    loader: 'svelte-loader' 
                }
            },
            {
                test: /\.css$/,
                use :{
                    loader: 'css-loader'
                }
            },{
                test: /\.(jpg|jpeg|png|svg)$/,
                use :{
                    loader: 'file-loader'
                }
            }
        ]
    },
    resolve:{
        extensions: [".mjs",".js",".svelte"]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new miniCssExtractPlugin(),
        new Dotenv()    
    ],
    devServer: {
        historyApiFallback: true,
        contentBase : path.resolve(__dirname,"dist"),
        hot: true,
        watchContentBase: true
    }
}