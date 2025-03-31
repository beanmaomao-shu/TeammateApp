<template>
	<view class="seminarRoomLayout">
		<view class="tabControl">
			<uni-section title="实心标签" type="line">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control 
					:current="current" 
					:values="items" 
					:style-type="styleType"
					:active-color="activeColor" 
					@clickItem="onClickItem" />
				</view>
				<view class="content">
					<!-- 创建的团队 -->
					<view v-if="current === 0">
						<!-- 无创建团队 -->
						<view class="createTeam empty" v-if="createTeams.length === 0">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode="">
							<view class="font">
								你还没有创建任何团队呢~
							</view>
							</image>
						</view>
						<!-- 有创建团队 -->
						<view class="createTeam" v-else>
							<view class="teamList" v-for="(team, index) in createTeams" :key="team.id">
								<navigator url="/pages/chatRoom/chatRoom" class="team">
									<infoCard 
										:id="team.id" 
										contentValue="c"
										@getID="handleGetID"
									>
										<template #name>{{ team.name }}</template>
										<template #img>
											<view class="avatar">
												<image class="avatarImg" :src="team.icon || '../../static/images/队伍图标1.jpg'" mode="aspectFill"></image>
											</view>
										</template>
									</infoCard>
									<view class="enterButton">
										>> 进入研讨室
									</view>
								</navigator>
							</view>
						</view>
					</view>
					<!-- 加入的团队 -->
					<view v-if="current === 1">
						<!-- 无加入团队 -->
						<view class="enterTeam empty" v-if="joinTeams.length === 0">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode="">
								<view class="font">
									你还没有加入任何团队呢~
								</view>
							</image>
						</view>
						<!-- 有加入团队 -->
						<view class="enterTeam" v-else>
							<view class="teamList" v-for="(team, index) in joinTeams" :key="team.id">
								<navigator url="/pages/chatRoom/chatRoom" class="team">
									<infoCard 
										:id="team.id"
										contentValue="b"
									>
										<template #name>{{ team.name }}</template>
										<template #img>
											<view class="avatar">
												<image class="avatarImg" :src="team.icon || '../../static/images/队伍图标2.jpg'" mode="aspectFill"></image>
											</view>
										</template>
									</infoCard>
									<view class="enterButton">
										>> 进入研讨室
									</view>
								</navigator>
							</view>
						</view>
					</view>
				</view>
			</uni-section>
		</view>
	</view>
</template>

<script setup>
	import {ref,onMounted } from 'vue'
	import {onLoad,onShow} from "@dcloudio/uni-app";
	import {getCreateTeamAPI, getJoinTeamAPI} from "@/api/team.js"
	// 选项卡
	const current=ref(0)
	const items=ref(['我创建的团队', '我加入的团队'])
	const styleType=ref('button')
	const activeColor=ref('#AC33C1')
	
	//创建的团队列表
	const createTeams = ref([]);
	
	//加入的团队列表
	const joinTeams = ref([]);
	
	//点击tab选项卡切换站内容
	const onClickItem=(e)=>{
		if (current.value !== e.currentIndex) {
			current.value= e.currentIndex
		}
	}
	//选项卡内容
	const isCreateTeam=ref(true) //创建团队
	const isEnterTeam=ref(true) //加入团队

	//获取创建团队的信息
	const getCreateTeam=async()=>{
		try {
			const res=await getCreateTeamAPI()
			console.log('获取创建的团队：', res);
			if (res.code === 200 && res.data) {
				createTeams.value = res.data.map(team => ({
					id: team.id,
					name: team.name,
					icon: team.icon,
					isLeader: true // 在创建的团队中都是队长
				}));
			}
		} catch (error) {
			console.error('获取创建的团队失败：', error);
			uni.showToast({
				title: '获取团队信息失败',
				icon: 'none'
			});
		}
	}
	//获取加入团队的信息
	const getJoinTeam = async () => {
		try {
			const res = await getJoinTeamAPI();
			console.log('获取加入的团队：', res);
			if (res.code === 200 && res.data) {
				joinTeams.value = res.data;
			}
		} catch (error) {
			console.error('获取加入的团队失败：', error);
			uni.showToast({
				title: '获取加入的团队失败',
				icon: 'none'
			});
		}
	};
	
	const handleGetID = (id) => {
		console.log('从 infoCard 获取到的 ID：', id);
	};
	
	onShow(()=>{
		getCreateTeam()
		getJoinTeam()
	})
	//等pinia重新处理解散业务
	

</script>

<style lang="scss" scoped>
	.tabControl{
		.content{
			.empty{
				width: 780rpx;
				height: 1262rpx;
				position: relative;
				.box{
					width: 330rpx;
					height: 330rpx;
					position: absolute;
					.font{
						font-size: 32rpx;
						color: #fff;
						text-align: center;
						margin-top: 10rpx;
						position: fixed;
						z-index: 999;
					}
					left: calc(50% - 165rpx);
					top: calc(50% - 330rpx);
				}
				.bg{
					width: 780rpx;
					height: 1262rpx;
					position: absolute;
					
				}
				
			}
			.teamList{
				margin-top: 48rpx;
				.avatar{
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 104rpx;
					height: 104rpx;
					border:1px solid transparent;
					border-radius: 40rpx;
					margin:0 24rpx 0 50rpx;
					.avatarImg{
						width: 104rpx;
						height: 104rpx;
					}
				}
			}
		}
	}
	.createTeam{
		.team{
			position: relative;
			.enterButton{
			width: 230rpx;
			height: 55rpx;
			text-align: center;
			border: 1px solid #fff;
			font-size: 32rpx;
			position: absolute;
			bottom: 30rpx;
			right: 70rpx;
				color: #fff;
			}
		}
	 		}
	.enterTeam{
		.team{
			position: relative;
			.enterButton{
			width: 230rpx;
			height: 55rpx;
			text-align: center;
			border: 1px solid #fff;
			font-size: 32rpx;
			position: absolute;
			bottom: 30rpx;
			right: 70rpx;
				color: #fff;
			}
		}
		
	}
	.createTeam{
		.team{
			position: relative;
			.enterButton{
				font-size: 32rpx;
			position: absolute;
			bottom: 30rpx;
			right: 70rpx;
				color: #fff;
			}
		}
		
	}
	.createTeam{
		.team{
			position: relative;
			.enterButton{
				font-size: 32rpx;
			position: absolute;
			bottom: 30rpx;
			right: 70rpx;
				color: #fff;
			}
		}
		
	}
</style>
