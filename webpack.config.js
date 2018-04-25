const path = require('path');
const glob = require('glob')
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const PATHS = {
	srcPath: "src",
	devPath: "build",
	src: path.join(__dirname, '/src'),
	build: path.join(__dirname, '/build')
};

const cssPreprocessorLoader = { loader: 'fast-sass-loader' }

let commonConfig = merge([
	{
		context: PATHS.src,
		resolve: {
			unsafeCache: true,
			symlinks: false
		},
		entry: `${PATHS.src}/js`,
		output: {
			path: PATHS.build,
			publicPath: PATHS.devPath
		},
		plugins: [
			new HtmlPlugin({
				template: './index.pug'
			}),
		],
		module: {
			noParse: /\.min\.js/
		}
	},
	parts.loadPug()
]);

let developmentConfig = merge([
	{
		devtool: 'source-map',
		watch: true,
		output: {
			devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
		},
		plugins: [
			new webpack.NamedModulesPlugin()
		]
	},
	parts.loadCSS({ include: PATHS.app, use: [cssPreprocessorLoader] }),
	// parts.extractCSS({
	// 	include: PATHS.app,
	// 	use: [parts.autoprefix(), cssPreprocessorLoader]
	// }),
	// parts.purifyCSS({
	// 	paths: glob.sync(`${PATHS.app}/**/*.+(pug|js)`, { nodir: true }),
	// 	styleExtensions: ['.css', '.scss']
	// }),
]);


module.exports = () => {
	return merge(commonConfig, developmentConfig)
};