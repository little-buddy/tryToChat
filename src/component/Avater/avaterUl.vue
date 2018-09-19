<template>
	<div class="boxWrapper">
		<div class="ul">
			<avater-li
				v-for="(ava,index) in avaters"
				:avater-url="ava.avaterUrl"
				@close="removeByIndex(index)"
				@click.native="trrigerChoose($event,index)"
				:key="index"
			></avater-li>
		</div>
		<div
			v-if="mask"
			class="boxWrapper above"
		>
			<avater
				class="animation"
				:class="aniClass"
				:style="aniStyle"
				:avater-url="activeAvater.avaterUrl"
				:login-status="lock?undefined:true"
				@click.native="trrigerChoose"
			></avater>

		</div>
	</div>
	<!-- 这里会有1个class，然后用animation去做这个动画，或者延迟驱动这个动画 -->
	<!-- 所以这里的 avater 该怎么去维护呢？ -->
	<!-- 这里的 avater 应该有一个style -->
</template>

<script>
	import avater from "./avater";
	import avaterLi from "./avaterLi";

	export default {
		name: "avater-ul",
		components: {
			avater,
			[avaterLi.name]: avaterLi
		},
		data() {
			return {
				avaters: [
					{
						avaterUrl: require("@/assets/img/avater1.jpeg")
					},
					{
						avaterUrl: require("@/assets/img/avater2.jpg")
					},
					{
						avaterUrl: require("@/assets/img/me.jpg")
					},
					{
						avaterUrl: null
					}
				],
				mask: false
				// activeAvater:
			};
		},
		methods: {
			removeByIndex(index) {
				this.avaters.splice(index, 1);
			},
			trrigerChoose($event, index) {
				if (this.lock) {
					return;
				}
				if (!this.mask) {
					const { offsetLeft, offsetTop } = $event.currentTarget;
					const { scrollTop } = $event.currentTarget.parentNode;
					this.activeAvater = this.avaters[index];
					const left = offsetLeft;
					const top = offsetTop - scrollTop;
					// cache
					this.activeAvater.location = { left, top };
					// 获取元素的宽高
					this.aniStyle = {
						top: `${top}px`,
						left: `${left}px`
					};
					this.aniClass = "avater-small";
					setTimeout(() => {
						this.aniStyle = null;
						this.aniClass = "avater-large";
						this.$forceUpdate();
						// 为什么要更新下啊，这 tm 和angular啥区别，说this内的变量可能更新不了所以需要手动更新下
						// 而 nextTick 直接将操作放在了一个渲染事件内，不会产生动画效果
						// 原来angualr额时候就是拿 this 一顿操作代码比较难看的
					}, 1);
					setTimeout(() => {
						this.lock = false;
						this.$forceUpdate();
					}, 700);
					this.lock = true;
					this.mask = !this.mask;
					//	它是一次性形成一个DOM 队列，然后依次更新的，$nextTick 可以去到更新后的DOM
				} else {
					const { top, left } = this.activeAvater.location;
					this.aniClass = "avater-small";
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

	.boxWrapper {
		position: relative;
		width: 100%;
		height: 200px;
		padding: $defaultBorderRadius 0;
		overflow: scroll;
	}

	.above {
		position: absolute;
		background-color: #fff;
		top: 0;
	}

	.animation {
		transition: margin-top .7s, margin-left .7s, top .7s, left .7s, width .7s, height .7s;
	}

	/*,width,height,top,left */
	.avater-large {
		left: 50%;
		margin-left: -$avaterL/2;
		margin-top: -$avaterL/2;
		top: 50%;
	}

	.ul {
		height: 200px;
		box-sizing: border-box;
		padding: $defaultBorderRadius 0;
		overflow: scroll;
		& .mecontainer {
			margin: $defaultBorderRadius;
		}
		& > div {
			float: left;
		}
		&:after {
			content: '';
			clear: both;
		}
	}
</style>

<!-- 这里已经是一个容器组件了 -->

<!-- 组件的层级比较浅，所以可以不用vuex，一层一层往下传，或者 provider inject 依赖注入 -->

<!--
react 如果要做这个的话，要么组件一层一层传值，要么使用context
API。组件库是不可能上react-redux的，当然使用redux也是可以的，毕竟没多少kb的api
 -->

<!-- 这里我在想。如何确定这个位置。这个问题。在scroll里面也是存在的 -->

<!-- 这里要给个加号。不然没办法的，且不能有叉 -->

