"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const isauthenticated = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
<<<<<<< Updated upstream
        a: common_assets._imports_3,
        b: isauthenticated.value
      }, isauthenticated.value ? {
        c: common_assets._imports_0$3
      } : {}, {
        d: !isauthenticated.value
      }, !isauthenticated.value ? {
        e: common_assets._imports_1$4
      } : {}, {
        f: common_assets._imports_3$2,
        g: common_assets._imports_4$1,
        h: common_assets._imports_5$1,
        i: common_assets._imports_6$1,
        j: common_assets._imports_7,
        k: common_assets._imports_8,
        l: common_assets._imports_9,
        m: common_assets._imports_10,
        n: common_assets._imports_8
      });
=======
        a: isauthenticated.value
      }, isauthenticated.value ? {} : {}, {
        b: !isauthenticated.value
      }, !isauthenticated.value ? {} : {});
>>>>>>> Stashed changes
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
