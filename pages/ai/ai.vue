<template>
  <view class="chat-page">
    <!-- 聊天内容区域 -->
    <scroll-view
      class="chat-content"
      :class="{ 'content-shrink': isShowFunction }"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="onScrollToLower"
      id="chatScroll"
    >
      <view class="historyTime"> 今天 8:36 </view>
      <!-- 聊天消息会在这里显示 -->
      <view class="chat-body" v-for="(item, index) in messages" :key="index">
        <!-- 别人发的信息 -->
        <view class="chat-left" v-if="item.type == 1">
          <image
            src="../../static/images/人工智能.png"
            mode="aspectFit"
          ></image>
          <view class="message-container">
            <view class="textarea">
              {{ item.text }}
            </view>
            <view class="time">
              {{ item.time }}
            </view>
          </view>
        </view>
        <!-- 自己发的信息 -->
        <view class="chat-right" v-if="item.type == 2">
          <view class="message-container">
            <!-- 文本消息 -->
            <view class="textarea" v-if="!item.isImage">
              {{ item.text }}
            </view>
            <!-- 图片消息 -->
            <view class="img" v-else>
              <image
                :src="item.text"
                mode="widthFix"
                class="chat-image"
                @tap="previewImage(item.text)"
              />
            </view>
            <view class="time">
              {{ item.time }}
            </view>
          </view>
          <image src="../../static/images/avatar.png" mode="aspectFill"></image>
        </view>
      </view>
      <!-- 添加底部间距，防止最后一条消息被遮挡 -->
      <view style="height: 120rpx"></view>
    </scroll-view>

    <!-- 输入框和发送按钮 -->
    <view class="input-area" :class="{ 'show-function': isShowFunction }">
      <!-- 输入框 -->
      <view class="top-area">
        <input
          type="text"
          v-model="message"
          placeholder="输入消息..."
          @input="handleInput"
        />
        <uni-icons
          @click="showFunction"
          type="plus"
          size="40"
          v-show="!message"
          style="margin-left: 20rpx"
        ></uni-icons>
        <button class="sendMessage" v-show="message" @click="sendMessage">
          <view class="font">发送</view>
        </button>
      </view>
      <!-- 功能模块 -->
      <transition name="slide-up">
        <view class="function" v-show="isShowFunction">
          <view
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding-top: 20rpx;
              padding-bottom: 20rpx;
            "
            ><uni-icons type="email" size="40"></uni-icons>
            <view>暂不支持文件读取</view></view
          >
        </view>
      </transition>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { zhipuChat, zhipuResult } from "../../api/ai";

// 添加scrollTop变量
const scrollTop = ref(0);

// 消息列表
const messages = ref([
  {
    type: 1,
    text: "你好！我是Teammate的AI助手。",
    time: "9:32",
  },
  {
    type: 1,
    text: "有比赛相关的什么问题请尽管问",
    time: "9:32",
    loading: false,
  },
  { type: 2, text: "Hi！我想问的是.....", time: "9:33" },
]);

// 当前输入的消息
const message = ref("");

// 控制功能区显示
const isShowFunction = ref(false);

// 显示功能区
const showFunction = () => {
  isShowFunction.value = !isShowFunction.value;

  // 如果显示功能区，等待DOM更新后滚动到底部
  if (isShowFunction.value) {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }
};

// 修改 scrollToBottom 方法
const scrollToBottom = () => {
  uni.nextTick(() => {
    setTimeout(() => {
      const query = uni.createSelectorQuery();
      query.select("#chatScroll").boundingClientRect();
      query.select("#chatScroll").scrollOffset();
      query.exec((res) => {
        if (res[1]) {
          scrollTop.value = res[1].scrollTop + res[0].height + 50;
        }
      });
    }, 100);
  });
};

