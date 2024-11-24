"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "infoCard",
  props: {
    toaValue: {
      type: String
    },
    tobValue: {
      type: String
    },
    tocValue: {
      type: String
    },
    contentValue: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const isLeader = common_vendor.ref(true);
    const isaudited = common_vendor.ref(false);
    const centeraValue = common_vendor.ref("");
    const centerbValue = common_vendor.ref("");
    const centercValue = common_vendor.ref("");
    const conValue = common_vendor.ref("");
    common_vendor.onMounted(() => {
      centeraValue.value = props.toaValue;
      centerbValue.value = props.tobValue;
      centercValue.value = props.tocValue;
      conValue.value = props.contentValue;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: conValue.value === "a"
      }, conValue.value === "a" ? common_vendor.e({
        b: isLeader.value
      }, isLeader.value ? {} : {}, {
        c: !isLeader.value
      }, !isLeader.value ? {} : {}) : {}, {
        d: conValue.value === "b"
      }, conValue.value === "b" ? common_vendor.e({
        e: isaudited.value
      }, isaudited.value ? {} : {}, {
        f: !isaudited.value
      }, !isaudited.value ? {} : {}) : {}, {
        g: conValue.value === "c"
      }, conValue.value === "c" ? common_vendor.e({
        h: _ctx.isauthenticated
      }, _ctx.isauthenticated ? {} : {}, {
        i: !_ctx.isauthenticated
      }, !_ctx.isauthenticated ? {} : {}) : {}, {
        j: `/pages/teamDetail/teamDetail?tobPageValue=${centerbValue.value}&tocPageValue=${centercValue.value}`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0ce716f"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/components/infoCard/infoCard.vue"]]);
wx.createComponent(Component);
