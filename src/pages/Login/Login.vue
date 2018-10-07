<template>
	<div class="chat-login">
		<h1 class="chat-title">We Chat Here ~</h1>
		<br>
		<div class="login-container">
			<div class="login-box">
				<div class="login-account-topbar">
					<i class="iconfont icon-back"></i>
					<router-link
						class="iconfont icon-erweima"
						to="/qrcode"
					></router-link>
				</div>
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</div>
		</div>
		<br>
		<div>logo</div>
		<valid-img></valid-img>
	</div>
</template>

<script>
	import validImg from "@/component/validImg";

	export default {
		name: "Login",
		components: {
			[validImg.name]: validImg
		}
	};

	// 我希望 路由改变的时候，上面那个点击按钮也一样变更，并且能返回，这是要通过啥来控制呢？我觉得是用 路由api

	//	为什么我这里路由来回切换的时候。它会无端增加很多东西，一旦添加了缓存，点击功能又失效了...
	// 我惊奇地发现。data 竟然会被 执行2次，所谓的重连接我觉得就是拿老数据注入重新执行一边，所以这里出现了问题

</script>

<style scoped lang="scss">
	@import "../../global";

	.chat-login {
		@include fullScreen;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chat-title {
		font-style: $h1;
	}

	.login-container {
		position: relative;
		border-radius: $defaultBorderRadius;
		box-shadow: $defaultBoxshadow;
		background-color: $bgColor;
		overflow: hidden;
	}

	.login-box {
		background: #fff;
		box-shadow: $defaultBoxshadow;
		width: $homeWidth;
	}

	.login-account-topbar {
		display: flex;
		align-self: stretch;
		justify-content: space-between;
		padding: $defaultBorderRadius;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter-active {
		position: absolute;
	}

	.fade-leave-to {
		opacity: 0;
	}

</style>
