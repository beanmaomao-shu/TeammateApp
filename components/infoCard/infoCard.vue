<template>
	<view class="infoCard">
		<view class="info">
			<view class="avatar">
				<image class="avatarImg" src="../../static/images/avatar.png" mode="aspectFill"></image>
			</view>
			<view class="infoGroup">
				<view class="name">
					<slot name="name"></slot>
				</view>
				<view class="identity" v-if="isLeader">
					<view class="content">团队长</view>
				</view>
				<view class="identity" v-if="!isLeader">
					<view class="content">团队员</view>
				</view>
				<!-- <view class="authentication" v-if="isauthenticated">
					<image class="authenImg" src="../../static/images/认证.png" mode="aspectFill"></image>
					<view class="content">已认证</view>
				</view>
				<view class="authentication" v-if="!isauthenticated">
					<image class="authenImg" src="../../static/images/认证.png" mode="aspectFill"></image>
					<view class="content">未认证</view>
				</view>
				<view class="audit" v-if="isaudited">审核中</view>
				<view class="audit" v-if="!isaudited">已加入</view> -->
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		isLeader:{
			type:Boolean,
			default:true
		},
		isauthenticated:{
			type:Boolean,
			default:true
		},
		isaudited:{
			type:Boolean,
			default:true
		},
		
	})
</script>

<style lang="scss" scoped>
	.info{
		width: 686rpx;
		height: 200rpx;
		background-image: url('../../static/images/personnel_card.png');
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		align-items: center;
		margin: 0 auto;
		.avatar{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 104rpx;
			height: 104rpx;
			border:1px solid transparent;
			border-radius: 40rpx;
			margin:0 24rpx 0 50rpx;
			.avatarImg{
				width: 104rpx;
				height: 104rpx;
			}
		}
		.infoGroup{
			.name{
				color: #F2C688;
				font-size: 36rpx;
			}
			.identity{
				width: 88rpx;
				height: 36rpx;
				border: 1px solid #F2C688;
				color: #F2C688;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				margin: 0 auto;
			}
			.audit{
				width: 104rpx;
				height: 40rpx;
				background-color: #FF5500;
				color: #fff;
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
			}
			.authentication{
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				.authenImg{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
	
	
</style>