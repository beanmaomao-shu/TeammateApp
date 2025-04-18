<template>
  <<<<<<< HEAD
  <view class="teammateLayout">
    <!-- 搜索框 -->
    <view class="search">
      <input
        v-model="inputValue"
        type="text"
        placeholder="搜索在线赛事组队信息"
        @input="handleSearch"
        @focus="showSuggestion = true"
        @blur="handleBlur"
      />
      <view class="searchButton" @click="navigateToDetail">
        <image src="../../static/images/搜索.png" mode=""></image>
      </view>
    </view>
    <!-- 搜索建议列表 -->
    <ul class="suggesstions" v-if="showSuggestion && searchResults.length">
      <li
        class="list"
        v-for="(suggestion, index) in searchResults"
        :key="index"
        @click.stop="selectSuggestion(suggestion)"
      >
        {{ suggestion.name }}
      </li>
      <view class="tip">
        没有找到想要的比赛?
        <view class="tipNav"> 点这里试试-> </view>
      </view>
    </ul>
    <!-- 通知栏 -->
    <van-notice-bar scrollable color="#AC33C1" background="#F1E6FF">
      2024年第十四届亚太地区大学生数学建模竞赛(以下简称"竞赛")是由中国国际科技促进会物联网工作委员会和北京图象图形学学会联合主办的亚太地区大学生学科类竞赛，竞赛由亚太地区大学生数学建模竞赛组委会负责组织，欢迎各高等院校按照竞赛章程及有关规定组织同学报名参赛。
      2023年第十三届亚太地区大学生数学建模竞赛共有9700支队伍969所高校2万7千多名学生报名参赛。参赛高校覆盖北京大学、清华大学、浙江大学、同济大学、上海交通大学、复旦大学、四川大学、大连理工大学等全部的39所985高校和114所211高校。除中国大陆高校外本次竞赛还有数十所国外高校参赛。
    </van-notice-bar>
    <!-- 轮播图 -->
    <view class="banner">
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        indicator-color="#fff"
        :autoplay="true"
        :interval="3000"
        :duration="500"
      >
        <swiper-item v-for="(item, index) in contestList" :key="index">
          <image :src="item.poster" class="img" mode="aspectFit"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 分割线 -->
    <dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
    <view class="teammateList">
      <view class="listHead">
        <view class="left">
          <image src="../../static/images/people.png" mode=""></image>
          <text>正在组队</text>
        </view>
        <view class="right">
          <navigator url="/pages/moreDetail/moreDetail" class="moreDetail">
            <text>更多</text>
            <image src="../../static/images/more.png" mode=""></image>
          </navigator>
        </view>
      </view>
      <dash Color="#F1E6FF" Width="700rpx" Height="8rpx"></dash>
      <!-- 新组建的 -->
      <view class="teamInfo" v-if="create">
        <navigator :url="`/pages/teamDetail/teamDetail?tocPageValue=c`">
          <!--比赛图片 -->
          <view class="matchImg">
            <image src="../../static/images/match9.png" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName"> 第二届大学生高校物理挑战赛 </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>一战成名队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <img src="../../static/images/avatar.png" alt="" />
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 演示 -->
      <view class="teamInfo">
        <navigator url="/pages/fakedetail/fakedetail">
          <!--比赛图片 -->
          <view class="matchImg">
            <image src="../../static/images/match5.png" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName"> 2024第十届中西部外语翻译大赛 </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>一战成名队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (1).jpg"
                  mode=""
                ></image>
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (2).jpg"
                  mode=""
                ></image>
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (6).jpg"
                  mode=""
                ></image>
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 默认生成 -->
      <view
        class="teamInfo"
        v-for="(item, index) in contestList"
        :key="item.id"
      >
        <navigator
          :url="`/pages/teamDetail/teamDetail?id=${item.id}&toaPageValue=a`"
        >
          <!--比赛图片 -->
          <view class="matchImg">
            <image :src="item.poster" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName">
              {{ item.name }}
            </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>鸭鸭小队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <img src="../../static/images/avatar3.png" alt="" />
                <img src="../../static/images/avatar1.png" alt="" />
                <img src="../../static/images/avatar.png" alt="" />
                <img src="../../static/images/avatar.png" alt="" />
                <img src="../../static/images/avatar2.png" alt="" />
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </view>
    <!-- 登录按钮 -->
    <view class="login-container" v-if="!isLoggedIn">
      <button
        class="login-btn"
        open-type="getUserProfile"
        @click="handleUserProfile"
      >
        微信登录
      </button>
    </view>
    <view class="issue" @click="toMakeTeam">
      <navigator url="../makeTeam/makeTeam">组队</navigator>
    </view>
    <view class="ai">
      <navigator url="../ai/ai">AI智能</navigator>
    </view>
  </view>
  =======
  <view class="teammateLayout">
    <!-- 搜索框 -->
    <view class="search">
      <input
        v-model="inputValue"
        type="text"
        placeholder="搜索在线赛事组队信息"
        @input="handleSearch"
        @focus="showSuggestion = true"
        @blur="handleBlur"
      />
      <view class="searchButton" @click="navigateToDetail">
        <image src="../../static/images/搜索.png" mode=""></image>
      </view>
    </view>
    <!-- 搜索建议列表 -->
    <ul class="suggesstions" v-if="showSuggestion && searchResults.length">
      <li
        class="list"
        v-for="(suggestion, index) in searchResults"
        :key="index"
        @click.stop="selectSuggestion(suggestion)"
      >
        {{ suggestion.name }}
      </li>
      <view class="tip">
        没有找到想要的比赛?
        <view class="tipNav"> 点这里试试-> </view>
      </view>
    </ul>
    <!-- 通知栏 -->
    <van-notice-bar scrollable color="#AC33C1" background="#F1E6FF">
      2024年第十四届亚太地区大学生数学建模竞赛(以下简称"竞赛")是由中国国际科技促进会物联网工作委员会和北京图象图形学学会联合主办的亚太地区大学生学科类竞赛，竞赛由亚太地区大学生数学建模竞赛组委会负责组织，欢迎各高等院校按照竞赛章程及有关规定组织同学报名参赛。
      2023年第十三届亚太地区大学生数学建模竞赛共有9700支队伍969所高校2万7千多名学生报名参赛。参赛高校覆盖北京大学、清华大学、浙江大学、同济大学、上海交通大学、复旦大学、四川大学、大连理工大学等全部的39所985高校和114所211高校。除中国大陆高校外本次竞赛还有数十所国外高校参赛。
    </van-notice-bar>
    <!-- 轮播图 -->
    <view class="banner">
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        indicator-color="#fff"
        :autoplay="true"
        :interval="3000"
        :duration="500"
      >
        <swiper-item v-for="(item, index) in contestList" :key="index">
          <image :src="item.poster" class="img" mode="aspectFit"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 分割线 -->
    <dash Color="#E5E5E5" Width="780rpx" Height="10rpx"></dash>
    <view class="teammateList">
      <view class="listHead">
        <view class="left">
          <image src="../../static/images/people.png" mode=""></image>
          <text>正在组队</text>
        </view>
        <view class="right">
          <navigator url="/pages/moreDetail/moreDetail" class="moreDetail">
            <text>更多</text>
            <image src="../../static/images/more.png" mode=""></image>
          </navigator>
        </view>
      </view>
      <dash Color="#F1E6FF" Width="700rpx" Height="8rpx"></dash>
      <!-- 新组建的 -->
      <view class="teamInfo" v-if="create">
        <navigator :url="`/pages/teamDetail/teamDetail?tocPageValue=c`">
          <!--比赛图片 -->
          <view class="matchImg">
            <image src="../../static/images/match9.png" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName"> 第二届大学生高校物理挑战赛 </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>一战成名队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <img src="../../static/images/avatar.png" alt="" />
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 演示 -->
      <view class="teamInfo">
        <navigator url="/pages/fakedetail/fakedetail">
          <!--比赛图片 -->
          <view class="matchImg">
            <image src="../../static/images/match5.png" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName"> 2024第十届中西部外语翻译大赛 </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>一战成名队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (1).jpg"
                  mode=""
                ></image>
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (2).jpg"
                  mode=""
                ></image>
                <image
                  class="avatar"
                  src="../../static/images/avatar1 (6).jpg"
                  mode=""
                ></image>
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 默认生成 -->
      <view
        class="teamInfo"
        v-for="(item, index) in contestList"
        :key="item.id"
      >
        <navigator
          :url="`/pages/teamDetail/teamDetail?id=${item.id}&toaPageValue=a`"
        >
          <!--比赛图片 -->
          <view class="matchImg">
            <image :src="item.poster" mode="widthFix"></image>
          </view>
          <view class="mainInfo">
            <!-- 比赛名 -->
            <view class="matchName">
              {{ item.name }}
            </view>
            <!-- 队名 -->
            <view class="teamName">
              <image src="../../static/images/队伍.png" mode=""></image>
              <p>鸭鸭小队</p>
            </view>
            <!-- 头像列表//研讨室跳转 -->
            <view class="bottom">
              <view class="avatars">
                <img src="../../static/images/avatar3.png" alt="" />
                <img src="../../static/images/avatar1.png" alt="" />
                <img src="../../static/images/avatar.png" alt="" />
                <img src="../../static/images/avatar.png" alt="" />
                <img src="../../static/images/avatar2.png" alt="" />
              </view>
              <view class="goChat">
                <navigator url="/pages/chatRoom/chatRoom">
                  <image src="../../static/images/trending.png" mode=""></image>
                  <p>一起讨论></p>
                </navigator>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </view>
    <!-- 登录按钮 -->
    <view class="login-container" v-if="!isLoggedIn">
      <button
        class="login-btn"
        open-type="getUserInfo"
        @getuserinfo="handleGetUserInfo"
      >
        微信登录
      </button>
    </view>
    <view class="issue" @click="toMakeTeam">
      <navigator url="../makeTeam/makeTeam">组队</navigator>
    </view>
  </view>
  >>>>>>> 2997d70735be1a68cada6e92f1b4201ddf3cdff2
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { onLoad } from "@dcloudio/uni-app";
import { getContest } from "@/api/contest.js";
import { searchContest } from "@/api/search.js";
import { login } from "@/api/login.js";

