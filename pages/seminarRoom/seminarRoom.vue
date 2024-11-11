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
						<view class="createTeam empty" v-if="isemptycreateteam">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode="">
							<view class="font">
								你还没有创建任何团队呢~
							</view>
							</image>
							
						</view>
						<view class="createTeam" v-if="!isemptycreateteam">
							<view class="teamList">
								<infoCard>
									<template #name>马晓楠</template>
								</infoCard>
							</view>
						</view>
					</view>
					<!-- 加入的团队 -->
					<view v-if="current === 1">
						<view class="enterTeam empty" v-if="!isemptyenterteam">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode="">
								<view class="font">
									你还没有加入任何团队呢~
								</view>
								
							</image>
							
						</view>
						<view class="enterTeam">
							<view class="teamList" v-if="isemptyenterteam">
								<navigator url="/pages/chatRoom/chatRoom" class="team">
									<infoCard>
										<template #name>马晓楠</template>
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
	import {ref} from 'vue'
	
	// 选项卡
	const current=ref(0)
	const items=ref(['我创建的团队', '我加入的团队'])
	const styleType=ref('button')
	const activeColor=ref('#AC33C1')
	
	const onClickItem=(e)=>{
		if (current.value !== e.currentIndex) {
			current.value= e.currentIndex
		}
	}
	//选项卡内容
	const isemptyenterteam=ref(true)
	const isemptycreateteam=ref(false)
</script>

<style lang="scss" scoped>
	.tabControl{
		.content{
			.empty{
				width: 390px;
				height: 631px;
				position: relative;
			.createTeam{
				position: relative;
             		}
			
				.box{
					width: 165px;
					height: 165px;
					position: absolute;
					left: calc(50% - 82.5px);
					top: calc(50% - 165px);
					.font{
						font-size: 32rpx;
						color: #fff;
						text-align: center;
						margin-top: 10rpx;
						position: fixed;
						z-index: 999;
					}
				}
				.bg{
					width: 390px;
					height: 631px;
					position: absolute;
					
				}
				
			}
			.teamList{
				margin-top: 24px;
			}
		}
	}
	.enterTeam{
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
