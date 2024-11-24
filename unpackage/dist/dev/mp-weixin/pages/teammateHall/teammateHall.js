"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const create = common_vendor.ref(false);
    const toMakeTeam = () => {
      setInterval(() => {
        create.value = true;
      }, 1e3);
    };
    const inputValue = common_vendor.ref("");
    common_vendor.useRouter();
    const showSuggestion = common_vendor.ref(false);
    const matchData = common_vendor.ref([
      { id: 1, matchName: "2024年第十四届APMCM亚太地区大学生数学建模竞赛", name: "听党的就队", imgUrl: "../../static/images/match6.png" },
      { id: 2, matchName: "2024年全国大学生英语翻译大赛（NETCCS）", name: "六级能不能过队", imgUrl: "../../static/images/match3.png" },
      { id: 3, matchName: '2024年第五届"中译国青杯"国际组织文件翻译大赛', name: "超级翻译官队", imgUrl: "../../static/images/match4.png" },
      { id: 4, matchName: "2024创想中国全国大学生创新创业大赛", name: "小呆呆创新队", imgUrl: "../../static/images/match15.png" },
      { id: 5, matchName: '第三届"中外传播杯"全国大学生英语翻译大赛-英译汉赛道', name: "翻译的都队", imgUrl: "../../static/images/match8.png" },
      { id: 6, matchName: '第二届"数学周报"全国大学生数学能力大赛', name: "基本不懂式队", imgUrl: "../../static/images/match13.png" },
      { id: 7, matchName: "2024第二届全国大学生数学竞赛暨创新思维挑战赛", name: "哎我队", imgUrl: "../../static/images/match11.png" },
      { id: 8, matchName: "CCF2024年中国计算机应用技术大赛-全国算法精英大赛", name: "AC队", imgUrl: "../../static/images/match7.png" },
      { id: 9, matchName: "浙大研究院《智能无人机》研学实践项目", name: "让你飞起来队", imgUrl: "../../static/images/match14.png" }
    ]);
    const filteredData = common_vendor.ref([]);
    const navigateToDetail = () => {
      if (inputValue.value == "") {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "error"
        });
      } else {
        common_vendor.index.redirectTo({
          url: `../searchDetail/searchDetail?value=${inputValue.value}`
        });
        inputValue.value = "";
      }
    };
    const filterSuggestion = () => {
      if (inputValue.value) {
        filteredData.value = matchData.value.filter((item) => {
          return item.matchName.toLowerCase().includes(inputValue.value.toLowerCase());
        });
      } else {
        filteredData.value = [];
      }
    };
    const selectSuggestion = (suggestion, event) => {
      event.stopPropagation();
      inputValue.value = suggestion.matchName;
      console.log("Selecting suggestion:", suggestion);
      filteredData.value = [];
    };
    const searchInfo = async () => {
    };
    const centerValue = common_vendor.ref("");
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => inputValue.value = $event.detail.value, filterSuggestion]),
        b: common_vendor.o(($event) => showSuggestion.value = true),
        c: common_vendor.o(($event) => showSuggestion.value = false),
        d: inputValue.value,
        e: common_vendor.o(() => {
          navigateToDetail();
          searchInfo();
        }),
        f: showSuggestion.value && filteredData.value.length
      }, showSuggestion.value && filteredData.value.length ? {
        g: common_vendor.f(filteredData.value, (suggestion, index, i0) => {
          return {
            a: common_vendor.t(suggestion.matchName),
            b: common_vendor.o(($event) => selectSuggestion(suggestion, $event))
          };
        })
      } : {}, {
        h: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
<<<<<<< Updated upstream
        j: common_vendor.f(matchData.value, (item, index, i0) => {
=======
        i: common_vendor.f(10, (item, index, i0) => {
>>>>>>> Stashed changes
          return {
            a: item.imgUrl,
            b: index
          };
        }),
<<<<<<< Updated upstream
        k: common_vendor.p({
=======
        j: common_vendor.p({
>>>>>>> Stashed changes
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
<<<<<<< Updated upstream
        l: common_assets._imports_1,
        m: common_assets._imports_2,
        n: common_vendor.p({
=======
        k: common_vendor.p({
>>>>>>> Stashed changes
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
<<<<<<< Updated upstream
        o: common_vendor.f(matchData.value, (item, index, i0) => {
=======
        l: create.value
      }, create.value ? {
        m: `/pages/teamDetail/teamDetail?tocPageValue=c`
      } : {}, {
        n: common_vendor.f(matchData.value, (item, index, i0) => {
>>>>>>> Stashed changes
          return {
            a: item.imgUrl,
            b: common_vendor.t(item.matchName),
            c: common_vendor.t(item.name),
            d: item.id
          };
        }),
<<<<<<< Updated upstream
        p: common_assets._imports_1$1,
        q: common_assets._imports_1$2,
        r: common_assets._imports_3,
        s: common_assets._imports_4,
        t: common_assets._imports_4,
        v: common_assets._imports_5,
        w: common_assets._imports_6,
        x: `/pages/teamDetail/teamDetail?toPageValue=a`,
        y: common_vendor.o(toMakeTeam)
=======
        o: `/pages/teamDetail/teamDetail?toaPageValue=a`,
        p: common_vendor.o(toMakeTeam)
>>>>>>> Stashed changes
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305e4dd3"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/teammateHall/teammateHall.vue"]]);
wx.createPage(MiniProgramPage);
