<template>
  <view class="chat-page">
    <!-- 头部信息卡 -->
    <view class="header">
      <infoCard>
        <template #name>
          {{ teamInfo.name || '对一题就队' }}
        </template>
        <template #img>
          <view class="avatar">
            <image class="avatarImg" :src="teamInfo.icon || '../../static/images/队伍图标2.jpg'" mode="aspectFill"></image>
          </view>
        </template>
        <!-- 添加未读消息数量显示 -->
        <template #extra v-if="unreadCount > 0">
          <view class="unread-badge">
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </view>
        </template>
      </infoCard>
    </view>

    <!-- 群公告栏 -->
    <transition name="fade">
      <view v-if="showAnnouncementBar" class="announcement-bar">
        <view class="announcement-content">
          <uni-icons type="volume-up" size="28" color="#AC33C1" style="margin-right: 12rpx;" />
          <view class="announcement-text">
            {{ announcement || '暂无群公告' }}
          </view>
          <view v-if="isLeader" class="edit-btn" @click="openAnnouncementDialog">
            <uni-icons type="compose" size="24" color="#888" />
          </view>
        </view>
        <uni-icons type="closeempty" size="28" class="close-btn" @click="showAnnouncementBar = false" />
      </view>
    </transition>

    <!-- 聊天内容区域 -->
    <scroll-view class="chat-content" :class="{ 'content-shrink': isShowFunction }" scroll-y :scroll-top="scrollTop"
      @scrolltolower="onScrollToLower" id="chatScroll">
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
            <image :src="item.text" mode="widthFix" class="chat-image" @tap="previewImage(item.text)" />
            <view class="time">
              {{ item.time }}
            </view>
          </view>
          <image src="../../static/images/avatar.png" mode="aspectFill"></image>
        </view>
      </view>
      <!-- 添加底部间距，防止最后一条消息被遮挡 -->
      <view style="height: 120rpx;"></view>
    </scroll-view>

    <!-- 输入框和发送按钮 -->
    <view class="input-area" :class="{ 'show-function': isShowFunction }">
      <!-- 输入框 -->
      <view class="top-area">
        <input type="text" v-model="message" placeholder="输入消息..." @input="handleInput" />
        <uni-icons @click="showFunction" type="plus" size="40" v-show="!message"
          style="margin-left: 20rpx;"></uni-icons>
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
          <!-- 群公告按钮 -->
          <view class="icon" @click="showAnnouncementDialog">
            <uni-icons type="mail-open" size="40"></uni-icons>
            <view class="font">查看群公告</view>
          </view>
        </view>
      </transition>
    </view>
    <uni-popup ref="isOpen" type="dialog">
      <uni-popup-dialog type="success" cancelText="取消" confirmText="确定" content="您确定要交换联系方式吗?"
        @confirm="dialogConfirm"></uni-popup-dialog>
    </uni-popup>

    <!-- 群公告弹窗 -->
    <uni-popup ref="announcementPopup" type="dialog">
      <uni-popup-dialog
        :type="isLeader ? 'info' : 'success'"
        :title="isLeader ? '编辑群公告' : '群公告'"
        :mode="isLeader ? 'input' : 'base'"
        :value="announcementEdit"
        :content="!isLeader ? (announcement || '暂无群公告') : ''"
        :placeholder="'请输入群公告内容'"
        :showCancelButton="isLeader"
        cancelText="取消"
        confirmText="确定"
        @confirm="onAnnouncementConfirm"
        @input="onAnnouncementInput"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { getChatMessages, markMessagesAsRead, getUnreadCount, uploadFile } from '../../api/chat.js';
import {onLoad} from '@dcloudio/uni-app';
import {  getUserInfoAPI } from '@/api/userInfo';

// 添加scrollTop变量
const scrollTop = ref(0);

// 消息列表
const messages = ref([
  { type: 1, text: 'Hello!', time: '9:32' },
  { type: 2, text: 'Hi!', time: '9:33' },
]);

// 当前输入的消息
const message = ref('');

// 控制功能区显示
const isShowFunction = ref(false);

// 控制弹窗
const isOpen = ref(null);
const msg = ref('');

// WebSocket连接
let socket = false; // 使用布尔值标记连接状态
const chatRoomId = ref(null);

// 团队信息
const teamInfo = ref({});

// 未读消息数量
const unreadCount = ref(0);

// 用户名
const currentUsername = ref('');

onLoad((options) => {
  chatRoomId.value = options.chatRoomId;
  // 获取用户名
  getUsernameFromAPI();
});

