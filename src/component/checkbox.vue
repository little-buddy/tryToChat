<template>
	<div
		:style="styleTheme"
		style="display:flex;align-items:center;"
	>
		<div
			class="location"
			:class="{noChoose:!checked,'iconfont icon-checkbox':checked}"
			@click="mychecked"></div>
		<input
			type="checkbox"
			:id="name"
			:checked="checked"
			@change="$emit('change',$event.target.checked)"
		>
		<label :for="name">{{text}}</label>
		<!-- 在vue中是用input去驱动 复选框，只不过视图根据需求自建 -->
		<!-- 果然还是需要一个状态管理机，ele以某种方式实现了 dispatch的分发 -->

	</div>
</template>

<script>
	export default {
		name: "chat-checkbox",
		model: {
			prop: "checked",
			event: "change"
		},
		props: {
			name: String,
			text: String,
			checked: Boolean,
			styleTheme: String
		},
		methods: {
			mychecked() {
				this.$emit("change", !this.checked);
			}
		}

	};
</script>

<style scoped lang="scss">
	:root {
		--radius: 14px;
		--blue: #338ffc;
	}

	input[type=checkbox] {
		visibility: hidden;
	}

	.location {
		position: absolute;
		margin-left: -10px;
	}

	.noChoose {
		width: calc(var(--radius) - 1px);
		height: calc(var(--radius) - 1px);
		border-radius: 50%;
		border: 1px solid gray;
		flex-shrink: 0;
		&:hover {
			border-color: var(--blue);
			box-shadow: var(--blue) 0 0 2px 1px;
		}
	}

	.icon-checkbox {
		color: var(--blue);
		font-size: var(--radius);
	}
</style>
