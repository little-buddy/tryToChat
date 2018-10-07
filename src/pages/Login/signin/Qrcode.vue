<template>
	<div>
		<div
			v-if="qrimg==='geting'"
		>QRCode is loading
		</div>
		<div
			v-else-if="qrimg==='success'"
			class="qrcode-box"
		>
			<p class="textCenter">Get on QQ Mobile to<br> scan QRCode</p>
			<i class="iconfont icon-erweima" style="font-size:160px;"></i>
		</div>
		<div
			v-else
		>Network Error
		</div>
		<br>
		<br>
		<div class="bottomWrapper">
			<div>< ID Login</div>
			<div>Download Mobile QQ</div>
		</div>
		<br>

		<!--我考虑了下我的流程，大概是这样子的。就是在二维码和用户切换之间使用的是 xxx图标在右上角-->
		<!--然后注册和修改密码 是在左上角去处理，添加一个返回键。修改密码是多层级注册-->

		<!--今天的目标就是把这个页面完成了，然后了解二维码的控制程度-->

		<!--再下一步就是把这个后端用nest写注册登录，用户的基础信息完善-->

		<!--开始操作聊天队列-->

		<!-- 二维码超时会 出现刷新按钮，要求再次刷新 -->

	</div>
</template>

<script>
	export default {
		name: "signin-qrcode",
		data() {
			return {
				qrimg: 'success'
			}
		},
		methods: {
			//	获取方法，以及二维码
		}

	};
</script>

<style scoped lang="scss">
	@import "../../../global";

	.qrcode-box {
		@include vertical-theme;
	}

	.textCenter {
		text-align: center;
	}

	.bottomWrapper {
		@include horizontal-theme;
		justify-content: space-around;
		font-size: 12px;
		color: #777777;
	}
</style>
