"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  (_easycom_dash2 + _easycom_teamInfo2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  (_easycom_dash + _easycom_teamInfo)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      Color: "#E5E5E5",
      Width: "780rpx",
      Height: "10rpx"
    }),
    b: common_vendor.p({
      Color: "#F1E6FF",
      Width: "700rpx",
      Height: "8rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-305e4dd3"], ["__file", "D:/TeammataApp/teammateapp/pages/teammateHall/teammateHall.vue"]]);
wx.createPage(MiniProgramPage);
