<template>
<view class="layout">
	
	
	<!-- 选择比赛 -->
	<view class="choose">
		<view class="font">
			<uni-badge class="uni-badge-left-margin" text="+" type="primary" />
			选择 比赛
		</view>
		
		<uni-data-select
		      v-model="value"
		      :localdata="range"
		      @change="change"
		></uni-data-select>
	</view>
	<!-- 1队伍图标 -->
<view class="avatar">
	<view class="font">
		<uni-badge class="uni-badge-left-margin" text="1" :customStyle="{background: '#8707ff'}"/>. 上传队伍图标
	</view>
	<view class="getImg">
		<uni-file-picker limit="1" title="从相册中选择"	fileMediatype="image" :image-styles="imageStyles"></uni-file-picker>
</view>
</view>
<!-- 2队伍名称 -->
<view class="name">
	<view class="font">
		<uni-badge class="uni-badge-left-margin" text="2" :customStyle="{background: '#8707ff'}"/>. 请输入队伍名称:
		<view class="inputContainer">
			<input type="text" placeholder="吉伊粉丝后援团"/>
		</view>
		
	</view>
</view>
<!-- 3队伍口号 -->
<view class="slogan">
	<view class="font">
		<uni-badge class="uni-badge-left-margin" text="3" :customStyle="{background: '#8707ff'}"/>. 请输入队伍口号 
		<view class="inputContainer">
			<input type="text" placeholder="开什么玩笑..." />
		</view>
		
	</view>
</view>
<!-- 4报名类别-->
<view class="rate">
	<uni-badge class="uni-badge-left-margin" text="4" type="primary"
						:customStyle="{background: '#8707ff'}" />
		<view class="list">
			<radio-group @change="radioChange">
				<label style="padding-left: 20rpx;" v-for="(item, index) in rates" :key="item.value" >
						<radio :value="item.value" :checked="index === current" color="#8707ff"/>
					{{item.name}}
				</label>
			</radio-group>
		</view>
	
</view>
<!-- 5队伍简介 -->
<view class="description">
	<view class="font">
		<uni-badge class="uni-badge-left-margin" text="5" :customStyle="{background: '#8707ff'}"/>. 请输入队伍简介 
		<textarea name="" id="" cols="30" rows="10" placeholder="叭叭叭叭叭叭(140字以内)"></textarea>
	</view>
</view>
<!-- 6组队要求 -->
<view class="require">
	<view class="font">
		<uni-badge class="uni-badge-left-margin" text="6" :customStyle="{background: '#8707ff'}"/>. 组队要求
		<view class="detail">
			时间 :
		</view>
		<view class="detail">
			地点 :
		</view>
		<view class="detail">
			限制人数 :
		</view>
		
	</view>
</view>

</view>

</template>

<script setup>
import {ref} from 'vue'
const imageStyles = ref({
      width: 90,
      height: 90,
      border: {
        color: "#68c984",
        width: 1,
        style: 'dashed',
        radius: '10rpx'
      },
    });
	
	const range = ref([
		{value:0,text:"2024全国大学生数学模型竞赛"},
		{value:1,text:"2024全国大学生数学模型竞赛"},
		{value:2,text:"2024全国大学生数学模型竞赛"},
		{value:3,text:"2024全国大学生数学模型竞赛"},
		{value:4,text:"2024全国大学生数学模型竞赛"},
	])	
	
	const rates=ref([
		{value:"1",name:"专科"},
		{value:"2",name:"普通本科"},
		{value:"3",name:"92高校"},
		{value:"4",name:"研究生"},
	])
</script>

<style lang="scss" scoped>
.layout{
	width: 100%;
	height: 100%;	
	.choose{
		padding-top: 30rpx;
		width: 700rpx;
		height: 100rpx;
		padding-left: 20rpx;
	}
	.inputContainer{
		margin-top: 10rpx;
		width: 480rpx;
		height: 73rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to bottom,rgb(227, 213, 255),rgb(255, 231, 231));
		overflow: hidden;
		box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.075);
		border-radius: 30rpx;
		input{
			aret-color: rgb(255, 81, 0);
			border: none;
			outline: none;
		    color: rgb(19, 19, 19);
			text-align: center;
			width:450rpx;
			height: 58rpx;
			 border: 1px solid rgba(255, 255, 255, 0.5);
			border-radius: 30rpx;
			background-color: rgb(255, 255, 255);
			padding-left: 10rpx;
	}
	
	}
	.font{
		font-size: 32rpx;
		padding-left: 20rpx;
		color: #333;
	}
	.avatar{
		padding-top: 50rpx;
		width: 100%;
		height: 300rpx;
		
		display: flex;
		justify-content: space-between;
		.getImg{
			width: 300rpx;
			height: 100rpx;
		}
	}
	.name{
		width: 100%;
		height: 170rpx;
		
		
	}
	.slogan{
		width: 100%;
		height: 170rpx;
	
	}
	.rate{
		width: 100%;
		height: 150rpx;
		.list{
			display: flex;
			flex-wrap: wrap;
		}
	}
	.description{
		width: 100%;
		height: 270rpx;
	
		textarea{
			padding-left: 10rpx;
			padding-top: 10rpx;
			margin-top:20rpx;
			margin-left:20rpx;
			width: 500rpx;
			height: 180rpx;
			 border: 1px solid #818CF8;
		}
	}
	.require{
		padding-top: 20rpx;
		width: 100%;
		height: 250rpx;
		.detail{
			padding-top: 20rpx;
		}
	}
	
}
</style>
