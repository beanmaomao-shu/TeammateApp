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
					<image class="teamImg" :src="teamInfo.icon || '../../static/images/队伍图标1.jpg'" mode=""></image>
				</view>
				<view>
					<!-- 队伍名称 -->
					<view class="name">
						<detailTitle img-src='/static/images/别名.png' p-title="队伍名称"></detailTitle>
						<view class="box">{{ teamInfo.name||"鸭鸭小队" }}</view>
					</view>
					<!-- 队伍口号 -->
					<view class="slogan">
						<detailTitle img-src='/static/images/文字.png' p-title="队伍口号"></detailTitle>
						<view class="box">{{ teamInfo.slogan||"加油加油" }}</view>
					</view>
				</view>
			
			</view> 
			<!-- 队伍简介 -->
			<view class="description">
				<detailTitle img-src='/static/images/简介.png' p-title="队伍简介"></detailTitle>
				<view class="desArea">{{ teamInfo.introduction||"这是一条队伍简介" }}</view>
			</view>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<!-- 队伍成员 -->
		<view class="members">
			<detailTitle img-src='/static/images/人员.png' p-title="队伍成员"></detailTitle>
			<view class="avatarsList">
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
				<view class="box">{{ teamInfo.numbers||"4" }}</view>
			</view>
			<!-- 截止时间 -->
			<view class="time">
				<detailTitle img-src='/static/images/timeout.png' p-title="截止时间"></detailTitle>
				<view class="box">{{ teamInfo.endTime ||'2025.3.29'}}</view>
			</view>
			<!-- 定位地址 -->
			<view class="region">
				<detailTitle img-src='/static/images/地点.png' p-title="赛区地点"></detailTitle>
				<view class="box" @click="getMapLocation">
					<uni-icons type="map-pin-ellipse" size="20"></uni-icons>
					<p>{{ teamInfo.matchLocation ||'四会市人民政府'}}</p>
				</view>
			</view>
		</view>
		
		<view class="btnArea">
			 <view class="enter" v-if="toValue==='a'">
				 <fcButton img-src='/static/images/申请加入.png' Title="申请加入" Color="#FF5733"></fcButton>
			 </view>
			<view class="chat" v-if="toValue==='a'" @click="toChatPage()">
				<fcButton img-src='/static/images/一起讨论.png' Title="一起讨论" Color="#F3705A"></fcButton>
			</view>

			<view class="out" v-if="toValue==='b'"  @click="toggleDialog('error','out')">
				<fcButton img-src='/static/images/退出队伍.png' Title="退出队伍" Color="#D43030"></fcButton>
			</view>
			<view class="invite" v-if="toValue==='c'" @click="toInvitePage()" >
				<fcButton img-src='/static/images/发送邀请.png' Title="发送邀请" Color="#FF5733"></fcButton>
			</view>
			<view class="dissolve" v-if="toValue==='c'" @click="toggleDialog('error','disband')">
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
	import {ref, onMounted} from 'vue';
	import {onLoad} from "@dcloudio/uni-app";
	import {getDetailTeamAPI,deleteTeamAPI} from "@/api/team.js";

	//队伍简介
	const teamInfo = ref({
		id: '',
		name: '',
		icon: '',
		slogan: '',
		introduction: '',
		numbers: 0,
		endTime: '',
		matchLocation: '',
		matchId: 0
	});

	//跳转按钮
	
	const toValue=ref('');
	const deleteID=ref()
	
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
	
	const dialogConfirm = async () => {
		try {
			await deleteTeam(deleteID.value)
			showMessage.value.open()
			popupMsg.value = '操作成功'
			
			// 使用 switchTab 跳转到研讨室页面
			uni.switchTab({
				url: '/pages/seminarRoom/seminarRoom'
			})
		} catch (error) {
			console.error('删除失败：', error)
			popupMsg.value = '操作失败'
		}
	}

	// 获取队伍详情
	const getTeamDetail = async (id) => {
		try {
			const res = await getDetailTeamAPI(id);
			if (res.code === 200 && res.data) {
				teamInfo.value = res.data;
				console.log('队伍详情：', teamInfo.value);
			}
		} catch (error) {
			console.error('获取队伍详情失败：', error);
			uni.showToast({
				title: '获取队伍信息失败',
				icon: 'none'
			});
		}
	};
	//解散队伍
	const deleteTeam=async(id)=>{
		const res=await deleteTeamAPI(id)
		console.log(res.data)
	}

	onLoad((option)=>{
		if (option.id) {
			getTeamDetail(option.id);
			deleteID.value=option.id
		}
	
		toValue.value = option.tocPageValue
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
