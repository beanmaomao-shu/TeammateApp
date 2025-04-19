<template>
  <view class="rating-container">
    <!-- 顶部背景 -->
    <view class="header-bg">
      <view class="title">我的评价</view>
    </view>
    
    <!-- 评分卡片 -->
    <view class="rating-card">
      <view class="rating-header">
        <view class="avatar">
          <image :src="userInfo.avatar || '../../static/images/avatar.png'" mode="aspectFill"></image>
        </view>
        <view class="user-info">
          <view class="username">{{ userInfo.username || '用户名' }}</view>
          <view class="school">{{ userInfo.school || '学校' }}</view>
        </view>
        <view class="total-score">
          <text class="score">{{ averageScore.toFixed(1) }}</text>
          <text class="max">/5.0</text>
        </view>
      </view>
      
      <!-- 雷达图 - 使用uCharts -->
      <view class="chart-container">
        <canvas
          canvas-id="radarChart"
          id="radarChart"
          class="radar-canvas"
          style="width: 360px; height: 360px;"
        ></canvas>
       
      </view>
      
      <!-- 评分详情 -->
      <view class="rating-details">
        <view class="rating-item" v-for="(item, index) in ratingData" :key="index">
          <view class="rating-label">{{ item.name }}</view>
          <view class="rating-bar">
            <view class="rating-progress" :style="{ width: (item.value / 5 * 100) + '%', backgroundColor: item.color }"></view>
          </view>
          <view class="rating-value">{{ item.value.toFixed(1) }}</view>
        </view>
      </view>
    </view>
    
    <!-- 评价列表 -->
    <view class="reviews-section">
      <view class="section-title">匿名评价 ({{ reviews.length }})</view>
      
      <view class="review-list">
        <view class="review-item" v-for="(review, index) in reviews" :key="index">
          <view class="review-header">
            <view class="anonymous">匿名用户</view>
            <view class="review-date">{{ review.date }}</view>
          </view>
          <view class="review-stars">
            <uni-icons v-for="i in 5" :key="i" :type="i <= review.rating ? 'star-filled' : 'star'" size="18" :color="i <= review.rating ? '#FFCC00' : '#CCCCCC'"></uni-icons>
            <text class="review-score">{{ review.rating }}.0</text>
          </view>
          <view class="review-content">{{ review.content }}</view>
          <view class="review-tags">
            <view class="tag" v-for="(tag, tagIndex) in review.tags" :key="tagIndex">{{ tag }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getUserInfoAPI } from '@/api/userInfo'
// 1. 引入 uCharts
import uCharts from '../../node_modules/@qiun/ucharts/u-charts'

// 用户信息
const userInfo = ref({
  username: '',
  avatar: '',
  school: ''
});

// 评分数据
const ratingData = ref([
  { name: '技术能力', value: 4.5, color: '#FF6B6B' },
  { name: '合作能力', value: 4.2, color: '#4ECDC4' },
  { name: '交流能力', value: 3.8, color: '#FFD166' },
  { name: '责任心', value: 4.7, color: '#6A0572' },
  { name: '满意度', value: 4.3, color: '#1A936F' }
]);

// 计算平均分
const averageScore = computed(() => {
  const sum = ratingData.value.reduce((acc, item) => acc + item.value, 0);
  return sum / ratingData.value.length;
});

// uCharts雷达图配置
const radarOpts = ref({
  padding: [15, 15, 0, 15],
  legend: {
    show: true,
    position: 'bottom'
  },
  dataLabel: false,
  dataPointShape: true,
  radarAxis: {
    gridType: 'radar',
    gridColor: '#CCCCCC',
    gridCount: 5,
    labelColor: '#666666',
    max: 5
  },
  extra: {
    radar: {
      gridType: 'radar',
      gridColor: '#CCCCCC',
      gridCount: 5,
      opacity: 0.2,
      border: true
    }
  }
});

// uCharts雷达图数据
const radarData = ref({
  categories: ratingData.value.map(item => item.name),
  series: [
    {
      name: '个人评分',
      data: ratingData.value.map(item => item.value),
      color: '#AC33C1'
    },
    {
      name: '平均水平',
      data: [3.5, 3.5, 3.5, 3.5, 3.5],
      color: '#4ECDC4'
    }
  ]
});

