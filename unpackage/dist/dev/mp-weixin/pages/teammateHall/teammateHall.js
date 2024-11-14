"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_van_notice_bar = common_vendor.resolveComponent("van-notice-bar");
  const _easycom_dash2 = common_vendor.resolveComponent("dash");
  const _easycom_teamInfo2 = common_vendor.resolveComponent("teamInfo");
  (_component_van_notice_bar + _easycom_dash2 + _easycom_teamInfo2)();
}
const _easycom_dash = () => "../../components/dash/dash.js";
const _easycom_teamInfo = () => "../../components/teamInfo/teamInfo2.js";
if (!Math) {
  (_easycom_dash + _easycom_teamInfo)();
}
const _sfc_main = {
  __name: "teammateHall",
  setup(__props) {
    const inputValue = common_vendor.ref("");
    common_vendor.useRouter();
    const navigateToDetail = () => {
      if (inputValue.value == "") {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "error"
        });
      } else {
        common_vendor.index.redirectTo({
          url: `../searchDetail/searchDetail?value=${inputValue.value}`
        });
        inputValue.value = "";
      }
    };
    const searchInfo = async () => {
    };
    const toMakeTeam = () => {
      common_vendor.index.redirectTo({
        url: "../makeTeam/makeTeam"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: _ctx.inputClearValue,
        b: common_vendor.o((...args) => _ctx.clearInput && _ctx.clearInput(...args)),
        c: common_assets._imports_0,
        d: common_vendor.o(() => {
          navigateToDetail();
          searchInfo();
        }),
        e: common_vendor.p({
          scrollable: true,
          color: "#AC33C1",
          background: "#F1E6FF"
        }),
        f: common_assets._imports_1,
        g: common_assets._imports_5,
        h: common_assets._imports_3,
        i: common_assets._imports_4,
        j: common_assets._imports_5$1,
        k: common_assets._imports_6,
        l: common_assets._imports_7,
        m: common_vendor.p({
          Color: "#E5E5E5",
          Width: "780rpx",
          Height: "10rpx"
        }),
        n: common_assets._imports_8,
        o: common_vendor.o(navigateToMore),
        p: common_vendor.p({
          Color: "#F1E6FF",
          Width: "700rpx",
          Height: "8rpx"
        }),
        q: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: "305e4dd3-3-" + i0
          };
        }),
        r: common_vendor.o(toMakeTeam)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305e4dd3"]]);
wx.createPage(MiniProgramPage);
