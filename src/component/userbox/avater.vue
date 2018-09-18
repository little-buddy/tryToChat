<template>
	<!-- 是这里在执行,这里会有一个状态 -->
	<!-- 这里登陆状态，以及是否需要判断登陆状态 -->
	<!-- TODO 这里的test监听存在问题 -->
	<div
		class="container"
		:class="{'avater-small':false,'avater-large':true}"
		v-if="show"
		@mouseenter="trrigerClose"
		@mouseleave="trrigerClose"
	>
		<span
			v-if="test"
			class="iconfont icon-chacha"
			@click="closeMe"
		></span>
		<div
			class="avater"
			:class="{'avater-small':false,'avater-large':true}"
			:style="{backgroundImage:avater.userAvater}"
			@click="avater.avaterClick"
		>
		</div>
		<div
			v-if="needLogin"
			class="loginStatus"
			:class="{online:avater.loginStatus,hidden:!avater.loginStatus}"
			@click="loginStatusChange"
		></div>
	</div>
</template>

<script>
	export default {
		name: "chat-avater",
		props: {
			avater: Object
		},
		data() {
			return {
				show: true,
				test: false
			};
		},
		computed: {
			needLogin() {
				return this.avater.loginStatus === undefined ? false : true;
			},
		},
		methods: {
			loginStatusChange() {
				const flag = !this.avater.loginStatus;
				this.avater.loginStatus = flag;
				this.$emit("loginStatusEvent", flag);
			},
			closeMe() {
				this.show = false;
			},
			trrigerClose() {
				this.test = !this.test;
				console.log(this.test)
			}
		}
	};
</script>

<style scoped lang="scss">
	.container {
		position: relative;
	}

	.avater {
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		border: 2px solid #fefefe;
		&:hover {
			border-color: #94d5fe;
		}
		border-radius: 50%;
	}

	$avaterArr: (
		(name:small, size:50px),
		(name:middle, size:100px),
		(name:large, size:150px)
	);

	@for $i from 1 through length($avaterArr) {
		$item: nth($avaterArr, $i);
		.avater-#{map_get($item,name)} {
			width: map_get($item, size);
			height: map_get($item, size);
		}
	}

	$iconSize: 20px;
	.icon-chacha {
		$red: #ef7e77;
		color: $red;
		position: absolute;
		top: -$iconSize/2;
		left: 0;
		font-size: $iconSize;
	}

	.loginStatus {
		position: absolute;
		bottom: -$iconSize/2;
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
