"use strict";
const common_vendor = require("../../common/vendor.js");
const api_contest = require("../../api/contest.js");
const api_search = require("../../api/search.js");
const api_login = require("../../api/login.js");
require("../../utils/request.js");
if (!Array) {
  const _component_van_notice_bar = common_vendor.resolveComponent("van-notice-bar");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  (_component_van_notice_bar + _easycom_dash2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
if (!Math) {
  _easycom_dash();
}
const _sfc_main = {
  __name: "teammateHall",
  props: {
    toValue: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.useRouter();
    const create = common_vendor.ref(false);
    const inputValue = common_vendor.ref("");
    const showSuggestion = common_vendor.ref(false);
    const searchResults = common_vendor.ref([]);
    common_vendor.ref([]);
    const contestList = common_vendor.ref([]);
    let searchTimeout = null;
    const isLoggedIn = common_vendor.ref(false);
    const toMakeTeam = () => {
      setInterval(() => {
        create.value = true;
      }, 1e3);
    };
    const getContestList = async () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          await wxLogin();
        }
        const res = await api_contest.getContest();
        contestList.value = res.data;
        console.log(res.data);
      } catch (error) {
        console.error("获取比赛列表失败：", error);
        common_vendor.index.showToast({
          title: "获取比赛信息失败",
          icon: "none"
        });
      }
    };
    const handleSearch = async () => {
      clearTimeout(searchTimeout);
      if (!inputValue.value) {
        searchResults.value = [];
        showSuggestion.value = false;
        return;
      }
      searchTimeout = setTimeout(async () => {
        try {
          const res = await api_search.searchContest(inputValue.value);
          if (res.data) {
            searchResults.value = res.data;
            console.log(res.data);
            showSuggestion.value = true;
          }
        } catch (error) {
          console.error("搜索失败：", error);
          common_vendor.index.showToast({
            title: "搜索失败",
            icon: "none"
          });
        }
      }, 300);
    };
    const selectSuggestion = (suggestion) => {
      inputValue.value = suggestion.name;
      showSuggestion.value = false;
      navigateToDetail();
    };
    const handleBlur = () => {
      setTimeout(() => {
        showSuggestion.value = false;
      }, 200);
    };
    const navigateToDetail = () => {
      if (!inputValue.value) {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/searchDetail/searchDetail?value=${encodeURIComponent(
          inputValue.value
        )}`
      });
    };
    common_vendor.ref([
      {
        id: 1,
        matchName: "2024年第十四届APMCM亚太地区大学生数学建模竞赛",
        name: "听党的就队",
        imgUrl: "../../static/images/match6.png"
      },
      {
        id: 2,
        matchName: "2024年全国大学生英语翻译大赛（NETCCS）",
        name: "六级能不能过队",
        imgUrl: "../../static/images/match3.png"
      },
      {
        id: 3,
        matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛',
        name: "超级翻译官队",
        imgUrl: "../../static/images/match4.png"
      },
      {
        id: 4,
        matchName: "2024创想中国全国大学生创新创业大赛",
        name: "小呆呆创新队",
        imgUrl: "../../static/images/match15.png"
      },
      {
        id: 5,
        matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道',
        name: "翻译的都队",
        imgUrl: "../../static/images/match8.png"
      },
      {
        id: 6,
        matchName: '第二届"数学周报"全国大学生数学能力大赛',
        name: "基本不懂式队",
        imgUrl: "../../static/images/match13.png"
      },
      {
        id: 7,
        matchName: "2024第二届全国大学生数学竞赛暨创新思维挑战赛",
        name: "哎我队",
        imgUrl: "../../static/images/match11.png"
      },
      {
        id: 8,
        matchName: "CCF2024年中国计算机应用技术大赛-全国算法精英大赛",
        name: "AC队",
        imgUrl: "../../static/images/match7.png"
      },
      {
        id: 9,
        matchName: "浙大研究院《智能无人机》研学实践项目",
        name: "让你飞起来队",
        imgUrl: "../../static/images/match14.png"
      }
    ]);
    const wxLogin = async () => {
      try {
        const loginResult = await common_vendor.index.login();
        if (loginResult.code) {
          console.log("获取code成功：", loginResult.code);
          const res = await api_login.login(loginResult.code);
          console.log("登录响应：", res);
          if (res.data && res.data.token) {
            isLoggedIn.value = true;
            common_vendor.index.setStorageSync("token", res.data.token);
            console.log(res.data.token);
            if (res.data.openid) {
              common_vendor.index.setStorageSync("openid", res.data.openid);
            }
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
            return res.data.token;
          } else {
            throw new Error("登录失败：未获取到token");
          }
        }
      } catch (error) {
        console.error("登录失败：", error);
        common_vendor.index.showToast({
          title: "登录失败，请重试",
          icon: "none"
        });
        throw error;
      }
    };
    const handleUserProfile = () => {
      wxLogin();
    };
    const centerValue = common_vendor.ref("");
    getContestList();
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
    });
    common_vendor.onMounted(async () => {
      try {
        await wxLogin();
        await getContestList();
      } catch (error) {
        console.error("初始化失败：", error);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => inputValue.value = $event.detail.value, handleSearch]),
        b: common_vendor.o(($event) => showSuggestion.value = true),
        c: common_vendor.o(handleBlur),
        d: inputValue.value,
        e: common_vendor.o(navigateToDetail),
        f: showSuggestion.value && searchResults.value.length
      }, showSuggestion.value && searchResults.value.length ? {
        g: common_vendor.f(searchResults.value, (suggestion, index, i0) => {
          return {
            a: common_vendor.t(suggestion.name),
            b: index,
            c: common_vendor.o(($event) => selectSuggestion(suggestion), index)
          };
        })
      } : {}, {
        h: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
        i: common_vendor.f(contestList.value, (item, index, i0) => {
          return {
            a: item.poster,
            b: index
          };
        }),
        j: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        k: common_vendor.p({
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
        l: create.value
      }, create.value ? {
        m: `/pages/teamDetail/teamDetail?tocPageValue=c`
      } : {}, {
        n: common_vendor.f(contestList.value, (item, index, i0) => {
          return {
            a: item.poster,
            b: common_vendor.t(item.name),
            c: `/pages/teamDetail/teamDetail?id=${item.id}&toaPageValue=a`,
            d: item.id
          };
        }),
        o: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        p: common_vendor.o(handleUserProfile)
      } : {}, {
        q: common_vendor.o(toMakeTeam),
        r: common_vendor.o([($event) => inputValue.value = $event.detail.value, handleSearch]),
        s: common_vendor.o(($event) => showSuggestion.value = true),
        t: common_vendor.o(handleBlur),
        v: inputValue.value,
        w: common_vendor.o(navigateToDetail),
        x: showSuggestion.value && searchResults.value.length
      }, showSuggestion.value && searchResults.value.length ? {
        y: common_vendor.f(searchResults.value, (suggestion, index, i0) => {
          return {
            a: common_vendor.t(suggestion.name),
            b: index,
            c: common_vendor.o(($event) => selectSuggestion(suggestion), index)
          };
        })
      } : {}, {
        z: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
        A: common_vendor.f(contestList.value, (item, index, i0) => {
          return {
            a: item.poster,
            b: index
          };
        }),
        B: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        C: common_vendor.p({
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
        D: create.value
      }, create.value ? {
        E: `/pages/teamDetail/teamDetail?tocPageValue=c`
      } : {}, {
        F: common_vendor.f(contestList.value, (item, index, i0) => {
          return {
            a: item.poster,
            b: common_vendor.t(item.name),
            c: `/pages/teamDetail/teamDetail?id=${item.id}&toaPageValue=a`,
            d: item.id
          };
        }),
        G: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        H: common_vendor.o((...args) => _ctx.handleGetUserInfo && _ctx.handleGetUserInfo(...args))
      } : {}, {
        I: common_vendor.o(toMakeTeam)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305e4dd3"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/pages/teammateHall/teammateHall.vue"]]);
wx.createPage(MiniProgramPage);
