<template>
	<div class="container">
		<!-- 唯一父节点 -->
		<!-- TODO 我想在这里弄个SVG，先放文字，后期有时间再弄 -->
		<!-- TODO 增加一些入场动画 -->
		<!-- TODO 字体还需要更换 -->
		<h1 class="title">We Chat Here ~</h1>
		<br>
		<div class="wrapper">
			<div class="signBox">
				<div class="topbar">
					<i class="iconfont icon-back"></i>
					<i class="iconfont icon-erweima"></i>
				</div>
				<avater-box></avater-box>
				<input type="text" placeholder="Account" v-model="user.account">
				<div class="password">
					<input
						type="text"
						placeholder="Password"
						v-model="user.password"
						@keyup.enter="onLogin"
					>
					<i
						class="iconfont icon-enter"
						:class="{activeEnter:showEnter}"
						@click="onLogin"
					></i>
				</div>
				<br>
				<i
					class="iconfont icon-arrow-down"
					@click="trrigerExtend"
				></i>
				<!-- TODO 这里不做验证码了，做一个滑块的插件，先做一个写死的插件，后面再动态生成 -->
			</div>
			<div
				class="extContainer"
				:class="{noHeight:!extension}"
			>
				<div class="extWrapper">
					<div>
						<chat-checkbox
							name="remember"
							text="Remember"
							v-model="remeberFlag"
						>
						</chat-checkbox>
						<div>
							<router-link :to="'forgetpassword'">Retrieve</router-link>
						</div>
					</div>
					<div>
						<chat-checkbox
							name="autoLogin"
							text="Auto Login"
							v-model="autologinFlag"
						>
						</chat-checkbox>
						<div>
							<router-link :to="'signup'">Sign up</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br>
		<div>logo</div>

		<!-- 唯一的一个问题 就是 验证失败这类的东西应该放在什么地方 -->
		<!-- 这边的class需要做响应式的，先期虽然不写，但是要留口子后期去写 -->
		<!-- 既然是聊天嘛。就仿QQ客户端做一个web版吧 -->
	</div>
</template>

<script>
	import checkbox from "@/component/checkbox";
	import avaterUl from "@/component/Avater/avaterUl";


	export default {
		name: "Singin",
		components: {
			[checkbox.name]: checkbox,
			["avater-box"]: avaterUl
		},
		data() {
			return {
				//mock
				avaterObj: {
					userAvater: "url(" + require("@/assets/img/me.jpg") + ")",
					userName: "708876251",
					loginStatus: true,
					avaterClick: () => {
					},
					avaterHover: () => {
					},
					avaterStyle: ""
				},
				user: {
					account: "",
					password: ""
				},
				status: true,
				extension: false,
				remeberFlag: false,
				autologinFlag: true
			};
		},
		computed: {
			showEnter() {
				return this.user.password.length > 4;
			}
		},
		methods: {
			trrigerLoginStatus(status) {
				// 隐身 在线 离线
				this.avaterObj.logingStatus = !status;
			},
			trrigerExtend() {
				this.extension = !this.extension;
			},
			onLogin() {
				const { account, password } = this.user;
				if (account.length && password.length > 4) {
					console.log("success");
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "@/global.scss";

	:root {
		--horiazontal-theme: {
			display: flex;
			justify-content: center;
		}
		--vertical-theme: {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	/* 带全局 container属性 */
	.container {
		@apply --vertical-theme;
		justify-content: center;
	}

	.wrapper {
		position: relative;
		border-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		background-color: $bgColor;
	}

	.topbar {
		display: flex;
		align-self: stretch;
		justify-content: space-between;
	}

	.extContainer {
		width: 100%;
		height: $extHeight;
		overflow: hidden;
		transition: height .5s;
		border-bottom-left-radius: $defaultBorderRadius;
		border-bottom-right-radius: $defaultBorderRadius;
		background-color: $bgColor;
		box-shadow: $defaultBoxshadow;
	}

	.extWrapper {
		@apply --vertical-theme;
		justify-content: space-evenly;
		width: 100%;
		height: $extHeight;
		font-size: $h6;
		position:relative;
		overflow: hidden;
		& > div {
			display: flex;
			justify-content: space-around;
			align-items: center;
			align-self: stretch;
			& > div {
				&:nth-child(odd) {
					width: 34%;
				}
				&:nth-child(even) {
					width: 22%
				}
			}
		}
	}

	.noHeight {
		height: 0 !important;
	}

	.signBox {
		position: relative;
		width: $homeWidth;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:$defaultBorderRadius;
		border-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		background-color: #fff;
	}

	.title {
		font-size: $h1;
	}

	input[type=text] {
		background-color: transparent;
		outline: none;
		border: 0;
		border-bottom: 1px solid gray;
		padding: 10px 2px;
	}

	input[type=text], .password {
		width: $homeWidth*0.8;
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

	.login {
		color: blue;
		transition: color 2s;
	}

	.icon-arrow-down {
		color: #b1b1b1;
		&:hover {
			color: lighten(#b1b1b1, 10%);
		}
	}

</style>

<!-- 今天增加 nextcss一些写法，至于scss 要不要留着，我也是再考虑 -->
<!-- 被这个底部的边框弄得头疼死了 -->
<!-- 先做头像吧，然后做注册、更密码 -->
<!-- 一个滑动块验证 -->
<!-- 一个右上角消息、错误提醒栏 -->
<!-- 然后直接把这里一块与后端接了 -->

<!-- 这里是一个分割点，在这里我可以直接部署上 -->

<!-- 再接触websocket -->
<!-- 再做通信以及聊天界面处理 -->
<!-- 再做移动化 -->
<!-- 接着 -->
