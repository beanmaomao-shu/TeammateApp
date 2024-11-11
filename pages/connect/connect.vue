<template>
	<view class="connect">
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="text">
			<text>联系类型</text>
		</view>
		 <van-cell center title="拨打电话" is-link value="(空)">
		   <image class='mine_headicon' src='../../static/images/connect_phone.png' slot="icon"></image>
		 </van-cell>
		 <van-cell center title="添加微信" is-link value="(空)">
		   <image class='mine_headicon' src='../../static/images/connect_wechat.png' slot="icon"></image>
		 </van-cell>
		 <van-cell center title="浏览名片" is-link value="(空)">
		   <image class='mine_headicon' src='../../static/images/connect_infocard.png' slot="icon"></image>
		 </van-cell>
	</view>
</template>

<script setup>
	
</script>d

<style lang="scss" scoped>
	.text{
		width: 700rpx;
		font-size: 28rpx;
		color:#999999;
		margin: 0 auto;
	}
	.mine_headicon{
	  width: 88rpx;
	  height: 88rpx;
	  margin-right:24rpx ;
	}
</style>
