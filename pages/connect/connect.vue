<template>
	<view class="connect">
		<dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
		<view class="text">
			<text>联系类型</text>
		</view>
		<!-- 显示选项 -->
		 <van-cell center title="拨打电话" is-link :value="phone"  @click="openPhone">
		   <image class='mine_headicon' src='../../static/images/connect_phone.png' slot="icon"></image>
		 </van-cell>
		 <van-cell center title="添加微信" is-link :value="wechat" @click="openWechat">
		   <image class='mine_headicon' src='../../static/images/connect_wechat.png' slot="icon"></image>
		 </van-cell>
		 <van-cell center title="浏览名片" is-link :value="infocard" @click="openInfocard">
		   <image class='mine_headicon' src='../../static/images/connect_infocard.png' slot="icon"></image>
		 </van-cell>
		 <!-- 输入框弹出层 -->
		 <uni-popup ref="phoneRef" type="dialog">
		   <uni-popup-dialog mode="input" message="电话" duration="2000" before-close="true" @close="closePhone" @confirm="confirmPhone"></uni-popup-dialog>
		 </uni-popup>
		 <uni-popup ref="wechatRef" type="dialog">
		   <uni-popup-dialog mode="input" message="微信" duration="2000" before-close="true" @close="closeWechat" @confirm="confirmWechat"></uni-popup-dialog>
		 </uni-popup>
		 <uni-popup ref="infocardRef" type="dialog">
		   <uni-popup-dialog mode="input" message="名片" duration="2000" before-close="true" @close="closeInfocard" @confirm="confirmInfocard"></uni-popup-dialog>
		 </uni-popup>
	</view>
</template>

<script setup>
	import { ref, nextTick } from 'vue';
	const phone=ref('(空)');
	const wechat=ref('(空)');
	const infocard=ref('(空)');
	
	
	// 弹出输入框
	const phoneRef = ref(null);
	const wechatRef = ref(null);
	const infocardRef = ref(null);
	
	 // phone的弹出框
	const openPhone = () => {
	  phoneRef.value.open()
	}
	
	const closePhone = () => {
	  phoneRef.value.close()
	}
	
	const confirmPhone = async(value) => {
	  phone.value=value
	  phoneRef.value.close()
	}
	 // wechat的弹出框
	const openWechat = () => {
	  wechatRef.value.open()
	}
	
	const closeWechat = () => {
	  wechatRef.value.close()
	}
	
	const confirmWechat = async(value) => {
	  wechat.value=value
	  wechatRef.value.close()
	}
	
	 // infoCard的弹出框
	 const openInfocard = () => {
	   infocardRef.value.open()
	 }
	
	const closeInfocard = () => {
	  infocardRef.value.close()
	}
	
	const confirmInfocard = async(value) => {
	  infocard.value=value
	  infocardRef.value.close()
	}
</script>

<style lang="scss" scoped>
	.text{
		width: 700rpx;
		font-size: 28rpx;
		color:#999999;
		margin: 0 auto;
	}
	.mine_headicon{
	  width: 88rpx;
	  height: 88rpx;
	  margin-right:24rpx ;
	}
</style>
