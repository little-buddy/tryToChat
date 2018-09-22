<template>
	<div
		class="chat-avater-li chat-avater-small"
		@mouseenter="mouseEnter"
		@mouseleave="mouseLeave"
	>
		<chat-avater
			v-if="!$slots.default"
			class="chat-avater-small"
			:src="info.avater"
			@statusChange="()=>{}"
		></chat-avater>
		<slot
			v-else
		></slot>
		<span
			v-if="!$slots.default&&canClose"
			class="iconfont icon-chacha"
			@click.stop="$emit('close')"
		></span>
	</div>
</template>

<!-- 这里就涉及到组件跨层了 -->
<script>
	import avater from "./avater";

	export default {
		name: "chat-avater-li",
		components: {
			[avater.name]: avater
		},
		props: {
			info: {}
		},
		data() {
			return {
				canClose: false,
				point: null
			};
		},
		methods: {
			mouseEnter($event) {
				// 如果没有绑定事件，这个emit 是相当于没有触发的
				// if (!lock){
				// 	const { x, y } = $event;
				// 	point
				// }
					const { x, y } = $event;
				console.log($event, x, y);

				// 添加一个 username 提示框
				this.$emit("mouseOver", this.info.account, "account");
				this.canClose = true;
			},
			mouseLeave() {
				// 取消一个username 提示框
				this.$emit("mouseOver", "", "account");
				this.canClose = false;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import 'variable';

	/* 这里组件分多少级？ */

	.chat-avater-li {
		position: relative;
		&:hover .chat-avater {
			border-color: $--avater-hover-color;
		}
	}

	.icon-chacha {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-50%);
		font-size: $iconSize;
		color: $error;
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
