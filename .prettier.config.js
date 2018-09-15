module.exports = {
	"printWidth": 80, // 每行代码长度（默认80）
	"tabWidth": 2, // 每个tab相当于多少个空格（默认2）
	"useTabs": false, // 是否使用tab进行缩进（默认false）
	"singleQuote": true, // 使用单引号（默认false）
	"semi": true, // 声明结尾使用分号(默认true)
	"trailingComma": "all", // 多行使用拖尾逗号（默认none）
	"bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
	"jsxBracketSameLine": false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
	"arrowParens": "avoid" // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};

// 使用 prettier + eslint
/*
		install
			->
				eslint-plugin-prettier 联合使用
				eslint-config-prettier 解决冲突

		这里是否需要设置 eslint 的兼容包存疑，因为webstorm 是在 2018版本开始支持prettier
		2018以前的版本都是 以 externTool的形似构建才需要通过eslint的命令去执行所以提供兼容包

* */
