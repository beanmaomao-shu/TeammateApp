<template>
	<view class="homeLayout">
		<!-- 头像板块 -->
		<view class="infoCard">
			<view class="peopleCard">
				<infoCard cValue='c'>
					<template #name>
						鸭鸭
					</template>
				</infoCard>
			</view>
			<view class="functionCard">
				
				<view class="box">
					<image  src="../../static/images/编辑.png" mode="aspectFill"></image>
					<view class="font">编辑名片</view>
				</view>
				<navigator url="/pages/newsCenter/newsCenter">
					<view class="box">
						<image  src="../../static/images/info_center.png" mode="aspectFill"></image>
						<view class="font">信息中心</view>
					</view>
				</navigator>
				<navigator url="/pages/connect/connect">
					<view class="box">
						<image  src="../../static/images/tongxunlu.png" mode="aspectFill"></image>
						<view class="font">联系方式</view>
					</view>
				</navigator>
				
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
				<image src="../../static/images/enter.png" mode="aspectFill" style="width: 35rpx;height: 35rpx;"></image>
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
		height: 300rpx;
		width: 100%;
	    background-color: #fff;
		//头像
		.peopleCard{
			margin-top: 42rpx;
			background-color: #fff;
		}	
		//头像下方功能卡
		.functionCard{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
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
					font-weight: bold;
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
