<template>
	<div class="chat-login">
		<h1 class="chat-title">We Chat Here ~</h1>
		<br>
		<transition>
			<router-view></router-view>
		</transition>
		<br>
		<div>logo</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
	};
</script>

<style scoped lang="scss">
	@import "../../global";

	.chat-login {
		@include fullScreen;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chat-title {
		font-style: $h1;
	}

</style>
