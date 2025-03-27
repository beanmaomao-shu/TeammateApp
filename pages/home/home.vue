<template>
	<view class="homeLayout">
		<!-- 头像板块 -->
		<view class="infoCard">
			<view class="peopleCard">
				<view class="info">
					<view class="avatar">
						<image class="avatarImg" src="../../static/images/avatar.png" mode="aspectFill"></image>
					</view>
					<view class="infoGroup">
						<view class="name">
							鸭鸭
						</view>
						
						<!-- 个人中心 -->
						<view class="authentication">
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
			<view class="functionCard">
				<view class="box" @click="goToEditProfile">
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
	import { ref,onMounted  } from 'vue';
	import {getContest} from "@/api/contest.js"
	//是否认证
	const isauthenticated = ref(true);
	const contestList = ref([]);
	const getContestList = async()=>{
		try{
			const res = await getContest();
			contestList.value = res.data;
			console.log("成功")
		}catch(error){
			console.log('111222',error);
		}
	}
	console.log('111',contestList.value);
	onMounted(()=>{
		getContestList()
		
	})

	const goToEditProfile = () => {
		uni.navigateTo({
			url: '/pages/editProfile/editProfile'
		});
	};
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
