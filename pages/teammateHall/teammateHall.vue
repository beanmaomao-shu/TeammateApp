<template>
	<view class="teammateLayout">
		<!-- 搜索框 -->
		<view class="search">
			<input 
			v-model="inputValue"
			type="text" 
			placeholder="搜索在线赛事组队信息"
			@input="filterSuggestion"
			@focus="showSuggestion=true"
			@blur="showSuggestion=false"
			/>
			<view class="searchButton"  @click="(()=>{navigateToDetail();searchInfo()})">
				<image src="../../static/images/搜索.png" mode=""></image>
			</view>
		</view> 
		<!-- 提示词 -->
		<ul class="suggesstions" v-if="showSuggestion&&filteredData.length">
			<li class="list" v-for="(suggestion,index) in filteredData " @click.stop="selectSuggestion(suggestion,$event)">{{suggestion.matchName}}</li>
			<view class="tip">
				没有找到想要的比赛? 
				<view class="tipNav">
					点这里试试->
				</view>
			</view>
		</ul>
		<!-- 通知栏 -->
		<van-notice-bar 
			scrollable
			color="#AC33C1"
			background="#F1E6FF"
		>
			2024年第十四届亚太地区大学生数学建模竞赛(以下简称“竞赛”)是由中国国际科技促进会物联网工作委员会和北京图象图形学学会联合主办的亚太地区大学生学科类竞赛，竞赛由亚太地区大学生数学建模竞赛组委会负责组织，欢迎各高等院校按照竞赛章程及有关规定组织同学报名参赛。 
			2023年第十三届亚太地区大学生数学建模竞赛共有9700支队伍969所高校2万7千多名学生报名参赛。参赛高校覆盖北京大学、清华大学、浙江大学、同济大学、上海交通大学、复旦大学、四川大学、大连理工大学等全部的39所985高校和114所211高校。除中国大陆高校外本次竞赛还有数十所国外高校参赛。
		</van-notice-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper class="swiper" 
			circular 
			:indicator-dots="true" 
			indicator-color="#fff"
			:autoplay="true" 
			:interval="3000"
			:duration="500">
				<swiper-item v-for="(item,index) in matchData" :key="index">
					<image :src="item.imgUrl" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分割线 -->
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="teammateList">
			<view class="listHead">
				<view class="left">
					<image src="../../static/images/people.png" mode=""></image>
					<text >正在组队</text>
				</view>
				<view class="right">
					<navigator url="/pages/moreDetail/moreDetail" class="moreDetail">
						<text>更多</text>
						<image src="../../static/images/more.png" mode=""></image>
					</navigator>
				</view>
			</view>
			<dash Color="#F1E6FF" Width="700rpx" Height="8rpx"></dash>
			<!--  -->
			<!-- 新组建的 -->
			<view class="teamInfo" v-if="create">
				<navigator :url="`/pages/teamDetail/teamDetail?tocPageValue=c`">
					<!--比赛图片 -->
					<view class="matchImg">
						<image src='../../static/images/match8.png' mode="widthFix"></image>
					</view>
					<view class="mainInfo">
						<!-- 比赛名 -->
						<view class="matchName">
							'第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道'
						</view>
						<!-- 队名 -->
						<view class="teamName">
							<image src="../../static/images/队伍.png" mode=""></image>
							<p>一战成名队</p>
						</view>
						<!-- 头像列表//研讨室跳转 -->
						<view class="bottom">
							<view class="avatars">
								<img src="../../static/images/avatar.png" alt="" />
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
			<!-- 演示 -->
			<view class="teamInfo">
				<navigator url="/pages/fakedetail/fakedetail">
					<!--比赛图片 -->
					<view class="matchImg">
						<image src='../../static/images/match5.png' mode="widthFix"></image>
					</view>
					<view class="mainInfo">
						<!-- 比赛名 -->
						<view class="matchName">
							2024第十届全国中西部外语翻译大赛
						</view>
						<!-- 队名 -->
						<view class="teamName">
							<image src="../../static/images/队伍.png" mode=""></image>
							<p>让我们说中文队</p>
						</view>
						<!-- 头像列表//研讨室跳转 -->
						<view class="bottom">
							<view class="avatars">
								<image class="avatar" src="../../static/images/avatar1 (1).jpg" mode=""></image>
								<image class="avatar" src="../../static/images/avatar1 (2).jpg" mode=""></image>
								<image class="avatar" src="../../static/images/avatar1 (6).jpg" mode=""></image>
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
			<!-- 默认生成 -->
			<view class="teamInfo" v-for="(item,index) in matchData" :key="item.id">
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
			<!--  -->
		</view>
		<view class="issue">
			<!-- <button @click="toMakeTeam">
				组队
			</button> -->
		</view>
		<view class="issue" @click="toMakeTeam">
			<navigator url="../makeTeam/makeTeam">组队</navigator>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import { useRouter } from 'vue-router';
	import {onLoad} from "@dcloudio/uni-app";
	
	// 临时生成新组成的队伍
	const create=ref(false)
	const toMakeTeam=()=>{
		setInterval(()=>{
			create.value=true
		},1000)
	}
	
	// 
	const inputValue=ref('');
	const router = useRouter();
	const showSuggestion=ref(false)
	const matchData=ref([
		{id:1,matchName:'2024年第十四届APMCM亚太地区大学生数学建模竞赛',name:'听党的就队', imgUrl:'../../static/images/match6.png'},
		{id:2,matchName:'2024年全国大学生英语翻译大赛（NETCCS）',name:'六级能不能过队', imgUrl:'../../static/images/match3.png'},
		{id:3,matchName:'2024年第五届"中译国青杯"国际组织文件翻译大赛',name:'超级翻译官队', imgUrl:'../../static/images/match4.png'},
		{id:4,matchName:'2024创想中国全国大学生创新创业大赛',name:'小呆呆创新队', imgUrl:'../../static/images/match15.png'},
		{id:5,matchName:'第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',name:'翻译的都队', imgUrl:'../../static/images/match8.png'},
		{id:6,matchName:'第二届"数学周报"全国大学生数学能力大赛',name:'基本不懂式队', imgUrl:'../../static/images/match13.png'},
		{id:7,matchName:'2024第二届全国大学生数学竞赛暨创新思维挑战赛',name:'哎我队', imgUrl:'../../static/images/match11.png'},
		{id:8,matchName:'CCF2024年中国计算机应用技术大赛-全国算法精英大赛',name:'AC队', imgUrl:'../../static/images/match7.png'},
		{id:9,matchName:'浙大研究院《智能无人机》研学实践项目',name:'让你飞起来队', imgUrl:'../../static/images/match14.png'},
	])
	//这个拿来存储筛选后回显的数据
	const filteredData=ref([])
	
	
	//搜索框跳转搜索详细页面
	const navigateToDetail=() =>{
		if(inputValue.value==''){
			uni.showToast({
				title: '请输入搜索内容',
				icon: 'error'
			});
		}
		else{
			uni.redirectTo({
				url: `../searchDetail/searchDetail?value=${inputValue.value}`,
			});
			inputValue.value = '';
		}
		
	}
	
	//搜索输入框筛选逻辑
	const filterSuggestion=()=>{
		if(inputValue.value)
		{
			filteredData.value=matchData.value.filter(item=>{
				return item.matchName.toLowerCase().includes(inputValue.value.toLowerCase())
			})
		}else{
			filteredData.value=[]
		}
	}
	
	//点击li回显信息到输入框
	const selectSuggestion=(suggestion,event)=>{
		event.stopPropagation()
		inputValue.value=suggestion.matchName
		console.log('Selecting suggestion:', suggestion)
		filteredData.value=[]
	}
	
	//搜索组队信息
	const searchInfo=async()=>{
		// 这里处理输入框的逻辑
	}
	//跳转到组队页面
	// const toMakeTeam=()=>{
	// 	uni.redirectTo({
	// 		url:"../makeTeam/makeTeam"
	// 	})
	// }
	
	//传参
	const centerValue=ref('');
	const props=defineProps({
		toValue:{
			type:String,
		}
	})
	onLoad(()=>{
		centerValue.value=props.toValue
	})