const router = useRouter();

const create = ref(false);
const inputValue = ref("");
const showSuggestion = ref(false);
const searchResults = ref([]);
const filteredData = ref([]);
const contestList = ref([]);
let searchTimeout = null;
const isLoggedIn = ref(false);

const toMakeTeam = () => {
  setInterval(() => {
    create.value = true;
  }, 1000);
};

//获取比赛信息
const getContestList = async () => {
  try {
    // 检查是否有token
    const token = uni.getStorageSync("token");
    if (!token) {
      // 如果没有token，先进行登录
      await wxLogin();
    }
    // 获取比赛列表
    const res = await getContest();
    contestList.value = res.data;
    console.log(res.data);
  } catch (error) {
    console.error("获取比赛列表失败：", error);
    uni.showToast({
      title: "获取比赛信息失败",
      icon: "none",
    });
  }
};

// 处理搜索输入 - 实时模糊查询
const handleSearch = async () => {
  clearTimeout(searchTimeout);
  if (!inputValue.value) {
    searchResults.value = [];
    showSuggestion.value = false;
    return;
  }

  searchTimeout = setTimeout(async () => {
    try {
      const res = await searchContest(inputValue.value);
      if (res.data) {
        searchResults.value = res.data;
        console.log(res.data);
        showSuggestion.value = true;
      }
    } catch (error) {
      console.error("搜索失败：", error);
      uni.showToast({
        title: "搜索失败",
        icon: "none",
      });
    }
  }, 300); // 防抖延迟
};

