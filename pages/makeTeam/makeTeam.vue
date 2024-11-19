<template>
<view class="layout">
	<!-- 选择比赛 -->
	<view class="choose">
		<view class="font">
			<uni-badge class="uni-badge-left-margin" text="+" type="primary"/>
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
		<uni-file-picker limit="1" title=""	fileMediatype="image" :image-styles="imageStyles"></uni-file-picker>
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
						:customStyle="{background: '#8707ff'}" />. 请选择比赛组别
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
			截止时间 :
			<view class="box">
				<uni-datetime-picker
					type="date"
					:value="single"
					@change="logTime"
				/>
			</view>
		</view>
		<view class="detail">
			位置 :
			<view class="box" @click="getMapLocation">
				<uni-icons type="map-pin-ellipse" size="20"></uni-icons>
				<p>{{address}}</p>
			</view>
		</view>
		<view class="detail">
			限制人数 :
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
		
		<view class="btn">
			<view class="publish" @click="publish">
				<fcButton img-src='/static/images/发布.png' Title="发布组队" Color="#6B57FE"></fcButton>
			</view>
		</view>
		
	</view>
</view>
</view>
</template>

<script setup>
import {ref} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
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
	
	//发布组队信息
	const publish=async()=>{
		// 提示发布成功
		uni.showToast({
			title:"发布成功",
			icon:"success",
			duration:500
		})
		//返回首页
		setTimeout(()=>{
			uni.switchTab({
				url:"/pages/teammateHall/teammateHall"
			})
		},1000)
		
	}
</script>

<style lang="scss" scoped>
.layout{
	width: 100%;
	
	margin: 0 auto;

	.choose{
		padding-top: 30rpx;
		width: 700rpx;
		height: 100rpx;
		padding-left: 40rpx;
		.font{
			padding-left: 0rpx;
		}
	}
	.inputContainer{
		margin-left: calc(50% - 250rpx);
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
		font-size: 32rpx ;
		padding-left: 20rpx ;
		padding-top: 10rpx;
		color: #333;
	}
	.avatar{
		padding-top: 50rpx;
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
			border-bottom: 1px solid #eee;
		.getImg{
			margin-left: 80rpx;
			padding-top: 20rpx;
			width: 300rpx;
			height: 100rpx;
		}
	}
	.name{
		width: 100%;
		height: 170rpx;
	    border-bottom: 1px solid #eee;
		
	}
	.slogan{
		width: 100%;
		height: 170rpx;
			border-bottom: 1px solid #eee;
	}
	.rate{
		width: 100%;
		height: 170rpx;
		padding-left: 20rpx;
		border-bottom: 1px solid #eee;
		.list{
			padding-top: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			margin-left: -30rpx;
		}
	}
	.description{
		width: 100%;
		height: 300rpx;
		border-bottom: 1px solid #eee;
		textarea{
			padding-left: 10rpx;
			padding-top: 10rpx;
			margin-top:20rpx;
			margin-left:calc(50% - 270rpx );
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
		padding: 20rpx;
		border-bottom: 1px solid #eee;
		padding-top: 10rpx;
		&.detail:first-child{
			
		}
		}
	}
	.box{
		width: 360rpx;
		height: 70rpx;
		box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: left;
		align-items: center;
		margin-top: 10rpx;
		uni-data-picker{
			width: 100%;
		}
	}
	.btn{
		width: 400rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.publish{
			width: 400rpx;
			height: 80rpx;
		
			margin-bottom: 40rpx;
		}
	}
	
}
</style>