</script>

<style lang="scss" scoped>
	.teammateLayout{
		.search{
			position: relative;
			width: 700rpx;
			height: 68rpx;
			border: 4rpx solid #AC33C1;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			border-radius: 40rpx;
			input{
				width: 568rpx;
				height: 68rpx;
				padding-left: 20rpx;
			}
			.searchButton{
				width: 132rpx;
				height: 60rpx;
				background-color: #F1E6FF;
				border-radius: 0 40rpx 40rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
			
		}
		.suggesstions{
			position: absolute;
			width:668rpx ;
			max-height: 500rpx;
			border: 1px solid #6c5ce7;
			border-top:0px ;
			left: 40rpx;
			border-radius: 10rpx;
			background-color: #fff;
			z-index: 1000;
			overflow-y: auto;
			box-shadow: 0 15rpx 20rpx rgba(0, 0, 0, 0.3);
			.list{
				padding: 10rpx;
				border: 1px solid #f5f5f5;
				&:hover{
					background-color: #f0f0f0;
				}
			}
			.tip{
				padding: 10rpx;
				height: 50rpx;
				font-size: 24rpx;
				color: #808080;
				position: absolute;
				display: flex;
				right: 15rpx;
				.tipNav{
					padding-left: 10rpx;
					color: #AC33C1;
				}
				
			}
		}
		
		.banner{
			margin-top: 23rpx;
			margin-bottom: 48rpx;
			swiper{
				background-color: #fff;
				width: 700rpx;
				height: 476rpx;
				margin: 0 auto;
				swiper-item{
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.teammateList{
			width: 700rpx;
			margin: 0 auto;
			.listHead{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 200rpgx;
					height: 54rpx;
					image{
						width: 48rpx;
						height: 48rpx;
						margin-right: 16rpx;
					}
				}
				.right{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 96rpgx;
					height: 54rpx;
					image{
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
		
	}
	.issue{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		border-radius: 20%;
		text-align: center;
		line-height: 80rpx;
		width: 130rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #6c5ce7, rgba(224, 217, 255, 0.8));
		border-radius: 30rpx;
		border: 2rpx solid #fff;
		navigator{
			color: #fff;
		}
		
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
