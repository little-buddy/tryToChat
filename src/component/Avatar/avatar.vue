<template>
	<div
		class="chat-avatar chat-avatar-small"
		:class="{circle:isCircle}"
		:style="{backgroundImage:'url('+src+')'}"
		@mouseenter="onMouseHoverHandle"
		@mouseleave="onMouseHoverHandle"
	>
		<!-- login status -->
		<div
			v-if="loginStatus!==undefined"
			class="chat-login-status"
			:class="loginStatusClass"
			@click.stop="change"
		></div>
		<!-- hover name -->
		<div
			v-if="hoverSwitch"
			class="avatar-hover-name"
			:style="nameStyle"
		>
			{{nickname}}
		</div>
	</div>
</template>

<script>
	export default {
		name: "chat-avatar",
		props: {
			src: {
				type: String,
				default: require("@/assets/img/me.jpg")
			},
			// 是否需要登陆状态的控制,不传递就不显示，传递true在线，false隐藏
			loginStatus: () => ([undefined, Boolean]),	// [undefinde,true,false]
			isCircle: {
				type: Boolean,
				default: true
			}, // 用于控制头像是否是圆圈，默认为圆圈
			nickname: String
		},
		data() {
			return {
				hoverSwitch: false,
				nameStyle: {}
			};
		},
		computed: {
			loginStatusClass() {
				if (this.loginStatus) {
					return "chat-login-online";
				}
				return "chat-login-hidden";
			}
		},
		methods: {
			change() {
				// 不知道这里的 loginStatus 是否会执行
				this.$emit("statusChange", this.loginStatus = !this.loginStatus);
			},
			onMouseHoverHandle($event) {
				//	这里的用户名是根据头像div的坐标系建立
				if (!this.nickname) {
					return;
				}
				if (this.hoverSwitch) {
					this.hoverSwitch = false
					return;
				}
				const { offsetX, offsetY } = $event;
				// 取 x y 的时候会要判断父轴的距离，我不知道是不是根据 position:relative 来计算的
				const location = { top: `${offsetY}px`, left: `${offsetX}px` };

				// 最终这里在运算的过程中还是会跟 css共享常数变量的，如果要响应式的话，需要rem换算的
				// 目前定义的是
				const width: number = 250
				// use wrapperWidth \ boxNode \ curNode 侵入性看起来有点强呀
				// TODO 其实这里还应该获取显示元素的宽度进行判断，或者定死用 ... 显示
				const left = $event.target.parentNode.parentNode.offsetLeft + offsetX
				if (left > width - $event.target.offsetWidth) {
					location.left = 0
				}
				this.nameStyle = location
				this.hoverSwitch = !this.hoverSwitch;
			},
		}
	};
</script>

<style scoped lang="scss">
	@import "variable";

	.chat-avatar {
		position: relative;
		box-sizing: border-box;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		/* 如果这里使用 transparent，好像会存在问题，需要确认一下 border-box 和 border-raidus 的关系 */
		border: 2px solid #fff;
	}

	.circle {
		@include circle;
	}

	.avatar-hover-name {
		position: absolute;
		padding: 4px;
		background-color: #{$miyellow}90;
		z-index: 999;
	}

	.chat-login-status {
		position: absolute;
		width: $iconSize;
		height: $iconSize;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 50%);

		@include circle;
	}

	.chat-login-online {
		background-color: $--avatar-online-color;
	}

	.chat-login-hidden {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		background-color: $--avatar-hidden-color;
		&:before, &:after {
			content: '';
			background-color: darken($--avatar-hidden-color, 20%);
			width: 10px;
			height: 3px;
			border-radius: 2px;
		}
	}
</style>

<!-- 这里如果要做响应式，就需要全线切入 rem -->

<!-- 但是在移动端用rem，似乎又可以忽略这一点，这个项目我初期并不打算考虑，移动端优化，后续一定会再重构一次 -->

<!-- 原来vue的所谓 emit触发更新事件，实际上维护的是2
份数据，子组件更新完数据，将这个数据再发送到父组件更新，他们各自维护一份数据，所以对于大型项目来说还是有必要使用vuex
，通过一份数据来达到触发所有组件更新，对于组件内部来说可能用不到vuex，但是事务处理是必须上的，不然数据管理会比较混乱
 -->
