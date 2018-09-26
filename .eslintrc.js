// 而这里悬着JS结尾，是因为不想写 双引号 ""
// eslint --init 会在本地创建 .eslintrc 文件
// eslintrc的操作，也可以作为 package.json 下的 eslintConfig变量的值，等效

module.exports = {
	root: true,
	parser: "babel-eslint",
	extends: [
		"airbnb-base",
		"plugin:flowtype/recommended",
		"prettier",
		"prettier/flowtype",
		"vue",
	],
	plugins: [
		"flowtype",
		"prettier",
	],
	rules: {
		"flowtype/no-types-missing-file-annotation": 0,
		"import/prefer-default-export": 0,
		"no-console": 0,
		"class-methods-use-this":0,
		'global-require': 0,
		'import/no-unresolved':0,
		// 看了官网才知道，要加这句话，不然没反应
		"prettier/prettier": "error"

  //  airbnb-base 基本怪范了大部分的规则，我觉得没必要使用 eslint:recommended
	//	只需要在这里配置一些需要关闭或开启的规则就好了
	//	对于已经失效的全局参数，请配置 globals
	},
}

// airbnb确实仅仅只是一个避免排错的一个规范，并不利于 代码同步的提交

// airbnb-base 是不包含react的版本
// -> 依赖 eslint eslint-plugin-import
// airbnb 是包含react的版本
// -> 依赖 eslint eslint-plugin-import eslint-plugin-react esling-plugin-jsx-a11y

// Esprima 默认解析器，只支持当前进入规范的语法，所以修饰器一类的就需要babel-eslint的支持

//	非 prettier试用下的 配置eslint -format
// 'array-element-newline': ["error", "always"],
// 'implicit-arrow-linebreak': ["error", "below"],
// 'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 1 }],
// 'no-multiple-empty-lines':['error',{max:1}],
// 'object-property-newline':["error",{allowAllPropertiesOnSameLine:false}],
// 'padded-blocks': ["error", "always"],
// "padding-line-between-statements": [
// 	"error",
// 	{ "blankLine": 'never', "prev": '*', "next": '*' },]
