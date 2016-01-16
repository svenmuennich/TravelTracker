var webpack = require('webpack');
var path = require('path');

var PATHS = {
	app: path.resolve(__dirname, './app'),
	build: path.resolve(__dirname, './build')
};

module.exports = {
	entry: PATHS.app,
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(css|less)$/,
				include: PATHS.app,
				loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less'
			},
			{
				test: /\.svg$/,
				include: PATHS.app,
				loader: 'url?limit=10000&mimetype=image/svg+xml'
			},
			{
				test: /\.jsx?$/,
				include: PATHS.app,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.json$/,
				include: PATHS.app,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	]
}
