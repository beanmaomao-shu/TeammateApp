"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const isauthenticated = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isauthenticated.value
      }, isauthenticated.value ? {} : {}, {
        b: !isauthenticated.value
      }, !isauthenticated.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