// 评价列表
const reviews = ref([
  {
    rating: 5,
    content: '非常优秀的队友，技术能力强，沟通顺畅，合作愉快！',
    date: '2023-05-15',
    tags: ['技术过硬', '沟通顺畅', '有责任心']
  },
  {
    rating: 4,
    content: '很好的合作伙伴，能够按时完成任务，积极参与讨论。',
    date: '2023-04-28',
    tags: ['按时交付', '积极参与']
  },
  {
    rating: 5,
    content: '技术能力很强，解决问题迅速，是团队的中流砥柱。',
    date: '2023-03-10',
    tags: ['解决问题快', '技术过硬']
  }
]);

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoAPI();
    if (res.data) {
      userInfo.value = {
        username: res.data.username || '用户名',
        avatar: res.data.avatar || '../../static/images/avatar.png',
        school: res.data.school || '未知学校'
      };
    }
  } catch (error) {
    console.error('获取用户信息失败：', error);
  }
};

// 页面加载时获取用户信息
onMounted(() => {
  getUserInfo();
});

let radarChart = null

// 2. 初始化雷达图
function drawRadar() {
  const ctx = uni.createCanvasContext('radarChart', this)
  radarChart = new uCharts({
    type: 'radar',
    context: ctx,
    width: 360, // 增大宽高
    height: 360,
    categories: ratingData.value.map(item => item.name),
    series: [
      {
        name: '个人评分',
        data: ratingData.value.map(item => item.value),
        color: '#AC33C1'
      },
      
    ],
    radar: {
      max: 5,
      labelColor: '#666',
      gridColor: '#ccc',
      gridCount: 5,
      radius: 120 
    },
    dataLabel: true, 
    legend: {
      show: true,
      position: 'bottom'
    },
    extra: {
      radar: {
        gridType: 'radar',
        gridColor: '#CCCCCC',
        gridCount: 5,
        opacity: 0.2,
        border: true
      }
    }
  })
}

// 页面加载时绘制雷达图
onMounted(() => {
  getUserInfo()
  setTimeout(() => {
    drawRadar()
  }, 300)
})
</script>

<style lang="scss" scoped>
.rating-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;

  .header-bg {
    height: 220rpx;
    background: linear-gradient(to right, #AC33C1, #7B68EE);
    border-radius: 0 0 40rpx 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .title {
      color: #fff;
      font-size: 40rpx;
      font-weight: bold;
    }
  }
  
  .rating-card {
    margin: -80rpx 30rpx 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    
    .rating-header {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20rpx;
        border: 4rpx solid #fff;
        box-shadow: 0 4rpx 10rpx rgba(172, 51, 193, 0.2);
        
        image {
          width: 100%;
          height: 100%;
        }
      }
      
      .user-info {
        flex: 1;
        
        .username {
          font-size: 36rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .school {
          font-size: 28rpx;
          color: #666;
        }
      }
      
      .total-score {
        text-align: right;
        
        .score {
          font-size: 48rpx;
          font-weight: bold;
          color: #AC33C1;
        }
        
        .max {
          font-size: 28rpx;
          color: #999;
        }
      }
    }
    
    .chart-container {
      margin: -110rpx 0 10rpx;
      height: 460rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      .radar-canvas {
        width: 360px;
        height: 360px;
        display: block;
        margin: 0 auto;
      }
      .radar-score {
        margin-top: 0rpx;
        margin-bottom: 10rpx;
        text-align: center;
        .radar-score-value {
          font-size: 32rpx;
          font-weight: bold;
          color: #AC33C1;
        }
      }
    }
    
    .rating-details {
      margin-top: 130rpx;
      
      .rating-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        
        .rating-label {
          width: 140rpx;
          font-size: 28rpx;
          color: #666;
        }
        
        .rating-bar {
          flex: 1;
          height: 16rpx;
          background-color: #f0f0f0;
          border-radius: 8rpx;
          overflow: hidden;
          margin: 0 20rpx;
          
          .rating-progress {
            height: 100%;
            border-radius: 8rpx;
          }
        }
        
        .rating-value {
          width: 60rpx;
          font-size: 28rpx;
          color: #333;
          text-align: right;
        }
      }
    }
  }
  
  .reviews-section {
    margin: 0 30rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .review-list {
      .review-item {
        background-color: #fff;
        border-radius: 16rpx;
        padding: 24rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
        
        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16rpx;
          
          .anonymous {
            font-size: 28rpx;
            color: #666;
          }
          
          .review-date {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .review-stars {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;
          
          .review-score {
            margin-left: 10rpx;
            font-size: 28rpx;
            color: #FFCC00;
            font-weight: bold;
          }
        }
        
        .review-content {
          font-size: 28rpx;
          color: #333;
          line-height: 1.5;
          margin-bottom: 16rpx;
        }
        
        .review-tags {
          display: flex;
          flex-wrap: wrap;
          
          .tag {
            font-size: 24rpx;
            color: #AC33C1;
            background-color: rgba(172, 51, 193, 0.1);
            padding: 6rpx 16rpx;
            border-radius: 20rpx;
            margin-right: 16rpx;
            margin-bottom: 10rpx;
          }
        }
      }
    }
  }
}
</style>