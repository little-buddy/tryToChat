<template>
	<div
		class="chat-avater"
		:style="{backgroundImage:'url('+src+')'}"
	>
		<div
			v-if="needLogin"
			class="chat-login-status"
			:class="statusClass"
			@click.stop="change"
		></div>
	</div>
</template>

<script>
	export default {
		name: "chat-avater",
		mode: "functional",
		props: {
			src: String,
			loginStatus: [Boolean,undefined]
		},
		computed: {
			needLogin() {
				return this.loginStatus !== undefined;
			},
			statusClass() {
				return ''
				if (logingStatus) {
					return "chat-login-online";
				}
				return "chat-login-hidden";
			}
		},
		methods: {
			change() {
				const flag = !this.loginStatus;
				this.loginStatus = flag;
				this.$emit("statusChange", flag);
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "variable";

	/* 大概准守的是这样一个规则，就是一般上层不添加css，下层就是默认的 */

	.chat-avater {
		position: relative;
		box-sizing: border-box;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		@include circle;
	}

	.chat-login-status {
		position: absolute;
		width: $iconSize;
		height: $iconSize;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%, -50%);

		@include circle;
	}

	.chat-login-online {
		background-color: $--avater-online-color;
	}

	.chat-login-hidden {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		background-color: $--avater-hidden-color;
		&:before, &:after {
			content: '';
			background-color: darken($--avater-hidden-color, 20%);
			width: 10px;
			height: 3px;
			border-radius: 2px;
		}
	}
</style>

<!-- 这里如果要做响应式，就需要全线切入 rem -->

<!-- 那么一般的站点是怎么做到的呢？普通的文档很简单，就是那样 -->

<!-- 这里的avater 如果不分开来实现，那又怎么实现呢？我觉得一定是分开来实现的。 -->

<!-- 不光是vue中，而是所有web端，一旦将组件之间的样式分开。你就需要去父级写样式，毕竟有些样式是和父级相关联的 -->

<!-- 但是在移动端用rem，似乎又可以忽略这一点，这个项目我初期并不打算考虑，移动端优化，后续一定会再重构一次 -->

<!-- 原来vue的所谓 emit触发更新事件，实际上维护的是2
份数据，子组件更新完数据，将这个数据再发送到父组件更新，他们各自维护一份数据，所以对于大型项目来说还是有必要使用vuex
，通过一份数据来达到触发所有组件更新，对于组件内部来说可能用不到vuex，但是事务处理是必须上的，不然数据管理会比较混乱
 -->