// 获取用户名的方法
const getUsernameFromAPI = async () => {
  try {
    const res = await getUserInfoAPI();
    if (res && res.data && res.data.username) {
      currentUsername.value = res.data.username;
      // 同时保存到本地存储，确保其他地方也能使用
      uni.setStorageSync('username', res.data.username);
      console.log('获取到的用户名:', currentUsername.value);
    } else {
      console.error('获取用户信息失败或用户名为空');
    }
  } catch (error) {
    console.error('获取用户名出错:', error);
  }
};

// 获取页面参数
onMounted(() => {
  console.log('聊天室ID:', chatRoomId.value);
  console.log('当前用户名:', currentUsername.value);
  
  // 如果有chatRoomId，则初始化WebSocket连接并获取历史消息
  if (chatRoomId.value) {
    // 获取团队信息
    getTeamInfo();
    // 获取未读消息数量
    getUnreadMessageCount();
    // 初始化WebSocket
    initWebSocket();
    // 加载历史消息
    loadHistoryMessages();
    // 标记消息为已读
    markAsRead();
  } else {
    uni.showToast({
      title: '聊天室ID不存在',
      icon: 'none'
    });
  }
});

// 显示功能区
const showFunction = () => {
  isShowFunction.value = !isShowFunction.value;
  
  // 如果显示功能区，等待DOM更新后滚动到底部
  if (isShowFunction.value) {
    setTimeout(() => {
      scrollToBottom();
    }, 300); // 等待过渡动画完成
  }
};// 获取团队信息
const getTeamInfo = () => {
  // 这里可以根据chatRoomId获取团队信息
  // 可以从上一个页面传递过来，也可以通过API获取
  // 暂时使用默认值
  teamInfo.value = {
    name: '对一题就队',
    icon: '../../static/images/队伍图标2.jpg'
  };
};

// 获取未读消息数量
const getUnreadMessageCount = async () => {
  try {
    if (!chatRoomId.value) return;
    
    const res = await getUnreadCount([chatRoomId.value]);
    if (res.code === 200 && res.data) {
      const chatRoomData = res.data.find(item => item.chatRoomId === parseInt(chatRoomId.value));
      if (chatRoomData) {
        unreadCount.value = chatRoomData.count;
      }
    }
  } catch (error) {
    console.error('获取未读消息数量失败:', error);
  }
};

// 标记消息为已读
const markAsRead = async () => {
  try {
    if (!chatRoomId.value) return;
    
    const res = await markMessagesAsRead(chatRoomId.value);
    if (res.code === 200) {
      // 标记成功后，将未读消息数量设为0
      unreadCount.value = 0;
    }
  } catch (error) {
    console.error('标记消息为已读失败:', error);
  }
};

// 在组件销毁时关闭WebSocket连接
onUnmounted(() => {
  closeWebSocket();
});

