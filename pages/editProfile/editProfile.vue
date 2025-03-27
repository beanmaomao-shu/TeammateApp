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
          <input type="text" v-model="profile.nickname" placeholder="鸭鸭"/>
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <picker @change="bindGenderChange" :value="profile.gender" :range="genderArray">
            <view class="picker">{{genderArray[profile.gender]}}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">学校</text>
          <input type="text" v-model="profile.school" placeholder="请输入学校"/>
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
          <input type="text" v-model="profile.wechat" placeholder="13432439031"/>
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
        <textarea v-model="profile.bio" placeholder="请输入个人简介" maxlength="200"/>
        <view class="word-count">{{profile.bio.length}}/200</view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-btn" @click="saveProfile">保存</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { editUserInfo } from '@/api/userInfo';

const genderArray = ['请选择性别', '男', '女'];

const profile = ref({
  nickname: '',
  gender: 0,
  school: '',
  phone: '',
  wechat: '',
  email: '',
  awards: [],
  bio: ''
});

const bindGenderChange = (e) => {
  profile.value.gender = e.detail.value;
};

const addAward = () => {
  profile.value.awards.push({ name: '' });
};

const removeAward = (index) => {
  profile.value.awards.splice(index, 1);
};

const saveProfile = async () => {
 
  try{
 uni.showToast({
    title: '保存成功',
    icon: 'success'
  });
  await editUserInfo(profile.value);
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
  }catch(error){
    console.error('保存失败：', error);
  }
  
  
};
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