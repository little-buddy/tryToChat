vue+node 的形式构建一个 具有基本功能的 聊天web应用
---
## 目前觉得需要有的功能
* 存储聊天记录 
* 聊天互动反馈
* 用户记录
* websocket 的使用

###
* 第一步 -> 用vue构建出聊天页面以及一些基本的互动
* 第二步 -> 构建node端的websocket设置
* 第三步 -> 缓存处理 以及 写入数据库( 这里的redis我打算用自己服务器进行远程连接，本地模拟多台服务部署 )

####
畅想<b/>
可以用webRtc，进行一些视频通话的功能，感觉有点难，难在传输的清晰度。。这个只是一个畅想，本地通过人脸识别，或许可以试试看

#### 实际操作，本项目不使用 vue-cli 进行配置，而是选择 自己动手从0搭建

各框架的版本请参见 package.json

这是我全局安装的eslint规则

	babel-eslint@8.2.1
	eslint@4.18.2
	eslint-config-airbnb@16.1.0
	eslint-import-resolver-reactnative@1.0.2
	eslint-plugin-babel@4.1.2
	eslint-plugin-flowtype@2.50.0
	eslint-plugin-import@2.9.0
	eslint-plugin-jsx-a11y@6.0.3
	eslint-plugin-prefer-object-spread@1.2.1
	eslint-plugin-promise@3.7.0
