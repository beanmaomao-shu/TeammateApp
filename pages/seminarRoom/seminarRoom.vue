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
								<navigator :url="`/pages/chatRoom/chatRoom?chatRoomId=${team.chatRoomId}`" class="team">
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
										<!-- 添加未读消息数量显示 -->
										<template #extra v-if="team.unreadCount && team.unreadCount > 0">
											<view class="unread-badge">
												{{ team.unreadCount > 99 ? '99+' : team.unreadCount }}
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
								<navigator :url="`/pages/chatRoom/chatRoom?chatRoomId=${team.chatRoomId}`" class="team">
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
										<!-- 添加未读消息数量显示 -->
										<template #extra v-if="team.unreadCount && team.unreadCount > 0">
											<view class="unread-badge">
												{{ team.unreadCount > 99 ? '99+' : team.unreadCount }}
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
	import {ref, onMounted } from 'vue'
	import {onLoad, onShow} from "@dcloudio/uni-app";
	import {getCreateTeamAPI, getJoinTeamAPI} from "@/api/team.js"
	import {getUnreadCount} from "@/api/chat.js"
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
	                chatRoomId: team.chatRoomId, // 确保包含chatRoomId
	                isLeader: true, // 在创建的团队中都是队长
	                unreadCount: 0 // 初始化未读消息数量
	            }));
	        
	            await getUnreadMessages();
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
				joinTeams.value = res.data.map(team => ({
					...team,
					unreadCount: 0 // 初始化未读消息数量
				}));
				// 获取未读消息数量
				await getUnreadMessages();
			}
		} catch (error) {
			console.error('获取加入的团队失败：', error);
			uni.showToast({
				title: '获取加入的团队失败',
				icon: 'none'
			});
		}
	};
	
	// 获取未读消息数量
	const getUnreadMessages = async () => {
		try {
			// 收集所有聊天室ID
			const allChatRoomIds = [
				...createTeams.value.map(team => team.chatRoomId),
				...joinTeams.value.map(team => team.chatRoomId)
			].filter(id => id); // 过滤掉可能的空值
			
			if (allChatRoomIds.length === 0) return;
			
			// 调用API获取未读消息数量
			console.log('所有聊天室ID：', allChatRoomIds);
			const res = await getUnreadCount(allChatRoomIds);
			console.log('获取未读消息数量：', res);
			
			if (res.code === 200 && res.data) {
				// 更新创建的团队未读消息数量
				createTeams.value = createTeams.value.map(team => {
					const unreadInfo = res.data.find(item => item.chatRoomId === team.chatRoomId);
					return {
						...team,
						unreadCount: unreadInfo ? unreadInfo.count : 0
					};
				});
				
				// 更新加入的团队未读消息数量
				joinTeams.value = joinTeams.value.map(team => {
					const unreadInfo = res.data.find(item => item.chatRoomId === team.chatRoomId);
					return {
						...team,
						unreadCount: unreadInfo ? unreadInfo.count : 0
					};
				});
			}
		} catch (error) {
			console.error('获取未读消息数量失败：', error);
		}
	};
	
	const handleGetID = (id) => {
		console.log('从 infoCard 获取到的 ID：', id);
	};
	
	onShow(()=>{
		getCreateTeam()
		getJoinTeam()
	})
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
	// 添加未读消息徽章样式
	.unread-badge {
	position: absolute;
	top: 10rpx;
	right: 10rpx;
	background-color: #ff4d4f;
	color: white;
	font-size: 24rpx;
	min-width: 40rpx;
	height: 40rpx;
	border-radius: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 10rpx;
	z-index: 10;
	}
</style>
