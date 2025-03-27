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
			<uni-file-picker 
				limit="1" 
				title="" 
				fileMediatype="image" 
				:image-styles="imageStyles" 
				action="http://117.72.54.182:8898/users/upload"
				@select="onFileSelect"
				@success="onFileUploadSuccess"
				@progress="onFileUploadProgress"
				@fail="onFileUploadFail"
			></uni-file-picker>
		</view>
	</view>
	<!-- 2队伍名称 -->
	<view class="name">
		<view class="font">
			<uni-badge class="uni-badge-left-margin" text="2" :customStyle="{background: '#8707ff'}"/>. 请输入队伍名称:
			<view class="inputContainer">
				<input v-model="teamData.name" type="text" placeholder="吉伊粉丝后援团"/>
			</view>
		</view>
	</view>
	<!-- 3队伍口号 -->
	<view class="slogan">
		<view class="font">
			<uni-badge class="uni-badge-left-margin" text="3" :customStyle="{background: '#8707ff'}"/>. 请输入队伍口号 
			<view class="inputContainer">
				<input v-model="teamData.slogan" type="text" placeholder="开什么玩笑..." />
			</view>
		</view>
	</view>
	<!-- 4报名类别-->
	<view class="rate">
		<uni-badge class="uni-badge-left-margin" text="4" type="primary" :customStyle="{background: '#8707ff'}" />. 请选择比赛组别
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
			<textarea v-model="teamData.introduction" name="" id="" cols="30" rows="10" placeholder="叭叭叭叭叭叭(140字以内)"></textarea>
		</view>
	</view>
	<!-- 6组队要求 -->
	<view class="require">
		<uni-badge class="uni-badge-left-margin" text="6" :customStyle="{background: '#8707ff'}"/>. 组队要求
		<view class="detail">
			截止时间 :
			<view class="box">
				<uni-datetime-picker
					type="date"
					:value="teamData.endTime"
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
					v-model="teamData.numbers"
					:localdata="items"
					popup-title="请选择组队人数"
					@change="logNum"
				>
				</uni-data-picker>
			</view>
		</view>
		<view class="btn">
			<view class="publish" @click="addTeam">
				<fcButton img-src='/static/images/发布.png' Title="发布组队" Color="#6B57FE"></fcButton>
			</view>
		</view>
	</view>
</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createTeamAPI } from '../../api/team';
import { getContest } from "@/api/contest.js"; // 引入获取比赛列表的API

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

const rates = ref([
	{ value: "1", name: "专科" },
	{ value: "2", name: "普通本科" },
	{ value: "3", name: "92高校" },
	{ value: "4", name: "研究生" },
]);

const teamData = ref({
	name: "",
	icon: "",
	slogan: "",
	introduction: "",
	numbers: 0,
	matchId: 1,
	endTime: "",
	matchLocation: ""
});

// 搜索选择人数
const numbers = ref();
const items = ref([
	{ text: "0", value: 0 },
	{ text: "1", value: 1 },
	{ text: "2", value: 2 },
	{ text: "3", value: 3 },
	{ text: "4", value: 4 },
	{ text: "5", value: 5 },
	{ text: "6", value: 6 },
	{ text: "7", value: 7 },
	{ text: "8", value: 8 },
	{ text: "9", value: 9 },
	{ text: "10", value: 10 }
]);

const logNum = (e) => {
	const selectedNumber = parseInt(e.value || e);
	teamData.value.numbers = selectedNumber;
	console.log('选择的人数：', teamData.value.numbers);
};

// 截止时间 
const logTime = (e) => {
	teamData.value.endTime = e;
	console.log('选择的截止时间：', teamData.value.endTime);
};

// 添加文件选择处理
const onFileSelect = (e) => {
	console.log('文件选择事件：', e);
	onFileUploadSuccess(e)

};

// 添加上传进度处理
const onFileUploadProgress = (e) => {
	console.log('上传进度：', e);
};

// 添加上传失败处理
const onFileUploadFail = (e) => {
	console.error('上传失败：', e);
};

// 修改文件上传成功处理
const onFileUploadSuccess = async (e) => {
	try {
		console.log('文件上传事件触发：', e);
		// 检查是否有文件信息
		if (!e.tempFiles || !e.tempFiles.length) {
			console.error('没有获取到文件信息');
			return;
		}

		const tempFilePath = e.tempFiles[0].url || e.tempFiles[0].path;
		const token = uni.getStorageSync('token');
		
		uni.uploadFile({
			url: 'http://117.72.54.182:8898/users/upload',
			filePath: tempFilePath,
			name: 'file',
			header: {
				'Authorization': token
			},
			success: (uploadRes) => {
				try {
					console.log('上传响应：', uploadRes);
					const data = JSON.parse(uploadRes.data);
					if (data.code === 200) {
						teamData.value.icon = data.data.url;
						console.log('设置图片URL：', teamData.value.icon);
						uni.showToast({
							title: '图片上传成功',
							icon: 'success'
						});
					} else {
						throw new Error('上传失败: ' + data.message);
					}
				} catch (error) {
					console.error('解析上传响应失败：', error);
				}
			},
			fail: (error) => {
				console.error('图片上传失败：', error);
				uni.showToast({
					title: '图片上传失败',
					icon: 'error'
				});
			}
		});
	} catch (error) {
		console.error('图片上传异常：', error);
	}
};

