<template>
	<div class="chat-avatar-box">
		<div class="chat-avatar-ul" ref="$ul">
			<chat-avatar-solo
				v-for="(user,index) in avatarList"
				class="chat-avatar-li"
				:account="user.account"
				:canClose="isListEnd(index)"
				:hoverHandle="hoverHandle(index)"
				@closeEvent="removeByIndex(index)"
				@click.native="toChoose($event,index)"
				:key="index"
			>
				<chat-avatar
					v-if="isListEnd(index)"
					:src="user.avatar"
					:nickname="user.nickname"
				></chat-avatar>
				<div
					v-else
					class="chat-avatar-small"
					@click.native="toChoose($event)"
				>
					<div class="addAvater"></div>
				</div>
			</chat-avatar-solo>
		</div>
		<div
			v-if="mask"
			class="chat-avatar-ul-curU"
		>
			<chat-avatar
				class="animation"
				:src="activeAvater.avatarUrl"
				:style="aniStyle"
				:class="aniClass"
				@click.native="noChoose()"
			></chat-avatar>
		</div>
	</div>
</template>

<script>
	import avatar from "./avatar";
	import avatarSolo from "./avatarSolo";

	const defaultAvater = require("@/assets/img/me.jpg");
	// no secure
	const aniTime = 700;
	export default {
		name: "chat-avatar-choose",
		components: {
			[avatar.name]: avatar,
			[avatarSolo.name]: avatarSolo
		},
		props: {
			avatarList: {
				type: Array,
				default: () => ([{}])
			},
			current: {
				type: Number,
				default: 0
			},
			liMouseEnter: Function
		},
		mounted() {
			// init 初始化位置
			const { offsetLeft: left, offsetTop: top } = this.$refs.$ul.children[0]
			this.activeAvater.location = { left, top }
			//	我们也可以只记录那个 index，让它 对index进行响应，但是必须获取$event 事件的
		},
		data() {
			this.avatarList.push({})
			return {
				// big avatar
				mask: true,
				// 节流锁
				lock: false,
				activeAvater: {
					avatarUrl:
						this.avatarList[this.current] ? this.avatarList[this.current].avatar :
							defaultAvater,
					// [warning]! this value depend on css value
					location: {}
				},
				aniStyle: null,
				aniClass: "chat-avatar-large",
				hoverArg: {
					name: "",
					style: ""
				}
			};
		},
		methods: {
			removeByIndex(index) {
				this.avatars.splice(index, 1);
			},
			isListEnd(index) {
				return this.avatarList.length !== (index + 1)
			},
			hoverHandle(index) {
				return (account) => {
					this.$emit('hoverEvent', account)
				}
			},
			toChoose($event, index) {
				// 防抖
				if (this.lock) {
					return;
				}
				let top = null;
				let left = null
				if ($event !== undefined && index !== undefined) {
					this.activeAvater = index !== this.avatarList.length - 1
						? { avatarUrl: this.avatarList[index].avatar }
						: { avatarUrl: defaultAvater }; // default
					// offset relative to parentNode
					const _node = $event.currentTarget
					const { offsetLeft, offsetTop } = _node;
					// TODO 现阶段去jquery，那么一些动画兼容api 是怎么处理的呢？
					// parentNode 是w3c标准，parentElement是IE标准，offsetParent 是指与位置有关的父元素(relative)，而其余不是

					// element.style 内联样式
					// getComputedStyle 获取的是最终样式，会包含css中的样式

					// 需要获取父元素的padding
					// overflow
					const { scrollTop } = _node.parentNode;
					left = offsetLeft;
					top = offsetTop - scrollTop;
					// cache for clear
					this.activeAvater.location = { left, top };
				} else {
					this.activeAvater.avatarUrl = defaultAvater
					left = this.activeAvater.location.left
					top = this.activeAvater.location.top
				}

				// css 元素的宽高
				this.aniStyle = {
					top: `${top}px`,
					left: `${left}px`
				};
				this.aniClass = "chat-avatar-small";

				// this.$forceUpdate 需要满足一定的时间间隔 才能去触发，写angular的时候就觉得forceUpdate太暴力了
				// 解决暴力的办法就是预先在data内声明，这里说它是纯组件，我都不信，超耦合的ui响应，以及对应的css名称
				// 不过这里的css 是可以写成transition的形式的

				// 这里还是需要一定间隔的，否则频繁点击就等效nextTick功能了
				setTimeout(() => {
					this.aniStyle = null;
					this.aniClass = "chat-avatar-large";
				}, 100);
				// animation end to run
				this.lock = true;
				this.mask = true;
				setTimeout(() => {
					this.lock = false;
				}, aniTime);
			},
			noChoose() {
				if (this.lock) {
					return;
				}
				const { top, left } = this.activeAvater.location;
				this.aniClass = "chat-avatar-small";
				this.aniStyle = { top: `${top}px`, left: `${left}px` };
				this.lock = true;
				setTimeout(() => {
					this.aniClass = null;
					this.aniStyle = null;
					this.lock = false;
					this.mask = !this.mask;
				}, aniTime);
			}

		}
	};

</script>

<style lang="scss">
	@import 'common';

	.chat-avatar-box {
		position: relative;
		align-self: stretch;
	}

	.chat-avatar-ul-curU {
		position: absolute;
		background-color: #fff;
		/*width: 100%;*/
		/*height: 200px;*/
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.animation {
		transition: margin-top .7s, margin-left .7s, top .7s, left .7s, width .7s, height .7s;
		&:hover {
			border-color: $blue;
		}
	}

	/* transition */
	.chat-avatar-large {
		left: 50%;
		margin-left: -($avatarL/2);
		margin-top: -($avatarL/2);
		top: 50%;
	}

	.chat-avatar-ul {
		height: 200px;
		padding: $iconSize/2 0; /* 为了显示 chacha 而设的 */
		overflow: scroll;
		& .chat-avatar-li {
			position: relative;
			margin-left: $homeWidth/16;
			margin-top: $homeWidth/32;
			float: left;
		}
		&:after {
			content: '';
			clear: both;
		}
	}

	.addAvater {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 2px solid $bgColor;
		&:hover {
			border-color: #94d5fe;
		}
		border-radius: 50%;
		&:after, &:before {
			$height: 2px;
			$width: $avatarS*0.6;
			content: '';
			position: absolute;
			width: $width;
			height: $height;
			top: 50%;
			left: 50%;
			background-color: $bgColor;
		}
		&:before {
			transform: translate(-50%, -50%);
		}
		&:after {
			transform-origin: 50% 50%;
			transform: translate(-50%, -50%) rotate(90deg);
		}
	}
</style>

<!-- 事实证明。复杂的ui交互。并不比业务来得简单 -->
