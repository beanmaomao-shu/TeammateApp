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
		<view class="teammateList"></view>
		<view class="issue">
			
		</view>
	</view>
</template>

<script>
	import{ref,reactive} from 'vue'
	
</script>

<style lang="scss" scoped>
	.search{
		width: 350px;
		height: 34px;
		border: 2px solid #AC33C1;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		border-radius: 20px;
		input{
			width: 284px;
			height: 34px;
			padding-left: 10px;
		}
		.searchButton{
			width: 66px;
			height: 34px;
			background-color: #F1E6FF;
			border-radius: 0 20px 20px 0;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 24px;
				height: 24px;
			}
		}
	}
	.banner{
		margin-top: 23px;
		swiper{
			background-color: #fff;
			width: 350px;
			height: 238px;
			margin: 0 auto;
			swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
