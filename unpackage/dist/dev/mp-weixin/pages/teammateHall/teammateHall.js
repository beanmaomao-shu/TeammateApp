"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_notice_bar = common_vendor.resolveComponent("van-notice-bar");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  (_component_van_notice_bar + _easycom_dash2 + _easycom_teamInfo2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  (_easycom_dash + _easycom_teamInfo)();
}
const _sfc_main = {
  __name: "teammateHall",
  setup(__props) {
    const inputValue = common_vendor.ref("");
    common_vendor.useRouter();
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
    const searchInfo = async () => {
    };
    const toMakeTeam = () => {
      common_vendor.index.redirectTo({
        url: "../makeTeam/makeTeam"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: inputValue.value,
        b: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        c: common_vendor.o(() => {
          navigateToDetail();
          searchInfo();
        }),
        d: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
        e: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index
          };
        }),
        f: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        g: common_vendor.p({
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
        h: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: "305e4dd3-3-" + i0
          };
        }),
        i: common_vendor.p({
          toValue: "a"
        }),
        j: common_vendor.o(toMakeTeam)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305e4dd3"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/teammateHall/teammateHall.vue"]]);
wx.createPage(MiniProgramPage);
