const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack')

const publicPath = './';


const sharedCSSLoaders = [
	{
		loader: 'css-loader',
		options: {
			localIdentName: '[hash:base64:5]'
		}
	}
];

exports.publicPath = publicPath;

exports.autoprefix = () => ({
	loader: 'postcss-loader',
	options: {
		plugins: () => [require('autoprefixer')]
	}
});

exports.purifyCSS = (options) => ({
	plugins: [
		new PurifyCSSPlugin(options)
	]
});

exports.loadCSS = ({ include, exclude, use } = {}) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,

				include,
				exclude,

				use: [
					{
						loader: 'style-loader'
					},
					...sharedCSSLoaders.concat(use)
				]
			}
		]
	}
});

exports.extractCSS = ({ include, exclude, use } = {}) => {
	// Output extracted CSS to a file
	const plugin = new ExtractTextPlugin({
		filename: 'app/[name].[contenthash:4].css',
		allChunks: true
	});

	return {
		module: {
			rules: [
				{
					test: /\.scss$/,

					include,
					exclude,

					use: plugin.extract({
						use: sharedCSSLoaders.concat(use),
						fallback: 'style-loader'
					})
				}
			]
		},
		plugins: [plugin]
	}
};


exports.extractCSS = ({ include, exclude, use } = {}) => {
	// Output extracted CSS to a file
	const plugin = new ExtractTextPlugin({
		filename: 'styles/[name].css',
		allChunks: true
	});

	return {
		module: {
			rules: [
				{
					test: /\.scss$/,

					include,
					exclude,

					use: plugin.extract({
						use: sharedCSSLoaders.concat(use),
						fallback: 'style-loader'
					})
				}
			]
		},
		plugins: [plugin]
	}
};

exports.loadHtmlPug = (options) => ({
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{loader: 'html-loader'},
					{loader: 'pug-html-loader'},
				],
				options
			}
		]
	}
});

exports.loadPug = (options) => ({
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{loader: 'pug-loader'}
				],
				options
			}
		]
	}
});