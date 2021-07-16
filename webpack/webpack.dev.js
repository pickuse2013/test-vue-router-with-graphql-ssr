const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const srcPath = path.resolve(process.cwd(), 'src');
const rootPath = path.resolve(process.cwd(), '.');
const distPath = path.resolve(process.cwd(), 'dist');

delete base.optimization;


console.log(`srcPath: ${srcPath}`)
console.log(`rootPath: ${rootPath}`)
//'webpack-hot-middleware/client?reload=true',
module.exports = merge(base, {
    mode:"development",
    target: 'node',
    entry:
        path.join(srcPath, 'app.js'),
    devtool: 'source-map',
    // This tells the server bundle to use Node-style exports
    output: {
        path: distPath,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require('../package.json').dependencies),
    module: {

    },


    // This is the plugin that turns the entire output of the server build
    // into a single JSON file. The default file name will be
    // `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        // new webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 1
        // }),
        // 提供hot reload功能
        new webpack.HotModuleReplacementPlugin(),
        // 當程式碼有錯誤時，不更新畫面，如果錯誤被修正才會hot reload
        // 這個可以選擇使用。
        // new webpack.NoErrorsPlugin()
        new FriendlyErrorsWebpackPlugin(),
    ],
    optimization: {
        splitChunks: false
    }
});