"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_infoCard2 = common_vendor.resolveComponent("infoCard");
  _easycom_infoCard2();
}
const _easycom_infoCard = () => "../../components/infoCard/infoCard.js";
if (!Math) {
  _easycom_infoCard();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      cValue: "c"
    }),
    b: common_assets._imports_0$2,
    c: common_assets._imports_1$2,
    d: common_assets._imports_2$1,
    e: common_assets._imports_3$1,
    f: common_assets._imports_4,
    g: common_assets._imports_5,
    h: common_assets._imports_6,
    i: common_assets._imports_7,
    j: common_assets._imports_5
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
