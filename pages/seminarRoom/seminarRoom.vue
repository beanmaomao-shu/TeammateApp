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
					<view v-if="current === 0">
						<view class="enterTeam empty" v-if="isemptyenterteam">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode=""></image>
						</view>
						<view class="enterTeam" v-if="!isemptyenterteam">
							<view class="teamList">
								<infoCard>
									<template #name>马晓楠</template>
								</infoCard>
							</view>
						</view>
					</view>
					<view v-if="current === 1">
						<view class="createTeam empty" v-if="isemptycreateteam">
							<image class="bg" src="../../static/images/background.png" mode=""></image>
							<image class="box" src="../../static/images/default.png" mode=""></image>
						</view>
						<view class="createTeam">
							<view class="teamList" v-if="!isemptycreateteam">
								<infoCard>
									<template #name>马晓楠</template>
								</infoCard>
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
	const isemptyenterteam=ref(false)
	const isemptycreateteam=ref(true)
</script>

<style lang="scss" scoped>
	.tabControl{
		.content{
			.empty{
				width: 390px;
				height: 631px;
				position: relative;
				.box{
					width: 165px;
					height: 165px;
					position: absolute;
					left: calc(50% - 82.5px);
					top: calc(50% - 165px);
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
</style>
