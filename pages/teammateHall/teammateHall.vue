<template>
	<view class="teammateLayout">
		<!-- 搜索框 -->
		<view class="search">
			<input type="text" focus placeholder="搜索在线赛事组队"/>
			<view class="searchButton">
				<image src="../../static/images/搜索.png" mode=""></image>
			</view>
		</view>
		<view class="banner">
			<swiper class="swiper" 
			circular 
			:indicator-dots="true" 
			indicator-color="#fff"
			:autoplay="true" 
			:interval="3000"
			:duration="500">
				<swiper-item>
					<image src="../../static/images/match1.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match2.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match3.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match4.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match5.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match6.png" mode="widthFix"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/match7.png" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="teammateList">
			<view class="listHead">
				<view class="left">
					<!-- <uni-icons type="fire"></uni-icons> -->
					<text >正在组队</text>
				</view>
				<view class="right">
					<text>更多</text>
					<image src="../../static/images/more.png" mode=""></image>
				</view>
			</view>
			<dash Color="#F1E6FF" Width="700rpx" Height="8rpx"></dash>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
			<teamInfo></teamInfo>
		</view>
		<view class="issue">
			
		</view>
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
	.teammateLayout{
		.search{
			width: 700rpx;
			height: 68rpx;
			border: 4rpx solid #AC33C1;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			border-radius: 40rpx;
			input{
				width: 568rpx;
				height: 68rpx;
				padding-left: 20rpx;
			}
			.searchButton{
				width: 132rpx;
				height: 68rpx;
				background-color: #F1E6FF;
				border-radius: 0 40rpx 40rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
		.banner{
			margin-top: 46rpx;
			margin-bottom: 48rpx;
			swiper{
				background-color: #fff;
				width: 700rpx;
				height: 476rpx;
				margin: 0 auto;
				swiper-item{
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.teammateList{
			width: 700rpx;
			margin: 0 auto;
			.listHead{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 200rpgx;
					height: 54rpx;
				}
				.right{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 96rpgx;
					height: 54rpx;
					image{
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
		
	}
	
</style>
