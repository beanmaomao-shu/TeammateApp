"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_infoCard2 = common_vendor.resolveComponent("infoCard");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_segmented_control2 + _easycom_infoCard2 + _component_uni_section)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_infoCard = () => "../../components/infoCard/infoCard.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_infoCard)();
}
const _sfc_main = {
  __name: "seminarRoom",
  setup(__props) {
    const current = common_vendor.ref(0);
    const items = common_vendor.ref(["我创建的团队", "我加入的团队"]);
    const styleType = common_vendor.ref("button");
    const activeColor = common_vendor.ref("#AC33C1");
    const onClickItem = (e) => {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
      }
    };
    const isemptyenterteam = common_vendor.ref(false);
    const isemptycreateteam = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items.value,
          ["style-type"]: styleType.value,
          ["active-color"]: activeColor.value
        }),
        c: current.value === 0
      }, current.value === 0 ? common_vendor.e({
        d: isemptyenterteam.value
      }, isemptyenterteam.value ? {} : {}, {
        e: !isemptyenterteam.value
      }, !isemptyenterteam.value ? {} : {}) : {}, {
        f: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        g: isemptycreateteam.value
      }, isemptycreateteam.value ? {} : {}, {
        h: !isemptycreateteam.value
      }, !isemptycreateteam.value ? {} : {}) : {}, {
        i: common_vendor.p({
          title: "实心标签",
          type: "line"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-779b4231"], ["__file", "D:/TeammataApp/teammateapp/pages/seminarRoom/seminarRoom.vue"]]);
wx.createPage(MiniProgramPage);
