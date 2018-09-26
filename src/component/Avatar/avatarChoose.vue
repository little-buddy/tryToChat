<template>
	<div class="chat-avatar-box">
		<div class="chat-avatar-ul">
			<div
				v-for="(user,index) in avatarList"
				class="chat-avatar-li"
			>
				<!-- 这里我不想要传递index啊 -->
				<chat-avatar-solo
					:account="user.account"
					:canClose="isListEnd(index)"
					@closeEvent="removeByIndex(index)"
					:hoverHandle="hoverHandle(index)"
					:key="index"
				>
					<chat-avatar
						v-if="isListEnd(index)"
						:src="user.avatar"
						:nickname="user.nickname"
						@click.native="toChoose($event,index)"
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
		</div>
	</div>
</template>

<script>
	import avatar from "./avatar";
	import avatarSolo from "./avatarSolo";

	const defaultAvater = require("@/assets/img/me.jpg");
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
					location: { top: 18, left: 16 }
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
				if (this.lock) {
					return;
				}
				// offset relative to parentNode
				const { offsetLeft, offsetTop } = $event.currentTarget;
				// overflow
				const { scrollTop } = $event.currentTarget.parentNode;
				this.activeAvater = index !== undefined ?
					{ avatarUrl: this.items[index].avatar } :
					// default
					{ avatarUrl: defaultAvater };

				const left = offsetLeft;
				const top = offsetTop - scrollTop;
				// cache
				this.activeAvater.location = { left, top };
				// 获取元素的宽高
				this.aniStyle = {
					top: `${top}px`,
					left: `${left}px`
				};
				this.aniClass = "chat-avatar-small";

				// this.$forceUpdate 需要满足一定的时间间隔 才能去触发，写angular的时候就觉得forceUpdate太暴力了
				// 解决暴力的办法就是预先在data内声明，这里说它是纯组件，我都不信，超耦合的ui响应，以及对应的css名称
				// 不过这里的css 是可以写成transition的形式的

				// 用 setTimeout 做vue的动画是真的有点丑啊

				// $nextTick 并不是在第一次渲染队列渲染完成后执行，而是在第一次渲染完成虚拟dom之后操作，最终是一次更新到tree

				// 这里还是需要一定间隔的，否则频繁点击就等效nextTick功能了
				setTimeout(() => {
					this.aniStyle = null;
					this.aniClass = "chat-avatar-large";
				}, 100);
				// animation end to run
				setTimeout(() => {
					this.lock = false;
				}, aniTime);

				this.lock = true;
				this.mask = !this.mask;
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
					this.activeAvater = null;
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
		width: 100%;
		height: 200px;
		top: 0;
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

<!-- 我感觉我写的不像是组件，反而已经是业务组件了 -->

<!--
react 如果要做这个的话，要么组件一层一层传值，要么使用context
API。组件库是不可能上react-redux的，当然使用redux也是可以的，毕竟没多少kb的api
 -->