// 发送消息的方法
const sendMessage = async () => {
  const currentMessage = message.value;
  message.value = "";
  if (currentMessage.trim()) {
    // 获取当前时间的时分
    const currentTime = new Date()
      .toLocaleTimeString("zh-CN", { hour12: false })
      .slice(0, 5);

    // 添加用户消息
    messages.value.push({
      type: 2,
      text: currentMessage,
      time: currentTime,
      isImage: false,
    });

    // 添加一个加载中的消息
    messages.value.push({
      type: 1,
      text: "思考中...",
      time: currentTime,
      loading: true,
    });

    try {
      // 第一步：发起异步对话
      const aiChat = await zhipuChat(currentMessage);
      const taskId = aiChat.id;

      // 轮询获取结果
      let pollCount = 0;
      const maxPoll = 20; // 最多轮询20次
      let result = null;

      while (pollCount < maxPoll) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const aiRes = await zhipuResult(taskId);
        console.log("智谱回复aiRes", aiRes);
        if (aiRes.task_status === "SUCCESS") {
          result = aiRes;
          break;
        }
        if (aiRes.task_status === "FAILED") {
          break;
        }
        pollCount++;
      }

      // 移除加载中的消息
      messages.value = messages.value.filter((msg) => !msg.loading);

      if (result && result.choices && result.choices.length > 0) {
        messages.value.push({
          type: 1,
          text: result.choices[0].message.content,
          time: new Date()
            .toLocaleTimeString("zh-CN", { hour12: false })
            .slice(0, 5),
          loading: false,
        });
      } else {
        messages.value.push({
          type: 1,
          text: "抱歉，AI暂时没有返回结果，请稍后再试。",
          time: new Date()
            .toLocaleTimeString("zh-CN", { hour12: false })
            .slice(0, 5),
          loading: false,
        });
      }
    } catch (error) {
      // 移除加载中的消息
      messages.value = messages.value.filter((msg) => !msg.loading);

      messages.value.push({
        type: 1,
        text: "抱歉，AI请求出错，请稍后再试。",
        time: new Date()
          .toLocaleTimeString("zh-CN", { hour12: false })
          .slice(0, 5),
        loading: false,
      });
    }
  }
  scrollToBottom();
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
    .avatar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 104rpx;
      height: 104rpx;
      border: 1px solid transparent;
      border-radius: 40rpx;
      margin: 0 24rpx 0 50rpx;
      .avatarImg {
        width: 104rpx;
        height: 104rpx;
      }
    }
  }
  .input-area {
    width: 100%;
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
      justify-content: center;
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
          :last-child {
          }
        }
      }
    }
  }
}
.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border-top: 1px solid #ddd;
  height: calc(100vh - 134rpx); // 使用计算高度，减去头部和输入框高度
  transition: height 0.3s ease;

  // 当功能区显示时，减小聊天内容区域高度
  &.content-shrink {
    height: calc(100vh - 500rpx); // 减去头部、输入框和功能区高度
  }
  .historyTime {
    padding-top: 20rpx;
    padding-bottom: 40rpx;
    text-align: center;
    color: #adadad;
  }
  .chat-left {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      padding-right: 30rpx;
      flex-shrink: 0;
    }
    .message-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      .textarea {
        max-width: 70vw; // 限制最大宽度为屏幕70%
        min-width: 80rpx;
        min-height: 60rpx;
        background-color: #fff;
        border-radius: 15rpx 0% 15rpx 15rpx;
        font-size: 30rpx;
        line-height: 48rpx;
        padding: 20rpx 24rpx;
        box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
        word-break: break-all; // 强制长单词换行
        white-space: pre-wrap; // 保留换行
        box-sizing: border-box;
        position: relative;
        display: block; // 保证块级元素
      }
      
      .time {
        font-size: 24rpx;
        color: #ccc;
        margin-top: 8rpx;
        margin-left: 10rpx;
      }
    }
  }

  .chat-right {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-bottom: 40rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      padding-right: 30rpx;
      flex-shrink: 0;
    }
    .message-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 30rpx;
      
      .textarea {
        max-width: 70vw; // 限制最大宽度为屏幕70%
        min-width: 80rpx;
        min-height: 60rpx;
        background-color: #95ec69;
        border-radius: 15rpx 0% 15rpx 15rpx;
        font-size: 30rpx;
        line-height: 48rpx;
        padding: 20rpx 24rpx;
        box-shadow: 0 12rpx 12rpx rgba(0, 0, 0, 0.1);
        word-break: break-all;
        white-space: pre-wrap;
        box-sizing: border-box;
        position: relative;
        display: block;
      }
      
      .img {
        max-width: 70vw;
        background-color: #95ec69;
        border-radius: 15rpx 0% 15rpx 15rpx;
        padding: 10rpx;
        
        .chat-image {
          width: 100%;
          border-radius: 8rpx;
        }
      }
      
      .time {
        font-size: 24rpx;
        color: #ccc;
        margin-top: 8rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
