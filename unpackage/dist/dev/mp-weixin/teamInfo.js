"use strict";
const common_assets = require("./common/assets.js");
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  __name: "teamInfo",
  props: {
    btn: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_assets._imports_1$5,
        c: common_assets._imports_1$4,
        d: common_assets._imports_3$2,
        e: common_assets._imports_0$3,
        f: common_assets._imports_1$4,
        g: common_assets._imports_0$3,
        h: common_assets._imports_5$1,
        i: common_assets._imports_6$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fbcd1e2"]]);
exports.MiniProgramPage = MiniProgramPage;
