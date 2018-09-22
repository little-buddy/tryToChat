<template>
	<!-- TODO 我想在这里弄个SVG，先放文字，后期有时间再弄 -->
	<!-- TODO 增加一些入场动画 -->
	<!-- TODO 字体还需要更换 -->
	<div class="login-account-container">
		<div class="login-account-box">
			<div class="login-account-topbar">
				<i class="iconfont icon-back"></i>
				<i class="iconfont icon-erweima"></i>
			</div>
			<chat-avater-ul
				:items="localUsers"
				:liMouseEnter="accountInput"
			></chat-avater-ul>
			<input
				type="text"
				placeholder="Account"
				v-model="curUser.account"
			>
			<div class="password">
				<input
					type="text"
					placeholder="Password"
					v-model="curUser.password"
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
				@click="switchExt"
			></i>
			<!-- TODO 这里不做验证码了，做一个滑块的插件，先做一个写死的插件，后面再动态生成 -->
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
	import avaterUl from "@/component/Avater/avaterUl";


	export default {
		name: "singin-account",
		components: {
			[checkbox.name]: checkbox,
			[avaterUl.name]: avaterUl
		},
		beforeCreate() {
			const { users } = require("../mock").localCache.localUsersInfo;
			this.localUsers = users;
			// default 0 , copy
			this.curUser = { ...users[0], password: "" };
		},
		data() {
			const { autoLogin, token } = this.curUser;
			return {
				curUser: this.curUser,
				extension: false,
				isAutoLogin: !!token,
				isRemember: autoLogin
			};
		},
		computed: {
			showEnter() {
				return this.curUser.password.length > 4;
			}
		},
		methods: {
			onLogin() {
				const { account, password } = this.curUser;
				if (account.length && password.length > 4) {
					console.log("success");
				}
			},
			switchExt() {
				this.extension = !this.extension;
			},
			accountInput(value) {
				this.curUser.account = value;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../../global";

	.login-account-container {
		position: relative;
		border-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		background-color: $bgColor;
	}

	.login-account-topbar {
		display: flex;
		align-self: stretch;
		justify-content: space-between;
	}

	.login-account-box {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: $homeWidth;
		padding: $defaultBorderRadius;
		border-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		background-color: #fff;
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
<!-- 在这种情况下我都觉得可能是需要一份vuex了 -->
<!-- 不过还是要先尝试下 vue 自带的 $emit $on $watch -->
<!-- 官方的 watch 方法类似computed，当双向流反馈数据变更的是偶触发回调 -->
<!-- provide/inject 是注入依赖。不能依赖内部的值 -->

<!-- 这个项目要想移动端适配，还是非常费力的 -->

<!-- 一个滑动块验证 -->
<!-- 一个右上角消息、错误提醒栏 -->
<!-- 再接触websocket -->
<!-- 再做通信以及聊天界面处理 -->
<!-- 再做移动化 -->
