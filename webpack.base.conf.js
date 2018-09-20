/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src/main.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "js/[name].bundle.[hash:6].js",
		publicPath: "http://localhost:8080/"
	},
	resolve: {
		extensions: [".vue", ".css", ".js", ".json"],
		alias: {
			"@": path.join(__dirname, "src")
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					// hotReload  控制 热加载的。dev默认true | prod默认false
				}
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader"
			},
			{
				test: /\.(css|scss)$/,
				use: [
					// vue-style-loader 的版本是受 vue-lodaer控制的，所以没必要在package.json里面显示 去安装一下
					process.env.NODE_ENV !== "production"
						? "vue-style-loader"
						: MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							module: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								// 与其用 postcss-import 不如 scss来的直接，css4 和 scss混着写嘛
								require("postcss-cssnext")({
									browsers: ["last 100 versions"]
								})
							]
						}
					},
					"sass-loader"
				]
			},
			{
				// 图片
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "img/[name]-[hash:6].[ext]"
					}
				}
			},
			{
				// 字体
				test: /\.(ttf|eot|woff|woff2)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "font/[name]-[hash:6].[ext]"
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_EN": JSON.stringify("production")
		}),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html")
		})
	]
};

// module里面定义了扫描范围，plugins里面进行 但组件文件拆分

// 后续的就全部交给了 js sass file 一些其他loader

// 然后就是把 webpack 给加进来就好了，编译并且能够运行一个基本的vue，再接下来就是选择 一个vue开源组件库 去开发
