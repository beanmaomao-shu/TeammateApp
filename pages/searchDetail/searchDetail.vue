<template>
	<view class="searchDetail">
		<!-- 搜索框 -->
		<view class="search">
			<input 
			v-model="dataFromSourcePage"
			placeholder="搜索在线赛事组队信息"
			type="text"/>
			<view>
				<button class="searchButton" >
					<image src="../../static/images/搜索.png" mode=""></image>
				</button>
			</view>
		</view>
		<view class="teamInfo" toValue='a' v-for="(item,index) in matchData" :key="item.id">
			<navigator :url="`/pages/teamDetail/teamDetail?toPageValue=a`">
				<!--比赛图片 -->
				<view class="matchImg">
					<image :src="item.imgUrl" mode="widthFix"></image>
				</view>
				<view class="mainInfo">
					<!-- 比赛名 -->
					<view class="matchName">
						{{item.matchName}}
					</view>
					<!-- 队名 -->
					<view class="teamName">
						<image src="../../static/images/队伍.png" mode=""></image>
						<p>{{item.name}}</p>
					</view>
					<!-- 头像列表//研讨室跳转 -->
					<view class="bottom">
						<view class="avatars">
							<img src="../../static/images/avatar3.png" alt="" />
							<img src="../../static/images/avatar1.png" alt="" />
							<img src="../../static/images/avatar.png" alt="" />
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
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from 'vue';

const dataFromSourcePage = ref('');
const matchData=ref([
		{id:2,matchName:'2024年全国大学生英语翻译大赛（NETCCS）',name:'六级能不能过队', imgUrl:'../../static/images/match3.png'},
	])
onLoad((options) => {
  dataFromSourcePage.value = options.value;
  // 可以在这里对传递过来的数据进行处理
});
</script>

<style lang="scss" scoped>
	.search{
		width: 700rpx;
		height: 68rpx;
		border: 4rpx solid #AC33C1;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		border-radius: 40rpx;
		margin-bottom: 46rpx;
		input{
			width: 568rpx;
			height: 68rpx;
			padding-left: 20rpx;
		}
		.searchButton{
			width: 132rpx;
			height: 60rpx;
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
	.teamInfo{
		width: 700rpx;
		height: 180rpx;
		margin: 0 auto;
		border: 1rpx solid lightgray;
		box-shadow: 0 2rpx 8rpx;
		margin-bottom: 10rpx;
		position: relative;
		
		.matchImg{
			position: absolute;
			left: 15rpx;
			top: 18rpx;
			image{
				width: 210rpx;
				height: 160rpx;
			}
		}
		.mainInfo{
			position: absolute;
			left: 240rpx;
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
				font-size: 30rpx;
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
