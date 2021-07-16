const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const srcPath = path.resolve(process.cwd(), 'src');
const rootPath = path.resolve(process.cwd(), '.');
const distPath = path.resolve(process.cwd(), 'dist');

console.log(`srcPath: ${srcPath}`)
console.log(`rootPath: ${rootPath}`)

module.exports = merge(base, {
	target: 'node',
	entry: path.join(srcPath, 'server-entry.js'),
	devtool: 'source-map',
	// This tells the server bundle to use Node-style exports
	output: {
		path: distPath,
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
	},
	//externals: Object.keys(require('../package.json').dependencies),
	externals: nodeExternals({	
        // do not externalize dependencies that need to be processed by webpack.	
        // you can add more file types here e.g. raw *.vue files	
        // you should also whitelist deps that modifies `global` (e.g. polyfills)	
        whitelist: /\.css$/	
    }),
	module: {

	},


	// This is the plugin that turns the entire output of the server build
	// into a single JSON file. The default file name will be
	// `vue-ssr-server-bundle.json`
	plugins: [
		new VueSSRServerPlugin(),
		// new webpack.optimize.LimitChunkCountPlugin({
		// 	maxChunks: 1
		// })
	]
});