<template>
	<view class="teammateLayout">
		<!-- 搜索框 -->
		<view class="search">
			<input :value="inputClearValue" @input="clearInput" type="text" focus placeholder="搜索在线赛事组队信息"/>
			<view>
				<button class="searchButton"  @click="(()=>{navigateToDetail();searchInfo()})">
					<image src="../../static/images/搜索.png" mode=""></image>
				</button>
			</view>
		</view> 
		<van-notice-bar 
			scrollable
			color="#AC33C1"
			background="#F1E6FF"
		>
			2024年第十四届亚太地区大学生数学建模竞赛(以下简称“竞赛”)是由中国国际科技促进会物联网工作委员会和北京图象图形学学会联合主办的亚太地区大学生学科类竞赛，竞赛由亚太地区大学生数学建模竞赛组委会负责组织，欢迎各高等院校按照竞赛章程及有关规定组织同学报名参赛。 
			2023年第十三届亚太地区大学生数学建模竞赛共有9700支队伍969所高校2万7千多名学生报名参赛。参赛高校覆盖北京大学、清华大学、浙江大学、同济大学、上海交通大学、复旦大学、四川大学、大连理工大学等全部的39所985高校和114所211高校。除中国大陆高校外本次竞赛还有数十所国外高校参赛。
		</van-notice-bar>
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
				<view class="right" @click="navigateToMore">
					<text>更多</text>
					<image src="../../static/images/more.png" mode=""></image>
				</view>
			</view>
			<dash Color="#F1E6FF" Width="700rpx" Height="8rpx"></dash>
			<teamInfo v-for="(item,index) in 10" :key="index"></teamInfo>
		</view>
		<view class="issue">
		<button @click="toMakeTeam">
			组队
		</button>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	//搜索框跳转搜索详细页面
	const navigateToDetail=() =>{
		uni.redirectTo({
			url: '../searchDetail/searchDetail'
		});
	}
	//更多信息跳转搜索详细页面
	const navigateToMore=() =>{
		uni.redirectTo({
			url:'../moreDetail/moreDetail'
		});
	}
	//搜索组队信息
	const searchInfo=()=>{
		// 这里处理输入框的逻辑
	}
	//跳转到组队页面
	const toMakeTeam=()=>{
		uni.redirectTo({
			url:"../makeTeam/makeTeam"
		})
	}
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
			margin-top: 23rpx;
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
	.issue{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		border-radius: 20%;
		width: 130rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		button{
			color: #fff;
		 background: linear-gradient(90deg, #6c5ce7, rgba(224, 217, 255, 0.8));
			border-radius: 30rpx;
			border: 2rpx solid #fff;
		}
		
	}
	
</style>
