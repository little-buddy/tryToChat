<template>
	<div class="container bg">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "App"
	};
</script>

<style lang="scss">
	@import './assets/font/iconfont.css';

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.bg {
		background-color: #e7ecf0;
	}
</style>
