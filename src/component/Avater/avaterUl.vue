<template>
	<div class="chat-avater-box">
		<div class="chat-avater-ul">
			<chat-avater-li
				v-for="(user,index) in items"
				:info="user"
				@close="removeByIndex(index)"
				@click.native="trrigerChoose($event,index)"
				:key="index"
			></chat-avater-li>
			<chat-avater-li
				:info="{}"
				class="'chat-avater-small'"
				@click.native="trrigerChoose($event)"
			>
				<div class="addAvater"></div>
			</chat-avater-li>
		</div>
		<div
			v-if="mask"
			class="chat-avater-ul-curU above"
		>
			<chat-avater
				class="animation"
				:class="aniClass"
				:style="aniStyle"
				:src="activeAvater.avaterUrl"
				:login-status="lock?undefined:true"
				@click.native="trrigerChoose"
			></chat-avater>
		</div>
	</div>
</template>

<script>
	import avater from "./avater";
	import avaterLi from "./avaterLi";

	export default {
		name: "chat-avater-ul",
		components: {
			[avater.name]: avater,
			[avaterLi.name]: avaterLi
		},
		props: {
			items: Array,
			current: Number
		},
		data() {
			return {
				mask: true,
				lock: false,
				activeAvater: {
					avaterUrl: this.items[0].avater,
					location: { top: 0, left: 0 }
				},
				aniStyle: null,
				aniClass: "chat-avater-large",
				avater: require("@/assets/img/me.jpg")
			};
		},
		methods: {
			removeByIndex(index) {
				this.avaters.splice(index, 1);
			},
			// 2个方案嘛，一种宽高写死，通过计算而不是预先加载元素来定位。另一种就是预先加载元素，不用写死宽高
			trrigerChoose($event, index) {
				if (this.lock) {
					return;
				}
				if (!this.mask) {
					const { offsetLeft, offsetTop } = $event.currentTarget;
					const { scrollTop } = $event.currentTarget.parentNode;
					this.activeAvater = index + 1 ?
						{ avaterUrl: this.items[index].avater } : {
							// default
							avaterUrl:
								require("@/assets/img/me.jpg")
						};
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
					setTimeout(() => {
						this.aniStyle = null;
						this.aniClass = "chat-avater-large";
						this.$forceUpdate();
						// 为什么要更新下啊，这 tm 和angular啥区别，说this内的变量可能更新不了所以需要手动更新下
						// 而 nextTick 直接将操作放在了一个渲染事件内，不会产生动画效果
						// 原来angualr额时候就是拿 this 一顿操作代码比较难看的
					}, 100);
					setTimeout(() => {
						this.lock = false;
						this.$forceUpdate();
					}, 700);
					this.lock = true;
					this.mask = !this.mask;
					//	它是一次性形成一个DOM 队列，然后依次更新的，$nextTick 可以去到更新后的DOM
				} else {
					const { top, left } = this.activeAvater.location;
					this.aniClass = "chat-avater-small";
					this.aniStyle = { top: `${top}px`, left: `${left}px` };
					this.lock = true;
					this.$forceUpdate();
					setTimeout(() => {
						this.activeAvater = null;
						this.aniClass = null;
						this.aniStyle = null;
						this.lock = null;
						this.mask = !this.mask;
					}, 700);
				}
			}
		}
	};
	//   这个组件用来 放用户，每个用户大概有 用户名 、 头像
</script>

<style lang="scss">
	@import 'common';

	.chat-avater-ul-curU, .chat-avater-box {
		position: relative;
		width: 100%;
	}
	.chat-avater-ul-curU{
		box-sizing: border-box;
		padding:0 $homeWidth/16;
		height:200px;
	}

	.above {
		position: absolute;
		background-color: #fff;
		top: 0;
	}

	.animation {
		transition: margin-top .7s, margin-left .7s, top .7s, left .7s, width .7s, height .7s;
	}

	/* transition */
	.chat-avater-large {
		left: 50%;
		margin-left: -$avaterL/2;
		margin-top: -$avaterL/2;
		top: 50%;
	}

	.chat-avater-ul {
		height: 200px;
		padding: $iconSize/2 0;
		overflow: scroll;
		& .chat-avater-li {
			margin-left: $homeWidth/16;
			margin-bottom: $homeWidth/32;
			float: left;
		}
		&:after {
			content: '';
			clear: both;
		}
	}

	/* 这里我要把它合到li里面去，这里面存在了 css 如何 解耦的问题，今天晚上就是把账号、用户名、的动态效果弄出来 */
	/* 这里出现了重复的css，我感觉是并不是一个很好的开始 */
	/* vue 这样写会有问题，首先在包装组件层它是可以传递class，则存在一个问题。一个组件的样式受2方约束，那么该怎么去实现这个class呢？ */
	/* 这一点在react就不会出现，因为最终所有的class都是以prop的形式填充在组件内 */
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
