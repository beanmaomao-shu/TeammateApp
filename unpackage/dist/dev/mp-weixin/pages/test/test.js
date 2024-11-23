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
wx.createPage(_sfc_main);
