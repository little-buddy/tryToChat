<template>
	<!-- TODO 我想在这里弄个SVG，先放文字，后期有时间再弄 -->
	<!-- TODO 增加一些入场动画 -->
	<!-- TODO 字体还需要更换 -->
	<!-- TODO 我想在这里点击登陆的时候，弹出一个跨快框，滑块框匹配成功才发送请求，然后进行页面的跳转 -->
	<div>
		<div class="login-account-box">
			<chat-avatar-choose
				:avatarList="localUsers"
				@hoverEvent="hoverUpdate"
				ref="$choose"
			></chat-avatar-choose>

			<input
				type="text"
				placeholder="Account"
				v-model="account"
				@focus="pwdFocus"
			>
			<div class="password">
				<input
					type="password"
					placeholder="Password"
					v-model="password"
					@keyup.enter="onLogin"
					@focus="pwdFocus"
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
				@click="switchExt"
			></i>
		</div>
		<div
			class="login-ext-tontainer"
			:class="{'login-ext-hidden':!extension}"
		>
			<div class="login-ext-wrapper">
				<div>
					<chat-checkbox
						name="remember"
						text="Remember"
						v-model="isRemember"
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
						v-model="isAutoLogin"
					>
					</chat-checkbox>
					<div>
						<router-link :to="'signup'">Sign up</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import checkbox from "@/component/checkbox";
	import avatarChoose from "@/component/Avatar/avatarChoose";


	export default {
		name: "signin-account",
		components: {
			[checkbox.name]: checkbox,
			[avatarChoose.name]: avatarChoose
		},
		// request
		beforeCreate() {
			const { users } = require("../mock").localCache;
			// all cacheUsers
			this.localUsers = users;
			//	当前的用户信息无非是与该页面有所互动
		},
		data() {
			const curUser: User = this.localUsers[0]
			const { account, token, isAutoLogin, isRemember, loginStatus } = curUser
			// 虽然每一处都有这个数据，但是此处不需要头像，因为头像是放在另外一个组件内执行的
			// account password token 适用于提交的
			return {
				account,
				token,
				extension: false,
				isAutoLogin,
				isRemember,
				loginStatus,
				password: ''
			};
			//	不论记住、登陆，都会基础token，所以token没法用于判断
		},
		computed: {
			showEnter() {
				return this.password.length > 4;
			}
		},
		methods: {
			onLogin() {
				if (this.account.length && this.password.length > 4) {
					console.log("弹出滑块框，然后进行回调");
				//	something.then((boolean)=>{ 失败的话就清空密码，不知道这里是通过if-else的形式还是，用 $mount 的形式去操作 })
				}
			},
			switchExt() {
				this.extension = !this.extension;
			},
			hoverUpdate(account) {
				this.account = account
				this.password = ""
			},
			pwdFocus() {
				//	我需要在这个里面去触发一些东西。比如调用某个元素的方法
				if (!this.$refs.$choose.mask) {
					this.$refs.$choose.toChoose()
				}

			}
		}
	};
</script>
<!-- 本地一定存储了个人的信息，登陆成功会将额外的个人信息简介天骄到那个状态下，登陆成功之后就会有记录 -->

<style scoped lang="scss">
	@import "../../../global";

	.login-account-box {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 15px 20px 0px #c1c1c1;
		border-radius: $defaultBorderRadius;
		background-color: #fff;
	}

	input[type=text], input[type=password] {
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

	.login-ext-tontainer {
		width: 100%;
		height: $extHeight;
		border-bottom-left-radius: $defaultBorderRadius;
		border-bottom-right-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		transition: height .5s;
		overflow: hidden;
		background-color: $bgColor;
	}

	.login-ext-hidden {
		height: 0 !important;
	}

	.login-ext-wrapper {
		@include vertical-theme;
		justify-content: space-evenly;
		position: relative;
		height: $extHeight;
		font-size: $h6;
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

</style>

<!-- props 是一个单项数据流绑定，要想双向你就需要添加一个事件，并且这个事件还需要层层传递 -->
<!-- provide 也只是注入副本，不会共享一份数据 -->
<!-- provide/inject 是注入依赖。不能依赖内部的值 -->

<!-- 这个项目要想移动端适配，还是非常费力的 -->

<!-- 一个滑动块验证 -->
<!-- 一个右上角消息、错误提醒栏 -->
<!-- 再接触websocket -->
<!-- 再做通信以及聊天界面处理 -->
<!-- 再做移动化 -->
