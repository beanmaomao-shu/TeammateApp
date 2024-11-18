"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const toValue = common_vendor.ref("a");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: toValue.value.value === "a"
      }, toValue.value.value === "a" ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
