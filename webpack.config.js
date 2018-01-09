const webpack = require('webpack')
const exportPath = require('path')

let plugins = []
let env = process.env.WEBPACK_ENV
let opfile = 'main'

if (env === 'production') {
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

module.exports = config