// 发布组队信息
const addTeam = async () => {
	console.log('发布组队函数被调用');
	
	// 验证必要字段
	if (!teamData.value.icon) {
		uni.showToast({ title: '请上传队伍图标', icon: 'none' });
		return;
	}
	if (!teamData.value.name) {
		uni.showToast({ title: '请填写队伍名称', icon: 'none' });
		return;
	}
	if (!teamData.value.slogan) {
		uni.showToast({ title: '请填写队伍口号', icon: 'none' });
		return;
	}
	if (!teamData.value.introduction) {
		uni.showToast({ title: '请填写队伍简介', icon: 'none' });
		return;
	}
	if (!teamData.value.endTime) {
		uni.showToast({ title: '请选择截止时间', icon: 'none' });
		return;
	}
	if (!teamData.value.matchLocation) {
		uni.showToast({ title: '请选择比赛地点', icon: 'none' });
		return;
	}
	

	try {
		const teamDataToSend = {
			name: String(teamData.value.name || ""),
			icon: String(teamData.value.icon || ""), // 确保icon字段被包含
			slogan: String(teamData.value.slogan || ""),
			introduction: String(teamData.value.introduction || ""),
			numbers: parseInt(teamData.value.numbers) || 0,
			endTime: String(teamData.value.endTime || ""),
			matchLocation: String(teamData.value.matchLocation || ""),
			matchId: parseInt(teamData.value.matchId) || 1
		};
		
		console.log('发送的格式化数据：', JSON.stringify(teamDataToSend, null, 2));
		const res = await createTeamAPI(teamDataToSend);
		
		if (res.code === 200) {
			uni.showToast({
				title: '发布成功',
				icon: 'success'
			});
			uni.switchTab({
				url:"/pages/teammateHall/teammateHall"
			})
		} else {
			uni.showToast({
				title: '发布失败，请重试',
				icon: 'error'
			});
		}
	} catch (error) {
		console.error('创建队伍失败：', error);
		if (error.response) {
			console.error('错误响应数据：', error.response.data);
		}
		uni.showToast({
			title: '创建失败',
			icon: 'error'
		});
	}
};

// 比赛列表数据
const range = ref([]);

// 获取比赛列表
const getContestList = async () => {
	try {
		const res = await getContest();
		if (res.data) {
			// 转换数据格式以适配uni-data-select
			range.value = res.data.map(item => ({
				value: item.id,  // 比赛ID作为value
				text: item.name  // 比赛名称作为显示文本
			}));
		}
	} catch (error) {
		console.error('获取比赛列表失败：', error);
		uni.showToast({
			title: '获取比赛列表失败',
			icon: 'none'
		});
	}
};

// 处理比赛选择
const value = ref('');
const change = (e) => {
	teamData.value.matchId = parseInt(e);
	console.log('选择的比赛ID：', teamData.value.matchId);
};

// 组件挂载时获取比赛列表
onMounted(() => {
	getContestList();
});

// 处理地址选择
const address = ref('定位您的位置');
const getMapLocation = () => {
	uni.chooseLocation({
		success: (res) => {
			address.value = res.name;
			teamData.value.matchLocation = res.name;
			console.log('选择的地点：', teamData.value.matchLocation);
		},
		fail: () => {
			uni.getSetting({
				success: (res) => {
					if (!res.authSetting['scope.userLocation']) {
						uni.showModal({
							title: "是否授权当前位置",
							content: "需要获取您的地理位置，请确认授权",
							success: (tip) => {
								if (tip.confirm) {
									uni.openSetting({
										success: (data) => {
											if (data.authSetting['scope.userLocation'] === true) {
												uni.showToast({ title: "授权成功", icon: "success" });
												uni.chooseLocation({
													success: (res) => {
														address.value = res.name;
														teamData.value.matchLocation = res.name;
													}
												});
											}
										}
									});
								}
							}
						});
					}
				}
			});
		}
	});
};

// 处理人数选择
const radioChange = (e) => {
	console.log('选择的组别：', e.detail.value);
};

const publish=()=>{
	uni.navigateTo({
		url:"/pages/teammateHall/teammateHall"
	})
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
