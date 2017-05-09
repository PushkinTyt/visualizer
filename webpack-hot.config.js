var config = require("./webpack.config.js");
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var path = require("path");
var webpack = require('webpack');

config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    config.entry
];

var loaders = [
    {
        loaders: ['react-hot-loader'],
        include: path.join(__dirname, 'src')
    }
];
config.module.loaders = loaders.concat(config.module.loaders);

config.devServer = {
    host: '0.0.0.0',
    port: 3000,
    contentBase: 'public'
};

config.plugins = config.plugins.slice(1);
// config.plugins.push(new WebpackBuildNotifierPlugin({
//     title: "Hot Reload build",
//     suppressWarning: true
// }));
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = config;