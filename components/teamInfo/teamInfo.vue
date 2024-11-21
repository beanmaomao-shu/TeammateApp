<template>
	<!-- 点击卡片跳转组队信息详情页 -->
	<view class="teamInfo">
		<navigator :url="`/pages/teamDetail/teamDetail?toPageValue=a`">
			<view class="matchImg">
				<image src="../../static/images/match16.png" mode="widthFix"></image>
			</view>
			<view class="mainInfo">
				<!-- 比赛名 -->
				<view class="matchName">
					2024全国大学生数学模型竞赛
				</view>
				<!-- 队名 -->
				<view class="teamName">
					<image src="../../static/images/队伍.png" mode=""></image>
					<p>一战成名队</p>
				</view>
				<!-- 头像列表//研讨室跳转 -->
				<view class="bottom">
					<view class="avatars">
						<img src="../../static/images/avatar3.png" alt="" />
						<img src="../../static/images/avatar1.png" alt="" />
						<img src="../../static/images/avatar.png" alt="" />
						<img src="../../static/images/avatar3.png" alt="" />
						<img src="../../static/images/avatar.png" alt="" />
						<img src="../../static/images/avatar2.png" alt="" />
					</view>
					<view class="goChat">
						<navigator url="/pages/chatRoom/chatRoom">
							<image src="../../static/images/trending.png" mode=""></image>
							<p>一起讨论></p>
						</navigator>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import {onLoad} from "@dcloudio/uni-app";
	
	const centerValue=ref('');
	const props=defineProps({
		toValue:{
			type:String,
		}
	})
	onLoad(()=>{
		centerValue.value=props.toValue
	})
</script>

<style lang="scss" scoped>
	.teamInfo{
		width: 700rpx;
		height: 140rpx;
		margin: 0 auto;
		border: 1rpx solid lightgray;
		box-shadow: 0 2rpx 8rpx;
		margin-bottom: 10rpx;
		position: relative;
		.matchImg{
			position: absolute;
			left: 12rpx;
			top: 9rpx;
			image{
				width: 180rpx;
				height: 100rpx;
			}
		}
		.mainInfo{
			position: absolute;
			left: 200rpx;
			top: 9rpx;
			.bottom{
				display: flex;
				align-items: center;
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
				.goChat{
					navigator{
						display: flex;
						image{
							width: 32rpx;
							height: 32rpx;
						}
						font-size: 24rpx;
						color: #808080;
					}
				}
			}
			.matchName{
				font-size: 32rpx;
				margin-left: 20rpx;
			}
			.teamName{
				display: flex;
				image{
					width: 32rpx;
					height: 32rpx;
				}
					font-size: 24rpx;
					margin:5rpx 0  ;
					margin-left: 20rpx;
					color: #AC33C1;
			}
			}
		}
	
</style>