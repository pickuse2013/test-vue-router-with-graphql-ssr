const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const srcPath = path.resolve(process.cwd(), 'src');
const isProduction = process.env.NODE_ENV === 'production';
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			include: [srcPath],
			options: {
				optimizeSSR: false
			}
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			include: [srcPath],
			exclude: /node_modules/,
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[path][name].[hash:7].[ext]',
					context: srcPath
				}
			}]
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:7].[ext]'
				}
			}]
		},
		{
			test: /\.css$/,
			use: [{
				loader: ExtractCssChunksPlugin.loader,
				options: {
					hot: !isProd,
					reloadAll: !isProd
				}
			},
				'css-loader'
			]
		},
		{
			test: /\.styl$/,
			use: [
				'css-loader',
				'stylus-loader'
			]
		},
		{
			test: /\.scss$/,
			use: [
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.less$/i,
			use: [{
				loader: ExtractCssChunksPlugin.loader,
				options: {
					hot: !isProd,
					reloadAll: !isProd
				}
			},
				'css-loader',
				'less-loader'
			]
		},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new ExtractCssChunksPlugin({
			filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
			chunkFilename: isProd ? 'css/[name].[contenthash:8].chunk.css' : '[name].chunk.css'
		})
	]
};