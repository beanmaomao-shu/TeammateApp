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
		<view class="teamInfo" v-for="(item,index) in matchData" :key="item.id" v-if="!show">
			<navigator :url="`/pages/teamDetail/teamDetail?toaPageValue=a`">
				<!--比赛图片 -->
				<view class="matchImg">
					<image :src="item.imgUrl" mode="widthFix"></image>
				</view>
				<view class="mainInfo">
					<!-- 比赛名 -->
					<view class="matchName">
						{{item.matchName}}
					</view>
					<!-- 队名 -->
					<view class="teamName">
						<image src="../../static/images/队伍.png" mode=""></image>
						<p>{{item.name}}</p>
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
		<view class="teamInfo" v-for="(item,index) in data" :key="item.id" v-if="show">
			<navigator :url="`/pages/teamDetail/teamDetail?toaPageValue=a`">
				<!--比赛图片 -->
				<view class="matchImg">
					<image :src="item.imgUrl" mode="widthFix"></image>
				</view>
				<view class="mainInfo">
					<!-- 比赛名 -->
					<view class="matchName">
						{{item.matchName}}
					</view>
					<!-- 队名 -->
					<view class="teamName">
						<image src="../../static/images/队伍.png" mode=""></image>
						<p>{{item.name}}</p>
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
	import{ ref }from 'vue';
	
	const recentMatchValue = ref({});
	const matchCategoryValue = ref({});
	const matchRegionValue = ref({});
	
	const matchData=ref([
		{id:1,matchName:'2024年第十四届APMCM亚太地区大学生数学建模竞赛',name:'一战成名队', imgUrl:'../../static/images/match6.png'},
		{id:2,matchName:'2024年全国大学生英语翻译大赛（NETCCS）',name:'六级能不能过队', imgUrl:'../../static/images/match3.png'},
		{id:3,matchName:'2024年第五届"中译国青杯"国际组织文件翻译大赛',name:'超级翻译官队', imgUrl:'../../static/images/match4.png'},
		{id:4,matchName:'2024创想中国全国大学生创新创业大赛',name:'小呆呆创新队', imgUrl:'../../static/images/match15.png'},
		{id:5,matchName:'第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',name:'翻译的都队', imgUrl:'../../static/images/match8.png'},
		{id:6,matchName:'第二届"数学周报"全国大学生数学能力大赛',name:'基本不懂式队', imgUrl:'../../static/images/match13.png'},
		{id:7,matchName:'2024第二届全国大学生数学竞赛暨创新思维挑战赛',name:'哎我队', imgUrl:'../../static/images/match11.png'},
		{id:8,matchName:'CCF2024年中国计算机应用技术大赛-全国算法精英大赛',name:'AC队', imgUrl:'../../static/images/match7.png'},
		{id:9,matchName:'浙大研究院《智能无人机》研学实践项目',name:'让你飞起来队', imgUrl:'../../static/images/match14.png'},
	])
	const data=ref([
		{id:1,matchName:'2024年全国大学生英语翻译大赛（NETCCS）',name:'六级能不能过队', imgUrl:'../../static/images/match3.png'},
		{id:2,matchName:'2024年第五届"中译国青杯"国际组织文件翻译大赛',name:'超级翻译官队', imgUrl:'../../static/images/match4.png'},
		{id:3,matchName:'第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',name:'翻译的都队', imgUrl:'../../static/images/match8.png'},
	])
	
	const show=ref(false)
	const changeMatch=(e)=>{
		console.log(e.value.recentMatch)
	};
	const changeCategory=(e)=>{
		if(e.value.matchCategory==3)
		{
			show.value=true;
		}
	};
	const changeRegion=(e)=>{
		console.log(e.value.teamRegion)
	}
	const recentMatchData = ref([
		{
			name: 'recentMatch',
			title: "近期比赛",
			options: [
				{
					label: 'APMCM亚太大学生数学建模竞赛',
					value: '0',
					 tip: "显示在最右边的提示" 
				},
				{
					label: 'CCF CAT中国计算机应用技术大赛',
					value: '1',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '“天柱山杯”国际传播翻译大赛',
					value: '2',
					 tip: "显示在最右边的提示" 
				},
			],
		}])
	const matchCategoryData = ref([
		{
			name: 'matchCategory',
			title: "比赛类别",
			options: [
				{
					label: '工科',
					value: '0',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '理科',
					value: '1',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '文学',
					value: '2',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '外语',
					value: '3',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '媒体',
					value: '4',
					 tip: "显示在最右边的提示" 
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
					 tip: "显示在最右边的提示" 
				},
				{
					label: '上海',
					value: '1',
					 tip: "显示在最右边的提示" 
				},
				{
					label: '湖南',
					value: '2',
					 tip: "显示在最右边的提示" 
				},
			]
		}]);
		
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
				font-size: 30rpx;
				margin-left: 20rpx;
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
