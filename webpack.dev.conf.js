/* eslint-disable import/no-extraneous-dependencies */
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");

console.log(process.env.NODE_ENV);
module.exports = merge(baseConfig, {
	mode: "development",
	devServer: {
		proxy: {
			//	api 填充
		},
		open: true,
		historyApiFallback: true,
		compress: true
		// host: "0.0.0.0",
		// port: "3000"
	}
});
console.log(exports)

// module里面定义了扫描范围，plugins里面进行 但组件文件拆分

// 后续的就全部交给了 js sass file 一些其他loader

// 然后就是把 webpack 给加进来就好了，编译并且能够运行一个基本的vue，再接下来就是选择 一个vue开源组件库 去开发
