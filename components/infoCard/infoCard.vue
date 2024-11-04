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
		width: 343px;
		height: 100px;
		background-image: url('../../static/images/personnel_card.png');
		display: flex;
		align-items: center;
		margin: 0 auto;
		.avatar{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 52px;
			height: 52px;
			border:1px solid transparent;
			border-radius: 20px;
			margin:0 12px 0 25px;
			.avatarImg{
				width: 52px;
				height: 52px;
			}
		}
		.infoGroup{
			.name{
				color: #F2C688;
				font-size: 18px;
			}
			.identity{
				width: 44px;
				height: 18px;
				border: 1px solid #F2C688;
				color: #F2C688;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				margin: 0 auto;
			}
			.audit{
				width: 52px;
				height: 20px;
				background-color: #FF5500;
				color: #fff;
				font-size: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10px;
			}
			.authentication{
				font-size: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				.authenImg{
					width: 16px;
					height: 16px;
				}
			}
		}
	}
	
	
</style>