<template>
  <view class="chat-page">
    <!-- 头部信息卡 -->
    <view class="header">
      <infoCard>
        <template #name>
          对一题就队
        </template>
		<template #img>
			<view class="avatar">
				<image class="avatarImg" src="../../static/images/队伍图标2.jpg" mode="aspectFill"></image>
			</view>
		</template>
      </infoCard>
    </view>

    <!-- 聊天内容区域 -->
    <scroll-view class="chat-content" scroll-y>
		<view class="historyTime">
			今天 8:36
		</view>
      <!-- 聊天消息会在这里显示 -->
      <view class="chat-body" v-for="(item, index) in messages" :key="index">
        <!-- 别人发的信息 -->
        <view class="chat-left" v-if="item.type == 1">
          <image src="../../static/images/avatar3.png" mode="aspectFill"></image>
          <view class="textarea">
            {{ item.text }}
            <view class="time">
              {{ item.time }}
            </view>
          </view>
        </view>
        <!-- 自己发的信息 -->
        <view class="chat-right" v-if="item.type == 2">
          <!-- 文本消息 -->
          <view class="textarea" v-if="!item.isImage">
            {{ item.text }}
            <view class="time">
              {{ item.time }}
            </view>
          </view>
          <!-- 图片消息 -->
          <view class="img" v-else>
            <image 
              :src="item.text"
              mode="widthFix" 
              class="chat-image"
              @tap="previewImage(item.text)"
            />
            <view class="time">
              {{ item.time }}
            </view>
          </view>
          <image src="../../static/images/avatar.png" mode="aspectFill"></image>
        </view>
      </view>
    </scroll-view>

    <!-- 输入框和发送按钮 -->
    <view class="input-area" :class="{ 'show-function': isShowFunction }">
		<!-- 输入框 -->
      <view class="top-area">
        <input type="text" v-model="message" placeholder="输入消息..." @input="handleInput" />
        <uni-icons @click="showFunction" type="plus" size="40" v-show="!message" style="margin-left: 20rpx;"></uni-icons>
        <button class="sendMessage" v-show="message" @click="sendMessage">
          <view class="font">发送</view>
        </button>
      </view>
	  <!-- 功能模块 -->
      <transition name="slide-up">
        <view class="function" v-show="isShowFunction">
         <view class="icon" @click="chooseAndSendImage">
           <uni-icons type="image" size="40"></uni-icons>
           <view class="font">相册</view>
         </view>
          <view class="icon">
            <uni-icons type="camera" size="40"></uni-icons>
            <view class="font">拍摄</view>
          </view>
          <view class="icon">
            <uni-icons type="email" size="40"></uni-icons>
            <view class="font">文件</view>
          </view>
          <view class="icon">
            <uni-icons type="phone" size="40"></uni-icons>
            <view class="font">语音通话</view>
          </view>
          <view class="icon">
            <uni-icons type="location" size="40"></uni-icons>
            <view class="font">位置</view>
          </view>
          <view class="icon" @click="exchangeWechat">
            <uni-icons type="weixin" size="40"></uni-icons>
            <view class="font">交换微信</view>
          </view>
         
        </view>
      </transition>
    </view>
	<uni-popup ref="isOpen" type="dialog" >
		<uni-popup-dialog
		type="success"
		cancelText="取消"
		confirmText="确定"
		content="您确定要交换联系方式吗?"
		@confirm="dialogConfirm"
		></uni-popup-dialog>
	</uni-popup>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';

// 消息列表
const messages = ref([
  { type: 1, text: 'Hello!', time: '9:32' },
  { type: 2, text: 'Hi!', time: '9:33' },
]);

// 当前输入的消息
const message = ref('');

// 控制功能区显示
const isShowFunction = ref(false);

//控制弹窗
const isOpen=ref(null)

// 发送消息的方法
const sendMessage = () => {
  if (message.value.trim()) {
    const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
    messages.value.push({ type: 2, text: message.value, time: currentTime });
    message.value = '';
  }
};

