var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var indexHtmlWebpackPlugin = new HtmlWebpackPlugin({
    template:  path.join(__dirname, "default_index.ejs"),
    filename:  path.join(__dirname, "index.html"),
    title: "Visualizer",
    hash: false,
    inject: "head"
});
var processEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('development')
    }
});
module.exports = {
    entry: "./src/entry.tsx",
    devtool: "eval",
    output: {
        filename: "app.js",
        publicPath: "./js/",
        path: path.join(__dirname, "/js")
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader?configFileName=tsconfig.json'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.otf(\?[a-z0-9]+)?$/, loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'},
            {test: /\.woff(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?.+)?$/, loader: "file-loader"},
            {test: /\.(svg|jpe?g|png|gif)(\?.+)?$/, loader: "file-loader"},
            {test: /\.cur(\?.+)?$/, loader: "file-loader"}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        indexHtmlWebpackPlugin,
        processEnvPlugin,
        new ExtractTextPlugin("./css/[name].css")
    ]
};