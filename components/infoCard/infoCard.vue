<template>
	<navigator :url="`/pages/teamDetail/teamDetail?toPageValue=${centerValue}`">
		<view class="infoCard">
			<view class="info">
				<view class="avatar">
					<image class="avatarImg" src="../../static/images/avatar.png" mode="aspectFill"></image>
				</view>
				<view class="infoGroup">
					<view class="name">
						<slot name="name"></slot>
					</view>
					<!-- 研讨室 -->
					<view class="identity" v-if="contentValue==='a'">
						<view class="content" v-if="isLeader">团队长</view>
						<view class="content" v-if="!isLeader">团队员</view>
					</view>
					<view class="audit" v-if="contentValue==='b'">
						<view class="content" v-if="isaudited">审核中</view>
						<view class="content" v-if="!isaudited">已加入</view> 
					</view>
					<!-- 个人中心 -->
					<view class="authentication" v-if="contentValue==='c'">
						<view class="content"  v-if="isauthenticated">
							<image class="authenImg" src="../../static/images/认证.png" mode="aspectFill"></image>
							<view class="p">已认证</view>
						</view>
						<view class="content" v-if="!isauthenticated">
							<image class="authenImg" src="../../static/images/未认证.png" mode="aspectFill"></image>
							<view class="p">未认证</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script setup>
	import { ref } from 'vue';
	import {onLoad} from "@dcloudio/uni-app";
	
	//是否为团队长
	const isLeader = ref(true);
	//是否审核通过
	const isaudited = ref(false);
	//是否认证
	const isauthenticated = ref(true);
	
	//标签显示+跳转组队详情按钮
	const props = defineProps({
		toValue:{
			type:String,
		},
		cValue:{
			type:String,
		},
	})
	const centerValue = ref('');
	const contentValue=ref('');
	onLoad(()=>{
		centerValue.value=props.toValue;
		contentValue.value=props.cValue
	})
</script>

<style lang="scss" scoped>
	.info{
		width: 686rpx;
		height: 200rpx;
		background-image: url('../../static/images/personnel_card.png');
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		align-items: center;
		margin: 0 auto;
		.avatar{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 104rpx;
			height: 104rpx;
			border:1px solid transparent;
			border-radius: 40rpx;
			margin:0 24rpx 0 50rpx;
			.avatarImg{
				width: 104rpx;
				height: 104rpx;
			}
		}
		.infoGroup{
			.name{
				color: #F2C688;
				font-size: 36rpx;
			}
			.identity{
				width: 88rpx;
				height: 36rpx;
				border: 1px solid #F2C688;
				color: #F2C688;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				margin: 0 auto;
				margin-top: 10rpx;
			}
			.audit{
				width: 104rpx;
				height: 40rpx;
				background-color: #FF5500;
				color: #fff;
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				margin-top: 10rpx;
			}
			.authentication{
				.content{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: #fff;
					margin-top: 10rpx;
					.authenImg{
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}
				}
				
			}
		}
	}
	
	
</style>