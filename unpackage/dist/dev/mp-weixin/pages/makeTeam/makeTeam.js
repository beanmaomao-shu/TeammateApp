"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_badge2 + _easycom_uni_data_select2 + _easycom_uni_file_picker2)();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_uni_data_select + _easycom_uni_file_picker)();
}
const _sfc_main = {
  __name: "makeTeam",
  setup(__props) {
    const imageStyles = common_vendor.ref({
      width: 90,
      height: 90,
      border: {
        color: "#68c984",
        width: 1,
        style: "dashed",
        radius: "10rpx"
      }
    });
    const range = common_vendor.ref([
      { value: 0, text: "2024全国大学生数学模型竞赛" },
      { value: 1, text: "2024全国大学生数学模型竞赛" },
      { value: 2, text: "2024全国大学生数学模型竞赛" },
      { value: 3, text: "2024全国大学生数学模型竞赛" },
      { value: 4, text: "2024全国大学生数学模型竞赛" }
    ]);
    const rates = common_vendor.ref([
      { value: "1", name: "专科" },
      { value: "2", name: "普通本科" },
      { value: "3", name: "92高校" },
      { value: "4", name: "研究生" }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "+",
          type: "primary"
        }),
        b: common_vendor.o(_ctx.change),
        c: common_vendor.o(($event) => _ctx.value = $event),
        d: common_vendor.p({
          localdata: range.value,
          modelValue: _ctx.value
        }),
        e: common_vendor.p({
          text: "1",
          customStyle: {
            background: "#8707ff"
          }
        }),
        f: common_vendor.p({
          limit: "1",
          title: "从相册中选择",
          fileMediatype: "image",
          ["image-styles"]: imageStyles.value
        }),
        g: common_vendor.p({
          text: "2",
          customStyle: {
            background: "#8707ff"
          }
        }),
        h: common_vendor.p({
          text: "3",
          customStyle: {
            background: "#8707ff"
          }
        }),
        i: common_vendor.p({
          text: "4",
          type: "primary",
          customStyle: {
            background: "#8707ff"
          }
        }),
        j: common_vendor.f(rates.value, (item, index, i0) => {
          return {
            a: item.value,
            b: index === _ctx.current,
            c: common_vendor.t(item.name),
            d: item.value
          };
        }),
        k: common_vendor.o((...args) => _ctx.radioChange && _ctx.radioChange(...args)),
        l: common_vendor.p({
          text: "5",
          customStyle: {
            background: "#8707ff"
          }
        }),
        m: common_vendor.p({
          text: "6",
          customStyle: {
            background: "#8707ff"
          }
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f62f500a"]]);
wx.createPage(MiniProgramPage);