// 初始化WebSocket连接
const initWebSocket = () => {
  try {
    // 获取存储的token
    const token = uni.getStorageSync('token');
    // WebSocket连接地址
    const wsUrl = `ws://117.72.54.182:8898/chat/${chatRoomId.value}`;
    
    // 先检查是否已有连接
    if (socket) {
      console.log('WebSocket已连接，无需重新连接');
      return;
    }
    
    // 创建WebSocket连接
    uni.connectSocket({
      url: wsUrl,
      success: () => {
        console.log('WebSocket连接请求发送成功');
      },
      fail: (error) => {
        console.error('WebSocket连接请求失败:', error);
      }
    });
    
    // 监听WebSocket连接打开
    uni.onSocketOpen(function() {
      console.log('WebSocket连接已打开');
      socket = true; // 标记连接已建立
    });
    
    // 监听WebSocket错误
    uni.onSocketError(function(error) {
      console.error('WebSocket连接错误:', error);
      socket = false; // 标记连接已断开
      uni.showToast({
        title: 'WebSocket连接失败',
        icon: 'none'
      });
      
      // 5秒后尝试重连
      setTimeout(() => {
        if (!socket) {
          console.log('尝试重新连接WebSocket');
          initWebSocket();
        }
      }, 5000);
    });
    
    // 监听WebSocket接收到服务器的消息
    uni.onSocketMessage(function(res) {
      try {
        const data = JSON.parse(res.data);
        console.log('收到消息:', data);
        
        // 处理接收到的消息
        if (data.messageType) {  // 使用messageType字段
          const isImage = data.messageType === 'img';  // 判断是否为图片消息
          
          // 从sendTime中提取时分秒
          let currentTime = '';
          if (data.sendTime) {
            // 提取时间部分 (HH:mm:ss)
            const timeMatch = data.sendTime.match(/\d{2}:\d{2}:\d{2}/);
            if (timeMatch) {
              // 只保留时和分
              currentTime = timeMatch[0].substring(0, 5);
            } else {
              // 如果没有匹配到，使用当前时间
              currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
            }
          } else {
            // 如果没有sendTime字段，使用当前时间
            currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
          }
          
          // 优先使用组件内的用户名变量，如果为空则尝试从本地存储获取
          const username = currentUsername.value || uni.getStorageSync('username');
          console.log('消息判断使用的用户名:', username, '消息中的用户名:', data.username);
          
          const newMessage = {
            type: data.username === username ? 2 : 1,
            text: data.content,
            time: currentTime,
            isImage: isImage
          };
          
          // 避免重复添加自己发送的消息
          const isDuplicate = messages.value.some(msg => 
            msg.text === newMessage.text && 
            msg.type === newMessage.type &&
            msg.time === newMessage.time
          );
          
          if (!isDuplicate) {
            messages.value.push(newMessage);
            scrollToBottom();
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error);
      }
    });
    
    // 监听WebSocket关闭
    uni.onSocketClose(function() {
      console.log('WebSocket连接已关闭');
      socket = false; // 标记连接已断开
      
      // 3秒后尝试重连
      setTimeout(() => {
        if (!socket) {
          console.log('连接已关闭，尝试重新连接');
          initWebSocket();
        }
      }, 3000);
    });
    
    // 添加心跳检测，保持连接
    startHeartbeat();
  } catch (error) {
    console.error('初始化WebSocket失败:', error);
  }
};

// 心跳检测
let heartbeatTimer = null;
const startHeartbeat = () => {
  // 清除可能存在的旧定时器
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
  }
  
  // 每30秒发送一次心跳
  heartbeatTimer = setInterval(() => {
    if (socket) {
      console.log('发送心跳包');
      uni.sendSocketMessage({
        data: JSON.stringify({ type: 'heartbeat', chatRoomId: chatRoomId.value }),
        fail: (error) => {
          console.error('心跳发送失败:', error);
          socket = false;
          clearInterval(heartbeatTimer);
          
          // 尝试重连
          setTimeout(() => {
            initWebSocket();
          }, 1000);
        }
      });
    } else {
      console.log('WebSocket未连接，尝试重连');
      clearInterval(heartbeatTimer);
      initWebSocket();
    }
  }, 30000);
};

// 关闭WebSocket连接
const closeWebSocket = () => {
  try {
    if (socket) {
      uni.closeSocket({
        success: () => {
          console.log('WebSocket关闭成功');
          socket = false;
        },
        fail: (error) => {
          console.error('WebSocket关闭失败:', error);
        },
        complete: () => {
          socket = false;
          
          // 清除心跳定时器
          if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
          }
        }
      });
    }
  } catch (error) {
    console.error('关闭WebSocket出错:', error);
  }
};

// 加载历史消息
const loadHistoryMessages = async () => {
  try {
    const result = await getChatMessages(chatRoomId.value);
    if (result && result.code === 200 && result.data) {
      // 清空当前消息列表
      messages.value = [];
      
      // 优先使用组件内的用户名变量，如果为空则尝试从本地存储获取
      const username = currentUsername.value || uni.getStorageSync('username');
      console.log('历史消息判断使用的用户名:', username);
      
      // 添加历史消息
      result.data.forEach(item => {
        // 从sendTime中提取时分秒
        let messageTime = '';
        if (item.sendTime) {
          // 提取时间部分 (HH:mm:ss)
          const timeMatch = item.sendTime.match(/\d{2}:\d{2}:\d{2}/);
          if (timeMatch) {
            // 只保留时和分
            messageTime = timeMatch[0].substring(0, 5);
          } else {
            // 如果没有匹配到，使用timestamp
            messageTime = new Date(item.timestamp).toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
          }
        } else {
          // 如果没有sendTime字段，使用timestamp
          messageTime = new Date(item.timestamp).toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
        }
        
        // 判断是否为图片消息，使用messageType字段
        const isImage = item.messageType === 'img';
        
        messages.value.push({
          type: item.username === username ? 2 : 1, // 使用username判断是否为自己发送的消息
          text: item.content,
          time: messageTime,
          isImage: isImage // 使用正确的判断条件
        });
      });
      
      // 滚动到底部
      scrollToBottom();
    }
  } catch (error) {
    console.error('获取历史消息失败:', error);
    uni.showToast({
      title: '获取历史消息失败',
      icon: 'none'
    });
  }
};

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    const query = uni.createSelectorQuery();
    query.select('.chat-content').boundingClientRect();
    query.exec(function(res) {
      if (res && res[0]) {
        uni.pageScrollTo({
          scrollTop: res[0].height,
          duration: 300
        });
      }
    });
  }, 100);
};

