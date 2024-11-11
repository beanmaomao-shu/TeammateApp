<template>
  <view class="chat-page">
    <!-- 头部信息卡 -->
    <view class="header">
      <infoCard>
        <template #name>
          鸭鸭
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
          <image src="../../static/images/avatar.png" mode="aspectFill"></image>
          <view class="textarea">
            {{ item.text }}
            <view class="time">
              {{ item.time }}
            </view>
          </view>
        </view>
        <!-- 自己发的信息 -->
        <view class="chat-right" v-if="item.type == 2">
          <view class="textarea">
            {{ item.text }}
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
          <view class="icon">
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
          <view class="icon">
            <uni-icons type="image" size="40"></uni-icons>
            <view class="font">相册</view>
          </view>
        </view>
      </transition>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';

// 消息列表
const messages = ref([
  { type: 1, text: 'Hello!', time: '18:32' },
  { type: 2, text: 'Hi!', time: '18:33' },
]);

// 当前输入的消息
const message = ref('');

// 控制功能区显示
const isShowFunction = ref(false);

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
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  
  .header {
    padding: 20rpx;
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
        border-radius: 0 15% 15% 15%;
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
        border-radius: 15% 0% 15% 15%;
        font-size: 30rpx;
        height: 80rpx;
        background-color: #95ec69;
        line-height: 80rpx;
        padding: 0rpx 12rpx;
        box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
        margin-right: 30rpx;
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
        }
      }
    }
  }
}
</style>

<!-- ！遇到的问题
 聊天信息过长的话设置了自动换行，但是自动换行时相对应的气泡没有延伸下来。
 有个问题就是我的time设置在聊天信息框的盒子里了作为一个子元素，导致如果延伸的话会让time也渲染 显得很长
 -->