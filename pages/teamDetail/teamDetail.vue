<template>
	<view class="teamDetail">
		<view class="matchInfo">
			<view class="matchImg"></view>
			<view class="matchCategory"></view>
		</view>
		<view class="teamInfo">
			<view class="horizontal">
				<!-- 队伍图标 -->
				<view class="avatar">
					<detailTitle img-src='/static/images/图片.png' p-title="队伍图标"></detailTitle>
					<image class="teamImg" src="../../static/images/match8.png" mode=""></image>
				</view>
				<view>
					<!-- 队伍名称 -->
					<view class="name">
						<detailTitle img-src='/static/images/别名.png' p-title="队伍名称"></detailTitle>
						<view class="box">吉伊粉丝后援团</view>
					</view>
					<!-- 队伍口号 -->
					<view class="slogan">
						<detailTitle img-src='/static/images/文字.png' p-title="队伍口号"></detailTitle>
						<view class="box">乌拉呀哈呀哈乌拉</view>
					</view>
				</view>
			
			</view> 
			<!-- 队伍简介 -->
			<view class="description">
				<detailTitle img-src='/static/images/简介.png' p-title="队伍简介"></detailTitle>
				<view class="desArea"></view>
			</view>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<!-- 队伍成员 -->
		<view class="members">
			<detailTitle img-src='/static/images/人员.png' p-title="队伍成员"></detailTitle>
			<view class="avatarsList">
				<image class="avatar" src="../../static/images/avatar3.png" mode=""></image>
				<image class="avatar" src="../../static/images/avatar3.png" mode=""></image>
				<image class="avatar" src="../../static/images/avatar3.png" mode=""></image>
			</view>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<!-- 队伍要求 -->
		<view class="require">
			<view class="require">
				<detailTitle img-src='/static/images/组队要求.png' p-title="组队要求"></detailTitle>
			</view>
			<!-- 人数 -->
			<view class="numbers">
				<detailTitle img-src='/static/images/组队人数.png' p-title="组队人数"></detailTitle>
				<view class="box">
					<uni-data-picker 
						v-model="numbers"
						:localdata="items"
						popup-title="请选择组队人数"
						@change="logNum"
						  >
					 </uni-data-picker>
				</view>
			</view>
			<!-- 截止时间 -->
			<view class="time">
				<detailTitle img-src='/static/images/timeout.png' p-title="截止时间"></detailTitle>
				<view class="box">
					<uni-datetime-picker
						type="date"
						:value="single"
						@change="logTime"
					/>
				</view>
			</view>
			<!-- 定位地址 -->
			<view class="region">
				<detailTitle img-src='/static/images/地点.png' p-title="赛区地点"></detailTitle>
				<view class="box" @click="getMapLocation">
					<uni-icons type="map-pin-ellipse" size="20"></uni-icons>
					<p>{{address}}</p>
				</view>
			</view>
		</view>
		<view class="btnArea">
			<fcButton img-src='/static/images/申请加入.png' Title="申请加入" Color="#FF5733"></fcButton>
			<view class="enter" @click="toPage">
				<fcButton img-src='/static/images/一起讨论.png' Title="一起讨论" Color="#F3705A"></fcButton>
			</view>
<!-- 			<fcButton img-src='/static/images/退出队伍.png' Title="退出队伍" Color="#D43030"></fcButton>
			<fcButton img-src='/static/images/发送邀请.png' Title="发送邀请" Color="#FF5733"></fcButton>
			<fcButton img-src='/static/images/解散队伍.png' Title="解散队伍" Color="#FF8D1A"></fcButton> -->
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import {onLoad} from "@dcloudio/uni-app";
	// 搜索选择人数
	const numbers=ref();
	const items=ref([
	            {
	              text: "0",
	              value: 0
	            },
	            {
	              text: "1",
	              value: 1
	            },
	            {
	              text: "2",
	              value: 2
	            },
	            {
	              text: "3",
	              value: 3
	            },
	            {
	              text: "4",
	              value: 4
	            },
	            {
	              text: "5",
	              value: 5
	            },
	            {
	              text: "6",
	              value: 6
	            },
	            {
	              text: "7",
	              value: 7
	            },
	            {
	              text: "8",
	              value: 8
	            },
	            {
	              text: "9",
	              value: 9
	            },
	            {
	              text: "10",
	              value: 10
	            }
	         ])
	const logNum=()=>{
		console.log(numbers.value)
	};
	//截止时间 
	const single=ref();
	const logTime=(e)=>{
		single.value = e;
		console.log(e);
	}
	//搜索选择地址
	const address=ref('定位您的位置');
	const getMapLocation=()=>{
		uni.chooseLocation({
			success:(res)=> {
				// 将获取到的地址信息存储
				address.value = res.name
			},
			fail:()=>{
				// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
				uni.getSetting({ //获取用户的当前设置
					success: (res) => {
						var status = res.authSetting;
						if(!status['scope.userLocation']){
						// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
							uni.showModal({ //显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。
								title:"是否授权当前位置",
								content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
								success:(tip)=>{
									if(tip.confirm){ 
									// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
										uni.openSetting({ //调起客户端小程序设置界面，返回用户设置的操作结果
											success:(data)=>{
											// 如果用户授权了地理信息在，则提示授权成功
												if(data.authSetting['scope.userLocation']===true){
													uni.showToast({
														title:"授权成功",
														icon:"success",
														duration:1000
													})
													// 授权成功后，然后再次chooseLocation获取信息
													uni.chooseLocation({
														success: (res) => {
															// 将获取到的地址信息存储
															address.value = res.address
														}
													})
												}else{
													uni.showToast({
														title:"授权失败",
														icon:"none",
														duration:1000
													})
												}
											}
										})
									}
								}
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title:"调用授权窗口失败",
							icon:"none",
							duration:1000
						})
					}
				})
			}
		})
	}
	
	//跳转按钮
	const dataFromSourcePage = ref('');
	const toPage=()=>{
		uni.navigateTo({
			url: '/pages/chatRoom/chatRoom'
		})
	}
</script>

<style lang="scss">
.box{
	width: 360rpx;
	height: 70rpx;
	box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
}
.teamInfo{
	margin: 20rpx 0;
	.horizontal{
		display: flex;
		justify-content:space-evenly;
		margin-bottom: 20rpx;
		.avatar{
			magrin-right:86rpx;
			.teamImg{
				width: 180rpx;
				height: 180rpx;
			}
		}
	}
	.description{
		margin: 0 auto;
		width: 688rpx;
		.desArea{
			width: 624rpx;
			height: 216rpx;
			margin:0 auto;
			margin-top: 20rpx;
			box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);
		}
	}
}
.members{
	margin: 0 auto;
	margin-top: 20rpx;
	width: 688rpx;
	height: 140rpx;
	.avatarsList{
		display: flex;
		justify-content: center;
		.avatar{
			width: 80rpx;
			height: 80rpx;
			
		}
	}
}
.require{
	margin: 0 auto;
	margin-top: 20rpx;
	width: 688rpx;
	.numbers,.time,.region{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
		.box{
			margin-left: 12rpx;
		}
	}
	.numbers{
		margin-top: 20rpx;
		uni-data-picker{
			width: 100%;
		}
	}
	.region,.numbers{
		.box{
			justify-content: left;
			font-size: 28rpx;
			color:#808080;
			uni-icons{
				margin-left: 10rpx;
			}
		}
	}
}
.btnArea{
	margin-top: 100rpx;
}
</style>
