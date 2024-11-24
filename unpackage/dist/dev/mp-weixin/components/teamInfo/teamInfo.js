"use strict";
<<<<<<< Updated upstream
const common_assets = require("../../common/assets.js");
=======
>>>>>>> Stashed changes
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "teamInfo",
  props: {
    toValue: {
      type: String
    }
  },
  setup(__props) {
<<<<<<< Updated upstream
    const centerValue = common_vendor.ref("");
    const props = __props;
=======
    const props = __props;
    const centerValue = common_vendor.ref("");
>>>>>>> Stashed changes
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
    });
    return (_ctx, _cache) => {
      return {
<<<<<<< Updated upstream
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
=======
        a: `/pages/teamDetail/teamDetail?toPageValue=a`
>>>>>>> Stashed changes
      };
    };
  }
};
<<<<<<< Updated upstream
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fbcd1e2"]]);
=======
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fbcd1e2"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/components/teamInfo/teamInfo.vue"]]);
>>>>>>> Stashed changes
wx.createPage(MiniProgramPage);
