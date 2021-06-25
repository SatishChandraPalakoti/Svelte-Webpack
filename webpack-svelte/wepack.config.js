const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')


module.exports ={
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            //Allows Use of modern js
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // Allows use of svelte files
            {
                test: /\.svelte$/,
                use:{
                    loader: 'svelte-loader'
                }
            },
            //Allows use of css
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            //Allows use of external files like images
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use : 'file-loader'
            }
        ]
    },
    //This will enable users to leave off extensions while importing in files
    resolve: {
        extensions: ['.mjs','.js','.svelte'],
    },
    plugins: [
        //Allows webpack to create the index.html file
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        //Allows import of css files
        new MiniCssExtractPlugin(),
        //Get environment files from the files
        new Dotenv(),
    ],
    // Configure the development server
    devServer:{
        historyApiFallback : true,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    }
}