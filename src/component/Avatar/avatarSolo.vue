<template>
	<div
		@mouseenter="onOverHandle"
		@mouseleave="onOutHandle"
	>
		<slot></slot>
		<div
			v-if="canClose&&hoverMark"
			class="iconfont icon-chacha"
			@click="$emit('closeEvent')"
		></div>
	</div>
</template>
<!-- 我们要触发父元素带动子元素的更新，就需要 使用ref去拿到子元素并且emit一下 -->
<script>
	import avatar from "./avatar";

	export default {
		name: "chat-avatar-solo",
		components: {
			[avatar.name]: avatar
		},
		props: {
			canClose: {		// 默认是可以关闭的
				type: Boolean,
				default: true
			},
			account: String,
			hoverHandle: Function
		},
		data() {
			return {
				hoverMark: false
			};
		},
		methods: {
			onOverHandle($event) {
				this.hoverMark = true
				this.hoverHandle(this.account)
			},
			onOutHandle($event) {
				this.hoverMark = false
				// 我这边必须获取一个parent，但是一旦获取了parent，意味着这个组件存在了耦合
				// 我需要剔除 这个 子父元素的耦合
				if (!this.$parent.mask)
					this.hoverHandle("")
			},
		}
	};
</script>
<!-- 其实它这里是有2 类事件的 hover click -->

<style scoped lang="scss">
	@import 'variable';

	/* 这里组件分多少级？ */

	.chat-avatar-li {
		position: relative;
		&:hover .chat-avatar {
			border-color: $--avatar-hover-color;
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
