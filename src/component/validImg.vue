<template>
	<div>
		<img :src="src" alt="pic" :style="rect" ref="$img">
		<div>
			<div>拖动块，左侧可以添加一些色彩</div>
		</div>
		<img :src="block" alt="">
		<!-- 我们可以拿一个左下角的坐标点，然后进行传递,通过绑定一个事件来获取是否成功 -->
		<!-- 网络上的滑块都是将屏幕截图对比像素点，当小于某个范围就确定是匹配成功，大部分的运算在后端 -->
		<!--
		 而我此番想做的是留在前端，通过服务器获取图片，然后本地根据 canvas进行操作，最终判断预留的x和它的x，若一致就发送请求
		 我的想法的缺点就是别人知道我的请求路径可以直接跳过这个码的验证
		 本地也可以每隔1s向服务器请求，如果位置没有发生改变就不发请求，很多验证都是要放在服务端的
		-->
	</div>
</template>

<script>
	import { defaultImg } from "@/constants";

	export default {
		name: "valid-img",
		props: {
			src: {
				type: String,
				default: defaultImg
			},
		},
		data() {
			return {
				width: 360,
				height: 220,
				block: null
			}
		},
		computed: {
			rect() {
				return {
					width: `${this.width}px`,
					height: `${this.height}px`
				}
			}
		},
		mounted() {
			const canvas = document.createElement('canvas')
			const { width, height } = this
			canvas.width = width
			canvas.height = height
			const ctx = canvas.getContext('2d')
			const img = new Image()
			img.src = defaultImg
			img.onload = () => {
				// drawImage 默认是裁剪
				// 我们也可以通过 drawImage 的形式去切图片，然后通过 svg进行处理，也可以直接使用svg + overflow 实现吧
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height)
				const len = 0.1 * width
				const maskRect = {
					width: len,
					radius: len / 6
				}

				const point = {
					x: Math.floor(Math.random() * (width + 1)),
					y: Math.floor(Math.random() * (height + 1)),
				}
				if (point.x + len > width) {
					point.x -= len
				}
				if (point.y + len > height) {
					point.y -= len
				}
				ctx.rect(point.x, point.y, len, len)
				ctx.stroke()
				// 这里需要随机生成方向，默认 顺时针
				const arr = [
					{ x: point.x + len / 2, y: point.y, start: 1, end: 0 },
					{ x: point.x, y: point.y + len / 2, start: 0.5, end: 1.5 },
					{ x: point.x + len / 2, y: point.y + len, start: 2, end: 1 },
					{ x: point.x + len, y: point.y + len / 2, start: 1.5, end: 0.5 }
				]
				const sup = Math.floor(Math.random() * 4)
				for (let j = 0; j < 2; j += 1) {
					const direction = arr[(sup + j) % 4]
					ctx.beginPath()
					ctx.arc(direction.x, direction.y, maskRect.radius, direction.start * Math.PI, direction.end * Math.PI)
					ctx.stroke()
				}
				ctx.clip()

				this.block = canvas.toDataURL()
			}

			// clip 只支持绘画裁剪，并不会让画布内容变小，而getImageData 只支持矩形裁剪，最终还是要绘制出规则图形，用svg包裹处理
			// 开始截取这个图形的图片，然后用一个svg包裹起来


			// 简单太 low。那么我们就复杂一点

			// 确定一个坐标点，然后通过svg的形式进行绘画或者截取
			// 那么拼图的样式怎么画呢？

			// 这里我们没有使用外界库

			//	确定一个随机点
		}
	}
</script>

<style scoped lang="scss">

</style>
