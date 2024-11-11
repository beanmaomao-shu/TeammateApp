"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_infoCard2 = common_vendor.resolveComponent("infoCard");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_transition = common_vendor.resolveComponent("transition");
  (_easycom_infoCard2 + _easycom_uni_icons2 + _component_transition)();
}
const _easycom_infoCard = () => "../../components/infoCard/infoCard2.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_infoCard + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "chatRoom",
  setup(__props) {
    const messages = common_vendor.ref([
      { type: 1, text: "Hello!", time: "18:32" },
      { type: 2, text: "Hi!", time: "18:33" }
    ]);
    const message = common_vendor.ref("");
    const isShowFunction = common_vendor.ref(false);
    const sendMessage = () => {
      if (message.value.trim()) {
        const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false }).slice(0, 5);
        messages.value.push({ type: 2, text: message.value, time: currentTime });
        message.value = "";
      }
    };
    const showFunction = () => {
      isShowFunction.value = !isShowFunction.value;
    };
    const handleInput = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type == 1
          }, item.type == 1 ? {
            b: common_assets._imports_0$2,
            c: common_vendor.t(item.text),
            d: common_vendor.t(item.time)
          } : {}, {
            e: item.type == 2
          }, item.type == 2 ? {
            f: common_vendor.t(item.text),
            g: common_vendor.t(item.time),
            h: common_assets._imports_0$2
          } : {}, {
            i: index
          });
        }),
        b: common_vendor.o([($event) => message.value = $event.detail.value, handleInput]),
        c: message.value,
        d: common_vendor.o(showFunction),
        e: !message.value,
        f: common_vendor.p({
          type: "plus",
          size: "40"
        }),
        g: message.value,
        h: common_vendor.o(sendMessage),
        i: common_vendor.p({
          type: "image",
          size: "40"
        }),
        j: common_vendor.p({
          type: "camera",
          size: "40"
        }),
        k: common_vendor.p({
          type: "email",
          size: "40"
        }),
        l: common_vendor.p({
          type: "phone",
          size: "40"
        }),
        m: common_vendor.p({
          type: "location",
          size: "40"
        }),
        n: common_vendor.p({
          type: "image",
          size: "40"
        }),
        o: isShowFunction.value,
        p: common_vendor.p({
          name: "slide-up"
        }),
        q: isShowFunction.value ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b186cfb"]]);
wx.createPage(MiniProgramPage);