// 选择建议项
const selectSuggestion = (suggestion) => {
  inputValue.value = suggestion.name;
  showSuggestion.value = false;
  navigateToDetail();
};

// 处理输入框失焦
const handleBlur = () => {
  setTimeout(() => {
    showSuggestion.value = false;
  }, 200);
};

// 跳转到搜索详情页
const navigateToDetail = () => {
  if (!inputValue.value) {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "none",
    });
    return;
  }

  uni.navigateTo({
    url: `/pages/searchDetail/searchDetail?value=${encodeURIComponent(
      inputValue.value
    )}`,
  });
};

const matchData = ref([
  {
    id: 1,
    matchName: "2024年第十四届APMCM亚太地区大学生数学建模竞赛",
    name: "听党的就队",
    imgUrl: "../../static/images/match6.png",
  },
  {
    id: 2,
    matchName: "2024年全国大学生英语翻译大赛（NETCCS）",
    name: "六级能不能过队",
    imgUrl: "../../static/images/match3.png",
  },
  {
    id: 3,
    matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛',
    name: "超级翻译官队",
    imgUrl: "../../static/images/match4.png",
  },
  {
    id: 4,
    matchName: "2024创想中国全国大学生创新创业大赛",
    name: "小呆呆创新队",
    imgUrl: "../../static/images/match15.png",
  },
  {
    id: 5,
    matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',
    name: "翻译的都队",
    imgUrl: "../../static/images/match8.png",
  },
  {
    id: 6,
    matchName: '第二届"数学周报"全国大学生数学能力大赛',
    name: "基本不懂式队",
    imgUrl: "../../static/images/match13.png",
  },
  {
    id: 7,
    matchName: "2024第二届全国大学生数学竞赛暨创新思维挑战赛",
    name: "哎我队",
    imgUrl: "../../static/images/match11.png",
  },
  {
    id: 8,
    matchName: "CCF2024年中国计算机应用技术大赛-全国算法精英大赛",
    name: "AC队",
    imgUrl: "../../static/images/match7.png",
  },
  {
    id: 9,
    matchName: "浙大研究院《智能无人机》研学实践项目",
    name: "让你飞起来队",
    imgUrl: "../../static/images/match14.png",
  },
]);

