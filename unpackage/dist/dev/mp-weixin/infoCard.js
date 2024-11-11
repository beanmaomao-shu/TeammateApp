"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
const _sfc_main = {
  __name: "infoCard",
  props: {
    isLeader: {
      type: Boolean,
      default: true
    },
    isauthenticated: {
      type: Boolean,
      default: true
    },
    isaudited: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: __props.isLeader
      }, __props.isLeader ? {} : {}, {
        c: !__props.isLeader
      }, !__props.isLeader ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0ce716f"]]);
exports.MiniProgramPage = MiniProgramPage;
