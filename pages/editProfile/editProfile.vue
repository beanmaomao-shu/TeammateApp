<template>
  <view class="profile-container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 头像区域 -->
    <view class="avatar-section">
      <view class="avatar-wrapper">
        <image class="avatar" src="../../static/images/avatar.png" mode="aspectFill"></image>
        <view class="edit-avatar">
          <uni-icons type="camera-filled" size="20" color="#fff"></uni-icons>
        </view>
      </view>
    </view>
    
    <!-- 表单区域 -->
    <view class="form-section">
      <!-- 基本信息 -->
      <view class="section-title">基本信息</view>
      <view class="form-group">
        <view class="form-item">
          <text class="label">昵称</text>
          <input type="text" v-model="profile.username" placeholder="鸭鸭"/>
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <picker @change="bindGenderChange" :value="profile.sex" :range="genderArray">
            <view class="picker">{{genderArray[profile.sex]}}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">学校</text>
          <input type="text" v-model="profile.school" placeholder="请输入学校"/>
        </view>
        <view class="form-item">
          <text class="label">所在城市</text>
          <input type="text" v-model="profile.location" placeholder="请输入所在城市"/>
        </view>
        
      </view>

      <!-- 联系方式 -->
      <view class="section-title">联系方式</view>
      <view class="form-group">
        <view class="form-item">
          <text class="label">手机号</text>
          <input type="number" v-model="profile.phone" placeholder="13432439031"/>
        </view>
        <view class="form-item">
          <text class="label">微信号</text>
          <input type="text" v-model="profile.wechatId" placeholder="13432439031"/>
        </view>
        <view class="form-item">
          <text class="label">邮箱</text>
          <input type="text" v-model="profile.email" placeholder="2845510544@QQ.COM"/>
        </view>
      </view>

      <!-- 获奖经历 -->
      <view class="section-title">获奖经历</view>
      <view class="form-group">
        <view class="awards-list">
          <view class="award-item" v-for="(award, index) in profile.awards" :key="index">
            <input type="text" v-model="award.name" placeholder="请输入奖项名称"/>
            <uni-icons @click="removeAward(index)" type="trash" size="20" color="#999"></uni-icons>
          </view>
          <view class="add-award" @click="addAward">
            <uni-icons type="plus" size="20" color="#7700ff"></uni-icons>
            <text>添加获奖经历</text>
          </view>
        </view>
      </view>

      <!-- 个人简介 -->
      <view class="section-title">个人简介</view>
      <view class="form-group">
        <textarea v-model="profile.introduction" placeholder="请输入个人简介" maxlength="200"/>
        <view class="word-count">{{profile.introduction.length}}/200</view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-btn" @click="saveProfile">保存</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { editUserInfoAPI, getUserInfoAPI } from '@/api/userInfo';

const genderArray = ['请选择性别', '男', '女'];

const profile = ref({
  username: '',
  sex: '',
  school: '',
  phone: '',
  wechatId: '',
  email: '',
  introduction: '',
  location: '',
  awards: []
});

// 获取用户现有信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoAPI();
    if (res.data) {
      // 处理 awards 数据，将字符串转换为数组
      let awardsArray = [];
      try {
        // 尝试解析 awards 字符串为数组
        awardsArray = res.data.awards ? JSON.parse(res.data.awards) : [];
      } catch (e) {
        console.error('解析 awards 失败：', e);
        awardsArray = [];
      }

      // 将用户名保存到本地存储，供聊天室使用
      if (res.data.username) {
        uni.setStorageSync('username', res.data.username);
        console.log('用户名已保存到本地存储:', res.data.username);
      }

      profile.value = {
        username: res.data.username || '',
        sex: res.data.sex === '男' ? 1 : (res.data.sex === '女' ? 2 : 0),
        school: res.data.school || '',
        phone: res.data.phone || '',
        wechatId: res.data.wechatId || '',
        email: res.data.email || '',
        introduction: res.data.introduction || '',
        location: res.data.location || '',
        awards: awardsArray.map(award => ({ name: award })) // 转换为对象数组用于显示
      };
    }
    console.log('获取到的用户信息：', profile.value);
  } catch (error) {
    console.error('获取用户信息失败：', error);
  }
};

// 保存个人资料
const saveProfile = async () => {
  try {
    // 表单验证
    if (!profile.value.username.trim()) {
      uni.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    // 处理 awards 数据
    const awardsArray = profile.value.awards
      .map(award => award.name)
      .filter(name => name.trim()); // 过滤空值

    // 格式化数据
    const formData = {
      username: String(profile.value.username || ''),
      sex: String(genderArray[profile.value.sex] || ''),
      school: String(profile.value.school || ''),
      phone: String(profile.value.phone || ''),
      wechatId: String(profile.value.wechatId || ''),
      email: String(profile.value.email || ''),
      awards: JSON.stringify(awardsArray), // 将数组转换为字符串
      location: String(profile.value.location || ''),
      introduction: String(profile.value.introduction || '')
    };

    // 调试输出
    console.log('准备提交的数据：', formData);

    const res = await editUserInfoAPI(formData);
    console.log(res)
    if (res.code === 200) {
      // 更新本地存储的用户名
      uni.setStorageSync('username', formData.username);
      console.log('用户名已更新到本地存储:', formData.username);
      
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    } else {
      throw new Error(res.message || '保存失败');
    }
  } catch (error) {
    console.error('保存失败：', error);
    uni.showToast({
      title: error.message || '保存失败，请重试',
      icon: 'none'
    });
  }
};

// 性别选择处理
const bindGenderChange = (e) => {
  profile.value.sex = parseInt(e.detail.value);
};

// 添加获奖经历
const addAward = () => {
  profile.value.awards.push({ name: '' });
};

// 删除获奖经历
const removeAward = (index) => {
  profile.value.awards.splice(index, 1);
};

// 页面加载时获取用户信息
onMounted(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;

  .header-bg {
    height: 300rpx;
    background: linear-gradient(to right, #7700ff, #8811ff);
    border-radius: 0 0 50rpx 50rpx;
  }

  .avatar-section {
    margin-top: -80rpx;
    display: flex;
    justify-content: center;
    
    .avatar-wrapper {
      position: relative;
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 4rpx solid #fff;
      overflow: hidden;
      box-shadow: 0 4rpx 20rpx rgba(119, 0, 255, 0.2);

      .avatar {
        width: 100%;
        height: 100%;
      }

      .edit-avatar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50rpx;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .form-section {
    margin: 40rpx 30rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin: 30rpx 0 20rpx;
    }

    .form-group {
      background: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      margin-bottom: 30rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

      .form-item {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .label {
          width: 140rpx;
          color: #666;
        }

        input, .picker {
          flex: 1;
          color: #333;
        }
      }

      textarea {
        width: 100%;
        height: 200rpx;
        padding: 20rpx;
        box-sizing: border-box;
      }

      .word-count {
        text-align: right;
        color: #999;
        font-size: 24rpx;
        margin-top: 10rpx;
      }
    }

    .awards-list {
      .award-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        input {
          flex: 1;
          margin-right: 20rpx;
          padding: 10rpx;
          border-bottom: 1rpx solid #eee;
        }
      }

      .add-award {
        display: flex;
        align-items: center;
        color: #7700ff;
        font-size: 28rpx;
        
        text {
          margin-left: 10rpx;
        }
      }
    }
  }

  .save-btn {
    margin: 40rpx 30rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: linear-gradient(to right, #7700ff, #8811ff);
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    box-shadow: 0 8rpx 16rpx rgba(119, 0, 255, 0.3);

    &:active {
      opacity: 0.9;
    }
  }
}
</style>