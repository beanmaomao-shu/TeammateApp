"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  _easycom_teamInfo2();
}
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  _easycom_teamInfo();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: _ctx.inputClearValue,
    b: common_vendor.o((...args) => _ctx.clearInput && _ctx.clearInput(...args)),
    c: common_vendor.f(10, (item, k0, i0) => {
      return {
        a: "57c2c5dd-0-" + i0
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/TeammataApp/teammateapp/pages/searchDetail/searchDetail.vue"]]);
wx.createPage(MiniProgramPage);
