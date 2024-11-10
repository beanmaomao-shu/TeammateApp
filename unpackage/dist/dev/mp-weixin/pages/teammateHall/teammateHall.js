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
    const navigateToDetail = () => {
      common_vendor.index.redirectTo({
        url: "../searchDetail/searchDetail"
      });
    };
    const navigateToMore = () => {
      common_vendor.index.redirectTo({
        url: "../moreDetail/moreDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: _ctx.inputClearValue,
        b: common_vendor.o((...args) => _ctx.clearInput && _ctx.clearInput(...args)),
        c: common_vendor.o(navigateToDetail),
        d: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
        e: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        f: common_vendor.o(navigateToMore),
        g: common_vendor.p({
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
        h: common_vendor.f(10, (item, k0, i0) => {
          return {
            a: "305e4dd3-3-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305e4dd3"], ["__file", "D:/TeammataApp/teammateapp/pages/teammateHall/teammateHall.vue"]]);
wx.createPage(MiniProgramPage);
