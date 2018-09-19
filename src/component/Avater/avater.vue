<template>
	<div
		class="avater"
		:style="{backgroundImage:'url('+avaterUrl+')'}"
	>
		<div
			v-if="needLogin"
			class="loginStatus"
			:class="{online:loginStatus,hidden:!loginStatus}"
			@click.stop="change"
		></div>
	</div>
</template>

<script>
	export default {
		name: "chat-avater",
		mode: "functional",
		props: {
			avaterUrl: String,
			loginStatus: Boolean
		},
		computed: {
			needLogin() {
				return this.loginStatus !== undefined;
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

	.avater {
		position:relative;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border: 2px solid #fefefe;
		&:hover {
			border-color: #94d5fe;
		}
		border-radius: 50%;
	}

	.loginStatus {
		position: absolute;
		bottom: -$iconSize/2;
		left: 50%;
		margin-left: -$iconSize/2;
		width: $iconSize;
		height: $iconSize;
		border-radius: 50%;
	}

	.online {
		$green: #6fda43;
		background-color: $green;
	}

	.hidden {
		$yellow: #e9c555;
		background-color: $yellow;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		&:before, &:after {
			content: '';
			background-color: darken($yellow, 20%);
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
