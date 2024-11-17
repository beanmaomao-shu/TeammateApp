<template>
	<view class="fcButton">
			<image :src="props.imgSrc" alt=""></image>
			<p class="title">{{props.Title}}</p>
			<p class="signal" :style="{color: props.Color}">></p>
	</view>
</template>

<script setup>
	const props = defineProps({
		imgSrc: {
			type: String,
			default: ''
		},
		Title: {
			type: String,
			default: '加载失败'
		},
		Color: {
			type: String,
			default: '#000'
		}
	})
</script>

<style lang="scss" scoped>
.fcButton{
	width: 780rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);
	.title{
		margin: 0 10rpx;
		font-size: 32rpx;
	}
	image{
		width: 48rpx;
		height: 48rpx;
	}
}
</style>