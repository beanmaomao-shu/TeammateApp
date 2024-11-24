"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "teamInfo",
  props: {
    toValue: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const centerValue = common_vendor.ref("");
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
    });
    return (_ctx, _cache) => {
      return {
        a: `/pages/teamDetail/teamDetail?toPageValue=a`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fbcd1e2"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/components/teamInfo/teamInfo.vue"]]);
wx.createPage(MiniProgramPage);
