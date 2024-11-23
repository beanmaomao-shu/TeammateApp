"use strict";
const common_assets = require("../../common/assets.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "teamInfo",
  props: {
    toValue: {
      type: String
    }
  },
  setup(__props) {
    const centerValue = common_vendor.ref("");
    const props = __props;
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$4,
        b: common_assets._imports_1$1,
        c: common_assets._imports_1$2,
        d: common_assets._imports_3,
        e: common_assets._imports_4,
        f: common_assets._imports_1$2,
        g: common_assets._imports_4,
        h: common_assets._imports_5,
        i: common_assets._imports_6,
        j: `/pages/teamDetail/teamDetail?toPageValue=a`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fbcd1e2"]]);
wx.createPage(MiniProgramPage);
