const webpack = require('webpack')
const exportPath = require('path')

let plugins = []			//Plugins for webpack
let env = process.env.WEBPACK_ENV			//Node Environment also for Vue
let opfile = 'main'			//Export filename

/**
 * Setup the WEBPACK_ENV for production or dev
 * and setup minifying accordingly
 */
if (env === 'production') {
	//Get our minification going for js
	const UglifyjsPlugin = require('uglifyjs-webpack-plugin')

	plugins.push(new UglifyjsPlugin({
		minimize: true,
		test: /\.js($|\?)/i,
		uglifyOptions: {
			output: {
				comments: false,
				beautify: false
			}
		}
	}))

	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"Production"'
		}
	}))

	opfile = opfile + 'min.js'
} else {
	opfile = opfile + '.js'
}

/**
 * The main configuration to be exported for Webpack
 */
const config = {
	entry: './src/main.js',
	output: {
		path: exportPath.resolve(__dirname, './dist'),
		filename: opfile
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		}]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins
}

/**
 * Export our config
 */
module.exports = config
