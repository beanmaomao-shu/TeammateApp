"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  (_easycom_dash2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_teamInfo2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  (_easycom_dash + _easycom_teamInfo)();
}
const _sfc_main = {
  __name: "moreDetail",
  setup(__props) {
    const recentMatch = common_vendor.ref(0);
    const matchCategory = common_vendor.ref(0);
    const teamRegion = common_vendor.ref(0);
    const option1 = common_vendor.ref([
      { text: "2024年第十四届APMCM亚太地区大学生数学建模竞赛", value: 0 },
      { text: "CCF CAT第六届中国计算机应用技术大赛", value: 1 },
      { text: "“天柱山杯”安徽省第六届徽文化国际传播翻译大赛", value: 2 }
    ]);
    const option2 = common_vendor.ref([
      { text: "工科", value: 0 },
      { text: "理科", value: 1 },
      { text: "文学", value: 2 },
      { text: "外语", value: 3 },
      { text: "媒体", value: 4 }
    ]);
    const option3 = common_vendor.ref([
      { text: "广州", value: 0 },
      { text: "佛山", value: 1 },
      { text: "深圳", value: 2 }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        b: common_vendor.o(($event) => recentMatch.value = $event),
        c: common_vendor.p({
          options: option1.value,
          title: "近期比赛",
          modelValue: recentMatch.value
        }),
        d: common_vendor.o(($event) => matchCategory.value = $event),
        e: common_vendor.p({
          options: option2.value,
          title: "比赛类别",
          modelValue: matchCategory.value
        }),
        f: common_vendor.o(($event) => teamRegion.value = $event),
        g: common_vendor.p({
          options: option3.value,
          title: "组队赛区",
          modelValue: teamRegion.value
        }),
        h: common_vendor.p({
          activeColor: "red"
        }),
        i: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: "c2e090e7-5-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2e090e7"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/moreDetail/moreDetail.vue"]]);
wx.createPage(MiniProgramPage);
