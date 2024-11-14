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
		<teamInfo  v-for="(item,index) in 10" :key="index"></teamInfo>
	</view>
</template>

<script setup>
	import{ ref }from 'vue';
	
	const recentMatchValue = ref({});
	const matchCategoryValue = ref({});
	const matchRegionValue = ref({});
	
	const changeMatch=(e)=>{
		console.log(e.value.recentMatch)
	};
	const changeCategory=(e)=>{
		console.log(e.value.matchCategory)
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
</style>
