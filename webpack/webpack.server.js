const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');
const merge = require('webpack-merge');

const base = require('./webpack.base');
const srcPath = path.resolve(process.cwd(), 'src');
const rootPath = path.resolve(process.cwd(), '..');

module.exports = merge(base, {
    entry: path.join(srcPath, 'server-entry.js'),
    target: 'node',
    devtool: 'source-map',
    
    module: {
        rules: [
            
        ]
    },

    // This tells the server bundle to use Node-style exports
    output: {
        path: path.join(rootPath, 'dist'),
        filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
    },

    // This is the plugin that turns the entire output of the server build
    // into a single JSON file. The default file name will be
    // `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
    ]
});