"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  (_easycom_dash2 + _component_van_cell)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
if (!Math) {
  _easycom_dash();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      Color: "#E5E5E5",
      Width: "780rpx",
      Height: "10rpx"
    }),
    b: common_vendor.p({
      center: true,
      title: "拨打电话",
      isLink: true,
      value: "(空)"
    }),
    c: common_vendor.p({
      center: true,
      title: "添加微信",
      isLink: true,
      value: "(空)"
    }),
    d: common_vendor.p({
      center: true,
      title: "浏览名片",
      isLink: true,
      value: "(空)"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea8c7664"], ["__file", "D:/TeammataApp/teammateapp/pages/connect/connect.vue"]]);
wx.createPage(MiniProgramPage);
