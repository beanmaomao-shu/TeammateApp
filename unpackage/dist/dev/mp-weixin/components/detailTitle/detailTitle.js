"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "detailTitle",
  props: {
    imgSrc: String,
    pTitle: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: props.imgSrc,
        b: common_vendor.t(props.pTitle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9261bcc"]]);
wx.createComponent(Component);
