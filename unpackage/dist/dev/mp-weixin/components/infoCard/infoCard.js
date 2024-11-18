"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const props = __props;
    const isLeader = common_vendor.ref(true);
    const isaudited = common_vendor.ref(false);
    const isauthenticated = common_vendor.ref(true);
    const centerValue = common_vendor.ref("");
    const contentValue = common_vendor.ref("");
    common_vendor.onLoad(() => {
      centerValue.value = props.toValue;
      contentValue.value = props.cValue;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: contentValue.value === "a"
      }, contentValue.value === "a" ? common_vendor.e({
        b: isLeader.value
      }, isLeader.value ? {} : {}, {
        c: !isLeader.value
      }, !isLeader.value ? {} : {}) : {}, {
        d: contentValue.value === "b"
      }, contentValue.value === "b" ? common_vendor.e({
        e: isaudited.value
      }, isaudited.value ? {} : {}, {
        f: !isaudited.value
      }, !isaudited.value ? {} : {}) : {}, {
        g: contentValue.value === "c"
      }, contentValue.value === "c" ? common_vendor.e({
        h: isauthenticated.value
      }, isauthenticated.value ? {} : {}, {
        i: !isauthenticated.value
      }, !isauthenticated.value ? {} : {}) : {}, {
        j: `/pages/teamDetail/teamDetail?toPageValue=${centerValue.value}`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0ce716f"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/components/infoCard/infoCard.vue"]]);
wx.createComponent(Component);
