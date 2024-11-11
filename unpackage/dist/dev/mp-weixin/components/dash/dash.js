"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "dash",
  props: {
    Color: String,
    Width: String,
    Height: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.Color,
        b: __props.Width,
        c: __props.Height
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/TeammataApp/teammateapp/components/dash/dash.vue"]]);
wx.createComponent(Component);
