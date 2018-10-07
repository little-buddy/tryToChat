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
		@include fullScreen;
	}

	.bg {
		background-color: $bgColor;
	}

	.horizontalLayout {
		@include horizontal-theme;
	}
</style>
