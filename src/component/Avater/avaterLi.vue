<template>
	<div
		class="mecontainer"
		@mouseenter="trrigerClose"
		@mouseleave="trrigerClose"
	>
		<avater
			v-if="!$slots.default"
			class="avater-small"
			:avater-url="avaterUrl"
			:login-status="undefined"
			@statusChange=""
		></avater>
		<slot v-else="!$slots.default"></slot>
		<span
			v-if="canClose"
			class="iconfont icon-chacha"
			@click.stop="$emit('close')"
		></span>
	</div>
</template>

<!-- 这里就涉及到组件跨层了 -->
<script>
	import avater from "./avater";

	export default {
		name: "avater-li",
		components: {
			avater
		},
		props: {
			avaterUrl: String
		},
		data() {
			return {
				canClose: false
			};
		},
		methods: {
			trrigerClose() {
				this.canClose = !this.canClose;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import 'variable';

	.mecontainer {
		position: relative;
	}

	.icon-chacha {
		color: $error;
		position: absolute;
		top: -$iconSize/2;
		left: 0;
		font-size: $iconSize;
	}

</style>

<!--通过一份 scss 公共变量来维护多个组件之间的css-->

<!-- 这里需要控制头像，所以要把登陆的用户信息什么的放在这个位置 -->
<!-- 大概率是什么呢？人物头像、用户名 -->
<!-- 这里的用户状态到是跟 input:checkbox 很像 -->
<!-- 内部应该还有一个默认头像，可以供他使用 -->
<!-- 用css也可以进行处理，但是不能通过外界的字体大小去控制，而且一旦改了某个值你还需要跟着去改掉某些值，所以用css去写个图标库真的得不偿失 -->
<!-- 但是在移动端用rem，似乎又可以忽略这一点，这个项目我初期并不打算考虑，移动端优化，后续一定会再重构一次 -->

<!-- 原来vue的所谓 emit触发更新事件，实际上维护的是2
份数据，子组件更新完数据，将这个数据再发送到父组件更新，他们各自维护一份数据，所以对于大型项目来说还是有必要使用vuex
，通过一份数据来达到触发所有组件更新，对于租金来说可能用不到vuex，但是事务处理是必须上的，不然数据管理会比较混乱
 -->
