# preset-stage-x
* stage-0

		"@babel/plugin-proposal-function-bind" 
		通过是用 :: 的形式来代替 call(this) 的形式，php写法，babel的小彩蛋，这是一个永远不会加入es的语法
* stage-1

		@babel/plugin-proposal-do-expressions jsx中 通过 实现 if-else if-else 表达式
		@babel/plugin-proposal-optional-chaining{ "loose": false } obj?.props === obj?undefined:obj.props,get/set都可以使用
		- @babel/plugin-proposal-export-default-from  export * as ns from mode 这个RN 中广泛使用
		@babel/plugin-proposal-pipeline-operator{ "proposal": "minimal" } |> 形式来组织管道，一个函数的输出是另一个函数的输入
		@babel/plugin-proposal-nullish-coalescing-operator 用 exp1??exp2 来表示，如果左边的表达式为null或undefined就返回右边
		@babel/plugin-proposal-logical-assignment-operators 实现逻辑= ||= &&= ??=
		
* stage-2

		@babel/plugin-proposal-function-sent 在generator函数中，function.set获取next的参数
		@babel/plugin-proposal-numeric-separator 长整型下标分割符，java就有这东西，分隔符不影响实际值
		-	@babel/plugin-proposal-decorators{ "legacy": true } 修饰器
		@babel/plugin-proposal-throw-expressions 可以在表达式中使用throw new Error() 抛出异常
		
* stage-3

		-	@babel/plugin-proposal-class-properties{ "loose": false } 可以使用将属性与修饰器一起使用，并且在class中可以直接用 = 赋值
		-	@babel/plugin-syntax-dynamic-import import().then() 对于导入图片很有帮助
		@babel/plugin-syntax-import-meta 用import.meta传递一些信息
		
遗憾
---
stage-2
	@babel/plugin-proposal-export-namespace-from 未找到说明
stage-3
	@babel/plugin-proposal-json-strings未找到说明

惊喜
---
有兴趣的同学可以进入 <a href="https://github.com/tc39/proposals">TC39-Proposals</a> 关注更多完成的以及正在进行的proposals说明
		
感觉这里的TC39 协会拟定的方案似乎并不能被社区所接受啊
以上是目前babel已经 纳入stage的一些插件，只不过被社区征讨到只能个人手动去添加
估计 stage还是需要一个正义的jser 来维护，免得加入了社区抵触的东西被迫拆包