// 显示功能区
const showFunction = () => {
  isShowFunction.value = !isShowFunction.value;
};

// 输入框相关操作
const handleInput = () => {
  // 可以在这里处理输入框的其他逻辑
};

//功能区的方法
const exchangeWechat=()=>{
	console.log('111')
	isOpen.value.open();
	msg.value='您确定要交换联系方式吗？'

}
const dialogConfirm=()=>{
	const msg='我的微信是: yangbaba';
	const currentTime=new Date().toLocaleTimeString('zh-CN',{hour12:false}).slice(0,5)
	
	messages.value.push({type:2,text:msg,time:currentTime})
}

// 添加图片预览功能
const previewImage = (url) => {
  uni.previewImage({
    urls: [url],
    current: url
  });
};

// 选择并发送图片
const chooseAndSendImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0];
      const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
      
      messages.value.push({
        type: 2,
        text: tempFilePath,
        time: currentTime,
        isImage: true
      });

      // 关闭功能面板
      isShowFunction.value = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  
  .header {
    padding: 20rpx;
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

  .chat-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border-top: 1px solid #ddd;
    height: 750rpx;
	.historyTime{
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		text-align: center;
		color: #adadad;
	}
    .chat-left {
      display: flex;
      align-items: start;
      height: 140rpx;
      image {
        width: 100rpx;
        height: 100rpx;
        padding-right: 30rpx;
      }
      .textarea {
        display: block;
        margin-top: 10rpx;
         border-radius: 15rpx 0% 15rpx 15rpx;
        font-size: 30rpx;
        height: 80rpx;
        background-color: #fff;
        line-height: 80rpx;
        padding: 0rpx 12rpx;
        box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
      }
      .time {
        font-size: 24rpx;
        display: block;
        color: #ccc;
        margin-top: -15rpx;
      }
    }

    .chat-right {
      display: flex;
      align-items: start;
      justify-content: flex-end;
      height: 140rpx;
      image {
        width: 100rpx;
        height: 100rpx;
        padding-right: 30rpx;
      }
      .textarea {
        max-width: 550rpx;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: block;
        margin-top: 10rpx;
        border-radius: 15rpx 0% 15rpx 15rpx;
        font-size: 30rpx;
        height: 80rpx;
        background-color: #95ec69;
        line-height: 80rpx;
        padding: 0rpx 12rpx;
        box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
        margin-right: 30rpx;
		.img{
			width: 250rpx;
			height: 290rpx;
			.chat-image {
			  max-width: 400rpx;
			  width: 100%;
			  height: 100%;
			  border-radius: 15rpx;
			  background-color: #95ec69;
			  box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
			}
		}
        
      }
      .time {
        font-size: 24rpx;
        display: block;
        color: #ccc;
        margin-top: -15rpx;
      }
	  
    }
  }

  .input-area {
    position: fixed;
    bottom: 0;
    background-color: #f7f7f7;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    height: 130rpx;
    transition: height 0.3s ease;
    overflow: hidden;


    &.show-function {
      height: 500rpx;
    }

    .top-area {
      display: flex;
	border-bottom: 1rpx solid #e3e3e3;
	padding-bottom: 18rpx;
      input {
        width: 530rpx;
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin-right: 10px;
      }

      .sendMessage {
        border: none;
        border-radius: 20rpx;
        background-color: #1aad19;
        color: #fff;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        height: 70rpx;
        width: 120rpx;
      }
    }

    .function {
      display: flex;
      height: 400rpx;
      padding-left: 30rpx;
      padding-top: 30rpx;
      flex-wrap: wrap;
	padding-bottom: 20rpx;
      .icon {
        margin-right: 60rpx;
        width: 110rpx;
        height: 110rpx;
        background-color: #f7f7f7;
        text-align: center;
        line-height: 110rpx;
        border-radius: 30%;
		
        .font {
          line-height: 10rpx;
          color: #8a8a8a;
          font-size: 24rpx;
		  :last-child{
			  
		  }
        }
      }
    }
  }
}
</style>

