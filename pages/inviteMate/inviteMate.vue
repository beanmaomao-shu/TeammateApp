<template>
	<view class="inviteMate">
		<image src="../../static/images/邀请海报.png" mode=""></image>
		<view class="code">
			<image src="../../static/images/code.png" mode="" :show-menu-by-longpress="true"></image>
			<p class="p">长按保存图片并转发</p>
		</view>
	</view>
</template>

<script setup>
	import{ref} from 'vue'
	
	const shareImage=()=>{
		
	}
</script>

<style lang="scss">
.inviteMate{
	width: 390px;
	height: 700px;
	position: relative;
	image{
		width: 100%;
		height: 100%;
	}
	
}
.code{
	border: 15rpx solid darkmagenta;
	border-radius: 30rpx;
	position:absolute;
	left:35%;
	top: 40%;
	width: 250rpx;
	height: 250rpx;
		.p{
			text-align: center;
			font-size: 32rpx;
			font-weight: bolder;
		}
	}
	
</style>
