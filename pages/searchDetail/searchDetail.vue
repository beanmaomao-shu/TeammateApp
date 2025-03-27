<template>
	<view class="searchDetail">
		<!-- 搜索框 -->
		<view class="search">
			<input 
			v-model="searchKeyword"
			placeholder="搜索在线赛事组队信息"
			type="text"
			@input="handleSearch"
			/>
			<view>
				<button class="searchButton" @click="doSearch">
					<image src="../../static/images/搜索.png" mode=""></image>
				</button>
			</view>
		</view>

		<!-- 搜索结果列表 -->
		<view v-if="matchData.length > 0">
			<view class="teamInfo" v-for="(item, index) in matchData" :key="item.id">
				<navigator :url="`/pages/teamDetail/teamDetail?toPageValue=a`">
					<!--比赛图片 -->
					<view class="matchImg">
						<image :src="item.poster" mode="widthFix"></image>
					</view>
					<view class="mainInfo">
						<!-- 比赛名 -->
						<view class="matchName">
							{{item.name}}
						</view>
						<!-- 队名 -->
						<view class="teamName">
							<image src="../../static/images/队伍.png" mode=""></image>
							<p>鸭鸭小队</p>
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

		<!-- 无搜索结果提示 -->
		<view v-else class="no-result">
			<text>暂无相关比赛信息</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import { searchContest } from "@/api/search.js";

const searchKeyword = ref('');
const matchData = ref([]);
let searchTimeout = null;

// 接收上一页传来的搜索关键词并立即搜索
onLoad((options) => {
	if (options.value) {
		searchKeyword.value = decodeURIComponent(options.value);
		doSearch();
	}
});

// 处理输入框搜索
const handleSearch = () => {
	clearTimeout(searchTimeout);
	searchTimeout = setTimeout(() => {
		doSearch();
	}, 300);
};

// 执行搜索
const doSearch = async () => {
	if (!searchKeyword.value) {
		matchData.value = [];
		return;
	}

	try {
		const res = await searchContest(searchKeyword.value);
		if (res.data) {
			matchData.value = res.data;
		} else {
			matchData.value = [];
		}
	} catch (error) {
		console.error('搜索失败：', error);
		uni.showToast({
			title: '搜索失败',
			icon: 'none'
		});
	}
};
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
			width: 210rpx;
			height: 180rpx;
			image{
				width: 100%;
				height: 100%;
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
	
	// 添加无结果提示样式
	.no-result {
		text-align: center;
		padding: 40rpx;
		color: #999;
		font-size: 28rpx;
	}
</style>
