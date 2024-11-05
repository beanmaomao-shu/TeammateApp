<template>
	<!-- <view class="teamInfo">
		<view class="teamImg">
			<slot name="teamImg"></slot>
		</view>
		<view class="matchName">
			<slot name="matchName"></slot>
		</view>
		<view class="teamName">
			<slot name="teamName"></slot>
		</view>
		<view class="avatars">
			<slot name="avatars"></slot>
		</view>
	</view> -->
	<view class="teamInfo">
		<view class="teamImg">
			<image src="../../static/images/match16.png" mode="widthFix"></image>
		</view>
		<view class="mainInfo">
			<view class="matchName">
				2024全国大学生数学模型竞赛
			</view>
			<view class="teamName">
				一战成名队
			</view>
			<view class="avatars">
				<img src="../../static/images/avatar3.png" alt="" />
				<img src="../../static/images/avatar1.png" alt="" />
				<img src="../../static/images/avatar.png" alt="" />
				<img src="../../static/images/avatar3.png" alt="" />
				<img src="../../static/images/avatar.png" alt="" />
				<img src="../../static/images/avatar2.png" alt="" />
			</view>
		</view>
		
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.teamInfo{
		width: 700rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		overflow: hidden;
		margin: 0 auto;
		border: 1rpx solid lightgray;
		box-shadow: 0 2rpx 8rpx;
		margin-bottom: 10rpx;
		.teamImg{
			margin: 10rpx 0;
			image{
				width: 180rpx;
				height: 100rpx;
			}
		}
		.mainInfo{
			.avatars{
					display: flex;
					align-items: center;
					image{
						width: 48rpx;
						height: 48rpx;
						margin-right: 10rpx;
						&:first-child{
							margin-left: 20rpx;
						}
					}
				}
				.matchName{
					font-size: 32rpx;
					margin-left: 20rpx;
				}
				.teamName{
					font-size: 24rpx;
					margin:5rpx 0  ;
					margin-left: 20rpx;
				}
			}
		}
	
</style>