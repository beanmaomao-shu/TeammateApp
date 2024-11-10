<template>
	<view class="moreDetail">
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="headMenu">
			<van-dropdown-menu  active-color="red">
			  <van-dropdown-item v-model="recentMatch" :options="option1" title="近期比赛"/>
			  <van-dropdown-item v-model="matchCategory" :options="option2" title="比赛类别"/>
			  <van-dropdown-item v-model="teamRegion" :options="option3" title="组队赛区"/>
			</van-dropdown-menu>
		</view>
		<teamInfo v-for="item in 10"></teamInfo>
	</view>
</template>

<script setup>
	import{ ref }from 'vue';
	
	const recentMatch=ref(0);
	const matchCategory=ref(0);
	const teamRegion=ref(0);
	const option1=ref([
	        { text: '2024年第十四届APMCM亚太地区大学生数学建模竞赛', value: 0 },
	        { text: 'CCF CAT第六届中国计算机应用技术大赛', value: 1 },
	        { text: '“天柱山杯”安徽省第六届徽文化国际传播翻译大赛', value: 2 }
	      ]);
	const option2=ref([
	        { text: '工科',  value: 0 },
	        { text: '理科', value: 1 },
	        { text: '文学', value: 2 },
			{ text: '外语', value: 3 },
			{ text: '媒体', value: 4 },
	      ]);
	const option3=ref([
			{ text: '广州', value: 0 },
			{ text: '佛山', value: 1 },
			{ text: '深圳', value: 2 },
			]);
		  
</script>

<style lang="scss" scoped>
	.headMenu{
		width: 700rpx;
		margin: 0 auto;
		margin-bottom: 10rpx;
		}
</style>
