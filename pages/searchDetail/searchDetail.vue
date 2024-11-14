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
		<teamInfo v-for="(item,index) in 10" :key="index"></teamInfo>
	</view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from 'vue';

const dataFromSourcePage = ref('');

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
</style>
