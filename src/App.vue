<template>
	<div class="container bg">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: "App"
	};
</script>

<style lang="scss">
	@import './assets/font/iconfont.css';
	@import "./global";

	body {
		user-select: none;
		font-family: 'Menlo';
	}

	a {
		text-decoration: none;
	}

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.bg {
		background-color: $bgColor;
	}
</style>