// 微信登录
const wxLogin = async () => {
  try {
    // 1. 获取登录code
    const loginResult = await uni.login();
    if (loginResult.code) {
      console.log("获取code成功：", loginResult.code);

      // 2. 调用登录接口
      const res = await login(loginResult.code);
      console.log("登录响应：", res);

      if (res.data && res.data.token) {
        // 3. 保存登录状态和token
        isLoggedIn.value = true;
        uni.setStorageSync("token", res.data.token);
        console.log(res.data.token);
        // 可选：保存openid
        if (res.data.openid) {
          uni.setStorageSync("openid", res.data.openid);
        }

        uni.showToast({
          title: "登录成功",
          icon: "success",
        });

        return res.data.token; // 返回token
      } else {
        throw new Error("登录失败：未获取到token");
      }
    }
  } catch (error) {
    console.error("登录失败：", error);
    uni.showToast({
      title: "登录失败，请重试",
      icon: "none",
    });
    throw error; // 继续抛出错误
  }
};

// 处理登录按钮点击
const handleUserProfile = () => {
  wxLogin();
};

const centerValue = ref("");
const props = defineProps({
  toValue: {
    type: String,
  },
});
getContestList();
onLoad(() => {
  centerValue.value = props.toValue;
});
onMounted(async () => {
  try {
    // 1. 先执行登录
    await wxLogin();
    // 2. 登录成功后获取比赛列表
    await getContestList();
  } catch (error) {
    console.error("初始化失败：", error);
  }
});
</script>

