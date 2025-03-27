<template>
	<view class="moreDetail">
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="headMenu">
			<!-- 近期比赛 -->
			<wei-dropdown-menu 
				:data="recentMatchData" 
				:value="recentMatchValue"
				@change="changeMatch"
				
			>
			</wei-dropdown-menu>
			<!-- 比赛类型 -->
			<wei-dropdown-menu 
				:data="matchCategoryData" 
				:value="matchCategoryValue"
				@change="changeCategory"
			>
			</wei-dropdown-menu>
			<!-- 组队赛区 -->
			<wei-dropdown-menu
				:data="teamRegionData" 
				:value="teamRegionValue"
				@change="changeRegion"
			>
			</wei-dropdown-menu>
		</view>
		<view class="teamInfo" v-for="item in filteredContestData" :key="item.id">
			<navigator :url="`/pages/teamDetail/teamDetail?id=${item.id}`">
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
					<view class="teamName" v-if="item.teamList && item.teamList.length">
						<image src="../../static/images/队伍.png" mode=""></image>
						<p>{{item.teamList[0].name}}</p>
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
</template>

<script setup>
	import{ ref ,onMounted, computed}from 'vue';
	import { getContest } from '../../api/contest';
	
	const recentMatchValue = ref({});
	const matchCategoryValue = ref({});
	const matchRegionValue = ref({});
	const selectedType=ref()
	
	const contestData=ref([])
	const selectedLocation=ref()
	
	
	const show=ref(false)
	const changeMatch=()=>{
		// 清空所有筛选条件
		selectedType.value = '';
		selectedLocation.value = '';
		// 重置其他下拉菜单的值
		matchCategoryValue.value = {};
		teamRegionValue.value = {};
	};
	const getData=async()=>{
		try{
			const res=await getContest()
			contestData.value=res.data
			console.log(contestData.value)
		}catch(error){
			console.log('111',error)
		}
	}
	
	const changeCategory=(e)=>{
		console.log('选择的类型：', e);
		const typeMap = {
			'0': 'IT',
			'1': '理科',
			'2': '文学',
			'3': '外语'
		};
		selectedType.value = typeMap[e.value.matchCategory];
		console.log('筛选类型：', selectedType.value);
	};
	const changeRegion=(e)=>{
		console.log('选择的地区：', e);
		const locationMap = {
			'0': '广东',
			'1': '上海',
			'2': '湖南'
		};
		selectedLocation.value = locationMap[e.value.teamRegion];
		console.log('筛选地区：', selectedLocation.value);
	}
	
	const recentMatchData = ref([
		{
			name: 'recentMatch',
			title: "近期比赛",
			options: [
				{
					label: '全部比赛',
					value: 'all',
					tip: "显示全部比赛"
				}
			]
		}])
	const matchCategoryData = ref([
		{
			name: 'matchCategory',
			title: "比赛类别",
			options: [
				{
					label: 'IT',
					value: '0',
					 tip: "IT类比赛" 
				},
				{
					label: '理科',
					value: '1',
					 tip: "理科类比赛" 
				},
				{
					label: '文学',
					value: '2',
					 tip: "文学类比赛" 
				},
				{
					label: '外语',
					value: '3',
					 tip: "外语类比赛" 
				},
			],
		}])
	const teamRegionData = ref([
		{
			name: 'teamRegion',
			title: "组队赛区",
			options: [
				{
					label: '广东',
					value: '0',
					 tip: "广东赛区" 
				},
				{
					label: '上海',
					value: '1',
					 tip: "上海赛区" 
				},
				{
					label: '湖南',
					value: '2',
					 tip: "湖南赛区" 
				},
			]
		}]);
	
	const currentType = ref('');
	
	const filteredContestData = computed(() => {
		// 如果没有选择任何筛选条件，返回全部数据
		if (!selectedType.value && !selectedLocation.value) {
			return contestData.value;
		}
		
		let result = contestData.value;
		
		// 类型筛选
		if (selectedType.value) {
			result = result.filter(item => item.type === selectedType.value);
		}
		
		// 地区筛选
		if (selectedLocation.value) {
			result = result.filter(item => item.location === selectedLocation.value);
		}
		
		return result;
	});
	
	onMounted(()=>{
		getData()
	})
</script>

<style lang="scss" scoped>
	.headMenu{
		width: 700rpx;
		margin: 0 auto;
		margin-bottom: 10rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
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
			image{
				width: 210rpx;
				height: 160rpx;
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
				min-height: 80rpx;
				max-height: 90rpx;
				padding: 12rpx;
				font-size: 28rpx;
				line-height: 1.4;
				white-space: normal;
				word-wrap: break-word;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
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
</style>
