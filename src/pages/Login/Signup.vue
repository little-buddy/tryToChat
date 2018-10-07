<template>
    <div>
			<div>
				<input type="text" placeholder="手机号">
			</div>
			<div>
				<input type="text" placeholder="验证码">
				<!-- 通过手机号注册生成一个QQ号，并且只能通过QQ号进行登录 -->
				<!-- 注册是一长串信息，我建议暂时不填，社交类软件的注册就是很繁琐。毕竟没有功能型的软件来的简单只要唯一就好了。 -->
			</div>
		</div>
</template>

<script>
  export default {
    name: "Login"
  };
</script>

<style scoped>

</style>
