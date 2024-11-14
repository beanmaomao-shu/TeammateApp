"use strict";
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
wx.createComponent(_sfc_main);
