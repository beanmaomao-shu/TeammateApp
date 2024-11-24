"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "fcButton",
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    Title: {
      type: String,
      default: "加载失败"
    },
    Color: {
      type: String,
      default: "#000"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: props.imgSrc,
        b: common_vendor.t(props.Title),
        c: props.Color
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a91f18cb"], ["__file", "C:/Users/黎翠儿/Documents/GitHub/TeammateApp/components/fcButton/fcButton.vue"]]);
wx.createComponent(Component);
