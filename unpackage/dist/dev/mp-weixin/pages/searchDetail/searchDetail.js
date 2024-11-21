"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "searchDetail",
  setup(__props) {
    const dataFromSourcePage = common_vendor.ref("");
    const matchData = common_vendor.ref([
      { id: 2, matchName: "2024年全国大学生英语翻译大赛（NETCCS）", name: "六级能不能过队", imgUrl: "../../static/images/match3.png" }
    ]);
    common_vendor.onLoad((options) => {
      dataFromSourcePage.value = options.value;
    });
    return (_ctx, _cache) => {
      return {
        a: dataFromSourcePage.value,
        b: common_vendor.o(($event) => dataFromSourcePage.value = $event.detail.value),
        c: common_assets._imports_0$1,
        d: common_vendor.f(matchData.value, (item, index, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.t(item.matchName),
            c: common_vendor.t(item.name),
            d: item.id
          };
        }),
        e: common_assets._imports_1$1,
        f: common_assets._imports_1$2,
        g: common_assets._imports_3$1,
        h: common_assets._imports_0,
        i: common_assets._imports_0,
        j: common_assets._imports_5,
        k: common_assets._imports_6,
        l: `/pages/teamDetail/teamDetail?toPageValue=a`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce5e1149"]]);
wx.createPage(MiniProgramPage);