// 发送消息的方法
const sendMessage = () => {
  if (message.value.trim()) {
    // 获取当前时间的时分
    const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
    
    // 构造消息对象 
    const messageData = {
      messageType: 'text',
      content: message.value,
      username: currentUsername.value || uni.getStorageSync('username') // 添加用户名
    };
    
    // 发送消息到服务器
    console.log('发送消息:', JSON.stringify(messageData));
    uni.sendSocketMessage({
      data: JSON.stringify(messageData),
      success: () => {
        // 本地添加消息
        const newMessage = { 
          type: 2, // 2表示自己发送的消息
          text: message.value, 
          time: currentTime,
          isImage: false
        };
        
        messages.value.push(newMessage);
        
        // 清空输入框
        message.value = '';
        
        // 滚动到底部
        scrollToBottom();
        
        // 延迟加载历史消息，确保数据库已更新
        setTimeout(() => {
          loadHistoryMessages();
        }, 1000);
      },
      fail: (error) => {
        console.error('发送消息失败:', error);
        uni.showToast({
          title: '发送消息失败',
          icon: 'none'
        });
      }
    });
  }
};

// 交换微信确认
const dialogConfirm = () => {
  const msgText = '我的微信是: yangbaba';
  const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5);
  
  // 构造消息对象
  const messageData = {
    messageType: 'text',
    content: msgText,
    username: currentUsername.value || uni.getStorageSync('username') // 添加用户名
  };
  
  // 发送消息到服务器
  uni.sendSocketMessage({
    data: JSON.stringify(messageData),
    success: () => {
      // 本地添加消息
      messages.value.push({ 
        type: 2, 
        text: msgText, 
        time: currentTime 
      });
      
      // 滚动到底部
      scrollToBottom();
      
      // 延迟加载历史消息
      setTimeout(() => {
        loadHistoryMessages();
      }, 1000);
    }
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
      
      // 显示上传中提示
      uni.showLoading({
        title: '图片上传中...'
      });
      
      // 使用封装好的上传方法
      uploadFile(tempFilePath)
        .then(data => {
          if (data.code === 200) {
            const imageUrl = data.data.url;
            
            // 构造图片消息
            const messageData = {
              messageType: 'img',
              content: imageUrl,
              username: currentUsername.value || uni.getStorageSync('username')
            };
            
            // 发送消息到服务器
            uni.sendSocketMessage({
              data: JSON.stringify(messageData),
              success: () => {
                // 本地添加消息
                messages.value.push({
                  type: 2,
                  text: imageUrl,
                  time: currentTime,
                  isImage: true
                });
                
                // 滚动到底部
                scrollToBottom();
                
                // 延迟加载历史消息
                setTimeout(() => {
                  loadHistoryMessages();
                }, 1000);
              }
            });
          } else {
            uni.showToast({
              title: '图片上传失败: ' + (data.msg || '未知错误'),
              icon: 'none'
            });
          }
        })
        .catch(error => {
          console.error('上传图片失败:', error);
          uni.showToast({
            title: '图片上传失败',
            icon: 'none'
          });
        })
        .finally(() => {
          uni.hideLoading(); // 确保无论成功失败都会隐藏加载提示
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

  // 群公告栏样式
  .announcement-bar {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #f9e6ff 0%, #f5f5f5 100%);
    border-bottom: 1px solid #e5e5e5;
    padding: 18rpx 32rpx 18rpx 24rpx;
    font-size: 28rpx;
    color: #AC33C1;
    position: relative;
    .announcement-content {
      display: flex;
      align-items: center;
      flex: 1;
      .announcement-text {
        flex: 1;
        font-size: 28rpx;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .edit-btn {
        margin-left: 18rpx;
        cursor: pointer;
      }
    }
    .close-btn {
      margin-left: 18rpx;
      color: #bbb;
      cursor: pointer;
    }
  }

  .chat-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border-top: 1px solid #ddd;
    height: calc(100vh - 260rpx);
    transition: height 0.3s ease;
    &.content-shrink {
      height: calc(100vh - 630rpx);
    }
    .historyTime {
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
/* 群公告渐变动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>



