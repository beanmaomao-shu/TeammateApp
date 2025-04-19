"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "infoCard",
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    contentValue: {
      type: String,
      default: ""
    }
  },
  emits: ["getID"],
  setup(__props, { emit }) {
    const props = __props;
    const isLeader = common_vendor.ref(true);
    const isaudited = common_vendor.ref(false);
    const isauthenticated = common_vendor.ref(true);
    common_vendor.ref("");
    common_vendor.ref("");
    const centercValue = common_vendor.ref("");
    const conValue = common_vendor.ref("");
    common_vendor.onMounted(() => {
      centercValue.value = props.toValue;
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
        h: isauthenticated.value
      }, isauthenticated.value ? {} : {}, {
        i: !isauthenticated.value
      }, !isauthenticated.value ? {} : {}) : {}, {
        j: `/pages/teamDetail/teamDetail?id=${__props.id}&tocPageValue=${conValue.value}`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0ce716f"], ["__file", "C:/Users/黎翠儿/Desktop/TeammateApp/components/infoCard/infoCard.vue"]]);
wx.createComponent(Component);
