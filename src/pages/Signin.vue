<template>
	<div class="container">
		<!-- 唯一父节点 -->
		<!-- TODO 我想在这里弄个SVG，先放文字，后期有时间再弄 -->
		<!-- TODO 增加一些入场动画 -->
		<h1 class="title">We Chat Here ~</h1>
		<div class="signBox">
			<div class="topbar">
				<i class="iconfont icon-back"></i>
				<i class="iconfont icon-erweima"></i>
			</div>
			<br>
			<div
				class="avater"
				:style="{backgroundImage:avater}"
				@click=""
			>
				<div
					:class="{status:true,online:status,hidden:!status}"
					@click="trrigerStatus"
				></div>
			</div>
			<br>
			<input type="text" placeholder="Account">
			<div class="password">
				<input type="text" placeholder="Password" v-model="user.password">
				<i :class="{activeEnter:showEnter}" class="iconfont icon-enter"></i>
			</div>
			<br>
			<i class="iconfont icon-arrow-down" @click="trrigerExtend"></i>
			<!-- TODO 这里不做验证码了，做一个滑块的插件，先做一个写死的插件，后面再动态生成 -->
			<div class="extension" :class="{noHeight:!extension}">
				<div><input type="checkbox"> Remember</div>
				<div>Retrieve</div>
				<div><input type="checkbox">Auto Login</div>
				<div>Sign up</div>
			</div>
			<!--<router-link :to="'chatroom'">登陆</router-link>-->
			<!--<router-link :to="'forgetpassword'">忘记密码</router-link>-->
			<!--<router-link :to="'signup'">注册</router-link>-->
			<div>logo</div>
		</div>

		<!-- 唯一的一个问题 就是 验证失败这类的东西应该放在什么地方 -->
		<!-- 这边的class需要做响应式的，先期虽然不写，但是要留扣子后期去写 -->
		<!-- 既然是聊天嘛。就仿QQ客户端做一个web版吧 -->
	</div>
</template>

<script>
	export default {
		name: "Login",
		data: function() {
			return {
				avater: "url(" + require("@/assets/img/bg.jpg") + ")",
				user: {
					account: "",
					password: ""
				},
				status: true,
				extension: false
			};

		},
		computed: {
			showEnter: function() {
				return this.user.password.length > 4;
			}
		},
		methods: {
			trrigerStatus: function() {
				// 隐身 在线 离线
				this.status = !this.status;
			},
			trrigerExtend: function() {
				this.extension = !this.extension;
			}
		}
	};
	//	用了 scoped 我都觉得不需要scss。不过一些计算处理方面的还是需要使用scss的
</script>

<style scoped lang="scss">
	.signBox {
		position: relative;
		width: 250px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid gray;
		padding: 4px;
		border-radius: 4px;
		box-shadow: #7d7d7d 0px 0px 9px 1px;
	}

	.title {
		text-align: center;
		margin-top: 100px;
		font-size: 40px;
	}

	input[type=text] {
		background-color: transparent;
		outline: none;
		border: 0;
		border-bottom: 1px solid gray;
		padding: 10px 2px;
	}

	input[type=text], .password {
		width: 220px;
	}

	.password {
		position: relative;
	}

	.icon-enter {
		position: absolute;
		top: 50%;
		right: 10px;
		margin-top: -8px;
		color: #cebdbd21;
	}

	.activeEnter {
		color: #0a0114;
		transition: color 1s;
	}

	input[type=checkbox] {
		position: absolute;
		margin-left: -16px;
	}

	.noHeight {
		height: 0 !important;
		transition: height .5s;
		overflow: hidden;
	}

	.login {
		color: blue;
		transition: color 2s;
	}

	.avater {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		border: 2px solid #fefefe;
		&:hover {
			border-color: #94d5fe;
		}
	}

	.status {
		width: 20px;
		height: 20px;
		margin-bottom: -10px;
		border-radius: 50%;
	}

	.online {
		background-color: #6fda43;
	}

	.hidden {
		background-color: #e9c555;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		&:before, &:after {
			content: '';
			background-color: #635022;
			width: 10px;
			height: 3px;
			border-radius: 2px;
		}
	}

	.topbar {
		display: flex;
		align-self: stretch;
		justify-content: space-between;
	}

	.extension {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 220px;
		height:40px;
		div {
			width: 34%;

		}
	}
</style>
