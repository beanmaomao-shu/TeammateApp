"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_wei_dropdown_menu2 = common_vendor.resolveComponent("wei-dropdown-menu");
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  (_easycom_dash2 + _easycom_wei_dropdown_menu2 + _easycom_teamInfo2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_wei_dropdown_menu = () => "../../uni_modules/wei-dropdown-menu/components/wei-dropdown-menu/wei-dropdown-menu.js";
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  (_easycom_dash + _easycom_wei_dropdown_menu + _easycom_teamInfo)();
}
const _sfc_main = {
  __name: "moreDetail",
  setup(__props) {
    const recentMatchValue = common_vendor.ref({});
    const matchCategoryValue = common_vendor.ref({});
    common_vendor.ref({});
    const changeMatch = (e) => {
      console.log(e.value.recentMatch);
    };
    const changeCategory = (e) => {
      console.log(e.value.matchCategory);
    };
    const changeRegion = (e) => {
      console.log(e.value.teamRegion);
    };
    const recentMatchData = common_vendor.ref([
      {
        name: "recentMatch",
        title: "近期比赛",
        options: [
          {
            label: "APMCM亚太大学生数学建模竞赛",
            value: "0",
            tip: "显示在最右边的提示"
          },
          {
            label: "CCF CAT中国计算机应用技术大赛",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "“天柱山杯”国际传播翻译大赛",
            value: "2",
            tip: "显示在最右边的提示"
          }
        ]
      }
    ]);
    const matchCategoryData = common_vendor.ref([
      {
        name: "matchCategory",
        title: "比赛类别",
        options: [
          {
            label: "工科",
            value: "0",
            tip: "显示在最右边的提示"
          },
          {
            label: "理科",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "文学",
            value: "2",
            tip: "显示在最右边的提示"
          },
          {
            label: "外语",
            value: "3",
            tip: "显示在最右边的提示"
          },
          {
            label: "媒体",
            value: "4",
            tip: "显示在最右边的提示"
          }
        ]
      }
    ]);
    const teamRegionData = common_vendor.ref([
      {
        name: "teamRegion",
        title: "组队赛区",
        options: [
          {
            label: "广东",
            value: "0",
            tip: "显示在最右边的提示"
          },
          {
            label: "上海",
            value: "1",
            tip: "显示在最右边的提示"
          },
          {
            label: "湖南",
            value: "2",
            tip: "显示在最右边的提示"
          }
        ]
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        b: common_vendor.o(changeMatch),
        c: common_vendor.p({
          data: recentMatchData.value,
          value: recentMatchValue.value
        }),
        d: common_vendor.o(changeCategory),
        e: common_vendor.p({
          data: matchCategoryData.value,
          value: matchCategoryValue.value
        }),
        f: common_vendor.o(changeRegion),
        g: common_vendor.p({
          data: teamRegionData.value,
          value: _ctx.teamRegionValue
        }),
        h: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: "c2e090e7-4-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2e090e7"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/moreDetail/moreDetail.vue"]]);
wx.createPage(MiniProgramPage);
