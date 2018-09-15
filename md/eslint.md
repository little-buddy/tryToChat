module.exports={
	// 这个变量是告诉IDE ：用我用我
	root: true,
	// 解析器
	parser: '',
	// 解析器会默认将 parseOptions作为参数传入，但也有可能忽略一些参数
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		browser: true,
		es6: true // 这个会自动设置ecmaVersion
	},
	// recommended 似乎有一堆默认开启的规则
	extends: ["eslint:recommended"],
	// 匹配规则
	plugins: [],
	rules: {
		/*
						off/0 关闭
						warn/1 警告
						error/2 开启
		* */
	},
	globals:{
	//	设置全局变量是否能否被覆盖，false表示无法被重写，定义 $ 这样的东西挺好的
	}

}

// 定义在插件里的规则，需要使用 pluginName/rule 进行设置


/*
	ESLint 支持几种格式的配置文件：
		JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
		YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
		JSON - 使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
		(弃用) - 使用 .eslintrc，可以使 JSON 也可以是 YAML。
		package.json - 在 package.json 里创建一个 eslintConfig属性，在那里定义你的配置。

我觉得.eslintrc 很帅啊，它竟然告诉我弃用了
* */


升级 eslint5
---
* Node.js 4 is no longer supported

		- 不再支持 nodeJs-4
		nodejs6(6.14.0 above)
		nodejs8(8.10.0 above)
		nodejs9 aove
* eslint:recommended changes

		Two new rules 加入了 eslint:recommended
		- for-direction
		- getter-return
* The experimentalObjectRestSpread option has been deprecated

		{
			parseOptions:{
				ecmaVersion:2018
				/*
					原版写法 -> 依旧支持但会在eslint6 中删除
					ecmaFeatures:{
						experimentalObjectRestSpread:true
					}
				*/
			}
		}
		包含了最新了es规范，因为 rest已经在6月份通过正式进入js体系，decorator 啥时候进啊
* Linting nonexistent files from the command line is now a fatal error
		<br>这在eslint4 中是没有报错的		
* The default options for some rules have changed

		object-curly-newline multiline -> consistent
		no-self-assign props:false -> props:true
* Deprecated globals have been removed from the node,browser,and jest environments

		一些全局变量随着版本变更已经被删除了，所以如果你直接只用这些变量eslint会报错
		但是如果你还是想继续使用，就需要在globals中取定义它为false，等同于不被检测这个变量
* Empty files are now linted
* Plugins is scoped packages are now resolveable in configs
	
		plugins:["@foo"]
		eslint4 -> eslint-plugin-@foo
		eslint5 -> @foo/eslint-plugin
		统一了插件与包的规范
		
* Multi-line eslint-disable-line directive are now reported as problems

		多行跳过检查书写现在会报错
* The parent property of AST（abstract syntax tree） nodes is now set before rules start running
				
				后续都是从 AST 底层处理的一些改变...放弃了
				
####【生词】
confusion 混淆
		 
		
	
