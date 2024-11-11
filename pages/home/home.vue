<template>
	<view class="homeLayout">
		<!-- 头像板块 -->
		<view class="infoCard">
			<view class="peopleCard">
					<image src="../../static/images/avatar.png" mode="aspectFill"></image>
					<view class="name">
						鸭鸭
						<image src="../../static/images/认证.png" mode="aspectFill"></image>
					</view>
			</view>
			<view class="functionCard">
				<view class="box">
					<image  src="../../static/images/编辑.png" mode="aspectFill"></image>
					<view class="font">编辑名片</view>
				</view>
		<view class="box">
			<image  src="../../static/images/info_center.png" mode="aspectFill"></image>
			<view class="font">信息中心</view>
		</view>
		
		<view class="box">
			<image  src="../../static/images/tongxunlu.png" mode="aspectFill"></image>
			<view class="font">联系方式</view>
		</view>
			</view>
		</view>
		
		<!-- 中间板块 -->
		<view class="adBanner">
			<div class="pic">
				<image src="../../static/images/match2.png" mode="aspectFill"></image>
			</div>
		</view>
		
		<!-- 功能模块 -->
		<view class="functionalList">
			<button class="function">
				<image src="../../static/images/enter.png" mode="aspectFill"></image>
				<view class="font">
					将Temmate小程序加入到我的小程序中
				</view>
			</button>
			<button class="function">
				<image src="../../static/images/help.png" mode="aspectFill"></image>
				<view class="font">
					帮助中心
				</view>
			</button>
			<button class="function">
				<image src="../../static/images/comment.png" mode="aspectFill"></image>
				<view class="font">
					联系我们
				</view>
			</button>
			<button class="function">
				<image src="../../static/images/Home.png" mode="aspectFill"></image>
				<view class="font">
					清除缓存
				</view>
			</button>
			<button class="function">
				<image src="../../static/images/help.png" mode="aspectFill"></image>
				<view class="font">
					版本更新
				</view>
			</button>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.homeLayout{
	width: 100%;
	height: 100%;
	background-color: #e5e5e5;
	//头部样式
	.infoCard{
		height: 380rpx;
		width: 100%;
	    background-color: #fff;
		//头像
		.peopleCard{
			display: flex;
			align-items: center;
			height: 280rpx;
			background-color: #fff;
			image{
				padding-left: 60rpx;
				width: 100rpx;
				height: 100rpx;
			}
			.name{
				font-size: 32rpx;
				padding-left: 35rpx;
				color: #f2c688;
				image{
					padding-left: 20rpx;
					width: 30rpx;
					height: 30rpx;
					
				}
			}
			
		}	
		//头像下方功能卡
		.functionCard{
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			.box{
				display: flex;
			
				align-items: center;
				margin-left: 70rpx;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				.font{
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}
			
		}
	}
	//中间的比赛
	.adBanner{
		height: 360rpx;
		width: 100%;
	    background-color: #fff;
		margin-top:40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.pic{
			width: 690rpx;
			height: 300rpx;
			background-color: darkred;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	//功能模块
	.functionalList{
		height: 420rpx;
		width: 100%;
		margin-top: 40rpx;
		.function{
			width: 750rpx;
			height: 94rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			padding-left: 50rpx;
			image{
				width:45rpx;
				height: 45rpx;
			}
			.font{
				font-weight: 550;
				font-size: 32rpx;
				padding-left: 20rpx;
			}
		}
	}
	
}
</style>
