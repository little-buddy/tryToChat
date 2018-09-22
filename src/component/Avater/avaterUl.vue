<template>
	<div class="chat-avater-box">
		<div class="chat-avater-ul">
			<chat-avater-li
				v-for="(user,index) in items"
				:info="user"
				@close="removeByIndex(index)"
				@click.native="toChoose($event,index)"
				@mouseOver="(value,type)=>{liMouseEnter(value,type)}"
				:key="index"
			></chat-avater-li>
			<chat-avater-li
				:info="{}"
				class="'chat-avater-small'"
				@click.native="toChoose($event)"
			>
				<div class="addAvater"></div>
			</chat-avater-li>
		</div>
		<div
			v-if="mask"
			class="chat-avater-ul-curU"
		>
			<chat-avater
				class="animation"
				:class="aniClass"
				:style="aniStyle"
				:src="activeAvater.avaterUrl"
				:need-status="!lock"
				@click.native="noChoose"
			></chat-avater>
		</div>
	</div>
</template>

<script>
	import avater from "./avater";
	import avaterLi from "./avaterLi";

	const defaultAvater = require("@/assets/img/me.jpg");
	const aniTime = 700;
	export default {
		name: "chat-avater-ul",
		components: {
			[avater.name]: avater,
			[avaterLi.name]: avaterLi
		},
		props: {
			items: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			},
			liMouseEnter: Function
		},
		mounted(){
			console.log(this.liMouseEnter)
		},
		data() {
			console.log(this.liMouseEnter);
			return {
				mask: true,
				lock: false,
				activeAvater: {
					avaterUrl:
						this.items[this.current] ? this.items[this.current].avater :
							defaultAvater,
					// [warning]! this value depend on css value
					location: { top: 18, left: 16 }
				},
				aniStyle: null,
				aniClass: "chat-avater-large"
			};
		},
		methods: {
			removeByIndex(index) {
				this.avaters.splice(index, 1);
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
					{ avaterUrl: this.items[index].avater } :
					// default
					{ avaterUrl: defaultAvater };

				const left = offsetLeft;
				const top = offsetTop - scrollTop;
				// cache
				this.activeAvater.location = { left, top };
				// 获取元素的宽高
				this.aniStyle = {
					top: `${top}px`,
					left: `${left}px`
				};
				this.aniClass = "chat-avater-small";

				// this.$forceUpdate 需要满足一定的时间间隔 才能去触发，写angular的时候就觉得forceUpdate太暴力了
				// 解决暴力的办法就是预先在data内声明，这里说它是纯组件，我都不信，超耦合的ui响应，以及对应的css名称
				// 不过这里的css 是可以写成transition的形式的

				// 用 setTimeout 做vue的动画是真的有点丑啊

				// $nextTick 并不是在第一次渲染队列渲染完成后执行，而是在第一次渲染完成虚拟dom之后操作，最终是一次更新到tree

				// 这里还是需要一定间隔的，否则频繁点击就等效nextTick功能了
				setTimeout(() => {
					this.aniStyle = null;
					this.aniClass = "chat-avater-large";
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
				this.aniClass = "chat-avater-small";
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

	.chat-avater-box {
		position: relative;
	}

	.chat-avater-ul-curU {
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
	.chat-avater-large {
		left: 50%;
		margin-left: -($avaterL/2);
		margin-top: -($avaterL/2);
		top: 50%;
	}

	.chat-avater-ul {
		height: 200px;
		padding: $iconSize/2 0; /* 为了显示 chacha 而设的 */
		box-sizing: border-box;
		overflow: scroll;
		& .chat-avater-li {
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
			$width: $avaterS*0.6;
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