<style lang="scss" scoped>
.teammateLayout {
  .search {
    position: relative;
    width: 700rpx;
    height: 68rpx;
    border: 4rpx solid #ac33c1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 40rpx;
    input {
      width: 568rpx;
      height: 68rpx;
      padding-left: 20rpx;
    }
    .searchButton {
      width: 132rpx;
      height: 60rpx;
      background-color: #f1e6ff;
      border-radius: 0 40rpx 40rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .suggesstions {
    position: absolute;
    width: 668rpx;
    max-height: 500rpx;
    border: 1px solid #6c5ce7;
    border-top: 0px;
    left: 40rpx;
    top: 75rpx;
    border-radius: 0 0 10rpx 10rpx;
    background-color: #fff;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    .list {
      padding: 20rpx 30rpx;
      font-size: 28rpx;
      color: #333;
      border-bottom: 1px solid #f1e6ff;
      &:last-child {
        border-bottom: none;
      }
    }
    .tip {
      padding: 10rpx;
      height: 50rpx;
      font-size: 24rpx;
      color: #808080;
      position: absolute;
      display: flex;
      right: 15rpx;
      .tipNav {
        padding-left: 10rpx;
        color: #ac33c1;
      }
    }
  }

  .banner {
    margin-top: 23rpx;
    margin-bottom: 48rpx;
    swiper {
      background-color: #fff;
      width: 100%;
      height: 476rpx;
      margin: 0 auto;
      .img {
        width: 100%;
        height: 100%;
      }
      swiper-item {
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .teammateList {
    width: 700rpx;
    margin: 0 auto;
    .listHead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200rpgx;
        height: 54rpx;
        image {
          width: 48rpx;
          height: 48rpx;
          margin-right: 16rpx;
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 96rpx;
        height: 54rpx;
        image {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
}
.issue {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  border-radius: 20%;
  text-align: center;
  line-height: 80rpx;
  width: 130rpx;
  height: 80rpx;
  background: linear-gradient(90deg, #6c5ce7, rgba(224, 217, 255, 0.8));
  border-radius: 30rpx;
  border: 2rpx solid #fff;
  navigator {
    color: #fff;
  }
}
.ai {
  position: fixed;
  right: 30rpx;
  bottom: 15rpx;
  border-radius: 20%;
  text-align: center;
  line-height: 80rpx;
  width: 150rpx;
  height: 80rpx;
  background: linear-gradient(90deg, #6c5ce7, rgba(224, 217, 255, 0.8));
  border-radius: 30rpx;
  border: 2rpx solid #fff;
  navigator {
    color: #fff;
  }
}
.teamInfo {
  width: 700rpx;
  height: 180rpx;
  margin: 0 auto;
  border: 1rpx solid lightgray;
  box-shadow: 0 2rpx 8rpx;
  margin-bottom: 10rpx;
  position: relative;

  .matchImg {
    position: absolute;
    left: 15rpx;
    top: 18rpx;
    image {
      width: 210rpx;
      height: 160rpx;
    }
  }
  .mainInfo {
    position: absolute;
    left: 240rpx;
    top: 9rpx;
    .bottom {
      display: flex;
      align-items: center;
      .avatars {
        display: flex;
        align-items: center;
        image {
          width: 48rpx;
          height: 48rpx;
          margin-right: 10rpx;
          &:first-child {
            margin-left: 20rpx;
          }
        }
      }
      .goChat {
        navigator {
          display: flex;
          image {
            width: 32rpx;
            height: 32rpx;
          }
          font-size: 24rpx;
          color: #808080;
        }
      }
    }
    .matchName {
      min-height: 80rpx;
      max-height: 90rpx;
      padding: 12rpx;
      font-size: 28rpx;
      line-height: 1.4;
      white-space: normal;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .teamName {
      display: flex;
      image {
        width: 32rpx;
        height: 32rpx;
      }
      font-size: 24rpx;
      margin: 5rpx 0;
      margin-left: 20rpx;
      color: #ac33c1;
    }
  }
}

.login-container {
  position: fixed;
  right: 30rpx;
  bottom: 200rpx;
  z-index: 999;

  .login-btn {
    width: 130rpx;
    height: 80rpx;
    background: linear-gradient(90deg, #6c5ce7, rgba(224, 217, 255, 0.8));
    color: #fff;
    border-radius: 30rpx;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2rpx solid #fff;
    padding: 0;

    &::after {
      border: none;
    }
  }
}
</style>
