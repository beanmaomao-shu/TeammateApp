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
					<image class="teamImg" src="../../static/images/队伍图标1.jpg" mode=""></image>
				</view>
				<view>
					<!-- 队伍名称 -->
					<view class="name">
						<detailTitle img-src='/static/images/别名.png' p-title="队伍名称"></detailTitle>
						<view class="box">一战成名队</view>
					</view>
					<!-- 队伍口号 -->
					<view class="slogan">
						<detailTitle img-src='/static/images/文字.png' p-title="队伍口号"></detailTitle>
						<view class="box">Bug 克星，代码任我行！</view>
					</view>
				</view>
			
			</view> 
			<!-- 队伍简介 -->
			<view class="description">
				<detailTitle img-src='/static/images/简介.png' p-title="队伍简介"></detailTitle>
				<view class="desArea">我们致力于在 [组队相关领域，如竞赛领域、项目开发领域等] 中崭露头角。无论是面对复杂的挑战还是紧迫的时间限制，我们都秉持着团结协作的精神，充分发挥各自的专业知识和技能。成员们擅长 [列举团队成员主要擅长的方面，比如数据分析、创意构思、编程开发等]，在过往的经历中已经积累了一定的经验，为我们在本次组队活动中的表现奠定了坚实的基础</view>
			</view>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<!-- 队伍成员 -->
		<view class="members">
			<detailTitle img-src='/static/images/人员.png' p-title="队伍成员"></detailTitle>
			<view class="avatarsList">
				<image class="avatar" src="../../static/images/avatar1.png" mode=""></image>
				<image class="avatar" src="../../static/images/avatar2.png" mode=""></image>
				<image class="avatar" src="../../static/images/avatar3.png" mode=""></image>
				<image class="avatar" src="../../static/images/avatar.png" mode=""></image>
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
					{{numbers}}
				</view>
			</view>
			<!-- 截止时间 -->
			<view class="time">
				<detailTitle img-src='/static/images/timeout.png' p-title="截止时间"></detailTitle>
				<view class="box">
					{{time}}
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
			 <view class="enter" v-if="toaValue==='a'">
				 <fcButton img-src='/static/images/申请加入.png' Title="申请加入" Color="#FF5733"></fcButton>
			 </view>
			<view class="chat" v-if="toaValue==='a'" @click="toChatPage()">
				<fcButton img-src='/static/images/一起讨论.png' Title="一起讨论" Color="#F3705A"></fcButton>
			</view>

			<view class="out" v-if="tobValue==='b'"  @click="toggleDialog('error','out')">
				<fcButton img-src='/static/images/退出队伍.png' Title="退出队伍" Color="#D43030"></fcButton>
			</view>
			<view class="invite" v-if="tocValue==='c'" @click="toInvitePage()" >
				<fcButton img-src='/static/images/发送邀请.png' Title="发送邀请" Color="#FF5733"></fcButton>
			</view>
			<view class="dissolve" v-if="tocValue==='c'" @click="toggleDialog('error','disband')">
				<fcButton img-src='/static/images/解散队伍.png' Title="解散队伍" Color="#FF8D1A" ></fcButton>

			</view>
		</view>
		<uni-popup ref="showMessage" type="message">
			<uni-popup-message :type="popupType" :message="popupMsg" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="alertDialog" type="dialog" >
			<uni-popup-dialog
			:type="msgType"
			cancelText="取消"
			confirmText="确定"
			:content="messageText"
			@confirm="dialogConfirm"
			>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import {onLoad} from "@dcloudio/uni-app";


	//队伍简介
	const numbers=ref('6');
	const time=ref('2024-12-12 8:30:00');
	const address=ref('北京市朝阳区');

	//跳转按钮
	const toaValue=ref('');
	const tobValue=ref('');
	const tocValue=ref('');
	
	//弹窗相关
	const alertDialog=ref(null)
	const showMessage=ref(null)
	const messageText=ref('')
	const popupMsg=ref('')
	const msgType=ref('success')
	const popupType=ref('success')
	
	const toggleDialog =(type,msg)=>{
		msgType.value=type;
		alertDialog.value.open();
		if(msg=='out'){
			messageText.value='您确定要退出该团队吗？'
		}
		if(msg=='disband')
		{
			messageText.value='您确定要解散该团队吗?'
		}
	}
	
	const dialogConfirm=()=>{
		showMessage.value.open();
		popupMsg.value='操作成功';
		uni.navigateBack()
	}

	onLoad((option)=>{
<<<<<<< Updated upstream
		 toaValue.value = option.toPageValue 
=======
		toaValue.value = option.toaPageValue
>>>>>>> Stashed changes
		tobValue.value = option.tobPageValue
		tocValue.value = option.tocPageValue
	})
	const toChatPage=()=>{
		uni.navigateTo({
			url: "/pages/chatRoom/chatRoom"
		})
	}
	
	const toInvitePage=()=>{
		uni.navigateTo({
			url: "/pages/inviteMate/inviteMate"
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
			margin-right:86rpx;
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
			padding: 20rpx;
			overflow: scroll;
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
			justify-content: center;
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
