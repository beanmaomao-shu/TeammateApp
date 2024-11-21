"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "infoCard",
  props: {
    toValue: {
      type: String
    },
    cValue: {
      type: String
    }
  },
  setup(__props) {
    const isLeader = common_vendor.ref(true);
    const isaudited = common_vendor.ref(false);
    const isauthenticated = common_vendor.ref(true);
    const props = __props;
    const centerValue = common_vendor.ref("");
    const contentValue = common_vendor.ref("");
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
      contentValue.value = props.cValue;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: contentValue.value === "a"
      }, contentValue.value === "a" ? common_vendor.e({
        c: isLeader.value
      }, isLeader.value ? {} : {}, {
        d: !isLeader.value
      }, !isLeader.value ? {} : {}) : {}, {
        e: contentValue.value === "b"
      }, contentValue.value === "b" ? common_vendor.e({
        f: isaudited.value
      }, isaudited.value ? {} : {}, {
        g: !isaudited.value
      }, !isaudited.value ? {} : {}) : {}, {
        h: contentValue.value === "c"
      }, contentValue.value === "c" ? common_vendor.e({
        i: isauthenticated.value
      }, isauthenticated.value ? {
        j: common_assets._imports_1$7
      } : {}, {
        k: !isauthenticated.value
      }, !isauthenticated.value ? {
        l: common_assets._imports_2$3
      } : {}) : {}, {
        m: `/pages/teamDetail/teamDetail?toPageValue=${centerValue.value}`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0ce716f"]]);
wx.createComponent(Component);
