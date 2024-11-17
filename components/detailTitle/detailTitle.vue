<template>
	<!-- 组队详情的标题封装组件：传入图片地址和标题即可复用样式与缩略 -->
	<view class="detailTitle">
		<image :src="props.imgSrc" mode=""></image>
		<p style="color: #808080;font-size: 32rpx; margin-left: 12rpx;">{{props.pTitle}}</p>
	</view>
</template>

<script setup>
	const props=defineProps({
	    imgSrc: String,
	    pTitle: String
	});
</script>

<style lang="scss" scoped>
	.detailTitle{
		display: flex;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
		}
	}

</style>