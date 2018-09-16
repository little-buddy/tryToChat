/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin");
const baseConfig = require("./webpack.base.conf");

module.exports = merge(baseConfig, {
	mode: "production",
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|vue)$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, "build")]),
		new MiniCssExtractPlugin({ filename: "css/[name].[hash:6].css" })
		// new ImageminWebpackPlugin({
		// 	pngquant: {
		// 		// 图片质量
		// 		quality: "95-100"
		// 	}
		// })
	]
	// 优化
	// optimization:{
	// 	// 以下是webpack 默认的optings
	// 	splitChunks:{
	// 		chunks: 'async',
	// 		minSize: 30000,
	// 		minChunks: 1,
	// 		maxAsyncRequests: 5,
	// 		maxInitialRequests: 3,
	// 		automaticNameDelimiter: '~',
	// 		name: true,
	// 		cacheGroups: {
	// 			vendors: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				priority: -10
	// 			},
	// 			default: {
	// 				minChunks: 2,
	// 				priority: -20,
	// 				reuseExistingChunk: true
	// 			}
	// 		}
	// 	},
	// 	runtimeChunks:,
	// }
});

// UglifyjsWebpackPlugin -> minimize mode = production 默认打开

// optimization negatively 负优化

// 根据 module duplication count and  module category 种类
